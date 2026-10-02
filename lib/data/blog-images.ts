// Shared in-article photos (public/images/blog/shared/*.webp), one per post, placed after the first section.
const SHARED = {
  'whisky-pour': 'Neat whisky poured into a tumbler',
  'barrel-room': 'Whisky barrels maturing in a cellar',
  'copper-still': 'Copper pot still used for distilling spirits',
  'tasting-flight': 'Tasting flight of spirits in nosing glasses',
  'home-bar': 'Home bar with bottles, mixers and tools',
  'gift-bottle': 'Gift-wrapped bottle of premium spirits',
  vineyard: 'Vineyard rows in an Australian wine region',
  'bottle-shop': 'Premium bottles on a shelf at an Australian bottle shop',
} as const;

export type SharedImage = keyof typeof SHARED;

const BY_SLUG: Record<string, SharedImage> = {
  'single-malt-vs-blended-scotch': 'tasting-flight',
  'what-makes-bourbon-different': 'barrel-room',
  'beginners-guide-to-rye-whiskey': 'whisky-pour',
  'why-japanese-whisky-became-a-global-obsession': 'tasting-flight',
  'rise-of-australian-single-malt-whisky': 'copper-still',
  'how-vodka-is-made': 'copper-still',
  'tequila-aging-guide-blanco-reposado-anejo': 'barrel-room',
  'mezcal-vs-tequila-difference': 'tasting-flight',
  'cognac-vs-brandy-explained': 'barrel-room',
  'london-dry-vs-contemporary-gin': 'copper-still',
  'white-spiced-dark-rum-guide': 'home-bar',
  'what-is-baijiu': 'tasting-flight',
  'amaro-101-italy-bittersweet-tradition': 'home-bar',
  'best-cream-coffee-liqueurs-for-cocktails': 'home-bar',
  'soju-explained-koreas-spirit': 'bottle-shop',
  'lager-vs-imported-beer-buyers-guide': 'bottle-shop',
  'why-non-alcoholic-beer-is-booming': 'bottle-shop',
  'guide-to-australian-craft-cider': 'bottle-shop',
  'how-to-choose-red-wine': 'vineyard',
  'white-wine-styles-explained': 'vineyard',
  'everything-about-rose-wine': 'vineyard',
  'champagne-vs-sparkling-wine-vs-port': 'gift-bottle',
  'ready-to-drink-premix-trend': 'home-bar',
  'rise-of-zero-sugar-seltzers': 'home-bar',
  'best-mixers-for-home-bar': 'home-bar',
  'macallan-sherry-cask-legacy': 'barrel-room',
  'how-to-store-and-cellar-rare-whisky': 'bottle-shop',
  'don-julio-vs-patron-tequila-compared': 'gift-bottle',
  'grey-goose-vs-belvedere-vodka-compared': 'gift-bottle',
  'beginners-guide-investing-in-rare-whisky': 'whisky-pour',
  'prosecco-guide-aperol-spritz-rose-mimosa': 'vineyard',
  'what-is-vermouth-sweet-dry-cocktails': 'home-bar',
  'pinot-grigio-vs-pinot-gris-italy-guide': 'vineyard',
  'sauvignon-blanc-guide-low-alcohol-cooking-pairing': 'vineyard',
  'pink-gin-and-soda-what-is-pink-gin': 'home-bar',
  'what-is-ouzo-greek-drink-flavour-serving': 'tasting-flight',
  'beer-with-least-carbs-lowest-carb-beer-australia': 'bottle-shop',
  'cabernet-sauvignon-merlot-grenache-red-wine-grapes': 'vineyard',
  'what-is-ipa-beer-india-pale-ale-explained': 'bottle-shop',
  'german-beer-guide-german-wheat-weissbier-pilsner': 'bottle-shop',
  'irish-whiskey-guide-bushmills-redbreast-how-its-made': 'whisky-pour',
  'champagne-rose-brut-guide-veuve-clicquot-krug': 'gift-bottle',
  'vodka-brands-absolut-skyy-titos-how-to-choose': 'home-bar',
  'anejo-tequila-guide-reposado-blanco-brands': 'barrel-room',
  'malibu-rum-and-coconut-rum-what-they-are': 'home-bar',
  'popular-liqueurs-licor-43-sour-puss-elderflower-amaretto': 'home-bar',
  'australian-beer-guide-lager-vb-craft-brands': 'bottle-shop',
};

export function inlineImageFor(slug: string): { src: string; alt: string } | undefined {
  const key = BY_SLUG[slug];
  return key ? { src: `/images/blog/shared/${key}.webp`, alt: SHARED[key] } : undefined;
}

/** The commercial topic each guide leads its tags with (the post's own primary keyword is often informational). */
const TOPIC_BY_SLUG: Record<string, string> = {
  'single-malt-vs-blended-scotch': 'single malt whisky',
  'what-makes-bourbon-different': 'bourbon',
  'beginners-guide-to-rye-whiskey': 'rye whiskey',
  'why-japanese-whisky-became-a-global-obsession': 'japanese whisky',
  'rise-of-australian-single-malt-whisky': 'australian whisky',
  'how-vodka-is-made': 'vodka',
  'tequila-aging-guide-blanco-reposado-anejo': 'tequila',
  'mezcal-vs-tequila-difference': 'mezcal',
  'cognac-vs-brandy-explained': 'cognac',
  'london-dry-vs-contemporary-gin': 'gin',
  'white-spiced-dark-rum-guide': 'rum',
  'what-is-baijiu': 'baijiu',
  'amaro-101-italy-bittersweet-tradition': 'amaro',
  'best-cream-coffee-liqueurs-for-cocktails': 'cream liqueur',
  'soju-explained-koreas-spirit': 'soju',
  'lager-vs-imported-beer-buyers-guide': 'imported beer',
  'why-non-alcoholic-beer-is-booming': 'non alcoholic beer',
  'guide-to-australian-craft-cider': 'cider',
  'how-to-choose-red-wine': 'red wine',
  'white-wine-styles-explained': 'white wine',
  'everything-about-rose-wine': 'rose wine',
  'champagne-vs-sparkling-wine-vs-port': 'sparkling wine',
  'ready-to-drink-premix-trend': 'premix drinks',
  'rise-of-zero-sugar-seltzers': 'vodka seltzer',
  'best-mixers-for-home-bar': 'mixers',
  'macallan-sherry-cask-legacy': 'macallan',
  'how-to-store-and-cellar-rare-whisky': 'rare whisky',
  'don-julio-vs-patron-tequila-compared': 'don julio',
  'grey-goose-vs-belvedere-vodka-compared': 'grey goose',
  'beginners-guide-investing-in-rare-whisky': 'rare whisky',
};

export function topicFor(slug: string, fallback: string): string {
  return TOPIC_BY_SLUG[slug] || fallback;
}
