'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CONTACT } from '@/lib/config';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Sparkles, Phone } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    tag: 'ICONIC BLENDED SCOTCH',
    title: 'Johnnie Walker — A Master Blender’s Legacy',
    subtitle: 'From the everyday Black Label to the ultra-rare King George V Edition — 200 years of consistent, iconic blending.',
    badge: 'Est. 1820',
    price: '$890 AUD',
    cryptoPrice: '$783.20 AUD with Crypto',
    link: '/shop/whisky/johnnie-walker-king-george-v-rare-edition',
    image: '/images/hero/johnnie-walker-black-label-hero.jpg',
  },
  {
    id: 2,
    tag: 'RARE SPEYSIDE VINTAGE',
    title: 'The Macallan — Sherry Oak Mastery',
    subtitle: 'Matured exclusively in hand-picked Oloroso sherry seasoned oak casks from Jerez, Spain. Sydney vault verified.',
    badge: '100% Provenance Seal',
    price: '$4,850 AUD',
    cryptoPrice: '$4,268 AUD with Crypto',
    link: '/shop/whisky/macallan-25-year-old-sherry-oak-single-malt',
    image: '/images/hero/macallan-m-decanter-hero.jpg',
  },
  {
    id: 3,
    tag: 'HIGHLAND SINGLE CASK',
    title: 'The GlenDronach — Sherry Cask Icon',
    subtitle: 'Distilled in 1993 and matured for 26 years in a single Pedro Ximénez sherry puncheon. A quintessential Highland sherry monster.',
    badge: 'Single Cask Batch 18',
    price: '$1,250 AUD',
    cryptoPrice: '$1,100 AUD with Crypto',
    link: '/shop/whisky/glendronach-1993-26-year-old-single-cask',
    image: '/images/hero/glendronach-ode-collection-hero.jpg',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px] overflow-hidden border-b border-amber-900/30 bg-neutral-950">
      {/* Background Slides */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Real, on-brand bottle photography as a bright full-bleed background */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={idx === 0}
            className="object-cover object-center"
            sizes="100vw"
          />

          {/* Minimal left-side scrim — just enough for text contrast, photo stays bright */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-neutral-950/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          {/* Slide Content */}
          <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-2xl space-y-4 sm:space-y-6 pt-6">
              {/* Tag & Badge */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-950/90 border border-amber-700/60 text-amber-300 text-[11px] font-bold uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {slide.tag}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300 text-[11px] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {slide.badge}
                </span>
              </div>

              {/* Heading — Exactly one H1 on the first slide for SEO */}
              {idx === 0 ? (
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-neutral-100 tracking-tight leading-[1.1]">
                  {slide.title}
                </h1>
              ) : (
                <div className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-neutral-100 tracking-tight leading-[1.1]">
                  {slide.title}
                </div>
              )}

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-neutral-300 max-w-lg leading-relaxed font-light">
                {slide.subtitle}
              </p>

              {/* Price & Crypto Discount callout */}
              <div className="flex flex-wrap items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">
                  {slide.price}
                </span>
                <span className="text-xs sm:text-sm font-medium text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2.5 py-1 rounded-md">
                  {slide.cryptoPrice} (12% Off)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={slide.link}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-950/60 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Explore Bottle Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
                    `Hi Doctors of Whisky, I would like to reserve or inquire about: ${slide.title} (${slide.price}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-amber-900/60 hover:border-amber-600 text-amber-200 text-sm font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Reserve via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Navigation Arrows */}
      <div className="absolute z-30 bottom-8 right-4 sm:right-8 flex items-center gap-3">
        <button
          type="button"
          onClick={prevSlide}
          className="p-3 rounded-full bg-neutral-900/80 hover:bg-amber-900/80 border border-neutral-700 text-neutral-300 hover:text-white transition-colors backdrop-blur-sm"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs text-amber-400 font-mono">
          <span>0{currentSlide + 1}</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">0{SLIDES.length}</span>
        </div>

        <button
          type="button"
          onClick={nextSlide}
          className="p-3 rounded-full bg-neutral-900/80 hover:bg-amber-900/80 border border-neutral-700 text-neutral-300 hover:text-white transition-colors backdrop-blur-sm"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
