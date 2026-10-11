import React from 'react';
import Link from '@/components/PlainLink';
import { HOME_SEO } from '@/lib/data/home-seo';
import { linkList } from '@/lib/tag-links';
import { titleCase } from '@/lib/seo';

/**
 * Homepage H1, tagline, popular searches and tags line, built from the Semrush bank (KD <= 29, highest volume first):
 *   primary  = whisky sale (owner decision 2026-10-11); brand terms are taglines
 *   tags line = the highest-volume Commercial + Transactional keywords (baileys, tequila, prosecco, jack daniels, champagne, whisky, veuve clicquot ...)
 * Every keyword links to the closest real product or collection page.
 */
export function HomeIntro() {
  const secondary = linkList(HOME_SEO.secondary.map((k) => k.kw), '/shop/', '/', 5);
  const tags = linkList(HOME_SEO.tags.map((k) => k.kw), '/shop/', '/');
  // H1 leads with the main primary (whisky sale), then the broad commercial words people buy by.
  const rest = HOME_SEO.headline.filter((w) => !HOME_SEO.primary.kw.includes(w)).map(titleCase);
  const buyList = ['Whisky', ...rest];
  const lead = buyList.length > 1 ? `${buyList.slice(0, -1).join(', ')} and ${buyList[buyList.length - 1]}` : buyList[0];
  const feature = HOME_SEO.primaries.slice(0, 3).map((k) => titleCase(k.kw));
  return (
    <section aria-label="Shop online in Australia" className="bg-neutral-950 border-b border-neutral-900 px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="max-w-5xl mx-auto space-y-5 text-center">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight leading-tight">
          {titleCase(HOME_SEO.primary.kw)}: Buy {lead} Online in Australia
        </h1>
        <p className="text-base sm:text-lg text-amber-300 font-serif">
          Whisky sale prices on Scotch, Japanese and Australian whisky, plus tequila, gin and champagne, delivered insured Australia-wide.
        </p>
        <p className="text-sm sm:text-base text-neutral-300 max-w-3xl mx-auto leading-relaxed font-light">
          Doctors of Whisky is a Sydney bottle shop for whisky, tequila, gin, vodka, champagne, prosecco, cognac, wine and beer. Browse the{' '}
          <Link href="/shop/whisky/" className="text-amber-400 underline underline-offset-2">whisky collection</Link>, compare{' '}
          <Link href="/shop/whisky/collection/scotch-whisky/" className="text-amber-400 underline underline-offset-2">Scotch whisky</Link> and{' '}
          <Link href="/shop/whisky/collection/bourbon/" className="text-amber-400 underline underline-offset-2">bourbon</Link>, and order online. Buyers must be 18 or over.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-1">
          <Link href="/shop/whisky/" className="px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-sm transition-colors">Shop the whisky sale</Link>
          <Link href="/shop/" className="px-6 py-3 rounded-lg border border-amber-700/60 text-amber-300 hover:bg-neutral-900 font-semibold text-sm transition-colors">Browse all bottles</Link>
          <Link href="/contact/" className="px-6 py-3 rounded-lg border border-neutral-700 text-neutral-200 hover:bg-neutral-900 font-semibold text-sm transition-colors">Ask us about a bottle</Link>
        </div>
        <div className="pt-4 text-left space-y-6">
          <section aria-label="Tags line" className="space-y-3">
            <h2 className="text-sm font-serif font-bold text-neutral-100 uppercase tracking-wider text-center">Whisky sale top searches: Glenfiddich, tequila, gin, champagne and more</h2>
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
