import type { BlogPost } from '@/lib/types';

const UPDATED = '2026-09-29';
const LAGER = '/shop/beer-premix-wine/collection/lager/';
const IMPORTED = '/shop/beer-premix-wine/collection/imported-beer/';
const NONALC = '/shop/beer-premix-wine/collection/non-alcoholic-beer/';
const CIDER = '/shop/beer-premix-wine/collection/cider/';
const RED = '/shop/beer-premix-wine/collection/red-wine/';
const WHITE = '/shop/beer-premix-wine/collection/white-wine/';
const ROSE = '/shop/beer-premix-wine/collection/rose-wine/';
const SPARKLING = '/shop/beer-premix-wine/collection/sparkling/';
const PORT = '/shop/beer-premix-wine/collection/port-wine/';
const PREMIX = '/shop/beer-premix-wine/collection/vodka-premix/';
const SELTZER = '/shop/beer-premix-wine/collection/zero-sugar-seltzers/';

export const BLOG_EXTRA_DRINKS: Record<string, Partial<BlogPost>> = {
  'lager-vs-imported-beer-buyers-guide': {
    primaryKeyword: 'lager',
    secondaryKeywords: ['australian lager', 'lager beer', 'imported beer', 'best lager', 'buy beer online'],
    seoTitle: 'Lager vs Imported Beer: A Buyer’s Guide',
    seoDescription: 'Lager vs imported beer explained: how lager is brewed, what imported beer offers, how to serve each and how to buy beer online in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'Lager is brewed with bottom-fermenting yeast and conditioned cold for a crisp, clean taste.',
      'Imported beer covers international lagers, ales and stouts brewed overseas.',
      'Serve lager cold and check freshness dates on imported beer.',
    ],
    sections: [
      {
        heading: 'What makes a lager a lager?',
        paragraphs: [
          'Lager is brewed with bottom-fermenting yeast at cool temperatures and then conditioned cold for weeks, which gives a clean, crisp taste with little fruity yeast character. Styles range from pale Pilsner and Australian pale lagers to darker Vienna and Dunkel lagers.',
          'Most of the beer Australians drink is lager, which is why it is the default choice for a barbecue or a hot day.',
        ],
        links: [{ text: 'Shop lager', href: LAGER }],
      },
      {
        heading: 'What is imported beer?',
        paragraphs: [
          'Imported beer is brewed overseas and shipped in. It covers everything from German wheat beers and Belgian ales to Mexican and Czech lagers, so it is a good way to try styles you cannot find locally.',
          'Because beer is best fresh, check the packaged or best-before date, especially on lighter beers, and buy from a seller that stores stock properly.',
        ],
        links: [{ text: 'Shop imported beer', href: IMPORTED }],
      },
      {
        heading: 'How to serve and choose',
        paragraphs: [
          'Serve lager cold, around 3 to 5 degrees Celsius, in a clean glass. Serve stronger or darker imported beers slightly warmer to bring out flavour. Pair crisp lagers with spicy food, seafood and fried dishes.',
          'If you are cutting back on alcohol, see our guide to [non-alcoholic beer](/blog/why-non-alcoholic-beer-is-booming/), or explore [Australian craft cider](/blog/guide-to-australian-craft-cider/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is the difference between lager and ale?', answer: 'Lager uses bottom-fermenting yeast at cool temperatures for a clean, crisp taste, while ale uses top-fermenting yeast at warmer temperatures, giving fruitier flavours.' },
      { question: 'What is imported beer?', answer: 'Imported beer is beer brewed in another country and shipped for sale in Australia.' },
      { question: 'At what temperature should lager be served?', answer: 'Around 3 to 5 degrees Celsius, in a clean glass.' },
      { question: 'Can I buy beer online in Australia?', answer: 'Yes. Adults aged 18 and over can order beer online, and Doctors of Whisky delivers Australia-wide with an adult signature on delivery.' },
    ],
  },

  'why-non-alcoholic-beer-is-booming': {
    primaryKeyword: 'non alcoholic beer',
    secondaryKeywords: ['best non alcoholic beer australia', 'non alcoholic beers', 'alcohol free beer', 'low alcohol beer', 'buy non alcoholic beer'],
    seoTitle: 'Non-Alcoholic Beer: Why It’s Booming in Australia',
    seoDescription: 'Why non-alcoholic beer is booming: how it is made, how it tastes now, who is drinking it and the best non alcoholic beers to try.',
    updated: UPDATED,
    keyTakeaways: [
      'Non-alcoholic beer is brewed like regular beer, then alcohol is removed or limited.',
      'Quality has improved, with crisp lagers, pale ales and stouts now available.',
      'Check the label for alcohol content because labelling terms vary.',
    ],
    sections: [
      {
        heading: 'How non-alcoholic beer is made',
        paragraphs: [
          'Brewers make non-alcoholic beer in two main ways: they either brew a regular beer and remove the alcohol, for example by vacuum distillation or membrane filtration, or they limit fermentation so little alcohol forms in the first place. Both methods are followed by careful blending to restore flavour and body.',
          'Better technology has improved taste, so many drinkers now find non-alcoholic lagers and pale ales hard to tell from the real thing.',
        ],
        links: [{ text: 'Shop non-alcoholic beer', href: NONALC }],
      },
      {
        heading: 'Why demand is growing',
        paragraphs: [
          'More Australians are drinking mindfully: moderating on weeknights, driving, training or simply choosing not to drink. Non-alcoholic beer lets them keep the ritual of a cold beer at a barbecue or pub without the alcohol.',
          'Retailers and bars have responded with wider ranges, which has helped move the category from novelty to normal.',
        ],
      },
      {
        heading: 'How to choose one',
        paragraphs: [
          'Start with familiar styles: a crisp lager or pale ale is the most convincing. Check the label because non-alcoholic products are often up to 0.5% ABV, while alcohol-free products should be lower still. Serve very cold in a glass to bring out the aroma.',
          'For regular options see our [lager vs imported beer guide](/blog/lager-vs-imported-beer-buyers-guide/) and explore [zero sugar seltzers](/blog/rise-of-zero-sugar-seltzers/).',
        ],
      },
    ],
    faqs: [
      { question: 'Is non-alcoholic beer really alcohol free?', answer: 'Not always. Many non-alcoholic beers contain up to 0.5% ABV, while alcohol-free products contain less. Check the label.' },
      { question: 'How is non-alcoholic beer made?', answer: 'Either alcohol is removed from regular beer, or fermentation is limited so very little alcohol forms.' },
      { question: 'Does non-alcoholic beer taste like real beer?', answer: 'Modern non-alcoholic lagers and pale ales are much closer to regular beer than they used to be, especially when served very cold.' },
      { question: 'Can I buy non-alcoholic beer online in Australia?', answer: 'Yes. Doctors of Whisky stocks non-alcoholic beer and delivers across Australia.' },
    ],
  },

  'guide-to-australian-craft-cider': {
    primaryKeyword: 'apple cider',
    secondaryKeywords: ['craft cider', 'australian cider', 'cider', 'buy cider online', 'dry cider'],
    seoTitle: 'Australian Craft Cider: A Guide to Styles & Regions',
    seoDescription: 'A guide to Australian craft cider: dry to sweet styles, the main growing regions, how to serve it and food pairings.',
    updated: UPDATED,
    keyTakeaways: [
      'Cider is fermented apple (or pear) juice and ranges from dry to sweet.',
      'Tasmania, the Adelaide Hills and central New South Wales are known apple regions.',
      'Serve cider cold over ice, or slightly cool for complex craft styles.',
    ],
    sections: [
      {
        heading: 'What is craft cider?',
        paragraphs: [
          'Cider is made by fermenting apple juice, and craft cider uses higher juice content, often from named apple varieties, with less added sugar and flavouring. Perry is the same idea made from pears.',
          'Styles range from bone dry and tannic, close to a still wine, to sweet, fruity and sparkling. Alcohol levels are usually 4 to 8% ABV.',
        ],
        links: [{ text: 'Shop cider', href: CIDER }],
      },
      {
        heading: 'Australian cider regions',
        paragraphs: [
          'Apples grow well in cool-climate regions, so cider makers cluster in Tasmania, the Adelaide Hills, Victoria and the central west of New South Wales. Each region brings different apple varieties and flavour profiles, from crisp and tart to soft and honeyed.',
        ],
      },
      {
        heading: 'Serving and pairing',
        paragraphs: [
          'Serve fruity, sweeter ciders over ice and dry, complex ciders cool rather than icy. Dry cider pairs well with roast pork, cheddar and charcuterie, while sweeter cider suits spicy food and desserts.',
          'If you enjoy fruit-forward drinks, see our guide to [rosé wine](/blog/everything-about-rose-wine/), or explore lighter options in the [premix guide](/blog/ready-to-drink-premix-trend/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is craft cider?', answer: 'Craft cider is cider made with a high proportion of real apple juice and less added flavouring or sugar than mass-market cider.' },
      { question: 'How strong is cider?', answer: 'Most cider is between 4 and 8% ABV.' },
      { question: 'Is cider gluten free?', answer: 'Cider is typically made from apples, so it is normally gluten free, but check the label if you have coeliac disease.' },
      { question: 'What food goes with cider?', answer: 'Dry cider pairs with roast pork, cheddar and charcuterie, while sweeter cider suits spicy food.' },
    ],
  },

  'how-to-choose-red-wine': {
    primaryKeyword: 'red wine',
    secondaryKeywords: ['red wine varieties', 'shiraz red wine', 'sweet red wine', 'best red wine australia', 'buy red wine online'],
    seoTitle: 'How to Choose Red Wine: Grapes, Styles & Food Pairing',
    seoDescription: 'How to choose red wine: the main grape varieties, light vs full-bodied styles, Australian regions, food pairings and serving tips.',
    updated: UPDATED,
    keyTakeaways: [
      'Choose by body: light (Pinot Noir), medium (Merlot, Grenache) or full (Shiraz, Cabernet Sauvignon).',
      'Australian favourites include Barossa Shiraz and Coonawarra Cabernet Sauvignon.',
      'Serve red wine at cool room temperature, around 16 to 18 degrees Celsius.',
    ],
    sections: [
      {
        heading: 'Start with the grape and the body',
        paragraphs: [
          'Red wine is made from dark-skinned grapes fermented with their skins, which gives colour and tannin. Light-bodied wines such as Pinot Noir are bright and fruity, medium-bodied wines such as Merlot and Grenache are soft and rounded, and full-bodied wines such as Shiraz and Cabernet Sauvignon are rich, dark and structured.',
          'If you are new to red wine, Merlot or Grenache is a forgiving place to start, with soft tannins and ripe fruit.',
        ],
        links: [{ text: 'Shop red wine', href: RED }],
      },
      {
        heading: 'Australian regions to know',
        paragraphs: [
          'The Barossa Valley and McLaren Vale in South Australia are famous for Shiraz, Coonawarra is renowned for Cabernet Sauvignon, and cooler regions such as the Yarra Valley and Tasmania make excellent Pinot Noir. Region on the label is a good hint of style.',
        ],
      },
      {
        heading: 'Serving and pairing',
        paragraphs: [
          'Serve red wine slightly cooler than room temperature, around 16 to 18 degrees Celsius, and open fuller wines an hour before drinking. Pair light reds with poultry and mushrooms, medium reds with pasta and pizza, and full-bodied reds with steak and slow-cooked meat.',
          'For a lighter option, see our [white wine styles guide](/blog/white-wine-styles-explained/), or finish the meal with [port](/blog/champagne-vs-sparkling-wine-vs-port/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is the best red wine for beginners?', answer: 'Merlot and Grenache are soft, fruity and low in harsh tannin, which makes them easy starting points.' },
      { question: 'What is the difference between Shiraz and Cabernet Sauvignon?', answer: 'Shiraz is typically rich and spicy with dark fruit, while Cabernet Sauvignon is more structured with blackcurrant and firm tannins.' },
      { question: 'What temperature should red wine be served at?', answer: 'Around 16 to 18 degrees Celsius, slightly below room temperature.' },
      { question: 'Can I buy red wine online in Australia?', answer: 'Yes. Doctors of Whisky ships wine Australia-wide to buyers aged 18 and over with an adult signature on delivery.' },
    ],
  },

  'white-wine-styles-explained': {
    primaryKeyword: 'white wine',
    secondaryKeywords: ['dry white wine', 'types of white wines', 'sweet white wine', 'sauvignon blanc', 'buy white wine online'],
    seoTitle: 'White Wine Styles Explained: Chardonnay to Riesling',
    seoDescription: 'White wine styles explained: Chardonnay, Sauvignon Blanc, Riesling and Semillon, how they differ, serving temperatures and food pairing.',
    updated: UPDATED,
    keyTakeaways: [
      'White wine styles range from crisp and zesty to rich and oaky.',
      'Sauvignon Blanc is zesty, Riesling is aromatic, and Chardonnay can be lean or creamy.',
      'Serve white wine chilled, around 7 to 10 degrees Celsius.',
    ],
    sections: [
      {
        heading: 'The main white grape varieties',
        paragraphs: [
          'Sauvignon Blanc is crisp and herbal with citrus and passionfruit notes. Riesling is aromatic and can be dry or sweet, with lime and floral notes. Chardonnay ranges from lean and mineral to rich and buttery depending on oak and winemaking. Semillon, especially from the Hunter Valley, is light when young and honeyed with age.',
        ],
        links: [{ text: 'Shop white wine', href: WHITE }],
      },
      {
        heading: 'Dry vs sweet',
        paragraphs: [
          'Dry white wine has little residual sugar, while sweet white wine has more. Labels often carry a style or sweetness scale, and terms such as off-dry, late-harvest and moscato indicate sweeter wines.',
          'If you are not sure, a dry Riesling or Sauvignon Blanc is a safe, food-friendly choice.',
        ],
      },
      {
        heading: 'Serving and food pairing',
        paragraphs: [
          'Chill white wine to about 7 to 10 degrees Celsius. Pair Sauvignon Blanc with salads and goat cheese, Riesling with spicy food, and Chardonnay with roast chicken and creamy pasta.',
          'To compare with a bolder style see our [red wine guide](/blog/how-to-choose-red-wine/), or try a chilled [rosé](/blog/everything-about-rose-wine/).',
        ],
      },
    ],
    faqs: [
      { question: 'What are the main types of white wine?', answer: 'The most popular include Chardonnay, Sauvignon Blanc, Riesling, Pinot Gris and Semillon.' },
      { question: 'What is a dry white wine?', answer: 'A dry white wine has little to no residual sugar, so it tastes crisp rather than sweet.' },
      { question: 'What temperature should white wine be served at?', answer: 'Around 7 to 10 degrees Celsius.' },
      { question: 'Which white wine goes with seafood?', answer: 'Crisp, dry whites such as Sauvignon Blanc, Riesling or a lean Chardonnay pair well with seafood.' },
    ],
  },

  'everything-about-rose-wine': {
    primaryKeyword: 'rose wine',
    secondaryKeywords: ['dry rose wine', 'sparkling rose wine', 'best rose wine', 'rose wine australia', 'buy rose wine online'],
    seoTitle: 'Rosé Wine Explained: How It’s Made & How to Serve It',
    seoDescription: 'Everything about rosé wine: how it is made, dry vs sweet styles, best food pairings and how to serve rosé in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'Rosé is made from red grapes with brief skin contact, which gives its pink colour.',
      'Most rosé is dry, though sweeter and sparkling styles exist.',
      'Serve rosé chilled, around 8 to 10 degrees Celsius.',
    ],
    sections: [
      {
        heading: 'How rosé is made',
        paragraphs: [
          'Rosé gets its colour from red grape skins, which are in contact with the juice for only a few hours before being removed. The shorter the contact, the paler the wine. Some producers run off some juice from red wine fermentation, a method called saignée, to make rosé as a by-product.',
          'The result is a light, fresh wine that sits between white and red in style.',
        ],
        links: [{ text: 'Shop rosé wine', href: ROSE }],
      },
      {
        heading: 'Styles: dry, sweet and sparkling',
        paragraphs: [
          'Provence-style rosé is pale and dry with red berry and citrus notes. Deeper-coloured rosés from Grenache or Shiraz are fruitier and fuller. Sweeter styles such as moscato rosé and sparkling rosé are popular for celebrations.',
        ],
      },
      {
        heading: 'Serving and food pairing',
        paragraphs: [
          'Serve rosé chilled, around 8 to 10 degrees Celsius. It pairs with salads, seafood, charcuterie and light barbecue, and it is one of the easiest wines to enjoy in summer.',
          'For bubbles, see our guide to [sparkling wine, Champagne and port](/blog/champagne-vs-sparkling-wine-vs-port/) and learn about [white wine styles](/blog/white-wine-styles-explained/).',
        ],
      },
    ],
    faqs: [
      { question: 'How is rosé wine made?', answer: 'Red grapes are pressed and left in contact with their skins for a short time, then the skins are removed, giving the wine its pink colour.' },
      { question: 'Is rosé sweet or dry?', answer: 'Most rosé is dry, but sweeter styles and sparkling rosé also exist.' },
      { question: 'What temperature should rosé be served at?', answer: 'Around 8 to 10 degrees Celsius.' },
      { question: 'What food goes with rosé?', answer: 'Rosé pairs well with salads, seafood, charcuterie and light barbecue food.' },
    ],
  },

  'champagne-vs-sparkling-wine-vs-port': {
    primaryKeyword: 'sparkling wine',
    secondaryKeywords: ['australian sparkling wine', 'champagne', 'port wine', 'champagne vs sparkling wine', 'buy sparkling wine online'],
    seoTitle: 'Champagne vs Sparkling Wine vs Port: What’s the Difference?',
    seoDescription: 'Champagne vs sparkling wine vs port explained: how each is made, what the labels mean and when to serve them.',
    updated: UPDATED,
    keyTakeaways: [
      'Champagne is sparkling wine from the Champagne region of France, made by the traditional method.',
      'Other sparkling wines, including Australian sparkling, may use the traditional method or tank fermentation.',
      'Port is a fortified wine from Portugal’s Douro Valley, usually 19 to 22% ABV.',
    ],
    sections: [
      {
        heading: 'Champagne',
        paragraphs: [
          'Only sparkling wine made in the Champagne region of France, under strict rules, can be called Champagne. It uses the traditional method, in which a second fermentation happens in the bottle, creating fine bubbles and toasty, yeasty flavours.',
        ],
        links: [{ text: 'Shop sparkling wine', href: SPARKLING }],
      },
      {
        heading: 'Sparkling wine and Prosecco',
        paragraphs: [
          'Sparkling wine is made around the world. Australian producers often use the traditional method with Chardonnay and Pinot Noir. Prosecco, from Italy, is usually made by the tank method, which is faster and produces lighter, fruitier bubbles. Australian producers do not use the name Champagne on their labels.',
        ],
      },
      {
        heading: 'Port',
        paragraphs: [
          'Port is a fortified wine from Portugal’s Douro Valley. Grape spirit is added during fermentation, which stops the yeast, keeps natural sugar in the wine and raises the strength to around 19 to 22% ABV. Styles range from fruity ruby to nutty aged tawny and vintage port.',
          'Serve sparkling wine well chilled for celebrations and port after dinner with cheese or dessert. See our [red wine guide](/blog/how-to-choose-red-wine/) for still wines.',
        ],
        links: [{ text: 'Shop port', href: PORT }],
      },
    ],
    faqs: [
      { question: 'Is sparkling wine the same as Champagne?', answer: 'No. Champagne is sparkling wine made only in the Champagne region of France; other sparkling wines are made elsewhere.' },
      { question: 'What is the traditional method?', answer: 'It is the process of a second fermentation inside the bottle that creates bubbles, used for Champagne and many premium sparkling wines.' },
      { question: 'What is port wine?', answer: 'Port is a fortified wine from Portugal’s Douro Valley, usually 19 to 22% ABV, made by adding grape spirit during fermentation.' },
      { question: 'How should sparkling wine be served?', answer: 'Well chilled, around 6 to 8 degrees Celsius, in a flute or tulip glass.' },
    ],
  },

  'ready-to-drink-premix-trend': {
    primaryKeyword: 'vodka premix',
    secondaryKeywords: ['vodka premix drinks', 'vodka premix cans', 'ready to drink', 'premix drinks australia', 'buy premix online'],
    seoTitle: 'Vodka Premix & Ready-to-Drink Cans: The Trend Explained',
    seoDescription: 'Why ready-to-drink premixes are booming: what is in them, standard drinks, how to choose vodka premix and how to buy cases online.',
    updated: UPDATED,
    keyTakeaways: [
      'Ready-to-drink premixes combine spirit with a mixer in a can or bottle.',
      'Check the label for standard drinks and alcohol strength.',
      'Serve very cold, and buy cases for parties and barbecues.',
    ],
    sections: [
      {
        heading: 'What is a premix?',
        paragraphs: [
          'A premix, or ready-to-drink (RTD), is a pre-mixed alcoholic beverage combining a spirit such as vodka, rum or gin with soda, juice or cola. Because everything is measured and sealed in a can or bottle, it is convenient for picnics, parties and travel.',
        ],
        links: [{ text: 'Shop vodka premix', href: PREMIX }],
      },
      {
        heading: 'Why they are so popular',
        paragraphs: [
          'Premixes are portable, consistent and easy to enjoy, and the range now includes low-sugar and lower-alcohol options. Australians in particular have embraced cans for barbecues and summer events, which has pushed brands to widen flavours and formats.',
        ],
      },
      {
        heading: 'How to choose',
        paragraphs: [
          'Compare alcohol strength, calories and the number of standard drinks printed on the label, since some cans contain more than one standard drink. Serve them very cold, or over ice with a wedge of citrus.',
          'For lower-sugar options see our guide to [zero sugar seltzers](/blog/rise-of-zero-sugar-seltzers/), and for mix-your-own ideas read about the [best home bar mixers](/blog/best-mixers-for-home-bar/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is a vodka premix?', answer: 'A vodka premix is a ready-to-drink beverage that combines vodka with a mixer such as soda, juice or lemonade in a can or bottle.' },
      { question: 'How many standard drinks are in a premix can?', answer: 'It varies by strength and size, so check the standard drinks figure printed on the label.' },
      { question: 'How should premix drinks be served?', answer: 'Very cold, straight from the fridge or over ice.' },
      { question: 'Can I buy premix cases online?', answer: 'Yes. Doctors of Whisky sells premix cases and delivers Australia-wide to buyers aged 18 and over.' },
    ],
  },

  'rise-of-zero-sugar-seltzers': {
    primaryKeyword: 'zero sugar seltzer',
    secondaryKeywords: ['hard seltzer', 'zero sugar drinks', 'low sugar alcohol', 'sparkling seltzer', 'buy seltzer online'],
    seoTitle: 'Zero Sugar Seltzers: Why Hard Seltzer Is Booming',
    seoDescription: 'What is a zero sugar hard seltzer? How it is made, calories and alcohol, how it compares with beer and cider, and how to choose one.',
    updated: UPDATED,
    keyTakeaways: [
      'Hard seltzer is sparkling water with alcohol and light flavouring.',
      'Zero-sugar versions are popular with people who want fewer sugars and calories.',
      'Check ABV and standard drinks, as strengths vary.',
    ],
    sections: [
      {
        heading: 'What is a hard seltzer?',
        paragraphs: [
          'Hard seltzer is a light alcoholic drink made from sparkling water, a fermented sugar or malt base and natural flavours. It is usually around 4 to 5% ABV and tastes light and refreshing rather than sweet or malty.',
        ],
        links: [{ text: 'Shop zero sugar seltzers', href: SELTZER }],
      },
      {
        heading: 'Why zero sugar matters',
        paragraphs: [
          'Many drinkers are watching sugar and calories, and zero-sugar seltzers offer a lighter alternative to sweet premixes and some ciders. Flavours such as lime, grapefruit and berry are popular, and the drinks are typically served very cold from the can.',
        ],
      },
      {
        heading: 'How to choose one',
        paragraphs: [
          'Compare alcohol strength and calories, and read the label rather than relying on marketing, since zero sugar does not mean zero alcohol. Try a few flavours from a mixed case to find your favourite.',
          'For more options see our [premix guide](/blog/ready-to-drink-premix-trend/) and our guide to [non-alcoholic beer](/blog/why-non-alcoholic-beer-is-booming/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is a hard seltzer?', answer: 'It is a light alcoholic drink made from sparkling water, a fermented base and natural flavours, typically around 4 to 5% ABV.' },
      { question: 'Is hard seltzer healthier than beer?', answer: 'It usually has fewer calories and sugars than many beers and premixes, but it still contains alcohol, so drink in moderation.' },
      { question: 'What does zero sugar mean?', answer: 'It means the drink contains no added sugar, though it still contains alcohol.' },
      { question: 'How should I serve hard seltzer?', answer: 'Very cold, straight from the can or over ice with fresh citrus.' },
    ],
  },
};
