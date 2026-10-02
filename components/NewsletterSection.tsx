'use client';

import React, { useState } from 'react';
import { Mail, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-neutral-950 to-neutral-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-neutral-950 border border-amber-800/50 text-center space-y-6 shadow-2xl shadow-black/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Private Cellar Access</span>
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
            Join the Doctors of Whisky Private Registry
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            Receive confidential notifications for rare single-cask drops, ghost distillery releases, and exclusive allocation pricing before public release.
          </p>
        </div>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="collector@example.com.au"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs placeholder-neutral-400 focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              Request Access
            </button>
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Thank you. You have been registered for private Sydney vault allocation drops.</span>
          </div>
        )}

        <p className="text-[10px] text-neutral-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Strict privacy guaranteed. We never share collector information.</span>
        </p>
      </div>
    </section>
  );
}
