// Crawl every sitemap URL; verify every internal link, image and resource returns 200 and every JSON-LD block parses. Usage: node scripts/integrity-audit.mjs http://127.0.0.1:3100
const base = process.argv[2] || 'http://127.0.0.1:3100';
const get = async (u) => (await fetch(u)).text();
const locs = (x) => [...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
let urls = [];
for (const s of locs(await get(base + '/sitemap.xml'))) urls.push(...locs(await get(base + new URL(s).pathname)));
urls = [...new Set(urls)];
const links = new Map(), imgs = new Map(), bad = [];
let ldBlocks = 0;
const run = async (u) => {
  const p = new URL(u).pathname; const h = await get(base + p);
  for (const m of h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) { ldBlocks++; try { const j = JSON.parse(m[1].replace(/&quot;/g, '"')); if (!j['@context'] && !Array.isArray(j) && !j['@graph']) bad.push(`${p} JSON-LD without @context`); } catch (e) { bad.push(`${p} JSON-LD parse error: ${e.message.slice(0, 60)}`); } }
  for (const m of h.matchAll(/<a [^>]*href="(\/[^"#?]*)[^"]*"/g)) { const l = m[1]; if (!links.has(l)) links.set(l, p); }
  for (const m of h.matchAll(/<img [^>]*src="([^"]+)"/g)) { const s = m[1].replace(/&amp;/g, '&'); if (!imgs.has(s)) imgs.set(s, p); }
};
for (let i = 0; i < urls.length; i += 8) await Promise.all(urls.slice(i, i + 8).map(run));
const check = async (map, kind) => { const entries = [...map.entries()]; for (let i = 0; i < entries.length; i += 10) await Promise.all(entries.slice(i, i + 10).map(async ([u, from]) => { try { const r = await fetch(u.startsWith('http') ? u : base + u, { redirect: 'follow' }); if (r.status !== 200) bad.push(`${kind} ${r.status} ${u.slice(0, 90)} (on ${from})`); } catch (e) { bad.push(`${kind} ERR ${u.slice(0, 90)}`); } })); };
await check(links, 'LINK'); await check(imgs, 'IMG');
console.log(`pages ${urls.length} | unique internal links ${links.size} | unique images ${imgs.size} | JSON-LD blocks ${ldBlocks}`);
console.log(bad.length ? `PROBLEMS ${bad.length}\n` + bad.slice(0, 40).join('\n') : 'PROBLEMS 0');
