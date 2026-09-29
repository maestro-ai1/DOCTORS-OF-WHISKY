import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { SUBCATEGORIES } from './subcategory-map.mjs';

const ROOT = path.resolve(process.cwd(), '..');
const SRC_DIR = path.join(ROOT, 'pictures of whisky');
const OUT_PRODUCTS = path.join(process.cwd(), 'public', 'images', 'products');
const OUT_BRANDS = path.join(process.cwd(), 'public', 'images', 'brands');

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[_]+/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function humanize(baseName) {
  let s = baseName.replace(/^tds-/, '');
  s = s.replace(/[-_][a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i, ''); // strip uuid suffix
  s = s.replace(/\b(new|nohat|no-hat|copy|v2|final)\b/gi, '').trim();
  const words = s.split(/[-_]+/).filter(Boolean).map((w) => {
    if (/^\d+ml$/i.test(w)) return w.toLowerCase();
    if (/^\d+l$/i.test(w)) return w.toUpperCase();
    return w.charAt(0).toUpperCase() + w.slice(1);
  });
  return words.join(' ').replace(/\s+/g, ' ').trim();
}

function pickLargestPerBase(files) {
  const groups = new Map();
  for (const file of files) {
    const m = file.match(/^(.*)_(\d+)x\.(jpe?g|png|webp)$/i);
    let base, size;
    if (m) {
      base = m[1];
      size = parseInt(m[2], 10);
    } else {
      base = file.replace(/\.(jpe?g|png|webp)$/i, '');
      size = 0;
    }
    const existing = groups.get(base);
    if (!existing || size > existing.size) {
      groups.set(base, { file, size });
    }
  }
  return Array.from(groups.entries()).map(([base, v]) => ({ base, file: v.file }));
}

async function normalizeToWhiteCanvas(srcPath, destPath) {
  await fs.promises.mkdir(path.dirname(destPath), { recursive: true });
  await sharp(srcPath)
    .resize(1400, 1400, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(destPath);
}

async function main() {
  const manifest = {};
  let totalImages = 0;

  for (const sub of SUBCATEGORIES) {
    manifest[sub.slug] = [];
    for (const folder of sub.folders) {
      const folderPath = path.join(SRC_DIR, folder);
      if (!fs.existsSync(folderPath)) {
        console.warn(`Missing source folder: ${folder}`);
        continue;
      }
      const files = fs.readdirSync(folderPath)
        .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
        .filter((f) => !/trusted.service.award|platinum.trusted/i.test(f));
      const picked = pickLargestPerBase(files);

      for (const { base, file } of picked) {
        const brandSlug = slugify(folder);
        const nameSlug = slugify(base);
        const outFile = `${brandSlug}--${nameSlug}.jpg`;
        const destPath = path.join(OUT_PRODUCTS, sub.slug, outFile);
        const srcPath = path.join(folderPath, file);

        await normalizeToWhiteCanvas(srcPath, destPath);

        manifest[sub.slug].push({
          brand: folder,
          humanizedName: humanize(base),
          webPath: `/images/products/${sub.slug}/${outFile}`,
        });
        totalImages++;
      }
    }
    console.log(`${sub.slug}: ${manifest[sub.slug].length} images`);
  }

  // Brand hero shots: pick the single best (largest) image for each top brand folder
  const HERO_BRANDS = [
    'Macallan', 'Nikka', 'GlenDronach', 'Glenfiddich', 'Lark', 'Laphroaig',
    'Johnnie Walker', 'Royal Salute', 'Don Julio', 'Grey Goose', 'Martell', 'Patron',
  ];
  const heroManifest = {};
  for (const brand of HERO_BRANDS) {
    const folderPath = path.join(SRC_DIR, brand);
    if (!fs.existsSync(folderPath)) continue;
    const files = fs.readdirSync(folderPath).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
    if (files.length === 0) continue;
    // pick the highest-resolution file overall as the hero shot
    let best = files[0];
    let bestSize = 0;
    for (const f of files) {
      const m = f.match(/_(\d+)x\.(jpe?g|png|webp)$/i);
      const size = m ? parseInt(m[1], 10) : 0;
      if (size > bestSize) {
        bestSize = size;
        best = f;
      }
    }
    const brandSlug = slugify(brand);
    const destPath = path.join(OUT_BRANDS, `${brandSlug}.jpg`);
    await normalizeToWhiteCanvas(path.join(folderPath, best), destPath);
    heroManifest[brandSlug] = `/images/brands/${brandSlug}.jpg`;
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'scripts', 'image-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  fs.writeFileSync(
    path.join(process.cwd(), 'scripts', 'brand-hero-manifest.json'),
    JSON.stringify(heroManifest, null, 2)
  );

  console.log(`\nTotal processed product images: ${totalImages}`);
  console.log(`Total brand hero shots: ${Object.keys(heroManifest).length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
