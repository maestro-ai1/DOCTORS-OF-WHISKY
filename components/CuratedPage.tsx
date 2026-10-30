import React from 'react';
import Link from '@/components/PlainLink';
import { ChevronRight } from 'lucide-react';
import { ProductCardServer as ProductCard } from '@/components/ProductCardServer';
import { RelatedSearches } from '@/components/RelatedSearches';
import { linkList } from '@/lib/tag-links';
import { breadcrumbLd, faqLd, itemListLd, webPageLd, ld } from '@/lib/seo';
import { AuthorityLinks } from '@/components/AuthorityLinks';
import { authorityFor } from '@/lib/data/authority-links';
import type { CuratedConfig } from '@/lib/data/curated';

/** Server-rendered curated landing page (tequila hub, Smirnoff, Absolut, gin gifts). */
export function CuratedPage({ cfg }: { cfg: CuratedConfig }) {
  const all = cfg.sections.flatMap((s) => s.products);
  const first = cfg.sections[0]?.id;
  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(webPageLd({ type: 'CollectionPage', name: cfg.title, description: cfg.description, path: cfg.path })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(itemListLd(cfg.h1, all, cfg.path)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(faqLd(cfg.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(breadcrumbLd(cfg.breadcrumb)) }} />

      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-4 pb-6 border-b border-neutral-900">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 flex-wrap">
            {cfg.breadcrumb.map((b, i) => (
              <React.Fragment key={b.path}>
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />}
                {i < cfg.breadcrumb.length - 1 ? (
                  <Link href={b.path} className="hover:text-amber-300 transition-colors">{b.name}</Link>
                ) : (
                  <span className="text-neutral-200 font-medium">{b.name}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight">{cfg.h1}</h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-3xl font-light leading-relaxed">{cfg.intro}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            {first && <a href={`#${first}`} className="px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-sm transition-colors">View the range</a>}
            <Link href={cfg.ctaHref} className="px-6 py-3 rounded-lg border border-amber-700/60 text-amber-300 hover:bg-neutral-900 font-semibold text-sm transition-colors">{cfg.ctaLabel}</Link>
            <Link href="/contact/" className="px-6 py-3 rounded-lg border border-neutral-700 text-neutral-200 hover:bg-neutral-900 font-semibold text-sm transition-colors">Help me choose</Link>
          </div>
        </header>

        {cfg.sections.map((s, si) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="space-y-5 scroll-mt-28">
            <h2 id={`${s.id}-h`} className="text-2xl font-serif font-bold text-neutral-100">{s.h2}</h2>
            {s.note && <p className="text-sm text-neutral-400 max-w-3xl">{s.note}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {s.products.map((p, i) => (
                <div key={p.id} className="h-full cv-card">
                  <ProductCard product={p} altKeyword={cfg.primary} priority={si === 0 && i < 2} />
                </div>
              ))}
            </div>
            {s.moreHref && (
              <p className="text-sm">
                <Link href={s.moreHref} className="text-amber-400 hover:text-amber-300 underline underline-offset-2">{s.moreLabel ?? 'View all'}</Link>
              </p>
            )}
          </section>
        ))}

        <section aria-labelledby="guide-h" className="space-y-4 max-w-3xl">
          <h2 id="guide-h" className="text-2xl font-serif font-bold text-neutral-100">{cfg.guideTitle}</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {cfg.guide.map((g) => <li key={g}>{g}</li>)}
          </ul>
          <p className="text-sm text-neutral-400">
            Read more:{' '}
            {cfg.related.map((r, i) => (
              <React.Fragment key={r.href}>
                {i > 0 && ' · '}
                <Link href={r.href} className="text-amber-400 hover:text-amber-300 underline underline-offset-2">{r.label}</Link>
              </React.Fragment>
            ))}
          </p>
        </section>

        <section aria-labelledby="faq-h" className="space-y-4 max-w-3xl">
          <h2 id="faq-h" className="text-2xl font-serif font-bold text-neutral-100">Questions answered</h2>
          <div className="space-y-3">
            {cfg.faqs.map((f) => (
              <details key={f.question} className="group rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-neutral-100">{f.question}</summary>
                <p className="mt-2 text-sm text-neutral-300 font-light leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <RelatedSearches links={linkList(cfg.secondary, cfg.ctaHref, cfg.path, 5)} title={`Related searches: ${cfg.secondary[0] || cfg.primary}`} />
        {cfg.authoritySlug && <AuthorityLinks links={authorityFor(cfg.authoritySlug)} title={`Learn more about ${cfg.primary}`} />}
      </div>
    </div>
  );
}
