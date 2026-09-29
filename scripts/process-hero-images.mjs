// Processes the user-supplied hero photography into SEO-standard hero background
// images: correct dimensions for a 1920-wide hero banner, compressed, descriptive
// filenames, served as optimized JPEG (broad compatibility) at 82% quality.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd(), '..');
const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'hero');

const TARGETS = [
  {
    src: path.join(ROOT, 'hero2.jpg'),
    out: 'johnnie-walker-black-label-hero.jpg',
  },
  {
    src: path.join(ROOT, 'hero3.jpg'),
    out: 'macallan-m-decanter-hero.jpg',
  },
  {
    src: path.join(ROOT, 'Glendronach-BadCompany1920-CokeRiera-1-1-3-1024x683.avif'),
    out: 'glendronach-ode-collection-hero.jpg',
  },
];

async function processHero(srcPath, destPath) {
  await fs.promises.mkdir(path.dirname(destPath), { recursive: true });
  await sharp(srcPath)
    .resize(1920, 1080, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destPath);
}

async function main() {
  for (const t of TARGETS) {
    if (!fs.existsSync(t.src)) {
      console.warn(`Missing source: ${t.src}`);
      continue;
    }
    const destPath = path.join(OUT_DIR, t.out);
    await processHero(t.src, destPath);
    const stat = fs.statSync(destPath);
    console.log(`${t.out}: ${(stat.size / 1024).toFixed(0)}KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
