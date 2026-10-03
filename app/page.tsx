import React from 'react';
import { HeroSlider } from '@/components/HeroSlider';
import { TrustBar } from '@/components/TrustBar';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { BrandSlider } from '@/components/BrandSlider';
import { AuthoritySection } from '@/components/AuthoritySection';
import { TrustpilotSection } from '@/components/TrustpilotSection';
import { HomeFaq } from '@/components/HomeFaq';
import { HomeIntro } from '@/components/HomeIntro';
import { getFeaturedProducts } from '@/lib/data/products';
import { slimProducts } from '@/lib/slim-products';
import { buildMetadata } from '@/lib/seo';
import { HOME_SEO } from '@/lib/data/home-seo';

export const metadata = buildMetadata({
  title: 'Buy Glenfiddich, Tequila & Whisky Online Australia',
  description:
    'Buy Glenfiddich, tequila, whisky, gin, champagne, prosecco, Baileys, Jim Beam and Jack Daniels online in Australia. Insured delivery, 18+.',
  path: '/',
  keywords: [HOME_SEO.primary.kw, ...HOME_SEO.primaries.map((k) => k.kw), ...HOME_SEO.secondary.map((k) => k.kw), ...HOME_SEO.tags.map((k) => k.kw)],
});

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Slideshow */}
      <HeroSlider />
      <span id="hero-parsed" />

      {/* 1b. H1 + keyword tagline + popular searches (Transactional / Commercial keywords) */}
      <HomeIntro />

      {/* 2. Trust Reassurance Bar */}
      <TrustBar />

      {/* 3. Curated Product Grid (Exactly 6 Featured Bottles) */}
      <div className="cv-auto">
        <FeaturedProducts products={slimProducts(getFeaturedProducts().slice(0, 6))} />
      </div>

      {/* 4. Brand & Distilleries Logo Slideshow */}
      <div className="cv-auto">
        <BrandSlider />
      </div>

      {/* 5. Compact Authority & Sydney Vault Story */}
      <div className="cv-auto">
        <AuthoritySection />
      </div>

      {/* 6. Trustpilot Verified Social Proof Section (3-Box Slideshow) */}
      <div className="cv-auto">
        <TrustpilotSection />
      </div>

      {/* 7. Homepage 3-Item FAQ Accordion */}
      <HomeFaq />
    </div>
  );
}
