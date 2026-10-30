import { PRODUCTS } from '@/lib/data/products';
import { SHOP_RULES } from '@/lib/config';
import type { Product } from '@/lib/types';

/**
 * Curated landing pages that sit between the collections and the blog: one keyword cluster = one URL.
 * Keywords come straight from the Semrush bank (AU, KD <= 29): primary first, then Commercial secondaries.
 * Products are always real stocked bottles; prices and sizes come from the catalogue, nothing is invented.
 */
export interface CuratedSection {
  id: string;
  h2: string;
  note?: string;
  products: Product[];
  moreHref?: string;
  moreLabel?: string;
}

export interface CuratedConfig {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  primary: string;
  secondary: string[];
  /** sub-category slug whose reference links (Wikipedia, regulators) the page shows */
  authoritySlug?: string;
  breadcrumb: { name: string; path: string }[];
  ctaLabel: string;
  ctaHref: string;
  guideTitle: string;
  guide: string[];
  faqs: { question: string; answer: string }[];
  sections: CuratedSection[];
  related: { label: string; href: string }[];
}

const money = (n: number) => `$${n.toLocaleString('en-AU')}`;
const real = (p: Product) => !p.images[0].endsWith('.svg');
const full = (p: Product) => {
  const m = /(\d+)\s?ml/i.exec(p.size || '');
  return !m || Number(m[1]) >= 500;
};
const rank = (a: Product, b: Product) =>
  (b.badge === 'BEST SELLER' ? 1 : 0) - (a.badge === 'BEST SELLER' ? 1 : 0) || Number(b.featured) - Number(a.featured) || a.price - b.price;
const bySubs = (subs: string[]) => PRODUCTS.filter((p) => subs.includes(p.subCategorySlug) && real(p));
const sizes = (list: Product[]) => [...new Set(list.map((p) => p.size.replace(/\s*\(.*$/, '').trim()))].filter((s) => /^\d+(ml|L)$/i.test(s) || /litre/i.test(s));

const SHIP = `Insured delivery across Australia: a flat ${money(SHOP_RULES.shippingFee)} under ${money(SHOP_RULES.freeShippingThreshold)} and free express courier from ${money(SHOP_RULES.freeShippingThreshold)}. The minimum order is ${money(SHOP_RULES.minOrder)}. Buyers must be 18 or over.`;
const baseFaqs = (what: string) => [
  { question: `Do you deliver ${what} across Australia?`, answer: `Yes. ${SHIP}` },
  { question: 'Is there an age limit?', answer: 'Yes. Buyers must be 18 or over and delivery must be received by an adult.' },
  { question: 'How can I pay?', answer: `Pay by PayID, bank transfer, Bitcoin or USDT. Paying with crypto takes ${SHOP_RULES.cryptoDiscountPercent}% off.` },
  { question: 'Can you help me choose?', answer: 'Yes. Message us on WhatsApp or use the contact form with your budget and taste and we will suggest bottles from the range.' },
];

function build(): Record<string, CuratedConfig> {
  // ---- tequila hub ----
  const tequilaSubs = [
    { slug: 'patron', h2: 'Patrón tequila', cat: 'spirit' },
    { slug: 'don-julio', h2: 'Don Julio tequila', cat: 'spirit' },
    { slug: 'jose-cuervo', h2: 'Jose Cuervo tequila', cat: 'spirit' },
    { slug: 'white-tequila', h2: 'White and silver tequila', cat: 'spirit' },
    { slug: 'gold-tequila', h2: 'Gold, reposado and añejo tequila', cat: 'spirit' },
  ];
  const tequila: CuratedConfig = {
    slug: 'tequila',
    authoritySlug: 'white-tequila',
    path: '/collections/tequila/',
    title: 'Buy Tequila Online Australia | Patrón, Don Julio',
    description: 'Buy tequila online in Australia: Patrón, Don Julio, Jose Cuervo, white, gold, reposado and añejo tequila, with insured delivery Australia-wide. 18+ only.',
    h1: 'Buy Tequila Online in Australia: Patrón, Don Julio and More',
    intro: `Buy tequila online from a Sydney bottle shop. Browse blanco, reposado and añejo tequila from Patrón, Don Julio and Jose Cuervo, compare prices and have it delivered insured Australia-wide.`,
    primary: 'buy tequila online',
    secondary: ['tequila', 'tequila australia', 'blanco tequila', 'reposado tequila', 'silver tequila', 'affordable tequila', 'tequila bottle'],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Spirits', path: '/shop/spirit/' }, { name: 'Tequila', path: '/collections/tequila/' }],
    ctaLabel: 'Shop Patrón tequila',
    ctaHref: '/shop/spirit/collection/patron/',
    guideTitle: 'How to choose a tequila',
    guide: [
      'Blanco (silver) is unaged and crisp, the usual choice for margaritas and cocktails.',
      'Reposado is rested in oak for a softer, slightly golden style; añejo is aged longer and is best sipped neat.',
      'Choose by use: mixing, sipping or gifting, then by budget. Our collections list every bottle with its price.',
    ],
    faqs: [
      { question: 'What is the difference between blanco, reposado and añejo tequila?', answer: 'Blanco is unaged or rested briefly, reposado is rested in oak for a few months and añejo is aged for at least a year. Longer ageing adds colour and a rounder, oakier taste.' },
      ...baseFaqs('tequila'),
    ],
    sections: [],
    related: [
      { label: 'Tequila ageing guide', href: '/blog/tequila-aging-guide-blanco-reposado-anejo/' },
      { label: 'Mezcal vs tequila', href: '/blog/mezcal-vs-tequila-difference/' },
      { label: 'Mezcal collection', href: '/shop/spirit/collection/mezcal/' },
    ],
  };
  tequila.sections = tequilaSubs
    .map((s) => {
      const list = bySubs([s.slug]).filter(full).sort(rank);
      return { id: s.slug, h2: s.h2, products: list.slice(0, 6), moreHref: `/shop/${s.cat}/collection/${s.slug}/`, moreLabel: `View all ${list.length} ${s.h2.toLowerCase()}` } as CuratedSection;
    })
    .filter((s) => s.products.length > 0);

  // ---- Smirnoff ----
  const smirnoffAll = PRODUCTS.filter((p) => /smirnoff/i.test(`${p.brand} ${p.name}`) && real(p)).sort(rank);
  const smirnoffSizes = sizes(smirnoffAll.filter(full));
  const smirnoff: CuratedConfig = {
    slug: 'smirnoff',
    authoritySlug: 'vodka',
    path: '/collections/smirnoff/',
    title: 'Smirnoff Liquor Australia | Buy Smirnoff Vodka Online',
    description: 'Smirnoff liquor in Australia: buy Smirnoff vodka online, No. 21 and premix ranges at everyday prices, with insured delivery Australia-wide. 18+ only.',
    h1: 'Smirnoff Liquor: Buy Smirnoff Vodka Online in Australia',
    intro: `Smirnoff liquor is one of the world's best-selling vodkas. Buy Smirnoff vodka${smirnoffSizes.length ? ` in ${smirnoffSizes.slice(0, 3).join(', ')}` : ''} and Smirnoff premixes online from Doctors of Whisky, with insured delivery across Australia.`,
    primary: 'smirnoff liquor',
    secondary: ['smirnoff vodka', 'smirnoff', 'smirnoff ice', 'smirnoff double black', 'smirnoff vodka 1l', 'smirnoff 700ml', 'smirnoff vodka 1 litre'],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Vodka', path: '/shop/spirit/collection/vodka/' }, { name: 'Smirnoff', path: '/collections/smirnoff/' }],
    ctaLabel: 'Shop all vodka',
    ctaHref: '/shop/spirit/collection/vodka/',
    guideTitle: 'Choosing a Smirnoff',
    guide: [
      'Pick the bottle for the job: a full-size bottle for cocktails and parties, or a premix when you want something ready to drink.',
      'Smirnoff mixes easily with soda, tonic, lemonade and juice, so one bottle covers most home-bar serves.',
      `Orders start at ${money(SHOP_RULES.minOrder)}, so combine Smirnoff with a second bottle or a case to reach the minimum.`,
    ],
    faqs: [...baseFaqs('Smirnoff vodka'), { question: 'Do you sell other vodka brands?', answer: 'Yes, including Grey Goose, Belvedere and Absolut. See the vodka collection for the full range.' }],
    sections: [{ id: 'smirnoff', h2: 'Smirnoff vodka and premix', note: 'Every Smirnoff product we stock, with current prices.', products: smirnoffAll.slice(0, 12), moreHref: '/shop/spirit/collection/vodka/', moreLabel: 'See the full vodka range' }],
    related: [
      { label: 'Vodka brands guide', href: '/blog/vodka-brands-absolut-skyy-titos-how-to-choose/' },
      { label: 'Vodka premix collection', href: '/shop/beer-premix-wine/collection/vodka-premix/' },
    ],
  };

  // ---- Absolut ----
  const absolutAll = PRODUCTS.filter((p) => /absolut\b/i.test(`${p.brand} ${p.name}`) && real(p)).sort(rank);
  const premiumVodka = bySubs(['grey-goose', 'belvedere']).filter(full).sort(rank).slice(0, 6);
  const absolut: CuratedConfig = {
    slug: 'absolut',
    authoritySlug: 'vodka',
    path: '/collections/absolut/',
    title: 'Absolut Vodka Australia | Buy Absolut Online',
    description: 'Buy Absolut vodka online in Australia at everyday prices, with insured delivery Australia-wide. Compare Absolut with Grey Goose and Belvedere. 18+ only.',
    h1: 'Absolut Vodka: Buy Absolut Online in Australia',
    intro: `Buy Absolut vodka online from Doctors of Whisky and have it delivered insured across Australia. Compare Absolut with other premium vodkas below.`,
    primary: 'absolut vodka',
    secondary: ['buy absolut vodka', 'absolut vodka 700ml', 'absolut vanilla vodka', 'absolut liquor', '1l absolut vodka', 'absolut price vodka'],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Vodka', path: '/shop/spirit/collection/vodka/' }, { name: 'Absolut', path: '/collections/absolut/' }],
    ctaLabel: 'Shop all vodka',
    ctaHref: '/shop/spirit/collection/vodka/',
    guideTitle: 'Absolut vs other premium vodkas',
    guide: [
      'Absolut is a clean, widely available vodka that works in cocktails and long drinks.',
      'Step up to Grey Goose or Belvedere when you want a smoother sipping or martini vodka.',
      `Orders start at ${money(SHOP_RULES.minOrder)}, so pair Absolut with a second bottle to reach the minimum.`,
    ],
    faqs: [...baseFaqs('Absolut vodka'), { question: 'Which vodka is best for martinis?', answer: 'Premium vodkas such as Grey Goose or Belvedere are popular for martinis; see the comparison guide for how they differ.' }],
    sections: [
      ...(absolutAll.length ? [{ id: 'absolut', h2: 'Absolut vodka', products: absolutAll.slice(0, 6) } as CuratedSection] : []),
      { id: 'premium', h2: 'More premium vodka', note: 'Grey Goose and Belvedere bottles from the same shelf.', products: premiumVodka, moreHref: '/shop/spirit/collection/vodka/', moreLabel: 'See the full vodka range' },
    ],
    related: [
      { label: 'Vodka brands guide', href: '/blog/vodka-brands-absolut-skyy-titos-how-to-choose/' },
      { label: 'Grey Goose vs Belvedere', href: '/blog/grey-goose-vs-belvedere-vodka-compared/' },
    ],
  };

  // ---- gin gifts ----
  const gin = bySubs(['gin', 'pink-gin']).filter(full);
  const GIFT = /gift|pack|collection|box|\bset\b|\btin\b|trio|hamper|tasting/i;
  const ginSets = gin.filter((p) => GIFT.test(p.name)).sort((a, b) => a.price - b.price);
  const inSets = new Set(ginSets.map((p) => p.id));
  const band = (min: number, max: number) => gin.filter((p) => p.price >= min && p.price < max && !inSets.has(p.id)).sort(rank).slice(0, 6);
  const ginBands: CuratedSection[] = [
    { id: 'under-100', h2: 'Gin gifts under $100', note: `Add a second bottle to reach the ${money(SHOP_RULES.minOrder)} minimum order.`, products: band(0, 100) },
    { id: '100-250', h2: 'Gin gifts from $100 to $250', products: band(100, 250) },
    { id: 'over-250', h2: 'Premium gin gifts over $250', products: band(250, 1e9) },
  ].filter((s) => s.products.length > 0);
  const ginGifts: CuratedConfig = {
    slug: 'gin-gifts',
    authoritySlug: 'gin',
    path: '/gifts/gin/',
    title: 'Gin Gifts Australia | Buy Gin Gift Packs Online',
    description: 'Gin gifts Australia: buy gin gift packs and gift-ready bottles online, by budget, with insured delivery Australia-wide. 18+ only.',
    h1: 'Gin Gifts Australia: Buy Gin Gift Packs Online',
    intro: `Looking for gin gifts Australia? Choose a gift-ready gin pack or a bottle by budget, and Doctors of Whisky will deliver it insured anywhere in Australia.`,
    primary: 'gin gifts australia',
    secondary: ['gin gifts', 'gin gift packs', 'gin gift set australia', 'gin gift pack', 'gin gift set', 'gin presents'],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Gin', path: '/shop/spirit/collection/gin/' }, { name: 'Gin gifts', path: '/gifts/gin/' }],
    ctaLabel: 'Shop all gin',
    ctaHref: '/shop/spirit/collection/gin/',
    guideTitle: 'How to choose a gin gift',
    guide: [
      'London dry gin is the classic, juniper-led choice; pink and flavoured gins suit lighter, fruitier tastes.',
      'A gift pack or set reads as a present straight away; otherwise match the bottle to your budget using the bands below.',
      `The minimum order is ${money(SHOP_RULES.minOrder)}, so add a mixer or a second bottle if the gift is under that.`,
    ],
    faqs: [...baseFaqs('gin gifts'), { question: 'Which gin makes the best gift?', answer: 'A gift-ready pack or set reads as a present straight away. For a bottle, choose by budget: the sections above group gin by price, and London dry is the classic juniper-led choice.' }],
    sections: [
      ...(ginSets.length ? [{ id: 'sets', h2: 'Gin gift sets and packs', note: 'Packs, sets and collections that arrive ready to give.', products: ginSets.slice(0, 9) } as CuratedSection] : []),
      ...ginBands,
    ],
    related: [
      { label: 'Gin collection', href: '/shop/spirit/collection/gin/' },
      { label: 'Pink gin collection', href: '/shop/spirit/collection/pink-gin/' },
      { label: 'London dry vs contemporary gin', href: '/blog/london-dry-vs-contemporary-gin/' },
      { label: 'Whisky gift packs', href: '/gifts/whisky/' },
    ],
  };

  return { tequila, smirnoff, absolut, 'gin-gifts': ginGifts };
}

export const CURATED = build();
export const COLLECTION_SLUGS = ['tequila', 'smirnoff', 'absolut'] as const;
