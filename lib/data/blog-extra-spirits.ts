import type { BlogPost } from '@/lib/types';

const UPDATED = '2026-09-29';
const VODKA = '/shop/spirit/collection/french-vodka/';
const GOOSE = '/shop/spirit/collection/grey-goose/';
const BELVEDERE = '/shop/spirit/collection/belvedere/';
const PATRON = '/shop/spirit/collection/patron/';
const DONJULIO = '/shop/spirit/collection/don-julio/';
const WHITE_TEQUILA = '/shop/spirit/collection/white-tequila/';
const MEZCAL = '/shop/spirit/collection/mezcal/';
const COGNAC = '/shop/spirit/collection/cognac-brandy/';
const GIN = '/shop/spirit/collection/gin/';
const RUM = '/shop/spirit/collection/spiced-rum/';
const WHITE_RUM = '/shop/spirit/collection/white-rum/';
const BAIJIU = '/shop/spirit/collection/baijiu/';
const AMARO = '/shop/spirit/collection/amaro/';
const BAILEYS = '/shop/spirit/collection/baileys-irish-cream/';
const COFFEE = '/shop/spirit/collection/coffee-liqueur/';
const SOJU = '/shop/other/collection/soju/';
const MIXERS = '/shop/other/collection/mixers-water-condiments/';
const GINGER = '/shop/beer-premix-wine/collection/ginger-beer/';

export const BLOG_EXTRA_SPIRITS: Record<string, Partial<BlogPost>> = {
  'how-vodka-is-made': {
    primaryKeyword: 'how is vodka made',
    secondaryKeywords: ['vodka', 'vodka brands', 'premium vodka', 'grey goose vodka', 'belvedere vodka'],
    seoTitle: 'How Is Vodka Made? From Grain to Glass Explained',
    seoDescription: 'How is vodka made? A clear guide to fermentation, distillation and filtration, what vodka is made from, and how to choose a premium bottle.',
    updated: UPDATED,
    keyTakeaways: [
      'Vodka is made by fermenting grain, potatoes or grapes and distilling the result to a very clean, high-strength spirit.',
      'The base ingredient and water shape texture more than most people expect.',
      'Filtration and dilution to bottling strength give vodka its smooth, neutral finish.',
    ],
    sections: [
      {
        heading: 'Step 1: choosing the base ingredient',
        paragraphs: [
          'Vodka can be made from almost any fermentable material. Grain is the most common base, especially wheat and rye, but potatoes, grapes and even sugar beet are used. The base contributes subtle texture: wheat vodkas often taste soft and slightly sweet, rye vodkas can be spicier, and potato vodkas are known for a fuller, creamier mouthfeel.',
          'The producer first turns starch into sugar, usually with malt or enzymes, then adds yeast to ferment the sugars into a low-strength alcoholic mash.',
        ],
        links: [{ text: 'Shop French vodka', href: VODKA }],
      },
      {
        heading: 'Step 2: distillation and filtration',
        paragraphs: [
          'The fermented mash is distilled, often in column stills, to remove water and unwanted flavour compounds and concentrate the alcohol. Many premium vodkas are distilled several times to reach a very high purity, then filtered through charcoal or other media to smooth the spirit further.',
          'Distillers separate the spirit into fractions and keep only the cleanest middle portion, known as the heart, which is why good vodka tastes clean rather than harsh.',
        ],
      },
      {
        heading: 'Step 3: water, dilution and bottling',
        paragraphs: [
          'The purified spirit comes off the still at very high strength, so it is diluted with water to a bottling strength that is typically around 37.5 to 40% ABV. Because water makes up more than half the bottle, its quality has a real effect on texture and taste.',
          'Grey Goose, for example, is a French vodka made from winter wheat, while Belvedere is a Polish vodka made from rye. Compare them in our [Grey Goose collection](/shop/spirit/collection/grey-goose/) and [Belvedere collection](/shop/spirit/collection/belvedere/), or read our [Grey Goose vs Belvedere comparison](/blog/grey-goose-vs-belvedere-vodka-compared/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is vodka made from?', answer: 'Vodka is most often made from grains such as wheat or rye, but it can also be made from potatoes, grapes or sugar beet.' },
      { question: 'How many times is vodka distilled?', answer: 'It varies. Many premium vodkas are distilled several times to reach a very clean spirit, but more distillation does not automatically mean better taste.' },
      { question: 'What is the alcohol content of vodka?', answer: 'Most vodka is bottled at about 37.5 to 40% ABV after being diluted with water.' },
      { question: 'Is premium vodka worth it?', answer: 'Premium vodka is usually smoother and cleaner, which is easier to notice when you drink it chilled or in a martini rather than heavily mixed.' },
    ],
  },

  'tequila-aging-guide-blanco-reposado-anejo': {
    primaryKeyword: 'reposado tequila',
    secondaryKeywords: ['anejo tequila', 'blanco tequila', 'don julio reposado tequila', 'extra anejo tequila', 'tequila aging'],
    seoTitle: 'Blanco, Reposado & Añejo Tequila: The Ageing Guide',
    seoDescription: 'Blanco vs reposado vs añejo tequila explained: ageing times, taste differences, how to serve each and which tequila to buy in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'Blanco is unaged or rested under two months; reposado spends 2 to 12 months in oak; añejo one to three years.',
      'Extra añejo is aged for more than three years and is best sipped neat.',
      'Choose 100% agave tequila for flavour and check the category on the label.',
    ],
    sections: [
      {
        heading: 'Tequila basics: 100% agave vs mixto',
        paragraphs: [
          'Tequila is made from blue Weber agave, mostly in the state of Jalisco in Mexico. A bottle labelled 100% agave uses only agave sugars, while a mixto can include other sugars, up to 49% of the total. For flavour and quality, look for the 100% agave statement on the label.',
          'The ageing category then tells you how long the tequila rested in oak, which shapes both colour and taste.',
        ],
        links: [{ text: 'Shop tequila', href: PATRON }],
      },
      {
        heading: 'Blanco, reposado and añejo compared',
        paragraphs: [
          'Blanco (silver) is unaged or rested for up to two months, so it tastes fresh and peppery with citrus and cooked agave. It is the classic choice for a margarita or Paloma. Reposado rests for two to twelve months in oak, gaining a golden colour and soft notes of vanilla and caramel while keeping agave character.',
          'Añejo is aged for at least one year and up to three, giving deeper oak, spice and dried fruit, and is usually sipped neat. Extra añejo goes beyond three years and is the richest, most whisky-like style.',
        ],
      },
      {
        heading: 'How to serve each style',
        paragraphs: [
          'Use blanco in cocktails and tequila sodas where its bright agave shines. Reposado works both ways: neat, or in an upmarket margarita. Sip añejo and extra añejo from a small glass at room temperature, the way you would a fine Cognac or whisky.',
          'To compare brands, browse our [Don Julio](/shop/spirit/collection/don-julio/) and [Patrón](/shop/spirit/collection/patron/) collections, then read our [Don Julio vs Patrón comparison](/blog/don-julio-vs-patron-tequila-compared/) or the guide to [mezcal vs tequila](/blog/mezcal-vs-tequila-difference/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is the difference between blanco, reposado and añejo tequila?', answer: 'They differ by ageing. Blanco is unaged or rested under two months, reposado is aged 2 to 12 months in oak, and añejo is aged one to three years.' },
      { question: 'Which tequila is best for margaritas?', answer: 'Blanco tequila is the usual choice because its fresh agave and citrus notes shine in a margarita, though a reposado gives a richer version.' },
      { question: 'Is reposado tequila good for sipping?', answer: 'Yes. Reposado is a popular sipping tequila because it has agave freshness plus soft oak and vanilla from its time in the barrel.' },
      { question: 'What does 100% agave mean?', answer: 'It means the tequila is made only from blue Weber agave sugars, with no other added sugars, which is generally associated with better flavour.' },
    ],
  },

  'mezcal-vs-tequila-difference': {
    primaryKeyword: 'mezcal vs tequila',
    secondaryKeywords: ['mezcal', 'what is mezcal', 'mezcal vs tequila taste', 'espadin mezcal', 'smoky mezcal'],
    seoTitle: 'Mezcal vs Tequila: What’s the Difference?',
    seoDescription: 'Mezcal vs tequila explained: agave types, smoky production, regions, taste and how to drink each, plus what to buy in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'Tequila is a type of mezcal made only from blue Weber agave in designated regions.',
      'Mezcal can use many agave species and is traditionally roasted in earthen pits, giving a smoky flavour.',
      'Sip mezcal neat, and use tequila for a wider range of cocktails.',
    ],
    sections: [
      {
        heading: 'What is mezcal?',
        paragraphs: [
          'Mezcal is a Mexican spirit made from agave, and it is protected by a denomination of origin that covers several states, with most produced in Oaxaca. The most common agave is espadín, but producers also use wild varieties such as tobalá.',
          'Traditionally the agave hearts are roasted in earthen pit ovens, crushed, fermented and distilled, which is the source of mezcal’s signature smoky, earthy character.',
        ],
        links: [{ text: 'Shop mezcal', href: MEZCAL }],
      },
      {
        heading: 'How tequila differs',
        paragraphs: [
          'Tequila is technically a kind of mezcal, but it is made only from blue Weber agave and mainly in Jalisco. The agave is usually cooked in steam ovens or autoclaves rather than in earth pits, which gives a cleaner, brighter, less smoky flavour.',
          'Tequila comes in blanco, reposado, añejo and extra añejo styles depending on ageing. Read our [tequila ageing guide](/blog/tequila-aging-guide-blanco-reposado-anejo/) for how each tastes.',
        ],
      },
      {
        heading: 'Which one should you buy?',
        paragraphs: [
          'If you want smoke and complexity to sip slowly, choose mezcal, traditionally served neat with orange slices and sal de gusano. If you want a versatile bottle for margaritas and Palomas, choose a blanco tequila.',
          'Many drinkers keep both: a tequila for everyday cocktails and a mezcal for sipping or for adding a smoky twist to a margarita. Browse our [mezcal](/shop/spirit/collection/mezcal/) and [white tequila](/shop/spirit/collection/white-tequila/) collections to compare.',
        ],
      },
    ],
    faqs: [
      { question: 'Is mezcal the same as tequila?', answer: 'No. Tequila is a specific type of mezcal made only from blue Weber agave in designated regions, while mezcal can be made from many agave species and is often smokier.' },
      { question: 'Why does mezcal taste smoky?', answer: 'Traditional mezcal roasts agave hearts in earthen pits, which gives the spirit its smoky, earthy flavour.' },
      { question: 'How do you drink mezcal?', answer: 'Sip it neat from a small glass, often with orange slices, or use it in cocktails such as a smoky margarita or Paloma.' },
      { question: 'Is mezcal stronger than tequila?', answer: 'They are usually similar in strength, typically 38 to 45% ABV, although some mezcals are bottled at higher proof.' },
    ],
  },

  'cognac-vs-brandy-explained': {
    primaryKeyword: 'what is cognac',
    secondaryKeywords: ['cognac', 'what is brandy', 'cognac vs brandy', 'vsop cognac', 'xo cognac'],
    seoTitle: 'Cognac vs Brandy: What’s the Difference?',
    seoDescription: 'Cognac vs brandy explained: what cognac is, how VS, VSOP and XO are aged, how it differs from other brandy and which bottle to buy.',
    updated: UPDATED,
    keyTakeaways: [
      'All cognac is brandy, but only brandy from the Cognac region of France can be called cognac.',
      'Cognac is double-distilled in copper pot stills and aged in French oak.',
      'VS is aged at least two years, VSOP at least four and XO at least ten.',
    ],
    sections: [
      {
        heading: 'What is brandy?',
        paragraphs: [
          'Brandy is a spirit distilled from wine or other fermented fruit juice. It is made around the world, from Spanish brandy de Jerez to Armagnac in Gascony and grape brandies from Australia and California. Styles range from light and fruity to rich and oaky.',
          'Some brandies are made from fruits other than grapes, such as apple brandy and cherry brandy, which is why the label matters.',
        ],
      },
      {
        heading: 'What is cognac?',
        paragraphs: [
          'Cognac is brandy produced in the Cognac region of south-west France under strict appellation rules. It is made mainly from Ugni Blanc grapes, double-distilled in copper pot stills and aged in French oak. Houses such as Martell, founded in 1715, have shaped the style for centuries.',
          'Age classifications tell you the youngest eau-de-vie in the blend: VS is at least two years, VSOP at least four years, and XO at least ten years.',
        ],
        links: [{ text: 'Shop cognac and brandy', href: COGNAC }],
      },
      {
        heading: 'How to choose and serve',
        paragraphs: [
          'Choose VS for cocktails such as a Sidecar, VSOP for a balanced everyday sipper, and XO when you want depth, dried fruit and spice to sip slowly. Serve cognac neat at room temperature in a tulip glass, or with a splash of water.',
          'Brandy from outside Cognac can offer great value for mixing and cooking. See how cognac fits with other after-dinner drinks in our [amaro guide](/blog/amaro-101-italy-bittersweet-tradition/).',
        ],
      },
    ],
    faqs: [
      { question: 'Is cognac the same as brandy?', answer: 'Cognac is a type of brandy. Only brandy made in the Cognac region of France under its appellation rules can be labelled cognac.' },
      { question: 'What do VS, VSOP and XO mean?', answer: 'They are age classes: VS is aged at least two years, VSOP at least four years, and XO at least ten years.' },
      { question: 'How should I drink cognac?', answer: 'Sip it neat at room temperature from a tulip glass, or use VS and VSOP in cocktails such as the Sidecar.' },
      { question: 'What is a good cognac for gifting?', answer: 'VSOP and XO are the classic gift choices, offering more depth and a more polished presentation than VS.' },
    ],
  },

  'london-dry-vs-contemporary-gin': {
    primaryKeyword: 'london dry gin',
    secondaryKeywords: ['gin', 'pink gin', 'gin brands', 'best gin australia', 'buy gin online'],
    seoTitle: 'London Dry vs Contemporary Gin: Which Should You Buy?',
    seoDescription: 'London dry gin vs contemporary gin explained: what the labels mean, botanicals, how each tastes and the best way to serve gin.',
    updated: UPDATED,
    keyTakeaways: [
      'Gin must taste mainly of juniper; London dry means no flavouring is added after distillation.',
      'Contemporary gins dial down juniper to highlight other botanicals such as citrus, flowers or native Australian ingredients.',
      'Match the gin to the serve: classic London dry for a G&T or martini, contemporary gin for a garnish-led drink.',
    ],
    sections: [
      {
        heading: 'What makes a gin a gin?',
        paragraphs: [
          'Gin is a spirit flavoured with botanicals, and juniper must be the defining flavour. Other common botanicals include coriander seed, angelica root, citrus peel, orris and cassia. Producers steep or redistil these botanicals in a neutral grain spirit to build their recipe.',
          'Most gin is bottled between about 37.5% and 47% ABV, and the label tells you the exact strength.',
        ],
        links: [{ text: 'Shop gin', href: GIN }],
      },
      {
        heading: 'London dry: the classic style',
        paragraphs: [
          'London dry is a production method, not a place. The flavour comes only from natural botanicals added during distillation, and nothing but a trace of sweetener and water can be added afterwards. The result is a crisp, dry, juniper-forward gin that works in a gin and tonic, martini or Negroni.',
          'It does not need to be made in London, and many London dry gins are made around the world, including in Australia.',
        ],
      },
      {
        heading: 'Contemporary and pink gin',
        paragraphs: [
          'Contemporary, or new western, gins keep juniper in the background and bring other botanicals forward, such as citrus, rose, cucumber or native Australian botanicals. Pink gin adds red-fruit flavour and colour, and is usually sweeter.',
          'Serve London dry with tonic, lime or a lemon twist, and contemporary gins with a garnish that matches their botanicals. For more mixing ideas see our [best mixers for a home bar](/blog/best-mixers-for-home-bar/) and [premix trend guide](/blog/ready-to-drink-premix-trend/).',
        ],
      },
    ],
    faqs: [
      { question: 'What does London dry gin mean?', answer: 'It describes a production method: flavour comes from natural botanicals added during distillation, with nothing artificial added afterwards. It does not have to be made in London.' },
      { question: 'What is the difference between London dry and contemporary gin?', answer: 'London dry is juniper-forward and crisp, while contemporary gin plays down juniper to highlight other botanicals.' },
      { question: 'What is the best mixer for gin?', answer: 'Tonic water is the classic choice, and soda water, ginger beer and citrus also work well depending on the gin.' },
      { question: 'What is pink gin?', answer: 'Pink gin is gin flavoured and coloured with red fruits or botanicals, usually sweeter than London dry gin.' },
    ],
  },

  'white-spiced-dark-rum-guide': {
    primaryKeyword: 'spiced rum',
    secondaryKeywords: ['white rum', 'dark rum', 'best dark rum', 'white rum cocktail', 'buy rum online'],
    seoTitle: 'White, Spiced & Dark Rum: A Simple Guide',
    seoDescription: 'White vs spiced vs dark rum explained: how each is made, how they taste, the best cocktails for each and which rum to buy.',
    updated: UPDATED,
    keyTakeaways: [
      'Rum is distilled from sugarcane juice or molasses, and the style depends on ageing and additions.',
      'White rum is light and clean, dark rum is richer and often aged, and spiced rum is flavoured with spices.',
      'Pick by cocktail: white for mojitos and daiquiris, dark for sipping and Dark and Stormy, spiced for cola or ginger beer.',
    ],
    sections: [
      {
        heading: 'White rum',
        paragraphs: [
          'White rum is light-bodied, often aged briefly and filtered to remove colour. It tastes clean with subtle sweetness, which makes it the base for classic cocktails such as the mojito, daiquiri and piña colada.',
          'Because it is delicate, white rum shines when mixed with fresh lime, mint and soda.',
        ],
        links: [{ text: 'Shop white rum', href: WHITE_RUM }],
      },
      {
        heading: 'Dark rum',
        paragraphs: [
          'Dark rum is usually aged in oak or made with heavier molasses, giving flavours of caramel, treacle, dried fruit and spice. Some are coloured with caramel, so the darkness of a rum is not always a guide to its age.',
          'Sip aged dark rum neat, or use it in a Dark and Stormy with ginger beer for a rich, spicy drink.',
        ],
      },
      {
        heading: 'Spiced rum',
        paragraphs: [
          'Spiced rum is rum infused with spices such as vanilla, cinnamon, clove and orange peel. It is sweeter and easier to drink than many aged rums, and is popular with cola, ginger beer or over ice.',
          'Browse our [spiced rum collection](/shop/spirit/collection/spiced-rum/) and pair with [ginger beer](/shop/beer-premix-wine/collection/ginger-beer/), or see our [best mixers for a home bar](/blog/best-mixers-for-home-bar/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is the difference between white, dark and spiced rum?', answer: 'White rum is light and often lightly aged, dark rum is richer and often aged or made from heavier molasses, and spiced rum is flavoured with spices.' },
      { question: 'What is the best rum for cocktails?', answer: 'White rum suits mojitos and daiquiris, dark rum suits the Dark and Stormy, and spiced rum is great with cola or ginger beer.' },
      { question: 'Is spiced rum sweet?', answer: 'Usually yes. Spiced rum is generally sweeter than aged rum, with vanilla, cinnamon and clove flavours.' },
      { question: 'Can I buy rum online in Australia?', answer: 'Yes. Adults aged 18 and over can order rum online from Doctors of Whisky, with insured Australia-wide delivery.' },
    ],
  },

  'what-is-baijiu': {
    primaryKeyword: 'baijiu',
    secondaryKeywords: ['what is baijiu', 'chinese baijiu', 'baijiu alcohol', 'baijiu drink', 'china baijiu'],
    seoTitle: 'What Is Baijiu? China’s Famous Spirit Explained',
    seoDescription: 'What is baijiu? A guide to China’s national spirit: how it is made from sorghum, the main aroma styles, its strength and how to drink it.',
    updated: UPDATED,
    keyTakeaways: [
      'Baijiu is a Chinese grain spirit, most often made from sorghum and fermented with a starter called qu.',
      'The four main aroma styles are strong, light, sauce and rice.',
      'It is typically bottled at 35 to 60% ABV and is sipped from small cups with food.',
    ],
    sections: [
      {
        heading: 'How baijiu is made',
        paragraphs: [
          'Baijiu is one of the world’s most-consumed spirits. It is made from cereals such as sorghum, rice, wheat or corn, which are steamed and fermented with a mould-and-yeast starter called qu. Unlike most whisky or vodka, fermentation is often done as a solid mass in pits or vessels rather than in liquid.',
          'The fermented grain is distilled, sometimes repeatedly, and many baijiu are aged in clay jars before blending and bottling.',
        ],
        links: [{ text: 'Shop baijiu', href: BAIJIU }],
      },
      {
        heading: 'The main baijiu aroma styles',
        paragraphs: [
          'Strong aroma baijiu is fruity and rich, light aroma is clean and delicate, sauce aroma is savoury and deep, and rice aroma is softer and lighter. Each style has its own regional heritage, and the flavours can be surprising to new drinkers.',
          'Baijiu is typically bottled between 35% and 60% ABV, so it is a strong spirit that is usually sipped rather than gulped.',
        ],
      },
      {
        heading: 'How to drink baijiu',
        paragraphs: [
          'Traditionally baijiu is served in small cups during meals and toasts, and drinkers pour for one another. Try a light aroma baijiu first if you are new to the spirit, and pair it with rich, spicy or fatty foods.',
          'If you enjoy Asian spirits, read our guide to [soju](/blog/soju-explained-koreas-spirit/) next, and browse the [baijiu collection](/shop/spirit/collection/baijiu/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is baijiu made from?', answer: 'Baijiu is made from cereals, most often sorghum, fermented with a starter called qu and then distilled.' },
      { question: 'How strong is baijiu?', answer: 'Most baijiu is bottled at around 35 to 60% ABV, and many popular bottles sit at about 52 to 53%.' },
      { question: 'What does baijiu taste like?', answer: 'It depends on the style. Strong aroma is fruity, light aroma is clean, sauce aroma is savoury, and rice aroma is soft.' },
      { question: 'How do you drink baijiu?', answer: 'Sip it neat from small cups, usually with food and during toasts.' },
    ],
  },

  'amaro-101-italy-bittersweet-tradition': {
    primaryKeyword: 'amaro',
    secondaryKeywords: ['amaro montenegro', 'amaro nonino', 'amaro averna', 'italian amaro', 'what is amaro'],
    seoTitle: 'Amaro 101: Italy’s Bittersweet Herbal Liqueur',
    seoDescription: 'What is amaro? A beginner’s guide to Italian bittersweet liqueurs, the main styles, how to drink them and which amaro to try first.',
    updated: UPDATED,
    keyTakeaways: [
      'Amaro is an Italian herbal liqueur that balances bitterness with sweetness.',
      'It is traditionally a digestivo, sipped after a meal.',
      'Try Montenegro or Nonino if you are new, and Aperol or Campari for aperitivo.',
    ],
    sections: [
      {
        heading: 'What is amaro?',
        paragraphs: [
          'Amaro, Italian for bitter, is a herbal liqueur made by infusing herbs, roots, spices and citrus peels in alcohol and sweetening the result. Each producer keeps its recipe secret, and styles range from light and citrusy to dark and medicinal.',
          'Amari are traditionally drunk after dinner as a digestivo, neat or over ice, and they are increasingly used in cocktails.',
        ],
        links: [{ text: 'Shop amaro and Italian bitters', href: AMARO }],
      },
      {
        heading: 'Popular amaro styles to try',
        paragraphs: [
          'Amaro Montenegro is floral and orange-led, Amaro Nonino has a smooth caramel and orange peel character, and Averna is dark, sweet and cola-like. Fernet-style amari are intensely bitter and minty.',
          'Aperol and Campari belong to the wider Italian bitter family and are used as aperitivo, most famously in an Aperol Spritz or a Negroni.',
        ],
      },
      {
        heading: 'How to enjoy amaro',
        paragraphs: [
          'Serve amaro neat, over ice with an orange twist, or lengthened with soda water. In cocktails, it adds bittersweet depth to drinks like the Paper Plane or a Black Manhattan.',
          'For another after-dinner option, compare amaro with a [cognac](/blog/cognac-vs-brandy-explained/), or explore sweeter liqueurs in our [cream and coffee liqueur guide](/blog/best-cream-coffee-liqueurs-for-cocktails/).',
        ],
      },
    ],
    faqs: [
      { question: 'What does amaro taste like?', answer: 'Amaro tastes bittersweet and herbal, often with orange peel, spice and caramel notes, though each brand differs.' },
      { question: 'How do you drink amaro?', answer: 'Neat or over ice as a digestivo, with soda water for a lighter drink, or in cocktails.' },
      { question: 'Is Aperol an amaro?', answer: 'Aperol is a bitter aperitivo, part of the wider Italian bitter family, but it is lighter and sweeter than most amari.' },
      { question: 'Which amaro should I try first?', answer: 'Amaro Montenegro or Nonino are approachable starting points because they are balanced and less bitter.' },
    ],
  },

  'best-cream-coffee-liqueurs-for-cocktails': {
    primaryKeyword: 'coffee liqueur',
    secondaryKeywords: ['kahlua coffee liqueur', 'baileys irish cream', 'coffee liqueur cocktails', 'best coffee liqueur', 'espresso martini'],
    seoTitle: 'Best Cream & Coffee Liqueurs for Cocktails',
    seoDescription: 'The best cream and coffee liqueurs for cocktails: Baileys, Kahlúa and more, with easy espresso martini and White Russian recipes.',
    updated: UPDATED,
    keyTakeaways: [
      'Coffee liqueur is the key to an espresso martini and a White Russian.',
      'Baileys Irish Cream combines Irish whiskey and cream and is great over ice or in coffee.',
      'Use fresh espresso and good ice to lift a simple liqueur cocktail.',
    ],
    sections: [
      {
        heading: 'Coffee liqueur',
        paragraphs: [
          'Coffee liqueur blends coffee flavour with sugar and spirit, with Kahlúa the best-known example. It is the essential ingredient in an espresso martini, which combines vodka, coffee liqueur and freshly made espresso, and in a White Russian, which adds cream.',
          'Use it straight over ice, drizzle it over ice cream, or add it to hot chocolate for a quick dessert drink.',
        ],
        links: [{ text: 'Shop coffee liqueur', href: COFFEE }],
      },
      {
        heading: 'Cream liqueur',
        paragraphs: [
          'Baileys Irish Cream is made from Irish whiskey and cream, and launched in Dublin in 1974. It is smooth and sweet with chocolate and vanilla notes and is served over ice, in coffee, or poured over desserts.',
          'Keep an opened bottle in a cool place and use it within the time printed on the label.',
        ],
        links: [{ text: 'Shop Baileys Irish Cream', href: BAILEYS }],
      },
      {
        heading: 'Three easy cocktails',
        paragraphs: [
          'Espresso martini: shake 45 ml vodka, 30 ml coffee liqueur and a fresh shot of espresso with ice, then strain. White Russian: pour 45 ml vodka and 30 ml coffee liqueur over ice and top with cream. Baileys coffee: stir a measure of Baileys into hot coffee and top with whipped cream.',
          'Balance is easy to adjust, so add a little more liqueur for sweetness. For more ideas see our [best mixers guide](/blog/best-mixers-for-home-bar/) and [vodka guide](/blog/how-vodka-is-made/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is coffee liqueur used for?', answer: 'It is used in cocktails such as the espresso martini and White Russian, and can be poured over ice cream or into hot chocolate.' },
      { question: 'What is Baileys made from?', answer: 'Baileys is an Irish cream liqueur made from Irish whiskey and cream.' },
      { question: 'How do you make an espresso martini?', answer: 'Shake vodka, coffee liqueur and fresh espresso with ice, then strain into a chilled glass.' },
      { question: 'Do cream liqueurs need refrigeration?', answer: 'Unopened bottles can be stored in a cool place, but check the label for storage and best-before guidance once opened.' },
    ],
  },

  'soju-explained-koreas-spirit': {
    primaryKeyword: 'soju alcohol',
    secondaryKeywords: ['alcohol content soju', 'soju alcohol percentage', 'jinro soju', 'soju drink', 'buy soju online'],
    seoTitle: 'Soju Explained: Korea’s Most Popular Spirit',
    seoDescription: 'What is soju? Learn what Korean soju is made from, its alcohol percentage, how to drink it and which soju to try first.',
    updated: UPDATED,
    keyTakeaways: [
      'Soju is a clear Korean spirit traditionally made from rice.',
      'Modern green-bottle soju is usually 16 to 20% ABV, while traditional soju can be much stronger.',
      'It is served chilled, often in shots with food, or mixed in cocktails.',
    ],
    sections: [
      {
        heading: 'What is soju?',
        paragraphs: [
          'Soju is a clear, lightly sweet Korean spirit. Traditional soju is distilled from rice and can be bottled at 35% ABV or more, but most of what people drink today is a diluted soju made from starches such as tapioca or sweet potato, which became common when rice was restricted in Korea in the second half of the 20th century.',
          'That is why the familiar green bottle soju is much lighter, usually around 16 to 20% ABV, than a spirit like vodka.',
        ],
        links: [{ text: 'Shop soju', href: SOJU }],
      },
      {
        heading: 'How to drink soju',
        paragraphs: [
          'Serve soju well chilled, poured into small shot glasses and shared with food such as Korean barbecue. Korean etiquette has you pour for others and receive a pour with both hands.',
          'Mix it into cocktails too: somaek is soju with beer, and flavoured soju is popular with fruit juice or soda.',
        ],
      },
      {
        heading: 'Soju alcohol percentage',
        paragraphs: [
          'Check the label: standard bottles are usually 16 to 20% ABV, some flavoured soju is lower, and premium or traditional soju can be much higher. A 360 ml bottle contains several standard drinks, so pace yourself.',
          'If you like Asian spirits, also read about [baijiu](/blog/what-is-baijiu/), and see our [soju collection](/shop/other/collection/soju/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is soju made from?', answer: 'Traditional soju is made from rice, but many modern sojus are made from starches such as tapioca or sweet potato.' },
      { question: 'What is the alcohol percentage of soju?', answer: 'Most standard soju is about 16 to 20% ABV, though traditional soju can be much stronger.' },
      { question: 'How do you drink soju?', answer: 'Chilled and neat in small glasses with food, or mixed with beer, juice or soda.' },
      { question: 'Is soju stronger than wine?', answer: 'Soju is typically stronger than wine but weaker than vodka or whisky.' },
    ],
  },

  'don-julio-vs-patron-tequila-compared': {
    primaryKeyword: 'don julio tequila',
    secondaryKeywords: ['patron tequila', 'don julio reposado tequila', 'don julio 1942', 'patron silver', 'don julio vs patron'],
    seoTitle: 'Don Julio vs Patrón: Which Tequila Should You Buy?',
    seoDescription: 'Don Julio vs Patrón compared: history, range, taste differences for blanco, reposado and añejo, and which suits cocktails or sipping.',
    updated: UPDATED,
    keyTakeaways: [
      'Both are premium 100% blue agave tequilas from Jalisco.',
      'Don Julio was founded in 1942 by Don Julio González; Patrón is known for its handcrafted, widely available range.',
      'Both are excellent in margaritas, and the aged expressions are made for sipping.',
    ],
    sections: [
      {
        heading: 'Two premium tequilas',
        paragraphs: [
          'Don Julio and Patrón are two of the best-known premium tequilas in the world, both made from 100% Weber blue agave in Jalisco, Mexico. Don Julio was founded in 1942 by Don Julio González in Atotonilco el Alto and is famous for its 1942 añejo.',
          'Patrón is known for a handcrafted process and a clean, agave-forward style that made it one of the most recognised premium tequilas.',
        ],
        links: [{ text: 'Shop Don Julio', href: DONJULIO }, { text: 'Shop Patrón', href: PATRON }],
      },
      {
        heading: 'How they compare, style by style',
        paragraphs: [
          'Blanco: both are fresh and peppery with cooked agave and citrus, and either suits a margarita. Reposado: Don Julio Reposado leans toward oak, vanilla and soft spice, while Patrón Reposado is smooth and lightly sweet.',
          'Añejo: both offer caramel, vanilla and toasted oak, best sipped neat. The best way to decide is to taste blanco and reposado side by side.',
        ],
      },
      {
        heading: 'Which should you buy?',
        paragraphs: [
          'For margaritas and Palomas, a blanco from either brand is a solid choice. For sipping or gifting, an añejo or Don Julio 1942 offers depth and presentation.',
          'Read more about ageing in our [tequila ageing guide](/blog/tequila-aging-guide-blanco-reposado-anejo/) and see how agave spirits differ in [mezcal vs tequila](/blog/mezcal-vs-tequila-difference/).',
        ],
      },
    ],
    faqs: [
      { question: 'Is Don Julio better than Patrón?', answer: 'Neither is objectively better. Both are premium 100% agave tequilas, and the choice comes down to taste, style and budget.' },
      { question: 'Which is smoother, Don Julio or Patrón?', answer: 'Both are smooth. Don Julio’s aged styles tend to show more oak and vanilla, while Patrón is often clean and lightly sweet.' },
      { question: 'What is Don Julio 1942?', answer: 'It is an añejo tequila from Don Julio, named for the year the brand was founded and typically sipped neat.' },
      { question: 'Can I buy Don Julio and Patrón online in Australia?', answer: 'Yes. Both are available from Doctors of Whisky, with insured delivery Australia-wide for buyers aged 18 and over.' },
    ],
  },

  'grey-goose-vs-belvedere-vodka-compared': {
    primaryKeyword: 'grey goose vodka',
    secondaryKeywords: ['belvedere vodka', 'grey goose vs belvedere', 'premium vodka', 'best vodka', 'polish rye vodka'],
    seoTitle: 'Grey Goose vs Belvedere: Which Premium Vodka Wins?',
    seoDescription: 'Grey Goose vs Belvedere vodka compared: French wheat vs Polish rye, taste, best serves and which premium vodka to buy.',
    updated: UPDATED,
    keyTakeaways: [
      'Grey Goose is a French wheat vodka; Belvedere is a Polish rye vodka.',
      'Grey Goose is smooth and slightly sweet, while Belvedere is creamy with a little pepper and vanilla.',
      'Both excel in a martini or served ice-cold.',
    ],
    sections: [
      {
        heading: 'Where they come from',
        paragraphs: [
          'Grey Goose is made in the Cognac region of France from winter wheat and spring water. Belvedere is made in Poland from rye, a grain with a long history in Polish vodka making. The base grain is the main reason the two taste different.',
        ],
        links: [{ text: 'Shop Grey Goose', href: GOOSE }, { text: 'Shop Belvedere', href: BELVEDERE }],
      },
      {
        heading: 'Taste and texture',
        paragraphs: [
          'Grey Goose tends to taste soft and rounded with a hint of sweetness and a silky finish. Belvedere is fuller and creamier, with subtle vanilla and a touch of white pepper from the rye.',
          'Chill both and taste them neat to notice the difference, then try them in a martini, where subtle grain character matters.',
        ],
      },
      {
        heading: 'Best serves',
        paragraphs: [
          'Both are made for martinis and vodka sodas with fresh citrus. Choose Grey Goose for a smooth, clean drink and Belvedere for extra body. See our guide to [how vodka is made](/blog/how-vodka-is-made/) for more on grain and distillation.',
        ],
      },
    ],
    faqs: [
      { question: 'Is Grey Goose or Belvedere better?', answer: 'Both are premium vodkas. Grey Goose is smoother and slightly sweeter, while Belvedere is creamier with a little spice, so the better choice is a matter of taste.' },
      { question: 'What is Grey Goose made from?', answer: 'Grey Goose is made from winter wheat in France.' },
      { question: 'What is Belvedere made from?', answer: 'Belvedere is made from Polish rye.' },
      { question: 'How should I drink premium vodka?', answer: 'Serve it ice-cold, in a martini, or with soda and citrus so its texture can be appreciated.' },
    ],
  },

  'best-mixers-for-home-bar': {
    primaryKeyword: 'best mixers for spirits',
    secondaryKeywords: ['ginger beer', 'tonic water', 'soda water', 'cocktail mixers', 'home bar essentials'],
    seoTitle: 'Best Mixers for a Home Bar: Spirits and What to Pair',
    seoDescription: 'The best mixers for a home bar: tonic, soda, ginger beer, cola and more, with simple pairings for whisky, gin, vodka, rum and tequila.',
    updated: UPDATED,
    keyTakeaways: [
      'A few mixers cover most classic drinks: soda, tonic, ginger beer and citrus.',
      'Good ice and fresh citrus improve any mixed drink.',
      'Match the mixer to the spirit: tonic with gin, ginger beer with vodka or rum, soda with whisky.',
    ],
    sections: [
      {
        heading: 'The essential mixers',
        paragraphs: [
          'Start with soda water, tonic water and ginger beer. Add cola, ginger ale and a bottle of vermouth if you enjoy stirred cocktails, plus fresh limes and lemons. Buying smaller bottles keeps mixers fizzy.',
          'Ginger beer is worth choosing carefully because it carries a drink like the Moscow Mule and Dark and Stormy.',
        ],
        links: [{ text: 'Shop ginger beer', href: GINGER }, { text: 'Shop mixers', href: MIXERS }],
      },
      {
        heading: 'What to pair with each spirit',
        paragraphs: [
          'Whisky: soda water or ginger ale for a highball. Gin: tonic and a citrus twist. Vodka: soda and lime, or ginger beer for a Moscow Mule. Rum: cola with lime for a Cuba Libre, or ginger beer for a Dark and Stormy. Tequila: grapefruit soda for a Paloma, or lime and soda.',
          'Use about one part spirit to two or three parts mixer, then adjust to taste.',
        ],
      },
      {
        heading: 'Tips for better drinks',
        paragraphs: [
          'Chill glasses, use plenty of large ice cubes so drinks dilute slowly, and pour mixer gently down the side of the glass to keep the fizz. Fresh citrus makes a bigger difference than most people expect.',
          'To learn more about the spirits themselves, read about [gin](/blog/london-dry-vs-contemporary-gin/), [rum](/blog/white-spiced-dark-rum-guide/) and [premixes](/blog/ready-to-drink-premix-trend/).',
        ],
      },
    ],
    faqs: [
      { question: 'What are the best mixers for whisky?', answer: 'Soda water and ginger ale are classic highball mixers, and cola or ginger beer work well with bourbon and blended Scotch.' },
      { question: 'What goes with gin?', answer: 'Tonic water is the classic partner, with soda, ginger beer or citrus as alternatives.' },
      { question: 'What mixer goes with vodka?', answer: 'Soda and lime, cranberry, orange juice or ginger beer are all popular choices.' },
      { question: 'How much mixer should I use?', answer: 'A good starting point is one part spirit to two or three parts mixer, adjusted to taste.' },
    ],
  },
};
