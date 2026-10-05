const B = 'https://doctorsofwhisky.com.au';
const key = 'dow-indexnow-key-2026';
const idx = await (await fetch(B + '/sitemap.xml', { headers: { 'user-agent': 'Mozilla/5.0 Chrome/130' } })).text();
const maps = [...idx.matchAll(/<loc>([^<]+)/g)].map((m) => m[1]);
let urls = [];
for (const m of maps) { const x = await (await fetch(m, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/130' } })).text(); urls.push(...[...x.matchAll(/<url><loc>([^<]+)/g)].map((u) => u[1])); }
urls = [...new Set(urls)];
console.log('urls', urls.length);
for (const ep of ['https://api.indexnow.org/IndexNow', 'https://www.bing.com/indexnow']) {
  const r = await fetch(ep, { method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify({ host: 'doctorsofwhisky.com.au', key, keyLocation: B + '/dow-indexnow-key-2026.txt', urlList: urls }) });
  console.log(ep, r.status, (await r.text()).slice(0, 200));
}
