'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CONTACT } from '@/lib/config';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Sparkles, Phone } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    tag: 'RARE SPEYSIDE VINTAGE',
    title: 'The Macallan 25 Year Old Sherry Oak',
    subtitle: 'Matured exclusively in hand-picked Oloroso sherry seasoned oak casks from Jerez, Spain. Sydney vault verified.',
    badge: '100% Provenance Seal',
    price: '$4,850 AUD',
    cryptoPrice: '$4,268 AUD with Crypto',
    link: '/shop/whisky/macallan-25-year-old-sherry-oak-single-malt',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: 2,
    tag: 'JAPANESE COLLECTOR ALLOCATION',
    title: 'Nikka Taketsuru 21 Year Old Pure Malt',
    subtitle: 'World-renowned discontinued pure malt blending Yoichi peat and Miyagikyo sherry elegance.',
    badge: 'Discontinued Heritage',
    price: '$1,850 AUD',
    cryptoPrice: '$1,628 AUD with Crypto',
    link: '/shop/whisky/nikka-taketsuru-21-year-old-pure-malt',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: 3,
    tag: 'ULTRA-PREMIUM TEQUILA SOLERA',
    title: 'Don Julio 1942 Ultima Reserva Extra Añejo',
    subtitle: 'Crafted from the final agave field planted by Don Julio González in 2006. Finished in Madeira wine casks.',
    badge: 'Final 2006 Harvest',
    price: '$990 AUD',
    cryptoPrice: '$871.20 AUD with Crypto',
    link: '/shop/spirit/don-julio-1942-ultima-reserva-extra-anejo',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1920&q=85',
  },
  {
    id: 4,
    tag: 'GLACIAL FILTERED LUXURY VODKA',
    title: 'Grey Goose Altius French Glacial Reserve',
    subtitle: 'Filtered at sub-zero temperatures using French Alpine glacial spring water in hand-sculpted decanters.',
    badge: 'Sub-Zero Filtered',
    price: '$290 AUD',
    cryptoPrice: '$255.20 AUD with Crypto',
    link: '/shop/spirit/grey-goose-altius-ultra-premium-french-vodka',
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=1920&q=85',
  }
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
    <div className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px] bg-neutral-950 overflow-hidden border-b border-amber-900/30">
      {/* Background Slides */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image with Dark Vignette and Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-10000"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40" />

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
