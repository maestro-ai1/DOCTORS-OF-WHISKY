'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CONTACT } from '@/lib/config';
import { CheckCircle, ShieldCheck, Phone, ArrowRight } from 'lucide-react';

function ThankYouOrderContent() {
  const searchParams = useSearchParams();
  const orderRef = searchParams.get('ref') || 'DOW-CONFIRMED';
  
  const [orderDetails] = useState<any>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = sessionStorage.getItem('dow_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  return (
    <div className="min-h-screen bg-neutral-950 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-neutral-900/60 border border-amber-800/60 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />

        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-950/80 border border-emerald-600/60 mx-auto flex items-center justify-center text-emerald-400 shadow-xl">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-bold">
            Allocation Reserved
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-100">
            Thank You for Your Order
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            Your rare spirit allocation is being held in our Sydney climate vault. An email confirmation has been sent to your registered address.
          </p>
        </div>

        {/* Reference Pill */}
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
            Order Reference
          </span>
          <span className="font-mono text-xl font-bold text-amber-400 tracking-wider">
            {orderRef}
          </span>
        </div>

        {/* Next Steps Guide */}
        <div className="text-left p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/90 text-xs text-neutral-300 space-y-2.5">
          <h4 className="font-bold text-neutral-200 text-sm flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Next Steps for Dispatch:</span>
          </h4>
          <p className="text-neutral-400">
            1. Complete your settlement via your chosen method (PayID, Bank Transfer, or Crypto).
          </p>
          <p className="text-neutral-400">
            2. Our cellar team will inspect the hologram seal and prepare specialized shock-absorbing courier packaging.
          </p>
          <p className="text-neutral-400">
            3. You will receive an SMS and email containing real-time Australia Post / StarTrack Express courier GPS tracking.
          </p>
        </div>

        {/* Direct WhatsApp Concierge Link */}
        <div className="space-y-3 pt-2">
          <a
            href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
              `Hi Doctors of Whisky, I have placed order ${orderRef}. Please confirm payment received and courier dispatch window.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Notify Concierge on WhatsApp (+61420128746)</span>
          </a>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-amber-300 transition-colors"
          >
            <span>Continue Browsing Vault Catalog</span>
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
