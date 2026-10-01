import type { BlogPost } from '@/lib/types';

const UPDATED = '2026-10-01';

/** Long-form guides, batch 5 (rosé, sparkling and port, premix, seltzers, mixers). Keyword volumes / KD are from the keyword bank. */
export const BLOG_LONG_5: Record<string, Partial<BlogPost>> = {
  // sparkling rose 1000/12 · moscato rose 1000/11 · chandon rose 1000/15 · rose fizzy wine 1000/12
  'everything-about-rose-wine': {
    primaryKeyword: 'sparkling rose',
    secondaryKeywords: ['chandon rose', 'moscato rose', 'rose fizzy wine', 'rose in wine', 'rose a wine', 'rose wine online delivery', 'rose red wine'],
    seoTitle: 'Rosé Wine and Sparkling Rosé: Styles, Serving and Buying',
    seoDescription: 'Rosé wine explained: how rosé is made, dry vs sweet and sparkling rosé styles, Provence, Chandon and Champagne rosé, plus how to serve and pair it.',
    updated: UPDATED,
    keyTakeaways: [
      'Most rosé is made from red grapes with limited skin contact, not by blending red and white wine.',
      'Colour does not indicate sweetness: pale pink rosé is not automatically dry and dark pink is not automatically sweet.',
      'Sparkling rosé ranges from Australian Chandon to Champagne rosé such as Laurent-Perrier.',
      'Serve rosé well chilled, at about 8 to 10 degrees, and drink it young.',
    ],
    sections: [
      {
        heading: 'What is rosé wine?',
        paragraphs: [
          'Rosé is a pink wine made from red grapes. The pink colour comes from brief contact between the grape juice and the grape skins, which hold the pigment. The longer the skin contact, the deeper the colour, and winemakers control it precisely.',
          'Rosé is made all over the world, from Provence and the Rhône in France to Spain, Italy, the United States and Australia. It is made as still wine, sparkling wine and sweet or off-dry wine, so the word on its own tells you little about style.',
        ],
      },
      {
        heading: 'How is rosé made?',
        paragraphs: [
          'There are three main methods. In direct press, red grapes are crushed and pressed quickly so only a little colour is extracted. In maceration, the juice stays in contact with skins for a few hours before pressing. In saignée (“bleeding”), some pink juice is run off early from a red wine fermentation, which concentrates the red and gives a bonus rosé.',
          'Blending red and white wine is generally not allowed in quality still rosé. Champagne is a famous exception, where blending still red wine into white base wine is permitted. Laurent-Perrier’s Cuvée Rosé is made by maceration instead, which is rare and prized.',
        ],
      },
      {
        heading: 'Is rosé wine dry or sweet?',
        paragraphs: [
          'It can be either. Provence-style rosé is pale, bone-dry and crisp, with flavours of strawberry, citrus and herbs. Many New World and Portuguese rosés are fruitier and off-dry. White Zinfandel and Moscato rosé are noticeably sweet.',
          'The colour is not a reliable guide. Look at the tasting notes, region and style on the label, or search for “dry rosé” if you want crisp and savoury. [Cruse Rosé Dry](/shop/beer-premix-wine/cruse-rose-dry-rose-wine/) is an example of a dry style, while [Mateus Rosé](/shop/beer-premix-wine/mateus-rose-rose-wine/), the famous Portuguese flask-shaped bottle, is off-dry and lightly fizzy.',
        ],
        links: [{ text: 'Shop rosé wine', href: '/shop/beer-premix-wine/collection/rose-wine/' }],
      },
      {
        heading: 'What is sparkling rosé?',
        paragraphs: [
          'Sparkling rosé combines the fruit of rosé with bubbles. It is made by the traditional method, with a second fermentation in the bottle as in Champagne, or by the tank method, as in many Prosecco-style wines. It tastes of red berries, with crisp acidity and a creamy mousse.',
          'It is a popular choice for celebrations, brunch and gifting. [Chandon Sparkling Rosé](/shop/beer-premix-wine/chandon-sparkling-rose-rose-wine/) comes from Domaine Chandon in Australia’s Yarra Valley, [Moët Rosé Impérial](/shop/beer-premix-wine/moet-rose-imperial-sparkling-wine/) is a Champagne, and [Laurent-Perrier Cuvée Rosé](/shop/beer-premix-wine/laurent-perrier-cuvee-rose-rose-wine/) is one of the most famous Champagne rosés.',
        ],
        links: [{ text: 'Shop sparkling wine', href: '/shop/beer-premix-wine/collection/sparkling/' }],
      },
      {
        heading: 'What food goes with rosé?',
        paragraphs: [
          'Rosé is one of the most food-friendly wines. Dry rosé suits salads, grilled seafood, charcuterie, Mediterranean dishes and light curries. Fuller rosés match barbecue chicken and pork, and sparkling rosé works with sushi, canapés and fried food.',
          'It is also the classic wine for hot weather and long lunches, because it is refreshing and light but has more body than many whites.',
        ],
      },
      {
        heading: 'How should you serve rosé?',
        paragraphs: [
          'Serve rosé well chilled, at 8 to 10 degrees. Take it out of the fridge a few minutes before pouring if it is very cold. Use a white wine glass for still rosé and a flute or tulip glass for sparkling.',
          'Most rosé is made to be enjoyed within one to two years of the vintage, because freshness is the point. Store unopened bottles in a cool, dark place, and refrigerate opened bottles with a stopper for two to three days. Compare with other styles in our [white wine guide](/blog/white-wine-styles-explained/).',
        ],
      },
      {
        heading: 'How do you choose and buy rosé?',
        paragraphs: [
          'Decide the occasion first. For a picnic or barbecue, choose a dry still rosé. For celebrations, choose a sparkling rosé. For casual sipping, a fruity off-dry rosé is easy to enjoy. Check the vintage and drink the latest one you can find.',
          'See the full range in our [rosé wine collection](/shop/beer-premix-wine/collection/rose-wine/). Buyers must be 18 or over, and standard drinks are shown on every label.',
        ],
      },
    ],
    faqs: [
      { question: 'What is rosé wine?', answer: 'Rosé is a pink wine made from red grapes with brief contact with the skins, which gives the colour.' },
      { question: 'Is rosé made by mixing red and white wine?', answer: 'Generally no. Most rosé is made by pressing red grapes or by short skin contact. Champagne is a notable exception where blending is allowed.' },
      { question: 'Is rosé dry or sweet?', answer: 'It can be either. Provence-style rosé is dry, while some New World and Portuguese rosés are fruity or sweet. Colour does not indicate sweetness.' },
      { question: 'What temperature should rosé be served?', answer: 'Rosé is best served well chilled, at about 8 to 10 degrees Celsius.' },
      { question: 'What is sparkling rosé?', answer: 'Sparkling rosé is a pink wine with bubbles, made by the traditional or tank method. Examples include Chandon and Champagne rosés.' },
      { question: 'How long does rosé last?', answer: 'Most rosé is best within one to two years of the vintage. Opened bottles keep for two to three days in the fridge.' },
    ],
  },

  // champagne 18100/19 · prosecco 22200/27 · piper heidsieck champagne 3600/20 · dom perignon champagne 1900/18
  'champagne-vs-sparkling-wine-vs-port': {
    primaryKeyword: 'champagne',
    secondaryKeywords: ['prosecco', 'moet champagne', 'piper heidsieck champagne', 'perrier jouet champagne', 'dom perignon champagne', 'sparkling wine australia', 'sparkling red'],
    seoTitle: 'Champagne vs Sparkling Wine vs Port: What’s the Difference?',
    seoDescription: 'Champagne vs sparkling wine vs Prosecco vs Port explained: how each is made, how to read Brut and Extra Dry labels, and which to buy for a celebration.',
    updated: UPDATED,
    keyTakeaways: [
      'Champagne is sparkling wine made in the Champagne region of France by the traditional method.',
      'Prosecco is an Italian sparkling wine made mostly by the tank method, and is usually fruitier and lighter.',
      'Port is a fortified, usually sweet red wine from Portugal’s Douro Valley, much stronger than sparkling wine.',
      'On a label, Brut is dry, and Extra Dry is slightly sweeter.',
    ],
    sections: [
      {
        heading: 'What is Champagne?',
        paragraphs: [
          'Champagne is a sparkling wine made in the Champagne region of north-eastern France, from Chardonnay, Pinot Noir and Pinot Meunier. The name is legally protected, and in Australia only wines from that region can be sold as Champagne.',
          'It is made by the traditional method (méthode champenoise): a second fermentation takes place inside the bottle, the wine rests on its yeast lees, and the bottle is later disgorged. Non-vintage Champagne must age at least 15 months, and vintage Champagne at least three years, so it tastes toasty, creamy and complex.',
        ],
      },
      {
        heading: 'What is the difference between Champagne and sparkling wine?',
        paragraphs: [
          'All Champagne is sparkling wine, but not all sparkling wine is Champagne. Sparkling wine is any wine with bubbles, made anywhere in the world by different methods. Australian sparkling wines made by the traditional method, such as Chandon’s, can be excellent and cost less.',
          'Champagne is prized for its cool chalky terroir, long ageing and consistency of house style. Browse our [sparkling wine collection](/shop/beer-premix-wine/collection/sparkling/) to compare, including [Moët & Chandon Impérial](/shop/beer-premix-wine/moet-chandon-imperial-bottle-sparkling-wine/) and [Piper-Heidsieck Cuvée](/shop/beer-premix-wine/piper-heidsieck-champagne-cuvee-sparkling-wine/).',
        ],
        links: [{ text: 'Shop sparkling wine', href: '/shop/beer-premix-wine/collection/sparkling/' }],
      },
      {
        heading: 'How is Prosecco different?',
        paragraphs: [
          'Prosecco is an Italian sparkling wine made mainly from the Glera grape in the Veneto and Friuli regions. It is usually made by the tank (Charmat) method, in which the second fermentation takes place in a large pressurised tank, which preserves fresh fruit aromas.',
          'The result is light, fruity and floral, with notes of green apple, pear and white flowers, and softer bubbles. It is usually cheaper than Champagne and excellent for spritzes, mimosas and casual celebrations.',
        ],
      },
      {
        heading: 'How do you read Brut and Extra Dry?',
        paragraphs: [
          'The sweetness level is on the label. From driest to sweetest the main terms are Brut Nature, Extra Brut, Brut, Extra Dry (or Extra Sec), Sec and Demi-Sec. Brut is the standard dry style. Extra Dry, confusingly, is slightly sweeter than Brut.',
          'Dosage, a small addition of sugar and wine before final corking, sets the sweetness. If you prefer crisp wine, choose Brut or drier. If you prefer something softer, Extra Dry or Demi-Sec will taste rounder.',
        ],
      },
      {
        heading: 'What is Port?',
        paragraphs: [
          'Port is a fortified wine from the Douro Valley in Portugal. Grape spirit is added during fermentation, which stops it early and leaves natural sweetness, and raises the strength to around 19 to 22 per cent ABV. Ruby Port is fruity and young, Tawny Port is aged in barrels and tastes of nuts, caramel and dried fruit, and Vintage Port is made only in exceptional years and aged in the bottle.',
          'Port is served after dinner with cheese, nuts and chocolate, and is far richer than sparkling wine. See the [port wine collection](/shop/beer-premix-wine/collection/port-wine/), including [Sandeman Port](/shop/beer-premix-wine/sandeman-port-port/) and the Australian fortified [Penfolds Grandfather](/shop/beer-premix-wine/penfolds-grandfather-port/).',
        ],
        links: [{ text: 'Shop port wine', href: '/shop/beer-premix-wine/collection/port-wine/' }],
      },
      {
        heading: 'Which should you buy for a celebration?',
        paragraphs: [
          'For a special toast, choose Champagne. [Dom Pérignon Vintage Rosé](/shop/beer-premix-wine/dom-perignon-vintage-rose-champagne-2008/) is a prestige cuvée, and [Laurent-Perrier Brut](/shop/beer-premix-wine/laurent-perrier-brut-nogb-sparkling-wine/) is a classic. For a crowd or a brunch, choose Prosecco or Australian sparkling. For after dinner, offer Port.',
          'Chill sparkling wine to 6 to 8 degrees, open gently and pour into a tulip-shaped glass. If you are choosing for a gift, a gift-boxed Champagne is a safe, impressive option.',
        ],
      },
      {
        heading: 'Is there such a thing as sparkling red?',
        paragraphs: [
          'Yes. Australia is known for sparkling Shiraz, a rich, fruity, slightly sweet red with bubbles, traditionally served at Christmas and with barbecued meat. Italy’s Lambrusco is a lighter, fizzy red.',
          'For more on styles, see our guides to [rosé wine](/blog/everything-about-rose-wine/) and [how to choose red wine](/blog/how-to-choose-red-wine/). Buyers must be 18 or over.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the difference between Champagne and sparkling wine?', answer: 'Champagne is sparkling wine from the Champagne region of France, made by the traditional method. Sparkling wine is any wine with bubbles made anywhere.' },
      { question: 'What is the difference between Champagne and Prosecco?', answer: 'Champagne is French and made by the traditional method with long ageing, while Prosecco is Italian, usually made by the tank method and tastes fruitier and lighter.' },
      { question: 'What does Brut mean on Champagne?', answer: 'Brut means dry. It is the most common style, and Extra Dry is slightly sweeter than Brut.' },
      { question: 'What is Port?', answer: 'Port is a sweet fortified wine from Portugal’s Douro Valley, made by adding grape spirit during fermentation.' },
      { question: 'How cold should Champagne be served?', answer: 'Champagne is best served at about 6 to 8 degrees Celsius.' },
      { question: 'Can Australian sparkling wine be called Champagne?', answer: 'No. The name Champagne is reserved for sparkling wine from the Champagne region of France.' },
    ],
  },

  // premixed drinks 1300/18 · premix drinks 1000/17 · vodka premix 590/13 · tequila premix 480/11
  'ready-to-drink-premix-trend': {
    primaryKeyword: 'premixed drinks',
    secondaryKeywords: ['premix drinks', 'vodka premix', 'tequila premix', 'gin and tonic premix', 'pink gin premix', 'vodka premix cans', 'vodka soda premix'],
    seoTitle: 'Premixed Drinks in Australia: Vodka, Gin and Tequila',
    seoDescription: 'Premixed drinks explained: why ready-to-drink cocktails are booming in Australia, how to read standard drinks and sugar, and which vodka and gin premix to buy.',
    updated: UPDATED,
    keyTakeaways: [
      'Premixed drinks are ready-to-drink cocktails and spirit mixers in cans or bottles, usually 4 to 7 per cent ABV.',
      'Quality has improved a lot, with real spirits, better flavours and lower-sugar options.',
      'Check the standard drinks on the label: a 375 mL can at 5% is about 1.5 standard drinks.',
      'They suit barbecues, parties and the beach, where convenience matters.',
    ],
    sections: [
      {
        heading: 'What are premixed drinks?',
        paragraphs: [
          'Premixed drinks, often called premix or RTD (ready-to-drink), are pre-made alcoholic beverages sold in cans or bottles. They combine a spirit such as vodka, gin, rum or tequila with a mixer, and sometimes juice, flavour and sweetener, so they are ready to drink straight from the can.',
          'In Australia, premix is a huge category. It ranges from simple vodka sodas and gin and tonics to cocktail-inspired flavours such as mojito, margarita and pornstar martini.',
        ],
      },
      {
        heading: 'Why are premixed drinks so popular?',
        paragraphs: [
          'Convenience is the main reason. A can needs no glass, ice, mixer or measuring, which suits barbecues, picnics, festivals and boat trips. Premix also offers consistency: every can tastes the same.',
          'Quality has improved too. Early premixes were often sweet and artificial, while newer products use real spirits, natural flavour and lower sugar. Zero-sugar and lower-calorie versions are now widely available, and brands are releasing new flavours constantly.',
        ],
      },
      {
        heading: 'How strong are premixed drinks?',
        paragraphs: [
          'Most premix is between 4 and 7 per cent ABV, though some are stronger. Check the standard-drink count printed on every can. A 375 mL can at 5 per cent contains about 1.5 standard drinks, so a four-pack is around six.',
          'Because premix tastes light and sweet, it is easy to drink faster than you realise. Pace yourself, alternate with water and keep count. The Australian guidelines recommend no more than four standard drinks on any one day.',
        ],
      },
      {
        heading: 'What types of premix can you buy?',
        paragraphs: [
          'Vodka premix includes vodka sodas, vodka lemonades and cocktail flavours. Gin premix includes gin and tonic and pink gin and lemonade. Tequila premix includes margarita and tequila soda, and rum premix includes mojito and dark and stormy styles.',
          'Our [vodka premix collection](/shop/beer-premix-wine/collection/vodka-premix/) includes cases of 24 cans from brands such as 24 Ice, including [24 Ice Gin & Tonic](/shop/beer-premix-wine/24-ice-gin-tonic/), [Margarita](/shop/beer-premix-wine/24-ice-margarita-vodka-premix/) and [Mojito](/shop/beer-premix-wine/24-ice-mojito-vodka-premix/), plus [Hard Rated 30 Pack](/shop/beer-premix-wine/hard-rated-30-pack-vodka-premix/).',
        ],
        links: [{ text: 'Shop vodka premix', href: '/shop/beer-premix-wine/collection/vodka-premix/' }],
      },
      {
        heading: 'How do you choose a good premix?',
        paragraphs: [
          'Check the ABV and standard drinks, then the sugar and calories if you care about them. Look at the ingredients: real spirit, natural flavour and carbonated water are good signs. Choose a flavour you already enjoy as a cocktail, because premix tastes like a simplified version of the drink.',
          'If you are buying for a party, buy a mix of flavours and ABV levels, include non-alcoholic options and keep everything cold.',
        ],
      },
      {
        heading: 'Is premix cheaper than making cocktails?',
        paragraphs: [
          'Per drink, premix is often cheaper than buying a bottle of spirit plus mixers, especially for cocktails with several ingredients. For a large group it can save time and money. If you drink often and enjoy mixing, making your own gives better quality and more control.',
          'A simple bar kit is a good compromise: see our [guide to mixers for a home bar](/blog/best-mixers-for-home-bar/). You can also read about [low-sugar seltzers](/blog/rise-of-zero-sugar-seltzers/).',
        ],
      },
      {
        heading: 'How should you store and serve premix?',
        paragraphs: [
          'Store cans in a cool, dark place and chill before serving. Drink within the best-before date, because flavour and carbonation fade over time. Serve over ice in a glass if you want to taste the flavour properly.',
          'Buyers must be 18 or over, and you should not drive after drinking. Recycle cans after use.',
        ],
      },
    ],
    faqs: [
      { question: 'What are premixed drinks?', answer: 'Premixed drinks are ready-to-drink alcoholic beverages in cans or bottles, combining a spirit with a mixer and flavouring.' },
      { question: 'How many standard drinks are in a can of premix?', answer: 'A 375 mL can at 5% ABV contains about 1.5 standard drinks. Check the label for the exact number.' },
      { question: 'Is premix less alcoholic than spirits?', answer: 'Yes per serve, as most premix is 4 to 7% ABV, but it is easy to drink quickly, so count standard drinks.' },
      { question: 'What is the best vodka premix?', answer: 'It depends on taste. Look for real spirit, lower sugar and a flavour you enjoy, and compare brands such as 24 Ice and Hard Rated.' },
      { question: 'Are premixes gluten-free?', answer: 'Many are, but not all. Check the label if you need gluten-free drinks.' },
      { question: 'How long does premix last?', answer: 'Premix lasts until the best-before date on the can if stored cool and dark, but flavour and carbonation are best when fresh.' },
    ],
  },

  // vodka soda premix 320/11 · hard rated zero sugar 720/10 · zero sugar drinks 320/16 · fellr seltzer 480/14
  'rise-of-zero-sugar-seltzers': {
    primaryKeyword: 'vodka soda premix',
    secondaryKeywords: ['hard rated zero sugar', 'zero sugar drinks', 'fellr seltzer', 'zero sugar', 'zero sugar beverages', 'premix drinks', 'low sugar alcohol'],
    seoTitle: 'Zero Sugar Seltzers and Vodka Soda: A Low-Sugar Guide',
    seoDescription: 'Zero sugar seltzers and vodka soda premix explained: how they are made, how to read the label for sugar and standard drinks, and how to choose well.',
    updated: UPDATED,
    keyTakeaways: [
      'Hard seltzers are alcoholic sparkling water with a light flavour, and many are low in sugar or sugar free.',
      'Vodka soda premixes are a close cousin, using spirit rather than a fermented base.',
      'Always read the nutrition panel and the standard-drink count on the label.',
      '“Zero sugar” is not the same as “zero alcohol”, and the ABV is still typically 4 to 5 per cent.',
    ],
    sections: [
      {
        heading: 'What is a hard seltzer?',
        paragraphs: [
          'A hard seltzer is carbonated water mixed with alcohol and a light fruit flavour. The alcohol comes either from a fermented sugar or malt base, or from a distilled spirit such as vodka. The drink is usually clear, light and low in calories, with a typical strength of 4 to 5 per cent ABV.',
          'Hard seltzer took off first in the United States and then in Australia, where it fitted the demand for lighter, lower-sugar drinks that suit warm weather.',
        ],
      },
      {
        heading: 'How is vodka soda premix different?',
        paragraphs: [
          'A vodka soda premix is simply vodka, soda water and flavour in a can. Some seltzers use a fermented base rather than vodka, and some drinks are blended spirits. The practical difference is mostly in taste: spirit-based premixes often taste cleaner and crisper.',
          'Browse our [vodka premix collection](/shop/beer-premix-wine/collection/vodka-premix/) and [zero sugar seltzers collection](/shop/beer-premix-wine/collection/zero-sugar-seltzers/) to compare packs and flavours.',
        ],
        links: [{ text: 'Shop zero sugar seltzers', href: '/shop/beer-premix-wine/collection/zero-sugar-seltzers/' }],
      },
      {
        heading: 'What does zero sugar really mean?',
        paragraphs: [
          'Under food labelling rules, claims such as “zero sugar” or “sugar free” must meet specific criteria, and a drink can contain alcohol and still be low or free of sugar. Alcohol itself is not sugar, but it does contribute calories.',
          'Always check the nutrition information panel on the can, which shows sugars per 100 mL and per serve. Compare two products by that figure rather than relying on the claim on the front of the pack.',
        ],
      },
      {
        heading: 'Are zero sugar seltzers healthier?',
        paragraphs: [
          'They can be a lighter choice than sugary premixes, because they have less sugar and fewer calories. They are still alcoholic drinks, and alcohol carries health risks. The Australian guidelines recommend no more than ten standard drinks a week and no more than four on any one day.',
          'Treat zero-sugar seltzers as a lighter alternative rather than a health product, and check the label for the number of standard drinks.',
        ],
      },
      {
        heading: 'How do you compare seltzer brands?',
        paragraphs: [
          'Look at five things: ABV, standard drinks per can, sugar per 100 mL, flavour range and pack size. Some brands are sold in cases of 24 cans, which suits parties and good value, while others come in 4 or 6 packs.',
          'Then taste a few flavours. Citrus and berry are the most popular, but tropical and stone fruit options are growing. If you want something stronger or sweeter, read our [premix guide](/blog/ready-to-drink-premix-trend/).',
        ],
      },
      {
        heading: 'How do you serve seltzers?',
        paragraphs: [
          'Serve very cold, in the can, or over ice with a slice of citrus or fresh fruit. You can also use vodka soda premix as a base: add a squeeze of lime, or a splash of juice for a longer drink.',
          'For mixed drinks you make yourself, a good soda water and fresh citrus are the key. See [our guide to the best mixers](/blog/best-mixers-for-home-bar/).',
        ],
      },
      {
        heading: 'What should you know before buying?',
        paragraphs: [
          'Check the best-before date, the ABV and the standard-drink count. Seltzers taste best fresh and cold. Store cans away from heat and sunlight.',
          'Buyers must be 18 or over. If you are watching sugar or calories, always compare the nutrition panel rather than the marketing on the front of the can.',
        ],
      },
    ],
    faqs: [
      { question: 'What is a hard seltzer?', answer: 'A hard seltzer is carbonated water with alcohol and light fruit flavour, usually 4 to 5% ABV and low in sugar and calories.' },
      { question: 'Is a zero sugar seltzer alcohol free?', answer: 'No. Zero sugar describes sugar content only. Most zero sugar seltzers still contain alcohol, typically 4 to 5% ABV.' },
      { question: 'How many standard drinks are in a seltzer can?', answer: 'It varies, but a 330 mL can at 5% ABV contains about 1.3 standard drinks. Check the label.' },
      { question: 'What is vodka soda premix?', answer: 'It is a ready-to-drink mix of vodka, soda water and flavour in a can.' },
      { question: 'Are seltzers healthier than beer?', answer: 'They are often lower in sugar and calories, but they are still alcoholic drinks and should be consumed in moderation.' },
      { question: 'How should seltzers be served?', answer: 'Serve them very cold, straight from the can or over ice with citrus.' },
    ],
  },

  // does ginger beer have alcohol 390/10 · indian tonic water 590/15 · alcoholic ginger beer 3600/18 · hard ginger beer 480/10
  'best-mixers-for-home-bar': {
    primaryKeyword: 'does ginger beer have alcohol',
    secondaryKeywords: ['alcoholic ginger beer', 'indian tonic water', 'hard ginger beer', 'ginger beer australia', 'gin and tonic cans', 'what is ginger beer', 'is root beer the same as ginger beer'],
    seoTitle: 'Best Mixers for a Home Bar: Tonic, Ginger Beer and Soda',
    seoDescription: 'The best mixers for a home bar: tonic, ginger beer, soda and mineral water, plus does ginger beer have alcohol, classic ratios and storage tips.',
    updated: UPDATED,
    keyTakeaways: [
      'A good mixer makes up most of a drink, so quality matters as much as the spirit.',
      'Most ginger beer in shops is non-alcoholic, but alcoholic ginger beer exists and is labelled with its ABV.',
      'Use small bottles or cans so that tonic, soda and ginger beer stay fizzy.',
      'A simple home bar needs tonic, soda water, ginger beer, citrus, bitters and good ice.',
    ],
    sections: [
      {
        heading: 'Why do mixers matter so much?',
        paragraphs: [
          'In a gin and tonic, a vodka soda or a Moscow Mule, the mixer is two-thirds of what you taste. A flat, sugary or cheap mixer can ruin a good spirit, while a crisp, well-balanced one lifts even an everyday bottle.',
          'Freshness is the first rule. Carbonation fades quickly after opening, so use small bottles or cans and finish them on the day. The second rule is balance: match the sweetness and strength of the mixer to the spirit.',
        ],
      },
      {
        heading: 'Does ginger beer have alcohol?',
        paragraphs: [
          'Most ginger beer sold in supermarkets and bottle shops is non-alcoholic, meaning under 0.5 per cent ABV, because it is brewed lightly or made as a soft drink. Alcoholic ginger beer, sometimes called hard ginger beer, is a different product with an ABV on the label, typically 4 to 5 per cent.',
          'Always check the label. Ginger beer is not the same as ginger ale, which is milder and sweeter, and it is not the same as root beer, which is a different flavour. A strongly gingery ginger beer is best for a Moscow Mule or Dark ’n’ Stormy. See the [ginger beer collection](/shop/beer-premix-wine/collection/ginger-beer/) and [Ginger Kid Ginger Beer](/shop/beer-premix-wine/ginger-kid-ginger-beer/).',
        ],
        links: [{ text: 'Shop ginger beer', href: '/shop/beer-premix-wine/collection/ginger-beer/' }],
      },
      {
        heading: 'What is the best tonic water?',
        paragraphs: [
          'Indian tonic water, flavoured with quinine, is the standard choice for gin. Premium tonics use natural quinine and less sugar, and they let delicate gins show through. Light or slim tonics reduce sugar and calories.',
          'A good ratio is one part gin to two or three parts tonic, over plenty of ice. See our [gin style guide](/blog/london-dry-vs-contemporary-gin/) for matching gin and tonic, or buy a ready-made [24 Ice Gin & Tonic](/shop/beer-premix-wine/24-ice-gin-tonic/).',
        ],
      },
      {
        heading: 'Why is soda and sparkling water useful?',
        paragraphs: [
          'Soda water adds fizz without flavour, which makes it perfect for highballs such as whisky and soda, vodka soda and Campari soda. A good sparkling mineral water has finer bubbles and a cleaner taste than basic soda.',
          'Keep a few small bottles of sparkling water. [San Pellegrino](/shop/other/san-pellegrino-500ml-plastic-mixers-water-condiments/) is a classic choice and is also good served on its own.',
        ],
        links: [{ text: 'Shop mixers and water', href: '/shop/other/collection/mixers-water-condiments/' }],
      },
      {
        heading: 'What bitters, citrus and garnishes should you keep?',
        paragraphs: [
          'A bottle of Angostura bitters will improve Old Fashioneds and many other classics. Fresh lemons and limes are essential, along with oranges for whisky drinks. Olives, cocktail onions and a jar of good cherries cover martinis and Manhattans.',
          'Ice matters as much as any ingredient. Use large, clear cubes for sipping drinks and plenty of ice for long drinks, because more ice means less dilution.',
        ],
      },
      {
        heading: 'What are the classic ratios?',
        paragraphs: [
          'Gin and tonic: 1 part gin to 2 or 3 parts tonic. Moscow Mule: 45 mL vodka, lime juice and ginger beer. Dark ’n’ Stormy: dark rum with ginger beer and lime. Whisky highball: 1 part whisky to 3 parts soda. Vodka soda: 1 part vodka to 3 parts soda with lime.',
          'Start with these, then adjust to taste. See our guides to [dark, white and spiced rum](/blog/white-spiced-dark-rum-guide/) and [how vodka is made](/blog/how-vodka-is-made/) for choosing the base spirit.',
        ],
      },
      {
        heading: 'How should you store mixers?',
        paragraphs: [
          'Store mixers in a cool, dark place and refrigerate before use. Once opened, a bottle of tonic or soda is best finished within a day, since it loses fizz quickly. Cans and small bottles stay fresher than a large bottle you open repeatedly.',
          'Buyers of alcohol must be 18 or over. If you serve non-drinkers, offer the same quality mixers with a squeeze of citrus.',
        ],
      },
    ],
    faqs: [
      { question: 'Does ginger beer have alcohol?', answer: 'Most commercial ginger beer is non-alcoholic (under 0.5% ABV), but alcoholic ginger beer exists and is labelled with its ABV, usually 4 to 5%.' },
      { question: 'What is the difference between ginger beer and ginger ale?', answer: 'Ginger beer has a stronger, spicier ginger flavour, while ginger ale is milder and sweeter.' },
      { question: 'What is the best mixer for vodka?', answer: 'Soda water with lime, tonic or ginger beer are all classic mixers for vodka.' },
      { question: 'What is Indian tonic water?', answer: 'Indian tonic water is a carbonated mixer flavoured with quinine, the standard tonic used for gin and tonic.' },
      { question: 'Is root beer the same as ginger beer?', answer: 'No. Root beer is a different flavour, made with sassafras or similar flavours, while ginger beer is flavoured with ginger.' },
      { question: 'How long do mixers stay fizzy once opened?', answer: 'Tonic and soda are best used within a day of opening, as they lose carbonation quickly.' },
    ],
  },
};
