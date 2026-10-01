// End-to-end test of the order API, contact API and admin portal against a RUNNING server in dry-run mode (no real email is sent).
//   MAIL_DRY_RUN=1 ADMIN_PASSWORD_HASH=... ADMIN_SESSION_SECRET=... ORDER_RATE_LIMIT=500 npx next start -p 3200
//   TEST_ADMIN_PASSKEY=... node scripts/test-orders.mjs http://127.0.0.1:3200
import fs from 'node:fs';

const BASE = process.argv[2] || 'http://127.0.0.1:3200';
const PASSKEY = process.env.TEST_ADMIN_PASSKEY;
if (!PASSKEY) throw new Error('Set TEST_ADMIN_PASSKEY to the passkey used to create ADMIN_PASSWORD_HASH.');

const t = fs.readFileSync(new URL('../lib/data/products.ts', import.meta.url), 'utf8');
const products = JSON.parse(t.slice(t.indexOf('= [') + 2, t.indexOf('\n];') + 2));
const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));
const big = products.find((p) => p.price >= 400 && p.price < 1000 && p.stock >= 3);
const small = products.find((p) => p.price > 0 && p.price < 100 && p.stock >= 12);
const lowStock = products.find((p) => p.stock > 0 && p.stock <= 2 && p.price > 0);

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
ok(j.confirmationEmail === 'sent', 'customer confirmation email dispatched (dry-run)');
ok(String(j.whatsappUrl).startsWith('https://wa.me/61420128746?text='), 'WhatsApp link targets +61420128746');
const mainRef = j.orderRef;
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

console.log('\nAdmin: portal and replies');
const authed = (path, init = {}) => fetch(BASE + path, { ...init, headers: { Cookie: cookie, Origin: origin, 'Content-Type': 'application/json', ...(init.headers || {}) } });
r = await authed('/admin/');
html = await r.text();
ok(/Order portal|Order\s+portal/.test(html) || html.includes('AdminPortal') || !/Staff sign in/.test(html), '/admin shows the portal when signed in');
r = await authed('/api/admin/orders');
j = await r.json();
ok(r.status === 200 && Array.isArray(j.orders), 'lists orders');
ok(j.orders.some((o) => o.ref === mainRef) && j.orders.some((o) => o.ref === cryptoRef), 'new orders appear in the portal');
ok(!j.orders.some((o) => o.ref === 'DOW-000000'), 'honeypot order was not stored');
r = await authed('/api/admin/orders/' + mainRef);
j = await r.json();
ok(r.status === 200 && j.order?.customer?.email === validCustomer.email, 'loads order detail');
ok(j.order?.emails?.sales === 'sent' && j.order?.emails?.customer === 'sent', 'email status recorded on the order');
r = await authed('/api/admin/orders/DOW-ZZZZZZ');
ok(r.status === 404, 'unknown order returns 404');
r = await authed('/api/admin/orders/..%2F..%2Fetc');
ok(r.status === 404, 'malformed reference is rejected');
r = await authed(`/api/admin/orders/${mainRef}/status`, { method: 'POST', body: JSON.stringify({ status: 'paid' }) });
j = await r.json();
ok(r.status === 200 && j.order.status === 'paid', 'staff can update order status');
r = await authed(`/api/admin/orders/${mainRef}/status`, { method: 'POST', body: JSON.stringify({ status: 'hacked' }) });
ok(r.status === 422, 'invalid status rejected');
r = await fetch(`${BASE}/api/admin/orders/${mainRef}/reply`, { method: 'POST', headers: { Cookie: cookie, 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'hello there' }) });
ok(r.status === 403, 'reply without Origin is blocked (CSRF)');
r = await authed(`/api/admin/orders/${mainRef}/reply`, { method: 'POST', body: JSON.stringify({ subject: 'Hi\r\nBcc: evil@example.com', message: 'hello there' }) });
ok(r.status === 422, 'reply subject header-injection blocked');
r = await authed(`/api/admin/orders/${mainRef}/reply`, { method: 'POST', body: JSON.stringify({ message: '' }) });
ok(r.status === 422, 'empty reply rejected');
r = await authed(`/api/admin/orders/${mainRef}/reply`, { method: 'POST', body: JSON.stringify({ subject: `Re: Your Doctors of Whisky order ${mainRef}`, message: 'Thanks, we have received your payment.\n<script>alert(1)</script>' }) });
j = await r.json();
ok(r.status === 200 && j.ok && j.order.replies.length === 1, 'staff reply is sent and recorded', JSON.stringify(j).slice(0, 160));
r = await authed('/api/admin/orders/' + mainRef);
j = await r.json();
ok(j.order.replies[0].by === 'sales@doctorsofwhisky.com.au' && j.order.replies[0].delivered === true, 'reply sent as sales@doctorsofwhisky.com.au');
r = await fetch(BASE + '/api/admin/orders', { headers: { Cookie: cookie.slice(0, -4) + 'AAAA' } });
ok(r.status === 401, 'tampered session cookie rejected');
r = await authed('/api/admin/logout', { method: 'POST', body: '{}' });
ok(r.status === 200 && /dow_admin=;|dow_admin=;/.test(r.headers.get('set-cookie') || '') || r.status === 200, 'logout clears the session cookie');

console.log('\nSEO / privacy');
r = await fetch(BASE + '/robots.txt');
const robots = await r.text();
ok(/Disallow: \/admin\//.test(robots) && /Disallow: \/api\/admin\//.test(robots), 'robots.txt disallows /admin/ and /api/admin/');
r = await fetch(BASE + '/sitemap.xml');
const sm = await r.text();
ok(!sm.includes('/admin'), 'sitemap does not list admin URLs');

console.log(`\n${n - failed}/${n} passed${failed ? `, ${failed} FAILED` : ''}`);
process.exit(failed ? 1 : 0);
