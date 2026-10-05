const fs = require('fs');
const rows = JSON.parse(fs.readFileSync(require('path').join(__dirname,'..','..','docs','keyword-report','data','kwrows.json'), 'utf8'));
const master = JSON.parse(fs.readFileSync(require('path').join(__dirname,'..','..','docs','keyword-report','data','kwmaster.json'), 'utf8'));
const stats = JSON.parse(fs.readFileSync(require('path').join(__dirname,'..','..','docs','keyword-report','data','kwstats.json'), 'utf8'));
const types = JSON.parse(fs.readFileSync(require('path').join(__dirname,'..','..','docs','keyword-report','data','kwtypes.json'), 'utf8'));
const e = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
const fmt = (n) => (n === '' || n == null ? '—' : Number(n).toLocaleString('en-AU'));
const RK = { primary: 0, secondary: 1, tag: 2, 'faq keyword': 3 };
const tbl = (rs) =>
  `<table><thead><tr><th>Keyword</th><th>Intent (Semrush)</th><th>Used as</th><th class=n>Volume</th><th class=n>KD</th></tr></thead><tbody>${rs
    .map((r) => `<tr><td>${e(r.kw)}</td><td>${e(r.intent || '—')}</td><td>${r.role}</td><td class=n>${fmt(r.vol)}</td><td class=n>${fmt(r.kd)}</td></tr>`)
    .join('')}</tbody></table>`;
const forPage = (p) => rows.filter((r) => r.page === p).sort((a, b) => RK[a.role] - RK[b.role] || (b.vol || 0) - (a.vol || 0));
const ofType = (t) => rows.filter((r) => r.type === t);
const priRows = (t) => ofType(t).filter((r) => r.role === 'primary').sort((a, b) => (b.vol || 0) - (a.vol || 0));
const priTbl = (rs) =>
  `<table><thead><tr><th>Page</th><th>Primary keyword</th><th>Intent (Semrush)</th><th class=n>Volume</th><th class=n>KD</th></tr></thead><tbody>${rs
    .map((r) => `<tr><td class=pg>${e(r.page)}</td><td>${e(r.kw)}</td><td>${e(r.intent || '—')}</td><td class=n>${fmt(r.vol)}</td><td class=n>${fmt(r.kd)}</td></tr>`)
    .join('')}</tbody></table>`;
const secTbl = (t) => {
  const pages = [...new Set(ofType(t).map((r) => r.page))];
  return pages
    .map((p) => {
      const rs = forPage(p);
      const pr = rs.find((r) => r.role === 'primary');
      return `<details><summary><b>${e(p)}</b>${pr ? ' — primary: ' + e(pr.kw) : ''}</summary>${tbl(rs)}</details>`;
    })
    .join('');
};
const distRow = (label, d) =>
  `<tr><td>${label}</td><td class=n>${d.Transactional}</td><td class=n>${d.Commercial}</td><td class=n>${d.Navigational}</td><td class=n>${d.Informational}</td><td class=n>${d['not in bank']}</td></tr>`;
const top = master.filter((m) => m.p).slice(0, 25);
const faqRows = forPage('/faq/');

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>On-Page Keywords Report</title>
<style>
:root{--bg:#fff;--fg:#1b1b1b;--mut:#666;--line:#e6e6e6;--acc:#9a5b12;--chip:#f6efe6;--card:#faf7f2}
@media (prefers-color-scheme:dark){:root{--bg:#121212;--fg:#eee;--mut:#a8a8a8;--line:#2d2d2d;--acc:#e0a24a;--chip:#2a2118;--card:#1a1713}}
*{box-sizing:border-box}body{background:var(--bg);color:var(--fg);font:14px/1.5 system-ui,sans-serif;margin:0;padding:20px 14px 60px;max-width:1150px;margin-inline:auto}
h1{font-size:24px;margin:0 0 4px}h2{font-size:18px;margin:34px 0 8px;color:var(--acc);border-bottom:1px solid var(--line);padding-bottom:6px}p{color:var(--mut);margin:4px 0 8px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:14px 0}.card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 12px}.card b{display:block;font-size:22px}
table{width:100%;border-collapse:collapse;font-size:13px;margin:6px 0 4px}th,td{text-align:left;padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top}th{color:var(--mut);font-size:11px;text-transform:uppercase}.n{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}.pg{color:var(--mut);font-size:12px;word-break:break-all;max-width:330px}
details{border:1px solid var(--line);border-radius:8px;margin:6px 0;padding:6px 10px;background:var(--card)}summary{cursor:pointer}
input,select{padding:7px 9px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--fg);font:inherit;margin:4px 6px 4px 0}.note{background:var(--chip);border-radius:8px;padding:9px 12px;margin:10px 0}
</style></head><body>
<h1>On-Page Keywords Report: doctorsofwhisky.com.au</h1>
<p>Every primary, secondary and tag keyword used on the website, with Semrush intent, monthly search volume (Australia) and keyword difficulty exactly as exported (Keywords Bank, 28 Sept 2026). Rule applied: Transactional &gt; Commercial &gt; Navigational &gt; Informational; KD 28 and below.</p>
<div class="cards">
<div class="card"><b>${stats.unique.toLocaleString('en-AU')}</b>unique keywords</div>
<div class="card"><b>${stats.placements.toLocaleString('en-AU')}</b>placements on 655 pages</div>
<div class="card"><b>${stats.primary.n}</b>unique primary keywords</div>
<div class="card"><b>${stats.secondary.n.toLocaleString('en-AU')}</b>unique secondary</div>
<div class="card"><b>${stats.tag.n.toLocaleString('en-AU')}</b>unique tags</div>
<div class="card"><b>${stats.inBank.toLocaleString('en-AU')}</b>found in the Semrush export (${Math.round((stats.inBank / stats.unique) * 100)}%)</div>
</div>
<div class="note">${stats.unique - stats.inBank} keywords (mostly one-off product-name phrases such as “macallan aera scotch whisky”) are not rows in the Semrush export, so their intent and volume show “—”. Nothing was estimated.</div>

<h2>1. Keywords per page type</h2>
<table><thead><tr><th>Page type</th><th class=n>Pages</th><th class=n>Primary</th><th class=n>Secondary</th><th class=n>Tags</th><th class=n>FAQ keywords</th><th class=n>Unique keywords</th></tr></thead><tbody>
${types.map((t) => `<tr><td>${t.type}</td><td class=n>${t.pages}</td><td class=n>${t.primary}</td><td class=n>${t.secondary.toLocaleString('en-AU')}</td><td class=n>${t.tags.toLocaleString('en-AU')}</td><td class=n>${t.faq}</td><td class=n>${t.unique.toLocaleString('en-AU')}</td></tr>`).join('')}
</tbody></table>
<p>Each product, sub-category, category, page and blog post carries 1 primary, 15 secondary and 20 tags; the homepage carries its primary keywords, 15 secondary and 26 tags.</p>

<h2>2. Intent mix (unique keywords, intent used = highest priority)</h2>
<table><thead><tr><th>Role</th><th class=n>Transactional</th><th class=n>Commercial</th><th class=n>Navigational</th><th class=n>Informational</th><th class=n>Not in export</th></tr></thead><tbody>
${distRow('Primary', stats.primary.dist)}${distRow('Secondary', stats.secondary.dist)}${distRow('Tags', stats.tag.dist)}${distRow('All keywords', stats.all)}
</tbody></table>

<h2>3. Homepage (https://doctorsofwhisky.com.au/)</h2>${tbl(forPage('/'))}
<h2>4. Main pages</h2>${secTbl('Page')}
<h2>5. Categories</h2>${secTbl('Category')}
<h2>6. Top 25 primary keywords by search volume</h2>
<table><thead><tr><th>Keyword</th><th>Intent (Semrush)</th><th class=n>Volume</th><th class=n>KD</th><th class=n>Pages</th><th>Page type</th></tr></thead><tbody>${top.map((m) => `<tr><td>${e(m.k)}</td><td>${e(m.i)}</td><td class=n>${fmt(m.v)}</td><td class=n>${fmt(m.d)}</td><td class=n>${m.n}</td><td>${e(m.ty)}</td></tr>`).join('')}</tbody></table>
<h2>7. Sub-category pages: primary keywords (${priRows('Sub-category').length})</h2>${priTbl(priRows('Sub-category'))}
<details><summary>Secondary keywords and tags for every sub-category page</summary>${secTbl('Sub-category')}</details>
<h2>8. Blog posts: primary keywords (${priRows('Blog').length})</h2>${priTbl(priRows('Blog'))}
<details><summary>Secondary keywords and tags for every blog post</summary>${secTbl('Blog')}</details>
<h2>9. Product pages: primary keywords (${priRows('Product').length})</h2>
<details><summary>Show all ${priRows('Product').length} product primary keywords</summary>${priTbl(priRows('Product'))}</details>
<p>The secondary keywords and tags for each product are in the spreadsheet <code>keywords-by-page.csv</code>.</p>
<h2>10. FAQ page keywords</h2>${tbl(faqRows)}

<h2>11. Full keyword list (search and filter)</h2>
<input id="q" placeholder="Search keyword…"><select id="r"><option value="">Any role</option><option value="p">Primary</option><option value="s">Secondary</option><option value="t">Tag</option></select><select id="i"><option value="">Any intent</option><option>Transactional</option><option>Commercial</option><option>Navigational</option><option>Informational</option></select><span id="c" style="color:var(--mut)"></span>
<table id="mt"><thead><tr><th>Keyword</th><th>Intent (Semrush)</th><th>Used as</th><th class=n>Volume</th><th class=n>KD</th><th class=n>Pages</th></tr></thead><tbody></tbody></table>
<p>Files: <code>keywords-master.csv</code> (one row per keyword) and <code>keywords-by-page.csv</code> (all ${stats.placements.toLocaleString('en-AU')} placements).</p>
<script>
const D=${JSON.stringify(master.map((m) => [m.k, m.i, m.u, m.v, m.d, m.p, m.s, m.t, m.f, m.n]))};
const tb=document.querySelector('#mt tbody');const q=document.getElementById('q'),r=document.getElementById('r'),it=document.getElementById('i'),c=document.getElementById('c');
function role(x){return [x[5]&&'primary',x[6]&&'secondary',x[7]&&'tag',x[8]&&'faq'].filter(Boolean).join(' + ')}
function draw(){const s=q.value.trim().toLowerCase(),rr=r.value,ii=it.value;let n=0,h='';for(const x of D){if(s&&!x[0].includes(s))continue;if(rr==='p'&&!x[5])continue;if(rr==='s'&&!x[6])continue;if(rr==='t'&&!x[7])continue;if(ii&&x[2]!==ii)continue;n++;if(n<=400)h+='<tr><td>'+x[0].replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</td><td>'+(x[1]||'—')+'</td><td>'+role(x)+'</td><td class=n>'+(x[3]===''?'—':x[3].toLocaleString('en-AU'))+'</td><td class=n>'+(x[4]===''?'—':x[4])+'</td><td class=n>'+x[9]+'</td></tr>';}tb.innerHTML=h;c.textContent=n.toLocaleString('en-AU')+' keywords'+(n>400?' (first 400 shown, refine the search or use the CSV)':'');}
q.oninput=r.onchange=it.onchange=draw;draw();
</script></body></html>`;
fs.writeFileSync(require('path').join(__dirname,'..','..','docs','keyword-report','on-page-keywords-report.html'), html);
console.log('html', Math.round(html.length / 1024) + 'KB');
