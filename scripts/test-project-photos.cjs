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
      if (name === "server-only") return {};
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
    const { POST } = loader({ 'next/server': { after: () => {} }, '@/lib/intakes': { recordIntake: async input => { saved.push(input); return input; }, markIntakeEmailDelivered: async () => {}, IntakeStorageError: class extends Error {} } })('src/app/api/estimate/route.ts');
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
    assert.equal((await POST(request({ ...validLead, phone: '' }))).status, 200);
    assert.equal(saved[2].phone, '');
    assert.ok(mails[2].text.includes('contact by email'));
    assert.equal((await POST(request({ ...validLead, phone: '', email: '' }))).status, 422);
    assert.equal(saved.length, 3);
    const count = mails.length;
    assert.equal((await retry.POST(request(validLead))).status, 200);
    assert.equal(mails.length, count);
  } finally { global.fetch = oldFetch; if (oldKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = oldKey; }
});

test('customer receipt is separate from the team notification and only follows a new saved lead', async (t) => {
  const background = [];
  const requests = [];
  const stored = new Set();
  const oldKey = process.env.RESEND_API_KEY;
  const oldEnv = process.env.VERCEL_ENV;
  process.env.RESEND_API_KEY = 'synthetic-not-a-real-key';
  process.env.VERCEL_ENV = 'production';
  t.after(() => {
    if (oldKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = oldKey;
    if (oldEnv === undefined) delete process.env.VERCEL_ENV; else process.env.VERCEL_ENV = oldEnv;
  });
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    requests.push({ body: JSON.parse(options.body), key: options.headers['Idempotency-Key'] });
    return new Response('{}', { status: requests.length < 3 ? 503 : 200 });
  });

  const { POST } = loader({
    'next/server': { after: callback => background.push(callback) },
    '@/lib/intakes': {
      recordIntake: async input => {
        if (input.name === 'Storage failure') throw new Error('Storage unavailable');
        if (stored.has(input.id)) return null;
        stored.add(input.id);
        return input;
      },
      markIntakeEmailDelivered: async () => assert.fail('The team notification failed'),
      IntakeStorageError: class extends Error {},
    },
  })('src/app/api/estimate/route.ts');
  const submit = overrides => POST(new Request('https://example.invalid/api/estimate', {
    method: 'POST', body: JSON.stringify({ ...validLead, ...overrides }),
  }));

  assert.equal((await submit({ company: 'bot' })).status, 200);
  assert.equal((await submit({ email: 'first@example.invalid,second@example.invalid' })).status, 422);
  assert.equal((await submit({ name: 'Storage failure' })).status, 503);
  assert.equal(background.length, 0);
  assert.equal(requests.length, 0);

  const saved = await (await submit({ details: 'Private project notes' })).json();
  assert.equal(saved.recorded, true);
  assert.equal(saved.delivered, false);
  assert.equal(requests.length, 1);
  assert.ok(requests[0].body.to.includes('hello@nycpaintingpros.com'));
  assert.equal(requests[0].body.reply_to, validLead.email);

  assert.equal((await submit({ email: 'another@example.invalid' })).status, 200);
  assert.equal(background.length, 1);
  await background[0]();

  assert.equal(requests.length, 3);
  const receipt = requests[1];
  assert.deepEqual(requests[2], receipt);
  assert.equal(receipt.key, `estimate-receipt/${validLead.submissionId}`);
  assert.equal(receipt.body.from, 'NYC Painting Pros <hello@nycpaintingpros.com>');
  assert.equal(receipt.body.reply_to, 'hello@nycpaintingpros.com');
  assert.deepEqual(receipt.body.to, [validLead.email]);
  assert.match(receipt.body.text, /Thanks for requesting an estimate/);
  assert.doesNotMatch(receipt.body.text, /Private project notes|\/admin\/intakes\//);
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

test('a new website lead queues one AI reply in place of the receipt', async (t) => {
  const jobs = [];
  const background = [];
  const sends = [];
  const receivedAt = Date.now();
  let sendAt;
  const oldKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = 'synthetic';
  t.after(() => {
    if (oldKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = oldKey;
  });
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    sends.push(JSON.parse(options.body));
    return new Response('{}');
  });
  let enrolled = false;
  const { POST } = loader({
    'next/server': { after: callback => background.push(callback) },
    '@/lib/lead-mail-config': { isLeadAIEnabled: () => true },
    '@/lib/schedule-lead-mail': {
      leadResponseDelaySeconds: () => 740,
      scheduleLeadMail: async (...args) => jobs.push(args),
    },
    '@/lib/intakes': {
      recordIntake: async input => {
        assert.equal(input.queueFirstReply, true);
        if (enrolled) return null;
        sendAt = input.initialMailSendAt;
        assert.ok(new Date(sendAt).getTime() >= receivedAt + 740_000);
        assert.ok(new Date(sendAt).getTime() <= Date.now() + 740_000);
        enrolled = true;
        return input;
      },
      markIntakeEmailDelivered: async () => {},
    },
  })('src/app/api/estimate/route.ts');
  const request = () => new Request('https://example.invalid/api/estimate', {
    method: 'POST', body: JSON.stringify(validLead),
  });
  assert.equal((await POST(request())).status, 200);
  assert.equal((await POST(request())).status, 200);
  assert.equal(background.length, 1);
  assert.deepEqual(jobs, []);
  await background[0]();
  assert.deepEqual(jobs, [[validLead.submissionId, sendAt, false]]);
  assert.equal(sends.length, 1);
  assert.equal(sends[0].reply_to, validLead.email);
});

test('forwarded mailbox inquiries keep normalized images and enroll only once', async (t) => {
  const alias = 'private@reply.example.invalid';
  const oldAlias = process.env.LEAD_INTAKE_ADDRESS;
  process.env.LEAD_INTAKE_ADDRESS = alias;
  t.after(() => {
    if (oldAlias === undefined) delete process.env.LEAD_INTAKE_ADDRESS; else process.env.LEAD_INTAKE_ADDRESS = oldAlias;
  });
  const source = await image();
  const id = validLead.submissionId;
  const attachmentId = 'a1a1a1a1-aaaa-4aaa-aaaa-aaaaaaaaaaaa';
  const mailbox = 'hello@nycpaintingpros.com';
  const message = {
    from: 'Jamie Example <order@example.invalid>', to: [mailbox], received_for: [alias],
    subject: 'Quote for bedroom repaint', text: 'Could you paint the bedroom in Queens? Photos attached.',
    message_id: '<inquiry@example.invalid>', created_at: '2026-11-26T15:00:00Z',
    attachments: [{ id: attachmentId, content_type: 'image/jpeg', size: source.length }],
  };
  const saved = new Map();
  const jobs = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    const href = String(url);
    if (href.endsWith('/' + id)) return Response.json(message);
    if (href.endsWith('/attachments/' + attachmentId)) return Response.json({ download_url: 'https://cdn.resend.app/example/project.jpg' });
    assert.equal(href, 'https://cdn.resend.app/example/project.jpg');
    assert.equal(options.redirect, 'error');
    assert.equal(options.headers, undefined);
    return new Response(source);
  });
  const { importForwardedLead } = loader({
    './lead-mail-config': { leadMailConfig: () => ({ domain: 'reply.example.invalid', receiveKey: 'synthetic' }), isLeadAIEnabled: () => true },
    './intakes': {
      recordIntake: async (input) => {
        if (saved.has(input.id)) return null;
        saved.set(input.id, input);
        return input;
      },
    },
    './schedule-lead-mail': { leadResponseDelaySeconds: () => 720, scheduleLeadMail: async (...args) => jobs.push(args) },
  })('src/lib/forwarded-lead-email.ts');
  assert.equal(await importForwardedLead(id, [mailbox]), true);
  assert.equal(await importForwardedLead(id, [mailbox]), true);
  assert.equal(saved.size, 1);
  const [lead] = saved.values();
  assert.equal(lead.email, 'order@example.invalid');
  assert.equal(lead.sourceEmail.messageId, '<inquiry@example.invalid>');
  assert.equal(lead.location, 'Queens');
  assert.equal(lead.photos.length, 1);
  assert.equal((await sharp(Buffer.from(lead.photos[0].content, 'base64')).metadata()).exif, undefined);
  assert.deepEqual(jobs, [[lead.id, '2026-11-26T15:12:00.000Z', false]]);
  message.headers = { 'Auto-Submitted': 'auto-replied' };
  assert.equal(await importForwardedLead(id, [mailbox]), true);
  assert.equal(jobs.length, 1);
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
    assert.match(list.text, /jsonb_array_length\((?:i\.)?photos\)/);
    assert.ok(!list.text.includes('SELECT *'));
  } finally { if (oldUrl === undefined) delete process.env.DATABASE_URL; else process.env.DATABASE_URL = oldUrl; }
});

test('quote follow-ups count New York weekdays across the daylight-saving transition', () => {
  const { quoteFollowUpDate } = loader({
    './lead-mail-config': {},
    './lead-reply-copy': {},
    './lead-sales': {},
  })('src/lib/lead-mail.ts');
  assert.equal(quoteFollowUpDate(new Date('2026-10-31T02:30:00Z')), '2026-11-03');
  assert.equal(quoteFollowUpDate(new Date('2026-11-05T19:00:00Z')), '2026-11-09');
});

test('job tracking preserves unknown costs, rejects invalid amounts and calculates cash contribution', () => {
  const { parseJobTracking, trackedContribution } = loader()('src/lib/job-tracking.ts');
  const data = new FormData();
  for (const [key, value] of Object.entries({
    version: '2', nextAction: 'Confirm access', dueOn: '2026-12-02', account: 'Skyline  Towers',
    collected: '3500.25', crew: '1200.50', materials: '', other: '0',
  })) data.set(key, value);
  const partial = parseJobTracking(data);
  assert.deepEqual(partial, {
    version: 2, nextAction: 'Confirm access', dueOn: '2026-12-02', account: 'Skyline Towers',
    collected: 350025, crew: 120050, materials: null, other: 0,
  });
  assert.equal(trackedContribution(partial), null);
  data.set('materials', '250.00');
  assert.equal(trackedContribution(parseJobTracking(data)), 204975);
  data.set('crew', '-1');
  assert.equal(parseJobTracking(data), null);
  data.set('crew', '1200.50');
  data.set('dueOn', '2026-02-30');
  assert.equal(parseJobTracking(data), null);
});

test('AI emails use verified project details, acknowledge photos and follow the approved quote', async (t) => {
  const oldModel = process.env.LEAD_AI_MODEL;
  process.env.LEAD_AI_MODEL = 'synthetic-model';
  t.after(() => {
    if (oldModel === undefined) delete process.env.LEAD_AI_MODEL; else process.env.LEAD_AI_MODEL = oldModel;
  });
  let selection = { choice: 'question', message: 'Thanks for the bedroom photos. Are you thinking just the walls, or should we include ceilings too?' };
  let options;
  const { firstLeadReply, quoteLeadFollowUp, suitableForAutomaticQuote } = loader({
    './lead-mail-config': { leadOpenAIConfig: () => ({ model: process.env.LEAD_AI_MODEL, apiKey: 'synthetic' }) },
    ai: {
      generateText: async (request) => { options = request; return { output: selection }; },
      jsonSchema: schema => schema,
      Output: { object: ({ schema }) => schema },
    },
  })('src/lib/lead-reply-copy.ts');
  const job = {
    name: 'JAMIE Example', owner: 'Malik', service: 'Interior Painting',
    details: 'We want our bedrooms painted. Email me at test@example.invalid.',
    photo_count: 2,
  };
  const reply = await firstLeadReply(job);
  assert.match(reply.body, /^Hi Jamie,/);
  assert.match(reply.body, /Thanks for the bedroom photos/);
  assert.match(reply.body, /just the walls/);
  assert.match(reply.body, /Best,\nAbiel Soares\nNYC Painting Pros$/);
  assert.doesNotMatch(options.prompt, /JAMIE|test@example.invalid/);
  assert.match(options.system, /do not ask for details or photos already supplied/i);

  selection = { choice: 'handoff', message: 'Thanks for sending the photos of the plaster damage. Our team will take a look and follow up.' };
  const repair = await firstLeadReply({ ...job, service: 'Drywall & Plaster Repair', details: 'Damaged plaster needs repair.' });
  assert.match(repair.body, /plaster damage/);
  assert.doesNotMatch(repair.body, /painting project/);
  assert.deepEqual(options.output.properties.choice.enum, ['question', 'walkthrough', 'handoff']);
  assert.match(repair.reason, /manager should review/);

  selection = { choice: 'follow_up', message: 'I wanted to check in on the estimate for painting your kitchen. Any questions about what’s included?' };
  const followUp = await quoteLeadFollowUp({
    ...job, owner: 'Abiel', parent_body: 'Estimate\n\nPaint the kitchen.\n\nTotal: $1500',
  });
  assert.match(followUp, /painting your kitchen/);
  assert.match(followUp, /Best,\nAbiel Soares\nNYC Painting Pros$/);
  assert.doesNotMatch(options.prompt, /bedrooms|1500/);

  const photo = await image();
  const photos = [{ content: photo.toString('base64') }];
  selection = { choice: 'review' };
  assert.equal(await suitableForAutomaticQuote({ ...job, photos }), false);
  const [context, attachment] = options.messages[0].content;
  assert.doesNotMatch(context.text, /test@example.invalid/);
  assert.equal(attachment.mediaType, 'image/jpeg');
  assert.deepEqual(attachment.image, photo);

  selection = { choice: 'ignore', message: '' };
  const emailReply = await firstLeadReply({ ...job, source_email: { id: 'synthetic' }, photos });
  assert.equal(emailReply.body, '');

  selection = { choice: 'question', message: 'We can do it for $20. Can you pay at https://example.invalid?' };
  const fallback = await firstLeadReply(job);
  assert.match(fallback.body, /Thanks for reaching out/);
  assert.doesNotMatch(fallback.body, /\$20|https:/);
  assert.match(fallback.reason, /standard acknowledgment/);
  assert.equal((await firstLeadReply({ ...job, source_email: { id: 'synthetic' } })).body, '');

  selection = { choice: 'small_room', message: 'Happy to help repaint the bedroom.\n\n[BUDGET]\n\nRoughly how large is the room?' };
  const room = { ...job, details: 'I want to repaint the walls of one small bedroom.', location: 'Queens', photo_count: 0 };
  const budget = await firstLeadReply(room);
  assert.match(budget.body, /rough budget.*\$550 – \$1,200/i);
  assert.match(budget.body, /Roughly how large is the room\?/);
  assert.doesNotMatch(budget.body, /\[BUDGET\]/);
  assert.equal(budget.reason, '');

  const complex = { ...room, details: 'Water damage in two apartments. Need ceiling repair and a COI.' };
  const noBudget = await firstLeadReply(complex);
  assert.doesNotMatch(noBudget.body, /\$550/);
  assert.ok(!options.output.properties.choice.enum.includes('small_room'));

  selection = { choice: 'question', message: 'Has the source of the water damage been fixed?' };
  const qualification = await firstLeadReply({ ...complex, source_email: { id: 'synthetic' } });
  assert.match(qualification.body, /water damage been fixed\?/);
  assert.match(qualification.reason, /manager should review/);

  selection = { choice: 'walkthrough', message: 'A quick walkthrough would help us see how far the repairs extend. What day usually works for access?' };
  const walkthrough = await firstLeadReply(complex);
  assert.match(walkthrough.body, /quick walkthrough/);
  assert.match(walkthrough.reason, /manager should review/);
});

test('the lead model uses OpenAI Responses directly and keeps the key out of the model input', async (t) => {
  const keys = ['LEAD_AI_MODEL', 'LEAD_OPENAI_API_KEY'];
  const previous = keys.map(key => process.env[key]);
  process.env.LEAD_AI_MODEL = 'openai/gpt-6.2-sol';
  process.env.LEAD_OPENAI_API_KEY = 'synthetic-test-key';
  t.after(() => keys.forEach((key, index) => {
    if (previous[index] === undefined) delete process.env[key]; else process.env[key] = previous[index];
  }));
  const requests = [];
  const providers = [];
  const { suitableForAutomaticQuote } = loader({
    '@ai-sdk/openai': {
      createOpenAI: (options) => {
        providers.push(options);
        return { responses: model => ({ id: model }) };
      },
    },
    ai: {
      generateText: async (request) => { requests.push(request); return { output: { choice: 'eligible' } }; },
      jsonSchema: schema => schema,
      Output: { object: ({ schema }) => schema },
    },
  })('src/lib/lead-reply-copy.ts');
  assert.equal(await suitableForAutomaticQuote({ details: 'A bedroom repaint.' }), true);
  assert.deepEqual(providers[0], { apiKey: 'synthetic-test-key', baseURL: 'https://api.openai.com/v1' });
  assert.deepEqual(requests[0].model, { id: 'gpt-6.2-sol' });
  assert.deepEqual(requests[0].providerOptions, { openai: { store: false, reasoningEffort: 'low' } });
  assert.equal(requests[0].maxOutputTokens, 768);
  assert.doesNotMatch(requests[0].prompt, /synthetic-test-key/);
  process.env.LEAD_AI_MODEL = 'anthropic/synthetic-model';
  await assert.rejects(suitableForAutomaticQuote({ details: 'A bedroom repaint.' }), /not configured/);
  process.env.LEAD_AI_MODEL = 'gpt-6.2-sol';
  delete process.env.LEAD_OPENAI_API_KEY;
  await assert.rejects(suitableForAutomaticQuote({ details: 'A bedroom repaint.' }), /not configured/);
  assert.equal(requests.length, 1);
});

test('a comparable small-room estimate uses the benchmark discount and generates a PDF', async (t) => {
  const keys = ['LEAD_AUTO_QUOTE_ENABLED', 'LEAD_AUTO_QUOTE_MARKET_CENTS', 'LEAD_AUTO_QUOTE_TAX'];
  const prior = keys.map(key => process.env[key]);
  process.env.LEAD_AUTO_QUOTE_ENABLED = 'true';
  delete process.env.LEAD_AUTO_QUOTE_MARKET_CENTS;
  delete process.env.LEAD_AUTO_QUOTE_TAX;
  t.after(() => keys.forEach((key, index) => {
    if (prior[index] === undefined) delete process.env[key]; else process.env[key] = prior[index];
  }));
  const load = loader();
  const { makeAutomaticEstimate, readWallEstimate } = load('src/lib/automatic-estimate.ts');
  const dims = readWallEstimate({ length: 12, width: 10, height: 8, conditionsConfirmed: true });
  assert.equal(readWallEstimate({ length: 12, width: 10, height: 8 }), null);
  assert.equal(makeAutomaticEstimate('Interior Painting', 'Need trim too.', dims), null);
  assert.equal(makeAutomaticEstimate('Commercial Painting', '', dims), null);
  assert.equal(makeAutomaticEstimate('Interior Painting', '', { ...dims, height: 10 }), null);
  assert.equal(makeAutomaticEstimate('Interior Painting', '', { ...dims, width: 11 }), null);
  const quote = makeAutomaticEstimate('Interior Painting', 'Paint my bedroom.', dims);
  assert.equal(quote.totalCents, 49275);
  assert.match(quote.scope, /one room measuring 12 x 10 ft/);
  assert.match(quote.timing, /Applicable tax is additional/);

  const { createQuotePdf } = load('src/lib/quote-pdf.ts');
  const base64 = await createQuotePdf(quote, {
    name: 'Example Customer', location: 'Brooklyn', id: validLead.submissionId,
    createdAt: '2026-11-26T15:00:00Z',
  });
  assert.equal(Buffer.from(base64, 'base64').subarray(0, 4).toString(), '%PDF');
  const { PDFDocument } = require('pdf-lib');
  assert.equal((await PDFDocument.load(base64)).getPageCount(), 1);
  const expanded = await createQuotePdf({ ...quote, scope: ('Long scope paragraph with room notes.\n\n').repeat(100) }, {
    name: 'Example Customer', location: 'Brooklyn', id: validLead.submissionId,
    createdAt: '2026-11-26T15:00:00Z',
  });
  assert.ok((await PDFDocument.load(expanded)).getPageCount() > 1);
});
