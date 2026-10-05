// For every keyword shown as a tag / related search / popular search on the live site, check that its link lands on a real page that lists products,
// and that a site search for the keyword returns products. Usage: node check-tags.mjs http://127.0.0.1:3100
const base = process.argv[2] || 'http://127.0.0.1:3100';
const get = async (u) => (await fetch(base + u, { redirect: 'follow' })).text();
const locs = (x) => [...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
let urls = [];
for (const s of locs(await get('/sitemap.xml'))) urls.push(...locs(await get(new URL(s).pathname)));
urls = [...new Set(urls.map((u) => new URL(u).pathname))];
const tagLinks = new Map(); // keyword -> Set(href)
const sections = /aria-label="(Tags line|Popular whisky searches|Popular searches and tags|Related searches[^"]*)"[\s\S]*?<\/section>/g;
let pages = 0;
for (let i = 0; i < urls.length; i += 8) await Promise.all(urls.slice(i, i + 8).map(async (u) => {
  const h = await get(u); pages++;
  for (const sec of h.matchAll(sections)) for (const a of sec[0].matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/g)) { const k = a[2].trim(); if (!tagLinks.has(k)) tagLinks.set(k, new Set()); tagLinks.get(k).add(a[1]); }
}));
const cache = new Map();
const landing = async (href) => {
  if (cache.has(href)) return cache.get(href);
  const r = await fetch(base + href, { redirect: 'follow' });
  const h = await r.text();
  const res = { status: r.status, products: (h.match(/\/shop\/[a-z-]+\/[a-z0-9-]+\/"/g) || []).filter((x) => !x.includes('/collection/')).length, isShopRoot: href === '/shop/' || href === '/shop' };
  cache.set(href, res); return res;
};
let total = 0, bad = [], toShop = [];
for (const [kw, hrefs] of tagLinks) for (const href of hrefs) {
  total++;
  const l = await landing(href);
  if (l.status !== 200) bad.push(`${kw} -> ${href} (${l.status})`);
  else if (l.isShopRoot) toShop.push(kw);
  else if (!href.includes('/shop/') && !href.startsWith('/blog')) bad.push(`${kw} -> ${href} (not a shop page)`);
}
// keyword search returns products
const noResults = [];
for (const kw of tagLinks.keys()) { const r = await (await fetch(base + '/api/search/?q=' + encodeURIComponent(kw), { redirect: 'follow' })).json(); if (!r.count) noResults.push(kw); }
console.log(`pages scanned ${pages} | distinct keywords shown as links ${tagLinks.size} | links ${total}`);
console.log(`links that do not return a real page: ${bad.length}`); bad.slice(0, 20).forEach((x) => console.log('  ', x));
console.log(`keywords whose link is the generic shop page: ${new Set(toShop).size}`); [...new Set(toShop)].slice(0, 500).forEach((x) => console.log('  ', x));
console.log(`keywords where the site search returns 0 products: ${noResults.length}`); noResults.slice(0, 500).forEach((x) => console.log('  ', x));
