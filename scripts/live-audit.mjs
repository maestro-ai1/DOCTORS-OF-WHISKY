// Crawl every sitemap URL on a running server and flag on-page SEO problems. Usage: node scripts/live-audit.mjs http://127.0.0.1:3100
const base = process.argv[2] || 'http://127.0.0.1:3100';
const get = async (u) => (await fetch(u)).text();
const locs = (x) => [...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const idx = locs(await get(base + '/sitemap.xml'));
let urls = [];
for (const s of idx) urls.push(...locs(await get(base + new URL(s).pathname)));
urls = [...new Set(urls)];
const titles = new Map(), descs = new Map(), fails = [], warns = [];
const f = (u, m) => fails.push(`${u}  ${m}`), w = (u, m) => warns.push(`${u}  ${m}`);
let n = 0, tags = 0;
const tagCounts = [];
const run = async (u) => {
  const p = new URL(u).pathname;
  const r = await fetch(base + p); const h = await r.text(); n++;
  if (r.status !== 200) return f(p, 'status ' + r.status);
  const t = (h.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1]?.trim();
  const d = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (!t) f(p, 'no title'); else { if (t.length > 65) w(p, `title ${t.length}`); if (titles.has(t)) f(p, 'dup title with ' + titles.get(t)); titles.set(t, p); }
  if (!d) f(p, 'no meta description'); else { const dl = d.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').length; if (dl > 165) w(p, `desc ${dl}`); if (descs.has(d)) w(p, 'dup desc ' + descs.get(d)); descs.set(d, p); }
  if (h1 !== 1) f(p, `h1 count ${h1}`);
  if (!/rel="canonical"/.test(h)) f(p, 'no canonical');
  if (/noindex/.test(h) && p !== '/thank-you-order/') f(p, 'noindex');
  if (!/application\/ld\+json/.test(h)) w(p, 'no JSON-LD');
  for (const m of h.matchAll(/<img\b[^>]*>/g)) { if (!/\balt="[^"]+"/.test(m[0])) f(p, 'img missing alt'); }
  const tm = h.match(/aria-label="Popular searches and tags"[\s\S]*?<\/ul>/);
  const tc = tm ? (tm[0].match(/<li>/g) || []).length : 0;
  if (/^\/(blog|shop)\/[^/]+\/[^/]+\/$/.test(p) && !p.includes('/collection/')) { tagCounts.push(tc); if (tc < 15) w(p, 'only ' + tc + ' tags'); }
  if (p === '/' && !/aria-label="Tags line"/.test(h)) f(p, 'homepage tags line missing');
  if (tc) tags++;
};
for (let i = 0; i < urls.length; i += 8) await Promise.all(urls.slice(i, i + 8).map(run));
console.log(`crawled ${n}/${urls.length} urls | pages with visible tags: ${tags} | min/max tags on product+blog pages: ${Math.min(...tagCounts)}/${Math.max(...tagCounts)}`);
console.log(`FAIL ${fails.length}`); fails.slice(0, 40).forEach((x) => console.log(' ', x));
console.log(`WARN ${warns.length}`); warns.slice(0, 25).forEach((x) => console.log(' ', x));
