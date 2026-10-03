import React from 'react';
import Link from '@/components/AppLink';
import type { TagLink } from '@/lib/tag-links';

/** Visible, crawlable tag links (commercial / transactional keywords). Each tag points at a real product or collection page. */
export function TagCloud({ tags, title = 'Popular searches' }: { tags: TagLink[]; title?: string }) {
  if (!tags.length) return null;
  return (
    <section aria-label={title} className="pt-8 border-t border-neutral-900 space-y-3">
      <h2 className="text-sm font-serif font-bold text-neutral-100 uppercase tracking-wider">{title}</h2>
      <ul className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <li key={t.label}>
            <Link
              href={t.href}
              className="inline-block px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-amber-300 hover:border-amber-700/60 transition-colors"
            >
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
