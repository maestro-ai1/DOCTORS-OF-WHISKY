import { newGuide } from '@/lib/data/blog-new-helpers';

const PROSECCO = '/shop/beer-premix-wine/collection/prosecco/';
const SPARKLING = '/shop/beer-premix-wine/collection/sparkling/';
const VERMOUTH = '/shop/spirit/collection/amaro/';
const GIN = '/shop/spirit/collection/gin/';
const PINK = '/shop/spirit/collection/pink-gin/';
const OUZO = '/shop/spirit/collection/ouzo/';
const WHITE = '/shop/beer-premix-wine/collection/white-wine/';
const PG = '/shop/beer-premix-wine/collection/pinot-grigio/';
const SB = '/shop/beer-premix-wine/collection/sauvignon-blanc/';
const AMARO = '/shop/spirit/collection/amaro/';
const SAMBUCA = '/shop/spirit/collection/sambuca/';

export const NEW_GUIDES_1 = [
  newGuide({
    slug: 'prosecco-guide-aperol-spritz-rose-mimosa',
    title: 'Prosecco Guide: Prosecco for Aperol Spritz, Prosecco Rosé and Mimosas',
    seoTitle: 'Prosecco for Aperol Spritz, Rosé and Mimosas: A Guide',
    excerpt: 'What prosecco is, how it is made, how brut, extra dry and dry differ, and which prosecco to use for an Aperol Spritz, a Bellini or a mimosa.',
    category: 'Wine Guide',
    image: '/images/blog/shared/vineyard.webp',
    primaryKeyword: 'prosecco for aperol spritz',
    relatedSubcategory: 'prosecco',
    lead: 'Prosecco for Aperol Spritz is the most common reason Australians buy a bottle: a dry, lightly fruity Italian sparkling wine that stays crisp when it meets Aperol and soda. This guide explains what prosecco is, how the sweetness labels work, how it differs from Champagne, and which style suits a spritz, a Bellini, a mimosa or a toast.',
    takeaways: [
      'Prosecco is an Italian sparkling wine made mainly from the Glera grape, usually by the tank (Charmat) method.',
      'Brut is the driest common style, extra dry is slightly sweeter, and dry is sweeter again, despite the name.',
      'For an Aperol Spritz, a brut or extra dry prosecco balances the sweetness of Aperol.',
      'Serve prosecco well chilled and drink it young, within a year or two of release, unless the label says otherwise.',
    ],
    sections: [
      {
        heading: 'What is prosecco?',
        paragraphs: [
          'Prosecco is a sparkling wine from north-eastern Italy, made mainly from the Glera grape variety. The Prosecco DOC zone covers parts of the Veneto and Friuli Venezia Giulia regions, and the smaller DOCG zones such as Conegliano Valdobbiadene sit in the hills of the Veneto.',
          'The name is protected in Europe, so a wine sold as prosecco has to come from the designated zones and follow the rules for the denomination. That is why Australian sparkling wines made in a similar style are usually labelled by grape or style rather than as prosecco.',
        ],
        links: [{ text: 'Shop prosecco', href: PROSECCO }],
      },
      {
        heading: 'How is prosecco made?',
        paragraphs: [
          'Most prosecco is made by the Charmat or tank method. After the base wine is made, the second fermentation that creates the bubbles happens in a large pressurised steel tank rather than in each bottle, and the wine is then filtered and bottled under pressure.',
          'This approach keeps the fresh, floral and fruity character of the grape, and it is quicker and cheaper than the traditional bottle-fermented method used for Champagne. The result is a lighter, fruitier style that is meant to be enjoyed young.',
        ],
      },
      {
        heading: 'What do brut, extra dry and dry mean on a prosecco label?',
        paragraphs: [
          'Sweetness is shown by the residual sugar level. Under the denomination rules, brut has up to 12 grams of sugar per litre, extra dry has 12 to 17 grams, and dry has 17 to 32 grams. The names are not intuitive, because extra dry is sweeter than brut and dry is sweeter again.',
          'Extra dry is the most common style on shelves, with soft fruit and a gentle sweetness. Brut suits people who want a drier, more savoury glass. If you are unsure, start with extra dry for sipping and brut for mixing.',
        ],
      },
      {
        heading: 'Which prosecco is best for an Aperol Spritz?',
        paragraphs: [
          'The classic Aperol Spritz uses three parts prosecco, two parts Aperol and one part soda, served over ice with a slice of orange. Because Aperol is sweet and bitter, a brut or extra dry prosecco keeps the drink balanced instead of syrupy.',
          'You do not need a premium bottle for a spritz. A clean, dry, well-chilled prosecco is enough, and the soda stretches it. Keep the glass and ice cold, build the drink gently so the bubbles survive, and add the orange last. Browse our [amaro and bitter liqueurs](' + AMARO + ') to see what else works in a spritz.',
        ],
      },
      {
        heading: 'What is prosecco rosé?',
        paragraphs: [
          'Prosecco rosé is a pink version of the style. The rules for Prosecco DOC were extended to allow a rosé category, made from Glera blended with a small share of Pinot Noir for colour and berry flavour, and the first wines reached shelves a few years ago.',
          'Expect red-berry aromas, a dry finish and the same light bubbles as white prosecco. It is a pretty choice for celebrations and pairs well with charcuterie, prawns and light salads.',
        ],
      },
      {
        heading: 'How do you make a Bellini or a mimosa with prosecco?',
        paragraphs: [
          'A Bellini is white peach purée topped with prosecco, traditionally about one part purée to two parts wine. A mimosa is half sparkling wine and half fresh orange juice, poured gently into a flute.',
          'Both drinks suit a brut or extra dry prosecco, because the fruit adds sweetness. Chill every ingredient first and pour the prosecco last to keep the bubbles lively.',
        ],
      },
      {
        heading: 'How is prosecco different from Champagne?',
        paragraphs: [
          'Champagne comes from the Champagne region of France, is made mainly from Chardonnay and the two Pinot grapes, and gets its bubbles from a second fermentation in the bottle. Prosecco uses Glera and the tank method, which gives lighter, fruitier wines at a lower price.',
          'Neither is better; they do different jobs. Prosecco is easy, fresh and ideal for spritzes and parties. Our guide to [Champagne, sparkling wine and port](/blog/champagne-vs-sparkling-wine-vs-port/) covers the traditional method in more detail.',
        ],
      },
      {
        heading: 'How should you serve and store prosecco?',
        paragraphs: [
          'Serve prosecco at about 6 to 8 degrees Celsius, in a tulip-shaped glass or flute. Chill the bottle for several hours in the fridge, or for 20 to 30 minutes in a bucket of ice and water.',
          'Store unopened bottles somewhere cool, dark and steady, lying down or upright for short periods. Prosecco is made to be drunk fresh, so most bottles are best within a year or two of release. Once opened, a sparkling wine stopper keeps it lively for a day or two.',
        ],
      },
      {
        heading: 'What food goes with prosecco?',
        paragraphs: [
          'Prosecco is a flexible food wine. Its acidity and light bubbles cut through salty, fried and creamy foods, so it works with antipasto, olives, prosciutto, hard cheeses, arancini and tempura.',
          'Off-dry styles also suit mildly spicy dishes and fruit-based desserts. For a simple party, pair a brut with salty snacks and an extra dry with fruit and soft cheese.',
        ],
      },
      {
        heading: 'How do you choose a good bottle of prosecco?',
        paragraphs: [
          'Check the label for the denomination (DOC or DOCG), the sweetness level and the vintage, and choose the most recent release. Brut or extra dry will suit most tastes, and a rosé adds a little more fun.',
          'Buy a few bottles at a time and chill them well. See the current range in our [prosecco collection](' + PROSECCO + ') and the wider [sparkling wine range](' + SPARKLING + '). Every delivery needs an adult (18+) signature.',
        ],
      },
    ],
    faqs: [
      { question: 'What grape is prosecco made from?', answer: 'Prosecco is made mainly from the Glera grape. The rules also allow small amounts of other approved varieties, and prosecco rosé includes some Pinot Noir.' },
      { question: 'Is prosecco sweet or dry?', answer: 'It depends on the label. Brut is the driest common style, extra dry has a little more sugar, and dry is sweeter again. Most people find extra dry lightly fruity rather than sweet.' },
      { question: 'Which prosecco is best for an Aperol Spritz?', answer: 'A brut or extra dry prosecco balances the sweetness of Aperol. Use three parts prosecco, two parts Aperol and one part soda over ice.' },
      { question: 'How long does opened prosecco last?', answer: 'With a sparkling wine stopper and the bottle in the fridge, opened prosecco stays enjoyable for a day or two, although the bubbles fade steadily.' },
      { question: 'Is prosecco the same as Champagne?', answer: 'No. Prosecco comes from north-eastern Italy, uses the Glera grape and is usually made by the tank method. Champagne comes from France and is made by the traditional bottle-fermented method.' },
      { question: 'Where can I buy prosecco online in Australia?', answer: 'You can buy prosecco online from Doctors of Whisky with insured delivery across Australia. A minimum order applies, and an adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Prosecco', url: 'https://en.wikipedia.org/wiki/Prosecco' },
      { text: 'Wikipedia: Sparkling wine', url: 'https://en.wikipedia.org/wiki/Sparkling_wine' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),

  newGuide({
    slug: 'what-is-vermouth-sweet-dry-cocktails',
    title: 'What Is Vermouth? Sweet Vermouth, Dry Vermouth and How to Use Them',
    seoTitle: 'What Is Vermouth? Sweet, Dry and Cocktail Uses',
    excerpt: 'Vermouth is a fortified, aromatised wine. Learn the difference between sweet and dry vermouth, how to use it in a Negroni or Martini, and how to store it.',
    category: 'Spirits Guide',
    image: '/images/blog/shared/home-bar.webp',
    primaryKeyword: 'vermouth',
    relatedSubcategory: 'amaro',
    lead: 'Vermouth is a fortified wine flavoured with botanicals, and it is the quiet backbone of the Martini, Negroni and Manhattan. This guide explains what vermouth is, how sweet vermouth, dry vermouth and bianco differ, which brands to look for, and how to drink and store a bottle.',
    takeaways: [
      'Vermouth is wine that has been fortified with spirit and flavoured with herbs, spices and bark.',
      'Sweet (rosso) vermouth goes into a Negroni and a Manhattan; dry vermouth goes into a Martini.',
      'Opened vermouth is wine: keep it in the fridge and use it within a few weeks to a couple of months.',
      'Vermouth can be sipped on its own over ice with a twist of citrus.',
    ],
    sections: [
      {
        heading: 'What is vermouth made from?',
        paragraphs: [
          'Vermouth starts as a base wine, usually white. It is fortified with a neutral grape spirit, sweetened and then flavoured with a closely guarded mix of botanicals such as herbs, roots, spices and citrus peel.',
          'The word comes from the German Wermut, meaning wormwood, which was a traditional ingredient. Today the recipe varies by producer, but the character is always bittersweet, aromatic and lightly herbal.',
        ],
        links: [{ text: 'Shop vermouth', href: VERMOUTH }],
      },
      {
        heading: 'What is the difference between sweet and dry vermouth?',
        paragraphs: [
          'Sweet vermouth, often called rosso or rosso amaro, is darker, richer and spiced, with notes of vanilla, dried fruit and bitter herbs. Dry vermouth is pale, crisp and more floral, with a clean finish.',
          'Bianco vermouth sits in between: pale like dry vermouth but sweeter and softer. Rosé vermouth is lighter and fruitier. Most home bars need one sweet and one dry bottle.',
        ],
      },
      {
        heading: 'What are the best-known vermouth brands?',
        paragraphs: [
          'Familiar names include Cinzano, Martini, Dolin and Noilly Prat. Cinzano and Martini are Italian houses with wide ranges of rosso, bianco and extra dry. Dolin is a French producer from Chambéry known for a light, dry style, and Noilly Prat is the classic French dry vermouth.',
          'Choose by use: a richer Italian rosso for a Negroni, and a dry French style for a Martini. Browse our [vermouth collection](' + VERMOUTH + ') for the current bottles.',
        ],
      },
      {
        heading: 'How do you use vermouth in a Negroni?',
        paragraphs: [
          'A Negroni uses equal parts gin, Campari and sweet vermouth, stirred over ice and served with an orange slice or twist. The sweet vermouth rounds off the bitterness of Campari and the juniper of the gin.',
          'Because vermouth makes up a third of the drink, its quality matters. Pair it with a good dry [gin](' + GIN + ') and a bitter from our [amaro range](' + AMARO + ').',
        ],
      },
      {
        heading: 'How do you use dry vermouth in a Martini?',
        paragraphs: [
          'A classic Martini combines gin with a measure of dry vermouth, stirred with ice and strained into a chilled glass with a lemon twist or an olive. The ratio is a matter of taste: a wet Martini uses more vermouth and a dry Martini uses less.',
          'Fresh, cold vermouth makes a noticeable difference. If the bottle has been open for months, the wine will taste flat and the cocktail will suffer.',
        ],
      },
      {
        heading: 'What other cocktails use vermouth?',
        paragraphs: [
          'The Manhattan combines whiskey, usually rye or bourbon, with sweet vermouth and bitters. The Americano pairs sweet vermouth with Campari and soda, and the Boulevardier swaps the gin in a Negroni for bourbon.',
          'Dry vermouth also appears in the Gibson and in many sauces and pan deglazes, where it replaces white wine. See our [bourbon](/shop/whisky/collection/bourbon/) and [rye whiskey](/shop/whisky/collection/rye-whiskey/) ranges for Manhattan bases.',
        ],
      },
      {
        heading: 'Can you drink vermouth on its own?',
        paragraphs: [
          'Yes. In Italy and Spain vermouth is a classic aperitif, served over ice with an orange slice or olive and sometimes a splash of soda. It is lower in alcohol than most spirits, typically in the mid-teens to around twenty percent ABV.',
          'Sweet vermouth suits an after-work drink, and a chilled dry or bianco style works well before dinner with salty snacks.',
        ],
      },
      {
        heading: 'How should you store vermouth?',
        paragraphs: [
          'Because vermouth is wine-based, it oxidises once opened. Reseal the bottle tightly and keep it in the fridge. Most bottles taste best within a few weeks and remain usable for a couple of months.',
          'Unopened bottles keep well in a cool, dark place. If you only make the occasional cocktail, buy smaller bottles so that nothing goes to waste.',
        ],
      },
      {
        heading: 'How do you choose a bottle of vermouth?',
        paragraphs: [
          'Decide on the drink first. For Negronis, Manhattans and Americanos, choose a sweet or rosso vermouth. For Martinis, choose a dry vermouth. For sipping, a bianco or a quality rosso over ice is a safe choice.',
          'Check the label for the style and the ABV, and buy from a stockist that stores bottles properly. Every order from Doctors of Whisky ships insured, and an adult (18+) must sign for delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What is vermouth?', answer: 'Vermouth is a wine that has been fortified with spirit and flavoured with botanicals such as herbs, spices and citrus peel. It is used in cocktails and as an aperitif.' },
      { question: 'What is sweet vermouth used for?', answer: 'Sweet or rosso vermouth is used in a Negroni, a Manhattan and an Americano, and it can be sipped over ice with an orange slice.' },
      { question: 'Does vermouth go off?', answer: 'Opened vermouth oxidises like wine. Keep it sealed in the fridge and use it within a few weeks to a couple of months for the best flavour.' },
      { question: 'Is dry vermouth the same as white wine?', answer: 'No. Dry vermouth is fortified and flavoured with botanicals, so it is stronger and more aromatic than white wine, although it can replace white wine in cooking.' },
      { question: 'What is the difference between Cinzano and Martini vermouth?', answer: 'Both are Italian vermouth houses with rosso, bianco and extra dry styles. They differ slightly in recipe and sweetness, so compare labels or try both.' },
      { question: 'Where can I buy vermouth online in Australia?', answer: 'You can buy vermouth online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Vermouth', url: 'https://en.wikipedia.org/wiki/Vermouth' },
      { text: 'Wikipedia: Negroni', url: 'https://en.wikipedia.org/wiki/Negroni' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),

  newGuide({
    slug: 'pinot-grigio-vs-pinot-gris-italy-guide',
    title: 'Pinot Grigio vs Pinot Gris: Pinot Grigio from Italy Explained',
    seoTitle: 'Pinot Grigio from Italy vs Pinot Gris: Styles Explained',
    excerpt: 'Pinot grigio and pinot gris are the same grape. Learn how pinot grigio from Italy tastes, how pinot gris differs, and which food to serve with it.',
    category: 'Wine Guide',
    image: '/images/blog/shared/vineyard.webp',
    primaryKeyword: 'pinot grigio italy',
    relatedSubcategory: 'pinot-grigio',
    lead: 'Pinot grigio from Italy is the benchmark for a light, crisp, dry white wine, and pinot gris is the same grape in a different style. This guide explains how the two names relate, how pinot grigio from Italy tastes compared with Alsace or Australian pinot gris, and what to serve with it.',
    takeaways: [
      'Pinot grigio and pinot gris are the same grape; the name usually signals the style.',
      'Italian pinot grigio is typically light, dry and crisp; pinot gris is often richer and rounder.',
      'Serve pinot grigio cold with seafood, salads, antipasto and light pasta.',
      'Most pinot grigio is made to be drunk young, within a couple of years of vintage.',
    ],
    sections: [
      {
        heading: 'Are pinot grigio and pinot gris the same?',
        paragraphs: [
          'Yes. Pinot grigio is the Italian name and pinot gris is the French name for the same grape, which is a colour mutation of Pinot Noir. The skins are greyish-pink, which is where the names (grigio and gris, both meaning grey) come from.',
          'On a label, the name usually tells you the style. Pinot grigio suggests a light, fresh, dry wine, while pinot gris suggests a fuller and sometimes slightly sweeter wine.',
        ],
        links: [{ text: 'Shop pinot grigio', href: PG }],
      },
      {
        heading: 'Where is pinot grigio from Italy grown?',
        paragraphs: [
          'Most Italian pinot grigio comes from the north-east of the country, including the Veneto, Friuli Venezia Giulia and Trentino-Alto Adige. Cooler sites keep the acidity high, which is why these wines taste crisp and clean.',
          'Quality ranges from simple, fresh everyday wines to more concentrated bottles from hillside vineyards. Check the region on the label if you want more body and flavour.',
        ],
      },
      {
        heading: 'What does pinot grigio taste like?',
        paragraphs: [
          'Typical Italian pinot grigio is light-bodied and dry, with flavours of green apple, pear, citrus and a hint of almond. It rarely sees oak, so the focus is on freshness rather than richness.',
          'That neutral, refreshing profile is why it is one of the most popular white wines for easy drinking, and why it works so well chilled on a warm Australian day.',
        ],
      },
      {
        heading: 'How is pinot gris different?',
        paragraphs: [
          'Pinot gris, especially from Alsace in France, tends to be richer and rounder, with notes of ripe pear, apricot, honey and spice, and sometimes a little residual sugar. It has more weight and a longer finish.',
          'Australian producers make both styles, and a label that says pinot gris often signals the fuller version. When in doubt, check the producer notes or ask for the sweetness level.',
        ],
      },
      {
        heading: 'Is pinot grigio grown in Australia?',
        paragraphs: [
          'Yes. Pinot grigio and pinot gris are grown in cooler Australian regions such as the Mornington Peninsula, the Adelaide Hills and Tasmania. Local wines can sit anywhere between the light Italian style and the richer Alsace style.',
          'Browse the [white wine range](' + WHITE + ') to compare local and imported bottles, and read our guide to [white wine styles](/blog/white-wine-styles-explained/).',
        ],
      },
      {
        heading: 'What food goes with pinot grigio?',
        paragraphs: [
          'The best matches are light, fresh dishes: grilled fish, prawns, calamari, oysters, salads, antipasto and pasta with lemon or herb sauces. The wine’s acidity refreshes the palate without overpowering the food.',
          'Fuller pinot gris can handle roast chicken, pork and mild curries. Avoid very spicy or heavily sauced dishes, which can swamp a delicate wine.',
        ],
      },
      {
        heading: 'How should you serve pinot grigio?',
        paragraphs: [
          'Serve pinot grigio well chilled, at about 7 to 10 degrees Celsius, in a medium white wine glass. Take it out of the fridge a few minutes before pouring if it is very cold, so the aromas can show.',
          'Fuller pinot gris benefits from slightly warmer serving, around 10 to 12 degrees, which brings out the richer fruit.',
        ],
      },
      {
        heading: 'Should you age pinot grigio?',
        paragraphs: [
          'Most pinot grigio is made to be enjoyed within a couple of years of the vintage, while it is bright and fresh. Cellaring does not usually improve the light Italian style.',
          'Richer pinot gris from good sites can gain complexity over several years, but the average bottle is best opened sooner rather than later.',
        ],
      },
      {
        heading: 'How do you choose a bottle of pinot grigio?',
        paragraphs: [
          'Look at the vintage, the region and the style on the label, and choose the most recent vintage for a fresh wine. Italian bottles from the north-east offer classic crispness, and Australian and Alsace pinot gris offer more weight.',
          'See the current bottles in our [pinot grigio collection](' + PG + '). We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'Is pinot grigio sweet or dry?', answer: 'Italian pinot grigio is usually dry, light and crisp. Pinot gris from some regions can be richer and may carry a little residual sugar.' },
      { question: 'What is the difference between pinot grigio and pinot gris?', answer: 'They are the same grape. Pinot grigio is the Italian name and usually a lighter, crisper style, while pinot gris is the French name and often a fuller style.' },
      { question: 'What food goes with pinot grigio?', answer: 'Seafood, salads, antipasto and light pasta dishes are the classic matches. Fuller pinot gris also suits roast chicken and pork.' },
      { question: 'How cold should pinot grigio be?', answer: 'Serve it at about 7 to 10 degrees Celsius. Slightly warmer suits richer pinot gris.' },
      { question: 'Does pinot grigio age well?', answer: 'Most bottles are best within a couple of years of the vintage. Richer pinot gris can age longer, but the light Italian style is made to drink young.' },
      { question: 'Where can I buy pinot grigio online in Australia?', answer: 'You can buy pinot grigio online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Pinot gris', url: 'https://en.wikipedia.org/wiki/Pinot_gris' },
      { text: 'Wine Australia', url: 'https://www.wineaustralia.com/' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),

  newGuide({
    slug: 'sauvignon-blanc-guide-low-alcohol-cooking-pairing',
    title: 'White Wine Sauvignon Blanc: Styles, Low Alcohol Options and Food Pairing',
    seoTitle: 'White Wine Sauvignon Blanc: Styles and Pairing Guide',
    excerpt: 'Sauvignon blanc explained: where it is grown, how it tastes, how low alcohol sauvignon blanc compares, and what to cook and serve with it.',
    category: 'Wine Guide',
    image: '/images/blog/shared/vineyard.webp',
    primaryKeyword: 'white wine sauvignon blanc',
    relatedSubcategory: 'sauvignon-blanc',
    lead: 'White wine sauvignon blanc is one of the world’s most recognisable styles: zesty, aromatic and refreshing. This guide covers where sauvignon blanc comes from, what it tastes like, how low alcohol sauvignon blanc differs, how to use it in cooking and what to serve with a chilled glass.',
    takeaways: [
      'Sauvignon blanc is a high-acid white grape known for citrus, gooseberry, passionfruit and fresh-cut grass flavours.',
      'It is grown in France, New Zealand and Australia, and each region gives a slightly different style.',
      'Lower-alcohol versions pick the grapes earlier or use techniques that reduce alcohol, and they taste lighter.',
      'Serve it cold with seafood, salads, goat cheese and herby dishes.',
    ],
    sections: [
      {
        heading: 'What is sauvignon blanc?',
        paragraphs: [
          'Sauvignon blanc is a white grape that originated in France, where it is grown in the Loire Valley and Bordeaux. It is known for high acidity and an aromatic, herbal and fruity profile that makes it easy to recognise in a glass.',
          'Wines can be made in a fresh, unoaked style or in a richer, oak-influenced style, and it is often blended with semillon in Bordeaux and Western Australia.',
        ],
        links: [{ text: 'Shop sauvignon blanc', href: SB }],
      },
      {
        heading: 'What does sauvignon blanc taste like?',
        paragraphs: [
          'Classic flavours include lemon, lime, grapefruit, green apple, gooseberry, passionfruit and freshly cut grass. In cooler climates the wine leans herbal and mineral, and in warmer sites it moves towards tropical fruit.',
          'The high acidity gives a crisp finish, which is why sauvignon blanc is so refreshing when served cold.',
        ],
      },
      {
        heading: 'Where is sauvignon blanc grown?',
        paragraphs: [
          'France is the original home, with Sancerre and Pouilly-Fumé in the Loire. New Zealand, especially Marlborough, made the pungent, tropical style famous around the world.',
          'In Australia, sauvignon blanc is grown in regions such as the Adelaide Hills and Margaret River, where it is also blended with semillon. Compare local and imported bottles in our [white wine range](' + WHITE + ').',
        ],
      },
      {
        heading: 'What is low alcohol sauvignon blanc?',
        paragraphs: [
          'Low alcohol sauvignon blanc is made with a lower ABV than a standard bottle, either by harvesting earlier, by stopping fermentation sooner or by gently removing some alcohol after fermentation. The wines taste lighter and often a little sweeter.',
          'They suit lunches and warm afternoons. Check the ABV on the label, because there is no single standard for what counts as low alcohol.',
        ],
      },
      {
        heading: 'Can you cook with sauvignon blanc?',
        paragraphs: [
          'Yes. A dry, unoaked sauvignon blanc is a good cooking wine because its acidity brightens sauces. Use it to steam mussels, deglaze a pan for chicken or fish, or finish a creamy pasta sauce.',
          'Do not cook with a wine you would not drink, and use the same style at the table that you used in the pan. Cooking reduces the alcohol but concentrates the flavour, so choose a clean, dry bottle.',
        ],
      },
      {
        heading: 'What food goes with sauvignon blanc?',
        paragraphs: [
          'Sauvignon blanc loves fresh, green and tangy flavours. Goat cheese, asparagus, salads, grilled fish, oysters, prawns and dishes with fresh herbs all work well.',
          'It also handles dishes with lemon, lime or a little chilli heat. Avoid heavy, rich sauces, which overwhelm its delicate aromas.',
        ],
      },
      {
        heading: 'How is sauvignon blanc different from chardonnay?',
        paragraphs: [
          'Sauvignon blanc is crisp, aromatic and lean, while chardonnay is more neutral and shaped by winemaking, ranging from steely and unoaked to rich and buttery. Read more in our guide to [white wine styles](/blog/white-wine-styles-explained/).',
          'If you like fresh and zesty, choose sauvignon blanc. If you prefer something fuller and rounder, try chardonnay or pinot gris.',
        ],
      },
      {
        heading: 'How should you serve and store sauvignon blanc?',
        paragraphs: [
          'Serve sauvignon blanc well chilled, at about 7 to 10 degrees Celsius. A few minutes in an ice bucket is enough on a hot day.',
          'Most sauvignon blanc is designed to be drunk young, within one to three years of the vintage, while the aromas are fresh. Store bottles in a cool, dark place away from heat.',
        ],
      },
      {
        heading: 'How do you choose a sauvignon blanc?',
        paragraphs: [
          'Look at the region and the vintage, and choose the most recent vintage for a fresh style. New Zealand tends to be vibrant and tropical, France more mineral and restrained, and Australia somewhere in between.',
          'Browse the [sauvignon blanc collection](' + SB + ') for current bottles. We ship insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'Is sauvignon blanc dry?', answer: 'Most sauvignon blanc is dry with high acidity. Some producers make slightly sweeter or lower-alcohol versions, so check the label.' },
      { question: 'What does sauvignon blanc taste like?', answer: 'Typical flavours include citrus, gooseberry, passionfruit and fresh-cut grass, with a crisp, refreshing finish.' },
      { question: 'What food pairs with sauvignon blanc?', answer: 'Goat cheese, salads, asparagus, seafood and herby dishes are classic matches.' },
      { question: 'Can I cook with sauvignon blanc?', answer: 'Yes. A dry, unoaked bottle is excellent for steaming mussels, deglazing pans and finishing light cream sauces.' },
      { question: 'How cold should sauvignon blanc be?', answer: 'Serve it at about 7 to 10 degrees Celsius, well chilled but not frozen.' },
      { question: 'Where can I buy sauvignon blanc online in Australia?', answer: 'You can buy sauvignon blanc online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Sauvignon blanc', url: 'https://en.wikipedia.org/wiki/Sauvignon_blanc' },
      { text: 'Wine Australia', url: 'https://www.wineaustralia.com/' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),

  newGuide({
    slug: 'pink-gin-and-soda-what-is-pink-gin',
    title: 'Pink Gin and Soda: What Is Pink Gin and How Do You Serve It?',
    seoTitle: 'Pink Gin and Soda: What Pink Gin Is and How to Serve It',
    excerpt: 'Pink gin explained: how it is made, how it tastes, the best way to make a pink gin and soda, and how it differs from classic dry gin.',
    category: 'Spirits Guide',
    image: '/images/blog/shared/home-bar.webp',
    primaryKeyword: 'pink gin and soda',
    relatedSubcategory: 'pink-gin',
    lead: 'Pink gin and soda is a simple, refreshing long drink: a fruit-flavoured pink gin poured over ice and topped with soda water. This guide explains what pink gin is, how it differs from classic dry gin, how to make the best pink gin and soda, and what to garnish and serve it with.',
    takeaways: [
      'Pink gin is gin flavoured or coloured with red fruit or botanicals such as strawberry, raspberry or rhubarb.',
      'It is usually softer and sweeter than a London dry gin, although styles vary.',
      'The easiest serve is one part pink gin to two or three parts soda over plenty of ice.',
      'Check the label for ABV and sweetness, which differ between brands.',
    ],
    sections: [
      {
        heading: 'What is pink gin?',
        paragraphs: [
          'Pink gin is gin that has been flavoured with red fruit or botanicals, and often given a pink colour, either naturally from the fruit or with added colouring. Common flavours include strawberry, raspberry, rhubarb and hibiscus.',
          'It still starts with a gin base flavoured with juniper, which is then infused or blended to add the fruity, pink character. The result is usually softer and sweeter than a classic dry gin.',
        ],
        links: [{ text: 'Shop pink gin', href: PINK }],
      },
      {
        heading: 'How is pink gin made?',
        paragraphs: [
          'Producers use several methods. Some macerate fruit in the gin after distillation, which adds colour and flavour. Others add fruit juice, natural flavourings or sweeteners to a distilled gin base.',
          'Depending on the sweetness and the rules where the gin is sold, some products are labelled as flavoured gin or gin liqueur. Check the label if you prefer a drier style.',
        ],
      },
      {
        heading: 'How is pink gin different from regular gin?',
        paragraphs: [
          'A classic dry gin is led by juniper, citrus and spice, with little or no sugar. Pink gin puts fruit forward and is usually rounder and sweeter, which makes it popular with people who find dry gin too sharp.',
          'Both can be enjoyed in the same ways, but pink gin is often served with soda or lemonade rather than a strongly bitter tonic. Our guide to [London dry and contemporary gin](/blog/london-dry-vs-contemporary-gin/) explains the wider styles.',
        ],
      },
      {
        heading: 'How do you make a pink gin and soda?',
        paragraphs: [
          'Fill a tall glass with ice, add one part pink gin and top with two to three parts chilled soda water. Stir gently and garnish with fresh strawberries, a slice of lemon or a sprig of mint.',
          'Soda keeps the drink light and lets the fruit flavour come through. For a sweeter long drink, use lemonade or a lightly flavoured tonic instead.',
        ],
      },
      {
        heading: 'What garnish works with pink gin?',
        paragraphs: [
          'Fresh strawberries, raspberries, a slice of lime or lemon, a twist of grapefruit or a sprig of mint all work well. Edible flowers add a pretty finish for entertaining.',
          'Use plenty of ice and a large glass so that the drink stays cold and the garnish has room to show.',
        ],
      },
      {
        heading: 'Which mixers go well with pink gin?',
        paragraphs: [
          'Soda water is the cleanest choice. Light or Mediterranean tonic adds a gentle bitterness, and lemonade gives a sweeter, more casual drink. Sparkling wine turns pink gin into a celebratory topper.',
          'Avoid heavy mixers that cover the fruit. Browse our [mixers and tonics](/shop/other/collection/mixers-water-condiments/) to stock up.',
        ],
      },
      {
        heading: 'Can you drink pink gin neat?',
        paragraphs: [
          'You can sip a quality pink gin neat or over ice, but most styles are lower in botanical complexity than classic gin and taste best diluted. A small splash of soda opens the aroma.',
          'If you want to try it neat, chill the bottle first and pour a small measure.',
        ],
      },
      {
        heading: 'How strong is pink gin?',
        paragraphs: [
          'Strength varies by brand. Gins are commonly bottled at around 37.5 to 43 percent ABV, while flavoured or liqueur-style pink gins can be lower. Always check the label.',
          'Mixed with soda, a standard serve is far milder than a neat measure, but alcohol is still alcohol, so drink responsibly.',
        ],
      },
      {
        heading: 'How do you choose a pink gin?',
        paragraphs: [
          'Decide whether you want dry and botanical or sweet and fruity, then check the flavour, the ABV and the size. A smaller bottle is a good way to try a new style.',
          'Browse the [pink gin collection](' + PINK + ') and the wider [gin range](' + GIN + '). We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What is pink gin?', answer: 'Pink gin is gin flavoured or coloured with red fruit or botanicals such as strawberry, raspberry or rhubarb.' },
      { question: 'What is the best mixer for pink gin?', answer: 'Soda water is the cleanest choice, and lemonade or a light tonic also work. Sparkling wine makes a celebratory topper.' },
      { question: 'How do you make a pink gin and soda?', answer: 'Pour one part pink gin over ice, top with two to three parts soda and garnish with strawberries, lemon or mint.' },
      { question: 'Is pink gin sweeter than regular gin?', answer: 'Usually yes. Most pink gins are softer and fruitier than a London dry gin, although styles vary by brand.' },
      { question: 'How strong is pink gin?', answer: 'Strength varies by brand, so check the label. Flavoured pink gins can be lower in ABV than classic gins.' },
      { question: 'Where can I buy pink gin online in Australia?', answer: 'You can buy pink gin online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Gin', url: 'https://en.wikipedia.org/wiki/Gin' },
      { text: 'Wikipedia: Distilled beverage', url: 'https://en.wikipedia.org/wiki/Distilled_beverage' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),

  newGuide({
    slug: 'what-is-ouzo-greek-drink-flavour-serving',
    title: 'What Is Ouzo? The Greek Drink, Its Flavour and How to Serve It',
    seoTitle: 'What Is Ouzo? The Greek Drink, Flavour and Serving',
    excerpt: 'Ouzo is an anise-flavoured Greek spirit. Learn what it tastes like, why it turns cloudy with water, how to drink it and what to eat with it.',
    category: 'Spirits Guide',
    image: '/images/blog/shared/tasting-flight.webp',
    primaryKeyword: 'ouzo greek drink',
    relatedSubcategory: 'ouzo',
    lead: 'Ouzo is the Greek drink flavoured with aniseed, a clear spirit that turns milky white when water is added. This guide explains what ouzo is, what its liquorice-like flavour is made from, why it clouds, how to serve it the Greek way and how it compares with sambuca, absinthe and other anise spirits.',
    takeaways: [
      'Ouzo is a Greek aniseed-flavoured spirit, usually served with water or ice and a plate of meze.',
      'It turns cloudy because anise oils come out of solution when water is added, known as the louche effect.',
      'Sip it slowly, diluted, with food rather than in shots.',
      'Related anise spirits include sambuca, pastis, raki and absinthe.',
    ],
    sections: [
      {
        heading: 'What is ouzo?',
        paragraphs: [
          'Ouzo is a Greek spirit flavoured mainly with aniseed. It is clear in the bottle, with a sweet, liquorice-like aroma, and it is one of the most recognisable drinks of Greek and Cypriot hospitality.',
          'Many producers add other botanicals such as fennel, coriander or mastic, which shape each brand’s character. It is typically bottled at around 37.5 to 50 percent ABV.',
        ],
        links: [{ text: 'Shop ouzo', href: OUZO }],
      },
      {
        heading: 'What does ouzo taste like?',
        paragraphs: [
          'The dominant flavour is aniseed, similar to black liquorice or fennel, with a soft sweetness and a warming finish. Other botanicals add herbal or floral notes.',
          'People who dislike liquorice may find it strong, but diluted with water and eaten with food, the flavour is more refreshing and less intense.',
        ],
      },
      {
        heading: 'Why does ouzo turn cloudy with water?',
        paragraphs: [
          'Anise oils dissolve in strong alcohol but not in water. When water or ice is added, the oils come out of solution as tiny droplets and the clear spirit turns milky white. This is called the louche effect.',
          'It is a sign of a genuine anise spirit rather than a flaw, and the same thing happens with pastis and absinthe.',
        ],
      },
      {
        heading: 'How do you drink ouzo?',
        paragraphs: [
          'The Greek way is to pour a small measure into a tall glass and add cold water and ice, to taste. Sip it slowly over a long meal, rather than drinking it as a shot.',
          'Start with roughly one part ouzo to one or two parts water, and adjust. The more water you add, the lighter and more aromatic the drink becomes.',
        ],
      },
      {
        heading: 'What food goes with ouzo?',
        paragraphs: [
          'Ouzo is traditionally served with meze: grilled octopus, fried calamari, olives, feta, tzatziki, grilled fish and salty snacks. The anise freshens the palate between bites.',
          'It also pairs well with seafood and with Mediterranean salads. Light, salty, savoury dishes work best.',
        ],
      },
      {
        heading: 'How is ouzo different from sambuca?',
        paragraphs: [
          'Both are anise spirits, but ouzo is Greek and usually drier and more herbal, while sambuca is Italian, sweeter and traditionally served with coffee beans. Explore our [sambuca range](' + SAMBUCA + ') to compare.',
          'Pastis from France, raki from Turkey and arak from the Levant are close relatives. All share the cloudy appearance when diluted.',
        ],
      },
      {
        heading: 'Can you use ouzo in cooking and cocktails?',
        paragraphs: [
          'Yes. Ouzo is used in Greek cooking to flame prawns or flavour seafood sauces, and a splash adds depth to fennel dishes. In cocktails, a small amount can replace absinthe in rinses and long drinks.',
          'Use it sparingly, because the anise flavour is assertive.',
        ],
      },
      {
        heading: 'How should you store ouzo?',
        paragraphs: [
          'Keep the bottle upright, sealed and out of direct sunlight, at room temperature. Because the spirit is high in alcohol and low in sugar relative to liqueurs, it keeps well once opened.',
          'Chill the water and glasses rather than the bottle, since very cold ouzo can cloud before you add water.',
        ],
      },
      {
        heading: 'How do you choose an ouzo?',
        paragraphs: [
          'Check the ABV, the size and the producer, and consider whether you prefer a drier herbal style or a sweeter one. A smaller bottle is a good way to try the category.',
          'See the current bottles in our [ouzo collection](' + OUZO + '). We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What is ouzo made from?', answer: 'Ouzo is a spirit flavoured mainly with aniseed, and often other botanicals such as fennel, coriander or mastic.' },
      { question: 'Why does ouzo turn white?', answer: 'Anise oils come out of solution when water is added, which clouds the spirit. This is called the louche effect and is normal for anise spirits.' },
      { question: 'How do you drink ouzo?', answer: 'Dilute it with cold water and ice and sip it slowly with meze or seafood.' },
      { question: 'Is ouzo the same as sambuca?', answer: 'No. Both are anise spirits, but ouzo is Greek and usually drier and more herbal, while sambuca is Italian and sweeter.' },
      { question: 'How strong is ouzo?', answer: 'It is typically around 37.5 to 50 percent ABV, so check the label of the bottle you buy.' },
      { question: 'Where can I buy ouzo online in Australia?', answer: 'You can buy ouzo online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Ouzo', url: 'https://en.wikipedia.org/wiki/Ouzo' },
      { text: 'Wikipedia: Distilled beverage', url: 'https://en.wikipedia.org/wiki/Distilled_beverage' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),
];
