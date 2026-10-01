import type { BlogPost } from '@/lib/types';

const UPDATED = '2026-09-29';
const SCOTCH = '/shop/whisky/collection/scotch-whisky/';
const BOURBON = '/shop/whisky/collection/bourbon/';
const RYE = '/shop/whisky/collection/rye-whiskey/';
const JAPANESE = '/shop/whisky/collection/japanese-whisky/';
const AUSSIE = '/shop/whisky/collection/australian-whisky/';

export const BLOG_EXTRA_WHISKY: Record<string, Partial<BlogPost>> = {
  'single-malt-vs-blended-scotch': {
    primaryKeyword: 'single malt whisky',
    secondaryKeywords: ['best single malt whisky', 'single malt whisky australia', 'blended whisky', 'scotch whisky', 'blended scotch'],
    seoTitle: 'Single Malt Whisky vs Blended Scotch: The Real Difference',
    seoDescription: 'Single malt whisky vs blended Scotch explained: how each is made, how they taste, what they cost in Australia and which to buy first.',
    updated: UPDATED,
    keyTakeaways: [
      'Single malt whisky comes from one distillery and is made only from malted barley in pot stills.',
      'Blended Scotch combines malt and grain whiskies from several distilleries for a consistent house style.',
      'Neither is automatically better: single malts show distillery character, blends often offer better value and versatility.',
    ],
    sections: [
      {
        heading: 'What is single malt whisky?',
        paragraphs: [
          'Single malt whisky is the product of one distillery. Under the Scotch Whisky Regulations 2009 it must be made in Scotland from water and malted barley only, distilled in pot stills and matured in oak casks for at least three years. Because every drop comes from one place, single malts reveal the character of that distillery: the coastal brine of an Islay malt, the orchard fruit of Speyside, or the sherried richness of a Highland whisky.',
          'Most single malts are vatted from many casks so each release tastes the same year after year. The label’s age statement tells you the age of the youngest whisky in the bottle, so a 12 Year Old contains nothing younger than twelve years. Browse our full range in the [Scotch whisky collection](/shop/whisky/collection/scotch-whisky/) to compare distilleries side by side.',
        ],
        links: [{ text: 'Shop single malt Scotch', href: SCOTCH }],
      },
      {
        heading: 'What is blended Scotch whisky?',
        paragraphs: [
          'Blended Scotch combines single malt whisky with grain whisky, which is usually made from wheat or maize in column stills. A blender might marry dozens of different whiskies to build a recipe that tastes identical across every batch. Well-known blends such as Johnnie Walker and Royal Salute show how far the style can go, from everyday Red Label to luxury bottlings built around old, rare malts.',
          'A third category, blended malt, mixes single malts from different distilleries with no grain whisky at all. If a label says blended malt or vatted malt, expect the richness of malt whisky with the complexity that comes from combining distilleries.',
        ],
      },
      {
        heading: 'Single malt vs blended: how they compare',
        paragraphs: [
          'Single malts are usually pricier because each one rests on a single distillery’s stock and often on older whisky. They reward slow sipping, and tasting notes vary widely from one distillery to the next. Blends tend to be smoother and more approachable, which makes them a strong choice for mixing into a highball or Old Fashioned-style drink and for people new to whisky.',
          'For a first purchase, pick by how you plan to drink it. If you want to sip and explore flavour, start with a Speyside single malt such as Glenfiddich or Macallan. If you want a versatile bottle for guests and mixed drinks, a quality blended Scotch is hard to beat. Read more about [how Scotch is stored and cellared](/blog/how-to-store-and-cellar-rare-whisky/) once you have a bottle at home.',
        ],
      },
    ],
    faqs: [
      { question: 'Is single malt better than blended Scotch?', answer: 'Not automatically. Single malt shows one distillery’s character and is often more expensive, while blended Scotch aims for balance and consistency. Many blends are excellent, and the better choice depends on whether you want to sip, mix or gift.' },
      { question: 'Does single malt mean one cask?', answer: 'No. Single malt means one distillery, not one cask. A single cask release is a separate label where every bottle comes from one cask.' },
      { question: 'Why is single malt whisky more expensive?', answer: 'Single malts come from one distillery, often use older whisky and have smaller production runs than blended Scotch, so the cost per bottle is usually higher.' },
      { question: 'What is the best single malt whisky for beginners?', answer: 'A smooth Speyside single malt such as a Glenfiddich or Macallan 12 Year Old is a popular starting point because it is fruity and easy to sip. You can compare options in our Scotch whisky collection.' },
    ],
  },

  'what-makes-bourbon-different': {
    primaryKeyword: 'bourbon',
    secondaryKeywords: ['bourbon whiskey', 'bourbon vs whiskey', 'best bourbon', 'buy bourbon online', 'american whiskey'],
    seoTitle: 'What Is Bourbon? How It Differs From Other Whiskey',
    seoDescription: 'What is bourbon? Learn the legal rules, the corn mash, charred oak barrels and how bourbon differs from Scotch, rye and Tennessee whiskey.',
    updated: UPDATED,
    keyTakeaways: [
      'Bourbon must be American whiskey made from at least 51% corn and aged in new charred oak.',
      'It does not have to come from Kentucky, though most bourbon is made there.',
      'New charred oak gives bourbon its vanilla, caramel and toasted-oak flavour.',
    ],
    sections: [
      {
        heading: 'The rules that define bourbon',
        paragraphs: [
          'Bourbon is a legally defined American whiskey. It must be made in the United States from a grain mash that is at least 51% corn, distilled to no more than 80% ABV, put into new charred oak containers at no more than 62.5% ABV, and bottled at 40% ABV or higher. Nothing but water may be added, so colour and flavour come entirely from the grain and the barrel.',
          'The rest of the mash is usually rye or wheat plus malted barley. A high-rye bourbon tastes spicy and dry, while a wheated bourbon is softer and sweeter. If a bottle says straight bourbon, it has been aged for at least two years.',
        ],
        links: [{ text: 'Shop bourbon whiskey', href: BOURBON }],
      },
      {
        heading: 'Why new charred oak matters',
        paragraphs: [
          'Unlike Scotch, which mostly uses previously filled casks, bourbon must use brand-new oak barrels with the inside charred. The char caramelises wood sugars and filters the spirit, which is why bourbon tastes of vanilla, caramel and toasted oak even at a young age. Because the barrels are used once, many are later sold to Scotch and world whisky producers.',
          'Warm American summers push the whiskey deeper into the wood, so bourbon often matures faster than whisky aged in cooler climates. That is one reason a well-made four to eight year old bourbon can taste rich and complete.',
        ],
      },
      {
        heading: 'Bourbon vs Scotch, rye and Tennessee whiskey',
        paragraphs: [
          'Compared with Scotch, bourbon is sweeter and rounder because of the corn and new oak, while Scotch tends to be maltier, smokier or fruitier. Rye whiskey swaps the corn for at least 51% rye grain, giving a drier, peppery profile. Tennessee whiskey follows bourbon rules but is filtered through charcoal before ageing, a step known as the Lincoln County Process.',
          'To explore the differences, taste a bourbon and a [rye whiskey](/shop/whisky/collection/rye-whiskey/) side by side, then compare both with a [Scotch single malt](/shop/whisky/collection/scotch-whisky/). For cocktail ideas, our [beginner’s guide to rye whiskey](/blog/beginners-guide-to-rye-whiskey/) is a good next read.',
        ],
      },
    ],
    faqs: [
      { question: 'Does bourbon have to be made in Kentucky?', answer: 'No. Bourbon can be made anywhere in the United States, although the vast majority is produced in Kentucky.' },
      { question: 'What is the difference between bourbon and whiskey?', answer: 'Whiskey is the broad category of grain spirit aged in wood. Bourbon is one legally defined type of American whiskey made from at least 51% corn and aged in new charred oak.' },
      { question: 'Is bourbon sweeter than Scotch?', answer: 'Generally yes. The high corn content and new charred oak give bourbon vanilla and caramel sweetness, while Scotch is more often malty, fruity or smoky.' },
      { question: 'Can I buy bourbon online in Australia?', answer: 'Yes. Adults aged 18 and over can order bourbon online, and Doctors of Whisky delivers Australia-wide with insured shipping and an adult signature on delivery.' },
    ],
  },

  'beginners-guide-to-rye-whiskey': {
    primaryKeyword: 'rye whiskey',
    secondaryKeywords: ['rye whiskey australia', 'manhattan rye whiskey', 'best rye whiskey', 'bulleit rye whiskey', 'straight rye whiskey'],
    seoTitle: 'Rye Whiskey for Beginners: Taste, Cocktails & Buying Guide',
    seoDescription: 'A beginner’s guide to rye whiskey: what it is, how it tastes vs bourbon, the best cocktails to make with it and how to buy rye in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'Rye whiskey is American whiskey made from at least 51% rye grain.',
      'It tastes drier and spicier than bourbon, which makes it the classic base for a Manhattan.',
      'Look for straight rye if you want a whiskey aged at least two years.',
    ],
    sections: [
      {
        heading: 'What is rye whiskey?',
        paragraphs: [
          'Rye whiskey is American whiskey distilled from a mash that is at least 51% rye. Like bourbon, it is aged in new charred oak, but the rye grain brings peppery, herbal and dry spice notes rather than bourbon’s corn sweetness. Straight rye has been aged at least two years with no added colouring or flavouring.',
          'Rye has a long history in the north-eastern United States, particularly Pennsylvania and Maryland, and its revival over the last two decades has been driven by bartenders bringing classic cocktails back.',
        ],
        links: [{ text: 'Shop rye whiskey', href: RYE }],
      },
      {
        heading: 'How rye tastes compared with bourbon',
        paragraphs: [
          'Expect black pepper, baking spice, dill and citrus peel on the nose and palate, with a drier finish than most bourbons. Because it is less sweet, rye stands up well to sugar, vermouth and bitters, which is why it suits stirred cocktails.',
          'If you already enjoy a [bourbon](/shop/whisky/collection/bourbon/), rye is a natural next step: buy a rye at a similar age and proof and taste them together to notice the difference in spice and sweetness.',
        ],
      },
      {
        heading: 'Best ways to drink rye',
        paragraphs: [
          'The Manhattan is the definitive rye cocktail: two parts rye, one part sweet vermouth and a couple of dashes of Angostura bitters, stirred over ice and strained. Rye is also the traditional base for the Sazerac and works in an Old Fashioned when you want a spicier result.',
          'Neat, a good rye with a splash of water or a single large cube shows its layers of spice and fruit. Pair it with dark chocolate or aged cheese for an easy after-dinner pour.',
        ],
      },
    ],
    faqs: [
      { question: 'What does rye whiskey taste like?', answer: 'Rye whiskey tastes spicier and drier than bourbon, with notes of black pepper, baking spice, herbs and citrus peel alongside oak and a little vanilla.' },
      { question: 'Is rye whiskey good in a Manhattan?', answer: 'Yes. Rye is the traditional base for a Manhattan because its dry spice balances the sweetness of vermouth and the bitterness of bitters.' },
      { question: 'What is the difference between rye and bourbon?', answer: 'Bourbon is made from at least 51% corn, while rye is made from at least 51% rye grain. That makes rye drier and spicier, and bourbon sweeter and rounder.' },
      { question: 'Where can I buy rye whiskey in Australia?', answer: 'You can order rye whiskey online from Doctors of Whisky, which delivers across Australia with insured shipping. Buyers must be 18 or over.' },
    ],
  },

  'why-japanese-whisky-became-a-global-obsession': {
    primaryKeyword: 'japanese whisky',
    secondaryKeywords: ['best japanese whisky', 'top rated japanese whisky', 'japanese single malt whisky', 'nikka whisky', 'japanese whiskey'],
    seoTitle: 'Japanese Whisky: Why It Became a Global Obsession',
    seoDescription: 'Why Japanese whisky is so sought after: its Scottish roots, Nikka and Suntory history, blending craft, and how to choose a bottle in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'Japanese whisky follows Scotch production methods but has its own blending culture.',
      'Nikka was founded in 1934 by Masataka Taketsuru, who trained in Scotland.',
      'Age-stated and limited releases are scarce, which drives prices and collector demand.',
    ],
    sections: [
      {
        heading: 'From Scotland to Japan',
        paragraphs: [
          'Japanese whisky began when Masataka Taketsuru travelled to Scotland in 1918 to study distilling and returned with the methods that shaped Japan’s first whisky. Suntory opened Yamazaki near Kyoto in 1923, and Taketsuru later founded Nikka in 1934 with its first distillery at Yoichi in Hokkaido. Both companies built their styles on Scottish techniques while adapting to Japan’s climate and tastes.',
          'The result is whisky that is often elegant, fruit-driven and precisely blended. Nikka’s Yoichi malt is known for a slightly coastal, smoky edge, while its Miyagikyo distillery makes a softer, fruitier style.',
        ],
        links: [{ text: 'Shop Japanese whisky', href: JAPANESE }],
      },
      {
        heading: 'Why demand outran supply',
        paragraphs: [
          'A run of international awards through the 2000s and 2010s made Japanese whisky famous, and demand soon outstripped mature stock because whisky takes years to age. Several distilleries discontinued or restricted age-stated bottlings, which pushed up prices on the remaining bottles and turned limited releases into collector items.',
          'Labelling rules introduced by the Japan Spirits and Liqueurs Makers Association in 2021 now require whisky sold as Japanese to be fermented, distilled, matured and bottled in Japan, which helps buyers tell authentic bottles from imported blends.',
        ],
      },
      {
        heading: 'How to choose a Japanese whisky',
        paragraphs: [
          'Start with the style. Blended Japanese whisky is light and floral and works well in a highball with soda water, a serve popular in Japanese bars. Single malts and pure malts are richer and suit neat sipping. Check whether a bottle carries an age statement, which tells you the age of the youngest whisky inside.',
          'If you want a stepping stone from Scotch, compare a Japanese malt with a Speyside single malt from our [Scotch collection](/shop/whisky/collection/scotch-whisky/). For a broader look at the craft-whisky world, see our guide to the [rise of Australian single malt](/blog/rise-of-australian-single-malt-whisky/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is the best Japanese whisky?', answer: 'It depends on taste and budget. Nikka’s Yoichi and Miyagikyo malts and the Taketsuru pure malt are widely respected, and age-stated releases are the most collectable. Compare options in our Japanese whisky collection.' },
      { question: 'Is Japanese whisky similar to Scotch?', answer: 'It uses similar methods, but Japanese whisky is usually more delicately blended and often lighter and more fruit-forward than many Scotches.' },
      { question: 'Why is Japanese whisky so expensive?', answer: 'Strong global demand and limited mature stock have raised prices, especially for age-stated and limited releases.' },
      { question: 'How should I drink Japanese whisky?', answer: 'Blended Japanese whisky is popular as a highball with chilled soda water, while single malts are best sipped neat or with a little water.' },
    ],
  },

  'rise-of-australian-single-malt-whisky': {
    primaryKeyword: 'australian single malt whisky',
    secondaryKeywords: ['australian whiskey', 'tasmanian whisky', 'australian whisky', 'lark distillery', 'buy australian whisky online'],
    seoTitle: 'Australian Single Malt Whisky: Tasmania & Beyond',
    seoDescription: 'The rise of Australian single malt whisky: Tasmania’s pioneers, what makes local whisky distinctive and how to buy Australian whisky online.',
    updated: UPDATED,
    keyTakeaways: [
      'Tasmania led Australia’s whisky revival, with Lark Distillery founded in 1992.',
      'Australian whisky often matures in ex-wine and fortified-wine casks.',
      'Warm climates mature whisky faster, so younger bottles can taste rich.',
    ],
    sections: [
      {
        heading: 'How Australian whisky got started',
        paragraphs: [
          'Australian whisky-making was limited for decades by heavy regulation. That changed in Tasmania, where Bill Lark founded Lark Distillery in 1992 after a change in the law allowed small-scale distilling, and his success is widely credited with inspiring a wave of craft distilleries across the country.',
          'Today Tasmania, Victoria, New South Wales and Western Australia all have single malt producers, making Australia one of the most exciting craft whisky regions in the world.',
        ],
        links: [{ text: 'Shop Australian whisky', href: AUSSIE }],
      },
      {
        heading: 'What makes Australian single malt distinctive',
        paragraphs: [
          'Many Australian distillers use local barley, Tasmanian water and ex-wine or ex-fortified-wine casks, including port, sherry and Australian red wine barrels. The warm, variable climate speeds up interaction between spirit and wood, so a young Australian single malt can show depth that would take longer in Scotland.',
          'Expect flavours such as dark fruit, honey, spice and chocolate, with a lively finish. Cask strength releases are common, so add a little water to open them up.',
        ],
      },
      {
        heading: 'How to buy Australian whisky',
        paragraphs: [
          'Look for the distillery, cask type and whether a bottle is a single cask or a vatted batch. Single cask releases are limited, so specific bottles can sell out quickly. If you enjoy Scotch, an Australian single malt is a rewarding comparison next to a [Speyside single malt](/shop/whisky/collection/scotch-whisky/).',
          'Doctors of Whisky ships Australian whisky across the country with insured delivery. For a wider view of world whisky styles, read our guide to [why Japanese whisky became a global obsession](/blog/why-japanese-whisky-became-a-global-obsession/).',
        ],
      },
    ],
    faqs: [
      { question: 'Who started the Australian whisky boom?', answer: 'Lark Distillery in Tasmania, founded by Bill Lark in 1992, is widely credited with reviving Australian whisky making and inspiring later distilleries.' },
      { question: 'What does Australian whisky taste like?', answer: 'Flavours vary by distillery, but many Australian single malts show dark fruit, honey, spice and chocolate from ex-wine and fortified-wine casks.' },
      { question: 'Can I buy Australian whisky online?', answer: 'Yes. Adults aged 18 and over can order Australian whisky online from Doctors of Whisky, which delivers across Australia with an adult signature required.' },
      { question: 'Is Tasmanian whisky good?', answer: 'Tasmanian whisky has won international acclaim and is known for quality, using local barley and pure water and maturing in a cool, changeable climate.' },
    ],
  },

  'macallan-sherry-cask-legacy': {
    primaryKeyword: 'macallan 12',
    secondaryKeywords: ['macallan 12 sherry oak', 'the macallan 12 year old', 'macallan double cask', 'macallan sherry oak', 'buy macallan online'],
    seoTitle: 'Macallan 12 & the Sherry Cask Legacy Explained',
    seoDescription: 'Why Macallan is famous for sherry casks: the Speyside distillery’s history, Sherry Oak vs Double Cask, and how to pick a Macallan 12.',
    updated: UPDATED,
    keyTakeaways: [
      'The Macallan is a Speyside single malt licensed in 1824 and known for sherry-seasoned oak.',
      'Sherry Oak and Double Cask are different expressions with different cask recipes.',
      'Age statements and cask type explain most price differences between bottles.',
    ],
    sections: [
      {
        heading: 'A Speyside distillery built on sherry oak',
        paragraphs: [
          'The Macallan sits on the Easter Elchies estate in Craigellachie, Speyside, and was licensed in 1824. It became famous for maturing whisky in oak casks that previously held sherry, a tradition that gives its whisky dried fruit, ginger and rich spice.',
          'Sherry casks are expensive and hard to source, so The Macallan’s commitment to them is a large part of what collectors pay for. Older releases and limited editions built on these casks are among the most sought-after single malts in the world.',
        ],
        links: [{ text: 'Shop Macallan and other Scotch', href: SCOTCH }],
      },
      {
        heading: 'Sherry Oak vs Double Cask',
        paragraphs: [
          'The Macallan Sherry Oak range is matured in sherry-seasoned oak casks, and it tends to taste of dried fruit, orange, ginger and spice. The Double Cask range blends whisky matured in sherry-seasoned American oak with whisky from sherry-seasoned European oak, which gives a lighter, honeyed style with vanilla and citrus.',
          'Both are approachable, and comparing a Sherry Oak 12 with a Double Cask 12 is one of the easiest ways to learn how cask choice changes single malt flavour.',
        ],
      },
      {
        heading: 'Choosing your bottle',
        paragraphs: [
          'A 12 Year Old is the natural starting point because it shows the house style at an accessible price. Older age statements such as 18 or 25 Years cost more because the whisky spent longer in the cask and less of it survives to bottling. Limited editions and decanter releases carry a further premium.',
          'Once you have chosen, read how to [store and cellar whisky](/blog/how-to-store-and-cellar-rare-whisky/) so an opened bottle keeps its flavour, and see how a Macallan compares in our [single malt vs blended Scotch guide](/blog/single-malt-vs-blended-scotch/).',
        ],
      },
    ],
    faqs: [
      { question: 'Why is Macallan famous for sherry casks?', answer: 'The Macallan has long matured its whisky in sherry-seasoned oak casks, which give dried fruit, spice and richness, and it is a defining part of the brand’s style.' },
      { question: 'What is the difference between Macallan Sherry Oak and Double Cask?', answer: 'Sherry Oak is matured in sherry-seasoned oak and is richer and spicier. Double Cask combines sherry-seasoned American and European oak for a lighter, honeyed, vanilla-led style.' },
      { question: 'Is Macallan 12 worth buying?', answer: 'It is a widely respected entry point to The Macallan, showing the house style at an accessible price, and it is a popular gift.' },
      { question: 'Where can I buy Macallan online in Australia?', answer: 'You can order Macallan from Doctors of Whisky, which delivers across Australia with insured shipping and an adult signature on delivery.' },
    ],
  },

  'how-to-store-and-cellar-rare-whisky': {
    primaryKeyword: 'how to store whisky',
    secondaryKeywords: ['whisky storage', 'storing whisky', 'how long does whisky last', 'store whisky upright', 'whisky cellar'],
    seoTitle: 'How to Store Whisky: Unopened, Opened & Rare Bottles',
    seoDescription: 'How to store whisky properly: keep bottles upright, cool and dark, how long opened whisky lasts and how to protect rare bottles.',
    updated: UPDATED,
    keyTakeaways: [
      'Store whisky upright, away from sunlight and heat, at a steady room temperature.',
      'Unopened whisky keeps almost indefinitely; opened bottles are best within one to two years.',
      'Avoid temperature swings and check the cork or closure on rare bottles regularly.',
    ],
    sections: [
      {
        heading: 'The basics: upright, dark and steady',
        paragraphs: [
          'Unlike wine, whisky should be stored upright. Its high alcohol strength can degrade a cork that sits in contact with the liquid, which can taint the whisky and weaken the closure. Keep bottles out of direct sunlight, which fades labels and can change the spirit’s colour and flavour.',
          'Aim for a stable temperature, roughly 15 to 20 degrees Celsius. Constant swings between hot and cold cause the liquid and air in the bottle to expand and contract, which can loosen the seal over time.',
        ],
      },
      {
        heading: 'How long does whisky last once opened?',
        paragraphs: [
          'An unopened, well-stored bottle lasts for decades with little change because whisky does not continue to mature in glass. After opening, oxygen slowly changes the whisky. A bottle that is mostly full can stay in good shape for a year or two, while a bottle that is a quarter full or less may lose freshness faster.',
          'To slow oxidation, keep the cork or cap tight, and decant a nearly empty bottle into a smaller container. Wrap the neck of a cork-stoppered bottle with Parafilm if you are keeping a rare bottle for a long time.',
        ],
      },
      {
        heading: 'Protecting rare and collectable bottles',
        paragraphs: [
          'For valuable bottles, keep the original box, label and any certificate, and store them away from humidity, which can damage labels and boxes. Check the closure and fill level every so often, and avoid stacking bottles or laying them on their sides.',
          'If you are building a collection, browse rare and limited bottles in our [Scotch whisky collection](/shop/whisky/collection/scotch-whisky/), and read our [beginner’s guide to investing in rare whisky](/blog/beginners-guide-investing-in-rare-whisky/) for how condition and provenance affect value.',
        ],
      },
    ],
    faqs: [
      { question: 'Should whisky be stored upright or on its side?', answer: 'Upright. Whisky’s high alcohol content can break down a cork that stays in contact with the liquid, so bottles should stand upright.' },
      { question: 'Does whisky go bad once opened?', answer: 'It does not spoil like food, but oxygen slowly changes its flavour. A mostly full bottle keeps well for a year or two, and bottles that are nearly empty change faster.' },
      { question: 'Does whisky age in the bottle?', answer: 'No. Whisky matures in the cask and does not continue to age once bottled, so an unopened bottle keeps its character while stored well.' },
      { question: 'Should I refrigerate whisky?', answer: 'No. Store whisky at a steady room temperature away from light. Chilling is only a serving choice and can mute flavour.' },
    ],
  },

  'beginners-guide-investing-in-rare-whisky': {
    primaryKeyword: 'rare whisky',
    secondaryKeywords: ['rare whisky australia', 'collectable whisky', 'whisky investment', 'limited edition whisky', 'buy rare whisky online'],
    seoTitle: 'Rare Whisky: A Beginner’s Guide to Collecting & Investing',
    seoDescription: 'A beginner’s guide to collecting rare whisky: what makes a bottle collectable, how condition and provenance affect value, and risks to understand.',
    updated: UPDATED,
    keyTakeaways: [
      'Collectability comes from scarcity, brand reputation, age and condition.',
      'Provenance and original packaging matter as much as the liquid.',
      'Whisky values can fall as well as rise; this guide is general information, not financial advice.',
    ],
    sections: [
      {
        heading: 'What makes a whisky collectable',
        paragraphs: [
          'Rare whisky usually combines scarcity with reputation. Distilleries with long histories, closed distilleries, old age statements, limited editions and single cask releases tend to attract collectors. Brands such as The Macallan, GlenDronach and Nikka have established followings for particular releases.',
          'Bottle condition matters too: a full fill level, an intact seal, a clean label and the original box all protect value.',
        ],
        links: [{ text: 'Shop rare Scotch whisky', href: SCOTCH }],
      },
      {
        heading: 'Provenance, authenticity and storage',
        paragraphs: [
          'Counterfeit and refilled bottles exist in the collector market, so buy from a reputable retailer that can explain where a bottle came from and keep your receipt. Look for consistent labels, batch codes and closures, and be cautious of prices that seem too good to be true.',
          'Store bottles properly to preserve condition: upright, out of light and heat, at a steady temperature. Our guide to [how to store whisky](/blog/how-to-store-and-cellar-rare-whisky/) covers the details.',
        ],
      },
      {
        heading: 'Understand the risks',
        paragraphs: [
          'Whisky is not a regulated investment product. Prices depend on fashion, supply and auction demand, and they can fall. Selling can take time and involve fees, and insurance and storage add ongoing costs. Many collectors buy bottles primarily to drink and treat any appreciation as a bonus.',
          'This article is general information and not personal financial advice. Speak to a licensed adviser before allocating money to collectables. If you simply want to enjoy a special bottle, compare options in our [single malt vs blended guide](/blog/single-malt-vs-blended-scotch/) to find one that fits your taste.',
        ],
      },
    ],
    faqs: [
      { question: 'What makes a whisky rare?', answer: 'Scarcity: limited editions, single casks, old age statements, closed distilleries and small releases are the most collectable, along with a strong brand reputation.' },
      { question: 'Is rare whisky a good investment?', answer: 'Values can rise, but they can also fall, and whisky is not a regulated investment. This is general information, so seek licensed financial advice before investing.' },
      { question: 'How do I check a rare whisky is authentic?', answer: 'Buy from a reputable retailer, keep proof of purchase, inspect labels, closures and fill levels, and be wary of prices far below market.' },
      { question: 'Where can I buy rare whisky in Australia?', answer: 'You can browse limited and older bottles in the Doctors of Whisky Scotch collection, with insured Australia-wide delivery for buyers aged 18 and over.' },
    ],
  },
};
