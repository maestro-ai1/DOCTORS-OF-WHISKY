import type { Metadata } from 'next';
import './globals.css';
import { SITE, CONTACT, BRAND_AUTHORITY } from '@/lib/config';
import { CartProvider } from '@/lib/context/CartContext';
import { WishlistProvider } from '@/lib/context/WishlistContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AgeGateModal } from '@/components/AgeGateModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { SalesPopup } from '@/components/SalesPopup';

export const metadata: Metadata = {
  title: 'Doctors of Whisky | Buy Rare Whisky Online Australia | Fine Spirits & Single Malts',
  description: "Australia's premier destination for rare single malt whiskies, Japanese whisky, luxury spirits, and vault releases. Sydney vaults, 100% provenance guarantee, 12% Crypto discount.",
  keywords: [
    'buy rare whisky online australia',
    'japanese whisky importer australia',
    'macallan single malt sydney',
    'buy liquor with crypto australia',
    'express spirits delivery australia',
    'rare scotch whisky online',
    'glenfiddich 30 sydney',
    'lark distillery rare cask'
  ],
  authors: [{ name: SITE.name }],
  metadataBase: new URL(`https://${SITE.domain}`),
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  openGraph: {
    title: "Doctors of Whisky | Australia's Home for Rare & Collectable Spirits",
    description: 'Explore Australia’s most coveted collection of authenticated rare single malts, aged Japanese whiskies, and fine spirits in our Sydney vaults.',
    url: `https://${SITE.domain}`,
    siteName: SITE.name,
    locale: SITE.locale,
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1200&h=630&q=85',
        width: 1200,
        height: 630,
        alt: 'Doctors of Whisky - Australia Rare Whisky Vault',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doctors of Whisky | Rare Spirits & Japanese Whisky Australia',
    description: 'Sydney climate-controlled vaults. 100% provenance guarantee, PayID, Osko, and 12% Crypto savings.',
    images: ['https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1200&h=630&q=85'],
  },
  other: {
    'og:updated_time': new Date().toISOString(),
    'google-site-verification': SITE.gscVerification,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LiquorStore', 'Store', 'Organization', 'LocalBusiness'],
    name: SITE.name,
    description: SITE.tagline,
    url: `https://${SITE.domain}/`,
    logo: `https://${SITE.domain}/logo.png`,
    telephone: CONTACT.phoneRaw,
    email: CONTACT.email,
    foundingDate: BRAND_AUTHORITY.foundingYear,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Level 14, 1 Bligh Street',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      postalCode: '2000',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.8651,
      longitude: 151.2099,
    },
    priceRange: '$$$$',
    currenciesAccepted: 'AUD, BTC, USDT',
    paymentAccepted: 'PayID, Osko, Bank Transfer, Bitcoin, USDT',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
    knowsAbout: [
      'Single Malt Scotch Whisky',
      'Japanese Whisky',
      'Rare Cognac',
      'Artisanal Tequila',
      'Fine Australian Shiraz',
      'Cask Strength Allocations',
    ],
    sameAs: [
      'https://wa.me/61420128746',
    ],
  };

  return (
    <html lang="en" className="dark bg-neutral-950 text-neutral-100 antialiased selection:bg-amber-800 selection:text-amber-100">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden">
        <CartProvider>
          <WishlistProvider>
            {/* 18+ Age Gate Modal */}
            <AgeGateModal />

            {/* Global Header */}
            <Header />

            {/* Main Content Area */}
            <main id="main" className="flex-1">
              {children}
            </main>

            {/* Cart Drawer */}
            <CartDrawer />

            {/* Checkout Modal */}
            <CheckoutModal />

            {/* Verified Sales Live Notifications */}
            <SalesPopup />

            {/* Global Footer */}
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
