// Cuts a transparent-background PNG for the hero slider only (chroma-key on
// near-white pixels). The main catalog keeps its white-background photography
// as required for product SEO images; only the cinematic hero benefits from a
// transparent cutout against the amber/black gradient.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd(), '..');
const SRC_DIR = path.join(ROOT, 'pictures of whisky');
const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'hero');

const TARGETS = [
  { src: 'Macallan/tds-macallan-12-sherry-oak-new_1080x.jpg', out: 'macallan-hero.png' },
  { src: 'Nikka/tds-nikka-taketsuru-gb_1080x.jpg', out: 'nikka-hero.png' },
  { src: 'Don Julio/tds-don-julio-1942-snake_1080x.jpg', out: 'don-julio-hero.png' },
  { src: 'Grey Goose/tds-grey-goose-1l_1080x.jpg', out: 'grey-goose-hero.png' },
];

const WHITE_THRESHOLD = 236;

async function cutout(srcPath, destPath) {
  const image = sharp(srcPath).resize(1200, 1200, { fit: 'contain', background: { r: 255, g: 255, b: 255 } });
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD) {
      data[i + 3] = 0;
    } else {
      // Soft-feather near-white edge pixels for a cleaner cutout edge
      const brightness = (r + g + b) / 3;
      if (brightness > 210) {
        const alpha = Math.max(0, Math.min(255, Math.round(((WHITE_THRESHOLD - brightness) / (WHITE_THRESHOLD - 210)) * 255)));
        data[i + 3] = alpha;
      }
    }
  }

  await fs.promises.mkdir(path.dirname(destPath), { recursive: true });
  await sharp(data, { raw: { width, height, channels } }).png().toFile(destPath);
}

async function main() {
  for (const t of TARGETS) {
    const srcPath = path.join(SRC_DIR, t.src);
    const destPath = path.join(OUT_DIR, t.out);
    await cutout(srcPath, destPath);
    console.log(`Cut ${t.src} -> public/images/hero/${t.out}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
