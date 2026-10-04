import React from 'react';
import Link from '@/components/PlainLink';
import { Product } from '@/lib/types';
import { ProductCardServer } from '@/components/ProductCardServer';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export function FeaturedProducts({ products: featuredProducts }: { products: Product[] }) {
  return (
    <section className="py-16 sm:py-20 bg-neutral-950 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-900">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-amber-500 font-bold">
                Sydney Vault Allocations
              </span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
              Rare Whisky to Buy Online: Curated Vault Releases
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Six of Australia&apos;s most coveted collector bottlings. Fully authenticated with unbroken distillery seals, temperature-controlled vault provenance, and instant 12% Crypto discount eligibility.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-wider transition-all self-start md:self-auto shrink-0 shadow-sm"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Uniform 6-Product Responsive Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCardServer product={product} />
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-amber-950/30 border border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-neutral-200">
                Looking for a specific vintage or rare allocation?
              </h3>
              <p className="text-xs text-neutral-400">
                Our private concierge can source allocations directly from international auctions and private cellars.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-xs whitespace-nowrap transition-colors"
          >
            Inquire With Concierge
          </Link>
        </div>
      </div>

    </section>
  );
}
