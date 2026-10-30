import { SUBCATEGORIES } from '@/lib/data/subcategories';
import { PRODUCTS } from '@/lib/data/products';

/**
 * Internal links between sibling collections and to the sales landing pages (golden rule: inbound links go to related category,
 * brand and product pages). Only collections that really hold products are shown.
 */
const SIBLINGS: Record<string, string[]> = {
  champagne: ['sparkling', 'prosecco', 'rose-wine'],
  sparkling: ['champagne', 'prosecco', 'rose-wine'],
  prosecco: ['sparkling', 'champagne', 'white-wine'],
  'rose-wine': ['sparkling', 'white-wine', 'prosecco'],
  'red-wine': ['cabernet-sauvignon', 'grenache', 'white-wine'],
  'white-wine': ['sauvignon-blanc', 'pinot-grigio', 'rose-wine'],
  'sauvignon-blanc': ['white-wine', 'pinot-grigio'],
  'pinot-grigio': ['white-wine', 'sauvignon-blanc'],
  'cabernet-sauvignon': ['red-wine', 'grenache'],
  grenache: ['red-wine', 'cabernet-sauvignon'],
  'scotch-whisky': ['japanese-whisky', 'irish-whiskey', 'bourbon', 'australian-whisky'],
  bourbon: ['rye-whiskey', 'scotch-whisky', 'irish-whiskey'],
  'rye-whiskey': ['bourbon', 'scotch-whisky'],
  'japanese-whisky': ['scotch-whisky', 'australian-whisky'],
  'australian-whisky': ['japanese-whisky', 'scotch-whisky'],
  'irish-whiskey': ['scotch-whisky', 'bourbon'],
  gin: ['pink-gin', 'vodka'],
  'pink-gin': ['gin'],
  vodka: ['gin', 'grey-goose', 'belvedere', 'french-vodka'],
  'french-vodka': ['vodka', 'grey-goose', 'belvedere'],
  'russian-vodka': ['vodka', 'polish-vodka'],
  'polish-vodka': ['vodka', 'russian-vodka'],
  'grey-goose': ['belvedere', 'vodka'],
  belvedere: ['grey-goose', 'vodka'],
  'white-tequila': ['gold-tequila', 'patron', 'don-julio', 'mezcal'],
  'gold-tequila': ['white-tequila', 'patron', 'don-julio', 'jose-cuervo'],
  patron: ['don-julio', 'white-tequila', 'gold-tequila'],
  'don-julio': ['patron', 'white-tequila', 'gold-tequila'],
  'jose-cuervo': ['white-tequila', 'gold-tequila'],
  mezcal: ['white-tequila', 'gold-tequila'],
  rum: ['spiced-rum', 'white-rum'],
  'spiced-rum': ['rum', 'white-rum'],
  'white-rum': ['rum', 'spiced-rum'],
  'baileys-irish-cream': ['coffee-liqueur', 'liqueur'],
  'coffee-liqueur': ['baileys-irish-cream', 'orange-liqueur', 'liqueur'],
  'orange-liqueur': ['coffee-liqueur', 'liqueur'],
  liqueur: ['baileys-irish-cream', 'coffee-liqueur', 'orange-liqueur'],
  lager: ['imported-beer', 'australian-beer', 'pilsner'],
  'imported-beer': ['lager', 'german-beer'],
  'australian-beer': ['lager', 'imported-beer'],
  'german-beer': ['imported-beer', 'pilsner'],
  pilsner: ['lager', 'german-beer'],
  cider: ['ginger-beer', 'lager'],
  'ginger-beer': ['cider', 'lager'],
};

const LANDING: Record<string, { label: string; href: string }[]> = {
  'scotch-whisky': [{ label: 'Whisky gift packs', href: '/gifts/whisky/' }],
  bourbon: [{ label: 'Whisky gift packs', href: '/gifts/whisky/' }],
  'japanese-whisky': [{ label: 'Whisky gift packs', href: '/gifts/whisky/' }],
  'australian-whisky': [{ label: 'Whisky gift packs', href: '/gifts/whisky/' }],
  'irish-whiskey': [{ label: 'Whisky gift packs', href: '/gifts/whisky/' }],
  gin: [{ label: 'Gin gifts', href: '/gifts/gin/' }],
  'pink-gin': [{ label: 'Gin gifts', href: '/gifts/gin/' }],
  vodka: [{ label: 'Smirnoff vodka', href: '/collections/smirnoff/' }, { label: 'Absolut vodka', href: '/collections/absolut/' }],
  'french-vodka': [{ label: 'Smirnoff vodka', href: '/collections/smirnoff/' }],
  'russian-vodka': [{ label: 'Smirnoff vodka', href: '/collections/smirnoff/' }],
  'polish-vodka': [{ label: 'Absolut vodka', href: '/collections/absolut/' }],
  'white-tequila': [{ label: 'Buy tequila online', href: '/collections/tequila/' }],
  'gold-tequila': [{ label: 'Buy tequila online', href: '/collections/tequila/' }],
  patron: [{ label: 'Buy tequila online', href: '/collections/tequila/' }],
  'don-julio': [{ label: 'Buy tequila online', href: '/collections/tequila/' }],
  'jose-cuervo': [{ label: 'Buy tequila online', href: '/collections/tequila/' }],
  mezcal: [{ label: 'Buy tequila online', href: '/collections/tequila/' }],
};

export function relatedCollections(slug: string): { label: string; href: string }[] {
  const out: { label: string; href: string }[] = [];
  for (const s of SIBLINGS[slug] ?? []) {
    const sub = SUBCATEGORIES.find((x) => x.slug === s);
    if (sub && PRODUCTS.some((p) => p.subCategorySlug === s)) out.push({ label: sub.name, href: `/shop/${sub.category}/collection/${sub.slug}/` });
  }
  // ring neighbours inside the same main category so every collection receives links from its neighbours
  const mine = SUBCATEGORIES.find((x) => x.slug === slug);
  if (mine) {
    const ring = SUBCATEGORIES.filter((x) => x.category === mine.category && PRODUCTS.some((p) => p.subCategorySlug === x.slug)).sort((a, b) => a.slug.localeCompare(b.slug));
    const at = ring.findIndex((x) => x.slug === slug);
    for (let step = 1; step <= 3 && at >= 0 && ring.length > 1; step++) {
      for (const dir of [1, -1]) {
        const n = ring[(((at + dir * step) % ring.length) + ring.length) % ring.length];
        if (n && n.slug !== slug && !out.some((o) => o.href === `/shop/${n.category}/collection/${n.slug}/`)) out.push({ label: n.name, href: `/shop/${n.category}/collection/${n.slug}/` });
      }
    }
  }
  return [...out, ...(LANDING[slug] ?? [])];
}
