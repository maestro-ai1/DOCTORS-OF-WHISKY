import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const BRANDS = [
  {
    name: 'The Macallan',
    region: 'Speyside, Scotland',
    specialty: 'Sherry Oak & Rare Cask Single Malts',
    href: '/shop?brand=The Macallan',
    badge: 'Iconic Speyside',
  },
  {
    name: 'Nikka & Yamazaki',
    region: 'Japan (Hokkaido & Osaka)',
    specialty: 'Aged Pure Malts & Mizunara Oak Casks',
    href: '/shop?country=Japan',
    badge: 'Japanese Rarity',
  },
  {
    name: 'Lark Distillery',
    region: 'Tasmania, Australia',
    specialty: 'Legacy Para 100 & Peated Cask Single Malts',
    href: '/shop?brand=Lark',
    badge: 'Australian Icon',
  },
  {
    name: 'The GlenDronach',
    region: 'Highland, Scotland',
    specialty: 'Master Sherry Puncheons & Vintage Single Casks',
    href: '/shop?brand=GlenDronach',
    badge: 'Sherry Masterwork',
  },
  {
    name: 'Don Julio & Tequila',
    region: 'Jalisco, Mexico',
    specialty: 'Ultima Reserva & Gran Patrón Extra Añejo',
    href: '/shop?category=spirit&search=Tequila',
    badge: 'Ultra-Premium Solera',
  },
  {
    name: 'Penfolds & Fine Wine',
    region: 'South Australia',
    specialty: 'Grange Vintage Shiraz & Dom Pérignon Champagne',
    href: '/shop?category=beer-premix-wine',
    badge: 'Cellar Benchmark',
  },
];

export function BrandGrid() {
  return (
    <section className="py-16 sm:py-20 bg-neutral-950 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Master Distilleries</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
            Curated World-Class Houses
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            From centuries-old Scottish Highlands and Japanese private reserves to Tasmania’s finest single-cask creations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDS.map((brand, idx) => (
            <Link
              key={idx}
              href={brand.href}
              className="group relative p-6 rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/90 border border-neutral-800/80 hover:border-amber-600/60 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-black/60"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40 text-amber-400">
                  {brand.badge}
                </span>
                <div className="w-8 h-8 rounded-full bg-neutral-950 border border-neutral-800 group-hover:border-amber-500 flex items-center justify-center text-neutral-400 group-hover:text-amber-400 transition-colors">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-xs text-amber-500/90 font-medium mt-0.5">
                  {brand.region}
                </p>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
                  {brand.specialty}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-500 group-hover:text-amber-400 font-medium">
                <span>Explore Allocations</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
