import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SUBCATEGORIES, getSubcategoryBySlug } from '@/lib/data/subcategories';
import { getProductsBySubCategory } from '@/lib/data/products';
import { MAIN_CATEGORIES } from '@/lib/data/menu';
import { ProductCard } from '@/components/ProductCard';
import { ArrowLeft, ChevronRight, ChevronLeft, HelpCircle, Sparkles } from 'lucide-react';

const PAGE_SIZE = 9;

interface CollectionPageProps {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return SUBCATEGORIES.map((sub) => ({
    category: sub.category,
    subcategory: sub.slug,
  }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { subcategory: subSlug, category: catSlug } = await params;
  const sub = getSubcategoryBySlug(subSlug);
  if (!sub) return { title: 'Collection Not Found | Doctors of Whisky' };

  const title = `${sub.name} | Buy Online Australia | Doctors of Whisky`;
  return {
    title: title.length > 65 ? `${sub.name} | Doctors of Whisky` : title,
    description: sub.description,
    keywords: [sub.primaryKeyword, ...sub.secondaryKeywords.slice(0, 10)],
    alternates: {
      canonical: `https://doctorsofwhisky.com.au/shop/${catSlug}/collection/${subSlug}/`,
    },
  };
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { category: catSlug, subcategory: subSlug } = await params;
  const { page: pageParam } = await searchParams;

  const sub = getSubcategoryBySlug(subSlug);
  const currentCat = MAIN_CATEGORIES.find((c) => c.slug === catSlug);
  if (!sub || sub.category !== catSlug || !currentCat) {
    notFound();
  }

  const allProducts = getProductsBySubCategory(subSlug);
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1);
  const totalPages = Math.max(1, Math.ceil(allProducts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const products = allProducts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sub.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://doctorsofwhisky.com.au/' },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://doctorsofwhisky.com.au/shop/' },
      { '@type': 'ListItem', position: 3, name: currentCat.name, item: `https://doctorsofwhisky.com.au/shop/${catSlug}/` },
      { '@type': 'ListItem', position: 4, name: sub.name, item: `https://doctorsofwhisky.com.au/shop/${catSlug}/collection/${subSlug}/` },
    ],
  };

  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-7xl mx-auto space-y-10">
        <div className="space-y-4 pb-6 border-b border-neutral-900">
          <nav className="flex items-center gap-2 text-xs text-neutral-400 flex-wrap">
            <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <Link href={`/shop/${catSlug}`} className="hover:text-amber-300 transition-colors">{currentCat.name}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-neutral-200 font-medium">{sub.name}</span>
          </nav>

          <Link href={`/shop/${catSlug}`} className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300 transition-colors">
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
              {sub.name}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {allProducts.length < 9 && (
              <p className="text-xs text-neutral-500 text-center italic">
                More {sub.name} allocations arriving soon — every bottle shown is genuinely in vault stock today.
              </p>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <Link
                  href={`/shop/${catSlug}/collection/${subSlug}?page=${Math.max(1, safePage - 1)}`}
                  aria-disabled={safePage === 1}
                  className={`p-2.5 rounded-xl border text-sm flex items-center gap-1 ${safePage === 1 ? 'pointer-events-none opacity-40 border-neutral-800 text-neutral-600' : 'border-neutral-800 hover:border-amber-600/50 text-neutral-300 hover:text-amber-400'}`}
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </Link>
                <span className="text-xs text-neutral-400 px-3">
                  Page {safePage} of {totalPages}
                </span>
                <Link
                  href={`/shop/${catSlug}/collection/${subSlug}?page=${Math.min(totalPages, safePage + 1)}`}
                  aria-disabled={safePage === totalPages}
                  className={`p-2.5 rounded-xl border text-sm flex items-center gap-1 ${safePage === totalPages ? 'pointer-events-none opacity-40 border-neutral-800 text-neutral-600' : 'border-neutral-800 hover:border-amber-600/50 text-neutral-300 hover:text-amber-400'}`}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </>
        )}

        {/* Subcategory FAQ */}
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
                  <ChevronRight className="w-4 h-4 shrink-0 text-neutral-500 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
