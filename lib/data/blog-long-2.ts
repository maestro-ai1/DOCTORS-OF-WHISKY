import type { BlogPost } from '@/lib/types';

const UPDATED = '2026-10-01';

/** Long-form guides, batch 2 (vodka, tequila, mezcal, cognac, gin). Keyword volumes / KD are from the keyword bank. */
export const BLOG_LONG_2: Record<string, Partial<BlogPost>> = {
  // vodka cluster (bank has no data for "how is vodka made", so it is kept as a long-tail informational primary)
  'how-vodka-is-made': {
    primaryKeyword: 'how is vodka made',
    secondaryKeywords: ['cheap vodka', 'vodka bottle', 'bottle of vodka', 'vodka 700ml', 'vodka 1l', 'absolut vodka', 'smirnoff vodka'],
    seoTitle: 'How Vodka Is Made: From Grain to Bottle (and How to Buy)',
    seoDescription: 'How vodka is made step by step: fermentation, distillation, filtration and dilution, plus how the base and water change taste and how to choose a bottle.',
    updated: UPDATED,
    keyTakeaways: [
      'Vodka is made by fermenting a sugar or starch source, distilling it to a very high strength, filtering it and diluting it with water.',
      'Base ingredient (wheat, rye, potato, corn) affects texture more than flavour.',
      'Most vodka is bottled at 40% ABV, and Australian labels must show the number of standard drinks.',
      'Price does not always track quality, so judge by smoothness, base ingredient and how you plan to drink it.',
    ],
    sections: [
      {
        heading: 'How is vodka made, step by step?',
        paragraphs: [
          'Vodka starts with a fermentable base: grain such as wheat, rye or corn, potatoes, grapes or even sugar beet. Starches are converted to sugar, then yeast ferments the sugar into a low-strength alcoholic liquid. This is called the wash.',
          'The wash is distilled, usually in column stills, which separate alcohol from water and impurities and concentrate it to a very high strength. The spirit is then filtered, commonly through charcoal, and diluted with water to bottling strength before it is bottled. The fewer flavour compounds that survive the process, the cleaner the vodka tastes.',
        ],
      },
      {
        heading: 'Does the base ingredient change the taste?',
        paragraphs: [
          'Slightly, and mostly in texture. Wheat vodkas tend to taste soft and slightly sweet. Rye vodkas often show a little spice and a drier finish. Potato vodkas can feel creamier and weightier. Corn adds gentle sweetness, and grape-based vodkas can taste lightly fruity.',
          'Brands lean on these differences in marketing. In blind tastings the effect is subtle, but it is real when you sip neat and chilled, and it explains why people favour one style for martinis and another for mixing.',
        ],
      },
      {
        heading: 'Does distilling vodka more times make it better?',
        paragraphs: [
          'Not necessarily. Multiple distillations remove more impurities, but a very high number of passes can also strip character. “Distilled five times” is a marketing claim rather than a quality guarantee, and a well-made single-pass vodka can taste better than a badly made multi-pass one.',
          'What matters more is the quality of the base, the skill of the distiller in making cuts (separating the best part of the run) and the filtration. Judge by taste and reputation, not by the number on the label.',
        ],
      },
      {
        heading: 'What role do water and filtration play?',
        paragraphs: [
          'A bottle of vodka is typically 60 per cent water, so the water matters. Many brands highlight a spring, glacial or mineral source, which can affect mouthfeel. Filtration through charcoal, quartz, silver or even diamond dust is often marketed as the secret to smoothness.',
          'In practice, careful distillation does the heavy lifting and filtration polishes the result. For a premium example, compare [Grey Goose 700mL](/shop/spirit/grey-goose-700ml-french-vodka/), made from French wheat, with [Belvedere 700mL](/shop/spirit/belvedere-700-polish-vodka/), made from Polish rye.',
        ],
        links: [{ text: 'Shop French vodka', href: '/shop/spirit/collection/french-vodka/' }, { text: 'Shop Polish vodka', href: '/shop/spirit/collection/polish-vodka/' }],
      },
      {
        heading: 'How strong is vodka, and what is a standard drink?',
        paragraphs: [
          'Most vodka is bottled at 37.5 to 40 per cent ABV. In Australia, a standard drink contains 10 grams of pure alcohol, and labels must show how many standard drinks a container holds. A 700 mL bottle of 40 per cent vodka contains about 22 standard drinks, and a 1 litre bottle about 31.',
          'Counting standard drinks is the simplest way to keep track of how much you have had. Buyers must be 18 or over, and the Australian guidelines recommend no more than ten standard drinks a week and no more than four on any one day.',
        ],
      },
      {
        heading: 'Cheap vodka or premium vodka: which should you buy?',
        paragraphs: [
          'For cocktails with strong mixers, such as a vodka soda or a screwdriver, a clean mid-priced bottle such as [Smirnoff Blue 1L](/shop/spirit/smirnoff-blue-1l-russian-vodka/) is perfectly good. For martinis and sipping chilled, the extra smoothness of a premium vodka is worth paying for.',
          'The best value is usually in the middle. Avoid the bottom shelf if you plan to drink it neat, and avoid paying for packaging alone. See our full [Russian vodka collection](/shop/spirit/collection/russian-vodka/) for a range of options.',
        ],
        links: [{ text: 'Shop Russian vodka', href: '/shop/spirit/collection/russian-vodka/' }],
      },
      {
        heading: 'How should you serve vodka?',
        paragraphs: [
          'Store vodka in the freezer if you like it cold and viscous. Serve it neat in small chilled glasses, shaken or stirred in a martini, or mixed with soda, tonic, ginger beer or juice. It is the base of the Moscow Mule, Cosmopolitan and Espresso Martini.',
          'To see how vodka-based mixes work, read our guide to [the best mixers for a home bar](/blog/best-mixers-for-home-bar/) or compare two premium brands in [Grey Goose vs Belvedere](/blog/grey-goose-vs-belvedere-vodka-compared/).',
        ],
      },
    ],
    faqs: [
      { question: 'How is vodka made?', answer: 'Vodka is made by fermenting a base such as grain or potatoes, distilling it to a high strength, filtering it and diluting it with water before bottling.' },
      { question: 'What is vodka made from?', answer: 'Vodka can be made from wheat, rye, corn, potatoes, grapes or sugar beet. The base changes the texture more than the flavour.' },
      { question: 'Is vodka distilled more than whisky?', answer: 'Often yes. Vodka is typically distilled to a higher strength and filtered to remove flavour, while whisky retains flavour compounds and is aged in oak.' },
      { question: 'How many standard drinks are in a bottle of vodka?', answer: 'A 700 mL bottle of 40% vodka contains about 22 standard drinks, and a 1 litre bottle about 31, using Australia’s 10 gram standard drink.' },
      { question: 'Is expensive vodka better?', answer: 'Not always. Premium vodkas are smoother when sipped neat, but mid-priced bottles work well in mixed drinks.' },
      { question: 'Should you keep vodka in the freezer?', answer: 'You can. Vodka will not freeze at household freezer temperatures, and chilling it gives a thicker, smoother texture when served neat.' },
    ],
  },

  // reposado tequila 1000/12 · anejo tequila 720/12 · blanco tequila 1000/13 · silver tequila 590/11
  'tequila-aging-guide-blanco-reposado-anejo': {
    primaryKeyword: 'reposado tequila',
    secondaryKeywords: ['anejo tequila', 'tequila reposado', 'blanco tequila', 'silver tequila', 'what does tequila taste like', '1942 tequila anejo'],
    seoTitle: 'Reposado Tequila: Blanco, Reposado and Anejo Explained',
    seoDescription: 'Reposado tequila explained: how blanco, reposado, anejo and extra anejo differ in ageing, flavour and price, with the best way to drink each in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'Blanco is unaged or aged under two months, reposado two months to one year, anejo one to three years, extra anejo over three.',
      'Look for “100% de agave” on the label, which means no added sugars or other spirits.',
      'Blanco suits margaritas and palomas, reposado is the all-rounder, and anejo is best sipped neat.',
      'Longer ageing adds oak, vanilla and caramel but can mute the fresh agave flavour.',
    ],
    sections: [
      {
        heading: 'What are the types of tequila?',
        paragraphs: [
          'Tequila is made from blue Weber agave and classified by how long it ages. Blanco (also plata or silver) is unaged or rested under two months. Joven or gold is typically blanco blended with aged tequila or coloured and flavoured. Reposado spends between two months and a year in oak. Añejo ages between one and three years, and extra añejo more than three.',
          'Cristalino is aged tequila that has been filtered to remove colour, which gives a clear liquid with oak softness. Each style has its own use, and none is automatically better.',
        ],
      },
      {
        heading: 'What is reposado tequila?',
        paragraphs: [
          'Reposado means “rested”. It matures in oak barrels for at least two months and up to a year, taking on a pale gold colour and soft notes of vanilla, caramel and spice while keeping the cooked agave character. It is the most flexible tequila for beginners.',
          'Good examples include [Don Julio Reposado](/shop/spirit/don-julio-reposado-don-julio/) and [Jose Cuervo Reposado 1L](/shop/spirit/jose-cuervo-reposado-1l-jose-cuervo/). Reposado works neat, on the rocks, and in drinks such as a richer margarita or a paloma.',
        ],
        links: [{ text: 'Shop Don Julio', href: '/shop/spirit/collection/don-julio/' }],
      },
      {
        heading: 'What does blanco tequila taste like?',
        paragraphs: [
          'Blanco is the purest expression of the agave. Expect fresh cooked agave, citrus, pepper and herbs, with a clean, slightly peppery finish. Because it has not been softened by oak, it shows the distiller’s craft directly.',
          'It is the best choice for cocktails where you want the agave to shine, such as a margarita, a paloma or a ranch water. Try [Don Julio Blanco](/shop/spirit/don-julio-blanco-don-julio/) or a [white tequila](/shop/spirit/collection/white-tequila/) from our range.',
        ],
        links: [{ text: 'Shop white tequila', href: '/shop/spirit/collection/white-tequila/' }],
      },
      {
        heading: 'What is añejo tequila, and is it worth the price?',
        paragraphs: [
          'Añejo is aged one to three years in oak, usually smaller barrels. It becomes amber, smooth and complex, with caramel, vanilla, dried fruit, cocoa and toasted oak notes. The agave becomes subtler and the spirit more like a good aged brandy or whisky.',
          'Because ageing costs time and evaporation, añejo is pricier. Drink it neat or over a large ice cube rather than in a cocktail. The Don Julio 1942 is a well-known example, and [Don Julio Añejo](/shop/spirit/don-julio-anejo-don-julio/) is a more accessible way into the category.',
        ],
      },
      {
        heading: 'What does “100% agave” mean?',
        paragraphs: [
          'Tequila labelled “100% de agave” is made entirely from blue Weber agave. A tequila without that statement is a “mixto”, which can contain up to 49 per cent sugars from other sources and often carries additives. Mixto is cheaper and can be fine for mixed drinks, but it tastes less pure and can cause harsher hangovers.',
          'For sipping, always buy 100% agave. The label will also carry a NOM number that identifies the distillery, which is useful if you like to compare brands that share a producer.',
        ],
      },
      {
        heading: 'How do you drink each type of tequila?',
        paragraphs: [
          'Blanco: margaritas, palomas, ranch water, or sipped from a small glass. Reposado: neat, on the rocks, or in richer cocktails. Añejo and extra añejo: neat in a snifter, with a few drops of water. Use lime and salt as a tradition, not a necessity. Good tequila does not need to be disguised.',
          'To learn more about the Mexican agave spirit that is not tequila, read our guide to [mezcal versus tequila](/blog/mezcal-vs-tequila-difference/), or compare two famous houses in [Don Julio vs Patrón](/blog/don-julio-vs-patron-tequila-compared/).',
        ],
      },
      {
        heading: 'Which tequila should you buy first?',
        paragraphs: [
          'If you will use it for cocktails, start with a 100% agave blanco. If you want one bottle for everything, buy a reposado. If you are treating yourself or giving a gift, choose an añejo.',
          'Browse all options in our [Don Julio collection](/shop/spirit/collection/don-julio/) and the [Patrón collection](/shop/spirit/collection/patron/). Buyers must be 18 or over.',
        ],
        links: [{ text: 'Shop Patrón', href: '/shop/spirit/collection/patron/' }],
      },
    ],
    faqs: [
      { question: 'What is the difference between blanco, reposado and añejo?', answer: 'Blanco is unaged or aged under two months, reposado is aged two months to a year, and añejo is aged one to three years in oak.' },
      { question: 'What is reposado tequila?', answer: 'Reposado means rested. It is tequila aged in oak for two months to a year, giving a pale gold colour and soft vanilla and caramel notes.' },
      { question: 'What does tequila taste like?', answer: 'Blanco tastes of cooked agave, citrus and pepper. Aged tequila adds vanilla, caramel and oak.' },
      { question: 'What does 100% agave mean?', answer: 'It means the tequila is made only from blue Weber agave with no added sugars or other spirits. Mixto tequila can contain up to 49% other sugars.' },
      { question: 'Is añejo better than blanco?', answer: 'Not better, just different. Añejo is smoother and better for sipping, while blanco shows fresh agave and suits cocktails.' },
      { question: 'What is the best tequila for margaritas?', answer: 'A 100% agave blanco is the usual choice. Reposado makes a richer, rounder margarita.' },
    ],
  },

  // mezcal tequila 590/17 · mezcal mescal 1000/22 · what is mezcal 590/28 · tequila and mezcal 260/21
  'mezcal-vs-tequila-difference': {
    primaryKeyword: 'mezcal tequila',
    secondaryKeywords: ['mezcal mescal', 'what is mezcal', 'tequila and mezcal', 'mezcal australia', 'buy mezcal online australia', 'what is mezcal made from', 'best mezcal'],
    seoTitle: 'Mezcal vs Tequila: The Real Difference, Explained',
    seoDescription: 'Mezcal vs tequila: how the agave, cooking method, regions and flavour differ, how to read a mezcal label and which bottles to try in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'Tequila is a type of mezcal, but only blue Weber agave can be used; mezcal can use dozens of agave species.',
      'Mezcal agave is traditionally roasted in earthen pits, which gives its signature smoke.',
      'Mezcal comes mostly from Oaxaca, while tequila comes mostly from Jalisco.',
      'The worm in the bottle is a marketing tradition, not a sign of quality.',
    ],
    sections: [
      {
        heading: 'What is mezcal, and is it the same as mescal?',
        paragraphs: [
          'Mezcal is a Mexican spirit made from the cooked, fermented and distilled heart (piña) of agave plants. “Mescal” is a common alternative spelling, and many people use the two interchangeably, but “mezcal” is the spelling on legally certified labels.',
          'The word is also sometimes used to mean any agave spirit, which is why you will hear that tequila is “a kind of mezcal”. In practice, mezcal is its own regulated category with its own regions, methods and flavour.',
        ],
      },
      {
        heading: 'What is the difference between mezcal and tequila?',
        paragraphs: [
          'Tequila must be made from blue Weber agave, mostly in Jalisco. The agave is typically steamed in brick ovens or autoclaves, which produces a clean, bright, sweet cooked-agave flavour. Mezcal can be made from many agave species and is traditionally cooked in underground pits lined with hot stones and covered with earth, which gives its smoky character.',
          'Mezcal is usually distilled in small batches in clay or copper stills, often at family-run palenques. The result is more varied and rustic than most tequila, with earthy, vegetal, fruity and smoky notes.',
        ],
      },
      {
        heading: 'What agave is mezcal made from?',
        paragraphs: [
          'Over 30 agave species can be used. Espadín is the most common and is grown widely in Oaxaca. Wild agaves such as tobalá, tepeztate and madrecuixe are rarer, take many years to mature and cost more, and each gives a different flavour from floral and fruity to herbal and mineral.',
          'Some mezcals are made from a single agave species, others from blends. The label often tells you which, and it is one of the best clues to what the spirit will taste like.',
        ],
      },
      {
        heading: 'How do you read a mezcal label?',
        paragraphs: [
          'Look for the category: Mezcal, Mezcal Artesanal (traditional methods like pit roasting and stone milling) or Mezcal Ancestral (the most traditional, with clay pot distillation). Then look for the age: joven (unaged), reposado (2 months to a year in wood) or añejo (over a year).',
          'The label should also state the agave species, the region and the maker. Brands that give more detail are usually proud of their process.',
        ],
      },
      {
        heading: 'Does mezcal have a worm in the bottle?',
        paragraphs: [
          'Some do, but it is not required and it has no connection with quality. The worm (gusano) is a larva that lives on agave and was added to some bottles as a marketing gimmick in the 20th century. Serious producers do not use it.',
          'If a bottle has a worm, treat it as a novelty rather than a mark of authenticity. Most high-quality mezcal does not include one.',
        ],
      },
      {
        heading: 'Which mezcals should you try?',
        paragraphs: [
          'Start with a joven espadín for a clear introduction to smoke and agave. From our range, [Guerrero Mezcal](/shop/spirit/guerrero-mezcal/), [Mezcal Elote](/shop/spirit/mezcal-elote/) and [Scorpion Mezcal](/shop/spirit/scorpion-mezcal/) show different sides of the category.',
          'Browse the full selection in our [mezcal collection](/shop/spirit/collection/mezcal/), and compare with tequila in our [tequila aging guide](/blog/tequila-aging-guide-blanco-reposado-anejo/).',
        ],
        links: [{ text: 'Shop mezcal', href: '/shop/spirit/collection/mezcal/' }],
      },
      {
        heading: 'How should you drink mezcal?',
        paragraphs: [
          'The traditional way is neat in a small clay cup (copita) or a glass, sipped slowly with slices of orange and sal de gusano (a salt seasoned with chilli and ground agave worm). It is also excellent in cocktails: a Mezcal Margarita, Oaxaca Old Fashioned or Paloma adds smoke and depth.',
          'Because it is often higher in strength and strongly flavoured, mezcal rewards slow sipping. Buyers must be 18 or over.',
        ],
      },
    ],
    faqs: [
      { question: 'What is mezcal?', answer: 'Mezcal is a Mexican spirit distilled from the cooked heart of agave plants. It can be made from many agave species and is traditionally roasted in earth pits, which gives it a smoky flavour.' },
      { question: 'What is mezcal made from?', answer: 'Mezcal is made from agave. More than 30 species can be used, with espadín the most common.' },
      { question: 'Is mezcal the same as tequila?', answer: 'No. Tequila is a specific type of agave spirit made from blue Weber agave, while mezcal can use many agave species and is usually smokier.' },
      { question: 'Is mezcal the same as mescal?', answer: 'Yes, mescal is an alternative spelling of mezcal, though “mezcal” is used on certified bottles.' },
      { question: 'Does mezcal have a worm?', answer: 'Some bottles do, but it is a marketing tradition rather than a requirement or a sign of quality.' },
      { question: 'Where is mezcal made?', answer: 'Most mezcal is made in Oaxaca, with some also made in Guerrero, Durango, Zacatecas, San Luis Potosí and other designated Mexican states.' },
    ],
  },

  // what is cognac 1000/21 · hennessy xo 2400/15 · martell vsop 880/13 · buy brandy online 390/6
  'cognac-vs-brandy-explained': {
    primaryKeyword: 'what is cognac',
    secondaryKeywords: ['hennessy cognac', 'hennessy xo', 'martell xo', 'martell vsop', 'vsop cognac', 'hennessy vs cognac', 'buy brandy online', 'louis xiii cognac'],
    seoTitle: 'What Is Cognac? Cognac vs Brandy and VS, VSOP, XO',
    seoDescription: 'What is cognac? How cognac differs from brandy, what VS, VSOP and XO mean, how it is made and which Hennessy, Martell and other bottles to buy in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'All cognac is brandy, but only brandy from the Cognac region of France made under strict rules can be called cognac.',
      'VS is aged at least two years, VSOP at least four and XO at least ten.',
      'Cognac is distilled twice in copper pot stills and aged in French oak.',
      'Cognac is sipped neat, but VS and VSOP also work in cocktails.',
    ],
    sections: [
      {
        heading: 'What is cognac?',
        paragraphs: [
          'Cognac is a type of brandy made from white grapes grown in the Cognac region of south-western France, in the Charente area. It is protected by appellation rules that govern the grapes (mainly Ugni Blanc), the stills, the ageing and the region.',
          'Cognac is distilled twice in traditional copper pot stills called Charentais stills, and then aged in French oak barrels, usually from Limousin or Tronçais forests. It must be aged at least two years before it can be sold.',
        ],
      },
      {
        heading: 'How is cognac different from brandy?',
        paragraphs: [
          'Brandy is any spirit distilled from fermented fruit, usually grapes. Cognac is brandy with a specific place of origin and a legally defined method. Other famous brandies include Armagnac from Gascony, Spanish Brandy de Jerez, and apple brandy such as Calvados from Normandy.',
          'In practice, cognac tends to be smoother, more floral and more refined, while brandies from other regions can be rustic or sweeter. If you want an everyday brandy for cooking and mixing, a general brandy is fine. For sipping, cognac is the classic choice.',
        ],
      },
      {
        heading: 'What do VS, VSOP and XO mean?',
        paragraphs: [
          'These are age classes based on the youngest eau-de-vie in the blend. VS (Very Special) is at least two years old. VSOP (Very Superior Old Pale) is at least four. XO (Extra Old) is at least ten, a rule that came into force in 2018 and replaced an earlier six-year minimum. Many houses blend far older spirits than the minimum.',
          'Each class has a different style. VS is fresh, fruity and good in mixed drinks. VSOP is rounder with vanilla and spice. XO is rich, complex and layered, with dried fruit, chocolate, tobacco and leather notes.',
        ],
      },
      {
        heading: 'What are the cognac crus?',
        paragraphs: [
          'The Cognac region is divided into six growing areas called crus: Grande Champagne, Petite Champagne, Borderies, Fins Bois, Bons Bois and Bois Ordinaires. Grande Champagne is the most prized and is known for floral, long-ageing eaux-de-vie. “Fine Champagne” on a label means a blend of Grande and Petite Champagne with at least 50 per cent Grande.',
          'This “Champagne” has no link to the sparkling wine. The word refers to the chalky soil of the Cognac area, which is the same root word as the sparkling region but is a separate matter in law.',
        ],
      },
      {
        heading: 'Which cognacs should you buy?',
        paragraphs: [
          'The large houses make reliable benchmarks. [Hennessy VSOP](/shop/spirit/hennessy-vsop-cognac-brandy/) is a popular all-rounder. [Hennessy XO](/shop/spirit/hennessy-xo-cognac-brandy/) is the classic aged blend. Martell’s [Cordon Bleu](/shop/spirit/martell-cordon-bleu-cognac-brandy/) and [Blue Swift](/shop/spirit/martell-blue-swift-cognac-brandy/) show a different, finer style that finishes in Bourbon barrels (Blue Swift).',
          'At the top end, Louis XIII de Rémy Martin is a blend of eaux-de-vie from Grande Champagne, aged for decades. See [our cognac and brandy collection](/shop/spirit/collection/cognac-brandy/) for the full range.',
        ],
        links: [{ text: 'Shop cognac and brandy', href: '/shop/spirit/collection/cognac-brandy/' }],
      },
      {
        heading: 'How do you drink cognac?',
        paragraphs: [
          'Sip it neat in a tulip or snifter glass at room temperature, with a few drops of water if you like. Warm the glass gently in your hands rather than over a flame. VS and VSOP also work in cocktails such as the Sidecar, Sazerac (originally cognac-based) and Brandy Alexander.',
          'Cognac pairs well with dark chocolate, cheese, cigars and roast meats. For a different style of aged spirit, compare with the single malts in our [guide to single malt versus blended Scotch](/blog/single-malt-vs-blended-scotch/).',
        ],
      },
      {
        heading: 'How do you choose between cognac and other brandy?',
        paragraphs: [
          'Choose cognac when you want a refined sipping spirit, a gift or a classic cocktail. Choose another brandy for cooking, flambé or casual mixing, where price matters more than nuance.',
          'Check the age class on the label, the cru if given and the producer’s reputation. If you want to start, a VSOP gives the best balance of price and quality. Buyers must be 18 or over.',
        ],
      },
    ],
    faqs: [
      { question: 'What is cognac?', answer: 'Cognac is a brandy made from white grapes grown in the Cognac region of France, double distilled in copper pot stills and aged in French oak for at least two years.' },
      { question: 'What is the difference between cognac and brandy?', answer: 'All cognac is brandy, but only brandy from the Cognac region made under strict rules can be called cognac. Other brandies are made elsewhere with different rules.' },
      { question: 'What do VS, VSOP and XO mean on cognac?', answer: 'They are age classes. VS is at least two years old, VSOP at least four years and XO at least ten years.' },
      { question: 'Is Hennessy a cognac?', answer: 'Yes. Hennessy is one of the largest cognac houses, producing VS, VSOP, XO and rarer blends.' },
      { question: 'How do you drink cognac?', answer: 'Sip it neat in a tulip glass at room temperature. Younger cognacs such as VS and VSOP also work in cocktails.' },
      { question: 'Can I buy brandy online in Australia?', answer: 'Yes. Doctors of Whisky sells cognac and brandy with delivery across Australia. Buyers must be 18 or over.' },
    ],
  },

  // dry gin 880/9 · gordons london dry gin 1900/16 · pink gin 4400/21 · gin and tonic cans 480/7
  'london-dry-vs-contemporary-gin': {
    primaryKeyword: 'dry gin',
    secondaryKeywords: ['gordons london dry gin', 'pink gin', 'gin gifts australia', 'gin and tonic cans', 'indian tonic water', 'gin premix', 'gordons dry gin'],
    seoTitle: 'London Dry vs Contemporary Gin: A Style Guide',
    seoDescription: 'London dry gin vs contemporary gin: what the rules mean, how the flavour differs, where pink gin fits and how to choose a gin for a G&T or a martini.',
    updated: UPDATED,
    keyTakeaways: [
      'London dry is a method, not a place, and means no flavour or colour can be added after distillation.',
      'Contemporary gins keep juniper but push other botanicals such as citrus, florals or native Australian ingredients.',
      'Pink gin is gin flavoured with fruit and often sweetened, so it is a different style.',
      'Choose London dry for classic martinis and G&Ts, and contemporary gin when you want a distinctive botanical twist.',
    ],
    sections: [
      {
        heading: 'What makes a gin a gin?',
        paragraphs: [
          'Gin is a spirit flavoured primarily with juniper berries. Beyond juniper, distillers choose a blend of botanicals such as coriander seed, angelica root, orris, citrus peel, cassia and liquorice. The botanicals are infused or re-distilled in a neutral spirit, and the result is bottled at 37.5 per cent ABV or higher in most markets.',
          'Because there is no requirement for ageing, gin is a creative spirit. A distiller’s choice of botanicals defines its style, which is why gins taste so different even when they share a category name.',
        ],
      },
      {
        heading: 'What does London dry mean?',
        paragraphs: [
          'London dry gin is not about location. It describes a method: all flavour must come from natural botanicals during distillation, no artificial flavours or colours can be added afterward, and sweetening is restricted to a tiny amount. That gives a clean, dry, juniper-forward style.',
          'Classic London dry names include Gordon’s, Tanqueray and Bombay Sapphire. You can see them in our [gin collection](/shop/spirit/collection/gin/), including [Gordon’s Gin 1L](/shop/spirit/gordons-gin-1l/) and [Bombay Sapphire](/shop/spirit/bombay-sapphire-gin/).',
        ],
        links: [{ text: 'Shop gin', href: '/shop/spirit/collection/gin/' }],
      },
      {
        heading: 'What is contemporary or “New Western” gin?',
        paragraphs: [
          'Contemporary gin still contains juniper, but it deliberately turns down the volume to let other botanicals lead. You might find cucumber and rose in Hendrick’s, or native botanicals such as lemon myrtle and Tasmanian pepperberry in Australian gins like Four Pillars. Some are distilled gins with flavours added after distillation, so they cannot be labelled London dry.',
          'This freedom has produced an explosion of styles. Try [Hendrick’s Amazonia](/shop/spirit/hendricks-amazonia-gin/) to see how far gin can move from the classic recipe.',
        ],
      },
      {
        heading: 'Where does pink gin fit in?',
        paragraphs: [
          'Pink gin is a gin flavoured with red fruit such as strawberry, raspberry or rhubarb, often with added sugar. It tends to be sweeter and lower in ABV, and is generally served over ice or with lemonade or tonic.',
          'It is a popular and fun style, but it is not a London dry. If you are buying for a classic martini or a dry G&T, choose a juniper-led gin instead.',
        ],
      },
      {
        heading: 'Which gin is best for a martini or a G&T?',
        paragraphs: [
          'For a martini, a classic London dry such as Tanqueray or Gordon’s gives structure and bite. For a G&T, either style works: London dry gives a crisp, piney drink, while a contemporary gin gives a more aromatic one.',
          'Use plenty of ice, a good tonic and a garnish that matches the gin. A ratio of one part gin to two or three parts tonic is a good starting point. Premade options such as [24 Ice Gin & Tonic](/shop/beer-premix-wine/24-ice-gin-tonic/) are convenient when you do not want to mix.',
        ],
      },
      {
        heading: 'What tonic should you use?',
        paragraphs: [
          'Tonic is half your drink, so choose a good one. Indian tonic water is the standard, and lighter, less sweet tonics let delicate gins show. Avoid flat or sugary tonic, and always use a fresh bottle or can.',
          'For more on getting the mixer right, see our [guide to the best mixers for a home bar](/blog/best-mixers-for-home-bar/).',
        ],
      },
      {
        heading: 'What should you look for when buying gin in Australia?',
        paragraphs: [
          'Check the style on the label (London dry, distilled gin, flavoured gin), the ABV and the botanicals. Australian craft gins often highlight native ingredients and can be excellent value in smaller bottles. Gin also makes an easy gift, especially with a premium tonic and a glass.',
          'Buyers must be 18 or over. Explore the full range in our [gin collection](/shop/spirit/collection/gin/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is London dry gin?', answer: 'London dry gin is a gin made by distilling natural botanicals with no artificial flavours or colours added afterward and only minimal sweetening. It does not have to be made in London.' },
      { question: 'What is the difference between London dry and regular gin?', answer: 'London dry follows a strict method with all flavour added during distillation. Other gins may have flavours or sweeteners added after distillation.' },
      { question: 'Is pink gin a London dry gin?', answer: 'No. Pink gin is flavoured with fruit and often sweetened, so it is a different style from London dry.' },
      { question: 'What is the best gin for a gin and tonic?', answer: 'Either a classic London dry for a crisp, piney drink or a contemporary gin for a more aromatic one. Use plenty of ice and a good tonic.' },
      { question: 'What is a standard gin and tonic ratio?', answer: 'One part gin to two or three parts tonic is a common starting point, over lots of ice.' },
      { question: 'Does gin need to be aged?', answer: 'No. Most gin is not aged, though some producers rest gin in barrels for a golden, oak-flavoured style.' },
    ],
  },
};
