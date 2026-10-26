// Builds an HTML summary of the keyword map actually served by the site (primary + secondaries per URL, by intent), checked against fresh Semrush AU numbers.
//   node scripts/seo-tools/keyword-summary.mjs http://127.0.0.1:3100   -> docs/keyword-report/keyword-summary.html
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const base = process.argv[2] || 'http://127.0.0.1:3100';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const A = path.resolve(ROOT, '..', 'SEO Analysis');
const BANK = path.resolve(ROOT, '..', 'Whisky Keywords Bank', '_SUMMARY', 'keyword-bank-summary-vol50plus.csv');

// ---- keyword facts: bank + mapping + fresh Semrush (2026-10-25/26) ----
const info = new Map(); // kw -> {vol, kd, intent}
function parse(line) { const o = []; let c = '', q = false; for (let i = 0; i < line.length; i++) { const ch = line[i]; if (q) { if (ch === '"') { if (line[i + 1] === '"') { c += '"'; i++; } else q = false; } else c += ch; } else if (ch === '"') q = true; else if (ch === ',') { o.push(c); c = ''; } else c += ch; } o.push(c); return o; }
for (const l of fs.readFileSync(BANK, 'utf8').replace(/^﻿/, '').split(/\r?\n/).slice(1).filter(Boolean)) { const p = parse(l); info.set(p[0], { vol: +p[3], kd: p[4] === '' ? null : +p[4], intent: p[2] }); }
const walk = (x) => { if (!x) return; if (Array.isArray(x)) return x.forEach(walk); if (typeof x === 'object') { if (x.kw && x.vol != null) info.set(String(x.kw).toLowerCase(), { vol: x.vol, kd: x.kd, intent: x.intent }); Object.values(x).forEach(walk); } };
for (const f of ['mapping-v2.json', 'home-seo.json', 'page-seo.json']) walk(JSON.parse(fs.readFileSync(path.join(A, f), 'utf8')));
for (const [slug, v] of Object.entries(JSON.parse(fs.readFileSync(path.join(A, 'blog-seo.json'), 'utf8')))) if (v.vol != null && !info.has(v.primary)) info.set(v.primary, { vol: v.vol, kd: v.kd, intent: 'Informational' });
const SEMRUSH = [ // [keyword, volume, kd, intent] read from Semrush AU on 2026-10-26
  ['veuve clicquot', 14800, 22, 'Commercial'], ['hennessy', 12100, 26, 'Commercial'], ['dom perignon', 9900, 39, 'Informational'], ['kahlua', 9900, 30, 'Informational'],
  ['absolut vodka', 8100, 25, 'Commercial'], ['heineken', 6600, 43, 'Informational'], ['captain morgan', 5400, 14, 'Informational'], ['bollinger champagne', 4400, 20, 'Commercial'],
  ['jameson', 4400, 16, 'Commercial'], ['grand marnier', 3600, 22, 'Informational'], ['hennessy vsop', 3600, 17, 'Commercial'], ['limoncello spritz recipe', 3600, 22, 'Informational'],
  ['espolon tequila', 2400, 17, 'Commercial'], ['moet chandon', 2400, 34, 'Commercial'], ['pure blonde', 2400, 24, 'Commercial'], ['casamigos', 1900, 17, 'Commercial'],
  ['crown royal', 1900, 19, 'Commercial'], ['starward', 1900, 19, 'Navigational'], ['what is gin made from', 1900, 11, 'Informational'], ['how many standard drinks in a bottle of wine', 1600, 22, 'Informational'],
  ['piper heidsieck', 1600, 28, 'Navigational'], ['pol roger', 1300, 11, 'Informational'], ['whispering angel', 1300, 13, 'Informational'], ['what is prosecco', 1300, 20, 'Informational'],
  ['cointreau cocktails', 1000, 24, 'Informational'], ['louis roederer', 1000, 20, 'Navigational'], ['taittinger', 1000, 17, 'Informational'], ['pommery', 880, 33, 'Navigational'],
  ['cognac vs brandy', 720, 13, 'Commercial'], ['mini champagne', 480, 20, 'Commercial'], ['best tequila for margaritas', 390, 13, 'Commercial'], ['jameson whiskey price', 390, 14, 'Transactional'],
  ['veuve clicquot price', 390, 17, 'Transactional'], ['cointreau 1l', 390, 12, 'Commercial'], ['absolut vodka flavours', 260, 16, 'Commercial'], ['how long does champagne last', 260, 9, 'Informational'],
  ['champagne for sale', 170, 21, 'Transactional'], ['buy champagne', 480, 23, 'Transactional'], ['champagne on sale', 320, 18, 'Transactional'], ['champagne price', 390, 17, 'Commercial'],
  ['moet and chandon price', 170, 13, 'Transactional'], ['champagne', 18100, 33, 'Informational'],
];
for (const [k, v, kd, i] of SEMRUSH) info.set(k, { vol: v, kd, intent: i });

// ---- crawl the served site ----
const locs = (x) => [...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const idx = locs(await (await fetch(base + '/sitemap.xml')).text());
let urls = [];
for (const s of idx) urls.push(...locs(await (await fetch(base + new URL(s).pathname)).text()));
urls = [...new Set(urls)].filter((u) => !/\/page\/\d+\/$/.test(u));
const pages = [];
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
const run = async (u) => {
  const p = new URL(u).pathname; const h = await (await fetch(base + p)).text();
  const m = h.match(/<meta name="keywords" content="([^"]*)"/);
  const kws = m ? decode(m[1]).split(',').map((s) => s.trim().toLowerCase()).filter(Boolean) : [];
  const type = p === '/' ? 'Home' : /^\/brands\/./.test(p) ? 'Brand hub' : /^\/(collections|gifts)\//.test(p) ? 'Landing page' : /^\/blog\/./.test(p) ? 'Blog post' : /\/collection\//.test(p) ? 'Collection' : /^\/shop\/[^/]+\/[^/]+\/$/.test(p) ? 'Product' : /^\/shop\/[^/]+\/$/.test(p) ? 'Category' : 'Page';
  const t = (h.match(/<title[^>]*>([^<]*)/) || [])[1];
  pages.push({ p, type, kws, title: decode(t || '') });
};
for (let i = 0; i < urls.length; i += 8) await Promise.all(urls.slice(i, i + 8).map(run));
pages.sort((a, b) => a.p.localeCompare(b.p));

const short = (i) => (i ? ({ Transactional: 'T', Commercial: 'C', Informational: 'I', Navigational: 'N' }[String(i).split(/[ ,]+/)[0]] || (/Transactional/.test(i) ? 'T' : /Commercial/.test(i) ? 'C' : /Navigational/.test(i) ? 'N' : 'I')) : '?');
const intentOf = (k) => { const x = info.get(k); if (!x) return '?'; const s = String(x.intent || ''); return /Transactional/.test(s) ? 'T' : /Commercial/.test(s) ? 'C' : /Navigational/.test(s) ? 'N' : /Informational/.test(s) ? 'I' : '?'; };
const types = ['Home', 'Category', 'Collection', 'Brand hub', 'Landing page', 'Product', 'Blog post', 'Page'];
const stat = {}; for (const t of types) stat[t] = { pages: 0, T: 0, C: 0, I: 0, N: 0, '?': 0, kd: [] };
const owner = new Map(); // primary kw -> path
const inSecond = new Map(); // kw -> [paths]
for (const pg of pages) {
  if (!pg.kws.length) continue;
  const s = stat[pg.type]; s.pages++;
  const pr = pg.kws[0]; s[intentOf(pr)]++; owner.set(pr, pg.p);
  const x = info.get(pr); if (x && x.kd != null) s.kd.push(x.kd);
  for (const k of pg.kws.slice(1)) (inSecond.get(k) || inSecond.set(k, []).get(k)).push(pg.p);
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const badge = (c) => `<span class="b b${c}">${c}</span>`;
const total = pages.filter((p) => p.kws.length).length;
const sum = (k) => types.reduce((a, t) => a + stat[t][k], 0);

// Semrush cross-check
const check = SEMRUSH.map(([k, v, kd, i]) => {
  let where = owner.get(k) ? `primary: ${owner.get(k)}` : inSecond.get(k) ? `secondary on ${inSecond.get(k).length} page(s), e.g. ${inSecond.get(k)[0]}` : 'not on site';
  let status = kd > 29 ? 'over KD 29 (excluded by rule)' : owner.get(k) ? 'owned' : inSecond.get(k) ? 'covered as secondary' : /Informational|Navigational/.test(i) && v >= 1000 ? 'GAP (blog candidate)' : 'GAP';
  if (kd <= 29 && !owner.get(k) && !inSecond.get(k)) {
    // brand head terms match a hub's primary written differently
    const hit = pages.find((p) => p.kws.slice(0, 1).some((x) => x.includes(k) || k.includes(x)) && p.type === 'Brand hub');
    if (hit) { where = `via hub primary "${hit.kws[0]}": ${hit.p}`; status = 'covered by brand hub'; }
  }
  return { k, v, kd, i, where, status };
});

const rowsTop = [...owner.entries()].map(([k, p]) => ({ k, p, ...info.get(k) })).filter((r) => r.vol != null).sort((a, b) => b.vol - a.vol).slice(0, 45);
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Keyword map summary</title>
<style>
:root{--bg:#0f0f10;--card:#18181b;--line:#2a2a2e;--tx:#e7e5e4;--mut:#a8a29e;--gold:#fbbf24;--T:#22c55e;--C:#38bdf8;--I:#a78bfa;--N:#f97316}
@media(prefers-color-scheme:light){:root{--bg:#faf9f7;--card:#fff;--line:#e5e1da;--tx:#1c1917;--mut:#6b6560;--gold:#b45309}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:14px/1.5 system-ui,Segoe UI,sans-serif;padding:20px}
h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:28px 0 8px;color:var(--gold)}p.s{color:var(--mut);margin:0 0 14px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}.c{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px}.c b{font-size:24px;display:block}
table{width:100%;border-collapse:collapse;background:var(--card);border:1px solid var(--line);border-radius:10px;overflow:hidden}th,td{padding:7px 9px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}th{color:var(--mut);font-weight:600;font-size:12px}
.b{display:inline-block;min-width:20px;text-align:center;border-radius:5px;padding:0 5px;font-weight:700;font-size:12px;color:#0b0b0c}.bT{background:var(--T)}.bC{background:var(--C)}.bI{background:var(--I)}.bN{background:var(--N)}.b\\?{background:#777}
.ok{color:var(--T)}.gap{color:#ef4444;font-weight:700}.warn{color:#f59e0b}.wrap{overflow-x:auto}small{color:var(--mut)}code{font-size:12px}
</style></head><body>
<h1>Keyword map summary: what the live site targets</h1>
<p class="s">Read from the served site (${total} pages with a keyword set) and checked against Semrush AU data pulled on 2026-10-25/26. Golden rule: one primary per URL, KD ≤ 29, Transactional first, Commercial for high volume.</p>
<div class="cards">
<div class="c"><b>${total}</b>pages with keywords</div><div class="c"><b style="color:var(--T)">${sum('T')}</b>primary = Transactional</div><div class="c"><b style="color:var(--C)">${sum('C')}</b>primary = Commercial</div><div class="c"><b style="color:var(--I)">${sum('I')}</b>primary = Informational</div><div class="c"><b style="color:var(--N)">${sum('N')}</b>primary = Navigational</div><div class="c"><b>${sum('?')}</b>intent not in data (product names)</div>
</div>
<h2>Primary keyword intent by page type</h2>
<div class="wrap"><table><tr><th>Page type</th><th>Pages</th><th>${badge('T')}</th><th>${badge('C')}</th><th>${badge('I')}</th><th>${badge('N')}</th><th>no intent data</th><th>Avg KD of primary</th></tr>
${types.filter((t) => stat[t].pages).map((t) => { const s = stat[t]; const kd = s.kd.length ? Math.round(s.kd.reduce((a, b) => a + b, 0) / s.kd.length) : '-'; return `<tr><td>${t}</td><td>${s.pages}</td><td>${s.T}</td><td>${s.C}</td><td>${s.I}</td><td>${s.N}</td><td>${s['?']}</td><td>${kd}</td></tr>`; }).join('')}</table></div>
<p class="s" style="margin-top:6px">Products carry their own name as primary when no bank keyword fits (so “no intent data”); money keywords sit on collections, brand hubs and landing pages by design. Blogs target Informational/Navigational/Commercial; their secondaries are I/N and tags are Commercial.</p>
<h2>Top 45 primary keywords by volume</h2>
<div class="wrap"><table><tr><th>Keyword</th><th>Intent</th><th>Vol</th><th>KD</th><th>Page</th></tr>
${rowsTop.map((r) => `<tr><td>${esc(r.k)}</td><td>${badge(intentOf(r.k))}</td><td>${r.vol.toLocaleString()}</td><td>${r.kd ?? '-'}</td><td><code>${esc(r.p)}</code></td></tr>`).join('')}</table></div>
<h2>Fresh Semrush check: are we on track?</h2>
<p class="s">${check.filter((c) => /owned|covered/.test(c.status)).length} of ${check.length} keywords checked in Semrush are owned or covered; ${check.filter((c) => /GAP/.test(c.status)).length} gaps; ${check.filter((c) => /over KD/.test(c.status)).length} are above KD 29.</p>
<div class="wrap"><table><tr><th>Keyword</th><th>Intent</th><th>Vol</th><th>KD</th><th>Status</th><th>Where on the site</th></tr>
${check.sort((a, b) => b.v - a.v).map((c) => `<tr><td>${esc(c.k)}</td><td>${badge(intentOf(c.k))}</td><td>${c.v.toLocaleString()}</td><td>${c.kd}</td><td class="${/GAP/.test(c.status) ? 'gap' : /over KD/.test(c.status) ? 'warn' : 'ok'}">${c.status}</td><td><code>${esc(c.where)}</code></td></tr>`).join('')}</table></div>
<h2>Brand hubs and landing pages (the money pages)</h2>
<div class="wrap"><table><tr><th>URL</th><th>Primary</th><th>Intent</th><th>Vol</th><th>KD</th></tr>
${pages.filter((p) => p.type === 'Brand hub' || p.type === 'Landing page' || p.type === 'Home' || p.type === 'Category').map((p) => { const k = p.kws[0]; const x = info.get(k) || {}; return `<tr><td><code>${esc(p.p)}</code></td><td>${esc(k || '')}</td><td>${badge(intentOf(k))}</td><td>${x.vol != null ? x.vol.toLocaleString() : '-'}</td><td>${x.kd ?? '-'}</td></tr>`; }).join('')}</table></div>
<p class="s" style="margin-top:14px">Generated ${new Date().toISOString().slice(0, 10)} by scripts/seo-tools/keyword-summary.mjs.</p>
</body></html>`;
fs.mkdirSync(path.join(ROOT, 'docs', 'keyword-report'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'docs', 'keyword-report', 'keyword-summary.html'), html);
console.log(`pages ${total} | T ${sum('T')} C ${sum('C')} I ${sum('I')} N ${sum('N')} ?${sum('?')}`);
console.log(check.filter((c) => /GAP/.test(c.status)).map((c) => `GAP ${c.k} ${c.v}/${c.kd}`).join('\n'));
