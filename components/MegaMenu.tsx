'use client';

import React from 'react';
import Link from 'next/link';
import { MAIN_CATEGORIES } from '@/lib/data/menu';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MegaMenuProps {
  activeCategory: string | null;
  onClose: () => void;
}

export function MegaMenu({ activeCategory, onClose }: MegaMenuProps) {
  if (!activeCategory) return null;

  const currentCat = MAIN_CATEGORIES.find((c) => c.id === activeCategory);
  if (!currentCat) return null;

  return (
    <div
      className="absolute top-full left-0 right-0 z-50 bg-neutral-950/98 border-b border-amber-900/40 shadow-2xl shadow-black/90 backdrop-blur-xl transition-all duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header summary of the category */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-semibold">
                Curated Collection
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <h3 className="text-xl font-serif font-bold text-neutral-100 tracking-tight">
              {currentCat.name}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5 max-w-xl">
              {currentCat.description}
            </p>
          </div>

          <Link
            href={`/shop?category=${currentCat.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 border border-amber-800/60 text-amber-300 text-xs font-semibold transition-colors"
          >
            <span>View All {currentCat.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Subgroups Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {currentCat.subGroups.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400/90 pb-1.5 border-b border-neutral-800/70">
                {group.title}
              </h4>
              <ul className="space-y-1.5">
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between text-xs text-neutral-400 hover:text-amber-200 py-0.5 transition-colors"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Quick Perks */}
        <div className="mt-8 pt-4 border-t border-neutral-900/80 flex flex-wrap items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div className="flex items-center gap-6">
            <span>• Min Order: $300 AUD</span>
            <span>• Free Insured Courier &gt; $1,500 AUD</span>
            <span>• 12% Crypto Discount</span>
            <span>• Sydney Vault Provenance</span>
          </div>
          <span className="text-amber-500/80 font-mono">
            Licence: LIQP770017482
          </span>
        </div>
      </div>
    </div>
  );
}
