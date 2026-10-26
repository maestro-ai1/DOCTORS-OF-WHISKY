// Flags primary keywords used by more than one URL. Usage: node scripts/seo-tools/dup-keywords.mjs http://127.0.0.1:3100
const base = process.argv[2] || 'http://127.0.0.1:3100';
const locs = (x) => [...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const idx = locs(await (await fetch(base + '/sitemap.xml')).text());
let urls = [];
for (const s of idx) urls.push(...locs(await (await fetch(base + new URL(s).pathname)).text()));
urls = [...new Set(urls)].filter((u) => !/\/page\/\d+\/$/.test(u));
const by = new Map(); let n = 0, none = [];
const run = async (u) => {
  const p = new URL(u).pathname; const h = await (await fetch(base + p)).text(); n++;
  const m = h.match(/<meta name="keywords" content="([^"]*)"/);
  const k = m && m[1].split(',')[0].trim().toLowerCase();
  if (!k) return none.push(p);
  (by.get(k) || by.set(k, []).get(k)).push(p);
};
for (let i = 0; i < urls.length; i += 8) await Promise.all(urls.slice(i, i + 8).map(run));
const dups = [...by].filter(([, v]) => v.length > 1);
console.log(`pages ${n} | with primary ${n - none.length} | duplicate primaries ${dups.length}`);
dups.slice(0, 40).forEach(([k, v]) => console.log(' ', k, '->', v.join('  ')));
console.log('no keywords meta:', none.length, none.slice(0, 8).join(' '));
