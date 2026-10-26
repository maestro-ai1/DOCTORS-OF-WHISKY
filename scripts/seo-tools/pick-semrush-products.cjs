// Picks high-turnover products (brands with proven AU search demand from Semrush, 2026-10-26) out of the retailer search dumps
// (.image-work/recv-tds.json and recv-bs.json, captured from thedrinksociety.com.au and bottle-stop.com.au) and writes scripts/semrush-add-2026-10.json.
// Price = retailer price x 1.08 rounded up to .99 (same rule as docs/products-to-add.md).
const fs = require('fs');
const D = (f) => JSON.parse(fs.readFileSync(`.image-work/${f}`, 'utf8'));
const src = { T: D('recv-tds.json'), B: D('recv-bs.json') };
const all = [];
for (const [s, d] of Object.entries(src)) for (const q in d) for (const p of d[q]) if (p.a && !all.find((x) => x.s === s && x.u === p.u)) all.push({ ...p, s });
// [exact title substring, sub-collection slug, brand]
const WANT = [
  ['Bollinger Special Cuvee NV 750ml', 'champagne', 'Bollinger'],
  ['Pol Roger Brut Reserve NV 750ml', 'champagne', 'Pol Roger'],
  ['Pol Roger Brut Reserve NV Gift Box 375ml', 'champagne', 'Pol Roger'],
  ['Taittinger Brut Reserve Champagne NV 750ml', 'champagne', 'Taittinger'],
  ['Taittinger Cuvee Brut Prestige NV Champagne 750ml', 'champagne', 'Taittinger'],
  ['Taittinger Nocturne NV Champagne 750ml', 'champagne', 'Taittinger'],
  ['Louis Roederer Collection Naked 750ml', 'champagne', 'Louis Roederer'],
  ['Piper-Heidsieck Cuvee Brut NV 750ml', 'champagne', 'Piper-Heidsieck'],
  ['Perrier-Jouet Grand Brut NV 750ml', 'champagne', 'Perrier-Jouet'],
  ['Perrier-Jouet Blason Rose 750ml', 'champagne', 'Perrier-Jouet'],
  ['Moet & Chandon Ice Imperial NV 750ml', 'champagne', 'Moet & Chandon'],
  ['Moet & Chandon Brut Imperial NV Rose 750ml', 'champagne', 'Moet & Chandon'],
  ['Moet & Chandon Grand Vintage Champagne 750ml', 'champagne', 'Moet & Chandon'],
  ['Mumm Grand Cordon Rose 750ml', 'champagne', 'Mumm'],
  ['Veuve Clicquot Yellow Label NV Champagne 750ml', 'champagne', 'Veuve Clicquot'],
  ['Veuve Clicquot Rose NV 750ml', 'champagne', 'Veuve Clicquot'],
  ['Veuve Clicquot Vintage Brut Champagne 750ml', 'champagne', 'Veuve Clicquot'],
  ['Chandon Garden Spritz NV 750ml', 'sparkling', 'Chandon'],
  ['Chandon Rosé NV 750ml', 'sparkling', 'Chandon'],
  ["Chateau d'Esclans Whispering Angel Rosé 750ml", 'rose-wine', "Chateau d'Esclans"],
  ['Hennessy VS Cognac 700ml', 'cognac-brandy', 'Hennessy'],
  ['Hennessy VSOP Cognac 700ml', 'cognac-brandy', 'Hennessy'],
  ['Hennessy XO Cognac 700ml', 'cognac-brandy', 'Hennessy'],
  ['Courvoisier VS Cognac 700ml', 'cognac-brandy', 'Courvoisier'],
  ['Jameson Irish Whiskey 700ml', 'irish-whiskey', 'Jameson'],
  ['Jameson Irish Whiskey 1L', 'irish-whiskey', 'Jameson'],
  ['Jameson Black Barrel 700ml', 'irish-whiskey', 'Jameson'],
  ['Jameson Caskmates Stout Edition 700ml', 'irish-whiskey', 'Jameson'],
  ['Jameson Caskmates IPA Edition 700ml', 'irish-whiskey', 'Jameson'],
  ['Jameson Single Pot Still Whiskey 700ml', 'irish-whiskey', 'Jameson'],
  ['Jameson 18 Year Old Irish Whiskey 700ml', 'irish-whiskey', 'Jameson'],
  ['Starward Two Fold 700ml', 'australian-whisky', 'Starward'],
  ['Starward Nova 700ml', 'australian-whisky', 'Starward'],
  ['Starward Fortis Single Malt Whisky 700ml', 'australian-whisky', 'Starward'],
  ['Starward Honeycomb 700ml', 'australian-whisky', 'Starward'],
  ['Starward Octave Barrels Whisky 700ml', 'australian-whisky', 'Starward'],
  ['Starward Unexpeated Whisky 700ml', 'australian-whisky', 'Starward'],
  ['Crown Royal Fine De Luxe Blended Canadian Whisky 1L', 'rye-whiskey', 'Crown Royal'],
  ['Crown Royal Vanilla Flavoured Blended Canadian Whisky 1L', 'rye-whiskey', 'Crown Royal'],
  ['Casamigos Tequila Blanco Tequila 700ml', 'white-tequila', 'Casamigos'],
  ['Casamigos Tequila Reposado 700ml', 'gold-tequila', 'Casamigos'],
  ['Casamigos Anejo Tequila 700ml', 'gold-tequila', 'Casamigos'],
  ['Espolòn Blanco 700ml', 'white-tequila', 'Espolon'],
  ['Espolòn Reposado 700ml', 'gold-tequila', 'Espolon'],
  ['Espolòn Anejo Tequila 750ml', 'gold-tequila', 'Espolon'],
  ['Grand Marnier Liqueur 700ml', 'orange-liqueur', 'Grand Marnier'],
  ['Cointreau Triple Sec Liqueur 1L', 'orange-liqueur', 'Cointreau'],
  ['Kahlua Coffee Liqueur 1L', 'coffee-liqueur', 'Kahlua'],
  ['Captain Morgan Black Spiced 700ml', 'spiced-rum', 'Captain Morgan'],
  ['Absolut Vanilla Vodka 700ml', 'vodka', 'Absolut'],
  ['Absolut Pears Vodka 700ml', 'vodka', 'Absolut'],
  ['Absolut Lime Vodka 700ml', 'vodka', 'Absolut'],
  ['Absolut Mango Vodka 1L', 'vodka', 'Absolut'],
];
const out = []; const miss = [];
for (const [t, sub, brand] of WANT) {
  const m = all.find((x) => x.t.toLowerCase() === t.toLowerCase());
  if (!m) { miss.push(t); continue; }
  const ref = m.p;
  const price = Math.ceil(ref * 1.08) - 0.01;
  const size = (m.t.match(/(\d+(?:\.\d+)?)\s?(ml|l)\b/i) || [])[0] || '700ml';
  out.push({ brand, title: m.t, size: size.replace(/\s/g, '').replace(/^1l$/i, '1L'), ref, price: +price.toFixed(2), sub, src: m.s === 'T' ? 'thedrinksociety.com.au' : 'bottle-stop.com.au', url: (m.s === 'T' ? 'https://www.thedrinksociety.com.au' : 'https://bottle-stop.com.au') + m.u, img: m.i });
}
fs.writeFileSync('scripts/semrush-add-2026-10.json', JSON.stringify(out, null, 1));
console.log('picked', out.length, 'missing', miss);
