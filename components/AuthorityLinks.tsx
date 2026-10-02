import React from 'react';
import type { AuthorityLink } from '@/lib/data/authority-links';

/** Outbound references to high-authority sites. */
export function AuthorityLinks({ links, title = 'Learn more' }: { links: AuthorityLink[]; title?: string }) {
  if (!links.length) return null;
  return (
    <section aria-label={title} className="pt-8 border-t border-neutral-900 space-y-3">
      <h2 className="text-sm font-serif font-bold text-neutral-100 uppercase tracking-wider">{title}</h2>
      <ul className="space-y-1.5 text-sm">
        {links.map((l) => (
          <li key={l.url}>
            <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
              {l.text}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
