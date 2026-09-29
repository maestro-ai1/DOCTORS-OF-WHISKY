// Processes the user-supplied hero photography into SEO-standard hero background
// images: 1920x1080 (standard hero/OG banner ratio), mild auto-contrast/normalize
// (not an aggressive filter — these source shots are already good quality),
// compressed JPEG with descriptive filenames for SEO.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd(), '..');
const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'hero');

const TARGETS = [
  { src: path.join(ROOT, 'pic1.jpg'), out: 'glendronach-lineup-hero.jpg' },
  { src: path.join(ROOT, 'pic2.jpg'), out: 'glendronach-tasting-hero.jpg' },
  { src: path.join(ROOT, 'pic3.jpg'), out: 'don-julio-blanco-hero.jpg' },
];

async function processHero(srcPath, destPath) {
  await fs.promises.mkdir(path.dirname(destPath), { recursive: true });
  await sharp(srcPath)
    .resize(1920, 1080, { fit: 'cover', position: 'attention' })
    .normalise({ lower: 1, upper: 99 })
    .modulate({ brightness: 1.04, saturation: 1.06 })
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 85, mozjpeg: true })
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
