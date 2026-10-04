import React from 'react';
import { TRUSTPILOT_STATS, REVIEWS } from '@/lib/data/reviews';
import { Star, CheckCircle, ShieldCheck } from 'lucide-react';

/** Server-rendered, swipeable (scroll-snap) review row: no JavaScript, all reviews stay in the HTML. */
export function TrustpilotSection() {
  return (
    <section className="py-14 sm:py-20 bg-neutral-950 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Trustpilot Header Badge & Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          {/* Green Trustpilot Rating Bar */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-5 py-2.5 rounded-2xl bg-neutral-900/90 border border-emerald-500/40 shadow-lg shadow-emerald-950/20">
            {/* 5 Green Trustpilot Stars */}
            <div className="flex items-center gap-1 bg-[#00b67a] px-2.5 py-1 rounded">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
              ))}
            </div>

            <div className="text-xs sm:text-sm font-semibold text-neutral-200">
              <span className="text-[#00b67a] font-bold">Trustpilot</span>{' '}
              <span>★ ★ ★ ★ ★ {TRUSTPILOT_STATS.score} / {TRUSTPILOT_STATS.maxScore}</span>{' '}
              <span className="text-neutral-400 font-normal">
                based on <strong>{TRUSTPILOT_STATS.totalReviews} verified Australian reviews</strong>
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
            Trusted by Australia&apos;s Discerning Collectors
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Verified post-delivery testimonials from private collectors across Sydney, Melbourne, Brisbane, Perth, Adelaide &amp; Hobart.
          </p>
        </div>

        {/* Swipeable review row */}
        <div className="relative">
          <div role="region" aria-label="Customer reviews" className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:thin] [scrollbar-color:#404040_transparent]">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="snap-start shrink-0 w-[85%] sm:w-[48%] lg:w-[calc((100%-3rem)/3)] p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/90 hover:border-amber-700/50 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* 5 Green Stars & Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <div key={i} className="bg-[#00b67a] p-1 rounded-xs">
                          <Star className="w-3 h-3 fill-white text-white" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {review.date}
                    </span>
                  </div>

                  {/* Review Title */}
                  <h3 className="text-sm font-serif font-bold text-neutral-100 leading-snug">
                    &ldquo;{review.title}&rdquo;
                  </h3>

                  {/* Review Content */}
                  <p className="text-xs text-neutral-300 leading-relaxed font-light line-clamp-4">
                    {review.content}
                  </p>

                  {/* Bottle Mention */}
                  {review.bottlePurchased && (
                    <div className="text-[10px] text-amber-400/90 font-medium bg-amber-950/40 px-2 py-1 rounded border border-amber-900/40 inline-block">
                      Acquired: {review.bottlePurchased}
                    </div>
                  )}
                </div>

                {/* Author & Verification Badge */}
                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-neutral-200 block">
                      {review.author}
                    </span>
                    <span className="text-[11px] text-amber-500/90 font-medium">
                      {review.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Guarantee Banner */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900/60 border border-neutral-800 px-4 py-2 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All reviews verified by Australia Post &amp; StarTrack signature tracking. Zero sponsored ratings.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
