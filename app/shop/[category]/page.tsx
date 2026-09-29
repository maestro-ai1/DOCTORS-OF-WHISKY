import React from 'react';
import { notFound } from 'next/navigation';
import { MAIN_CATEGORIES } from '@/lib/data/menu';
import { getProductsByCategory } from '@/lib/data/products';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return MAIN_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: catSlug } = await params;
  const currentCat = MAIN_CATEGORIES.find((c) => c.slug === catSlug);
  if (!currentCat) return { title: 'Category Not Found | Doctors of Whisky' };

  return {
    title: `${currentCat.name} | Rare Spirits & Whiskies Australia | Doctors of Whisky`,
    description: currentCat.description,
    alternates: {
      canonical: `https://doctorsofwhisky.com.au/shop/${catSlug}/`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: catSlug } = await params;
  const currentCat = MAIN_CATEGORIES.find((c) => c.slug === catSlug);

  if (!currentCat) {
    notFound();
  }

  const products = getProductsByCategory(catSlug);

  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Back Link & Header */}
        <div className="space-y-4 pb-6 border-b border-neutral-900">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Collections</span>
          </Link>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-amber-500 font-bold">
                Sydney Vault Collection
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight">
              {currentCat.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-light leading-relaxed">
              {currentCat.description}
            </p>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-neutral-900/30 border border-neutral-800 space-y-4">
            <p className="text-sm text-neutral-400">
              New vault allocations for {currentCat.name} are currently undergoing Sommelier inspection. Please check back shortly or inquire directly.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-xs"
            >
              Inquire With Concierge
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
