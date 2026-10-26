import React from 'react';
import { buildMetadata } from '@/lib/seo';
import { PAGE_SEO } from '@/lib/data/page-seo';
import { PRODUCTS } from '@/lib/data/products';

// Metadata for /shop/ itself; category, collection and product pages set their own.
// The /shop/ structured data and the keyword blocks live in app/shop/page.tsx so they are not repeated on every product page.
export const metadata = buildMetadata({
  title: 'Buy Whiskey Online Australia | Whisky, Spirits & Wine',
  description: `Buy whiskey online and shop ${PRODUCTS.length}+ bottles: single malt Scotch, Japanese whisky, bourbon, tequila, vodka, gin, cognac, wine and beer, with insured delivery across Australia.`,
  path: '/shop/',
  keywords: [PAGE_SEO['/shop/'].primary, ...PAGE_SEO['/shop/'].secondary, ...PAGE_SEO['/shop/'].tags],
});

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
