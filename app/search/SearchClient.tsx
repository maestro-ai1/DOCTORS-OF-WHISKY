'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { searchProducts } from '@/lib/search';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { Product } from '@/lib/types';
import { Search, X, Sparkles, Wine } from 'lucide-react';

function SearchPageContent({ products: PRODUCTS }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryParam);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(PRODUCTS, query);
  }, [query]);

  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search Bar Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Vault Search Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
            Search Rare Spirits &amp; Collectable Whiskies
          </h1>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by brand (Macallan, Nikka, Lark), style, region, or tasting note..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-neutral-900 border border-neutral-700 text-neutral-100 text-sm focus:outline-none focus:border-amber-500 shadow-xl"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Tag Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-neutral-400">
            <span className="text-neutral-400">Popular:</span>
            {['Macallan', 'Nikka 21', 'Sherry Cask', 'Lark Tasmania', 'Tequila', 'Don Julio', 'Louis XIII', 'Grange'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-300 text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Grid */}
        <div className="pt-4 border-t border-neutral-900">
          <div className="flex items-center justify-between pb-6 text-xs text-neutral-400">
            <span>
              {query.trim()
                ? `Found ${searchResults.length} matching bottles for "${query}"`
                : `Showing all ${PRODUCTS.length} curated vault bottles`}
            </span>
          </div>

          {(query.trim() ? searchResults : PRODUCTS).length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 mx-auto flex items-center justify-center text-neutral-400">
                <Wine className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-neutral-200">
                No matching bottles found
              </h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Try searching for a different distillery, grape variety, vintage year, or spirit category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(query.trim() ? searchResults : PRODUCTS).map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard
                    product={product}
                    onQuickView={(p) => setSelectedProduct(p)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductQuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default function SearchClient({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 p-12 text-center text-neutral-400">Loading search...</div>}>
      <SearchPageContent products={products} />
    </Suspense>
  );
}
