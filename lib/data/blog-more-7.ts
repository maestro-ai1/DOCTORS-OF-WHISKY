import type { BlogPost } from '@/lib/types';

type Sections = NonNullable<BlogPost['sections']>;

/** Final sections (rye, Japanese, Australian whisky, vodka, tequila, mezcal, cognac, gin, rum, baijiu). */
export const BLOG_MORE_7: Record<string, Sections> = {
  'beginners-guide-to-rye-whiskey': [
    {
      heading: 'What should a beginner look for on a rye label?',
      paragraphs: [
        'Check four things: whether it says “straight rye” (aged at least two years with nothing added), the age statement (anything under four years should state it), the proof or ABV, and the mash bill if given. A 45 to 50 per cent ABV rye is a good all-rounder for both sipping and cocktails.',
        'If you want an easy first bottle, pick a lower-rye mash bill at around 45 per cent. If you enjoy bold, spicy flavours, move to a 95 to 100 per cent rye or a barrel-proof release. Reading the tasting notes before you buy saves expensive mistakes.',
        'Finally, remember that a bottle of rye lasts a long time. Most drinkers pour 30 mL at a time, so a 700 mL bottle gives more than twenty serves. Store it upright, away from heat and sunlight.',
      ],
    },
  ],
  'why-japanese-whisky-became-a-global-obsession': [
    {
      heading: 'What does Japanese whisky taste like?',
      paragraphs: [
        'Expect elegance rather than power: orchard fruit, honey, white flowers, gentle spice and subtle smoke, with a clean, long finish. Nikka’s malts are often richer and more robust, while Suntory’s Yamazaki leans towards fruit and sweet oak, and Hakushu towards freshness and herbs.',
        'If you like Speyside Scotch, you will likely enjoy Japanese whisky. If you prefer smoky Islay styles, look for Yoichi or other peated expressions.',
      ],
    },
  ],
  'rise-of-australian-single-malt-whisky': [
    {
      heading: 'What should you pay attention to when buying Australian whisky?',
      paragraphs: [
        'Look at the type of cask, whether it is single malt or a blend, the ABV and the release size. Single cask and cask strength bottlings are the most collectable, while standard releases are better for regular drinking. Check whether the whisky is peated, because some producers make both styles.',
        'Pay attention to bottle sizes too. Smaller 100 mL or 200 mL bottles are a low-cost way to try a distillery before you commit to a full bottle. Our range includes small formats such as the [Lark Classic 100 mL](/shop/whisky/lark-classic-100ml-australian-whisky/).',
        'Because releases are small, buying early matters. If you see something that appeals, buy it. Many Australian whiskies sell out within days, and some distilleries sell directly to members first.',
      ],
    },
  ],
  'how-vodka-is-made': [
    {
      heading: 'How do you choose between a 700 mL and a 1 L bottle?',
      paragraphs: [
        'A 700 mL bottle is the traditional size and the easiest to store, while a 1 L bottle gives better value per millilitre and suits parties or regular mixed drinks. At 40 per cent ABV, a 1 L bottle holds around 31 standard drinks, so only buy what you will use.',
        'Smaller bottles of 200 mL or 375 mL are good for trying a new brand. For a bar cart, buy one clean mid-priced vodka for mixing and one premium bottle for martinis.',
      ],
    },
  ],
  'tequila-aging-guide-blanco-reposado-anejo': [
    {
      heading: 'How do you read a tequila label?',
      paragraphs: [
        'Look for “100% de agave”, the category (blanco, reposado, añejo), the NOM number that identifies the distillery, and the region. The NOM lets you find which brands share a distillery, so you can compare styles. Check ABV as well: most tequila is 38 to 40 per cent, while some are bottled stronger.',
        'Be wary of bottles that are very cheap and do not say 100% agave, because they are likely mixto. Also note additives: some tequilas use small amounts of glycerin or sweeteners for smoothness, which is permitted but can change flavour. Brands that say “additive-free” are making a statement about purity.',
      ],
    },
  ],
  'mezcal-vs-tequila-difference': [
    {
      heading: 'How do you choose your first bottle of mezcal?',
      paragraphs: [
        'Choose a joven (unaged) mezcal made from espadín, since it shows the agave and smoke most clearly. Look for a producer that names the maker, region and agave. Avoid very cheap bottles that do not give this information.',
        'If you are nervous about smoke, start with a lightly smoky mezcal and mix it in a cocktail such as a Paloma. If you love peaty Scotch, you will probably enjoy a stronger, smokier bottle neat. Compare a mezcal and a blanco tequila side by side to learn what distinguishes them.',
        'Mezcal is usually sold at 40 to 50 per cent ABV, so check the strength and count standard drinks. Buyers must be 18 or over.',
      ],
    },
  ],
  'cognac-vs-brandy-explained': [
    {
      heading: 'How should you store cognac?',
      paragraphs: [
        'Store cognac upright, in a cool, dark place at a steady temperature. Like whisky, it stops ageing once bottled, so there is no benefit to cellaring it for flavour. An opened bottle keeps for years if sealed, although flavour slowly softens, especially once it is less than a third full.',
        'Keep the box and any certificate for gift or collectable bottles. For rare decanters such as Louis XIII, storage conditions affect value, so keep them away from light and heat.',
      ],
    },
  ],
  'london-dry-vs-contemporary-gin': [
    {
      heading: 'What are the most common gin mistakes?',
      paragraphs: [
        'The biggest is warm tonic and too little ice, which waters down the drink and kills the fizz. Using a flat or cheap tonic is the second. Third, over-garnishing: a slice of citrus or a sprig of herb is enough, and the garnish should echo the gin’s botanicals.',
        'Another is storing gin in direct sunlight, which can dull its aromas. Pour from a bottle kept in a cool cupboard. Finally, do not assume all gin is the same: taste a few styles and learn which botanicals you prefer.',
        'If you want a ready-made option while you explore, a canned gin and tonic such as [24 Ice Gin & Tonic](/shop/beer-premix-wine/24-ice-gin-tonic/) is a convenient way to try the style.',
      ],
    },
  ],
  'white-spiced-dark-rum-guide': [
    {
      heading: 'What should you look for when buying rum in Australia?',
      paragraphs: [
        'Decide the use first: white for cocktails, spiced for easy mixers, dark for sipping. Check the age statement, the ABV and any mention of added sugar or flavouring. Look at the producer and the country, since Jamaican, Barbadian and Cuban-style rums taste very different.',
        'Compare sizes and prices, including 200 mL and 1 L bottles. Gift sets and limited editions, such as a sherry cask finish like [Bacardi Cuarto Sherry](/shop/spirit/bacardi-cuarto-sherry-spiced-rum/), can add interest. If you enjoy a spiced style, our [spiced rum collection](/shop/spirit/collection/spiced-rum/) shows the range.',
      ],
    },
  ],
  'what-is-baijiu': [
    {
      heading: 'How do you start with baijiu if you have never tried it?',
      paragraphs: [
        'Taste a small amount first and smell it before drinking, because the aroma is often a surprise. Sip rather than shoot, and let it sit on your tongue. Try it with food, since it softens the intensity.',
        'Choose a lighter aroma style for your first try. Many people dislike baijiu the first time and love it later, so give it a few tastings. Take notes on what you smell: fruit, soy, sesame, cheese or flowers.',
        'If you enjoy it, explore the aroma categories one by one. Sauce aroma is a good second step, followed by strong aroma. As always, buyers must be 18 or over.',
      ],
    },
  ],
};
