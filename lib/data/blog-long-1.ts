import type { BlogPost } from '@/lib/types';

const UPDATED = '2026-10-01';
const SCOTCH = '/shop/whisky/collection/scotch-whisky/';
const BOURBON = '/shop/whisky/collection/bourbon/';
const RYE = '/shop/whisky/collection/rye-whiskey/';
const JAPANESE = '/shop/whisky/collection/japanese-whisky/';
const AUSSIE = '/shop/whisky/collection/australian-whisky/';

/** Long-form (1,500+ word) guides. Keywords validated against the keyword bank (volume / KD in comments). */
export const BLOG_LONG_1: Record<string, Partial<BlogPost>> = {
  // single malt scotch whisky 1300/15 · single malt 3600/15 · single malt whiskey 2400/21
  'single-malt-vs-blended-scotch': {
    primaryKeyword: 'single malt scotch whisky',
    secondaryKeywords: ['single malt', 'single malt whiskey', 'scotch whiskey', 'premium blended scotch', 'highland scotch whisky single malt', 'what is single malt whisky', 'premium scotch whiskey'],
    seoTitle: 'Single Malt vs Blended Scotch: How to Choose in Australia',
    seoDescription: 'Single malt Scotch whisky vs blended Scotch: how each is made, how they taste, what age statements mean and which bottle to buy first in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'Single malt Scotch whisky comes from one distillery, made from malted barley only and aged at least three years in oak.',
      'Blended Scotch combines malt and grain whiskies from several distilleries for a consistent, approachable style.',
      'Pick by purpose: single malt for slow sipping and exploring regions, blended Scotch for mixing, gifting and everyday pours.',
      'Always check the age statement, ABV and cask type on the label rather than relying on the brand name alone.',
    ],
    sections: [
      {
        heading: 'How do the Scotch whisky categories work?',
        paragraphs: [
          'Scotch whisky has five legally defined categories under the Scotch Whisky Regulations 2009: single malt, single grain, blended malt, blended grain and blended Scotch. Only the first and last are widely sold in Australia, but knowing all five stops you being caught out by an unfamiliar label.',
          'Single malt means one distillery and malted barley only. Single grain means one distillery but other cereals are allowed. Blended malt combines single malts from several distilleries, blended grain combines single grains, and blended Scotch combines malt and grain whisky. If a bottle says “single malt” without “Scotch” it is worth checking the country of origin, because the term is also used by distillers in Japan, Ireland, India and Australia.',
        ],
      },
      {
        heading: 'What do the regions of Scotland taste like?',
        paragraphs: [
          'Region gives you a first guess at flavour. Speyside malts such as Glenfiddich and Macallan lean fruity, honeyed and sherried, which is why they are the usual starting point. Highland malts range from coastal and salty to rich and oaky. Lowland whiskies are typically lighter and grassier, and Islay malts such as Laphroaig are famous for peat smoke, iodine and brine.',
          'Treat this as a rule of thumb rather than a promise. Cask choice shifts flavour as much as geography does, so a sherry-matured Highland malt can taste closer to a Speyside than to its neighbours. Browse the full range in our [Scotch whisky collection](/shop/whisky/collection/scotch-whisky/) and compare tasting notes on each bottle page.',
        ],
        links: [{ text: 'Shop single malt Scotch', href: SCOTCH }],
      },
      {
        heading: 'What does an age statement really tell you?',
        paragraphs: [
          'An age statement is the age of the youngest whisky in the bottle, so a 12 year old contains nothing younger than twelve years. Older is not automatically better. Whisky matures differently in different casks, and a well-judged 12 year old can outclass a tired 18.',
          'Age does affect scarcity and price, because every extra year costs the distillery evaporation (the “angels’ share”) and warehouse space. Bottles without an age statement (NAS) are not necessarily young. Many distilleries use NAS releases to blend across ages and cask types, and some of the most interesting experimental releases are NAS. Judge them on cask type, ABV and tasting notes instead.',
        ],
      },
      {
        heading: 'Why does cask type matter so much?',
        paragraphs: [
          'Most of a Scotch’s colour and a large share of its flavour come from the cask. Ex-bourbon American oak adds vanilla, coconut and toasted sweetness. Ex-sherry European oak adds dried fruit, nuts, spice and a deeper colour. Peated malt, wine casks and rum finishes add further variations.',
          'The Macallan is the best-known example of a sherry-led house style, which is why its whisky tends to be darker and richer than most Speyside peers. Read more in our guide to the [Macallan sherry cask legacy](/blog/macallan-sherry-cask-legacy/). When two bottles share an age and region, the cask description on the label is the quickest way to predict which you will prefer.',
        ],
      },
      {
        heading: 'Is blended Scotch worth buying?',
        paragraphs: [
          'Yes. Blended Scotch accounts for the large majority of Scotch sold worldwide, and the best blends are skilfully built rather than cheap compromises. A blender balances dozens of components so that every batch of a label tastes the same, which is a harder trick than it sounds.',
          'Premium blends such as Johnnie Walker’s older expressions and Royal Salute show how much malt content and age can lift a blend. Blends also suit mixed drinks, highballs and large gatherings where a single malt’s nuance would be lost. If you want a bottle for guests rather than a bottle to study, a quality blend is often the smarter buy.',
        ],
      },
      {
        heading: 'How should you taste and serve Scotch?',
        paragraphs: [
          'Use a tulip-shaped glass if you have one, pour a small measure and nose it before tasting. Sip it neat first, then add a few drops of room-temperature water, which opens up aromas and softens the alcohol. Ice mutes flavour, so save it for blends and highballs.',
          'Pair with dark chocolate, aged cheese, roasted nuts or dried fruit. If you are new to whisky, start with a lower-peat Speyside single malt, then work towards Highland and Islay styles as your palate develops.',
        ],
      },
      {
        heading: 'How do you choose your first bottle in Australia?',
        paragraphs: [
          'Decide first how you will drink it. For sipping, choose a 12 year old Speyside single malt. For mixing and entertaining, choose a respected blended Scotch. For a gift, a recognisable name in a gift box usually lands better than an obscure bottle, however good.',
          'Check the ABV (40 to 46 per cent is typical), the age statement and whether the bottle is chill-filtered or natural colour. Buyers must be 18 or over. If you would like to start with a bottle that is sherry-matured, see the [best Macallan expressions](/blog/macallan-sherry-cask-legacy/) or explore [how to store whisky once you open it](/blog/how-to-store-and-cellar-rare-whisky/).',
        ],
      },
    ],
    faqs: [
      { question: 'What is single malt whisky?', answer: 'Single malt whisky is made at one distillery from malted barley and water, distilled in pot stills. For Scotch it must also be matured in oak casks in Scotland for at least three years and bottled at 40% ABV or higher.' },
      { question: 'Is single malt better than blended Scotch?', answer: 'Not automatically. Single malt shows one distillery’s character and usually costs more, while blended Scotch aims for balance and consistency. Many blends are excellent value, and the better choice depends on how you plan to drink it.' },
      { question: 'Does single malt mean one cask?', answer: 'No. Single malt means one distillery, not one cask. A single cask release is a separate type of bottling where every bottle comes from the same cask.' },
      { question: 'Why is single malt whisky more expensive than blended?', answer: 'Single malts usually come from a single distillery’s stock, often use older whisky and have smaller production runs than blends, so the cost per bottle is typically higher.' },
      { question: 'What is the best single malt for beginners?', answer: 'A smooth Speyside single malt aged 12 years, such as Glenfiddich or Macallan, is a popular starting point because it is fruity, mellow and easy to sip.' },
      { question: 'How long does opened Scotch last?', answer: 'An opened bottle that is stored upright, sealed and kept out of direct sun will stay enjoyable for years, but flavour can dull gradually once the bottle is less than about a third full.' },
    ],
  },

  // bourbon whiskey 2400/19 · bourbon brands 2900/26 · buffalo trace bourbon 1900/13
  'what-makes-bourbon-different': {
    primaryKeyword: 'bourbon whiskey',
    secondaryKeywords: ['bourbon brands', 'buffalo trace bourbon', 'jim beam bourbon whiskey', 'wild turkey bourbon', 'bourbon whiskey kentucky straight', 'australian bourbon', 'difference between bourbon and whiskey', 'how bourbon is made', 'bourbon vs whiskey taste'],
    seoTitle: 'Bourbon Whiskey: What Makes It Different From Whiskey',
    seoDescription: 'What is bourbon whiskey? The legal rules, corn mash, new charred oak and how bourbon differs from Scotch, rye and Tennessee whiskey, plus brands to try.',
    updated: UPDATED,
    keyTakeaways: [
      'Bourbon whiskey must be American, at least 51% corn and aged in new charred oak containers.',
      'It does not have to be made in Kentucky, even though most of the best-known brands are.',
      'Straight bourbon is aged at least two years, and bottled-in-bond adds a 100 proof, four-year, single-distillery rule.',
      'Bourbon is sweeter and more vanilla-led than Scotch because of its corn mash and fresh oak.',
    ],
    sections: [
      {
        heading: 'What is the difference between bourbon and whiskey?',
        paragraphs: [
          'Whiskey is the broad family. Bourbon is one legally defined member of it. Every bourbon is a whiskey, but most whiskeys are not bourbon. To use the name, a spirit must be made in the United States, from a mash that is at least 51% corn, aged in new charred oak, and bottled at no less than 40% ABV with nothing added except water.',
          'That is the whole difference in one line: bourbon is a style with rules, while whiskey simply means a spirit distilled from fermented grain mash and aged in wood. Scotch, rye, Irish and Japanese whisky each follow their own rules, which is why they taste so different from bourbon.',
        ],
      },
      {
        heading: 'How is bourbon made?',
        paragraphs: [
          'The grains are milled, cooked and cooled, then fermented with yeast into a distiller’s beer. This is distilled in a column still and often a second time in a doubler or pot still, to no more than 80% ABV. The spirit goes into new charred oak at no more than 62.5% ABV and then rests in warehouses, usually for years.',
          'Most mash bills use corn, rye or wheat and malted barley. A high-rye recipe tastes spicier and drier, while a wheated bourbon is softer and rounder. Distillers also choose the barrel char level, warehouse floor and bottling proof, so two bourbons with the same age can taste quite different.',
        ],
      },
      {
        heading: 'Does bourbon have to come from Kentucky?',
        paragraphs: [
          'No. Bourbon can be made in any US state, although Kentucky produces most of it and has the strongest reputation. “Kentucky straight bourbon” on a label tells you it is both made and aged for at least two years in Kentucky.',
          'You will also see Tennessee whiskey, which is made like bourbon but filtered through charcoal before ageing. Jack Daniel’s is the best-known example. It follows the bourbon rules but is labelled Tennessee whiskey, which is worth knowing when a shelf mixes both.',
        ],
      },
      {
        heading: 'What do “straight” and “bottled-in-bond” mean?',
        paragraphs: [
          'Straight bourbon has been aged for at least two years with no added flavouring or colouring. If it is aged under four years, the age must be on the label.',
          'Bottled-in-bond is a stricter, older category. The bourbon must be the product of one distillery in one distilling season, aged at least four years in a federally bonded warehouse and bottled at exactly 100 proof (50% ABV). Bottled-in-bond bottles are a reliable way to buy honest, full-flavoured bourbon at a fair price.',
        ],
      },
      {
        heading: 'What does bourbon taste like?',
        paragraphs: [
          'Expect vanilla, caramel, toffee, toasted oak and baking spice on top of a natural corn sweetness. High-rye bourbons add pepper and mint. Wheated bourbons taste of soft bread, honey and light fruit. Cask-strength bottlings are bigger and hotter and reward a few drops of water.',
          'Compared with Scotch, bourbon tastes sweeter and more direct because the fresh charred oak delivers flavour quickly. Compared with rye, it is rounder and less peppery. If you want to explore that contrast, read our [beginner’s guide to rye whiskey](/blog/beginners-guide-to-rye-whiskey/).',
        ],
      },
      {
        heading: 'Which bourbon brands should you try first?',
        paragraphs: [
          'Buffalo Trace is a benchmark for value and balance, with notes of vanilla, toffee and mint. Wild Turkey leans towards a spicier, higher-proof style, and its Rare Breed shows what barrel-strength bourbon can do. Eagle Rare and Four Roses Single Barrel are well-regarded step-ups, and Pappy Van Winkle sits at the collector end of the category.',
          'Compare these in our [bourbon collection](/shop/whisky/collection/bourbon/). Starting with [Buffalo Trace 1L](/shop/whisky/buffalo-trace-1l-bourbon-whiskey/) or [Wild Turkey Kentucky Spirit](/shop/whisky/wild-turkey-kentucky-spirit-1l-bourbon-whiskey/) gives you a clear read on what bourbon tastes like before you spend more.',
        ],
        links: [{ text: 'Shop bourbon whiskey', href: BOURBON }],
      },
      {
        heading: 'How do you drink bourbon?',
        paragraphs: [
          'Sip it neat or with a splash of water to open up the aromas, or over a large ice cube so it dilutes slowly. It is also the base of the Old Fashioned, the Manhattan (traditionally rye, though bourbon makes a sweeter version), the Whiskey Sour and the Mint Julep.',
          'In Australia, bourbon also pairs well with barbecued meat, pecan pie and aged cheddar. Whatever you pour, remember buyers must be 18 or over and standard-drink labels will help you track how much you have had.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the difference between bourbon and whiskey?', answer: 'Whiskey is the broad category, and bourbon is a legally defined American whiskey that must be at least 51% corn, aged in new charred oak and bottled at 40% ABV or higher with nothing added but water.' },
      { question: 'Does bourbon have to be made in Kentucky?', answer: 'No. Bourbon can be made anywhere in the United States, though most is made in Kentucky.' },
      { question: 'How is bourbon made?', answer: 'Bourbon is made by fermenting a corn-led grain mash, distilling it to no more than 80% ABV, then ageing it in new charred oak barrels filled at no more than 62.5% ABV.' },
      { question: 'What does straight bourbon mean?', answer: 'Straight bourbon has been aged for at least two years with no added colouring or flavouring. If it is under four years old the age must be stated on the label.' },
      { question: 'Is bourbon sweeter than Scotch?', answer: 'Generally yes. The high corn content and new charred oak give bourbon a sweeter, more vanilla and caramel-led flavour than most Scotch.' },
      { question: 'What is a good bourbon for beginners?', answer: 'Buffalo Trace and Wild Turkey are popular starting points. Both are widely available, balanced and good value, and they show the classic bourbon flavours clearly.' },
    ],
  },

  // what is rye whiskey 140/17 · rye whiskey australia 320/9 · manhattan rye whiskey 260/10
  'beginners-guide-to-rye-whiskey': {
    primaryKeyword: 'what is rye whiskey',
    secondaryKeywords: ['rye whiskey australia', 'manhattan rye whiskey', 'sazerac rye', 'rye alcohol', 'rye whiskey vs bourbon taste', 'rye drink', 'what is in rye whiskey'],
    seoTitle: 'What Is Rye Whiskey? A Beginner’s Guide for Australia',
    seoDescription: 'What is rye whiskey? Learn the rules, the peppery flavour, how rye differs from bourbon, the best cocktails and which rye bottles to buy in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'American rye whiskey must be made from at least 51% rye grain and aged in new charred oak.',
      'Rye tastes drier, spicier and more peppery than bourbon, with notes of dill, cinnamon and dark bread.',
      'It is the traditional base for the Manhattan and the Sazerac.',
      'Canadian “rye” is a different thing and often contains little rye grain.',
    ],
    sections: [
      {
        heading: 'What is rye whiskey, in plain terms?',
        paragraphs: [
          'Rye whiskey is a grain whiskey where rye is the main ingredient. In the United States it must be made from a mash of at least 51% rye, distilled to no more than 80% ABV, aged in new charred oak and bottled at 40% ABV or more. Straight rye is aged at least two years with nothing added.',
          'Rye and bourbon share most of their rulebook. The difference is the grain. Where bourbon leads with corn and tastes sweet and round, rye brings a spicy, peppery, slightly herbal character that many drinkers describe as drier and more “grown-up”.',
        ],
      },
      {
        heading: 'How does rye taste compared with bourbon?',
        paragraphs: [
          'Expect black pepper, cinnamon, clove, mint, dill and dark rye bread. The finish is typically drier and shorter than bourbon, with a lingering spice. Higher-proof ryes are bold and bracing, so a few drops of water can help.',
          'If you like the vanilla and caramel of bourbon, a lower-rye “mash bill” such as 51 to 60 per cent rye is a gentle bridge. If you want maximum spice, look for ryes made from 90 to 100 per cent rye. Our [guide to what makes bourbon different](/blog/what-makes-bourbon-different/) explains the contrast in more detail.',
        ],
      },
      {
        heading: 'Is Canadian rye the same thing?',
        paragraphs: [
          'Not really. In Canada, “rye” is a traditional name for a style of whisky that is often made mostly from corn with a smaller share of rye grain for flavour. It is blended and usually smoother and lighter than American straight rye.',
          'Both can be excellent, but if a recipe or cocktail calls for rye whiskey, American straight rye is what bartenders usually mean. Check the label for “straight rye” and the percentage of rye in the mash if it is shown.',
        ],
      },
      {
        heading: 'Which cocktails use rye?',
        paragraphs: [
          'The Manhattan was originally a rye drink, combining rye, sweet vermouth and bitters. The Sazerac, the signature drink of New Orleans, uses rye, a sugar cube, Peychaud’s bitters and an absinthe rinse. The Old Fashioned and the Boulevardier are also at home with rye.',
          'Rye’s spice stands up to sweet vermouth, bitters and fruit, which is why bartenders reach for it when a drink needs backbone. A bottle of rye also makes a good highball with ginger beer.',
        ],
      },
      {
        heading: 'Which rye whiskeys should you buy first?',
        paragraphs: [
          'Sazerac Rye is a smooth, classic place to start. Pikesville and Michter’s Rye are well-regarded, fuller-flavoured options, and Jack Daniel’s Barrel Proof Rye shows how bold rye can be at higher strength. Wild Turkey’s Master’s Keep Triumph adds a rare, richer expression.',
          'Browse them in our [rye whiskey collection](/shop/whisky/collection/rye-whiskey/) or start with [Sazerac Rye](/shop/whisky/sazerac-rye-rye-whiskey/) if you want a bottle that works neat and in cocktails.',
        ],
        links: [{ text: 'Shop rye whiskey', href: RYE }],
      },
      {
        heading: 'Is rye whiskey easy to find in Australia?',
        paragraphs: [
          'American rye is available in Australia but selection is smaller than for bourbon, and limited releases sell through quickly. Australian distillers also make rye whisky, and a few use local rye grain.',
          'If you cannot find a particular bottle, compare it with similar mash bills rather than waiting. Our [Australian whisky guide](/blog/rise-of-australian-single-malt-whisky/) covers local producers whose small batches are worth watching.',
        ],
      },
      {
        heading: 'How should you taste rye whiskey?',
        paragraphs: [
          'Use a small tumbler or Glencairn glass and pour a measure of about 30 mL. Nose it gently, then sip neat. Add a little water if the spice feels sharp. A large ice cube works if you like it cold.',
          'Pairing suggestions: smoked meats, strong cheese, dark chocolate and pickles all work, because rye’s dryness cuts through richness.',
        ],
      },
    ],
    faqs: [
      { question: 'What is rye whiskey?', answer: 'Rye whiskey is whiskey made primarily from rye grain. American rye must be at least 51% rye, aged in new charred oak and bottled at 40% ABV or higher.' },
      { question: 'What is the difference between rye and bourbon?', answer: 'Bourbon must be at least 51% corn and tastes sweeter, while rye must be at least 51% rye and tastes spicier, drier and more peppery.' },
      { question: 'What does rye whiskey taste like?', answer: 'Rye whiskey tastes of black pepper, cinnamon, clove, mint and dark rye bread, with a dry, spicy finish.' },
      { question: 'What is rye used for in cocktails?', answer: 'Rye is the traditional base for the Manhattan and the Sazerac and works well in an Old Fashioned because its spice balances sweetness.' },
      { question: 'Is Canadian rye real rye?', answer: 'Canadian rye is a traditional style name. It is often made mostly from corn with some rye added for flavour, so it differs from American straight rye.' },
      { question: 'Can I buy rye whiskey in Australia?', answer: 'Yes. Rye whiskey is sold in Australia, including American straight ryes and Australian-made rye whisky, though selection is narrower than for bourbon.' },
    ],
  },

  // nikka whiskey 1300/18 · yamazaki whiskey 1000/13 · hibiki whiskey 2900/14 · japanese whisky 2400/16
  'why-japanese-whisky-became-a-global-obsession': {
    primaryKeyword: 'nikka whiskey',
    secondaryKeywords: ['yamazaki whiskey', 'nikka from the barrel', 'hibiki whiskey', 'japanese whisky', 'whisky nikka whisky', 'nikka whisky', 'suntory whisky'],
    seoTitle: 'Japanese Whisky: Nikka, Yamazaki and Why It Is Prized',
    seoDescription: 'Nikka whiskey, Yamazaki and Japanese whisky explained: mizunara oak, the 2021 labelling rules and how to buy genuine bottles in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'Japanese whisky was inspired by Scotch but developed its own precise, delicate style.',
      'Nikka and Suntory (Yamazaki, Hibiki) are the two giants, each with multiple distilleries and blending teams.',
      'A 2021 industry labelling standard now defines what can be called Japanese whisky, after years of loose rules.',
      'Demand has outrun supply, which is why aged bottles are scarce and prices have climbed.',
    ],
    sections: [
      {
        heading: 'Why is Japanese whisky so popular?',
        paragraphs: [
          'Three things came together: craftsmanship, awards and scarcity. Japanese distillers built their reputation on precision and balance, then a run of wins in international blind tastings in the 2000s and 2010s introduced the style to a global audience. When stock of aged whisky is limited, a spike in demand pushes prices up quickly.',
          'Japanese whisky also tastes distinctive. It tends to be delicate, layered and fragrant, with fruit, honey and subtle smoke rather than the heavy peat of some Scotch. That makes it a good fit for people who prefer elegance to power.',
        ],
      },
      {
        heading: 'What is the difference between Nikka and Suntory?',
        paragraphs: [
          'Nikka was founded by Masataka Taketsuru, who learned whisky-making in Scotland and brought that training back to Japan. Its distilleries at Yoichi (Hokkaido) and Miyagikyo (Miyagi) make different styles, with Yoichi known for richer, more robust malt and Miyagikyo for softer, fruitier whisky.',
          'Suntory, founded by Shinjiro Torii, owns Yamazaki, Hakushu and Chita and is behind Hibiki. Yamazaki, founded in 1923, was Japan’s first malt whisky distillery. Both companies rely on blending skill and a wide palette of casks, including Japanese mizunara oak.',
        ],
      },
      {
        heading: 'What is mizunara oak?',
        paragraphs: [
          'Mizunara is Japanese oak. It is difficult to work with and slow to grow, and casks leak more than American or European oak, so they are expensive. In return it can give distinctive notes of sandalwood, incense, coconut and spice.',
          'Not every Japanese whisky uses it, and mizunara is more often a component or finish than the whole story. It is, however, one reason top-end Japanese bottlings taste different from Scotch of a similar age.',
        ],
      },
      {
        heading: 'What do the 2021 labelling rules change?',
        paragraphs: [
          'For years, “Japanese whisky” on a label did not guarantee the whisky was made in Japan, because bottlers could blend in imported whisky. In 2021, the Japan Spirits & Liqueurs Makers Association introduced a voluntary standard with a transition period. To use the term Japanese whisky, the spirit should be saccharified, fermented, distilled and aged in Japan for at least three years in wooden casks, then bottled in Japan at 40% ABV or more.',
          'The rules are voluntary, so check labels from smaller brands. Reputable producers such as Nikka and Suntory state clearly where and how their whisky is made.',
        ],
      },
      {
        heading: 'Which Nikka and Yamazaki bottles are worth trying?',
        paragraphs: [
          'Nikka From The Barrel is a high-strength blend that has become a modern classic. Nikka 12 and the Taketsuru Pure Malt line show the brand’s house style across ages, and the Yamazaki 18 is a benchmark single malt for collectors.',
          'See the range in our [Japanese whisky collection](/shop/whisky/collection/japanese-whisky/). Good places to start are [Nikka 12](/shop/whisky/nikka-12-japanese-whisky/) for a balanced everyday dram or the [Nikka Taketsuru 21 Year Old](/shop/whisky/nikka-taketsuru-21-year-old-pure-malt/) for a special occasion.',
        ],
        links: [{ text: 'Shop Japanese whisky', href: JAPANESE }],
      },
      {
        heading: 'How do you spot a genuine bottle?',
        paragraphs: [
          'Counterfeits and relabelled bottles exist in the rare whisky market. Buy from reputable sellers, check the packaging, bottle weight, label printing, batch codes and fill level, and be wary of prices that seem too good to be true.',
          'If you are weighing a bottle as an investment, read our [guide to investing in rare whisky](/blog/beginners-guide-investing-in-rare-whisky/) first, and learn [how to store it properly](/blog/how-to-store-and-cellar-rare-whisky/).',
        ],
      },
      {
        heading: 'How should you drink Japanese whisky?',
        paragraphs: [
          'Japanese whisky is often served as a highball, with chilled soda and a lot of ice, which highlights its clean, fragrant character. Neat or with a drop of water is better for aged expressions. Mizuwari, whisky diluted with cold water over ice, is a traditional way to drink it with food.',
          'Serve in a small tulip glass for neat tasting and a tall chilled glass for highballs.',
        ],
      },
    ],
    faqs: [
      { question: 'What is Nikka whisky?', answer: 'Nikka is a Japanese whisky producer founded by Masataka Taketsuru in 1934. It operates the Yoichi and Miyagikyo distilleries and is known for blends such as From The Barrel and Taketsuru Pure Malt.' },
      { question: 'Why is Japanese whisky so expensive?', answer: 'Demand grew faster than aged stock could be replaced, and ageing takes many years. That scarcity, plus costly mizunara oak and strong global demand, pushes prices up.' },
      { question: 'Is Japanese whisky made in Japan?', answer: 'Not always historically, because loose rules once allowed imported whisky in blends. Since 2021, an industry standard says Japanese whisky should be distilled, aged and bottled in Japan.' },
      { question: 'What is Yamazaki whisky?', answer: 'Yamazaki is Suntory’s first malt distillery, founded in 1923 near Kyoto. Its single malts are known for fruit, spice and layered oak notes.' },
      { question: 'What is mizunara oak?', answer: 'Mizunara is Japanese oak used for whisky casks. It is rare and costly and can give sandalwood, incense and coconut notes.' },
      { question: 'How do you drink Japanese whisky?', answer: 'Japanese whisky works as a highball with soda, neat with a splash of water, or as mizuwari (diluted with cold water over ice) alongside food.' },
    ],
  },

  // lark whisky 3600/24 · best whisky in australia 590/17 · best australian whisky 390/14
  'rise-of-australian-single-malt-whisky': {
    primaryKeyword: 'lark whisky',
    secondaryKeywords: ['best whisky in australia', 'best australian whisky', 'lark tasmanian peated', 'australian spirits', 'australian whiskey', 'best whiskey australia', 'cheap whiskey australia'],
    seoTitle: 'Australian Whisky: Lark, Tasmania and the Best to Buy',
    seoDescription: 'Australian single malt whisky explained: how Tasmania and Lark revived distilling, what makes local whisky taste different and the best bottles to buy.',
    updated: UPDATED,
    keyTakeaways: [
      'Australian whisky took off after Tasmanian law changes in the 1990s allowed small-scale distilling.',
      'Lark Distillery in Tasmania is widely credited with kick-starting the modern industry.',
      'A warm climate speeds maturation, so Australian whisky is often richer at a younger age than Scotch.',
      'Small batches mean limited bottles sell out fast and may not be restocked.',
    ],
    sections: [
      {
        heading: 'How did Australian whisky begin?',
        paragraphs: [
          'Distilling in Australia dates back to the early colony, but tight restrictions on stills (in Tasmania from 1839) held back small-scale whisky-making for more than 150 years. Legal reform in the early 1990s changed that, and Bill Lark, a Tasmanian who helped lead that change, opened Lark Distillery in Hobart.',
          'Lark showed that small, patient, high-quality malt whisky could be made in Australia and sold at a premium. Others followed in Tasmania, Victoria, New South Wales and Western Australia, and the category has grown quickly since.',
        ],
      },
      {
        heading: 'What makes Australian whisky taste different?',
        paragraphs: [
          'Climate is the biggest factor. Australia’s warmer, more variable temperatures push whisky in and out of the wood faster than Scotland’s cool, steady conditions. That draws flavour from the cask more quickly, so a three to five year old Australian malt can taste surprisingly rounded and rich.',
          'Producers also use local ingredients, such as Tasmanian barley and peat, and a wide range of casks, from ex-bourbon and ex-sherry to Australian fortified wine and red wine barrels. The result is fruit-forward, spicy and often bolder than Scotch of the same age.',
        ],
      },
      {
        heading: 'Why is Lark whisky so well known?',
        paragraphs: [
          'Lark is the pioneer, and its range is easy to explore. The Classic Cask is a gentle introduction, the Dark Lark is richer, and limited releases such as Legacy and Christmas Cask show what small-batch ageing can do. The distillery also makes peated whisky, which reflects Tasmania’s coastal character.',
          'You can browse available releases in our [Australian whisky collection](/shop/whisky/collection/australian-whisky/). If you want a place to start, the [Dark Lark 2026](/shop/whisky/dark-lark-2026-australian-whisky/) is a rich, easy-to-like expression.',
        ],
        links: [{ text: 'Shop Australian whisky', href: AUSSIE }],
      },
      {
        heading: 'Which are the best Australian whiskies?',
        paragraphs: [
          'The best depends on your taste, but some names recur. Lark and Sullivans Cove from Tasmania, Starward in Melbourne and Archie Rose in Sydney are among the most widely respected. Sullivans Cove’s French Oak Cask won World’s Best Single Malt at the 2014 World Whiskies Awards, which helped put Australian whisky on the global map.',
          'Look at the cask type, ABV and whether the whisky is a single malt, then compare with a Scotch you already enjoy. Our [guide to single malt versus blended Scotch](/blog/single-malt-vs-blended-scotch/) is a useful comparison point.',
        ],
      },
      {
        heading: 'Why are Australian whiskies so hard to find?',
        paragraphs: [
          'Production runs are small, ageing takes years and demand has grown faster than supply. Many releases are allocated through distillery mailing lists or sold out in a day. A bottle that is in stock today may not be available next month.',
          'If you see a release you want, buy it rather than wait. Limited releases such as cask-strength or single-cask bottles are usually the first to disappear.',
        ],
      },
      {
        heading: 'Is Australian whisky good value?',
        paragraphs: [
          'It depends on the bottle. Entry-level Australian malts can cost as much as a good aged Scotch because the volume is small and costs are high. In exchange, you get a distinctive local flavour and the satisfaction of supporting a young industry.',
          'For value, compare the cask strength, age and release size. Cheaper cask-finished expressions can be an excellent way to try Australian malt without paying for a rare release.',
        ],
      },
      {
        heading: 'How should you serve Australian whisky?',
        paragraphs: [
          'Pour a small measure into a tulip glass and sip neat. A few drops of water often unlock fruit and spice. Because many Australian malts are bottled at higher strength, you may prefer a larger splash than with a standard 40 per cent Scotch.',
          'Pair with dark chocolate, local cheese and dried fruit. If you collect, read [how to store whisky properly](/blog/how-to-store-and-cellar-rare-whisky/).',
        ],
      },
    ],
    faqs: [
      { question: 'Who makes Lark whisky?', answer: 'Lark Distillery in Hobart, Tasmania, founded by Bill Lark, makes Lark whisky. It is widely credited with starting the modern Australian single malt industry.' },
      { question: 'What is the best Australian whisky?', answer: 'There is no single best, but Lark, Sullivans Cove, Starward and Archie Rose are widely respected. Choose by cask type and flavour rather than brand alone.' },
      { question: 'Why does Australian whisky mature faster?', answer: 'Australia’s warmer, more variable climate causes whisky to move in and out of the cask more quickly than in Scotland, extracting more flavour in fewer years.' },
      { question: 'Is Australian whisky better than Scotch?', answer: 'Neither is better. Australian whisky tends to be richer and more fruit-forward at a younger age, while Scotch has a broader range of regional styles.' },
      { question: 'Why is Australian whisky expensive?', answer: 'Small production, high costs and strong demand push prices up, and limited releases often sell out.' },
      { question: 'Can I buy Lark whisky online in Australia?', answer: 'Yes. Doctors of Whisky stocks Lark releases with delivery across Australia, subject to availability. Buyers must be 18 or over.' },
    ],
  },
};
