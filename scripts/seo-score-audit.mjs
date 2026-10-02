// Page-by-page SEO score for keyword strategy v2. Usage: node scripts/seo-score-audit.mjs http://127.0.0.1:3100
// Each page is scored on the checks below; 100% = every check passes. Output: docs/seo-score-results.json + summary on stdout.
import fs from 'node:fs';
import path from 'node:path';

const base = process.argv[2] || 'http://127.0.0.1:3100';
const ROOT = process.cwd();
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const jsonAfter = (file, exportName, open = '= [', close = '\n];') => { const t = read(file); const s = t.indexOf(open, t.indexOf(`export const ${exportName}`)) + open.length - 1; const e = t.indexOf(close, s) + close.length - 1; return JSON.parse(t.slice(s, e)); };
const PRODUCTS = jsonAfter('lib/data/products.ts', 'PRODUCTS');
const SUBS = jsonAfter('lib/data/subcategories.ts', 'SUBCATEGORIES');
const objAfter = (file, name) => { const t = read(file); const s = t.indexOf('= {', t.indexOf(`export const ${name}`)) + 2; const e = t.lastIndexOf('};') + 1; return JSON.parse(t.slice(s, e)); };
const BLOG = objAfter('lib/data/blog-seo.ts', 'BLOG_SEO');
const PAGE = objAfter('lib/data/page-seo.ts', 'PAGE_SEO');
const CAT = objAfter('lib/data/category-seo.ts', 'CATEGORY_SEO');
const HOME = (() => { const t = read('lib/data/home-seo.ts'); return JSON.parse(t.slice(t.indexOf('= {') + 2, t.lastIndexOf('};') + 1)); })();

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&amp;|&#x27;|&#39;|&quot;/g, ' ').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ');
const has = (hay, kw) => norm(hay).includes(norm(kw));
const section = (h, label) => { const m = h.match(new RegExp(`aria-label="${label}"[\\s\\S]*?</section>`)); return m ? m[0] : ''; };
const count = (s, re) => (s.match(re) || []).length;

const results = [];
async function audit(url, kind, k) {
  const r = await fetch(base + url);
  const h = await r.text();
  const checks = {};
  const title = (h.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const metaKw = (h.match(/<meta name="keywords" content="([^"]*)"/) || [])[1] || '';
  const h1 = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
  const h2 = [...h.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => text(m[1]));
  const body = text(h);
  const imgs = [...h.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const related = section(h, 'Related searches[^"]*');
  const tagsSec = section(h, 'Popular searches and tags');
  const primary = k.primary;
  checks['HTTP 200'] = r.status === 200;
  checks['one H1'] = h1.length === 1;
  checks['2+ H2 headings'] = h2.length >= 2;
  checks['canonical'] = /rel="canonical"/.test(h);
  checks['JSON-LD present'] = /application\/ld\+json/.test(h);
  checks['every image has alt'] = imgs.every((i) => /\balt="[^"]+"/.test(i));
  checks['primary keyword in title'] = has(title, primary);
  checks['primary keyword in meta description'] = has(desc, primary);
  checks['primary keyword in a heading (H1/H2)'] = [...h1, ...h2].some((x) => has(x, primary)) || (kind === 'home' && h1.some((x) => has(x, primary)));
  checks['primary keyword in page copy'] = has(body, primary);
  checks['meta keywords carry primary + 15 secondary'] = has(metaKw, primary) && k.secondary.filter((s) => has(metaKw, s)).length >= Math.min(15, k.secondary.length);
  if (['product', 'sub', 'category', 'blog', 'page', 'faq', 'blogindex'].includes(kind)) {
    checks['15 secondary keywords visible as links (H2 section)'] = count(related, /<li>/g) >= Math.min(15, k.secondary.length) || (kind === 'home');
  }
  if (kind === 'home') checks['15 secondary keywords visible as links (H2 section)'] = count(section(h, 'Popular whisky searches'), /<li>/g) >= 15;
  if (kind === 'home') checks['tags line (20+ high-volume tags)'] = count(section(h, 'Tags line'), /<li>/g) >= 20;
  if (['product', 'blog'].includes(kind)) checks['20 tags visible'] = count(tagsSec, /<li>/g) >= 20;
  if (['sub', 'category', 'page', 'faq', 'blogindex'].includes(kind)) checks['tags visible'] = count(tagsSec, /<li>/g) >= 15;
  if (['product', 'sub', 'category'].includes(kind)) checks['outbound link to authority site'] = /href="https:\/\/(en\.wikipedia\.org|www\.healthdirect\.gov\.au|www\.scotch-whisky\.org\.uk|www\.cognac\.fr|www\.crt\.org\.mx|www\.wineaustralia\.com)/.test(h);
  if (kind === 'blog') {
    checks['2+ outbound links'] = count(h, /href="https:\/\/(?!doctorsofwhisky)[^"]+"[^>]*rel="[^"]*noopener/g) >= 2 || count(h, /target="_blank"/g) >= 2;
    checks['8+ H2 headings'] = h2.length >= 8;
    checks['primary keyword in first 100 words'] = has(body.split(/\s+/).slice(0, 400).join(' '), primary);
    checks['primary keyword in an image alt'] = imgs.some((i) => has((i.match(/alt="([^"]*)"/) || [])[1] || '', primary));
  }
  if (['product', 'sub'].includes(kind)) checks['primary keyword in an image alt'] = imgs.some((i) => has((i.match(/alt="([^"]*)"/) || [])[1] || '', primary));
  const passed = Object.values(checks).filter(Boolean).length;
  const total = Object.keys(checks).length;
  results.push({ url, kind, primary, score: Math.round((passed / total) * 100), failed: Object.entries(checks).filter(([, v]) => !v).map(([n]) => n) });
}

const jobs = [];
jobs.push(['/', 'home', { primary: HOME.primary.kw, secondary: HOME.secondary.map((s) => s.kw) }]);
for (const c of Object.keys(CAT)) jobs.push([`/shop/${c}/`, 'category', CAT[c]]);
for (const s of SUBS) jobs.push([`/shop/${s.category}/collection/${s.slug}/`, 'sub', { primary: s.primaryKeyword, secondary: s.secondaryKeywords }]);
for (const p of PRODUCTS) jobs.push([`/shop/${p.category}/${p.slug}/`, 'product', { primary: p.primaryKeyword, secondary: p.secondaryKeywords }]);
for (const [slug, b] of Object.entries(BLOG)) jobs.push([`/blog/${slug}/`, 'blog', { primary: b.primaryKeyword, secondary: b.secondaryKeywords }]);
for (const [p, v] of Object.entries(PAGE)) jobs.push([p, p === '/faq/' ? 'faq' : p === '/blog/' ? 'blogindex' : 'page', v]);

for (let i = 0; i < jobs.length; i += 8) await Promise.all(jobs.slice(i, i + 8).map(([u, kd, k]) => audit(u, kd, k).catch((e) => results.push({ url: u, kind: kd, score: 0, failed: ['error ' + e.message] }))));

const by = {};
for (const r of results) (by[r.kind] ||= []).push(r);
console.log('PAGE TYPE'.padEnd(12), 'PAGES'.padEnd(6), 'AVG'.padEnd(6), '100%'.padEnd(6), 'LOWEST');
for (const [kind, l] of Object.entries(by)) console.log(kind.padEnd(12), String(l.length).padEnd(6), (Math.round(l.reduce((a, x) => a + x.score, 0) / l.length) + '%').padEnd(6), String(l.filter((x) => x.score === 100).length).padEnd(6), Math.min(...l.map((x) => x.score)) + '%');
const all = results.length, avg = Math.round(results.reduce((a, x) => a + x.score, 0) / all), perfect = results.filter((x) => x.score === 100).length;
console.log(`ALL: ${all} pages, average ${avg}%, ${perfect} pages at 100%`);
const fc = {};
results.forEach((r) => r.failed.forEach((f) => { fc[f] = (fc[f] || 0) + 1; }));
console.log('Most common failures:', JSON.stringify(Object.entries(fc).sort((a, b) => b[1] - a[1]).slice(0, 12)));
fs.writeFileSync(path.join(ROOT, 'docs', 'seo-score-results.json'), JSON.stringify(results, null, 1));
