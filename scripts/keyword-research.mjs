// Merges every CSV in "Whisky Keywords Bank", dedupes, classifies by intent / volume / KD and writes docs/keyword-research.*
// Nothing here picks keywords for the site: it only organises the bank so the owner can choose.
import fs from 'fs';
import path from 'path';

const BANK = path.resolve('..', 'Whisky Keywords Bank');
const OUT = path.resolve('docs');

function parseLine(line) {
  const out = [];
  let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
    else if (ch === ',' && !q) { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

// Explicit buying / research words. Used ONLY when the tool left Intent blank, and flagged "inferred".
const TRANS = /\b(buy|buying|purchase|order|shop|store|for sale|price|prices|pricing|cheap|cheapest|discount|deal|deals|sale|online|delivery|deliver|shipping|near me|bottle shop|bottleshop|liquor store|dan murphy|bws|first choice|vintage cellars|coles|woolworths|get)\b/i;
const COMM = /\b(best|top|review|reviews|vs|versus|compare|comparison|alternative|alternatives|recommend|recommended|premium|rare|luxury|gift|gifts|worth it|good|which)\b/i;
const INFO = /\b(what|how|why|when|where|who|is|are|does|can|recipe|recipes|meaning|definition|history|make|made|taste|tastes|calories|abc|ingredients|cocktail|cocktails|pronounce|difference)\b/i;
const NAVI = /\b(login|website|official|\.com|\.com\.au|near me)\b/i;

const rows = new Map();
let raw = 0;
const files = fs.readdirSync(BANK).filter((f) => f.endsWith('.csv'));
for (const f of files) {
  const source = f.replace(/_all-keywords.*$/, '').replace(/-/g, ' ');
  const lines = fs.readFileSync(path.join(BANK, f), 'utf8').split(/\r?\n/);
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const [kw, intent, rel, vol, kd, cpc] = parseLine(lines[i]);
    raw++;
    const volume = Number(vol) || 0;
    if (volume <= 0) continue;
    const key = kw.trim().toLowerCase();
    const row = { keyword: key, intentRaw: (intent || '').trim(), relevance: Number(rel) || 0, volume, kd: kd === '' || kd == null ? null : Number(kd), cpc: Number(cpc) || 0, sources: new Set([source]) };
    const prev = rows.get(key);
    if (!prev) rows.set(key, row);
    else {
      prev.sources.add(source);
      if (row.volume > prev.volume) { prev.volume = row.volume; prev.kd = row.kd ?? prev.kd; }
      if (!prev.intentRaw && row.intentRaw) prev.intentRaw = row.intentRaw;
      prev.relevance = Math.max(prev.relevance, row.relevance);
    }
  }
}

function classify(r) {
  if (r.intentRaw) {
    const parts = r.intentRaw.split(',').map((s) => s.trim());
    // A keyword that carries a Transactional tag is treated as transactional, then commercial, then the rest.
    const bucket = parts.includes('Transactional') ? 'Transactional' : parts.includes('Commercial') ? 'Commercial' : parts.includes('Navigational') ? 'Navigational' : 'Informational';
    return { bucket, basis: 'tool' };
  }
  if (TRANS.test(r.keyword)) return { bucket: 'Transactional', basis: 'inferred' };
  if (COMM.test(r.keyword)) return { bucket: 'Commercial', basis: 'inferred' };
  if (INFO.test(r.keyword)) return { bucket: 'Informational', basis: 'inferred' };
  return { bucket: 'Unclassified', basis: 'none' };
}

const volBand = (v) => (v >= 5000 ? 'A: 5,000+' : v >= 1000 ? 'B: 1,000-4,999' : v >= 300 ? 'C: 300-999' : v >= 100 ? 'D: 100-299' : 'E: 50-99');
const kdBand = (k) => (k == null ? 'unknown' : k <= 14 ? 'easy 0-14' : k <= 29 ? 'doable 15-29' : k <= 49 ? 'hard 30-49' : k <= 69 ? 'very hard 50-69' : 'extreme 70+');

const all = [...rows.values()].map((r) => ({ ...r, ...classify(r), sources: [...r.sources] }));
// Usable pool: real search demand (>= 10/mo) and a relevance score the tool itself rated.
const prodSrc = fs.readFileSync(path.resolve('lib', 'data', 'products.ts'), 'utf8');
const brands = [...new Set([...prodSrc.matchAll(/"brand": "([^"]+)"/g)].map((m) => m[1].toLowerCase().replace(/^the /, '')))].filter((b) => b.length > 2);
const names = [...prodSrc.matchAll(/"name": "([^"]+)"/g)].map((m) => m[1].toLowerCase());
// Product types we have a collection for (taken from the sub-category names), so "buy rum online" counts as stocked too.
const subSrc = fs.readFileSync(path.resolve('lib', 'data', 'subcategories.ts'), 'utf8');
const types = [...new Set([...subSrc.matchAll(/"name": "([^"]+)"/g)].flatMap((m) => m[1].toLowerCase().split(/[^a-zà-ÿ]+/)).filter((w) => w.length > 3 && !['premix', 'whisky', 'whiskey', 'liqueur', 'irish', 'cream', 'orange', 'ginger', 'light', 'sugar', 'zero', 'wine', 'water', 'dark', 'white', 'gold'].includes(w)).concat(['whisky', 'whiskey', 'scotch', 'bourbon', 'vodka', 'gin', 'rum', 'tequila', 'cognac', 'brandy', 'liqueur', 'wine', 'beer', 'cider', 'champagne']))];
const stocked = (k) => (brands.some((b) => k.includes(b)) || names.some((n) => n.includes(k)) || types.some((t) => (' ' + k + ' ').includes(' ' + t + ' ')) ? 'yes' : 'no');
// Usable pool: real demand (50+/month), relevance 65+ (drops the tool's typo/variant rows), junk CPC column ignored.
const pool = all.filter((r) => r.volume >= 50 && r.relevance >= 65 && !/\b(\S+)\s+\1\b/.test(r.keyword)).map((r) => ({ ...r, stock: stocked(r.keyword) }));

const count = (arr, fn) => arr.reduce((m, x) => ((m[fn(x)] = (m[fn(x)] || 0) + 1), m), {});
const sumVol = (arr) => arr.reduce((s, x) => s + x.volume, 0);
const fmt = (n) => n.toLocaleString('en-AU');

// Machine-readable master
const header = 'keyword,intent,intent_basis,volume,kd,volume_band,kd_band,we_stock_it,relevance,sources';
const csv = [header, ...pool.sort((a, b) => b.volume - a.volume).map((r) => [JSON.stringify(r.keyword), r.bucket, r.basis, r.volume, r.kd ?? '', volBand(r.volume), kdBand(r.kd), r.stock, r.relevance, JSON.stringify(r.sources.join('; '))].join(','))].join('\n');
fs.writeFileSync(path.join(OUT, 'keyword-research.csv'), csv);

const md = [];
md.push('# Keyword research summary (internal, never publish)\n');
md.push(`Source: ${files.length} CSV files in "Whisky Keywords Bank". ${fmt(raw)} raw rows, ${fmt(all.length)} unique keywords with search volume, **${fmt(pool.length)}** usable (volume 50+/month and relevance 65+). Full sortable list: \`docs/keyword-research.csv\`.\n`);
md.push('Intent comes from the tool\'s own label where it exists (**tool**). Where the tool left it blank I read it from explicit words in the keyword such as buy, price, online, best, how (**inferred**). Nothing below has been chosen for the site yet.\n');

md.push('## 1. By intent\n| Intent | Keywords | Total monthly volume | From tool | Inferred |\n|---|---|---|---|---|');
for (const b of ['Transactional', 'Commercial', 'Informational', 'Navigational', 'Unclassified']) {
  const g = pool.filter((r) => r.bucket === b);
  md.push(`| ${b} | ${fmt(g.length)} | ${fmt(sumVol(g))} | ${fmt(g.filter((r) => r.basis === 'tool').length)} | ${fmt(g.filter((r) => r.basis === 'inferred').length)} |`);
}

md.push('\n## 2. Money keywords: Transactional + Commercial by volume and difficulty\nRows are volume bands, columns are keyword difficulty. Each cell is the number of keywords.\n');
const money = pool.filter((r) => r.bucket === 'Transactional' || r.bucket === 'Commercial');
const kds = ['easy 0-14', 'doable 15-29', 'hard 30-49', 'very hard 50-69', 'extreme 70+', 'unknown'];
const vbs = ['A: 5,000+', 'B: 1,000-4,999', 'C: 300-999', 'D: 100-299', 'E: 50-99'];
md.push(`| Volume \\ KD | ${kds.join(' | ')} |\n|---|${kds.map(() => '---').join('|')}|`);
for (const v of vbs) md.push(`| ${v} | ${kds.map((k) => fmt(money.filter((r) => volBand(r.volume) === v && kdBand(r.kd) === k).length)).join(' | ')} |`);

const table = (list, n) => ['| Keyword | Intent | Volume | KD | We stock it | Basis |', '|---|---|---|---|---|---|', ...list.slice(0, n).map((r) => `| ${r.keyword} | ${r.bucket} | ${fmt(r.volume)} | ${r.kd ?? '-'} | ${r.stock} | ${r.basis} |`)].join('\n');

const byScore = (a, b) => b.volume - a.volume;
md.push('\n## 3. Transactional keywords (buy, price, online, delivery, near me)\n### Easy to win, products we stock: KD 0-29, volume 100+ (top 60)\n');
md.push(table(pool.filter((r) => r.bucket === 'Transactional' && r.stock === 'yes' && r.kd != null && r.kd <= 29 && r.volume >= 100).sort(byScore), 60));
md.push('\n### Bigger prizes, products we stock: KD 30-49, volume 300+ (top 30)\n');
md.push(table(pool.filter((r) => r.bucket === 'Transactional' && r.stock === 'yes' && r.kd != null && r.kd >= 30 && r.kd <= 49 && r.volume >= 300).sort(byScore), 30));

md.push('\n## 4. Commercial keywords (best, review, vs, brand and product names)\n### Easy to win, products we stock: KD 0-29, volume 300+ (top 60)\n');
md.push(table(pool.filter((r) => r.bucket === 'Commercial' && r.stock === 'yes' && r.kd != null && r.kd <= 29 && r.volume >= 300).sort(byScore), 60));

md.push('\n## 5. Money keywords by source file (product group)\n| Group | Money keywords | Money volume | Easy (KD<=29) | Best easy keyword (volume) |\n|---|---|---|---|---|');
// A keyword counts under a group only when the group's name appears in it (so "cognac" is not filed under Absinthe).
const norm = (x) => x.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const groupOf = (r) => {
  const hit = r.sources.filter((g) => norm(g).split(' ').every((t) => norm(r.keyword).includes(t.replace(/s$/, ''))));
  return hit.sort((x, y) => y.length - x.length)[0] || 'General / generic terms';
};
const groups = [...new Set(money.map(groupOf))].sort();
for (const g of groups) {
  const gl = money.filter((r) => groupOf(r) === g);
  const easy = gl.filter((r) => r.kd != null && r.kd <= 29).sort(byScore);
  md.push(`| ${g} | ${fmt(gl.length)} | ${fmt(sumVol(gl))} | ${fmt(easy.length)} | ${easy[0] ? `${easy[0].keyword} (${fmt(easy[0].volume)})` : '-'} |`);
}



md.push('\n## 5b. Phrases with explicit buying words (buy / price / online / delivery / near me), KD 35 or lower\n');
md.push(table(pool.filter((r) => TRANS.test(r.keyword) && r.kd != null && r.kd <= 35).sort(byScore), 50));

md.push('\n## 6. Informational keywords (blog and FAQ only, not product or category pages)\n### Top 40 with KD 0-29\n');
md.push(table(pool.filter((r) => r.bucket === 'Informational' && r.kd != null && r.kd <= 29).sort(byScore), 40));

fs.writeFileSync(path.join(OUT, 'keyword-research.md'), md.join('\n') + '\n');

console.log('raw', raw, 'unique with volume', all.length, 'pool', pool.length);
console.log(count(pool, (r) => r.bucket), 'money', money.length, 'stocked money', money.filter((r) => r.stock === 'yes').length);
console.log('volume of pool', sumVol(pool), 'money volume', sumVol(money));
