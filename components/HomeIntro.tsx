import React from 'react';
import Link from 'next/link';
import { HOME_SEO } from '@/lib/data/home-seo';
import { linkList } from '@/lib/tag-links';
import { titleCase } from '@/lib/seo';

/**
 * Homepage H1 + taglines built from the highest-volume Transactional / Commercial keywords in the Semrush bank (KD <= 28):
 * primary "buy whisky online"; secondary "whiskey gifts australia", "best whisky in australia", "single malt whisky australia"...
 */
export function HomeIntro() {
  const links = linkList(HOME_SEO.secondary.map((k) => k.kw), '/shop/whisky/', '/', 15);
  return (
    <section aria-label="Buy whisky online in Australia" className="bg-neutral-950 border-b border-neutral-900 px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="max-w-5xl mx-auto space-y-5 text-center">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight leading-tight">
          {titleCase(HOME_SEO.primary.kw)} in Australia
        </h1>
        <p className="text-base sm:text-lg text-amber-300 font-serif">
          Whiskey gifts, single malt whisky and bourbon in Australia, delivered insured Australia-wide.
        </p>
        <p className="text-sm sm:text-base text-neutral-300 max-w-3xl mx-auto leading-relaxed font-light">
          Doctors of Whisky is a Sydney bottle shop for single malt Scotch, Japanese whisky, bourbon, rye and Australian whisky, plus gin, tequila, vodka and cognac. Browse the{' '}
          <Link href="/shop/whisky/" className="text-amber-400 underline underline-offset-2">whisky collection</Link>, compare{' '}
          <Link href="/shop/whisky/collection/scotch-whisky/" className="text-amber-400 underline underline-offset-2">Scotch whisky</Link> and{' '}
          <Link href="/shop/whisky/collection/bourbon/" className="text-amber-400 underline underline-offset-2">bourbon</Link>, and order online. Buyers must be 18 or over.
        </p>
        <div className="pt-4 text-left space-y-6">
          <section aria-label="Popular whisky searches" className="space-y-3">
            <h2 className="text-sm font-serif font-bold text-neutral-100 uppercase tracking-wider text-center">Popular whisky searches in Australia</h2>
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-amber-400 hover:text-amber-300 underline underline-offset-2">{l.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
