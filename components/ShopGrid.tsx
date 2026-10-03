import React from 'react';
import { ProductCardServer } from '@/components/ProductCardServer';
import { Pager } from '@/components/Pager';
import { SHOP_PAGE_COUNT, shopPageProducts } from '@/lib/shop-pages';

/** One server-rendered page of the shop catalogue with numbered, crawlable pagination. */
export function ShopGrid({ page }: { page: number }) {
  const products = shopPageProducts(page);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <div key={product.id} className="h-full cv-card">
            <ProductCardServer product={product} priority={i < 2} />
          </div>
        ))}
      </div>
      <Pager page={page} count={SHOP_PAGE_COUNT} basePath="/shop/" label="Shop pages" />
    </>
  );
}
