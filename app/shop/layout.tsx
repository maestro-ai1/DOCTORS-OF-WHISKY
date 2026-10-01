import React from 'react';
import { buildMetadata } from '@/lib/seo';
import { PRODUCTS } from '@/lib/data/products';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd, webPageLd } from '@/lib/seo';

// Metadata for /shop/ itself; category, collection and product pages set their own.
export const metadata = buildMetadata({
  title: 'Shop Whisky, Spirits, Wine & Beer Online Australia',
  description: `Shop ${PRODUCTS.length}+ bottles online: single malt Scotch, Japanese whisky, bourbon, tequila, vodka, gin, cognac, wine and beer, with insured delivery across Australia.`,
  path: '/shop/',
  keywords: ['buy whisky online australia', 'buy spirits online australia', 'online bottle shop australia', 'buy scotch online', 'buy tequila online', 'buy vodka online', 'buy gin online'],
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
    </>
  );
}
