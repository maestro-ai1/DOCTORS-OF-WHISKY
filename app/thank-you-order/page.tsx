'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CONTACT } from '@/lib/config';
import { CheckCircle, ShieldCheck, Phone, ArrowRight, Mail } from 'lucide-react';

interface StoredOrder {
  orderRef: string;
  customerEmail?: string;
  confirmationEmail?: 'sent' | 'failed';
  whatsappUrl?: string;
  order?: {
    lines: { slug: string; name: string; size: string; quantity: number; lineTotal: number }[];
    totals: { subtotal: number; cryptoDiscount: number; shipping: number; total: number };
    paymentMethodName: string;
  };
}

const aud = (n: number) => `$${n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} AUD`;

function ThankYouOrderContent() {
  const searchParams = useSearchParams();
  const refParam = (searchParams.get('ref') || '').toUpperCase();

  // Only trust the stored summary if it belongs to this order reference
  const [stored] = useState<StoredOrder | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = sessionStorage.getItem('dow_last_order');
      const parsed = saved ? (JSON.parse(saved) as StoredOrder) : null;
      return parsed && parsed.orderRef === refParam ? parsed : null;
    } catch {
      return null;
    }
  });

  const orderRef = refParam || 'your order';
  const whatsappUrl =
    stored?.whatsappUrl ||
    `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(`Hi Doctors of Whisky, I have placed order ${orderRef}. Please confirm payment details and the dispatch window.`)}`;

  return (
    <div className="min-h-screen bg-neutral-950 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-neutral-900/60 border border-amber-800/60 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />

        <div className="w-20 h-20 rounded-full bg-emerald-950/80 border border-emerald-600/60 mx-auto flex items-center justify-center text-emerald-400">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-bold">Order received</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-100">Thank You for Your Order</h1>
          {stored?.confirmationEmail === 'sent' ? (
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light flex items-center justify-center gap-1.5">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>A confirmation with payment details has been emailed to {stored.customerEmail || 'you'}.</span>
            </p>
          ) : stored ? (
            <p className="text-xs sm:text-sm text-amber-300 leading-relaxed">
              We have your order, but the confirmation email could not be sent. Please keep this reference and message us on WhatsApp below and we will send your payment details straight away.
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">Your order has been received. Please keep your order reference for any questions.</p>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Order Reference</span>
          <span className="font-mono text-xl font-bold text-amber-400 tracking-wider">{orderRef}</span>
        </div>

        {stored?.order && (
          <div className="text-left p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/90 text-xs text-neutral-300 space-y-2">
            <h4 className="font-bold text-neutral-200 text-sm">Your order</h4>
            <ul className="divide-y divide-neutral-800">
              {stored.order.lines.map((l) => (
                <li key={l.slug} className="py-1.5 flex justify-between gap-3">
                  <span>{l.quantity} × {l.name}</span>
                  <span className="font-mono shrink-0">{aud(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold text-neutral-100 pt-1 border-t border-neutral-800">
              <span>Total due ({stored.order.paymentMethodName})</span>
              <span className="font-mono text-amber-400">{aud(stored.order.totals.total)}</span>
            </div>
          </div>
        )}

        <div className="text-left p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/90 text-xs text-neutral-300 space-y-2.5">
          <h4 className="font-bold text-neutral-200 text-sm flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Next steps:</span>
          </h4>
          <p className="text-neutral-400">1. Pay using your chosen method and include {orderRef} as the payment description.</p>
          <p className="text-neutral-400">2. We confirm your payment and prepare your bottles for insured courier dispatch.</p>
          <p className="text-neutral-400">3. You will receive tracking details by email. A signature and photo ID (18+) are required on delivery.</p>
        </div>

        <div className="space-y-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Confirm on WhatsApp ({CONTACT.phone})</span>
          </a>
          <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-amber-300 transition-colors">
            <span>Continue Browsing the Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 p-12 text-center text-neutral-400">Loading confirmation...</div>}>
      <ThankYouOrderContent />
    </Suspense>
  );
}
