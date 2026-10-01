// On-page SEO check for every blog post on a running server. Usage: node scripts/blog-audit.mjs http://127.0.0.1:3100
const base = process.argv[2] || 'http://127.0.0.1:3100';
const get = async (u) => (await fetch(u)).text();
const slugs = [...(await get(base + '/sitemap-blog.xml')).matchAll(/\/blog\/([^/<]+)\//g)].map((m) => m[1]);
const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&amp;|&#x27;|&#39;|’|'/g, '').replace(/[^a-z0-9 ]/g, ' ');
const tok = (s) => norm(s).split(/\s+/).filter(Boolean);
const has = (text, kw) => { const t = new Set(tok(text)); return tok(kw).every((w) => t.has(w) || t.has(w + 's') || t.has(w.replace(/s$/, ''))); };
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
let score = 0, rows = [];
for (const slug of slugs) {
  const h = await get(`${base}/blog/${slug}/`);
  const kw = (h.match(/"keywords":"([^",]+)/) || [])[1] || '';
  const title = (h.match(/<title[^>]*>([^<]*)</) || [])[1] || '';
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1 = strip((h.match(/<h1[\s\S]*?<\/h1>/) || [''])[0]);
  const article = (h.match(/<article[\s\S]*?<\/article>/) || [''])[0];
  const text = strip(article);
  const afterMeta = text.slice(text.indexOf(h1) + h1.length);
  const first100 = afterMeta.split(' ').slice(0, 130).join(' '); // skips read-time / date chips
  const words = text.split(' ').length;
  const internal = (article.match(/href="\/(shop|blog)\//g) || []).length;
  const external = (article.match(/href="https?:\/\/[^"]+"[^>]*rel="[^"]*noopener/g) || []).length;
  const faq = (article.match(/<details/g) || []).length;
  const h2 = (article.match(/<h2/g) || []).length;
  const alts = [...article.matchAll(/<img[^>]*alt="([^"]*)"/g)].map((m) => m[1]);
  const checks = { T: has(title, kw), D: has(desc, kw), H1: has(h1, kw), I: has(first100, kw), A: alts.some((a) => has(a, kw)), W: words >= 1200, L: internal >= 8, X: external >= 2, F: faq >= 5, S: h2 >= 8 };
  const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
  score += 10 - failed.length;
  rows.push(`${failed.length ? 'WARN' : ' ok '} ${String(words).padStart(5)}w int${String(internal).padStart(2)} ext${external} faq${faq} h2:${String(h2).padStart(2)}  ${slug.slice(0, 44).padEnd(44)} ${failed.length ? 'missing: ' + failed.join(',') : ''} [${kw}]`);
}
console.log(rows.join('\n'));
console.log(`\n${slugs.length} posts | checks passed ${score}/${slugs.length * 10} (${Math.round((score / (slugs.length * 10)) * 100)}%)`);
