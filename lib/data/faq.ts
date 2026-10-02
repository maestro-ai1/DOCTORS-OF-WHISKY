import { FaqItem } from '@/lib/types';
import { KEYWORD_FAQS } from '@/lib/data/faq-keywords';

export const HOMEPAGE_FAQS: FaqItem[] = [
  {
    question: 'Where can I buy whisky online in Australia?',
    answer: 'Doctors of Whisky is a Sydney-based online bottle shop selling single malt Scotch, Japanese whisky, bourbon, rye and Australian whisky, plus tequila, vodka, gin, cognac, wine and beer. Browse the shop, add bottles to your cart and we deliver Australia-wide with insured shipping. Buyers must be 18 or over.'
  },
  {
    question: 'Is it legal to buy whisky online in Australia?',
    answer: 'Yes. Adults aged 18 and over can buy alcohol online in Australia, and delivery must go to an adult who can show ID and sign for the parcel. Doctors of Whisky only sells to buyers who are 18 or over, and every delivery needs an adult signature.'
  },
  {
    question: 'What is single malt whisky?',
    answer: 'Single malt whisky is made at one distillery from malted barley, water and yeast, distilled in pot stills and matured in oak casks. The word single refers to the distillery, not to a single cask. Popular single malts include Macallan, Glenfiddich, GlenDronach and Laphroaig, all available in our Scotch whisky collection.'
  },
  {
    question: 'What is the difference between whisky and whiskey?',
    answer: 'It is mostly a spelling difference by country. Scotch, Japanese, Canadian and Australian makers write whisky, while Irish and American makers usually write whiskey. Both describe grain spirit aged in wood; the real differences come from the grains, casks and production rules of each region.'
  },
  {
    question: 'What is a good whisky to give as a gift?',
    answer: 'A smooth Speyside single malt such as a Glenfiddich or Macallan suits most whisky drinkers, a Japanese whisky from Nikka is a prestigious choice, and bourbon is a friendly gift for cocktail fans. Message us on WhatsApp for help choosing a bottle within your budget.'
  },
  {
    question: 'How does secure delivery work across Australia?',
    answer: 'All orders are dispatched from our Sydney climate-controlled vault in bespoke, multi-layered shock-absorbing packaging with transit temperature logs. Orders are shipped via specialized couriers with full transit insurance, real-time GPS tracking, and mandatory 18+ signature-on-delivery. Metro Sydney, Melbourne, and Brisbane deliveries generally arrive within 24–48 hours; regional & WA within 3–4 business days.'
  },
  {
    question: 'How do I claim the 12% Crypto payment discount?',
    answer: 'Select Bitcoin (BTC) or Tether (USDT) at checkout or inform our concierge via WhatsApp (+61420128746). Our system automatically applies an instant 12% deduction to your cart total. Transfer the exact converted amount to our verified Australian treasury wallet, and your allocation will be locked and dispatched immediately upon network confirmation.'
  },
  {
    question: 'What are the minimum order and free shipping thresholds?',
    answer: 'To ensure white-glove packaging and dedicated insured courier handling for every parcel, Doctors of Whisky operates with a minimum order value of $300 AUD. All orders of $1,500 AUD and above receive complimentary Australia-wide Express courier shipping. For orders between $300 and $1,499 AUD, a flat shipping fee of $75 AUD applies.'
  }
];

export const ALL_FAQS: FaqItem[] = [
  ...HOMEPAGE_FAQS,
  {
    question: 'How do you guarantee the authenticity and provenance of rare bottles?',
    answer: 'Every rare bottle in our vault is subjected to rigorous physical appraisal by our Master Sommelier team. We inspect capsule integrity, fill level (ullage), tax stamp authenticity, serial numbers against distillery registries, and UV security watermarks. All bottles over $1,000 AUD come with a Doctors of Whisky Certificate of Provenance and hologram tamper-evident seal.'
  },
  {
    question: 'Can I inspect or collect my order from your Sydney vaults?',
    answer: 'Yes. Private vault viewings and order collections are available by appointment at our Sydney CBD headquarters (Level 14, 1 Bligh Street, Sydney NSW). Please contact our concierge team at least 24 hours prior with your Order Reference to arrange security clearance and sommelier preparation.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept PayID (instant settlement via Australian banks), Direct EFT Bank Transfer (Osko), Bitcoin (BTC), and Tether (USDT). For corporate or private collector orders over $10,000 AUD, bespoke bank escrow services can also be coordinated.'
  },
  {
    question: 'What is your returns and breakage policy?',
    answer: 'All shipments are 100% insured against loss or transit damage. In the unlikely event of damage upon delivery, simply notify our concierge within 24 hours with photographic evidence, and we will issue an immediate replacement or full refund. Given the vintage nature of rare spirits, returns for change of mind are not permitted once seals are broken.'
  },
  {
    question: 'How should I store whisky?',
    answer: 'Store whisky upright, away from direct sunlight and heat, at a steady room temperature. Standing the bottle up keeps the high-strength spirit off the cork. Unopened bottles keep almost indefinitely; once opened, aim to finish a bottle within one to two years for the best flavour.'
  },
  {
    question: 'What is the difference between Scotch and bourbon?',
    answer: 'Scotch is made in Scotland, usually from malted barley, and matured in oak casks for at least three years. Bourbon is American, made from at least 51% corn and aged in new charred oak. That is why Scotch tends to taste malty or smoky, while bourbon is typically sweeter with vanilla and caramel notes.'
  },
  {
    question: 'Do you deliver whisky to Melbourne, Brisbane, Perth and other cities?',
    answer: 'Yes. We deliver to every Australian state and territory, including Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Hobart and Darwin. Delivery is insured, needs an adult signature, and orders of $1,500 AUD or more ship free by express courier.'
  },
  {
    question: 'What are the legal age verification requirements for Australian orders?',
    answer: 'Under the NSW Liquor Act 2007 and Victorian Liquor Control Reform Act 1998, it is an offence to supply liquor to persons under 18 years. All purchasers must verify they are 18+ upon entering the website, and courier drivers are legally required to verify government-issued photo ID upon physical delivery.'
  },
  ...KEYWORD_FAQS.map(({ question, answer }) => ({ question, answer })),
];
