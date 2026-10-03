import React from 'react';
import Link from '@/components/AppLink';
import { SHOP_RULES, CONTACT } from '@/lib/config';
import { Truck, ShieldCheck, Clock, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2 pb-6 border-b border-neutral-900">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100">
            Shipping &amp; Transit Insurance Policies
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Discreet, shock-proof, and fully insured courier delivery across all Australian states and territories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center space-y-2">
            <span className="text-amber-400 font-serif font-bold text-2xl">${SHOP_RULES.minOrder} AUD</span>
            <span className="text-xs text-neutral-400 block">Minimum Order Value</span>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-2">
            <span className="text-emerald-400 font-serif font-bold text-2xl">FREE</span>
            <span className="text-xs text-neutral-300 block">On orders over ${SHOP_RULES.freeShippingThreshold} AUD</span>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center space-y-2">
            <span className="text-amber-400 font-serif font-bold text-2xl">${SHOP_RULES.shippingFee} AUD</span>
            <span className="text-xs text-neutral-400 block">Flat Courier for orders &lt; $1,500</span>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-neutral-100">1. Delivery Timelines by Region</h2>
            <p>All parcels are dispatched from our Sydney climate-regulated facility (Level 14, 1 Bligh Street, Sydney NSW 2000):</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-400 pl-2">
              <li><strong>Sydney Metro:</strong> 24 hours (Same-day VIP courier available on request).</li>
              <li><strong>Melbourne, Brisbane, Canberra:</strong> 1–2 business days via Express Courier.</li>
              <li><strong>Adelaide, Perth, Hobart:</strong> 2–3 business days.</li>
              <li><strong>Regional Australia &amp; NT:</strong> 3–5 business days.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-neutral-100">2. 100% Comprehensive Transit Insurance</h2>
            <p>Every single bottle is automatically covered under our comprehensive commercial transit insurance policy from the instant it leaves our vault until physical handover at your address. In the event of loss or damage, immediate replacement or full refund is guaranteed.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-neutral-100">3. Mandatory 18+ Age &amp; Photo ID Verification</h2>
            <p>Under the NSW Liquor Act 2007 and Victorian Liquor Control Reform Act 1998, couriers cannot leave packages unattended. A recipient aged 18 years or older must present valid government photo identification (Driver Licence, Proof of Age card, or Passport) upon delivery.</p>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-900 flex justify-between items-center text-xs">
          <Link href="/shop" className="text-amber-400 hover:text-amber-300 font-bold">
            ← Return to Vault Shop
          </Link>
          <Link href="/contact" className="text-neutral-400 hover:text-neutral-200">
            Have questions? Contact Concierge
          </Link>
        </div>
      </div>
    </div>
  );
}
