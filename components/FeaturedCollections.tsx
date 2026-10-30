import React from 'react';
import Link from '@/components/PlainLink';

export interface FeaturedLink { label: string; href: string; note: string }

export const ALL_FEATURED: FeaturedLink[] = [
  { label: 'Whisky gift packs', href: '/gifts/whisky/', note: 'Ready-to-give whisky sets and gifts by budget' },
  { label: 'Gin gifts Australia', href: '/gifts/gin/', note: 'Gin gift packs and gift-ready bottles' },
  { label: 'Buy tequila online', href: '/collections/tequila/', note: 'Patrón, Don Julio, Jose Cuervo and more' },
  { label: 'Smirnoff liquor', href: '/collections/smirnoff/', note: 'Smirnoff vodka and premix ranges' },
  { label: 'Absolut vodka', href: '/collections/absolut/', note: 'Absolut bottles with Grey Goose and Belvedere compared' },
];

/** Plain-HTML strip of curated landing pages; crawlable internal links with descriptive anchors. */
export function FeaturedCollections({ links = ALL_FEATURED, title = 'Featured collections and gifts' }: { links?: FeaturedLink[]; title?: string }) {
  if (!links.length) return null;
  return (
    <section aria-label={title} className="pt-8 border-t border-neutral-900 space-y-3">
      <h2 className="text-sm font-serif font-bold text-neutral-100 uppercase tracking-wider">{title}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-amber-400 hover:text-amber-300 underline underline-offset-2">{l.label}</Link>
            <span className="text-neutral-400"> – {l.note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
