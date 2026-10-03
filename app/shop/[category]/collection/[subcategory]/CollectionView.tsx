import React from 'react';
import { notFound } from 'next/navigation';
import Link from '@/components/AppLink';
import { getSubcategoryBySlug } from '@/lib/data/subcategories';
import { getProductsBySubCategory } from '@/lib/data/products';
import { MAIN_CATEGORIES } from '@/lib/data/menu';
import { BLOG_POSTS } from '@/lib/data/blog';
import { ProductCardServer as ProductCard } from '@/components/ProductCardServer';
import { Pager } from '@/components/Pager';
import { SHOP_PAGE_SIZE } from '@/lib/shop-pages';
import { ArrowLeft, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';
import { subcategoryTags, breadcrumbLd, itemListLd, faqLd, webPageLd, ld, titleCase } from '@/lib/seo';
import { TagCloud } from '@/components/TagCloud';
import { RelatedSearches } from '@/components/RelatedSearches';
import { AuthorityLinks } from '@/components/AuthorityLinks';
import { authorityFor } from '@/lib/data/authority-links';
import { buildTagLinks, linkList, collectionTagTemplates } from '@/lib/tag-links';

/** A collection page; collections larger than SHOP_PAGE_SIZE are split into /page/2/, /page/3/ ... */
export function CollectionView({ catSlug, subSlug, page }: { catSlug: string; subSlug: string; page: number }) {

  const sub = getSubcategoryBySlug(subSlug);
  const currentCat = MAIN_CATEGORIES.find((c) => c.slug === catSlug);
  if (!sub || sub.category !== catSlug || !currentCat) {
    notFound();
  }

  // Every bottle is linked from a static page: page 1 plus numbered /page/N/ pages, all crawlable.
  const products = getProductsBySubCategory(subSlug);
  const pageCount = Math.max(1, Math.ceil(products.length / SHOP_PAGE_SIZE));
  if (page > pageCount) notFound();
  const pageProducts = products.slice((page - 1) * SHOP_PAGE_SIZE, page * SHOP_PAGE_SIZE);
  const basePath = `/shop/${catSlug}/collection/${subSlug}/`;
  const path = page > 1 ? `${basePath}page/${page}/` : basePath;

  const pageLd = {
    ...webPageLd({ type: 'CollectionPage', name: sub.name, description: sub.description, path }),
    breadcrumb: undefined,
  };
  const breadcrumbSchema = breadcrumbLd([
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop/' },
    { name: currentCat.name, path: `/shop/${catSlug}/` },
    { name: sub.name, path: basePath },
    ...(page > 1 ? [{ name: `Page ${page}`, path }] : []),
  ]);

  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(pageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(itemListLd(sub.name, pageProducts, path)) }} />
      {page === 1 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(faqLd(sub.faqs)) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(breadcrumbSchema) }} />

      <div className="max-w-7xl mx-auto space-y-10">
        <div className="space-y-4 pb-6 border-b border-neutral-900">
          <nav className="flex items-center gap-2 text-xs text-neutral-400 flex-wrap">
            <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <Link href={`/shop/${catSlug}/`} className="hover:text-amber-300 transition-colors">{currentCat.name}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-neutral-200 font-medium">{sub.name}</span>
          </nav>

          <Link href={`/shop/${catSlug}/`} className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {currentCat.name}</span>
          </Link>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-amber-500 font-bold">
                Sydney Vault Collection
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight">
              Buy {sub.name} Online in Australia{page > 1 ? ` – Page ${page}` : ''}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-light leading-relaxed">
              {sub.description}
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-neutral-900/30 border border-neutral-800 space-y-4">
            <p className="text-sm text-neutral-400">
              New vault allocations for {sub.name} are currently undergoing Sommelier inspection. Please check back shortly or inquire directly.
            </p>
            <Link href="/contact" className="inline-block px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-xs">
              Inquire With Concierge
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-100">{titleCase(sub.primaryKeyword)}: {products.length} {sub.name} {products.length === 1 ? 'bottle' : 'bottles'} to buy online</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageProducts.map((product, i) => (
                <div key={product.id} className="h-full cv-card">
                  <ProductCard product={product} altKeyword={sub.primaryKeyword} priority={i < 2} />
                </div>
              ))}
            </div>
            <Pager page={page} count={pageCount} basePath={basePath} label={`${sub.name} pages`} />
          </>
        )}

        {page === 1 && sub.longDescription && sub.longDescription.length > 0 && (
          <section className="pt-10 border-t border-neutral-900 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-neutral-100">About {sub.name} at Doctors of Whisky</h2>
            {sub.longDescription.map((para, i) => (
              <p key={i} className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light max-w-3xl">
                {para}
              </p>
            ))}
            <p className="text-sm text-neutral-400">
              Related guides:{' '}
              {BLOG_POSTS.filter((b) => b.relatedSubcategory === sub.slug).slice(0, 3).map((b, i) => (
                <React.Fragment key={b.slug}>
                  {i > 0 && ' · '}
                  <Link href={`/blog/${b.slug}/`} className="text-amber-400 hover:text-amber-300 underline underline-offset-2">{b.title}</Link>
                </React.Fragment>
              ))}
            </p>
          </section>
        )}

        <RelatedSearches links={linkList(sub.secondaryKeywords, path, path, 15)} title={`Related searches: ${sub.primaryKeyword}`} />
        <TagCloud tags={sub.tags && sub.tags.length >= 20 ? linkList(sub.tags, path, path, 20) : buildTagLinks(sub.tags ?? subcategoryTags(subSlug, 60), path, path, 20, collectionTagTemplates(sub.name))} title="Popular searches and tags" />

        {/* Subcategory FAQ (page 1 only, so paginated pages do not repeat it) */}
        {page === 1 && (
        <div className="pt-10 border-t border-neutral-900 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-neutral-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-3">
            {sub.faqs.map((faq, idx) => (
              <details key={idx} className="group rounded-2xl bg-neutral-900/60 border border-neutral-800/90 open:border-amber-700/50 p-5">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base font-serif font-bold text-neutral-100 group-open:text-amber-300">
                  <span>{faq.question}</span>
                  <ChevronRight className="w-4 h-4 shrink-0 text-neutral-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
        )}

        <AuthorityLinks links={authorityFor(sub.slug)} title={`Learn more about ${sub.name.toLowerCase()}`} />
      </div>
    </div>
  );
}
