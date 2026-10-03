import React from 'react';
import Link from '@/components/AppLink';
import { CONTACT } from '@/lib/config';
import type { Metadata } from 'next';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2 pb-6 border-b border-neutral-900">
          <h1 className="text-3xl font-serif font-bold text-neutral-100">
            Terms of Service &amp; Legal Notices
          </h1>
          <p className="text-xs text-neutral-400">
            Updated: September 2026 · Doctors of Whisky Pty Ltd (ABN: {CONTACT.abn})
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-200 text-xs">
            <strong className="block text-amber-300 mb-1">AUSTRALIAN STATUTORY LIQUOR NOTICE:</strong>
            Under the NSW Liquor Act 2007 / Victorian Liquor Control Reform Act 1998, it is an offence to sell or supply alcohol to, or to obtain alcohol on behalf of, a person under the age of 18 years. Maximum penalty exceeds $19,000 AUD. NSW Liquor Licence Number: {CONTACT.liquorLicence}.
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-serif font-bold text-neutral-100">1. Eligibility &amp; Age Verification</h2>
            <p>You must be at least 18 years old to access this website, create allocations, or purchase liquor. By using this website, you warrant and represent that you are 18 years or older.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-serif font-bold text-neutral-100">2. Orders &amp; Minimum Order Threshold</h2>
            <p>To preserve specialized courier transit standards, Doctors of Whisky enforces a minimum order value of $300 AUD per transaction. Orders below this value will not be fulfilled.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-serif font-bold text-neutral-100">3. Pricing &amp; Crypto Settlement Discounts</h2>
            <p>All prices are quoted in Australian Dollars (AUD) and are inclusive of Australian Goods and Services Tax (GST) and Wine Equalisation / Spirits Excise Taxes where applicable. When paying via Bitcoin (BTC) or Tether (USDT), an instant 12% deduction is applied to the subtotal.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-serif font-bold text-neutral-100">4. Authenticity Guarantee &amp; Returns</h2>
            <p>Every bottle is inspected for capsule integrity, fill level, and holographic verification. Given the delicate vintage nature of rare spirits, returns for change of mind are strictly prohibited once tamper-evident seals are broken.</p>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-900">
          <Link href="/shop" className="text-xs text-amber-400 hover:text-amber-300 font-bold">
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
