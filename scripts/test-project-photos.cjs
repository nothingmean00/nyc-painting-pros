/* eslint-disable @typescript-eslint/no-require-imports -- isolated CommonJS loader for TS route tests */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');

// Load the real TS handlers with isolated storage/auth/email boundaries.
function loader(mocks = {}) {
  const cache = new Map();
  function load(file) {
    file = path.resolve(root, file);
    if (cache.has(file)) return cache.get(file).exports;
    const mod = { exports: {} }; cache.set(file, mod);
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
    const req = (name) => {
      if (Object.hasOwn(mocks, name)) return mocks[name];
      if (name.startsWith('@/')) return load('src/' + name.slice(2) + '.ts');
      if (name.startsWith('.')) return load(path.resolve(path.dirname(file), name + '.ts'));
      return require(name);
    };
    new Function('require', 'module', 'exports', code)(req, mod, mod.exports);
    return mod.exports;
  }
  return load;
}
const validLead = { name: 'Synthetic test', email: 'test@example.invalid', phone: '2125550100', service: 'Interior Painting', location: 'Test', submissionId: '66666666-6666-4666-8666-666666666666' };
const image = () => sharp({ create: { width: 40, height: 30, channels: 3, background: '#abcdef' } }).jpeg().withMetadata({ exif: { IFD0: { Copyright: 'TEST METADATA' } } }).toBuffer();

test('photo decode, normalization, metadata removal and invalid files', async () => {
  const { validateProjectPhotos } = loader()('src/lib/validate-project-photos.ts');
  assert.deepEqual(await validateProjectPhotos(undefined), []);
  const source = await image();
  assert.ok((await sharp(source).metadata()).exif);
  const photos = await validateProjectPhotos([{ content: source.toString('base64') }]);
  const meta = await sharp(Buffer.from(photos[0].content, 'base64')).metadata();
  assert.equal(meta.format, 'jpeg'); assert.equal(meta.exif, undefined);
  for (const bad of [null, {}, Array(4).fill({ content: 'AAAA' }), [{ content: Buffer.from('<svg/>').toString('base64') }], [{ content: '!' }], [{ content: 'A'.repeat(800004) }]]) {
    await assert.rejects(validateProjectPhotos(bad));
  }
});

test('estimate handler stores photos atomically and emails only private admin reference', async () => {
  const saved = []; const mails = [];
  const oldFetch = global.fetch; const oldKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = 'synthetic-not-a-real-key';
  global.fetch = async (_url, options) => { mails.push(JSON.parse(options.body)); return new Response('{}'); };
  try {
    const { POST } = loader({ '@/lib/intakes': { recordIntake: async input => { saved.push(input); return input; }, markIntakeEmailDelivered: async () => {}, IntakeStorageError: class extends Error {} } })('src/app/api/estimate/route.ts');
    const request = body => new Request('https://example.invalid/api/estimate', { method: 'POST', body: JSON.stringify(body) });
    const source = await image();
    assert.equal((await POST(request({ ...validLead, photos: [{ content: source.toString('base64') }] }))).status, 200);
    assert.equal(saved[0].photos.length, 1);
    assert.ok(mails[0].text.includes('/admin/intakes/'));
    assert.equal(mails[0].attachments, undefined);
    assert.ok(!JSON.stringify(mails[0]).includes(saved[0].photos[0].content));
    assert.equal((await POST(request(validLead))).status, 200);
    assert.deepEqual(saved[1].photos, []);
    assert.equal((await POST(request({ ...validLead, photos: [{ content: 'AAAA' }] }))).status, 422);
    assert.equal(saved.length, 2);
    assert.equal((await POST(request({ ...validLead, details: 'x'.repeat(2_600_000) }))).status, 413);
    assert.equal(saved.length, 2);
    const retry = loader({ '@/lib/intakes': { recordIntake: async () => null, markIntakeEmailDelivered: async () => {}, IntakeStorageError: class extends Error {} } })('src/app/api/estimate/route.ts');
    const count = mails.length;
    assert.equal((await retry.POST(request(validLead))).status, 200);
    assert.equal(mails.length, count);
  } finally { global.fetch = oldFetch; if (oldKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = oldKey; }
});

test('private photo route checks auth before querying storage, validates IDs and disables caching', async () => {
  let authenticated = false; let reads = 0;
  const photo = (await image()).toString('base64');
  const { GET } = loader({ '@/lib/admin-auth': { isAdminAuthenticated: async () => authenticated }, '@/lib/intakes': { getIntakePhoto: async (_id, index) => { reads++; return index === 0 ? { content: photo } : null; } } })('src/app/admin/intakes/[id]/photos/[index]/route.ts');
  const get = (id = validLead.submissionId, index = '0') => GET(new Request('https://example.invalid'), { params: Promise.resolve({ id, index }) });
  assert.equal((await get()).status, 401); assert.equal(reads, 0);
  authenticated = true;
  assert.equal((await get('bad')).status, 404);
  assert.equal((await get(validLead.submissionId, '3')).status, 404); assert.equal(reads, 0);
  const response = await get(); assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  assert.equal(response.headers.get('content-type'), 'image/jpeg');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), Buffer.from(photo, 'base64'));
  assert.equal((await get(validLead.submissionId, '1')).status, 404);
});

test('storage query keeps lead and photos in one insert and excludes image content from lists', async () => {
  const oldUrl = process.env.DATABASE_URL; process.env.DATABASE_URL = 'synthetic';
  const queries = [];
  const sql = async (strings, ...values) => { queries.push({ text: strings.join('?'), values }); return []; };
  try {
    const api = loader({ 'server-only': {}, '@neondatabase/serverless': { neon: () => sql } })('src/lib/intakes.ts');
    await api.recordIntake({ ...validLead, id: validLead.submissionId, details: '', sourcePage: '', referrer: '', photos: [{ content: 'test' }] });
    const insert = queries.find(q => q.text.includes('INSERT INTO'));
    assert.ok(insert.text.includes('ON CONFLICT (id) DO NOTHING'));
    assert.ok(insert.values.includes('[{"content":"test"}]'));
    await api.listIntakes();
    const list = queries.find(q => q.text.includes('ORDER BY'));
    assert.ok(list.text.includes('jsonb_array_length(photos)'));
    assert.ok(!list.text.includes('SELECT *'));
  } finally { if (oldUrl === undefined) delete process.env.DATABASE_URL; else process.env.DATABASE_URL = oldUrl; }
});
