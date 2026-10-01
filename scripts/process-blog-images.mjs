// Turns the user-supplied blog photography (../blog pictures) into 1600x900 WebP heroes and 1200x675 shared in-article images.
// Odd-shaped sources (portrait / square / small) are shown sharp and uncropped over a blurred, darkened copy of themselves.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = path.resolve(process.cwd(), '..', 'blog pictures');
const OUT = path.join(process.cwd(), 'public', 'images', 'blog');

const HERO = {
  '01-scotch.jpg': 'single-malt-vs-blended-scotch',
  'Bourbon and barrel.webp': 'what-makes-bourbon-different',
  'Rye whiskey.png': 'beginners-guide-to-rye-whiskey',
  'Japanese whisky.avif': 'why-japanese-whisky-became-a-global-obsession',
  'Australian single malt.avif': 'rise-of-australian-single-malt-whisky',
  'Vodka.jpg': 'how-vodka-is-made',
  'Blanco, reposado, anejo tequila.png': 'tequila-aging-guide-blanco-reposado-anejo',
  'Mezcal vs tequila.avif': 'mezcal-vs-tequila-difference',
  'Cognac vs brandy.jpg': 'cognac-vs-brandy-explained',
  'London dry vs contemporary gin.jpg': 'london-dry-vs-contemporary-gin',
  'White, spiced, dark rum.jpg': 'white-spiced-dark-rum-guide',
  'Baijiu.webp': 'what-is-baijiu',
  'Amaro.jpg': 'amaro-101-italy-bittersweet-tradition',
  'Cream and coffee liqueurs.jpg': 'best-cream-coffee-liqueurs-for-cocktails',
  'Soju.webp': 'soju-explained-koreas-spirit',
  'Lager vs imported beer.jpg': 'lager-vs-imported-beer-buyers-guide',
  'Non-alcoholic beer.jpg': 'why-non-alcoholic-beer-is-booming',
  'Craft cider.webp': 'guide-to-australian-craft-cider',
  'Red wine.jpg': 'how-to-choose-red-wine',
  'White wine.jpg': 'white-wine-styles-explained',
  'Rosé.webp': 'everything-about-rose-wine',
  'Champagne, sparkling, port.webp': 'champagne-vs-sparkling-wine-vs-port',
  'Ready-to-drink premix.jpg': 'ready-to-drink-premix-trend',
  'seltzer alcohol drinks australia.jpeg': 'rise-of-zero-sugar-seltzers',
  'Mixers for a home bar.jpg': 'best-mixers-for-home-bar',
  'Macallan sherry cask.webp': 'macallan-sherry-cask-legacy',
  'Storing and cellaring whisky.jpg': 'how-to-store-and-cellar-rare-whisky',
  'Don Julio vs Patron.webp': 'don-julio-vs-patron-tequila-compared',
  'Grey Goose vs Belvedere.webp': 'grey-goose-vs-belvedere-vodka-compared',
  'Investing in rare whisky.avif': 'beginners-guide-investing-in-rare-whisky',
};
const SHARED = {
  'Whisky being poured.jpg': 'whisky-pour',
  'Rows of barrels.jpg': 'barrel-room',
  'Copper pot still.webp': 'copper-still',
  'Tasting flight.webp': 'tasting-flight',
  'Home bar setup.jpg': 'home-bar',
  'Gift-wrapped bottle.jpg': 'gift-bottle',
  'Vineyard rows.jpg': 'vineyard',
  'Bottles on a shelf.webp': 'bottle-shop',
};

async function render(src, dest, w, h) {
  const meta = await sharp(src).metadata();
  const ratio = meta.width / meta.height;
  const target = w / h;
  if (ratio >= 1.45 && meta.width >= w * 0.7) {
    await sharp(src).resize(w, h, { fit: 'cover', position: 'attention' }).webp({ quality: 82 }).toFile(dest);
    return 'cover';
  }
  const bg = await sharp(src).resize(w, h, { fit: 'cover' }).blur(28).modulate({ brightness: 0.55, saturation: 1.1 }).toBuffer();
  const fgH = Math.round(h * 0.92);
  const fg = await sharp(src).resize({ width: w, height: fgH, fit: 'inside' }).sharpen({ sigma: 0.5 }).toBuffer();
  await sharp(bg).composite([{ input: fg, gravity: 'center' }]).webp({ quality: 82 }).toFile(dest);
  return 'backdrop';
}

fs.mkdirSync(path.join(OUT, 'shared'), { recursive: true });
let n = 0;
for (const [file, slug] of Object.entries(HERO)) {
  const src = path.join(SRC, file);
  if (!fs.existsSync(src)) { console.warn('MISSING', file); continue; }
  const mode = await render(src, path.join(OUT, `${slug}.webp`), 1600, 900);
  console.log(`${slug}.webp (${mode}, ${(fs.statSync(path.join(OUT, `${slug}.webp`)).size / 1024).toFixed(0)}KB)`); n++;
}
for (const [file, name] of Object.entries(SHARED)) {
  const src = path.join(SRC, file);
  if (!fs.existsSync(src)) { console.warn('MISSING', file); continue; }
  const mode = await render(src, path.join(OUT, 'shared', `${name}.webp`), 1200, 675);
  console.log(`shared/${name}.webp (${mode})`); n++;
}
console.log(`${n}/38 images written to public/images/blog`);
