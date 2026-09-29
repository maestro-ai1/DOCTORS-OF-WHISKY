'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Award,
  Flame,
  Globe2,
} from 'lucide-react';

interface BrandItem {
  name: string;
  shortName: string;
  region: string;
  country: string;
  specialty: string;
  accent: string;
  href: string;
  badge: string;
  established: string;
  initials: string;
}

const BRANDS_LIST: BrandItem[] = [
  {
    name: 'The Macallan',
    shortName: 'Macallan',
    region: 'Speyside',
    country: 'Scotland',
    specialty: 'Sherry Oak & Rare Cask Single Malts',
    accent: '#D4AF37',
    href: '/shop?brand=The Macallan',
    badge: 'Iconic Speyside',
    established: 'Est. 1824',
    initials: 'MC',
  },
  {
    name: 'Nikka Whisky',
    shortName: 'Nikka',
    region: 'Yoichi & Miyagikyo',
    country: 'Japan',
    specialty: 'Pure Malt & Rare Mizunara Casks',
    accent: '#E5A93C',
    href: '/shop?country=Japan',
    badge: 'Japanese Rarity',
    established: 'Est. 1934',
    initials: 'NK',
  },
  {
    name: 'The GlenDronach',
    shortName: 'GlenDronach',
    region: 'Highland',
    country: 'Scotland',
    specialty: 'Vintage Single Casks & Pedro Ximénez',
    accent: '#C5832B',
    href: '/shop?brand=GlenDronach',
    badge: 'Sherry Masterwork',
    established: 'Est. 1826',
    initials: 'GD',
  },
  {
    name: 'Glenfiddich',
    shortName: 'Glenfiddich',
    region: 'Dufftown',
    country: 'Scotland',
    specialty: 'Grand Series & 30-Year Single Malts',
    accent: '#E6B800',
    href: '/shop?brand=Glenfiddich',
    badge: 'Speyside Pioneer',
    established: 'Est. 1887',
    initials: 'GF',
  },
  {
    name: 'Lark Distillery',
    shortName: 'Lark',
    region: 'Hobart',
    country: 'Australia',
    specialty: 'Legacy Para 100 & Peated Seppeltsfield',
    accent: '#22C55E',
    href: '/shop?brand=Lark',
    badge: 'Australian Legend',
    established: 'Est. 1992',
    initials: 'LK',
  },
  {
    name: 'Laphroaig',
    shortName: 'Laphroaig',
    region: 'Islay',
    country: 'Scotland',
    specialty: '25-Year Cask Strength & Peated Reserves',
    accent: '#38BDF8',
    href: '/shop?brand=Laphroaig',
    badge: 'Peat Benchmark',
    established: 'Est. 1815',
    initials: 'LP',
  },
  {
    name: 'Royal Salute',
    shortName: 'Royal Salute',
    region: 'Speyside',
    country: 'Scotland',
    specialty: '38-Year Stone of Destiny & 21-Year Blends',
    accent: '#A855F7',
    href: '/shop?brand=Royal Salute',
    badge: 'Crown Reserve',
    established: 'Est. 1953',
    initials: 'RS',
  },
  {
    name: 'Johnnie Walker',
    shortName: 'Johnnie Walker',
    region: 'Highland / Islay',
    country: 'Scotland',
    specialty: 'King George V & Rare Blue Label',
    accent: '#EAB308',
    href: '/shop?brand=Johnnie Walker',
    badge: 'Master Blend',
    established: 'Est. 1820',
    initials: 'JW',
  },
  {
    name: 'Don Julio',
    shortName: 'Don Julio',
    region: 'Atotonilco El Alto',
    country: 'Mexico',
    specialty: '1942 Ultima Reserva & Extra Añejo',
    accent: '#F97316',
    href: '/shop?category=spirit&search=Don Julio',
    badge: 'Solera Añejo',
    established: 'Est. 1942',
    initials: 'DJ',
  },
  {
    name: 'Grey Goose',
    shortName: 'Grey Goose',
    region: 'Picardy & Cognac',
    country: 'France',
    specialty: 'Altius Glacial & VX Fine Cognac Vodka',
    accent: '#60A5FA',
    href: '/shop?category=spirit&search=Grey Goose',
    badge: 'French Luxury',
    established: 'Est. 1997',
    initials: 'GG',
  },
  {
    name: 'Penfolds',
    shortName: 'Penfolds',
    region: 'Magill Estate',
    country: 'Australia',
    specialty: 'Grange Heritage Vintage Shiraz',
    accent: '#EF4444',
    href: '/shop?category=beer-premix-wine&search=Penfolds',
    badge: 'Heritage Icon',
    established: 'Est. 1844',
    initials: 'PF',
  },
  {
    name: 'Louis XIII',
    shortName: 'Louis XIII',
    region: 'Grande Champagne',
    country: 'France',
    specialty: 'Century-Old Tierçons Cognac Decanters',
    accent: '#D4AF37',
    href: '/shop?category=spirit&search=Remy',
    badge: 'Prestige Decanter',
    established: 'Est. 1874',
    initials: 'LX',
  },
];

export function BrandSlider() {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Responsive visible cards count
  const itemsPerView = 4; // on desktop (sm:2, md:3, lg:4)
  const maxIndex = Math.max(0, BRANDS_LIST.length - itemsPerView);

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-scroll slideshow every 4.5s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  return (
    <section
      className="py-12 sm:py-16 bg-neutral-950 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Compact Header with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-900 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-[11px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Distillery &amp; House Spotlight</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-100 tracking-tight flex items-center gap-2">
              <span>Curated Distilleries &amp; Master Houses</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Direct allocations from iconic Scottish Highlands, Japanese reserves, Tasmania, Cognac &amp; Jalisco.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-600/50 text-neutral-300 hover:text-amber-400 transition-colors"
              aria-label="Previous Brand"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-600/50 text-neutral-300 hover:text-amber-400 transition-colors"
              aria-label="Next Brand"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 ml-2 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/40 transition-colors"
            >
              <span>View All Brands</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div
          className="relative overflow-hidden"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (diff > 40) nextSlide();
            else if (diff < -40) prevSlide();
            touchStartX.current = null;
          }}
        >
          <div
            className="flex transition-transform duration-500 ease-out gap-4"
            style={{
              transform: `translateX(-${startIndex * 280}px)`,
            }}
          >
            {BRANDS_LIST.map((brand, idx) => (
              <Link
                key={idx}
                href={brand.href}
                className="group shrink-0 w-[265px] sm:w-[280px] p-4 sm:p-5 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-amber-600/60 transition-all duration-300 flex flex-col justify-between space-y-3 hover:shadow-xl hover:shadow-black/60 relative overflow-hidden"
              >
                {/* Top: Logo Emblem & Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {/* Stylized Brand Monogram Emblem */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-amber-950 border border-amber-600/40 flex items-center justify-center font-serif text-xs font-bold text-amber-300 group-hover:scale-105 group-hover:border-amber-400 transition-all shadow-inner">
                      {brand.initials}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-amber-500/90 font-bold block">
                        {brand.established}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-medium flex items-center gap-1">
                        <Globe2 className="w-3 h-3 text-neutral-500" />
                        {brand.country}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-700/50 text-amber-300 shrink-0">
                    {brand.badge}
                  </span>
                </div>

                {/* Middle: Brand Name & Compact Spec */}
                <div className="space-y-1">
                  <h3 className="text-base font-serif font-bold text-neutral-100 group-hover:text-amber-200 transition-colors flex items-center justify-between">
                    <span>{brand.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
                  </h3>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed font-light">
                    {brand.specialty}
                  </p>
                </div>

                {/* Bottom: Region & Allocations link */}
                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500 font-medium">{brand.region}</span>
                  <span className="text-amber-400 font-semibold group-hover:underline">
                    View Bottles →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Slide Dots Progress */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setStartIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                startIndex === idx
                  ? 'w-6 bg-amber-500'
                  : 'w-1.5 bg-neutral-800 hover:bg-neutral-700'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
