// End-to-end test of the order API, payment page, screenshot upload, contact API and admin portal against a RUNNING server in dry-run mode
// (no real email is sent).
//   MAIL_DRY_RUN=1 ADMIN_PASSWORD_HASH=... ADMIN_SESSION_SECRET=... ORDER_RATE_LIMIT=500 PROOF_RATE_LIMIT=500 npx next start -p 3200
//   TEST_ADMIN_PASSKEY=... TEST_LINK_SECRET=<same as ADMIN_SESSION_SECRET> node scripts/test-orders.mjs http://127.0.0.1:3200
import fs from 'node:fs';
import { createHmac } from 'node:crypto';

const BASE = process.argv[2] || 'http://127.0.0.1:3200';
const PASSKEY = process.env.TEST_ADMIN_PASSKEY;
const LINK_SECRET = process.env.TEST_LINK_SECRET;
if (!PASSKEY || !LINK_SECRET) throw new Error('Set TEST_ADMIN_PASSKEY and TEST_LINK_SECRET.');

const t = fs.readFileSync(new URL('../lib/data/products.ts', import.meta.url), 'utf8');
const products = JSON.parse(t.slice(t.indexOf('= [') + 2, t.indexOf('\n];') + 2));
const big = products.find((p) => p.price >= 400 && p.price < 1000 && p.stock >= 3);
const small = products.find((p) => p.price > 0 && p.price < 100 && p.stock >= 12);
const lowStock = products.find((p) => p.stock > 0 && p.stock <= 2 && p.price > 0);
const tokenFor = (ref) => createHmac('sha256', LINK_SECRET).update(`pay:${ref}`).digest('base64url').slice(0, 32);

let n = 0, failed = 0;
const ok = (cond, name, extra = '') => { n++; if (!cond) { failed++; console.log(`  FAIL  ${name} ${extra}`); } else console.log(`  ok    ${name}`); };
let ipCounter = 10;
const nextIp = () => `203.0.113.${ipCounter++}`;

const validCustomer = { fullName: 'Test Customer', email: 'test.customer@example.com', phone: '0412 345 678', address: '12 Test Street', city: 'Sydney', state: 'NSW', postcode: '2000', notes: '', ageConfirmed: true };
const post = (path, body, { ip = nextIp(), headers = {}, raw } = {}) =>
  fetch(BASE + path, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': ip, ...headers }, body: raw ?? JSON.stringify(body) });
const order = (over = {}, opts) => post('/api/order/', { items: [{ slug: big.slug, quantity: 1 }], paymentMethodId: 'payid', customer: validCustomer, ...over }, opts);

console.log('\nOrder API: validation');
let r = await post('/api/order/', null, { raw: 'x', headers: { 'Content-Type': 'text/plain' } });
ok(r.status === 415, 'rejects non-JSON content type', r.status);
r = await post('/api/order/', null, { raw: '{not json' });
ok(r.status === 400, 'rejects malformed JSON', r.status);
r = await order({ customer: { ...validCustomer, email: 'nope', phone: '123', postcode: '3000' } });
let j = await r.json();
ok(r.status === 422 && j.fieldErrors?.email && j.fieldErrors?.phone && j.fieldErrors?.postcode, 'reports bad email, phone and state/postcode mismatch', JSON.stringify(j.fieldErrors));
r = await order({ customer: { ...validCustomer, ageConfirmed: false } });
j = await r.json();
ok(r.status === 422 && j.fieldErrors?.ageConfirmed, 'requires 18+ confirmation');
r = await order({ customer: { ...validCustomer, fullName: 'Bad\r\nBcc: evil@example.com' } });
ok(r.status === 422, 'blocks header-injection characters in name');
r = await order({ items: [] });
ok(r.status === 422, 'rejects empty cart');
r = await order({ items: [{ slug: 'does-not-exist', quantity: 1 }] });
ok(r.status === 422, 'rejects unknown product');
r = await order({ items: [{ slug: big.slug, quantity: 0 }] });
ok(r.status === 422, 'rejects zero quantity');
r = await order({ items: [{ slug: big.slug, quantity: 100 }] });
ok(r.status === 422, 'rejects absurd quantity');
r = await order({ items: [{ slug: small.slug, quantity: 1 }] });
j = await r.json();
ok(r.status === 422 && /minimum/i.test(j.error || ''), 'enforces $300 minimum order', j.error);
r = await order({ paymentMethodId: 'bitcoin-cash' });
ok(r.status === 422, 'rejects unknown payment method');
if (lowStock) {
  r = await order({ items: [{ slug: lowStock.slug, quantity: lowStock.stock + 1 }] });
  ok(r.status === 422, 'rejects quantity above stock');
}

console.log('\nOrder API: server-side pricing and success');
r = await order({ subtotal: 1, finalTotal: 1, total: 1, items: [{ slug: big.slug, quantity: 1, price: 1, unitPrice: 1 }] });
j = await r.json();
const shipping = big.price >= 1500 ? 0 : 75;
ok(r.status === 200 && j.success, 'accepts a valid order', JSON.stringify(j).slice(0, 200));
ok(/^DOW-[A-Z2-9]{6}$/.test(j.orderRef || ''), 'order reference is generated on the server', j.orderRef);
ok(j.order?.totals?.subtotal === big.price && j.order?.totals?.total === big.price + shipping, 'ignores client-supplied prices and totals', JSON.stringify(j.order?.totals));
ok(j.confirmationEmail === 'sent', 'customer order confirmation dispatched (dry-run)');
ok(String(j.whatsappUrl).startsWith('https://wa.me/61420128746?text='), 'WhatsApp link targets +61420128746');
const mainRef = j.orderRef;
const mainTotal = j.order.totals.total;
r = await order({ paymentMethodId: 'crypto-btc' });
j = await r.json();
const disc = Math.round(big.price * 12) / 100;
ok(j.order?.totals?.cryptoDiscount === disc && j.order.totals.total === Math.round((big.price - disc + shipping) * 100) / 100, '12% crypto discount applied on the server', JSON.stringify(j.order?.totals));
const cryptoRef = j.orderRef;
r = await order({ website: 'http://spam.example' });
j = await r.json();
ok(r.status === 200 && j.orderRef === 'DOW-000000', 'honeypot swallows bot submissions');

console.log('\nOrder API: rate limit');
const rlIp = nextIp();
let limited = 0;
for (let i = 0; i < 700; i++) { const rr = await post('/api/order/', null, { raw: '{}', ip: rlIp }); if (rr.status === 429) { limited = i + 1; break; } }
ok(limited > 0, 'rate limit eventually returns 429', `after ${limited} requests`);

console.log('\nContact API');
r = await post('/api/contact/', { name: 'A', email: 'x', message: 'hi' });
ok(r.status === 422, 'validates contact form');
r = await post('/api/contact/', { name: 'Test Person', email: 'test.person@example.com', subject: 'Question', message: 'Do you have the Macallan 12 in stock?' });
j = await r.json();
ok(r.status === 200 && j.success, 'accepts a valid contact message (dry-run)');

console.log('\nAdmin: authentication');
r = await fetch(BASE + '/api/admin/orders');
ok(r.status === 401, 'orders API requires login');
r = await fetch(BASE + '/admin/');
let html = await r.text();
ok(r.status === 200 && /Staff sign in/.test(html) && !/Order portal/.test(html), '/admin shows the login form when signed out');
ok((r.headers.get('x-robots-tag') || '').includes('noindex'), '/admin is noindex via X-Robots-Tag');
r = await fetch(BASE + '/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: PASSKEY }) });
ok(r.status === 403, 'login without Origin header is blocked (CSRF)');
const origin = new URL(BASE).origin;
const login = (password, ip = nextIp()) => fetch(BASE + '/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin, 'X-Forwarded-For': ip }, body: JSON.stringify({ password }) });
r = await login('definitely-wrong');
ok(r.status === 401, 'wrong passkey rejected');
r = await login(PASSKEY);
const setCookie = r.headers.get('set-cookie') || '';
ok(r.status === 200 && /dow_admin=/.test(setCookie), 'correct passkey signs in');
ok(/HttpOnly/i.test(setCookie) && /SameSite=strict/i.test(setCookie), 'session cookie is HttpOnly and SameSite=Strict', setCookie.slice(0, 120));
const cookie = setCookie.split(';')[0];
const bruteIp = nextIp();
let blocked = 0;
for (let i = 0; i < 8; i++) { const rr = await login('wrong' + i, bruteIp); if (rr.status === 429) { blocked = i + 1; break; } }
ok(blocked > 0 && blocked <= 6, 'brute force is locked out after a few attempts', `blocked on attempt ${blocked}`);

console.log('\nAdmin: simple portal, preview and sending');
const authed = (path, init = {}) => fetch(BASE + path, { ...init, headers: { Cookie: cookie, Origin: origin, 'Content-Type': 'application/json', ...(init.headers || {}) } });
r = await authed('/admin/');
html = await r.text();
ok(r.status === 200 && !/Staff sign in/.test(html), '/admin shows the portal when signed in');
r = await authed('/api/admin/orders');
j = await r.json();
ok(r.status === 200 && Array.isArray(j.orders), 'lists orders');
ok(j.orders.some((o) => o.ref === mainRef) && j.orders.some((o) => o.ref === cryptoRef), 'new orders appear in the portal');
ok(!j.orders.some((o) => o.ref === 'DOW-000000'), 'honeypot order was not stored');
const first = j.orders.find((o) => o.ref === mainRef);
ok(first.status === 'new', 'a new order starts as "new" (awaiting payment details)');
r = await authed('/api/admin/orders/' + mainRef);
j = await r.json();
ok(r.status === 200 && j.order?.customer?.email === validCustomer.email, 'loads order detail');
r = await authed('/api/admin/orders/DOW-ZZZZZZ');
ok(r.status === 404, 'unknown order returns 404');
r = await authed('/api/admin/orders/..%2F..%2Fetc');
ok(r.status === 404, 'malformed reference is rejected');

const DETAILS = 'PayID: payments@doctorsofwhisky.com.au\nName: Doctors of Whisky Pty Ltd';
r = await authed(`/api/admin/orders/${mainRef}/preview`, { method: 'POST', body: JSON.stringify({ kind: 'payment_details', paymentDetails: '' }) });
j = await r.json();
ok(r.status === 200 && j.ok === false && /payment details/i.test(j.problem || ''), 'preview asks for payment details when the box is empty');
r = await authed(`/api/admin/orders/${mainRef}/preview`, { method: 'POST', body: JSON.stringify({ kind: 'payment_details', paymentDetails: DETAILS }) });
j = await r.json();
const money = `$${mainTotal.toLocaleString('en-AU', { minimumFractionDigits: 2 })} AUD`;
ok(j.ok && j.subject.includes(mainRef) && j.html.includes(money), 'preview shows the invoice with order number and amount', j.subject);
ok(j.html.includes('PayID: payments@doctorsofwhisky.com.au') && j.html.includes('Payment should be made within minutes') && j.html.includes('Use your order number as the payment reference'), 'preview contains the pasted details and the payment instructions');
ok(j.html.includes('Your order is confirmed once payment is received') && j.html.includes('A tracking number will be provided') && j.html.includes('Refund or re-ship within 7 days'), 'preview contains the before-it-ships terms');
ok(j.html.includes(`/pay/${mainRef}/?t=${tokenFor(mainRef)}`) && j.html.includes('Upload Confirmation'), 'preview has a working Upload button link with a secure token');
ok(j.html.includes('https://wa.me/61420128746?text=') && j.html.includes('Confirm via WhatsApp'), 'preview has a Confirm via WhatsApp button to +61420128746');
ok(j.html.includes('Reply to us') && j.html.includes('mailto:sales@doctorsofwhisky.com.au') && j.html.includes('Once paid, send your payment screenshot'), 'preview has the Reply to us button and the send-your-screenshot line');
ok(j.html.includes('Before your order ships') && j.html.includes('&#10003;'), 'terms are shown as a tick list');
ok(typeof j.whatsappText === 'string' && j.whatsappText.includes(mainRef) && j.whatsappText.includes(money) && j.whatsappText.includes('PayID: payments@doctorsofwhisky.com.au') && j.whatsappText.includes(`/pay/${mainRef}/?t=${tokenFor(mainRef)}`), 'WhatsApp message preview has the order number, amount, details and upload link');
ok(String(j.whatsappUrl).startsWith('https://wa.me/61412345678?text='), "WhatsApp button opens the customer's own number");
r = await authed(`/api/admin/orders/${mainRef}/preview`, { method: 'POST', body: JSON.stringify({ kind: 'payment_details', paymentDetails: '<script>alert(1)</script> 123456' }) });
j = await r.json();
ok(j.ok && !j.html.includes('<script>alert(1)') && j.html.includes('&lt;script&gt;'), 'pasted text is HTML-escaped in the email');
r = await authed(`/api/admin/orders/${mainRef}/preview`, { method: 'POST', body: JSON.stringify({ kind: 'bogus' }) });
ok(r.status === 422, 'unknown message type rejected');

r = await fetch(`${BASE}/api/admin/orders/${mainRef}/send`, { method: 'POST', headers: { Cookie: cookie, 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: 'payment_details', paymentDetails: DETAILS }) });
ok(r.status === 403, 'sending without Origin is blocked (CSRF)');
r = await authed(`/api/admin/orders/${mainRef}/send`, { method: 'POST', body: JSON.stringify({ kind: 'payment_details', paymentDetails: '' }) });
ok(r.status === 422, 'cannot send empty payment details');
r = await authed(`/api/admin/orders/${mainRef}/send`, { method: 'POST', body: JSON.stringify({ kind: 'payment_details', paymentDetails: 'abc\u0000def ok' }) });
ok(r.status === 422, 'control characters in payment details are rejected');
r = await authed(`/api/admin/orders/${mainRef}/send`, { method: 'POST', body: JSON.stringify({ kind: 'payment_details', paymentDetails: DETAILS }) });
j = await r.json();
ok(r.status === 200 && j.ok && j.order.status === 'awaiting_payment' && j.order.paymentDetails === DETAILS, 'sending payment details moves the order to awaiting payment', JSON.stringify(j).slice(0, 160));
ok(j.order.replies.at(-1).kind === 'payment_details' && j.order.replies.at(-1).delivered === true, 'send is recorded on the order');

console.log('\nAdmin: sending over WhatsApp instead of email');
r = await authed(`/api/admin/orders/${cryptoRef}/send`, { method: 'POST', body: JSON.stringify({ kind: 'payment_details', paymentDetails: '0x8b30De7397b8F27B88C419eD9C83f789C065799A', channel: 'whatsapp' }) });
j = await r.json();
ok(r.status === 200 && j.order.status === 'awaiting_payment' && j.order.paymentDetails.startsWith('0x8b30'), 'WhatsApp send moves the order to awaiting payment and saves the details');
ok(j.order.replies.at(-1).subject.startsWith('WhatsApp:') && j.order.replies.at(-1).delivered === true, 'WhatsApp send is recorded as a WhatsApp message');
r = await authed(`/api/admin/orders/${cryptoRef}/send`, { method: 'POST', body: JSON.stringify({ kind: 'payment_details', paymentDetails: '', channel: 'whatsapp' }) });
ok(r.status === 422, 'WhatsApp send still requires payment details');

console.log('\nCustomer payment page');
const PAY = `/pay/${mainRef}/`;
r = await fetch(BASE + PAY);
html = await r.text();
ok(/This link is not valid/.test(html) && !html.includes(DETAILS.split('\n')[0]), 'payment page without a token shows nothing about the order');
r = await fetch(BASE + PAY + '?t=' + 'a'.repeat(32));
html = await r.text();
ok(/This link is not valid/.test(html), 'payment page with a wrong token is refused');
r = await fetch(BASE + `/pay/DOW-ZZZZZZ/?t=${tokenFor('DOW-ZZZZZZ')}`);
html = await r.text();
ok(/This link is not valid/.test(html), 'valid-looking token for a non-existent order is refused');
r = await fetch(BASE + PAY + '?t=' + tokenFor(mainRef));
html = await r.text();
ok(r.status === 200 && html.includes(mainRef) && html.includes('Amount to pay') && html.includes('payments@doctorsofwhisky.com.au'), 'valid link shows the amount, reference and the pasted payment details');
ok(html.includes('Payment should be made within minutes') && html.includes('Refund or re-ship within 7 days') && html.includes('Payment screenshot') && html.includes('Send Payment Confirmation') && html.includes('Having trouble?'), 'payment page shows the instructions, terms, upload box and help line');
ok(html.includes('https://wa.me/61420128746?text=') && html.includes('Confirm via WhatsApp'), 'payment page has the WhatsApp button');
ok((r.headers.get('x-robots-tag') || '').includes('noindex') && /noindex/.test(html), 'payment page is noindex');

console.log('\nScreenshot upload');
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
const upload = (ref, token, file, extra = {}) => {
  const fd = new FormData();
  if (token !== null) fd.set('t', token);
  if (file) fd.set('file', file.blob, file.name);
  if (extra.note) fd.set('note', extra.note);
  return fetch(`${BASE}/api/pay/${ref}/proof/`, { method: 'POST', body: fd, headers: { 'X-Forwarded-For': extra.ip || nextIp() } });
};
const png = { blob: new Blob([PNG], { type: 'image/png' }), name: 'screenshot.png' };
r = await upload(mainRef, null, png);
ok(r.status === 403, 'upload without a token is refused');
r = await upload(mainRef, 'b'.repeat(32), png);
ok(r.status === 403, 'upload with a wrong token is refused');
r = await upload('DOW-ZZZZZZ', tokenFor('DOW-ZZZZZZ'), png);
ok(r.status === 404, 'upload for an unknown order is refused');
r = await upload(mainRef, tokenFor(mainRef), null);
ok(r.status === 422, 'upload with no file is refused');
r = await upload(mainRef, tokenFor(mainRef), { blob: new Blob(['<html><script>alert(1)</script></html> padding padding'], { type: 'image/png' }), name: 'evil.png' });
j = await r.json();
ok(r.status === 422, 'a web page renamed to .png is rejected by content check', j.error);
r = await upload(mainRef, tokenFor(mainRef), { blob: new Blob([Buffer.from('MZ' + 'x'.repeat(200))], { type: 'application/pdf' }), name: 'evil.pdf' });
ok(r.status === 422, 'an executable renamed to .pdf is rejected');
r = await upload(mainRef, tokenFor(mainRef), { blob: new Blob([Buffer.concat([PNG, Buffer.alloc(5 * 1024 * 1024)])], { type: 'image/png' }), name: 'huge.png' });
ok(r.status === 413, 'files over 4 MB are rejected', r.status);
r = await upload(mainRef, tokenFor(mainRef), png, { note: 'Paid from my CommBank account' });
j = await r.json();
ok(r.status === 200 && j.success, 'a valid screenshot is accepted and emailed to the shop (dry-run)', JSON.stringify(j).slice(0, 160));
r = await authed('/api/admin/orders/' + mainRef);
j = await r.json();
ok(j.order.proofs?.length === 1 && j.order.proofs[0].emailed === true && j.order.proofs[0].fileName === `payment-${mainRef}.png`, 'the portal records that a screenshot was received');
const proofIp = nextIp();
let proofLimited = 0;
for (let i = 0; i < 40; i++) { const rr = await upload(mainRef, tokenFor(mainRef), png, { ip: proofIp }); if (rr.status === 429) { proofLimited = i + 1; break; } }
ok(proofLimited > 0, 'upload rate limit returns 429', `after ${proofLimited}`);

console.log('\nAdmin: payment received and dispatch');
r = await authed(`/api/admin/orders/${mainRef}/send`, { method: 'POST', body: JSON.stringify({ kind: 'dispatched', tracking: '' }) });
ok(r.status === 422, 'cannot mark dispatched without a tracking number');
r = await authed(`/api/admin/orders/${mainRef}/send`, { method: 'POST', body: JSON.stringify({ kind: 'dispatched', tracking: 'bad;rm -rf' }) });
ok(r.status === 422, 'tracking number rejects unsafe characters');
r = await authed(`/api/admin/orders/${mainRef}/preview`, { method: 'POST', body: JSON.stringify({ kind: 'payment_received' }) });
j = await r.json();
ok(j.ok && j.html.includes('confirmed') && j.html.includes('A tracking number will be provided') && j.html.includes('Refund or re-ship within 7 days'), 'payment received preview states the order is confirmed');
r = await authed(`/api/admin/orders/${mainRef}/send`, { method: 'POST', body: JSON.stringify({ kind: 'payment_received' }) });
j = await r.json();
ok(r.status === 200 && j.order.status === 'paid', 'payment received moves the order to paid');
r = await fetch(BASE + PAY + '?t=' + tokenFor(mainRef));
html = await r.text();
ok(html.includes('Payment received') && !html.includes('Send Payment Confirmation'), 'payment page switches to "payment received" and hides the upload box');
r = await authed(`/api/admin/orders/${mainRef}/send`, { method: 'POST', body: JSON.stringify({ kind: 'dispatched', tracking: '3ABC123456789' }) });
j = await r.json();
ok(r.status === 200 && j.order.status === 'dispatched' && j.order.trackingNumber === '3ABC123456789', 'dispatch stores the tracking number and moves the order to dispatched');
r = await fetch(BASE + PAY + '?t=' + tokenFor(mainRef));
html = await r.text();
ok(html.includes('3ABC123456789'), 'payment page shows the tracking number once dispatched');
r = await fetch(BASE + '/api/admin/orders', { headers: { Cookie: cookie.slice(0, -4) + 'AAAA' } });
ok(r.status === 401, 'tampered session cookie rejected');
r = await authed('/api/admin/logout', { method: 'POST', body: '{}' });
ok(r.status === 200, 'logout works');

console.log('\nSEO / privacy');
r = await fetch(BASE + '/robots.txt');
const robots = await r.text();
ok(/Disallow: \/admin\//.test(robots) && /Disallow: \/api\/admin\//.test(robots) && /Disallow: \/pay\//.test(robots), 'robots.txt disallows /admin/, /api/admin/ and /pay/');
r = await fetch(BASE + '/sitemap.xml');
const sm = await r.text();
ok(!sm.includes('/admin') && !sm.includes('/pay/'), 'sitemap does not list admin or payment URLs');

console.log(`\n${n - failed}/${n} passed${failed ? `, ${failed} FAILED` : ''}`);
process.exit(failed ? 1 : 0);
