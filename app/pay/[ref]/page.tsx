import React from 'react';
import type { Metadata } from 'next';
import { CONTACT } from '@/lib/config';
import { TERMS_LINE, aud, paymentWhatsappText, whatsappLink } from '@/lib/mail/templates';
import { verifyLinkToken } from '@/lib/orders/link-token';
import { getOrder } from '@/lib/orders/store';
import { PayClient } from './PayClient';

export const dynamic = 'force-dynamic';

// Private, per-order page: never indexed, never cached.
export const metadata: Metadata = {
  title: 'Your payment | Doctors of Whisky',
  robots: { index: false, follow: false, nocache: true, noarchive: true },
};

const Shell = ({ children }: { children: React.ReactNode }) => (
  <main className="min-h-screen bg-neutral-950 text-neutral-200 px-4 py-6">
    <div className="max-w-md mx-auto space-y-3">{children}</div>
  </main>
);

export default async function PayPage({ params, searchParams }: { params: Promise<{ ref: string }>; searchParams: Promise<{ t?: string }> }) {
  const { ref: rawRef } = await params;
  const { t } = await searchParams;
  const ref = rawRef.toUpperCase();

  const valid = /^DOW-[A-Z0-9]{6}$/.test(ref) && verifyLinkToken(ref, t);
  const order = valid ? await getOrder(ref).catch(() => null) : null;

  if (!order) {
    return (
      <Shell>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 text-center space-y-3">
          <h1 className="font-serif font-bold text-xl text-neutral-100">This link is not valid</h1>
          <p className="text-sm text-neutral-400">Please use the link in your payment email, or message us on WhatsApp and we will help straight away.</p>
          <a href={`https://wa.me/${CONTACT.whatsappNumber}`} className="inline-block px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm">WhatsApp {CONTACT.phone}</a>
        </div>
      </Shell>
    );
  }

  const wa = whatsappLink(paymentWhatsappText(order));
  const paid = order.status === 'paid' || order.status === 'dispatched' || order.status === 'completed';

  return (
    <Shell>
      <section className="rounded-2xl bg-neutral-900 border border-amber-800/50 p-4 space-y-3" aria-label="Payment">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-neutral-400">{paid ? 'Paid' : 'Amount to pay'}</p>
            <p className="font-serif font-bold text-3xl text-amber-400">{aud(order.totals.total)}</p>
          </div>
          <p className="text-xs text-neutral-400 text-right">Reference<br /><span className="font-mono font-bold text-amber-300 text-base">{order.ref}</span></p>
        </div>

        {paid ? (
          <p className="text-sm text-emerald-300">
            Payment received, order confirmed.{' '}
            {order.status === 'dispatched' && order.trackingNumber ? <>Tracking: <span className="font-mono font-bold">{order.trackingNumber}</span></> : 'A tracking number will be provided.'}
          </p>
        ) : (
          <div className="rounded-xl bg-amber-50 text-neutral-900 border border-amber-200 p-3 text-sm">
            <p className="font-bold">{order.paymentMethodName}</p>
            {order.paymentDetails ? (
              <p className="font-mono whitespace-pre-wrap break-words">{order.paymentDetails}</p>
            ) : (
              <p>Your payment details are on their way by email.</p>
            )}
          </div>
        )}
      </section>

      {!paid && <PayClient refCode={order.ref} token={t || ''} whatsappUrl={wa} />}

      <p className="text-center text-xs text-neutral-500 leading-relaxed">
        {TERMS_LINE}
        <br />
        Help: <a className="text-amber-400 underline" href={wa}>WhatsApp</a> · <a className="text-amber-400 underline" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Payment for ${order.ref}`)}`}>{CONTACT.email}</a>
      </p>
    </Shell>
  );
}
