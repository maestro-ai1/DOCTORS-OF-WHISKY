import React from 'react';
import Link from '@/components/AppLink';
import { SITE, CONTACT, BRAND_AUTHORITY } from '@/lib/config';
import { ShieldCheck, Warehouse, Lock, Award, Sparkles, Truck, Phone, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Page Hero */}
        <div className="text-center space-y-3 pb-8 border-b border-neutral-900">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sydney Vaults · Founded {BRAND_AUTHORITY.foundingYear}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight">
            The Doctors of Whisky Provenance Standard
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            Preserving world-class liquid history in Australia through scientific cellar conditions, sommelier authentication, and white-glove transit.
          </p>
        </div>

        {/* Narrative Section (>700 words) */}
        <div className="space-y-8 text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-amber-900/40 space-y-3">
            <h2 className="text-xl font-serif font-bold text-neutral-100">
              Our Founding Story &amp; Purpose
            </h2>
            <p>
              Founded in 2016 in Sydney, New South Wales, <strong>Doctors of Whisky</strong> was established by a cohort of passionate Australian spirits collectors, certified sommeliers, and seasoned industry veterans. In an era where counterfeit vintage spirits and poorly stored bottles have infiltrated the global secondary market, our mission has remained steadfast: to provide Australian collectors, private cellars, and discerning institutions with an uncompromising sanctuary of 100% verified, perfectly preserved rare spirits.
            </p>
            <p>
              The name <em>Doctors of Whisky</em> reflects our scientific, diagnostic approach to spirit preservation, provenance appraisal, and sensory curation. From iconic Speyside single malts such as The Macallan 25 Year Old Sherry Oak to legendary discontinued Japanese pure malts like Nikka Taketsuru 21, every bottle in our catalog represents a historic pinnacle of distillation art.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-neutral-100">
              The Sydney Climate-Controlled Vault Standard
            </h2>
            <p>
              Spirits are living artefacts. Although high-proof alcohol does not spoil in the manner of table wine, exposure to fluctuating temperatures, UV light, dry ambient air, and vibrations can drastically degrade natural cork elasticity, compromise capsule seals, and alter delicate esters over decades of maturation.
            </p>
            <p>
              Our Sydney central vault is purpose-built and climate-regulated 24 hours a day, 365 days a year:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-400">
              <li><strong className="text-neutral-200">Constant Temperature:</strong> Held strictly at 14.0°C (±0.5°C) to prevent thermal expansion and ullage loss.</li>
              <li><strong className="text-neutral-200">Controlled Humidity:</strong> Maintained at 65% relative humidity to ensure natural cork elasticity and prevent seal drying.</li>
              <li><strong className="text-neutral-200">Zero UV Exposure:</strong> High-density light filtration eliminating all ultraviolet radiation and thermal degradation.</li>
              <li><strong className="text-neutral-200">Seismic &amp; Vibration Dampening:</strong> Isolated shelving units protecting sediment stability in vintage Cognac, Port, and aged single malts.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-neutral-100">
              Comprehensive Physical Appraisal &amp; Hologram Sealing
            </h2>
            <p>
              Prior to being accepted into our active inventory, each individual bottle undergoes a rigorous multi-point authentication inspection by our in-house sommelier committee:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
                <h3 className="text-sm font-bold text-amber-400">1. Capsule &amp; Wax Integrity</h3>
                <p className="text-xs text-neutral-400">
                  Microscopic inspection of tamper-evident seals, lead capsules, and wax dipping to verify factory originality.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
                <h3 className="text-sm font-bold text-amber-400">2. Ullage &amp; Fill-Level Audit</h3>
                <p className="text-xs text-neutral-400">
                  Measurement against distillery master release specifications to ensure zero evaporation or leakage.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
                <h3 className="text-sm font-bold text-amber-400">3. Laser &amp; UV Label Verification</h3>
                <p className="text-xs text-neutral-400">
                  Examination of batch codes, serial numbers, watermark typography, and paper fiber authenticity.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
                <h3 className="text-sm font-bold text-amber-400">4. Doctors of Whisky Hologram Seal</h3>
                <p className="text-xs text-neutral-400">
                  Tamper-evident holographic serial seal affixed with an individual Certificate of Provenance.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-neutral-100">
              Australian High-Security Transit &amp; Compliance
            </h2>
            <p>
              We recognise that shipping a four-thousand-dollar Speyside single malt or rare Australian vintage Shiraz requires unmatched logistics. All shipments dispatched from Doctors of Whisky are encased in custom-moulded expanded polymer shock-absorption packaging, sealed in discreet outer cartons, and transported via premium express couriers with real-time GPS tracking and 100% full transit insurance.
            </p>
            <p>
              In strict accordance with the <strong>NSW Liquor Act 2007</strong> and <strong>Victorian Liquor Control Reform Act 1998</strong> (Liquor Licence No: {CONTACT.liquorLicence}), we mandate 18+ photo ID verification upon physical handover.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-3xl bg-neutral-900 border border-amber-900/50 text-center space-y-4">
          <h3 className="text-2xl font-serif font-bold text-neutral-100">
            Experience Australia&apos;s Finest Spirit Cellar
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Browse our active vault collection online, claim the 12% Crypto discount at checkout, or contact our private concierge for tailored bottle allocations.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Browse Rare Vault Catalog
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold text-xs uppercase tracking-wider"
            >
              Contact Concierge Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
