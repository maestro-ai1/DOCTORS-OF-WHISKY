import React from 'react';
import Link from '@/components/PlainLink';
import Image from 'next/image';
import {
  Sparkles,
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
  image?: string;
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
    image: '/images/brands/macallan.jpg',
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
    image: '/images/brands/nikka.jpg',
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
    image: '/images/brands/glendronach.jpg',
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
    image: '/images/brands/glenfiddich.jpg',
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
    image: '/images/brands/lark.jpg',
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
    image: '/images/brands/laphroaig.jpg',
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
    image: '/images/brands/royal-salute.jpg',
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
    image: '/images/brands/johnnie-walker.jpg',
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
    image: '/images/brands/don-julio.jpg',
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
    image: '/images/brands/grey-goose.jpg',
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

/** Server-rendered, swipeable (scroll-snap) brand row: no JavaScript, every brand link stays in the HTML. */
export function BrandSlider() {
  return (
    <section className="py-12 sm:py-16 bg-neutral-950 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Compact Header with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-900 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-[11px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Distillery &amp; House Spotlight</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-100 tracking-tight flex items-center gap-2">
              <span>Whisky Brands in Australia: Distilleries &amp; Master Houses</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Direct allocations from iconic Scottish Highlands, Japanese reserves, Tasmania, Cognac &amp; Jalisco.
            </p>
          </div>

          {/* Link to all brands */}
          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 ml-2 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/40 transition-colors"
            >
              <span>View All Brands</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Swipeable row */}
        <div className="relative">
          <div role="region" aria-label="Whisky brands" className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:thin] [scrollbar-color:#404040_transparent]">
            {BRANDS_LIST.map((brand, idx) => (
              <Link
                key={idx}
                href={brand.href}
                className="group snap-start shrink-0 w-[265px] sm:w-[280px] p-4 sm:p-5 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-amber-600/60 transition-all duration-300 flex flex-col justify-between space-y-3 hover:shadow-xl hover:shadow-black/60 relative overflow-hidden"
              >
                {/* Top: Logo Emblem & Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {/* Brand Bottle Thumbnail or Monogram Emblem */}
                    {brand.image ? (
                      <div className="w-10 h-10 rounded-xl bg-white border border-amber-600/40 overflow-hidden relative shrink-0 group-hover:scale-105 group-hover:border-amber-400 transition-all shadow-inner">
                        <Image src={brand.image} alt={`${brand.name} bottle`} fill className="object-contain p-0.5" sizes="40px" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-amber-950 border border-amber-600/40 flex items-center justify-center font-serif text-xs font-bold text-amber-300 group-hover:scale-105 group-hover:border-amber-400 transition-all shadow-inner">
                        {brand.initials}
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-amber-500/90 font-bold block">
                        {brand.established}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-medium flex items-center gap-1">
                        <Globe2 className="w-3 h-3 text-neutral-400" />
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
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 transition-colors" />
                  </h3>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed font-light">
                    {brand.specialty}
                  </p>
                </div>

                {/* Bottom: Region & Allocations link */}
                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400 font-medium">{brand.region}</span>
                  <span className="text-amber-400 font-semibold group-hover:underline">
                    View Bottles →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
