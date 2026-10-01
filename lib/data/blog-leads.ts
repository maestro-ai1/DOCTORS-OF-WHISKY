/**
 * Answer-first lead paragraphs (placed before the intro, with the primary keyword in the first 100 words) and
 * keyword-aligned H1 / SEO titles. Merged over the base post in lib/data/blog.ts.
 */
export const BLOG_LEADS: Record<string, string> = {
  'what-makes-bourbon-different': 'Bourbon whiskey is American whiskey made from at least 51% corn and aged in new charred oak. That rulebook, not the state of Kentucky, is what defines it. Here is how bourbon whiskey is made, how it differs from Scotch, rye and Tennessee whiskey, and which bottles to try first.',
  'why-japanese-whisky-became-a-global-obsession': 'Nikka whiskey and Suntory’s Yamazaki are the two names behind Japan’s whisky boom. Inspired by Scotch but refined into a more delicate style, Japanese whisky now wins international awards and sells out fast. Here is why it became so popular and how to buy the real thing.',
  'how-vodka-is-made': 'How is vodka made? Vodka is made by fermenting a grain or potato base, distilling it to a very high strength, filtering it and diluting it with water. This guide explains each step, what changes the taste, and how to choose a good bottle.',
  'cognac-vs-brandy-explained': 'What is cognac? Cognac is a brandy made from white grapes in the Cognac region of France, double distilled in copper pot stills and aged in French oak. All cognac is brandy, but few brandies are cognac. Here is how they differ and how to read VS, VSOP and XO.',
  'what-is-baijiu': 'Chinese baijiu is a clear spirit distilled from fermented sorghum and other grains, usually at 35 to 60% ABV, and it is the best-selling spirit in the world by volume. It tastes nothing like vodka. This guide explains the styles, the famous Moutai and how to drink it.',
  'amaro-101-italy-bittersweet-tradition': 'Amaro Montenegro is one of Italy’s best-loved bitter liqueurs, and it is a good first step into amaro, the bittersweet herbal liqueurs Italians drink after dinner. Here is what amaro is, how Montenegro, Averna and Del Capo differ, and how to drink them.',
  'best-cream-coffee-liqueurs-for-cocktails': 'Kahlúa liquor is a rum-based Mexican coffee liqueur, and Baileys is an Irish whiskey and cream liqueur. Together they power the espresso martini, White Russian and Mudslide. This guide explains how they differ, the best cocktails to make and how to store them.',
  'soju-explained-koreas-spirit': 'The soju alcohol percentage is typically 16 to 17% ABV for the common green bottle, with flavoured soju lower and premium soju higher. A 360 mL bottle holds about 4.8 Australian standard drinks. Here is how soju is made, the best brands and how to drink it.',
  'why-non-alcoholic-beer-is-booming': 'Alcohol free beer has gone from a novelty to a mainstream choice in Australia. It is brewed normally and dealcoholised, or made with limited fermentation, and it is labelled non-alcoholic at 0.5% ABV or below. Here is why it is booming, what the labels mean and what to buy.',
  'guide-to-australian-craft-cider': 'Cider Australia is a growing category, from crisp dry apple cider to sweet fruit cider and pear perry. Most cider is 4 to 8% ABV and made from fermented fruit. This guide covers styles, regions, food pairings and which ciders to try.',
  'white-wine-styles-explained': 'Sauvignon Blanc is one of the most popular fresh white wines in Australia and New Zealand, but it is just one of several styles. Chardonnay, Riesling and Pinot Grigio each taste different. Here is how white wine styles differ, what dry and sweet mean, and how to serve them.',
  'everything-about-rose-wine': 'Sparkling rosé and still rosé are made from red grapes with brief skin contact, which gives the pink colour. Rosé can be dry, fruity or sweet, so colour is not a guide. Here is how rosé is made, the main styles and how to serve and pair it.',
  'ready-to-drink-premix-trend': 'Premixed drinks are ready-to-drink cocktails and spirit mixers in cans and bottles, typically 4 to 7% ABV. Premix is a large and fast-growing category in Australia. Here is why it is so popular, how to read the label and which styles to try.',
  'rise-of-zero-sugar-seltzers': 'Vodka soda premix and hard seltzers are light, clean-tasting alcoholic drinks that are often low in sugar. Most are 4 to 5% ABV, though some ranges reach 9.9%. Here is how they are made, how to read the label for sugar and standard drinks, and how to choose one.',
  'best-mixers-for-home-bar': 'Does ginger beer have alcohol? Most ginger beer sold in shops is non-alcoholic, but alcoholic ginger beer exists and is labelled with its ABV. This is part of choosing the best mixers for a home bar, from tonic to soda, with classic ratios and storage tips.',
  'how-to-store-and-cellar-rare-whisky': 'How to store whisky: keep bottles upright, in a cool, dark place at a steady 15 to 20 degrees, with the cork protected and the original box kept. Whisky does not age in the bottle, so storage is about preserving it. Here is the full guide for Australian conditions.',
  'don-julio-vs-patron-tequila-compared': 'Don Julio Blanco and Patrón Silver are the two most popular premium tequilas, and both are made from 100% blue Weber agave. Don Julio tastes richer and rounder, Patrón crisper and more citrus-led. Here is how they compare across blanco, reposado and añejo.',
  'grey-goose-vs-belvedere-vodka-compared': 'Belvedere vodka is a Polish rye vodka with a creamy, slightly spicy character, while Grey Goose is a French wheat vodka that tastes soft and rounded. Both are ultra-premium. Here is how they are made, how they taste side by side and which to choose.',
  'beginners-guide-investing-in-rare-whisky': 'Investing in whisky means buying rare or collectable bottles in the hope they rise in value, and it carries real risk. Provenance, condition and authenticity drive price, and selling can take time. This is general information, not financial advice.',
};

export const BLOG_TITLES: Record<string, { title: string; seoTitle?: string }> = {
  'single-malt-vs-blended-scotch': { title: 'Single Malt Scotch Whisky vs Blended Scotch: What’s the Real Difference?', seoTitle: 'Single Malt Scotch Whisky vs Blended Scotch Guide' },
  'beginners-guide-to-rye-whiskey': { title: 'What Is Rye Whiskey? A Beginner’s Guide to Rye' },
  'why-japanese-whisky-became-a-global-obsession': { title: 'Nikka Whiskey, Yamazaki and Why Japanese Whisky Became a Global Obsession', seoTitle: 'Nikka Whiskey, Yamazaki and Japanese Whisky Guide' },
  'rise-of-australian-single-malt-whisky': { title: 'Lark Whisky and the Rise of Australian Single Malt' },
  'cognac-vs-brandy-explained': { title: 'What Is Cognac? Cognac vs Brandy Explained' },
  'what-is-baijiu': { title: 'What Is Chinese Baijiu? China’s Iconic Spirit Explained' },
  'amaro-101-italy-bittersweet-tradition': { title: 'Amaro Montenegro and Italy’s Bittersweet Amaro Tradition' },
  'best-cream-coffee-liqueurs-for-cocktails': { title: 'Kahlúa Liquor, Baileys and the Best Cream and Coffee Liqueurs', seoTitle: 'Kahlúa Liquor, Baileys and Coffee Liqueur Cocktails' },
  'soju-explained-koreas-spirit': { title: 'Soju Alcohol Percentage and Guide: Korea’s Most Popular Spirit' },
  'why-non-alcoholic-beer-is-booming': { title: 'Alcohol Free Beer: Why Non-Alcoholic Beer Is Booming in Australia' },
  'guide-to-australian-craft-cider': { title: 'Cider Australia: A Guide to Australian Craft Cider' },
  'how-to-choose-red-wine': { title: 'Shiraz Wine and How to Choose the Right Red Wine' },
  'white-wine-styles-explained': { title: 'Sauvignon Blanc, Chardonnay and Riesling: White Wine Styles Explained' },
  'everything-about-rose-wine': { title: 'Sparkling Rosé and Everything You Need to Know About Rosé Wine', seoTitle: 'Sparkling Rosé and Rosé Wine: Styles, Serving, Buying' },
  'ready-to-drink-premix-trend': { title: 'Premixed Drinks: Why Ready-to-Drink Premixes Are Taking Over' },
  'rise-of-zero-sugar-seltzers': { title: 'Vodka Soda Premix and the Rise of Zero Sugar Seltzers in Australia', seoTitle: 'Vodka Soda Premix and Zero Sugar Seltzers: A Guide' },
  'best-mixers-for-home-bar': { title: 'Does Ginger Beer Have Alcohol? The Best Mixers for Your Home Bar', seoTitle: 'Does Ginger Beer Have Alcohol? Best Home Bar Mixers' },
  'macallan-sherry-cask-legacy': { title: 'Macallan Whisky: Inside The Macallan’s Sherry Cask Legacy' },
  'don-julio-vs-patron-tequila-compared': { title: 'Don Julio Blanco vs Patrón: Comparing Mexico’s Icon Tequilas' },
};
