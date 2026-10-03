import React from 'react';
import Link from '@/components/AppLink';
import { MAIN_CATEGORIES } from '@/lib/data/menu';
import { getSubcategoriesByCategory } from '@/lib/data/subcategories';
import { PRODUCTS } from '@/lib/data/products';
import ShopClient from './ShopClient';
import { ShopGrid } from '@/components/ShopGrid';
import { SHOP_BRANDS, SHOP_COUNTRIES } from '@/lib/shop-pages';

// Server-rendered intro, collection links and page 1 of the catalogue; filters load the full index only when used.
export function ShopView({ page = 1 }: { page?: number }) {
  return (
    <>
      <section className="bg-neutral-950 px-4 sm:px-6 lg:px-8 pt-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight">
              Buy Whisky, Spirits, Wine &amp; Beer Online in Australia
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 max-w-3xl font-light leading-relaxed">
              Shop {PRODUCTS.length}+ bottles from our Sydney bottle shop: single malt Scotch whisky, Japanese whisky, bourbon and rye,
              tequila, vodka, gin, rum, cognac and liqueurs, plus wine, beer and premixes. Every order ships Australia-wide with
              insured delivery, and buyers must be 18 or over. Browse by collection below or filter the full range.
            </p>
          </div>
          <nav aria-label="Shop by collection" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-neutral-900">
            {MAIN_CATEGORIES.map((cat) => (
              <div key={cat.slug} className="space-y-2">
                <h2 className="text-sm font-serif font-bold text-amber-400 uppercase tracking-wider">
                  <Link href={`/shop/${cat.slug}/`} className="hover:text-amber-300">{cat.name}</Link>
                </h2>
                <ul className="space-y-1 text-sm">
                  {getSubcategoriesByCategory(cat.slug).map((sub) => (
                    <li key={sub.slug}>
                      <Link href={`/shop/${cat.slug}/collection/${sub.slug}/`} className="text-neutral-300 hover:text-amber-300 transition-colors">
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </section>
      <ShopClient brands={SHOP_BRANDS} countries={SHOP_COUNTRIES} total={PRODUCTS.length}>
        <ShopGrid page={page} />
      </ShopClient>
    </>
  );
}
