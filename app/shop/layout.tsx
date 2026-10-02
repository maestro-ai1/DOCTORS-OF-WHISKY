import React from 'react';
import { buildMetadata } from '@/lib/seo';
import { PageSearches } from '@/components/PageSearches';
import { PAGE_SEO } from '@/lib/data/page-seo';

import { PRODUCTS } from '@/lib/data/products';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd, webPageLd } from '@/lib/seo';

// Metadata for /shop/ itself; category, collection and product pages set their own.
export const metadata = buildMetadata({
  title: 'Buy Whiskey Online Australia | Whisky, Spirits & Wine',
  description: `Buy whiskey online and shop ${PRODUCTS.length}+ bottles: single malt Scotch, Japanese whisky, bourbon, tequila, vodka, gin, cognac, wine and beer, with insured delivery across Australia.`,
  path: '/shop/',
  keywords: [PAGE_SEO['/shop/'].primary, ...PAGE_SEO['/shop/'].secondary, ...PAGE_SEO['/shop/'].tags],
});

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ type: 'CollectionPage', name: 'Shop whisky, spirits, wine and beer', description: 'All categories at Doctors of Whisky.', path: '/shop/' }),
          breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Shop', path: '/shop/' }]),
        ]}
      />
      {children}
      <PageSearches path="/shop/" />
    </>
  );
}
