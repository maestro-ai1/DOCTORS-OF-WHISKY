import React from 'react';
import { SITE, CONTACT } from '@/lib/config';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

/**
 * 18+ gate, rendered as plain server HTML (no client component, nothing to hydrate).
 * - New visitors see it in the very first paint.
 * - A tiny script in <head> (see AGE_GATE_HEAD_SCRIPT) adds the class "age-ok" to <html> for returning visitors and for
 *   the staff / payment pages, and globals.css hides the gate when that class is present, so it never flashes.
 * - The two buttons are handled by the document-level listener in AGE_GATE_HEAD_SCRIPT.
 */
// Runs in <head>, before anything else. Returning visitors and staff/payment pages are let straight through. The click handler is
// attached once to the document (capture phase), so the buttons work the instant they are painted, even before React hydrates and
// even if React later replaces the gate's markup. The "ok" state is kept as a data attribute as well as a class so a re-render of
// <html> can never bring the gate back.
export const AGE_GATE_HEAD_SCRIPT = `(function(){var d=document.documentElement,K='${SITE.ageGateKey}';function ok(){d.classList.add('age-ok');d.setAttribute('data-age','ok');var g=document.getElementById('age-gate');if(g)g.style.display='none'}try{var p=location.pathname;if(localStorage.getItem(K)||p.indexOf('/admin')===0||p.indexOf('/pay/')===0)ok()}catch(e){}document.addEventListener('click',function(e){var t=e.target&&e.target.closest?e.target.closest('#age-yes,#age-no'):null;if(!t)return;if(t.id==='age-yes'){try{localStorage.setItem(K,'true')}catch(x){}ok()}else{var q=document.getElementById('age-ask'),r=document.getElementById('age-refused');if(q)q.hidden=true;if(r)r.hidden=false}},true)})();`;

export function AgeGateModal() {
  return (
    <>
      <div id="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-title" className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95">
        {/* Background with warm ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(180,120,40,0.18),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(120,70,20,0.16),transparent_50%)]" aria-hidden="true" />

        <div className="relative w-full max-w-lg bg-neutral-950/95 border border-amber-800/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 text-center overflow-hidden isolate">
          {/* Subtle decorative gold top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />

          <div id="age-ask">
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-amber-950/80 border border-amber-700/50 flex items-center justify-center text-amber-400 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1 mb-6">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold">Australian Liquor Compliance</span>
              <p id="age-title" className="text-2xl sm:text-3xl font-serif font-bold text-neutral-100 tracking-tight">
                Doctors of Whisky
              </p>
              <p className="text-xs text-neutral-400 italic">Australia&apos;s Home for Rare, Collectable &amp; Fine Spirits</p>
            </div>

            <div className="bg-neutral-900/90 border border-neutral-800/80 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-semibold text-neutral-200 mb-1 text-center">Are you 18 years of age or older?</p>
              <p className="text-[11px] text-neutral-400 leading-relaxed text-center">
                You must be of legal Australian drinking age to browse, purchase, or reserve our curated vault collections.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                id="age-no"
                type="button"
                className="w-full min-h-[52px] cursor-pointer touch-manipulation py-3 px-4 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/60 text-neutral-400 hover:text-neutral-200 text-sm font-medium transition-all"
              >
                No, I am Under 18
              </button>
              <button
                id="age-yes"
                type="button"
                className="w-full min-h-[52px] cursor-pointer touch-manipulation py-3 px-4 rounded-lg bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-950/50 transition-colors active:brightness-90"
              >
                Yes, I am 18 or Older
              </button>
            </div>

            <div className="border-t border-neutral-900 pt-4">
              <p className="text-[10px] text-neutral-400 leading-tight">
                <strong className="text-neutral-400">WARNING:</strong> Under the Victorian Liquor Control Reform Act 1998 / NSW Liquor Act 2007, it is an offence to supply alcohol to a person under the age of 18 years (Penalty exceeds $19,000), or for a person under the age of 18 years to purchase or receive liquor. Liquor Licence No: {CONTACT.liquorLicence}.
              </p>
            </div>
          </div>

          <div id="age-refused" hidden className="py-6 space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-red-950/80 border border-red-700/50 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <p className="text-xl font-serif font-bold text-neutral-200">Access Restricted</p>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
              In accordance with Australian Liquor Licensing laws, you must be 18 years or older to enter Doctors of Whisky.
            </p>
            <div className="pt-2">
              <a
                href="https://www.drinkwise.org.au"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2.5 px-6 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs text-amber-400 font-medium transition-colors"
              >
                Learn more at DrinkWise.org.au
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
