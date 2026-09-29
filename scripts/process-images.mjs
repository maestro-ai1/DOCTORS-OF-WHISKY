import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
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
  // Filenames with no separators at all (camelCase blobs like "StefaniEstateShiraz")
  // get split on capital-letter boundaries first.
  if (!/[-_]/.test(s) && /[a-z][A-Z]/.test(s)) {
    s = s.replace(/([a-z])([A-Z])/g, '$1-$2');
  }
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

function dedupeKeyFor(humanizedName) {
  // Trailing lone 1-2 digit marker (e.g. "Macallan Art Flower 2") usually denotes
  // an alternate photo of the SAME bottle, not a different product/edition.
  // Years (2022), ages (12yo), and vintages (1942) are all longer, so they're untouched.
  return humanizedName.replace(/\s\d{1,2}$/, '').trim();
}

async function main() {
  const manifest = {};
  let totalImages = 0;

  for (const sub of SUBCATEGORIES) {
    const rawEntries = [];
    const seenHashes = new Set();
    for (const folder of sub.folders) {
      const folderPath = path.join(SRC_DIR, folder);
      if (!fs.existsSync(folderPath)) {
        console.warn(`Missing source folder: ${folder}`);
        continue;
      }
      const allFolderNames = SUBCATEGORIES.flatMap((s) => s.folders).map((f) => f.toLowerCase());
      const files = fs.readdirSync(folderPath)
        .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
        .filter((f) => !/trusted.service.award|platinum.trusted|country.?flags?/i.test(f))
        .filter((f) => {
          const stem = f.replace(/\.(jpe?g|png|webp)$/i, '').toLowerCase();
          // Exclude brand logo/banner files literally named after a brand/folder (e.g. "Glenfiddich.jpg")
          return !allFolderNames.includes(stem);
        });
      const picked = pickLargestPerBase(files);

      for (const { base, file } of picked) {
        const srcPath = path.join(folderPath, file);

        // Skip byte-identical source photos that have been filed under more than
        // one folder (e.g. the same bottle shot copied into both "Belvedere" and
        // "Polish Vodka") so they don't become two separate product listings.
        const hash = crypto.createHash('md5').update(fs.readFileSync(srcPath)).digest('hex');
        if (seenHashes.has(hash)) continue;
        seenHashes.add(hash);

        const brandSlug = slugify(folder);
        const nameSlug = slugify(base);
        const outFile = `${brandSlug}--${nameSlug}.jpg`;
        const destPath = path.join(OUT_PRODUCTS, sub.slug, outFile);

        await normalizeToWhiteCanvas(srcPath, destPath);

        rawEntries.push({
          brand: folder,
          brandSlug,
          humanizedName: humanize(base),
          webPath: `/images/products/${sub.slug}/${outFile}`,
        });
        totalImages++;
      }
    }

    // Merge entries that are really just alternate photos of the same bottle
    // (same brand + same name once a trailing "-2"/"-3" photo-variant marker is stripped)
    // into a single product with multiple images, instead of near-duplicate products.
    const merged = new Map();
    for (const entry of rawEntries) {
      const key = `${entry.brandSlug}::${dedupeKeyFor(entry.humanizedName)}`;
      const existing = merged.get(key);
      if (existing) {
        existing.images.push(entry.webPath);
      } else {
        merged.set(key, {
          brand: entry.brand,
          humanizedName: dedupeKeyFor(entry.humanizedName),
          images: [entry.webPath],
        });
      }
    }

    manifest[sub.slug] = Array.from(merged.values()).map((m) => ({
      brand: m.brand,
      humanizedName: m.humanizedName,
      webPath: m.images[0],
      images: m.images,
    }));

    console.log(`${sub.slug}: ${manifest[sub.slug].length} products (from ${rawEntries.length} photos)`);
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
