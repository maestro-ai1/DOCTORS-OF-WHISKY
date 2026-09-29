import React from 'react';
import Link from 'next/link';
import { SITE, CONTACT } from '@/lib/config';
import { Wine, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const footerLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Shipping Information', href: '/shipping' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-amber-900/40 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top 3-Column Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Column 1: Brand & Compliance Credentials (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-950 via-neutral-900 to-amber-900 border border-amber-600/50 flex items-center justify-center text-amber-400">
                <Wine className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                  {SITE.name}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-amber-500/90 font-medium">
                  Australia&apos;s Fine Spirits &amp; Rare Malts
                </span>
              </div>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Australia&apos;s premier vault for rare single malts, aged Japanese whiskies, and collectible international spirits. Every bottle is sommelier-inspected and stored in our climate-regulated Sydney cellars.
            </p>

            <div className="pt-2 border-t border-neutral-900 text-[11px] text-neutral-500 space-y-0.5 font-mono">
              <p><strong className="text-neutral-400 font-sans">ABN:</strong> {CONTACT.abn}</p>
              <p><strong className="text-neutral-400 font-sans">Liquor Licence:</strong> {CONTACT.liquorLicence}</p>
            </div>
          </div>

          {/* Column 2: Organized Navigation Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400 pb-1.5 border-b border-neutral-900">
              Information &amp; Policies
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {footerLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-neutral-400 hover:text-amber-300 transition-colors py-0.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-xs font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge: {CONTACT.phone}</span>
              </a>
            </div>
          </div>

          {/* Column 3: Settlement Gateways & Transit Insurance (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400 pb-1.5 border-b border-neutral-900">
              Verified Settlement
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
                <span className="text-[11px] font-bold text-amber-400 block font-mono">PayID</span>
                <span className="text-[9px] text-neutral-400">Instant AU Banks</span>
              </div>
              <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
                <span className="text-[11px] font-bold text-amber-400 block font-mono">Osko / EFT</span>
                <span className="text-[9px] text-neutral-400">Bank Transfer</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-center">
                <span className="text-[11px] font-bold text-emerald-400 block font-mono">Bitcoin (BTC)</span>
                <span className="text-[9px] text-emerald-400/90 font-semibold">12% Auto-Off</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-center">
                <span className="text-[11px] font-bold text-emerald-400 block font-mono">USDT</span>
                <span className="text-[9px] text-emerald-400/90 font-semibold">12% Auto-Off</span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-[10px] text-neutral-400 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Full Transit Insurance on every Australian parcel</span>
            </div>
          </div>
        </div>

        {/* Mandatory Australian Liquor Licensing Notice Banner */}
        <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-amber-900/40 text-[10px] text-neutral-400 leading-relaxed">
          <p>
            <strong className="text-amber-400 font-semibold">MANDATORY AUSTRALIAN LIQUOR WARNING:</strong> Under the Victorian Liquor Control Reform Act 1998 / NSW Liquor Act 2007, it is an offence to supply alcohol to a person under the age of 18 years (Penalty exceeds $19,000), or for a person under the age of 18 years to purchase or receive liquor. Couriers verify legal photo ID upon physical delivery. Licence Number: {CONTACT.liquorLicence}.
          </p>
        </div>

        {/* Bottom Copyright & Location */}
        <div className="border-t border-neutral-900 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} {SITE.name} Pty Ltd. All rights reserved. Sydney, NSW, Australia.</p>
          <div className="flex items-center gap-3 text-[10px]">
            <span>Domain: {SITE.domain}</span>
            <span>•</span>
            <span>Currency: AUD ($)</span>
            <span>•</span>
            <span>Min Order: $300 AUD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
