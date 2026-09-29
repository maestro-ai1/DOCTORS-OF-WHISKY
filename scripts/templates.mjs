const GENERIC_FIRST_WORDS = new Set([
  'bourbon', 'rye', 'gin', 'rum', 'white', 'spiced', 'dark', 'gold', 'red', 'rose', 'port',
  'sparkling', 'lager', 'imported', 'non', 'vodka', 'zero', 'sugar', 'cider', 'baijiu', 'mezcal',
  'ginger', 'water', 'energy', 'condiment', 'condiments', 'soju', 'wine', 'beer', 'premix', 'the',
  'french', 'polish', 'russian', 'cognac', 'calvados', 'orange', 'cinnamon', 'coffee', 'italian',
]);

export function deriveBrand(folder, humanizedName) {
  const first = humanizedName.split(' ')[0];
  if (first && first.length > 2 && !GENERIC_FIRST_WORDS.has(first.toLowerCase())) {
    return first;
  }
  return folder;
}

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function seededRandom(seedStr) {
  let seed = hashSeed(seedStr);
  return function () {
    seed = (seed * 1103515245 + 12345) >>> 0;
    return (seed % 10000) / 10000;
  };
}

export function priceFor(seedStr, [min, max]) {
  const rnd = seededRandom(seedStr)();
  const raw = min + rnd * (max - min);
  return Math.round(raw / 5) * 5;
}

const STYLE_DEFAULTS = {
  'scotch-whisky': { abv: '40.0% - 46.0%', size: '700ml' },
  'bourbon': { abv: '40.0% - 50.0%', size: '700ml' },
  'rye-whiskey': { abv: '40.0% - 50.0%', size: '700ml' },
  'japanese-whisky': { abv: '43.0%', size: '700ml' },
  'australian-whisky': { abv: '43.0% - 58.0%', size: '700ml' },
  'vodka': { abv: '37.5% - 40.0%', size: '700ml' },
  'tequila': { abv: '38.0% - 40.0%', size: '700ml' },
  'mezcal': { abv: '40.0% - 45.0%', size: '700ml' },
  'cognac-brandy': { abv: '40.0%', size: '700ml' },
  'gin': { abv: '37.5% - 42.0%', size: '700ml' },
  'rum': { abv: '37.5% - 40.0%', size: '700ml' },
  'baijiu': { abv: '38.0% - 53.0%', size: '500ml' },
  'italian-liqueurs': { abv: '18.0% - 32.0%', size: '700ml' },
  'flavoured-cream-liqueurs': { abv: '15.0% - 20.0%', size: '700ml' },
  'soju': { abv: '13.0% - 20.0%', size: '360ml' },
  'craft-imported-beer': { abv: '4.2% - 5.5%', size: '330ml (Case of 24)' },
  'non-alcoholic-beer': { abv: '<0.5%', size: '330ml (Case of 24)' },
  'cider': { abv: '4.5% - 5.5%', size: '330ml (Case of 24)' },
  'red-wine': { abv: '13.0% - 14.5%', size: '750ml' },
  'white-wine': { abv: '11.5% - 13.0%', size: '750ml' },
  'rose-wine': { abv: '12.0% - 13.0%', size: '750ml' },
  'sparkling-fortified-wine': { abv: '12.0% - 19.0%', size: '750ml' },
  'vodka-gin-premix': { abv: '4.5% - 6.0%', size: '375ml (Case of 24)' },
  'zero-sugar-seltzers': { abv: '4.5% - 5.0%', size: '330ml (Case of 24)' },
  'mixers-water-condiments': { abv: '0.0%', size: '330ml' },
};

export function styleDefaultsFor(slug) {
  return STYLE_DEFAULTS[slug] || { abv: '40.0%', size: '700ml' };
}

const TASTING_POOLS = {
  whisky: {
    nose: ['dried orchard fruit and toasted oak', 'honeyed malt and gentle spice', 'vanilla, toffee and light citrus zest', 'sherried dried fruit and warm cinnamon', 'heather honey with a whisper of smoke'],
    palate: ['rich caramel and baked apple', 'silky malt with ginger spice', 'dark chocolate and roasted nuts', 'brown sugar, oak and stewed fruit', 'butterscotch and gentle peat warmth'],
    finish: ['long, warming, and gently spiced', 'smooth with a lingering oak sweetness', 'clean and mellow with a honeyed close', 'satisfying with soft smoke and dried fruit'],
  },
  spirit: {
    nose: ['crisp botanicals and clean citrus', 'smooth grain character with mineral freshness', 'agave-forward sweetness with hints of pepper', 'aromatic herbs and delicate florals', 'toasted oak and dried spice'],
    palate: ['clean, rounded, and refreshingly smooth', 'balanced sweetness with a warming spice note', 'silky texture with citrus and pepper', 'full-bodied with vanilla and caramel undertones'],
    finish: ['crisp and clean with a soft warmth', 'smooth and lingering with gentle spice', 'refreshing with a subtle sweet finish', 'long, satisfying, and well-balanced'],
  },
  'beer-premix-wine': {
    nose: ['ripe berry fruit and soft oak', 'crisp citrus and orchard blossom', 'fresh hops and pale malt', 'fine mousse with bright red fruit'],
    palate: ['balanced fruit and refreshing acidity', 'clean malt sweetness with a crisp bite', 'silky texture with elegant fruit layers', 'well-rounded with soft tannins and fruit'],
    finish: ['crisp, refreshing, and well-balanced', 'clean finish with lingering fruit', 'smooth and moreish', 'long, elegant, and food-friendly'],
  },
  other: {
    nose: ['clean grain sweetness and soft florals', 'light citrus and gentle spice', 'fresh and inviting aromatics'],
    palate: ['smooth, light, and easy-drinking', 'clean and refreshingly balanced', 'soft sweetness with a crisp edge'],
    finish: ['clean and refreshing', 'smooth with a light, crisp close', 'well-balanced and moreish'],
  },
};

export function tastingNotesFor(category, seedStr) {
  const pool = TASTING_POOLS[category] || TASTING_POOLS.other;
  const rnd = seededRandom(seedStr);
  const pick = (arr) => arr[Math.floor(rnd() * arr.length) % arr.length];
  return {
    nose: capitalize(pick(pool.nose)) + '.',
    palate: capitalize(pick(pool.palate)) + '.',
    finish: capitalize(pick(pool.finish)) + '.',
  };
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function descriptionFor({ name, brand, subcategoryName, country, secondaryKeywords }) {
  const kw1 = secondaryKeywords[0] || subcategoryName.toLowerCase();
  const kw2 = secondaryKeywords[1] || '';
  return `${name} is one of Doctors of Whisky's hand-selected ${subcategoryName.toLowerCase()} allocations, sourced from ${country} and stored in our Sydney climate-controlled vaults. A genuine choice for anyone searching to ${kw1}${kw2 ? `, or wanting to explore ${kw2}` : ''}. Every bottle from ${brand} is physically inspected and provenance-verified before dispatch, with insured Australian-wide delivery and a 100% authenticity guarantee.`;
}

const QUESTION_TEMPLATES = [
  {
    test: /buy|online|shop/i,
    q: (kw, name) => `Can I buy ${name} online in Australia?`,
    a: (kw, name, ctx) => `Yes — ${name} is available to buy online through Doctors of Whisky, with insured, signature-on-delivery shipping Australia-wide. Orders over $${ctx.freeShippingThreshold} AUD qualify for free express courier, and a 12% discount applies automatically when paying with Bitcoin or USDT.`,
  },
  {
    test: /price|cost|cheap|expensive/i,
    q: (kw, name) => `How much does ${name} cost?`,
    a: (kw, name, ctx) => `${name} is priced at $${ctx.price.toLocaleString()} AUD. Paying via Bitcoin or USDT applies an automatic 12% crypto discount, bringing the price down to approximately $${Math.round(ctx.price * 0.88).toLocaleString()} AUD.`,
  },
  {
    test: /near me|delivery|shipping|deliver/i,
    q: (kw, name) => `Do you deliver ${name} across Australia?`,
    a: (kw, name, ctx) => `Yes — we ship ${name} to every Australian state and territory via insured, discreet courier with signature-on-delivery. Standard shipping is $${ctx.shippingFee} AUD, or free on orders over $${ctx.freeShippingThreshold} AUD.`,
  },
  {
    test: /gift|present/i,
    q: (kw, name) => `Does ${name} make a good gift?`,
    a: (kw, name) => `Absolutely — ${name} arrives in protective, presentation-ready packaging and is a popular choice for birthdays, corporate gifting, and collector milestones. Gift notes can be added at checkout.`,
  },
  {
    test: /abv|percent|proof|strength/i,
    q: (kw, name) => `What is the ABV of ${name}?`,
    a: (kw, name, ctx) => `${name} is bottled at ${ctx.abv} ABV. Full technical specifications are listed in the product details above.`,
  },
  {
    test: /age|years|old|vintage/i,
    q: (kw, name) => `Is ${name} aged, and does that affect the price?`,
    a: (kw, name, ctx) => `${ctx.age ? `Yes — ${name} carries an age statement of ${ctx.age}, which reflects its rarity and cellar condition.` : `${name} does not carry a formal age statement, but every bottle is vintage-verified and inspected prior to sale.`} Provenance and condition are always checked before a bottle enters our vault listings.`,
  },
  {
    test: /best|top|review/i,
    q: (kw, name) => `Why is ${name} considered one of the best in its category?`,
    a: (kw, name, ctx) => `${name} stands out for its ${ctx.subcategoryName.toLowerCase()} craftsmanship, verified provenance, and consistent collector demand. Our Sydney sommelier team hand-selects every allocation for quality before it is listed.`,
  },
];

const FALLBACK_TEMPLATES = [
  {
    q: (kw, name) => `What makes ${name} worth buying?`,
    a: (kw, name, ctx) => `${name} is a genuine, provenance-verified ${ctx.subcategoryName.toLowerCase()} bottle, hand-selected by our Sydney sommelier team and backed by a 100% authenticity guarantee.`,
  },
  {
    q: (kw, name, ctx) => `Is ${name} authentic, and how is it stored?`,
    a: (kw, name, ctx) => `Yes — every bottle is inspected and provenance-verified on arrival, then held in our climate-controlled Sydney vaults at a constant 14°C and 65% humidity until dispatch.`,
  },
  {
    q: (kw, name, ctx) => `What payment options are available for ${name}?`,
    a: (kw, name, ctx) => `${name} can be purchased via PayID, direct bank transfer, or Bitcoin/USDT — crypto payments receive an automatic 12% discount at checkout.`,
  },
  {
    q: (kw, name, ctx) => `How is ${name} packaged for delivery?`,
    a: (kw, name, ctx) => `${name} ships in discreet, shock-proof, fully insured packaging with signature-on-delivery required, protecting the bottle and seal in transit anywhere in Australia.`,
  },
];

export function faqsFor(faqSeeds, ctx) {
  const usedTemplates = new Set();
  const faqs = [];
  for (const seed of faqSeeds) {
    const template = QUESTION_TEMPLATES.find((t) => t.test.test(seed.keyword) && !usedTemplates.has(t));
    if (template) {
      usedTemplates.add(template);
      faqs.push({
        question: template.q(seed.keyword, ctx.name),
        answer: template.a(seed.keyword, ctx.name, ctx),
      });
    }
  }
  let fallbackIdx = 0;
  while (faqs.length < 3) {
    const template = FALLBACK_TEMPLATES[fallbackIdx % FALLBACK_TEMPLATES.length];
    fallbackIdx++;
    if (usedTemplates.has(template)) continue;
    usedTemplates.add(template);
    faqs.push({
      question: template.q('', ctx.name, ctx),
      answer: template.a('', ctx.name, ctx),
    });
  }
  return faqs.slice(0, 3);
}

export function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function metaTitleFor(name) {
  const title = `${name} | Buy Online Australia | Doctors of Whisky`;
  return title.length > 65 ? `${name} | Doctors of Whisky` : title;
}

export function metaDescriptionFor(name, primaryKeyword) {
  const base = `Buy ${name} online in Australia. ${capitalize(primaryKeyword)} experts — Sydney vaults, 100% provenance guarantee, insured delivery, and a 12% crypto discount.`;
  return base.length > 160 ? base.slice(0, 157) + '...' : base;
}
