import React from 'react';
import { ShieldCheck, Truck, Coins, Warehouse } from 'lucide-react';

const PILLARS = [
  {
    icon: Warehouse,
    title: 'Sydney Climate Vaults',
    description: 'Stored at constant 14°C & 65% humidity to preserve corks and liquid brilliance.',
  },
  {
    icon: ShieldCheck,
    title: '100% Provenance Guaranteed',
    description: 'Every rare bottle is sommelier-inspected, capsule-verified, and hologram sealed.',
  },
  {
    icon: Coins,
    title: '12% Crypto Discount',
    description: 'Instant 12% deduction at checkout when paying via Bitcoin (BTC) or Tether (USDT).',
  },
  {
    icon: Truck,
    title: 'Insured Australia-Wide Transit',
    description: 'Discreet, shock-proof packaging with full transit insurance & 18+ signature delivery.',
  },
];

export function TrustBar() {
  return (
    <section className="bg-neutral-950 border-b border-amber-900/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group flex items-start gap-4 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80 hover:border-amber-700/50 hover:bg-neutral-900/80 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-950/70 border border-amber-800/50 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:border-amber-500 transition-all shrink-0 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-serif font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                    {pillar.title}
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
