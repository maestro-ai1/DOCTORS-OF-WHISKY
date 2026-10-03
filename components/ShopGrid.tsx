import React from 'react';
import Link from '@/components/AppLink';
import { ProductCardServer } from '@/components/ProductCardServer';
import { SHOP_PAGE_COUNT, shopPageProducts, shopPagePath } from '@/lib/shop-pages';

/** One server-rendered page of the shop catalogue with numbered, crawlable pagination. */
export function ShopGrid({ page }: { page: number }) {
  const products = shopPageProducts(page);
  const pages = Array.from({ length: SHOP_PAGE_COUNT }, (_, i) => i + 1);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <div key={product.id} className="h-full cv-card">
            <ProductCardServer product={product} priority={i < 2} />
          </div>
        ))}
      </div>
      <nav aria-label="Shop pages" className="pt-10 flex flex-wrap items-center justify-center gap-2 text-sm">
        {page > 1 && (
          <Link href={shopPagePath(page - 1)} rel="prev" className="px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-amber-600 hover:text-amber-300">
            ← Previous
          </Link>
        )}
        {pages.map((n) => (
          <Link
            key={n}
            href={shopPagePath(n)}
            aria-label={`Shop page ${n}`}
            aria-current={n === page ? 'page' : undefined}
            className={`min-w-[44px] text-center px-3 py-2.5 rounded-lg border ${
              n === page ? 'bg-amber-600 border-amber-500 text-neutral-950 font-bold' : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-amber-600 hover:text-amber-300'
            }`}
          >
            {n}
          </Link>
        ))}
        {page < SHOP_PAGE_COUNT && (
          <Link href={shopPagePath(page + 1)} rel="next" className="px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-amber-600 hover:text-amber-300">
            Next →
          </Link>
        )}
      </nav>
    </>
  );
}
