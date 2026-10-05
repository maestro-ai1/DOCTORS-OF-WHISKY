const B = process.argv[2];
const idx = await (await fetch(B + '/sitemap.xml')).text();
const maps = [...idx.matchAll(/<loc>([^<]+)/g)].map((m) => m[1].replace('https://doctorsofwhisky.com.au', B));
let total = 0, bad = [], noindex = [], canonBad = [];
for (const m of maps) {
  const x = await (await fetch(m)).text();
  const urls = [...x.matchAll(/<url><loc>([^<]+)/g)].map((u) => u[1]);
  for (const u of urls) {
    total++;
    const r = await fetch(u.replace('https://doctorsofwhisky.com.au', B), { redirect: 'manual' });
    if (r.status !== 200) { bad.push(r.status + ' ' + u); continue; }
    const h = await r.text();
    if (/<meta name="robots" content="[^"]*noindex/i.test(h)) noindex.push(u);
    const c = (h.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
    if (c !== u) canonBad.push(u + ' -> ' + c);
  }
}
console.log('urls', total, '| not 200:', bad.length, '| noindex:', noindex.length, '| canonical mismatch:', canonBad.length);
console.log(bad.slice(0, 5).join('\n'), canonBad.slice(0, 5).join('\n'));
