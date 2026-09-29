export const SITE = {
  name: 'Doctors of Whisky',
  tagline: "Australia's Home for Rare, Collectable & Fine Spirits",
  domain: 'doctorsofwhisky.com.au',
  locale: 'en-AU',
  currency: {
    code: 'AUD',
    symbol: '$',
  },
  primaryColor: '#8B4513',
  darkColor: '#111111',
  goldColor: '#D4AF37',
  gscVerification: 'GSC_DOCTORS_OF_WHISKY_VERIFIED',
  indexNowKey: 'dow-indexnow-key-2026',
  cartKey: 'dow-cart-v1',
  wishlistKey: 'dow-wishlist-v1',
  ageGateKey: 'dow-age-verified-v1',
};

export const CONTACT = {
  email: 'sales@doctorsofwhisky.com.au',
  phone: '+61 420 128 746',
  phoneRaw: '+61420128746',
  whatsappNumber: '61420128746',
  address: 'Level 14, 1 Bligh Street, Sydney NSW 2000, Australia',
  hq: 'Sydney, New South Wales, Australia',
  country: 'Australia',
  hours: 'Mon - Sat: 9:00 AM – 7:00 PM (AEST)',
  liquorLicence: 'LIQP770017482',
  abn: '74 618 992 410',
};

export const SHOP_RULES = {
  minOrder: 300, // $300 AUD minimum order
  freeShippingThreshold: 1500, // $1,500 AUD free express courier
  shippingFee: 75, // $75 AUD flat fee under $1,500
  cryptoDiscountPercent: 12, // 12% auto discount on Crypto
};

export const PAYMENT_METHODS = [
  {
    id: 'payid',
    name: 'PayID / Osko Fast Payment',
    badge: 'Instant Bank Transfer',
    details: 'payments@doctorsofwhisky.com.au',
    type: 'payid',
    note: 'Instant settlement via major Australian Banks (ANZ, CommBank, NAB, Westpac).',
  },
  {
    id: 'bank-transfer',
    name: 'Australian Direct Bank Transfer',
    badge: 'Standard EFT',
    details: 'BSB: 082-057 | Account: 9482-11049 | Name: Doctors of Whisky Pty Ltd',
    type: 'bank',
    note: 'Include your Order Reference (e.g. DOW-XXXX) in payment description.',
  },
  {
    id: 'crypto-btc',
    name: 'Bitcoin (BTC)',
    badge: '12% Instant Savings',
    details: 'bc1qdow9837xvhqlz82m4k70wje9x30198klpq79vd',
    type: 'crypto',
    note: 'Send exact BTC equivalent. Fast automated block confirmation.',
  },
  {
    id: 'crypto-usdt',
    name: 'Tether USD (USDT - ERC20 / TRC20)',
    badge: '12% Instant Savings',
    details: '0x8b30De7397b8F27B88C419eD9C83f789C065799A',
    type: 'crypto',
    note: 'Supports TRC20 or ERC20 transfers. Instant 12% discount applied.',
  },
];

export const BRAND_AUTHORITY = {
  foundingYear: '2016',
  location: 'Sydney Vaults & Private Cellars, NSW',
  vaultCount: '1,400+ Authenticated Rare Bottles',
  differentiators: [
    {
      title: 'Sydney Climate-Controlled Vaults',
      description: 'Stored at constant 14°C and 65% humidity to preserve cork integrity and spirit vitality.',
    },
    {
      title: '100% Provenance & Seal Guarantee',
      description: 'Every rare vintage bottle is physically inspected, capsule-verified, and hologram-sealed by our Master Sommelier team.',
    },
    {
      title: 'Discreet High-Security Courier Transit',
      description: 'Specially insulated shock-proof packaging with full transit insurance and signature-on-delivery across all Australian states.',
    },
    {
      title: 'Exclusive Collector Access & Sourcing',
      description: 'Direct allocations from Scottish distilleries, Japanese private collections, and Australian limited single-cask reserves.',
    },
  ],
};
