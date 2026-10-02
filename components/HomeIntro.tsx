import React from 'react';
import Link from 'next/link';
import { HOME_SEO } from '@/lib/data/home-seo';
import { linkList } from '@/lib/tag-links';
import { titleCase } from '@/lib/seo';

/**
 * Homepage H1, tagline, popular searches and tags line, built from the Semrush bank (KD <= 28, highest volume first):
 *   primary  = the highest-volume Transactional keyword (glenfiddich 14,800)
 *   tags line = the highest-volume Commercial + Transactional keywords (baileys, tequila, prosecco, jack daniels, champagne, whisky, veuve clicquot ...)
 * Every keyword links to the closest real product or collection page.
 */
export function HomeIntro() {
  const secondary = linkList(HOME_SEO.secondary.map((k) => k.kw), '/shop/', '/', 15);
  const tags = linkList(HOME_SEO.tags.map((k) => k.kw), '/shop/', '/');
  const headline = [titleCase(HOME_SEO.primary.kw), ...HOME_SEO.headline.map(titleCase)];
  const lead = headline.length > 1 ? `${headline.slice(0, -1).join(', ')} and ${headline[headline.length - 1]}` : headline[0];
  const feature = HOME_SEO.primaries.slice(0, 3).map((k) => titleCase(k.kw));
  return (
    <section aria-label="Shop online in Australia" className="bg-neutral-950 border-b border-neutral-900 px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="max-w-5xl mx-auto space-y-5 text-center">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight leading-tight">
          Buy {lead} Online in Australia
        </h1>
        <p className="text-base sm:text-lg text-amber-300 font-serif">
          {headline[0]}, {feature.join(', ')} and more, delivered insured Australia-wide.
        </p>
        <p className="text-sm sm:text-base text-neutral-300 max-w-3xl mx-auto leading-relaxed font-light">
          Doctors of Whisky is a Sydney bottle shop for whisky, tequila, gin, vodka, champagne, prosecco, cognac, wine and beer. Browse the{' '}
          <Link href="/shop/whisky/" className="text-amber-400 underline underline-offset-2">whisky collection</Link>, compare{' '}
          <Link href="/shop/whisky/collection/scotch-whisky/" className="text-amber-400 underline underline-offset-2">Scotch whisky</Link> and{' '}
          <Link href="/shop/whisky/collection/bourbon/" className="text-amber-400 underline underline-offset-2">bourbon</Link>, and order online. Buyers must be 18 or over.
        </p>
        <div className="pt-4 text-left space-y-6">
          <section aria-label="Tags line" className="space-y-3">
            <h2 className="text-sm font-serif font-bold text-neutral-100 uppercase tracking-wider text-center">Top searches: Glenfiddich, tequila, whisky, champagne and more</h2>
            <ul className="flex flex-wrap justify-center gap-2">
              {tags.map((t) => (
                <li key={t.label}>
                  <Link href={t.href} className="inline-block px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-amber-300 hover:border-amber-700/60 transition-colors">{t.label}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-label="Popular whisky searches" className="space-y-3">
            <h2 className="text-sm font-serif font-bold text-neutral-100 uppercase tracking-wider text-center">Popular searches in Australia</h2>
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
              {secondary.map((l) => (
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
