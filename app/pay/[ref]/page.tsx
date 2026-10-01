import React from 'react';
import type { Metadata } from 'next';
import { CONTACT } from '@/lib/config';
import { BEFORE_SHIPPING_TERMS, PAYMENT_STEPS, aud, paymentWhatsappText, whatsappLink } from '@/lib/mail/templates';
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
  <main className="min-h-screen bg-neutral-950 text-neutral-200 px-4 py-8">
    <div className="max-w-md mx-auto space-y-4">{children}</div>
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
  const hasDetails = Boolean(order.paymentDetails);

  return (
    <Shell>
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-widest text-amber-500 font-bold">Doctors of Whisky</p>
        <h1 className="font-serif font-bold text-3xl text-neutral-100">{paid ? 'Payment received' : 'Confirm Your Payment'}</h1>
      </header>

      <section className="rounded-2xl bg-neutral-900 border border-amber-800/50 p-5 space-y-3" aria-label="Amount and reference">
        <div>
          <p className="text-xs text-neutral-400">Amount to pay</p>
          <p className="font-serif font-bold text-3xl text-amber-400">{aud(order.totals.total)}</p>
        </div>
        <p className="text-sm text-neutral-300">
          Reference: <span className="font-mono font-bold text-amber-300 text-base">{order.ref}</span>
        </p>
      </section>

      {paid ? (
        <section className="rounded-2xl border border-emerald-800 bg-emerald-950/50 p-5 space-y-2 text-sm text-emerald-100">
          <p className="font-bold">Thank you. Your payment has been received and your order is confirmed.</p>
          {order.status === 'dispatched' && order.trackingNumber ? (
            <p>Tracking number: <span className="font-mono font-bold">{order.trackingNumber}</span></p>
          ) : (
            <p>A tracking number will be provided.</p>
          )}
        </section>
      ) : (
        <>
          <section className="rounded-2xl bg-amber-50 text-neutral-900 border border-amber-200 p-4 text-sm space-y-1" aria-label="Payment details">
            <p className="font-bold">{order.paymentMethodName}</p>
            {hasDetails ? (
              <p className="font-mono whitespace-pre-wrap break-words">{order.paymentDetails}</p>
            ) : (
              <p>Your payment details are on their way by email. If you have not received them, message us on WhatsApp.</p>
            )}
          </section>

          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-neutral-300">
            {PAYMENT_STEPS.map((s) => <li key={s}>{s}</li>)}
          </ol>

          <PayClient refCode={order.ref} token={t || ''} whatsappUrl={wa} />
        </>
      )}

      <section className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-4 text-xs text-neutral-300 space-y-1.5">
        <p className="font-bold text-neutral-200 text-sm">Before your order ships</p>
        <ul className="list-disc pl-4 space-y-1">{BEFORE_SHIPPING_TERMS.map((s) => <li key={s}>{s}</li>)}</ul>
      </section>

      <section className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-4 text-xs text-neutral-400 space-y-1">
        <p className="font-bold text-neutral-300 text-sm">Your order</p>
        {order.lines.map((l) => <p key={l.slug}>{l.quantity} × {l.name}</p>)}
      </section>

      <p className="text-center text-xs text-neutral-500">
        Having trouble? Email <a className="text-amber-400 underline" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Payment for ${order.ref}`)}`}>{CONTACT.email}</a> or WhatsApp <a className="text-amber-400 underline" href={wa}>{CONTACT.phone}</a>
      </p>
    </Shell>
  );
}
