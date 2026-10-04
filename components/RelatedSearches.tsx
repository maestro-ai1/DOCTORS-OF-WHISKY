import React from 'react';
import Link from '@/components/PlainLink';
import type { TagLink } from '@/lib/tag-links';

/** The 15 secondary keywords for a page, shown as crawlable links under an H2 (each points at the closest real page). */
export function RelatedSearches({ links, title }: { links: TagLink[]; title: string }) {
  if (!links.length) return null;
  return (
    <section aria-label={title} className="pt-8 border-t border-neutral-900 space-y-3">
      <h2 className="text-sm font-serif font-bold text-neutral-100 uppercase tracking-wider">{title}</h2>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
