import type { BlogPost } from '@/lib/types';
import { SHOP_RULES } from '@/lib/config';
import { NEW_GUIDE_EXTRAS } from '@/lib/data/blog-new-extras';

export interface NewGuide {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  category: string;
  image: string;
  primaryKeyword: string;
  relatedSubcategory: string;
  lead: string;
  takeaways: string[];
  sections: { heading: string; paragraphs: string[]; links?: { text: string; href: string }[] }[];
  faqs: { question: string; answer: string }[];
  outbound: { text: string; url: string }[];
}

const wordsIn = (g: NewGuide) =>
  [g.lead, ...g.takeaways, ...g.sections.flatMap((s) => [s.heading, ...s.paragraphs]), ...g.faqs.flatMap((f) => [f.question, f.answer])].join(' ').split(/\s+/).length;

/** Builds a BlogPost for guides written alongside the keyword-strategy-v2 catalogue additions. Keywords are overwritten by lib/data/blog-seo.ts. */
export function newGuide(g: NewGuide): BlogPost {
  const money = (n: number) => '$' + n.toLocaleString('en-AU');
  const sections = [
    ...g.sections,
    ...(NEW_GUIDE_EXTRAS[g.slug] ?? []),
    {
      heading: 'How do you buy online from Doctors of Whisky?',
      paragraphs: [
        `Doctors of Whisky is a Sydney-based online bottle shop. Browse the collection, add bottles to your cart and choose PayID, bank transfer, Bitcoin or USDT at checkout; paying with Bitcoin or USDT takes ${SHOP_RULES.cryptoDiscountPercent}% off.`,
        `The minimum order is ${money(SHOP_RULES.minOrder)} AUD. Orders of ${money(SHOP_RULES.freeShippingThreshold)} AUD or more ship free by express courier, and a flat ${money(SHOP_RULES.shippingFee)} AUD fee applies below that. Delivery is insured, and an adult (18+) must sign for every parcel.`,
      ],
    },
    {
      heading: 'How can you drink responsibly in Australia?',
      paragraphs: [
        'The Australian guidelines to reduce health risks from drinking alcohol recommend no more than 10 standard drinks a week and no more than four standard drinks on any one day. A standard drink contains 10 grams of alcohol, and the label on every bottle shows the number of standard drinks.',
        'Pace yourself, eat before and while you drink, alternate with water, and never drive after drinking. You must be 18 or over to buy alcohol.',
      ],
    },
  ];
  return {
    slug: g.slug,
    title: g.title,
    ...(g.seoTitle ? { seoTitle: g.seoTitle } : {}),
    excerpt: g.excerpt,
    body: [g.lead],
    image: g.image,
    category: g.category,
    date: 'October 2, 2026',
    readTime: `${Math.max(5, Math.round((wordsIn(g) + sections.slice(g.sections.length).flatMap((s) => s.paragraphs).join(' ').split(/\s+/).length) / 230))} min read`,
    primaryKeyword: g.primaryKeyword,
    secondaryKeywords: [],
    relatedSubcategory: g.relatedSubcategory,
    outboundLinks: g.outbound,
    updated: '2026-10-02',
    keyTakeaways: g.takeaways,
    sections,
    faqs: g.faqs,
  };
}
