import type { BlogPost } from '@/lib/types';

type Sections = NonNullable<BlogPost['sections']>;

/** Extra sections appended after the main guide sections (whisky batch). */
export const BLOG_MORE_1: Record<string, Sections> = {
  'single-malt-vs-blended-scotch': [
    {
      heading: 'What are the most common Scotch whisky myths?',
      paragraphs: [
        'Older is always better: not so. Age adds oak and softness, but a 12 year old from a great cask can beat a tired 21. Single malt is always superior: it is a different style, not a higher grade, and some blends cost more than many single malts. Scotch is always smoky: only peated whisky is, and most Speyside and Highland malts have little or no peat.',
        'Adding water or ice ruins it: a few drops of water is standard practice among distillers and blenders, and ice is a personal choice. A darker colour means an older whisky: colour comes from the cask, and Scotch law allows plain caramel colouring, so colour alone tells you little.',
      ],
    },
    {
      heading: 'What do cask strength, chill-filtered and natural colour mean?',
      paragraphs: [
        'Cask strength (or barrel proof) whisky is bottled without being diluted, usually at 50 to 65 per cent ABV. It is intense and rewards water. Chill filtration removes fatty compounds so whisky stays clear when cold. Non-chill-filtered whisky is bottled at 46 per cent or more and can look hazy with ice, but many drinkers prefer the extra texture.',
        'Natural colour means no caramel has been added. NAS stands for no age statement. These terms help you compare two bottles of the same age and decide what you are paying for.',
      ],
    },
    {
      heading: 'What makes a good Scotch whisky gift?',
      paragraphs: [
        'For a first-time whisky drinker, choose a well-known 12 year old Speyside single malt or a premium blend in a gift box. For someone who already enjoys whisky, a cask-strength bottle, a sherry-matured release or a limited edition shows thought. Miniature or tasting sets let a friend try several styles.',
        'Check the recipient’s taste if you can: smoky Islay malts divide opinion. Browse options in our [Scotch whisky collection](/shop/whisky/collection/scotch-whisky/). Buyers must be 18 or over.',
      ],
    },
  ],
  'what-makes-bourbon-different': [
    {
      heading: 'What do mash bill, proof and small batch mean?',
      paragraphs: [
        'The mash bill is the grain recipe, for example 75 per cent corn, 13 per cent rye and 12 per cent malted barley. Proof is double the ABV, so 100 proof is 50 per cent ABV. Small batch means a blend of a limited number of barrels, though there is no legal definition. Single barrel means every bottle comes from one barrel, so each can taste a little different.',
        'Sour mash is a process, not a flavour: some of the previous distillation’s spent mash is added to the next fermentation to keep the yeast healthy and the pH consistent. Almost all bourbon is sour mash.',
      ],
    },
    {
      heading: 'How do you make a classic bourbon Old Fashioned?',
      paragraphs: [
        'Add a sugar cube or 5 mL of simple syrup to a rocks glass with two or three dashes of Angostura bitters and a splash of water. Stir until dissolved. Add 60 mL of bourbon and a large ice cube, and stir for about 20 seconds. Express an orange peel over the drink and drop it in.',
        'Choose a bourbon at 45 per cent or higher so the drink does not taste watery. A higher-rye bourbon adds spice, and a wheated one makes a softer drink. See bourbons in our [bourbon collection](/shop/whisky/collection/bourbon/).',
      ],
    },
    {
      heading: 'What are the common bourbon myths?',
      paragraphs: [
        'Bourbon must be aged four years: no, straight bourbon needs only two years. Bourbon must come from Kentucky: no, any US state. Bourbon is cheap or rough: some are, but many are complex, and limited releases sell for collector prices. Bourbon and Tennessee whiskey are the same: Tennessee whiskey follows similar rules but is filtered through charcoal before ageing.',
        'Finally, bourbon is not always sweet. High-rye and cask-strength bottles are drier, spicier and more savoury, so tasting notes are worth reading.',
      ],
    },
  ],
  'beginners-guide-to-rye-whiskey': [
    {
      heading: 'How do you make a classic Manhattan with rye?',
      paragraphs: [
        'Stir 60 mL of rye whiskey, 30 mL of sweet vermouth and two dashes of Angostura bitters with ice for about 30 seconds. Strain into a chilled coupe and garnish with a quality cherry or an orange peel. Use fresh vermouth, stored in the fridge, because oxidised vermouth ruins the drink.',
        'A rye at 45 to 50 per cent holds up well. For a drier version, make a “Perfect Manhattan” by splitting the vermouth between 15 mL sweet and 15 mL dry. Pikesville and Sazerac are popular choices, and you can see them in the [rye whiskey collection](/shop/whisky/collection/rye-whiskey/).',
      ],
    },
    {
      heading: 'How do rye mash bills and styles differ?',
      paragraphs: [
        'Modern American ryes range from the legal minimum of 51 per cent rye to 95 or 100 per cent. A lower-rye recipe blends rye with corn and malted barley and tastes balanced and slightly sweet. A high-rye recipe tastes spicy, herbal and dry. Some distillers also use malted rye, which gives a nutty, bready character.',
        'Historically, Pennsylvania and Maryland were rye heartlands before Prohibition, and the revival of craft cocktails brought rye back. Read the label for mash bill and age, and expect a drier, more savoury drink than bourbon.',
      ],
    },
    {
      heading: 'What food goes well with rye whiskey?',
      paragraphs: [
        'Rye’s spice and dryness make it a good partner for rich, salty and smoky food. Try it with smoked brisket, pastrami, charcuterie, blue cheese or aged cheddar. Dark chocolate and nuts also work, as do pickles, which are a classic chaser in some bars.',
        'For dessert, rye pairs with apple pie, gingerbread and caramel. Since high-proof ryes can overpower delicate food, match intensity with intensity. If you like to compare styles, our [bourbon guide](/blog/what-makes-bourbon-different/) covers the sweeter side.',
      ],
    },
  ],
  'why-japanese-whisky-became-a-global-obsession': [
    {
      heading: 'How do Yoichi, Miyagikyo, Yamazaki and Hakushu differ?',
      paragraphs: [
        'Each distillery has its own character. Nikka’s Yoichi, in Hokkaido, uses direct coal-fired stills for a robust, slightly smoky and maritime malt. Miyagikyo, in Miyagi, is softer, floral and fruity. Suntory’s Yamazaki, near Kyoto, produces fruit, spice and sweet oak, while Hakushu, in the Southern Alps, is fresh, green and lightly smoky.',
        'Because Japanese distillers do not trade casks, each company makes a range of malts in-house to blend. That is why blending skill matters so much. See Nikka and Yamazaki bottles in our [Japanese whisky collection](/shop/whisky/collection/japanese-whisky/).',
      ],
    },
    {
      heading: 'What do pure malt, blended and highball mean?',
      paragraphs: [
        'Nikka uses “pure malt” for a blend of malt whiskies only, with no grain whisky, similar to a Scottish blended malt. A “blended” whisky combines malt and grain whisky. A highball is whisky and sparkling water over ice, a hugely popular Japanese serve. Mizuwari is whisky diluted with cold still water, often at a 1:2 or 1:3 ratio, and served with meals.',
        'Knowing these terms helps you decide what to buy. For a first bottle, a pure malt such as Nikka Taketsuru is a good way to taste the house style.',
      ],
    },
    {
      heading: 'What should you watch out for when buying?',
      paragraphs: [
        'Demand has pushed prices up, and shortages mean some age-stated bottles are rare. Check the labelling, since only whisky meeting the 2021 standard is certain to be made in Japan, and buy from reputable sellers who source stock properly.',
        'Be careful with very cheap “Japanese-style” whisky, which may be a blend of imported whisky bottled in Japan. A gift box, a clear age statement and a recognised producer are signs you are buying the real thing. Buyers must be 18 or over.',
      ],
    },
  ],
  'rise-of-australian-single-malt-whisky': [
    {
      heading: 'Which regions make Australian whisky?',
      paragraphs: [
        'Tasmania leads, with Lark, Sullivans Cove, Overeem, Nant and others, helped by cool, clean conditions and local barley. Victoria has Starward in Melbourne and Bakery Hill, New South Wales has Archie Rose in Sydney, and Western Australia has Limeburners in Albany. South Australia and Queensland also have growing craft distilleries.',
        'Each region shows a different style, from coastal and peaty in Tasmania to red wine cask-driven in Victoria. See the range of Lark bottles in our [Australian whisky collection](/shop/whisky/collection/australian-whisky/).',
      ],
    },
    {
      heading: 'How do Australian casks shape the flavour?',
      paragraphs: [
        'Australian distillers often use local barrels. Starward ages whisky in Australian red wine barrels, giving a distinctive fruity, spicy style. Others use ex-bourbon barrels, ex-sherry casks and ex-fortified wine casks such as Apera or tawny port-style barrels from South Australia and Victoria.',
        'Because warmer temperatures speed up extraction, producers often use smaller casks. This mixes more flavour into the whisky at a younger age, but also demands careful blending to avoid overly woody results.',
      ],
    },
    {
      heading: 'How do you taste Australian whisky and compare it with Scotch?',
      paragraphs: [
        'Pour a small measure of a Scotch you know and an Australian malt of a similar age, and taste them side by side. Expect the Australian whisky to be fruitier, more vanilla- or wine-driven and often bolder. Add a few drops of water to both.',
        'Good matches include dark chocolate, blue cheese and Australian native fruits. For ideas on what to buy, see our comparison of [single malt and blended Scotch](/blog/single-malt-vs-blended-scotch/) and consider gifting a Lark or other local release, which makes a distinctive present. Buyers must be 18 or over.',
      ],
    },
  ],
};
