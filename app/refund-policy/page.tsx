import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, CONTACT } from '@/lib/config';
import { ShieldCheck, RotateCcw, AlertTriangle, CheckCircle, Phone, Mail } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-neutral-900 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Australian Consumer Law (ACL) Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100">
            Refund &amp; Returns Policy
          </h1>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            Comprehensive guarantees for rare whisky bottles, transit insurance claims, and temperature-controlled collection protocols.
          </p>
        </div>

        {/* Core Policy Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h2 className="text-sm font-serif font-bold text-neutral-100">100% Provenance Guarantee</h2>
            <p className="text-xs text-neutral-400">
              Every bottle undergoes capsule and fill inspection. If proven non-authentic, 100% refund is guaranteed immediately.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <RotateCcw className="w-6 h-6 text-amber-400" />
            <h2 className="text-sm font-serif font-bold text-neutral-100">Transit Damage Cover</h2>
            <p className="text-xs text-neutral-400">
              All Australian couriers carry full transit insurance. Damaged or cracked bottles are replaced or fully reimbursed.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <h2 className="text-sm font-serif font-bold text-neutral-100">7-Day Inspection Window</h2>
            <p className="text-xs text-neutral-400">
              Report any shipping discrepancy or seal fault within 7 days of verified courier signature delivery.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-sm text-neutral-300 leading-relaxed font-light">
          <section className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-3">
            <h2 className="text-lg font-serif font-bold text-neutral-100">
              1. Australian Consumer Guarantees
            </h2>
            <p>
              Our goods come with guarantees that cannot be excluded under the Australian Consumer Law (ACL). You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage. You are also entitled to have the goods repaired or replaced if the goods fail to be of acceptable quality and the failure does not amount to a major failure.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-3">
            <h2 className="text-lg font-serif font-bold text-neutral-100">
              2. Transit Breakage &amp; Delivery Claims
            </h2>
            <p>
              Due to the rare and fragile nature of vintage spirits, all shipments are packed in custom high-density molded foam containers. If a package arrives visibly damaged:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-400 text-xs">
              <li>Take clear photographs of the outer carton, tracking label, and damaged bottle seals before discarding any materials.</li>
              <li>Notify our Sydney Concierge at <strong className="text-amber-400"><ObfuscatedEmail email={CONTACT.email} /></strong> or via WhatsApp within 48 hours of physical receipt.</li>
              <li>Once verified, we will arrange a replacement bottle from our private reserve or initiate an immediate full refund to your original settlement method (PayID, Bank EFT, or Crypto).</li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-3">
            <h2 className="text-lg font-serif font-bold text-neutral-100">
              3. Vintage, Cork &amp; Seal Condition Disclaimers
            </h2>
            <p>
              For antique and vintage bottles older than 20 years, fill levels (ullage) and natural cork degradation are evaluated prior to listing and clearly stated in product descriptions. As per Australian industry standards, natural cork failure or ullage consistent with vintage age is not deemed a manufacturing defect unless bottle integrity is compromised prior to dispatch.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-3">
            <h2 className="text-lg font-serif font-bold text-neutral-100">
              4. Change of Mind Policy
            </h2>
            <p>
              Under Australian liquor licensing regulations and climate-controlled storage standards, we do not accept change-of-mind returns on alcohol once the shipment has been accepted by the customer. This ensures that the provenance and storage conditions of every bottle in our catalog remain 100% untampered.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-3">
            <h2 className="text-lg font-serif font-bold text-neutral-100">
              5. Refund Processing Timelines
            </h2>
            <p>
              Approved refunds are processed within 24 to 48 business hours. Funds will return via:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400 text-xs">
              <li><strong>PayID / Osko:</strong> Same business day.</li>
              <li><strong>EFT Bank Transfer:</strong> 1–2 Australian banking days.</li>
              <li><strong>Cryptocurrency (BTC / USDT):</strong> Immediate blockchain confirmation once wallet address is verified.</li>
            </ul>
          </section>
        </div>

        {/* Contact Concierge Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-950/60 to-neutral-900 border border-amber-800/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-serif font-bold text-neutral-100">Have a question regarding your order?</h3>
            <p className="text-xs text-neutral-400">Our Sydney concierge team is on standby to assist with authentication inquiries and claims.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-xs transition-colors"
            >
              Contact Us
            </Link>
            <a
              href={`https://wa.me/${CONTACT.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold transition-colors hover:bg-emerald-900"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
