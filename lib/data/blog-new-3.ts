import { newGuide } from '@/lib/data/blog-new-helpers';

const VODKA = '/shop/spirit/collection/vodka/';
const TEQUILA = '/shop/spirit/collection/white-tequila/';
const RUM = '/shop/spirit/collection/spiced-rum/';
const LIQUEUR = '/shop/spirit/collection/liqueur/';
const AUSBEER = '/shop/beer-premix-wine/collection/australian-beer/';
const LAGER = '/shop/beer-premix-wine/collection/lager/';
const COFFEE = '/shop/spirit/collection/coffee-liqueur/';
const BAILEYS = '/shop/spirit/collection/baileys-irish-cream/';
const PREMIX = '/shop/beer-premix-wine/collection/vodka-premix/';

export const NEW_GUIDES_3 = [
  newGuide({
    slug: 'vodka-brands-absolut-skyy-titos-how-to-choose',
    title: 'Absolut Vodka, Skyy and Tito’s: Vodka Brands and How to Choose a Bottle',
    seoTitle: 'Absolut Vodka, Skyy and Tito’s: How to Choose Vodka',
    excerpt: 'What vodka is made from, how Absolut, Skyy, Tito’s and Haku differ, and how to choose vodka for martinis, mixers or sipping.',
    category: 'Spirits Guide',
    image: '/images/blog/shared/home-bar.webp',
    primaryKeyword: 'absolut vodka',
    relatedSubcategory: 'vodka',
    lead: 'Absolut vodka, Skyy, Tito’s and Haku are four very different answers to the same question: what should a good vodka taste like? This guide explains what vodka is made from, how filtration and distillation shape style, how the main brands differ, and how to match a bottle to a martini, a mixed drink or a chilled sip.',
    takeaways: [
      'Vodka can be made from grain, potatoes, corn, rice or other fermentable materials.',
      'Filtration and distillation shape how clean and smooth a vodka tastes.',
      'Mixers hide small differences, so spend more on vodka you plan to sip or stir into a martini.',
      'Serve vodka very cold, and store the bottle in the freezer if you like it neat.',
    ],
    sections: [
      {
        heading: 'What is vodka made from?',
        paragraphs: [
          'Vodka is a clear spirit distilled from any fermentable material. Wheat, rye and corn are common, and potatoes, grapes and rice are also used. The raw material gives subtle differences in texture and flavour, from soft and creamy to peppery and clean.',
          'After distillation the spirit is diluted with water to bottling strength, commonly around 37.5 to 40 percent ABV, and is often filtered.',
        ],
        links: [{ text: 'Shop vodka', href: VODKA }],
      },
      {
        heading: 'What is Absolut vodka?',
        paragraphs: [
          'Absolut is a Swedish vodka made from winter wheat grown near Åhus in southern Sweden. It is known for a clean, slightly grainy character, and for its range of flavoured vodkas.',
          'It is a reliable, widely available choice for mixed drinks, and a good everyday vodka for martinis and highballs.',
        ],
      },
      {
        heading: 'What is Skyy vodka?',
        paragraphs: [
          'Skyy is an American vodka from San Francisco, known for its blue bottle and a clean, crisp, light style. It is widely used as a mixing vodka in bars.',
          'If you want a neutral base for cocktails and long drinks, a clean vodka like this does the job without getting in the way of the other ingredients.',
        ],
      },
      {
        heading: 'What is Tito’s vodka?',
        paragraphs: [
          'Tito’s is a vodka from Austin, Texas, distilled from corn in pot stills. It has a slightly sweet, smooth character and has become one of the best-known craft-style vodkas in the world.',
          'Its slight sweetness makes it pleasant over ice and in simple mixed drinks such as a vodka soda with lime.',
        ],
      },
      {
        heading: 'What is Haku vodka?',
        paragraphs: [
          'Haku is a Japanese vodka made from rice, with a soft, clean, slightly sweet profile. Rice gives a gentle, silky texture that suits sipping and delicate cocktails.',
          'It is a good choice if you want to try something different from grain and potato vodkas.',
        ],
      },
      {
        heading: 'Does filtration matter?',
        paragraphs: [
          'Filtration removes impurities and softens the spirit. Many vodkas are filtered through charcoal, and some use other materials. More filtration usually means a cleaner, more neutral taste, while less filtration can leave more character.',
          'Quality and the number of distillations matter more than marketing claims. Taste a few and choose the style you like.',
        ],
      },
      {
        heading: 'Which vodka is best for a martini?',
        paragraphs: [
          'A vodka martini is vodka stirred or shaken with a splash of dry vermouth and served very cold with an olive or lemon twist. Because there is nowhere to hide, choose a smooth vodka you enjoy neat.',
          'Pair it with a good dry vermouth from our [vermouth collection](/shop/spirit/collection/amaro/), and chill the glass in the freezer.',
        ],
      },
      {
        heading: 'Which vodka is best for mixed drinks?',
        paragraphs: [
          'For vodka soda, a vodka and tonic, a Moscow Mule or a Bloody Mary, a clean mid-priced vodka is enough. Strong mixers hide the finer details of premium bottles.',
          'If you prefer ready-made drinks, our [vodka premix range](' + PREMIX + ') is a convenient option.',
        ],
      },
      {
        heading: 'How do you choose a vodka?',
        paragraphs: [
          'Decide on the purpose: a clean everyday vodka for mixing, a smooth premium vodka for martinis and sipping, or a flavoured vodka for easy drinks. Check the ABV, the size and the base material.',
          'See the current bottles in our [vodka collection](' + VODKA + '). We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What is Absolut vodka made from?', answer: 'Absolut is a Swedish vodka made from winter wheat grown in southern Sweden.' },
      { question: 'What is Tito’s vodka made from?', answer: 'Tito’s is made from corn and distilled in pot stills in Austin, Texas.' },
      { question: 'What is Haku vodka made from?', answer: 'Haku is a Japanese vodka made from rice.' },
      { question: 'Should vodka be kept in the freezer?', answer: 'It can be. Vodka’s alcohol content stops it freezing solid, and chilling gives a thicker, smoother texture for sipping.' },
      { question: 'Which vodka is best for a martini?', answer: 'A smooth vodka you enjoy neat is best, because a martini is mostly vodka with a little dry vermouth.' },
      { question: 'Where can I buy vodka online in Australia?', answer: 'You can buy vodka online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Vodka', url: 'https://en.wikipedia.org/wiki/Vodka' },
      { text: 'Wikipedia: Distilled beverage', url: 'https://en.wikipedia.org/wiki/Distilled_beverage' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),

  newGuide({
    slug: 'anejo-tequila-guide-reposado-blanco-brands',
    title: 'Anejo Tequila Guide: Anejo, Reposado and Blanco Tequila Brands',
    seoTitle: 'Anejo Tequila Guide: Anejo, Reposado and Blanco',
    excerpt: 'Anejo tequila explained: how it differs from blanco and reposado, how it is aged, and how to choose between Casamigos, Espolòn, El Jimador and Fortaleza.',
    category: 'Spirits Guide',
    image: '/images/blog/shared/barrel-room.webp',
    primaryKeyword: 'anejo tequila',
    relatedSubcategory: 'white-tequila',
    lead: 'Anejo tequila is tequila aged in oak barrels for at least one year, which gives it a darker colour and flavours of vanilla, caramel and spice. This guide explains how anejo differs from blanco and reposado, how tequila is made, and how to choose between brands such as Casamigos, Espolòn, El Jimador and Fortaleza.',
    takeaways: [
      'Tequila is made from blue Weber agave, mainly in Jalisco, Mexico.',
      'Blanco is unaged or aged briefly, reposado is aged two to twelve months, and anejo is aged one to three years.',
      'Extra anejo is aged for more than three years and is best sipped neat.',
      'For quality, look for bottles labelled 100 percent agave.',
    ],
    sections: [
      {
        heading: 'What is anejo tequila?',
        paragraphs: [
          'Anejo, meaning aged, is tequila matured in oak barrels for at least one year and less than three years. The time in wood darkens the spirit and adds vanilla, caramel, dried fruit and baking spice to the agave flavour.',
          'It is the style most often compared with whisky or cognac, and it is best sipped slowly rather than used in a margarita.',
        ],
        links: [{ text: 'Shop tequila', href: TEQUILA }],
      },
      {
        heading: 'What are the types of tequila?',
        paragraphs: [
          'Blanco, or silver, is unaged or aged for up to two months and tastes of fresh agave, citrus and pepper. Reposado is aged for between two and twelve months and is smoother, with light oak. Anejo is aged for one to three years, and extra anejo for more than three years.',
          'Joven, or gold, tequila is often a blend of blanco and aged tequila, or colour and flavour added to a mixto. See our [tequila ageing guide](/blog/tequila-aging-guide-blanco-reposado-anejo/) for more detail.',
        ],
      },
      {
        heading: 'What does 100 percent agave mean?',
        paragraphs: [
          'Tequila made from 100 percent blue Weber agave uses only agave sugars, while a mixto can contain up to 49 percent other sugars. The 100 percent agave label is a good sign of quality and a fuller agave flavour.',
          'Check the label for this statement, particularly for reposado and anejo tequilas that you plan to sip.',
        ],
      },
      {
        heading: 'What is Casamigos tequila?',
        paragraphs: [
          'Casamigos is a tequila brand founded by George Clooney and Rande Gerber and sold in blanco, reposado and anejo styles. It is known for a smooth, slightly sweet, approachable character.',
          'It is a popular choice for gifts and for people who prefer a softer style of tequila.',
        ],
      },
      {
        heading: 'What are Espolòn, El Jimador and Fortaleza?',
        paragraphs: [
          'Espolòn is a widely available tequila with a clean, fresh blanco and an oak-influenced reposado and anejo. El Jimador is a well-known everyday tequila, popular for margaritas and mixed drinks. Fortaleza is a small-batch tequila appreciated by enthusiasts for its traditional production.',
          'Between them, they cover mixing, everyday sipping and collecting. Compare them in our [tequila collection](' + TEQUILA + ').',
        ],
      },
      {
        heading: 'How do you drink anejo tequila?',
        paragraphs: [
          'Sip anejo neat at room temperature in a small tulip glass, or with one large ice cube. Take small sips and let the oak, vanilla and spice develop.',
          'A little water can open the aromas. Avoid mixing a good anejo with strong flavours.',
        ],
      },
      {
        heading: 'What cocktails use tequila?',
        paragraphs: [
          'The margarita, paloma and tequila sunrise are the best-known tequila cocktails and work best with blanco or reposado. An old-fashioned made with anejo is a good way to experience the aged style.',
          'Browse our [mezcal range](/shop/spirit/collection/mezcal/) if you also enjoy smoky agave spirits.',
        ],
      },
      {
        heading: 'How should you store tequila?',
        paragraphs: [
          'Store tequila upright in a cool place away from sunlight. Unlike wine, it does not age in the bottle, so a bottle opened years later tastes the same as the day it was bottled.',
          'Keep it sealed to avoid evaporation and keep the bottle upright so the spirit does not rot the cork.',
        ],
      },
      {
        heading: 'How do you choose a tequila?',
        paragraphs: [
          'Choose blanco for margaritas and cocktails, reposado for a smooth all-rounder and anejo or extra anejo for sipping. Look for the 100 percent agave statement and check the size and ABV.',
          'We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What is anejo tequila?', answer: 'Anejo tequila is aged in oak barrels for at least one year and less than three, giving it a darker colour and flavours of vanilla, caramel and spice.' },
      { question: 'What is the difference between reposado and anejo?', answer: 'Reposado is aged for two to twelve months, while anejo is aged for one to three years and tastes richer and more oaky.' },
      { question: 'Is anejo tequila good for margaritas?', answer: 'Blanco or reposado is usually better for margaritas. Anejo is best sipped neat.' },
      { question: 'What does 100 percent agave tequila mean?', answer: 'It means the spirit is made only from blue Weber agave sugars, with no added sugars from other sources.' },
      { question: 'Does tequila age in the bottle?', answer: 'No. Once bottled, tequila does not mature further.' },
      { question: 'Where can I buy tequila online in Australia?', answer: 'You can buy tequila online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Tequila', url: 'https://en.wikipedia.org/wiki/Tequila' },
      { text: 'Tequila Regulatory Council (CRT)', url: 'https://www.crt.org.mx/' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),

  newGuide({
    slug: 'malibu-rum-and-coconut-rum-what-they-are',
    title: 'Malibu Rum and Coconut Rum: What They Are and How to Drink Them',
    seoTitle: 'Malibu Rum and Coconut Rum: What They Are and Serves',
    excerpt: 'Malibu rum and coconut rum explained: what they are made from, how strong they are, and the best ways to drink them in a piña colada or with pineapple.',
    category: 'Spirits Guide',
    image: '/images/blog/shared/home-bar.webp',
    primaryKeyword: 'malibu rum',
    relatedSubcategory: 'spiced-rum',
    lead: 'Malibu rum is a coconut-flavoured Caribbean rum liqueur, and coconut rum more broadly is rum flavoured with coconut for easy, tropical drinks. This guide explains what Malibu and other coconut rums are, how strong they are, how they differ from traditional rum, and the best ways to drink them.',
    takeaways: [
      'Malibu is a coconut-flavoured spirit based on Caribbean rum, bottled at a lower strength than standard rum.',
      'Coconut rum suits piña coladas, pineapple and lime drinks, and simple highballs.',
      'Traditional rum is distilled from sugarcane juice or molasses and ranges from white to dark and spiced.',
      'Serve coconut rum cold over plenty of ice.',
    ],
    sections: [
      {
        heading: 'What is Malibu rum?',
        paragraphs: [
          'Malibu is a coconut-flavoured spirit made with Caribbean rum and coconut flavour. It is lighter, sweeter and lower in alcohol than a standard rum, commonly bottled at around 21 percent ABV.',
          'It is widely used in mixed drinks and is one of the best-known coconut rums in the world.',
        ],
        links: [{ text: 'Shop rum', href: RUM }],
      },
      {
        heading: 'What is coconut rum?',
        paragraphs: [
          'Coconut rum is rum flavoured with coconut, either by infusing or by adding natural flavours, and usually sweetened. Some are rum liqueurs and some are flavoured rums with a higher alcohol content, so check the label.',
          'The coconut character is creamy and tropical, which makes it a popular base for beach-style cocktails.',
        ],
      },
      {
        heading: 'How is traditional rum made?',
        paragraphs: [
          'Rum is distilled from sugarcane juice or molasses, fermented and then aged for different lengths of time. White rum is light and clean, golden and dark rums are aged in oak for more flavour, and spiced rum is flavoured with spices and vanilla.',
          'Coconut rum starts from this base and adds flavour. See our guide to [white, spiced and dark rum](/blog/white-spiced-dark-rum-guide/) for the main styles.',
        ],
      },
      {
        heading: 'How do you make a piña colada?',
        paragraphs: [
          'A piña colada blends rum, coconut cream and pineapple juice with ice until smooth. Malibu or another coconut rum adds extra coconut flavour and softens the drink.',
          'Serve it in a tall glass with a wedge of pineapple. Use fresh, cold ingredients for the best texture.',
        ],
      },
      {
        heading: 'What are the best easy mixers for Malibu?',
        paragraphs: [
          'Pineapple juice is the classic partner, and cranberry juice, orange juice, lime and soda or lemonade also work well. Malibu and cola is another popular casual serve.',
          'Use plenty of ice and a squeeze of fresh lime to balance the sweetness.',
        ],
      },
      {
        heading: 'How strong is coconut rum?',
        paragraphs: [
          'Malibu is around 21 percent ABV, noticeably lower than a standard rum at 37.5 percent or more. Some other coconut rums are stronger, so check the label.',
          'Even a lighter spirit is alcohol, so measure your serves and drink responsibly.',
        ],
      },
      {
        heading: 'Which food goes with coconut rum drinks?',
        paragraphs: [
          'Coconut and pineapple drinks match well with grilled prawns, jerk chicken, fish tacos and barbecue. Their sweetness balances spicy and salty dishes.',
          'For a party, serve them with fresh fruit, nuts and light snacks.',
        ],
      },
      {
        heading: 'How should you store coconut rum?',
        paragraphs: [
          'Store the bottle upright in a cool, dark place. Coconut liqueurs keep well when sealed, though flavour can fade over a long time once opened, so use the bottle within a year or so.',
          'Keep it away from heat and direct sunlight.',
        ],
      },
      {
        heading: 'How do you choose a rum?',
        paragraphs: [
          'Choose coconut rum for sweet, tropical drinks, white rum for mojitos and daiquiris, and dark or spiced rum for sipping and rum and cola. Check the ABV and the size.',
          'See the current bottles in our [rum collection](' + RUM + '). We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What is Malibu rum?', answer: 'Malibu is a coconut-flavoured spirit based on Caribbean rum, lighter and sweeter than standard rum.' },
      { question: 'How strong is Malibu?', answer: 'It is commonly bottled at around 21 percent ABV. Check the label of the bottle you buy.' },
      { question: 'What goes well with Malibu?', answer: 'Pineapple juice is the classic mixer, and cranberry, orange, lime and soda or cola also work.' },
      { question: 'Is coconut rum the same as regular rum?', answer: 'No. It is rum or a rum-based spirit flavoured with coconut and usually sweetened.' },
      { question: 'How do you make a piña colada?', answer: 'Blend rum, coconut cream and pineapple juice with ice until smooth and serve in a tall glass.' },
      { question: 'Where can I buy rum online in Australia?', answer: 'You can buy rum online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Rum', url: 'https://en.wikipedia.org/wiki/Rum' },
      { text: 'Wikipedia: Piña colada', url: 'https://en.wikipedia.org/wiki/Pi%C3%B1a_colada' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),

  newGuide({
    slug: 'popular-liqueurs-licor-43-sour-puss-elderflower-amaretto',
    title: 'Sour Puss, Licor 43 and Elderflower Liqueur: A Guide to Popular Liqueurs',
    seoTitle: 'Sour Puss, Licor 43 and Elderflower Liqueur Guide',
    excerpt: 'A guide to popular liqueurs: what Sour Puss, Licor 43, Dom Bénédictine, elderflower liqueur and amaretto are, and how to drink them.',
    category: 'Spirits Guide',
    image: '/images/blog/shared/home-bar.webp',
    primaryKeyword: 'sour puss',
    relatedSubcategory: 'liqueur',
    lead: 'Sour Puss, Licor 43, Dom Bénédictine, elderflower liqueur and amaretto are some of the most searched liqueurs in Australia, each with a very different flavour. This guide explains what liqueurs are, how these popular bottles taste, and how to serve them neat, over ice, in coffee or in cocktails.',
    takeaways: [
      'A liqueur is a sweetened spirit flavoured with fruit, herbs, spices, cream or other ingredients.',
      'Licor 43 is a Spanish vanilla and citrus liqueur; Dom Bénédictine is a French herbal liqueur.',
      'Amaretto is almond-flavoured and elderflower liqueur is floral and sweet.',
      'Serve liqueurs chilled or over ice, and use them sparingly in cocktails.',
    ],
    sections: [
      {
        heading: 'What is a liqueur?',
        paragraphs: [
          'A liqueur is a spirit that has been sweetened and flavoured with ingredients such as fruit, herbs, spices, nuts, coffee or cream. Strength varies widely, from around 15 to 40 percent ABV.',
          'Liqueurs are used in cocktails, served after dinner, poured over desserts and stirred into coffee.',
        ],
        links: [{ text: 'Shop liqueurs', href: LIQUEUR }],
      },
      {
        heading: 'What is Sour Puss?',
        paragraphs: [
          'Sour Puss is a sour-flavoured liqueur range popular in Australia, with tart, fruity flavours. It is usually served well chilled, in shots, or mixed with soda or lemonade.',
          'Because it is sweet and tangy, a little goes a long way. Keep the bottle in the fridge or freezer and drink it responsibly.',
        ],
      },
      {
        heading: 'What is Licor 43?',
        paragraphs: [
          'Licor 43 is a Spanish liqueur flavoured with citrus and vanilla, made from a recipe said to use 43 ingredients, and bottled at around 31 percent ABV. It is golden, sweet and smooth.',
          'It is delicious over ice, in coffee (a Carajillo is a classic mix with espresso) and in desserts and cocktails.',
        ],
      },
      {
        heading: 'What is Dom Bénédictine?',
        paragraphs: [
          'Dom Bénédictine is a French herbal liqueur from Fécamp in Normandy, made from a blend of botanicals and bottled at around 40 percent ABV. It has notes of honey, spice, herbs and orange peel.',
          'It is sipped after dinner, or mixed with brandy in a drink known as B and B. It also appears in classic cocktails such as the Vieux Carré.',
        ],
      },
      {
        heading: 'What is elderflower liqueur?',
        paragraphs: [
          'Elderflower liqueur is made from the blossoms of the elder tree, with a delicate, floral, lychee-like sweetness. It is a favourite for light, fresh cocktails.',
          'Add a measure to sparkling wine, gin and tonic or a vodka soda for a floral twist. It also pairs well with prosecco in a spritz.',
        ],
      },
      {
        heading: 'What is amaretto?',
        paragraphs: [
          'Amaretto is an Italian liqueur flavoured with almonds or apricot kernels, with a sweet marzipan-like taste. It is bottled at around 20 to 28 percent ABV.',
          'Serve it over ice, with coffee, or in an amaretto sour, one of the most popular classic cocktails.',
        ],
      },
      {
        heading: 'How do you serve liqueurs?',
        paragraphs: [
          'Sip liqueurs neat or over ice after dinner, add them to coffee, or use them as cocktail ingredients. Creamy liqueurs such as [Baileys](' + BAILEYS + ') and coffee liqueurs from our [coffee liqueur range](' + COFFEE + ') suit dessert drinks.',
          'Keep fruit and cream liqueurs cold. Herbal liqueurs are best at room temperature or over ice.',
        ],
      },
      {
        heading: 'How long do liqueurs last?',
        paragraphs: [
          'Sugar and alcohol preserve liqueurs, so unopened bottles keep for years. Cream liqueurs are the exception and should be refrigerated and used within the date on the label.',
          'Keep all liqueurs sealed, away from heat and sunlight, to protect flavour and colour.',
        ],
      },
      {
        heading: 'How do you choose a liqueur?',
        paragraphs: [
          'Choose by flavour and occasion: a vanilla liqueur for dessert, a herbal liqueur for after dinner, a floral liqueur for light cocktails, and a tangy liqueur for chilled drinks. Check the ABV and the size.',
          'See the current bottles in our [liqueur collection](' + LIQUEUR + '). We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What is Sour Puss?', answer: 'Sour Puss is a tart, fruit-flavoured sour liqueur range popular in Australia, usually served chilled.' },
      { question: 'What is Licor 43 made from?', answer: 'Licor 43 is a Spanish liqueur flavoured with citrus and vanilla, from a recipe said to use 43 ingredients.' },
      { question: 'What is Dom Bénédictine?', answer: 'It is a French herbal liqueur from Fécamp, made from botanicals and bottled at around 40 percent ABV.' },
      { question: 'What does amaretto taste like?', answer: 'Amaretto tastes sweet and nutty, like marzipan, from almonds or apricot kernels.' },
      { question: 'How do you drink liqueurs?', answer: 'Neat, over ice, in coffee or as cocktail ingredients, depending on the style.' },
      { question: 'Where can I buy liqueurs online in Australia?', answer: 'You can buy liqueurs online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Liqueur', url: 'https://en.wikipedia.org/wiki/Liqueur' },
      { text: 'Wikipedia: Licor 43', url: 'https://en.wikipedia.org/wiki/Licor_43' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),

  newGuide({
    slug: 'australian-beer-guide-lager-vb-craft-brands',
    title: 'Australian Beer: Australian Lager, VB and the Craft Brands to Know',
    seoTitle: 'Australian Beer: Lager, VB and Craft Brands to Know',
    excerpt: 'A guide to Australian beer: why lager dominates, how VB and Hahn Super Dry compare with craft brands such as Stone & Wood, Mountain Goat and Balter, and how to choose.',
    category: 'Beer Guide',
    image: '/images/blog/shared/bottle-shop.webp',
    primaryKeyword: 'australian beer',
    relatedSubcategory: 'australian-beer',
    lead: 'Australian beer ranges from crisp, cold lagers such as VB and Hahn Super Dry to hoppy pale ales and IPAs from craft brewers such as Stone & Wood, Mountain Goat and Balter. This guide explains why lager dominates, how mid strength and low carb beers fit in, what the craft brands offer and how to choose a beer for the occasion.',
    takeaways: [
      'Lager is the most popular style in Australia, valued for being crisp and refreshing in warm weather.',
      'Mid strength beers are commonly around 3 to 3.5 percent ABV; full-strength beers are around 4.5 to 5 percent.',
      'Craft brewers focus on pale ales, IPAs and seasonal styles.',
      'A standard drink in Australia contains 10 grams of alcohol, so check the label for the standard drink count.',
    ],
    sections: [
      {
        heading: 'Why is lager so popular in Australia?',
        paragraphs: [
          'Lager is brewed with a cool fermentation and long conditioning, which gives a clean, crisp beer that is easy to drink cold. In a warm climate, that refreshing quality has made lager the national favourite.',
          'Big brands such as VB and Hahn Super Dry are lagers, and many craft brewers also make a lager alongside their pale ales and IPAs.',
        ],
        links: [{ text: 'Shop Australian beer', href: AUSBEER }],
      },
      {
        heading: 'What is VB?',
        paragraphs: [
          'VB is short for Victoria Bitter, one of Australia’s best-known beers. Despite the name, it is a lager rather than a bitter, with a firm hop bitterness and a dry, refreshing finish.',
          'It is typically served very cold in a can, a stubby or a glass, and is a staple at barbecues and cricket matches.',
        ],
      },
      {
        heading: 'What is Hahn Super Dry?',
        paragraphs: [
          'Hahn Super Dry is an Australian lager brewed to ferment out more of the sugars, giving a very dry, light-tasting beer. It helped popularise the idea of a dry, lower-carb Australian lager.',
          'It suits drinkers who like a crisp, clean beer with little malt sweetness. Our guide to [beer with the least carbs](/blog/beer-with-least-carbs-lowest-carb-beer-australia/) explains how dry lagers are made.',
        ],
      },
      {
        heading: 'What are the best-known Australian craft beer brands?',
        paragraphs: [
          'Stone & Wood is based in Byron Bay, New South Wales, and is known for its Pacific Ale. Mountain Goat is a Melbourne brewer known for pale ales and other craft styles. Balter is a Queensland brewer from the Gold Coast, and 4 Pines is a Sydney brewer from Manly.',
          'These brewers generally focus on pale ale, IPA, lager and seasonal beers. See more in our [Australian beer collection](' + AUSBEER + ').',
        ],
      },
      {
        heading: 'What is a pale ale?',
        paragraphs: [
          'Pale ale is a top-fermented beer with a golden to amber colour, moderate bitterness and fruity hop aromas. Australian pale ales often highlight local and New Zealand hops with citrus and tropical notes.',
          'It sits between a lager and an IPA: more flavour than a lager, but less bitter than an IPA. Read our guide to [IPA beer](/blog/what-is-ipa-beer-india-pale-ale-explained/) for the hoppier end.',
        ],
      },
      {
        heading: 'What do mid strength and full strength mean?',
        paragraphs: [
          'Full-strength beers are commonly around 4.5 to 5 percent ABV, and mid strength beers are commonly around 3 to 3.5 percent. Low-alcohol beers are lower still. The numbers vary by brand, so check the label.',
          'Australian labels show standard drinks, where one standard drink is 10 grams of alcohol. A mid strength beer therefore uses fewer standard drinks than a full-strength beer of the same size.',
        ],
      },
      {
        heading: 'What food goes with Australian beer?',
        paragraphs: [
          'Lagers suit barbecue, fish and chips, pizza and salty snacks. Pale ales and IPAs match burgers, spicy food and strong cheeses. Light beers are good with seafood and salads.',
          'Serve beer cold, in a clean glass, to bring out its flavour and aroma.',
        ],
      },
      {
        heading: 'How should you store and serve beer?',
        paragraphs: [
          'Store beer cold and out of sunlight, because light spoils hops and creates a skunky aroma. Serve lagers at about 3 to 5 degrees Celsius and pale ales a little warmer.',
          'Beer is best fresh, so check the best-before date and avoid leaving it in a hot car.',
        ],
      },
      {
        heading: 'How do you choose an Australian beer?',
        paragraphs: [
          'Choose a lager for refreshment, a pale ale for flavour, an IPA for hops and a low carb or mid strength beer for lighter drinking. Consider a mixed case to compare.',
          'Compare the [lager range](' + LAGER + ') and the current [Australian beer collection](' + AUSBEER + '). We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the most popular beer style in Australia?', answer: 'Lager is the most popular style, valued for being crisp and refreshing in warm weather.' },
      { question: 'What does VB stand for?', answer: 'VB stands for Victoria Bitter, an Australian lager.' },
      { question: 'What is mid strength beer?', answer: 'Mid strength beer has less alcohol than full-strength beer, commonly around 3 to 3.5 percent ABV.' },
      { question: 'What is the difference between pale ale and lager?', answer: 'Pale ale is top-fermented with more fruity hop character, while lager is fermented cool and tastes cleaner and crisper.' },
      { question: 'How many standard drinks are in a beer?', answer: 'It depends on the volume and the ABV. Australian labels show the number of standard drinks, with one standard drink being 10 grams of alcohol.' },
      { question: 'Where can I buy Australian beer online?', answer: 'You can buy Australian beer online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Beer in Australia', url: 'https://en.wikipedia.org/wiki/Beer_in_Australia' },
      { text: 'Wikipedia: Lager', url: 'https://en.wikipedia.org/wiki/Lager' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),
];
