/* eslint-disable @typescript-eslint/no-require-imports -- isolate server and browser boundaries without live analytics */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');

function loader(mocks = {}) {
  const cache = new Map();
  function load(file) {
    file = path.resolve(root, file);
    if (cache.has(file)) return cache.get(file).exports;
    const mod = { exports: {} }; cache.set(file, mod);
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    } }).outputText;
    const req = name => {
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

const input = { id: 'c7979bc5-2b46-4172-9df4-74f66d1c9983', page: '/painting/apartment-painting-nyc', placement: 'header' };
const request = (body, headers = {}) => new Request('https://example.test/api/call-click', {
  method: 'POST', headers: { origin: 'https://example.test', 'content-type': 'application/json', ...headers },
  body: JSON.stringify(body),
});

test('call tracking is click-only, preserves the telephone link and uses a keepalive request', () => {
  const previousFetch = global.fetch; const previousWindow = global.window;
  const sent = []; global.window = { location: { pathname: input.page } };
  global.fetch = (url, options) => { sent.push({ url, options }); return Promise.resolve(new Response()); };
  try {
    const { CallLink } = loader()('src/components/CallLink.tsx');
    const link = CallLink({ placement: 'header', children: 'Call us' });
    assert.equal(link.props.href, 'tel:+19294075635');
    assert.equal(sent.length, 0, 'rendering must never record a call click');
    link.props.onClick();
    assert.equal(sent.length, 1);
    assert.equal(sent[0].url, '/api/call-click');
    assert.equal(sent[0].options.keepalive, true);
    const payload = JSON.parse(sent[0].options.body);
    assert.equal(payload.page, input.page);
    assert.equal(payload.placement, 'header');
    assert.deepEqual(Object.keys(payload).sort(), ['id', 'page', 'placement']);
    assert.match(payload.id, /^[\da-f-]{36}$/i);
    global.fetch = () => { throw new Error('offline'); };
    assert.doesNotThrow(() => link.props.onClick(), 'tracking failure must not prevent dialing');
  } finally { global.fetch = previousFetch; if (previousWindow === undefined) delete global.window; else global.window = previousWindow; }
});

test('the public ingestion endpoint validates origins, bounded input and public paths before writing', async () => {
  const saved = [];
  const { POST } = loader({ '@/lib/call-clicks': { recordCallClick: async event => { saved.push(event); return true; } } })('src/app/api/call-click/route.ts');
  for (const bad of [null, [], {}, { ...input, id: 'bad' }, { ...input, page: '//evil.test' }, { ...input, page: '/contact?email=private' }, { ...input, page: '/admin/calls' }, { ...input, placement: 'arbitrary' }]) {
    assert.equal((await POST(request(bad))).status, 400);
  }
  assert.equal((await POST(request(input, { origin: 'https://elsewhere.test' }))).status, 403);
  assert.equal((await POST(request(input, { 'sec-fetch-site': 'cross-site' }))).status, 403);
  assert.equal((await POST(request(input, { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await POST(request({ ...input, padding: 'x'.repeat(3000) }))).status, 413);
  assert.equal(saved.length, 0);
  assert.equal((await POST(request(input))).status, 201);
  assert.equal(saved.length, 1);
});

test('a retry with the same event ID counts once; timestamps and destination come from storage/server', async () => {
  const previousUrl = process.env.DATABASE_URL; process.env.DATABASE_URL = 'synthetic';
  const records = new Map(); const queries = [];
  const sql = async (parts, ...values) => {
    const query = parts.join('?'); queries.push(query);
    if (query.includes('INSERT INTO call_clicks')) {
      assert.match(query, /ON CONFLICT \(id\) DO NOTHING/);
      const [id, destination, page, placement] = values;
      if (records.has(id)) return [];
      records.set(id, { id, destination, source_page: page, placement, created_at: '2026-11-16T18:00:00.000Z' }); return [{ id }];
    }
    if (query.includes('SELECT count')) return [{ total: records.size, today: records.size, week: records.size }];
    if (query.includes('SELECT id, created_at')) return [...records.values()];
    return [];
  };
  try {
    const load = loader({ 'server-only': {}, '@neondatabase/serverless': { neon: () => sql } });
    const { POST } = load('src/app/api/call-click/route.ts');
    assert.equal((await POST(request(input))).status, 201);
    assert.equal((await POST(request(input))).status, 200);
    const report = await load('src/lib/call-clicks.ts').getCallClickReport();
    assert.equal(report.total, 1); assert.equal(report.clicks.length, 1);
    assert.equal(report.clicks[0].destination, '(929) 407-5635');
    assert.equal(report.clicks[0].createdAt, '2026-11-16T18:00:00.000Z');
    assert.ok(queries.some(query => query.includes('DEFAULT now()')));
    assert.ok(queries.some(query => query.includes("AT TIME ZONE 'America/New_York'")));
    assert.ok(queries.some(query => query.includes('LIMIT 100')));
  } finally { if (previousUrl === undefined) delete process.env.DATABASE_URL; else process.env.DATABASE_URL = previousUrl; }
});

test('storage failure is reported as unavailable, not as a recorded click', async () => {
  const { POST } = loader({ '@/lib/call-clicks': { recordCallClick: async () => { throw new Error('unavailable'); } } })('src/app/api/call-click/route.ts');
  const response = await POST(request(input));
  assert.equal(response.status, 503); assert.deepEqual(await response.json(), { ok: false });
});

test('the isolated preview log persists timestamps, deduplicates concurrent delivery and is disabled on Vercel', async () => {
  const directory = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'painting-call-test-'));
  const previous = { directory: process.env.CALL_CLICK_PREVIEW_STORE, vercel: process.env.VERCEL };
  delete process.env.VERCEL; process.env.CALL_CLICK_PREVIEW_STORE = directory;
  try {
    const log = loader({ 'server-only': {} })('src/lib/call-click-preview.ts');
    assert.equal(log.callClickPreviewDirectory(), directory);
    const results = await Promise.all([log.recordPreviewCallClick(directory, input), log.recordPreviewCallClick(directory, input)]);
    assert.equal(results.filter(Boolean).length, 1);
    const report = await log.getPreviewCallClickReport(directory);
    assert.equal(report.total, 1); assert.equal(report.today, 1); assert.equal(report.week, 1);
    assert.equal(report.clicks[0].destination, '(929) 407-5635');
    assert.ok(Date.now() - Date.parse(report.clicks[0].createdAt) < 5000);
    process.env.VERCEL = '1';
    assert.equal(log.callClickPreviewDirectory(), undefined);
  } finally {
    fs.rmSync(directory, { recursive: true });
    if (previous.directory === undefined) delete process.env.CALL_CLICK_PREVIEW_STORE; else process.env.CALL_CLICK_PREVIEW_STORE = previous.directory;
    if (previous.vercel === undefined) delete process.env.VERCEL; else process.env.VERCEL = previous.vercel;
  }
});
