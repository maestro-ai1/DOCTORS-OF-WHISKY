import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/config';
import { Sparkles, ArrowRight, BookOpen, Clock, Calendar, Wine } from 'lucide-react';

export const metadata: Metadata = {
  title: `Collector Journal & Whisky Guides | ${SITE.name}`,
  description: `Expert articles on rare single malt investment, Japanese whisky valuation, Australian craft distilleries, and proper cellar management.`,
};

const ARTICLES = [
  {
    slug: 'macallan-sherry-cask-provenance-guide',
    title: 'The Macallan 25 & The Chemistry of First-Fill Jerez Sherry Oak',
    excerpt: 'An in-depth analysis of why Spanish oak seasoned with Oloroso sherry commands record-setting auction premiums in the Australian collector market.',
    category: 'Distillery Profile',
    date: 'August 28, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'japanese-whisky-vintage-scarcity-report',
    title: 'Japanese Whisky Allocations: Why 21+ Year Old Age Statements are Vanishing',
    excerpt: 'Examining the 1990s distillation drought in Hokkaido and how limited Mizunara oak inventory is driving Nikka Taketsuru and Hibiki 21 valuation in Sydney.',
    category: 'Market Trends',
    date: 'July 15, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'storing-rare-spirits-australian-climate',
    title: 'Cellaring Rare Spirits in Australia: Temperature, Humidity & Ullage Protection',
    excerpt: 'Essential collector protocols for maintaining 14°C and 65% RH to prevent cork rot and evaporative liquid loss during harsh Australian summers.',
    category: 'Collector Guide',
    date: 'June 04, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'rise-of-tasmanian-single-malt-investments',
    title: 'Tasmania’s Cask Mastery: How Lark and Sullivans Cove Redefined Peated Malts',
    excerpt: 'From peat harvested in Central Highlands to 100-year-old fortified Seppeltsfield casks, Australian single malts are capturing international acclaim.',
    category: 'Australian Distilling',
    date: 'May 19, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto border-b border-neutral-900 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>The Collector Journal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100">
            Insights, Provenance &amp; Cellaring Guides
          </h1>
          <p className="text-sm text-neutral-400">
            Authored by our Sydney sommeliers and spirits appraisers for the discerning Australian connoisseur.
          </p>
        </div>

        {/* Featured Article */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900/60 border border-amber-800/40 p-6 sm:p-10 flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="flex items-center gap-3 text-xs text-amber-400 font-semibold">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700/60">
                Featured Guide
              </span>
              <span className="flex items-center gap-1 text-neutral-400">
                <Clock className="w-3.5 h-3.5" />
                6 min read
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-100 leading-snug">
              The Macallan 25 &amp; The Chemistry of First-Fill Jerez Sherry Oak
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              An in-depth analysis of why Spanish oak seasoned with Oloroso sherry commands record-setting auction premiums in the Australian collector market.
            </p>
            <div className="pt-2">
              <Link
                href="/shop?brand=The Macallan"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>Browse Macallan Allocations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-neutral-800">
            <Image
              src="https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1200&q=85"
              alt="Macallan 25 Sherry Oak"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.slice(1).map((article, idx) => (
            <article
              key={idx}
              className="rounded-2xl overflow-hidden bg-neutral-900/40 border border-neutral-800/80 hover:border-amber-700/50 transition-all flex flex-col justify-between space-y-4 p-5 hover:shadow-xl hover:shadow-black/60"
            >
              <div className="space-y-4">
                <div className="relative h-48 rounded-xl overflow-hidden border border-neutral-800">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-neutral-950/80 text-[10px] font-bold text-amber-400 border border-amber-800/40">
                    {article.category}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-base font-serif font-bold text-neutral-100 hover:text-amber-300 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs font-semibold text-amber-400">
                <Link href="/shop" className="hover:underline flex items-center gap-1">
                  <span>Explore Related Bottles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
