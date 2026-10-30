import React from 'react';
import type { Metadata } from 'next';
import Link from '@/components/PlainLink';
import { ChevronRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { BLOG_POSTS } from '@/lib/data/blog';
import { ProductCardServer as ProductCard } from '@/components/ProductCardServer';
import { RelatedSearches } from '@/components/RelatedSearches';
import { linkList } from '@/lib/tag-links';
import { AuthorityLinks } from '@/components/AuthorityLinks';
import { authorityFor } from '@/lib/data/authority-links';
import { SHOP_RULES } from '@/lib/config';
import { buildMetadata, breadcrumbLd, faqLd, itemListLd, webPageLd, ld } from '@/lib/seo';
import type { Product } from '@/lib/types';

/**
 * Whisky gift pack landing page (bridge between the blog guides and the whisky collections).
 * Primary: "whisky gift pack" (Semrush AU 2,400 / KD 9, Commercial: no Transactional gift term has volume).
 * Secondary (Commercial): whiskey gift 2,400, whiskey gifts australia 1,900, whisky gift set 480, whisky gifts 320,
 * good whiskey for gift 320. Products are real stocked bottles only; prices come from the catalogue.
 */
const PATH = '/gifts/whisky/';
const PRIMARY = 'whisky gift pack';
const SECONDARY = ['whiskey gift', 'whiskey gifts australia', 'whisky gift set', 'whisky gifts', 'good whiskey for gift', 'whiskey presents', 'whisky gift pack australia'];
const TITLE = 'Whisky Gift Pack Australia | Buy Whisky Gifts Online';
const DESC = `Buy a whisky gift pack online in Australia: Macallan, Laphroaig and Lark gift sets plus whisky gifts by budget, with insured delivery Australia-wide. 18+ only.`;

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESC,
  path: PATH,
  keywords: [PRIMARY, ...SECONDARY],
});

const money = (n: number) => `$${n.toLocaleString('en-AU')}`;
// A gift bottle is a full-size pack: real photo, and not a miniature or sample (under 500ml).
const full = (p: Product) => {
  const m = /(\d+)\s?ml/i.exec(p.size || '');
  return !m || Number(m[1]) >= 500;
};
const real = (p: Product) => !p.images[0].endsWith('.svg') && full(p);
const whisky = PRODUCTS.filter((p) => p.category === 'whisky' && real(p));
const GIFT_FORMAT = /gift|pack|collection|box|\bset\b|\btin\b|anthology|sample room|trio|miniature/i;
const giftSets = whisky.filter((p) => GIFT_FORMAT.test(p.name)).sort((a, b) => a.price - b.price);
const used = new Set(giftSets.map((p) => p.id));
const pickBand = (min: number, max: number, n = 6) =>
  whisky
    .filter((p) => p.price >= min && p.price < max && !used.has(p.id) && p.stock !== 0)
    .sort((a, b) => (b.badge === 'BEST SELLER' ? 1 : 0) - (a.badge === 'BEST SELLER' ? 1 : 0) || Number(b.featured) - Number(a.featured) || a.price - b.price)
    .slice(0, n);
const BANDS = [
  { id: 'under-700', h: `Whisky gifts from ${money(SHOP_RULES.minOrder)} to $700`, note: `Our minimum order is ${money(SHOP_RULES.minOrder)}, so these work as a single gift or paired with a second bottle.`, products: pickBand(SHOP_RULES.minOrder, 700) },
  { id: '700-1500', h: 'Whisky gifts from $700 to $1,500', note: 'Aged single malts and limited releases that make a statement.', products: pickBand(700, SHOP_RULES.freeShippingThreshold) },
  { id: 'over-1500', h: `Premium whisky gifts over ${money(SHOP_RULES.freeShippingThreshold)}`, note: `Orders of ${money(SHOP_RULES.freeShippingThreshold)} or more ship free by express courier.`, products: pickBand(SHOP_RULES.freeShippingThreshold, 1e9) },
].filter((b) => b.products.length > 0);

const FAQS = [
  {
    question: 'What is the best whisky gift pack to buy in Australia?',
    answer: `For a ready-made presentation, choose a pack or collection set such as the Lark Classic Pack, a Laphroaig glass pack or a Macallan Colour Collection. If the person likes a smooth, easy dram, a blended Scotch or Japanese whisky is a safe pick; for peat lovers, Islay bottles such as Laphroaig suit best.`,
  },
  {
    question: 'Do you deliver whisky gifts across Australia?',
    answer: `Yes. Doctors of Whisky ships Australia-wide with insured delivery from Sydney. Shipping is a flat ${money(SHOP_RULES.shippingFee)} under ${money(SHOP_RULES.freeShippingThreshold)} and free by express courier on orders of ${money(SHOP_RULES.freeShippingThreshold)} or more. The minimum order is ${money(SHOP_RULES.minOrder)}.`,
  },
  {
    question: 'Is there an age limit when buying whisky as a gift?',
    answer: 'Yes. Buyers must be 18 or over, and the delivery needs to be received by an adult.',
  },
  {
    question: 'How can I pay for a whisky gift?',
    answer: `Pay by PayID, bank transfer, Bitcoin or USDT. Paying with crypto takes ${SHOP_RULES.cryptoDiscountPercent}% off.`,
  },
  {
    question: 'Can you help me choose a whisky gift?',
    answer: 'Yes. Message us on WhatsApp or use the contact form with the budget and what the recipient likes, and we will suggest bottles from the range.',
  },
];

const GUIDES = BLOG_POSTS.filter((b) => ['single-malt-vs-blended-scotch', 'why-japanese-whisky-became-a-global-obsession', 'rise-of-australian-single-malt-whisky'].includes(b.slug));

function Grid({ products, offset = 0 }: { products: Product[]; offset?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p, i) => (
        <div key={p.id} className="h-full cv-card">
          <ProductCard product={p} altKeyword={PRIMARY} priority={offset + i < 2} />
        </div>
      ))}
    </div>
  );
}

export default function WhiskyGiftsPage() {
  const all = [...giftSets, ...BANDS.flatMap((b) => b.products)];
  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(webPageLd({ type: 'CollectionPage', name: TITLE, description: DESC, path: PATH })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(itemListLd('Whisky gift packs', all, PATH)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(faqLd(FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Whisky', path: '/shop/whisky/' }, { name: 'Whisky gift packs', path: PATH }])) }} />

      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-4 pb-6 border-b border-neutral-900">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 flex-wrap">
            <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <Link href="/shop/whisky/" className="hover:text-amber-300 transition-colors">Whisky</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-neutral-200 font-medium">Whisky gift packs</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight">Whisky Gift Pack: Buy Whisky Gifts Online in Australia</h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-3xl font-light leading-relaxed">
            Looking for a whisky gift pack? Doctors of Whisky is a Sydney bottle shop with {giftSets.length} ready-to-give whisky sets and collections, plus
            a whiskey gift for every budget from {money(SHOP_RULES.minOrder)} up. Choose a bottle, pay securely and we deliver it insured Australia-wide.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a href="#gift-packs" className="px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-sm transition-colors">Shop whisky gift packs</a>
            <Link href="/shop/whisky/" className="px-6 py-3 rounded-lg border border-amber-700/60 text-amber-300 hover:bg-neutral-900 font-semibold text-sm transition-colors">Browse all whisky</Link>
            <Link href="/contact/" className="px-6 py-3 rounded-lg border border-neutral-700 text-neutral-200 hover:bg-neutral-900 font-semibold text-sm transition-colors">Help me choose a gift</Link>
          </div>
        </header>

        <section id="gift-packs" aria-labelledby="gift-packs-h" className="space-y-5 scroll-mt-28">
          <h2 id="gift-packs-h" className="text-2xl font-serif font-bold text-neutral-100">Whisky gift sets and collection packs</h2>
          <p className="text-sm text-neutral-400 max-w-3xl">Each of these arrives as a pack, glass set or collection, so it is ready to give.</p>
          <Grid products={giftSets} />
        </section>

        <section aria-labelledby="budget-h" className="space-y-8">
          <h2 id="budget-h" className="text-2xl font-serif font-bold text-neutral-100">Whisky gifts by budget</h2>
          {BANDS.map((b, bi) => (
            <div key={b.id} className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-amber-400">{b.h}</h3>
              <p className="text-sm text-neutral-400 max-w-3xl">{b.note}</p>
              <Grid products={b.products} offset={bi + 2} />
            </div>
          ))}
        </section>

        <section aria-labelledby="choose-h" className="space-y-4 max-w-3xl">
          <h2 id="choose-h" className="text-2xl font-serif font-bold text-neutral-100">How to choose a whisky gift</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            <li><b className="text-neutral-100">Match the taste.</b> Smooth and fruity suits Japanese whisky and blended Scotch; smoky suits Islay malts such as Laphroaig; sweet and spicy suits bourbon.</li>
            <li><b className="text-neutral-100">Pick the presentation.</b> A pack, glass set or collection reads as a gift straight away.</li>
            <li><b className="text-neutral-100">Set the budget.</b> Use the price bands above; the {money(SHOP_RULES.minOrder)} minimum order applies to the whole cart.</li>
          </ul>
          <p className="text-sm text-neutral-400">
            Still unsure? Read our guides:{' '}
            {GUIDES.map((g, i) => (
              <React.Fragment key={g.slug}>
                {i > 0 && ' · '}
                <Link href={`/blog/${g.slug}/`} className="text-amber-400 hover:text-amber-300 underline underline-offset-2">{g.title}</Link>
              </React.Fragment>
            ))}
            .
          </p>
        </section>

        <section aria-labelledby="delivery-h" className="space-y-3 max-w-3xl">
          <h2 id="delivery-h" className="text-2xl font-serif font-bold text-neutral-100">Gift ordering and delivery</h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Insured delivery across Australia, a flat {money(SHOP_RULES.shippingFee)} shipping fee under {money(SHOP_RULES.freeShippingThreshold)} and free express courier from {money(SHOP_RULES.freeShippingThreshold)}.
            Pay by PayID / Osko or crypto ({SHOP_RULES.cryptoDiscountPercent}% off with crypto). Buyers must be 18 or over.
            See <Link href="/shipping/" className="text-amber-400 underline underline-offset-2">shipping and delivery</Link> or{' '}
            <Link href="/contact/" className="text-amber-400 underline underline-offset-2">contact us</Link> to arrange a gift.
          </p>
        </section>

        <section aria-labelledby="faq-h" className="space-y-4 max-w-3xl">
          <h2 id="faq-h" className="text-2xl font-serif font-bold text-neutral-100">Whisky gift questions</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.question} className="group rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-neutral-100">{f.question}</summary>
                <p className="mt-2 text-sm text-neutral-300 font-light leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <RelatedSearches links={linkList(SECONDARY, '/shop/whisky/', PATH, 5)} title="Related searches: whisky gifts" />
        <AuthorityLinks links={authorityFor('scotch-whisky')} title="Learn more about whisky" />
      </div>
    </div>
  );
}
