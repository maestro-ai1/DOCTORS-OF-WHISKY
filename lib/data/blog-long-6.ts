import type { BlogPost } from '@/lib/types';

const UPDATED = '2026-10-01';
const SCOTCH = '/shop/whisky/collection/scotch-whisky/';

/** Long-form guides, batch 6 (Macallan, storage, tequila and vodka comparisons, investing). Keyword volumes / KD are from the keyword bank
 *  except storage and investing, where the bank has no data and the primaries are evergreen long-tail topics. */
export const BLOG_LONG_6: Record<string, Partial<BlogPost>> = {
  // macallan whisky 1000/12 · macallan 12 5400/15 · macallan 18 2900/13 · macallan 12 double cask 590/13
  'macallan-sherry-cask-legacy': {
    primaryKeyword: 'macallan whisky',
    secondaryKeywords: ['macallan 12', 'macallan 18', 'macallan 25', 'macallan 15', 'macallan rare cask', 'macallan 12 double cask', 'macallan 12 sherry oak'],
    seoTitle: 'Macallan Whisky: The Sherry Cask Legacy and Range Guide',
    seoDescription: 'Macallan whisky explained: why sherry oak casks define its style, how Sherry Oak, Double Cask and Colour Collection differ, and which age to buy in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'The Macallan is a Speyside single malt famous for maturing whisky in sherry-seasoned oak casks.',
      'Sherry Oak, Double Cask and Colour Collection are different ranges with different cask recipes.',
      'Older bottlings (18, 25 and above) are scarcer and priced as collectables.',
      'Check the range, age statement and cask description rather than the age alone.',
    ],
    sections: [
      {
        heading: 'What is The Macallan?',
        paragraphs: [
          'The Macallan is a single malt Scotch whisky distillery on the Easter Elchies estate in Speyside, Scotland. It has held a licence since 1824, and it is one of the most recognised and collected whisky brands in the world.',
          'It is known for a rich, fruity, spicy style, with a deep amber colour that comes from cask rather than additives, according to the distillery. The house style rests on three pillars: small stills, a narrow spirit cut and, above all, sherry-seasoned oak casks.',
        ],
      },
      {
        heading: 'Why does sherry oak matter so much?',
        paragraphs: [
          'Most of Scotland’s whisky is aged in ex-bourbon barrels. The Macallan has long favoured oak casks that held Spanish sherry, which gives dried fruit, ginger, cinnamon, orange peel and a deeper colour. The distillery works with Spanish cooperages to build and season casks in Jerez, then ships them to Scotland.',
          'This is also why Macallan whisky tastes richer than many Speyside peers. For a wider look at how cask choice affects Scotch, read our guide to [single malt versus blended Scotch](/blog/single-malt-vs-blended-scotch/).',
        ],
      },
      {
        heading: 'What is the difference between Sherry Oak and Double Cask?',
        paragraphs: [
          'The Sherry Oak range is matured in sherry-seasoned European and American oak, and it is the classic, full-bodied Macallan, available at 12, 18, 25 and 30 years. The Double Cask range combines sherry-seasoned American and European oak casks, giving a sweeter, honeyed, vanilla-led profile, with the sherry spice in a supporting role.',
          'The Colour Collection and other ranges use natural colour and specific cask selections. Browse them in our [Scotch whisky collection](/shop/whisky/collection/scotch-whisky/) including [Macallan 12 Sherry Oak](/shop/whisky/macallan-12-sherry-oak-scotch-whisky/) and [Macallan 12 Double Cask](/shop/whisky/macallan-12yo-double-scotch-whisky/).',
        ],
        links: [{ text: 'Shop Macallan and Scotch', href: SCOTCH }],
      },
      {
        heading: 'Which Macallan age should you buy?',
        paragraphs: [
          'The 12 year old is the entry point, balanced and rich enough to show the style. The 15 and 18 year olds add depth, more oak and dried fruit, and are popular for gifting. The 25 and 30 year olds are much scarcer and priced as collectables.',
          'Age is only part of the picture. A 12 year old Sherry Oak will taste different from a 12 year old Double Cask. Compare notes before choosing. For a special bottle, see the [Macallan 18 Colour Collection](/shop/whisky/macallan-18yo-colour-collection-scotch-whisky/) or the [Macallan 25 Year Old Sherry Oak](/shop/whisky/macallan-25-year-old-sherry-oak-single-malt/).',
        ],
      },
      {
        heading: 'Why are older Macallans so valuable?',
        paragraphs: [
          'Scarcity and demand drive the price. Whisky does not age in the bottle, so every old Macallan comes from a limited stock of casks laid down decades ago. Limited releases and special packaging add collector interest, and rare bottles trade at auction for high prices.',
          'Value can fall as well as rise, and counterfeits exist in the secondary market. If you are buying for investment, read our [beginner’s guide to investing in rare whisky](/blog/beginners-guide-investing-in-rare-whisky/) and learn [how to store a bottle properly](/blog/how-to-store-and-cellar-rare-whisky/).',
        ],
      },
      {
        heading: 'How does Macallan compare with other Speyside whisky?',
        paragraphs: [
          'Glenfiddich is typically lighter and fruitier, with pear and apple notes. The Macallan is richer, spicier and more sherried. GlenDronach, from the Highlands, is another heavily sherried malt that often costs less for a similar age.',
          'If you like Macallan’s style, it is worth trying GlenDronach and Glenfiddich’s older expressions as comparison. See the full [Scotch whisky collection](/shop/whisky/collection/scotch-whisky/) for options.',
        ],
      },
      {
        heading: 'How should you taste Macallan?',
        paragraphs: [
          'Pour a small measure into a tulip glass, nose for dried fruit, orange and spice, then sip neat. A few drops of water will open the whisky. Pair with dark chocolate, orange peel, aged cheese or a good cigar for a classic Macallan experience.',
          'Store the bottle upright, out of sunlight, and keep the box if you plan to sell it later. Buyers must be 18 or over.',
        ],
      },
    ],
    faqs: [
      { question: 'What is The Macallan?', answer: 'The Macallan is a single malt Scotch whisky distillery in Speyside, Scotland, known for maturing whisky in sherry-seasoned oak casks.' },
      { question: 'What is the difference between Macallan Sherry Oak and Double Cask?', answer: 'Sherry Oak is matured in sherry-seasoned oak for a rich, spicy style, while Double Cask combines sherry-seasoned American and European oak for a sweeter, honeyed profile.' },
      { question: 'Why is Macallan so expensive?', answer: 'Sherry-seasoned oak casks are costly, ageing takes years, stocks are limited and collector demand is high, especially for older and limited releases.' },
      { question: 'Is Macallan 12 worth buying?', answer: 'Yes. It is balanced, rich and a good introduction to the Macallan style, especially in Sherry Oak or Double Cask.' },
      { question: 'Does Macallan add colour?', answer: 'According to the distillery, Macallan’s colour is natural and comes from the casks.' },
      { question: 'How should I drink Macallan?', answer: 'Sip it neat in a tulip glass, with a few drops of water if you like. Avoid ice, which mutes the flavour.' },
    ],
  },

  // evergreen topic, no keyword-bank data
  'how-to-store-and-cellar-rare-whisky': {
    primaryKeyword: 'how to store whisky',
    secondaryKeywords: ['whisky storage', 'does whisky go bad', 'how long does whisky last once opened', 'store whisky upright', 'whisky cellar', 'how to store opened whisky'],
    seoTitle: 'How to Store Whisky: Unopened, Opened and Rare Bottles',
    seoDescription: 'How to store whisky in Australia: keep bottles upright, cool and dark, how long opened whisky lasts, whether whisky goes bad and how to protect rare bottles.',
    updated: UPDATED,
    keyTakeaways: [
      'Store whisky upright, away from sunlight and heat, at a steady temperature of about 15 to 20 degrees.',
      'Whisky does not age or improve in the bottle, so a bottle opened or unopened will not mature further.',
      'Unopened whisky lasts indefinitely if stored well, and opened whisky lasts for years if sealed and kept more than a third full.',
      'For rare bottles, protect the cork, label, box and fill level, because they affect value.',
    ],
    sections: [
      {
        heading: 'Does whisky go bad?',
        paragraphs: [
          'Unopened whisky does not go bad. Because of its high alcohol content, a sealed bottle stored properly will keep for decades. The main risks are a failing cork, evaporation through the seal and damage from light and heat, not spoilage.',
          'Opened whisky also lasts a long time, but oxygen slowly changes the flavour. It will not become unsafe, but delicate aromas can dull over time, particularly once the bottle is less than about a third full.',
        ],
      },
      {
        heading: 'Why store whisky upright?',
        paragraphs: [
          'Unlike wine, whisky should stand upright. Whisky’s strength can degrade a cork that touches the liquid for long periods, causing it to crumble, taint the spirit and weaken the seal. Upright storage keeps the cork dry.',
          'This matters most for old bottles with natural corks. For screw-cap bottles it is less critical, but upright is still the standard practice.',
        ],
      },
      {
        heading: 'What temperature and humidity are best?',
        paragraphs: [
          'Aim for a cool, stable temperature of about 15 to 20 degrees Celsius. Stability matters more than the exact number, because repeated heating and cooling cycles expand and contract the liquid and the air above it, which stresses the closure. In Australia, avoid garages, sheds, cars, attics and top shelves in summer.',
          'Moderate humidity of about 50 to 70 per cent helps keep corks and labels in good condition. A fridge is not necessary and can damage labels with condensation.',
        ],
      },
      {
        heading: 'How should you protect whisky from light?',
        paragraphs: [
          'Sunlight and strong artificial light can fade labels and boxes and may alter the colour and flavour of some whisky. Keep bottles in a cabinet, in their original tubes or boxes, or in a dark cupboard away from windows.',
          'Display bottles in a glass cabinet only if the cabinet is out of direct sunlight, or use LED lighting that does not generate heat. This is especially important for rare bottles where condition affects value.',
        ],
      },
      {
        heading: 'How long does opened whisky last?',
        paragraphs: [
          'A bottle that is more than half full and tightly sealed will stay in good condition for years. Between a third and a half full, it will usually be fine for a year or two. Below a third, oxidation speeds up, and you may notice flatter aromas.',
          'To slow this, transfer the remaining whisky to a smaller bottle or use inert gas such as a preservation spray. Wrapping a cork with Parafilm can help prevent evaporation for long-term storage. Finish bottles you love rather than saving them forever.',
        ],
      },
      {
        heading: 'How do you protect rare and collectable bottles?',
        paragraphs: [
          'Keep original boxes, tubes and paperwork, which are part of the bottle’s value. Check the fill level, capsule and label condition, and avoid handling bottles by the neck or label. Record where and when you bought each bottle.',
          'Consider insurance, because home and contents policies often limit cover for alcohol and collectables. If you are buying for investment, see our [beginner’s guide to investing in rare whisky](/blog/beginners-guide-investing-in-rare-whisky/) and explore [the rare bottles in our Scotch whisky collection](/shop/whisky/collection/scotch-whisky/).',
        ],
        links: [{ text: 'Shop rare Scotch', href: SCOTCH }],
      },
      {
        heading: 'What other drinks need special storage?',
        paragraphs: [
          'Cream liqueurs such as Baileys should be kept cool and consumed within the label’s dates. Wine should be stored on its side in a cool, dark place at a steady temperature. Beer is best kept cold and out of the light.',
          'For more, see our guides to [cream and coffee liqueurs](/blog/best-cream-coffee-liqueurs-for-cocktails/) and [how to choose red wine](/blog/how-to-choose-red-wine/). Buyers must be 18 or over.',
        ],
      },
    ],
    faqs: [
      { question: 'Does whisky go bad?', answer: 'Unopened whisky does not go bad if stored well. Opened whisky stays good for years, though flavour can dull as oxygen interacts with it.' },
      { question: 'Should whisky be stored upright or on its side?', answer: 'Whisky should be stored upright, because its high alcohol content can damage a cork that stays in contact with the liquid.' },
      { question: 'How long does opened whisky last?', answer: 'A sealed bottle that is more than half full can last for years. Below a third full, oxidation speeds up and flavour may dull.' },
      { question: 'Does whisky age in the bottle?', answer: 'No. Whisky stops maturing once it is bottled, so it does not improve with age in the bottle.' },
      { question: 'Should I keep whisky in the fridge?', answer: 'No. A fridge is not necessary, and condensation can damage labels. Store whisky in a cool, dark place.' },
      { question: 'What temperature should whisky be stored at?', answer: 'A steady 15 to 20 degrees Celsius is ideal. Avoid heat, sunlight and big temperature swings.' },
    ],
  },

  // don julio blanco 1000/13 · patron silver tequila 720/17 · don julio reposado 720/17 · patron tequila 3600/13
  'don-julio-vs-patron-tequila-compared': {
    primaryKeyword: 'don julio blanco',
    secondaryKeywords: ['patron silver tequila', 'don julio reposado', 'reposado don julio', 'patron tequila', 'patron tequila price', 'don julio 1942', 'patron reposado'],
    seoTitle: 'Don Julio vs Patrón: Blanco, Reposado and Añejo Compared',
    seoDescription: 'Don Julio vs Patrón tequila compared: history, production, Blanco and Reposado tasting notes, price and which to buy for margaritas, sipping or gifts.',
    updated: UPDATED,
    keyTakeaways: [
      'Don Julio (1942) and Patrón (1989) both make 100% blue Weber agave tequila in Jalisco.',
      'Don Julio is typically richer and rounder, and Patrón is crisper, lighter and more citrus-led.',
      'Both are excellent in margaritas at blanco level, and both reposado and añejo are good sipped.',
      'The better choice depends on whether you want a smooth sipper or a bright cocktail tequila.',
    ],
    sections: [
      {
        heading: 'What is the difference between Don Julio and Patrón?',
        paragraphs: [
          'Both are premium 100% agave tequilas from Jalisco, and both are widely available. Don Julio is the older, founded in 1942 by Don Julio González, and is known for rich, rounded tequila. Patrón was launched in 1989 and became a global ultra-premium brand, with a lighter, brighter and more citrus-forward style.',
          'Don Julio is owned by Diageo and Patrón is owned by Bacardi, but the two brands are still largely defined by their founders’ styles. Read the basics in our [tequila ageing guide](/blog/tequila-aging-guide-blanco-reposado-anejo/).',
        ],
      },
      {
        heading: 'How do their blancos compare?',
        paragraphs: [
          'Don Julio Blanco is soft and smooth, with cooked agave, vanilla-like sweetness and a gentle peppery finish. Patrón Silver is crisper and more floral, with citrus, fresh agave and a slightly drier finish.',
          'For margaritas and palomas, either works well, but Patrón’s brightness stands out in lime-heavy drinks while Don Julio’s softness suits sipping. See [Don Julio Blanco](/shop/spirit/don-julio-blanco-don-julio/) and [Patrón Silver](/shop/spirit/patron-silver-white-tequila/).',
        ],
        links: [{ text: 'Shop Don Julio', href: '/shop/spirit/collection/don-julio/' }],
      },
      {
        heading: 'How do their reposados compare?',
        paragraphs: [
          'Reposados rest in oak for at least two months. Don Julio Reposado tends towards caramel, toasted oak and baking spice with a smooth finish. Patrón Reposado is lighter, with honey, orange peel and subtle oak.',
          'If you like richer, sweeter tequila, choose Don Julio. If you like a crisper style that keeps more of the agave and citrus, choose Patrón. Try [Don Julio Reposado](/shop/spirit/don-julio-reposado-don-julio/).',
        ],
      },
      {
        heading: 'What about añejo and the premium bottles?',
        paragraphs: [
          'Don Julio Añejo is aged at least a year and tastes of vanilla, caramel and dried fruit. Don Julio 1942 is aged for a minimum of two and a half years and is one of the world’s best-known luxury tequilas. Patrón’s premium line includes Gran Patrón expressions such as the Burdeos, finished in French red wine casks.',
          'These are sipping tequilas. Serve them neat in a snifter or over a large cube. See [Don Julio Añejo](/shop/spirit/don-julio-anejo-don-julio/) and [Gran Patrón Burdeos](/shop/spirit/gran-patron-burdeos-extra-anejo-tequila/).',
        ],
      },
      {
        heading: 'How are they made?',
        paragraphs: [
          'Both use 100% blue Weber agave and traditional cooking, fermentation and double distillation. Patrón is known for using a mix of roller mill and tahona (a volcanic stone wheel) to crush cooked agave. Don Julio uses its own long-established process and ages in American oak barrels.',
          'Production details are marketed heavily, but both brands make reliable, well-crafted tequila. Taste is the better test.',
        ],
      },
      {
        heading: 'Which is better value?',
        paragraphs: [
          'Both are priced as premium tequila, and their price tiers are similar. Don Julio’s blanco and reposado are generally easy to find, and Patrón is widely stocked. Compare per-millilitre prices, sizes and gift boxes.',
          'See the [Don Julio collection](/shop/spirit/collection/don-julio/) and [Patrón collection](/shop/spirit/collection/patron/) for current options. Buyers must be 18 or over.',
        ],
        links: [{ text: 'Shop Patrón', href: '/shop/spirit/collection/patron/' }],
      },
      {
        heading: 'Which should you choose?',
        paragraphs: [
          'Choose Don Julio for sipping, gifting and a rounder, richer style. Choose Patrón for bright margaritas and a crisp, citrus-led style. If you cannot decide, buy a Don Julio Reposado for sipping and a Patrón Silver for cocktails.',
          'For a different agave spirit, see our guide to [mezcal versus tequila](/blog/mezcal-vs-tequila-difference/).',
        ],
      },
    ],
    faqs: [
      { question: 'Is Don Julio better than Patrón?', answer: 'Neither is better. Don Julio is richer and rounder, while Patrón is crisper and more citrus-led. Choose by taste and how you plan to drink it.' },
      { question: 'Who owns Don Julio and Patrón?', answer: 'Don Julio is owned by Diageo and Patrón is owned by Bacardi.' },
      { question: 'Is Don Julio 100% agave?', answer: 'Yes. Don Julio and Patrón both make their tequila from 100% blue Weber agave.' },
      { question: 'What is Don Julio 1942?', answer: 'Don Julio 1942 is a premium añejo tequila aged for a minimum of two and a half years.' },
      { question: 'Which is better for margaritas?', answer: 'Either blanco works. Patrón Silver’s brightness suits lime-heavy margaritas, while Don Julio Blanco gives a softer drink.' },
      { question: 'What is the difference between blanco and reposado?', answer: 'Blanco is unaged or rested briefly, while reposado is aged in oak for two months to a year, adding colour and flavour.' },
    ],
  },

  // belvedere vodka 6600/15 · grey goose vodka 5400/29 · belvedere reservation 1300/22 · grey goose 1l 1600/17
  'grey-goose-vs-belvedere-vodka-compared': {
    primaryKeyword: 'belvedere vodka',
    secondaryKeywords: ['grey goose vodka', 'grey goose liquor', 'belvedere reservation', 'grey goose 1l', 'grey goose 700ml', 'grey goose 1 litre', 'grey goose vs belvedere'],
    seoTitle: 'Belvedere Vodka vs Grey Goose: Which Premium Vodka Wins?',
    seoDescription: 'Belvedere vodka vs Grey Goose compared: wheat vs rye, production, taste, price and which to choose for a martini, mixed drinks or a gift in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'Grey Goose is a French wheat vodka, and Belvedere is a Polish rye vodka.',
      'Grey Goose tastes soft, round and slightly sweet, while Belvedere is creamier with a hint of vanilla and white pepper.',
      'Both are excellent in martinis and neat, and both are overkill for strongly flavoured mixers.',
      'Choose by texture: Grey Goose for smooth, Belvedere for rich and slightly spicy.',
    ],
    sections: [
      {
        heading: 'What is the main difference between Belvedere and Grey Goose?',
        paragraphs: [
          'Origin and grain. Belvedere is made in Poland from Polish rye, and Grey Goose is made in France from French winter wheat. Rye generally gives a richer, creamier, slightly spicy vodka, while wheat gives a softer, rounder, gently sweet one.',
          'Both are marketed as ultra-premium, and both are consistently well made. The difference is more about style than quality.',
        ],
      },
      {
        heading: 'How is Belvedere made?',
        paragraphs: [
          'Belvedere is distilled in Żyrardów, Poland, from Dankowskie rye and is distilled four times, according to the brand. The brand says it uses no additives, and it is owned by LVMH.',
          'The result is creamy, slightly peppery and a touch sweet. Compare sizes and variants in our [Belvedere collection](/shop/spirit/collection/belvedere/) and [Polish vodka collection](/shop/spirit/collection/polish-vodka/), including [Belvedere 700 mL](/shop/spirit/belvedere-700-polish-vodka/).',
        ],
        links: [{ text: 'Shop Belvedere', href: '/shop/spirit/collection/belvedere/' }],
      },
      {
        heading: 'How is Grey Goose made?',
        paragraphs: [
          'Grey Goose is made in the Cognac region of France from French winter wheat, fermented and distilled in column stills. Its water comes from a spring filtered through limestone, and the brand highlights its blending by a master distiller. It was launched in 1997 and is now owned by Bacardi.',
          'The taste is soft and rounded, with light sweetness and a clean finish. See [Grey Goose 700 mL](/shop/spirit/grey-goose-700ml-french-vodka/) and the [Grey Goose collection](/shop/spirit/collection/grey-goose/).',
        ],
        links: [{ text: 'Shop Grey Goose', href: '/shop/spirit/collection/grey-goose/' }],
      },
      {
        heading: 'How do they taste side by side?',
        paragraphs: [
          'Chill both and taste them neat in small glasses. Grey Goose is smooth and slightly sweet, with a light, silky finish. Belvedere is fuller and creamier, with a touch of vanilla, white pepper and a longer finish.',
          'For a martini, Grey Goose gives a clean, elegant drink, and Belvedere gives more body and character. Taste them blind with friends, because the difference is subtle and the results are often surprising.',
        ],
      },
      {
        heading: 'Which is better for cocktails?',
        paragraphs: [
          'In a martini or vodka soda with a lot of lime, either is excellent. For strongly flavoured mixes such as a Bloody Mary or a Moscow Mule, the differences disappear, so a cheaper vodka is more sensible.',
          'Save premium vodka for drinks where it is the main flavour. For a guide to using vodka in mixes, see [how vodka is made](/blog/how-vodka-is-made/) and [the best mixers for your home bar](/blog/best-mixers-for-home-bar/).',
        ],
      },
      {
        heading: 'What about flavoured and limited editions?',
        paragraphs: [
          'Both brands make flavoured vodkas and limited-edition bottles. Grey Goose Essences blend natural fruit and botanical flavours, such as [Peach & Rosemary](/shop/spirit/grey-goose-essences-peach-rosemary-french-vodka/) and Watermelon & Basil. Belvedere offers citrus and ginger flavours, including [Belvedere Citrus](/shop/spirit/belvedere-citrus-polish-vodka/).',
          'Flavoured vodkas are easy to mix and suit casual drinking, and limited editions make good gifts.',
        ],
      },
      {
        heading: 'Which should you buy?',
        paragraphs: [
          'Buy Grey Goose if you want a smooth, soft vodka that is easy to like. Buy Belvedere if you want a richer, creamier vodka with more character. If you are choosing a gift, either in a gift box makes a good impression.',
          'Check bottle sizes and prices, from 700 mL to 1 L, in each collection. Buyers must be 18 or over. If you like Polish and French styles, compare with our [Russian vodka collection](/shop/spirit/collection/russian-vodka/).',
        ],
      },
    ],
    faqs: [
      { question: 'Is Belvedere better than Grey Goose?', answer: 'Neither is better. Belvedere is richer and creamier, while Grey Goose is softer and rounder. Choose by texture and taste.' },
      { question: 'What is Belvedere made from?', answer: 'Belvedere is made from Polish rye, according to the brand, and is distilled in Poland.' },
      { question: 'What is Grey Goose made from?', answer: 'Grey Goose is made from French winter wheat and is produced in the Cognac region of France.' },
      { question: 'Who owns Belvedere and Grey Goose?', answer: 'Belvedere is owned by LVMH and Grey Goose is owned by Bacardi.' },
      { question: 'Are Belvedere and Grey Goose worth the price?', answer: 'They are smooth and well-made, so they are worth it for neat sipping and martinis. For heavily flavoured mixers, a cheaper vodka works as well.' },
      { question: 'What size bottles are available?', answer: 'Both are sold in sizes from 700 mL to 1 L, and Doctors of Whisky also lists smaller sizes and gift editions.' },
    ],
  },

  // evergreen topic, no keyword-bank data; the bank's rare-cask Macallan terms are used as secondary support
  'beginners-guide-investing-in-rare-whisky': {
    primaryKeyword: 'investing in whisky',
    secondaryKeywords: ['rare whisky', 'macallan rare cask', 'macallan harmony collection', 'whisky investment', 'whisky as an investment', 'collectable whisky', 'whisky auction'],
    seoTitle: 'Investing in Rare Whisky: A Beginner’s Guide for Australians',
    seoDescription: 'A beginner’s guide to investing in rare whisky: how value works, provenance, storage, fees, counterfeits, liquidity and the risks, and what collectors buy.',
    updated: UPDATED,
    keyTakeaways: [
      'Rare whisky can rise or fall in value, and this guide is general information, not financial advice.',
      'Provenance, condition and authenticity drive value, so buy from reputable sellers and keep paperwork.',
      'Costs include storage, insurance and auction or dealer fees, and selling can take time.',
      'Start by buying whisky you want to own, which makes a downturn easier to accept.',
    ],
    sections: [
      {
        heading: 'Is rare whisky a good investment?',
        paragraphs: [
          'Prices for rare whisky rose strongly through the 2010s and early 2020s, and some bottles have sold at auction for six or seven figures. But it is an alternative asset, not a guaranteed one. Prices can fall as well as rise, markets cool, and the whisky you buy may be hard to sell at the price you expect.',
          'This guide is general information only and is not financial advice. Speak to a licensed adviser and consider your tax situation before investing significant money.',
        ],
      },
      {
        heading: 'What makes a bottle valuable?',
        paragraphs: [
          'Scarcity, age, distillery reputation, cask type, packaging and condition. Closed or rare distilleries, limited releases and old age statements are strong candidates, and distilleries such as The Macallan, Springbank, Karuizawa and Yamazaki have long track records. Special releases such as the Macallan Rare Cask or Harmony Collection attract collectors.',
          'Condition matters as much as rarity. The label, box, capsule, cork and fill level all affect value. A pristine bottle can be worth far more than a damaged one of the same release.',
        ],
      },
      {
        heading: 'Why does provenance matter?',
        paragraphs: [
          'Provenance is the documented history of a bottle, showing where it came from and who owned it. A bottle with clear provenance, receipts and original packaging is easier to sell and carries less risk of being fake.',
          'Counterfeits and refilled bottles exist in the rare whisky market, particularly for the most valuable names. Buy from established retailers, auction houses and dealers with authentication processes, and be sceptical of any price that seems too good to be true.',
        ],
      },
      {
        heading: 'What are the costs and risks?',
        paragraphs: [
          'Costs include storage, insurance, shipping, and buyer’s and seller’s fees at auction or through a dealer. Liquidity is the main practical drawback. Unlike shares, you cannot sell a bottle instantly, and the best price often takes weeks or months.',
          'Other risks include price swings, fraud, damage and changing tastes. Cask investment schemes, where you buy a cask of whisky that matures in a warehouse, have attracted regulator warnings in several countries, so take particular care with unregulated offers.',
        ],
      },
      {
        heading: 'How should you store collectable bottles?',
        paragraphs: [
          'Keep bottles upright, in a cool, dark place at a stable temperature, with original boxes and tubes. Moderate humidity helps protect labels and corks, and a locked cabinet or professional storage is sensible for high-value bottles.',
          'Our detailed guide to [storing and cellaring whisky](/blog/how-to-store-and-cellar-rare-whisky/) covers temperature, light, humidity and fill levels.',
        ],
      },
      {
        heading: 'Which bottles do beginners buy?',
        paragraphs: [
          'Beginners often start with established names and limited releases that collectors already follow, such as older Macallan, GlenDronach single cask releases, Glenfiddich limited editions, Laphroaig and Nikka or Yamazaki Japanese whisky. See the [Macallan 25](/shop/whisky/macallan-25-year-old-sherry-oak-single-malt/), a [GlenDronach 1993 single cask](/shop/whisky/glendronach-1993-26-year-old-single-cask/) and the [Yamazaki 18](/shop/whisky/yamazaki-18-year-old-single-malt-japanese-whisky/).',
          'Browse the rare range in our [Scotch whisky collection](/shop/whisky/collection/scotch-whisky/) and [Japanese whisky collection](/shop/whisky/collection/japanese-whisky/).',
        ],
        links: [{ text: 'Shop rare Scotch', href: SCOTCH }, { text: 'Shop Japanese whisky', href: '/shop/whisky/collection/japanese-whisky/' }],
      },
      {
        heading: 'How should a beginner get started?',
        paragraphs: [
          'Set a budget you can afford to leave untouched for years, research the market and buy only bottles you would be happy to drink. Start small, keep records and diversify across distilleries and regions. Learn about [the Macallan’s sherry cask legacy](/blog/macallan-sherry-cask-legacy/) and [why Japanese whisky became a global obsession](/blog/why-japanese-whisky-became-a-global-obsession/).',
          'Remember that whisky is first and foremost a drink. Buyers must be 18 or over.',
        ],
      },
    ],
    faqs: [
      { question: 'Is investing in rare whisky safe?', answer: 'No investment is risk-free. Rare whisky prices can fall, bottles can be fake, and selling can take time, so only invest what you can afford to leave.' },
      { question: 'What makes whisky valuable?', answer: 'Scarcity, age, distillery reputation, cask type and condition, including the label, box and fill level.' },
      { question: 'How do I avoid fake whisky?', answer: 'Buy from reputable retailers and auction houses, check packaging and fill level, and keep provenance records. Be wary of prices that seem too good to be true.' },
      { question: 'How should I store collectable whisky?', answer: 'Store it upright in a cool, dark place at a stable temperature with the original box, and protect it from sunlight.' },
      { question: 'Is whisky cask investment a good idea?', answer: 'Cask schemes can be risky and have attracted regulator warnings. Research carefully and seek independent advice.' },
      { question: 'Is this financial advice?', answer: 'No. This is general information, and you should speak to a licensed financial adviser before investing.' },
    ],
  },
};
