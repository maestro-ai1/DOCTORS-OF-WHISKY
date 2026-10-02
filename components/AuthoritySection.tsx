import React from 'react';
import Link from 'next/link';
import { BRAND_AUTHORITY, CONTACT } from '@/lib/config';
import { ShieldCheck, Warehouse, Lock, Award, Sparkles, ArrowRight, Thermometer, CheckCircle2 } from 'lucide-react';

export function AuthoritySection() {
  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-neutral-950 via-neutral-900/40 to-neutral-950 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Compact Integrated Grid: Heritage Story + Sydney Vault Registry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Compact Heritage Story */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-[11px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Established {BRAND_AUTHORITY.foundingYear} • Sydney, Australia</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-serif font-bold text-neutral-100 tracking-tight leading-snug">
              Buy Whisky Online from a Sydney Whisky Specialist
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              Founded in Sydney in 2016, <strong>Doctors of Whisky</strong> guarantees unbroken provenance for Australia&apos;s most discerning collectors. Every rare single malt and aged spirit is sommelier-inspected and stored in our climate-regulated vaults held strictly at <span className="text-amber-300 font-medium">14°C and 65% humidity</span>.
            </p>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-[11px] leading-tight">
                  <span className="font-semibold text-neutral-200 block">14°C Cellaring</span>
                  <span className="text-neutral-400 text-[10px]">65% Monitored RH</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-[11px] leading-tight">
                  <span className="font-semibold text-neutral-200 block">100% Provenance</span>
                  <span className="text-neutral-400 text-[10px]">Capsule Verified</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center gap-2 col-span-2 sm:col-span-1">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-[11px] leading-tight">
                  <span className="font-semibold text-neutral-200 block">Insured Transit</span>
                  <span className="text-neutral-400 text-[10px]">Nationwide Couriers</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <span>About Vaults &amp; Provenance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-semibold transition-colors"
              >
                <span>Private Sommelier Consultation</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Compact Sydney Provenance Registry Card */}
          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-amber-950/30 border border-amber-800/50 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold block">
                    Vault Registry
                  </span>
                  <h3 className="text-base font-serif font-bold text-neutral-100">
                    Sydney Provenance Standard
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-950 border border-amber-600/50 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/70">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Location</span>
                  <span className="font-medium text-neutral-200 text-[11px]">Sydney CBD, NSW</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/70">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Climate</span>
                  <span className="font-mono text-amber-400 font-semibold text-[11px]">14.0°C · 65% RH</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/70">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Security</span>
                  <span className="font-medium text-emerald-400 text-[11px]">Capsule &amp; Seal Monitored</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/70">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Liquor Licence</span>
                  <span className="font-mono text-neutral-300 text-[10px]">{CONTACT.liquorLicence}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/30 text-[11px] text-amber-300/90 text-center italic">
                &ldquo;Every bottle verified for seal integrity, fill level, and temperature-controlled storage.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
