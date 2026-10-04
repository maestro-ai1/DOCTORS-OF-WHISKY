import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import React from 'react';
import Link from '@/components/PlainLink';
import { CONTACT } from '@/lib/config';
import type { Metadata } from 'next';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-950 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2 pb-6 border-b border-neutral-900">
          <h1 className="text-3xl font-serif font-bold text-neutral-100">
            Privacy &amp; Collector Data Policy
          </h1>
          <p className="text-xs text-neutral-400">
            Compliant with the Australian Privacy Principles (Privacy Act 1988)
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
          <div className="space-y-2">
            <h2 className="text-base font-serif font-bold text-neutral-100">1. Information Collected</h2>
            <p>We collect essential information required to fulfill orders, verify legal 18+ drinking age, process transactions, and coordinate insured courier deliveries across Australia. We do not sell, rent, or trade customer contact details to third parties.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-serif font-bold text-neutral-100">2. Transaction Security &amp; Encryption</h2>
            <p>All online communications and order entries are encrypted using industry-standard 256-bit SSL protocols. We do not store raw credit card numbers on our servers.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-serif font-bold text-neutral-100">3. Contacting the Privacy Officer</h2>
            <p>For inquiries regarding personal data deletion or privacy inquiries, contact our Sydney office at <ObfuscatedEmail email={CONTACT.email} />.</p>
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
