import React from 'react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Order Received | Doctors of Whisky',
  description: 'Thank you for your order with Doctors of Whisky. Your order reference and payment instructions are below.',
  path: '/thank-you-order/',
  noindex: true,
});

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
