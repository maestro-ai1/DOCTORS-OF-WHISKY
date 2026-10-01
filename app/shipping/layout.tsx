import React from 'react';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbLd, webPageLd } from '@/lib/seo';

const TITLE = 'Whisky Delivery Australia | Shipping & Insurance';
const DESC =
  'Insured whisky and spirits delivery across Australia: $300 minimum order, free express courier over $1,500, flat $75 shipping below that, signature on delivery for 18+.';

export const metadata = buildMetadata({
  title: TITLE,
  description: DESC,
  path: '/shipping/',
  keywords: ['whisky delivery australia', 'alcohol delivery sydney', 'liquor delivery australia', 'free shipping whisky', 'express spirits delivery'],
});

export default function ShippingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[webPageLd({ name: TITLE, description: DESC, path: '/shipping/' }), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Shipping', path: '/shipping/' }])]} />
      {children}
    </>
  );
}
