import React from 'react';
import { ShopView } from './ShopView';
import { PageSearches } from '@/components/PageSearches';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbLd, webPageLd } from '@/lib/seo';

export default function ShopPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ type: 'CollectionPage', name: 'Shop whisky, spirits, wine and beer', description: 'All categories at Doctors of Whisky.', path: '/shop/' }),
          breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Shop', path: '/shop/' }]),
        ]}
      />
      <ShopView page={1} />
      <PageSearches path="/shop/" />
    </>
  );
}
