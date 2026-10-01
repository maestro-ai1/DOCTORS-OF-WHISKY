import React from 'react';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbLd, webPageLd } from '@/lib/seo';

const TITLE = 'Refund & Returns Policy | Doctors of Whisky';
const DESC =
  'Returns, refunds and exchanges for whisky and spirits bought from Doctors of Whisky, including transit damage cover, the 7-day inspection window and Australian Consumer Law guarantees.';

export const metadata = buildMetadata({ title: TITLE, description: DESC, path: '/refund-policy/' });

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[webPageLd({ name: TITLE, description: DESC, path: '/refund-policy/' }), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Refund policy', path: '/refund-policy/' }])]} />
      {children}
    </>
  );
}
