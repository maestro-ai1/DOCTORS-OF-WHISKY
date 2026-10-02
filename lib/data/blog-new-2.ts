import { newGuide } from '@/lib/data/blog-new-helpers';

const LOWCARB = '/shop/beer-premix-wine/collection/low-carb-beer/';
const LAGER = '/shop/beer-premix-wine/collection/lager/';
const IMPORTED = '/shop/beer-premix-wine/collection/imported-beer/';
const IPA = '/shop/beer-premix-wine/collection/imported-beer/';
const GERMAN = '/shop/beer-premix-wine/collection/german-beer/';
const PILSNER = '/shop/beer-premix-wine/collection/pilsner/';
const RED = '/shop/beer-premix-wine/collection/red-wine/';
const CAB = '/shop/beer-premix-wine/collection/cabernet-sauvignon/';
const GRENACHE = '/shop/beer-premix-wine/collection/grenache/';
const IRISH = '/shop/whisky/collection/irish-whiskey/';
const SCOTCH = '/shop/whisky/collection/scotch-whisky/';
const BOURBON = '/shop/whisky/collection/bourbon/';
const CHAMPAGNE = '/shop/beer-premix-wine/collection/champagne/';
const SPARKLING = '/shop/beer-premix-wine/collection/sparkling/';
const PROSECCO = '/shop/beer-premix-wine/collection/prosecco/';

export const NEW_GUIDES_2 = [
  newGuide({
    slug: 'beer-with-least-carbs-lowest-carb-beer-australia',
    title: 'Beer With Least Carbs: Lowest Carb Beer in Australia Explained',
    seoTitle: 'Beer With Least Carbs: Low Carb Beer in Australia',
    excerpt: 'How low carb and mid strength beers are made, what the labels mean, and how to choose the lowest carb beer in Australia without giving up flavour.',
    category: 'Beer Guide',
    image: '/images/blog/shared/bottle-shop.webp',
    primaryKeyword: 'beer with least carbs',
    relatedSubcategory: 'low-carb-beer',
    lead: 'Beer with least carbs is usually a low carb lager brewed so that more of the grain sugars are fermented into alcohol, leaving only a few grams of carbohydrate per serve. This guide explains how low carb beer is made, how it differs from mid strength and light beer, how to read the label and which style suits you.',
    takeaways: [
      'Low carb beers are brewed to leave less residual sugar, often by using enzymes that ferment more of the grain.',
      'Mid strength beer cuts alcohol, not necessarily carbs, so the two labels are not the same.',
      'Check the nutrition panel for carbohydrate per serve and per 100 ml, plus the ABV.',
      'Drink responsibly: alcohol itself contributes calories, so a lighter beer is not a free pass.',
    ],
    sections: [
      {
        heading: 'What makes a beer low in carbs?',
        paragraphs: [
          'Regular beer contains carbohydrates left over from malted grain that yeast did not ferment. A low carb beer is brewed to reduce this leftover sugar, so the finished beer is drier and has fewer carbohydrates per serve.',
          'Brewers often add an enzyme during brewing that breaks starches down into simple sugars the yeast can ferment, which leaves very little behind. The result is a crisp, light, very dry beer.',
        ],
        links: [{ text: 'Shop low carb beer', href: LOWCARB }],
      },
      {
        heading: 'Is low carb beer the same as mid strength beer?',
        paragraphs: [
          'No. Mid strength beer has less alcohol than a full-strength beer, commonly around 3 to 3.5 percent ABV compared with roughly 4.5 to 5 percent. Low carb beer reduces carbohydrates, and its alcohol level can still be around full strength.',
          'Some beers are both low carb and mid strength. Read the label for both figures rather than assuming one from the other.',
        ],
      },
      {
        heading: 'How do you read a beer label for carbs?',
        paragraphs: [
          'Australian labels show a nutrition information panel with carbohydrate per serve and per 100 millilitres, and the alcohol content as a percentage and as standard drinks. Compare per 100 ml figures when the serve sizes differ.',
          'Remember that a standard drink in Australia contains 10 grams of alcohol, so a beer’s standard drink count depends on both the volume and the ABV.',
        ],
      },
      {
        heading: 'What does low carb beer taste like?',
        paragraphs: [
          'Most low carb beers are pale lagers with a light body, a clean, dry finish and a mild malt character. Because little sugar is left, they taste less sweet and less rounded than a standard lager.',
          'If you like crisp, refreshing beers on a hot day, they are an easy choice. If you like a full malt flavour, you may find them thin.',
        ],
      },
      {
        heading: 'Are low carb beers lower in calories?',
        paragraphs: [
          'Usually, yes, but not by as much as people expect. Beer calories come from both carbohydrates and alcohol, and alcohol is the larger share in many beers, so a low carb beer with a normal ABV still contains a meaningful number of calories.',
          'If calories are your goal, compare the energy figure on the label, and consider a mid strength or alcohol-free option as well. Our [non-alcoholic beer range](/shop/beer-premix-wine/collection/non-alcoholic-beer/) is another choice.',
        ],
      },
      {
        heading: 'What are the best occasions for low carb beer?',
        paragraphs: [
          'Low carb and mid strength beers suit long afternoons, barbecues, sport and any occasion where you want to drink several beers at a measured pace. They are popular with people watching carbohydrate intake.',
          'Serve them very cold, because the light flavour tastes best that way.',
        ],
      },
      {
        heading: 'What food goes with low carb beer?',
        paragraphs: [
          'Pair light lagers with salads, grilled chicken, fish, prawns and spicy dishes, which a dry, crisp beer cools and cleanses. They also suit snacks such as nuts, popcorn and chips.',
          'Rich, heavy dishes may overwhelm a very light beer, in which case a fuller lager or pale ale from our [lager range](' + LAGER + ') is a better partner.',
        ],
      },
      {
        heading: 'How should you store and serve low carb beer?',
        paragraphs: [
          'Store beer cool and out of sunlight, because light spoils hops and creates a skunky smell. Serve it at about 3 to 5 degrees Celsius in a clean glass.',
          'Drink it fresh. Light lagers are not designed to age, so check the best-before date.',
        ],
      },
      {
        heading: 'How do you choose a low carb beer?',
        paragraphs: [
          'Decide whether your priority is carbohydrate, alcohol or flavour, then compare the nutrition panel and the ABV. Try a few styles, including international lagers from our [imported beer collection](' + IMPORTED + ').',
          'See the current bottles in our [low carb and mid strength beer collection](' + LOWCARB + '). We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the lowest carb beer in Australia?', answer: 'Low carb lagers brewed to leave very little residual sugar have the fewest carbohydrates. Compare the carbohydrate per serve on each label to find the lowest.' },
      { question: 'Is low carb beer healthier?', answer: 'It has fewer carbohydrates, but alcohol still contributes calories and affects health. Drink responsibly and within the Australian guidelines.' },
      { question: 'What is mid strength beer?', answer: 'Mid strength beer has less alcohol than full-strength beer, commonly around 3 to 3.5 percent ABV in Australia.' },
      { question: 'Does low carb beer taste different?', answer: 'Usually it is lighter and drier than a regular lager, with less sweetness and body.' },
      { question: 'How many carbs are in beer?', answer: 'It varies by style. Check the nutrition information panel on the label, which shows carbohydrate per serve and per 100 ml.' },
      { question: 'Where can I buy low carb beer online in Australia?', answer: 'You can buy low carb beer online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Low-alcohol beer', url: 'https://en.wikipedia.org/wiki/Low-alcohol_beer' },
      { text: 'Wikipedia: Lager', url: 'https://en.wikipedia.org/wiki/Lager' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),

  newGuide({
    slug: 'cabernet-sauvignon-merlot-grenache-red-wine-grapes',
    title: 'Cabernet Red Wine, Merlot and Grenache: Red Wine Grapes Explained',
    seoTitle: 'Cabernet Red Wine, Merlot and Grenache Explained',
    excerpt: 'A plain-English guide to cabernet sauvignon, merlot and grenache: how each tastes, where it is grown in Australia and what food suits it.',
    category: 'Wine Guide',
    image: '/images/blog/shared/vineyard.webp',
    primaryKeyword: 'cabernet red wine',
    relatedSubcategory: 'cabernet-sauvignon',
    lead: 'Cabernet red wine, merlot and grenache are three of the most useful red grapes to know: cabernet sauvignon for structure and blackcurrant, merlot for softness and plum, and grenache for juicy red fruit and spice. This guide explains how each tastes, where they grow in Australia, how they are blended and what to serve with them.',
    takeaways: [
      'Cabernet sauvignon is full-bodied with firm tannins and blackcurrant flavours.',
      'Merlot is softer and plummy, and is often blended with cabernet.',
      'Grenache is fruity and medium-bodied, and is the G in the GSM blend.',
      'Serve reds at a cool room temperature, and open fuller reds a little before pouring.',
    ],
    sections: [
      {
        heading: 'What does cabernet sauvignon taste like?',
        paragraphs: [
          'Cabernet sauvignon is a full-bodied red with firm tannins and flavours of blackcurrant, blackberry, cedar and sometimes mint or capsicum. It has the structure to age for many years.',
          'Cabernet is grown across the world and is the backbone of Bordeaux red blends. In Australia, Coonawarra and Margaret River are famous for it.',
        ],
        links: [{ text: 'Shop cabernet sauvignon', href: CAB }],
      },
      {
        heading: 'What food goes with cabernet sauvignon?',
        paragraphs: [
          'The tannins in cabernet work well with the protein and fat in red meat. Steak, roast lamb, burgers and hard cheeses are the classic matches.',
          'Lighter dishes can be overwhelmed by a big cabernet, so save it for hearty meals.',
        ],
      },
      {
        heading: 'What is merlot?',
        paragraphs: [
          'Merlot is softer and rounder than cabernet, with plum, cherry and chocolate flavours and gentler tannins. It is easy to enjoy young, which has made it popular for everyday drinking.',
          'In Bordeaux, merlot and cabernet are blended, with merlot adding a plush middle to cabernet’s structure. Australian producers do the same, and many make single-variety merlot as well.',
        ],
      },
      {
        heading: 'What food goes with merlot?',
        paragraphs: [
          'Merlot suits roast chicken, pork, pasta with tomato sauces, mushroom dishes and medium-strength cheeses. Its softness makes it forgiving with a wide range of food.',
          'It is also a good wine to drink on its own while cooking.',
        ],
      },
      {
        heading: 'What is grenache?',
        paragraphs: [
          'Grenache, known as garnacha in Spain, makes fruity, medium-bodied wines with flavours of raspberry, strawberry, red cherry and warm spice, and often a touch of pepper. Tannins are gentle and the alcohol can be generous.',
          'In Australia, grenache is closely linked with McLaren Vale and the Barossa, where old vines make concentrated wines. In the southern Rhône it is the main grape in Châteauneuf-du-Pape.',
        ],
        links: [{ text: 'Shop grenache', href: GRENACHE }],
      },
      {
        heading: 'What is a GSM blend?',
        paragraphs: [
          'GSM stands for grenache, shiraz and mourvèdre, a classic blend from the Rhône Valley that is also popular in Australia. Grenache brings the juicy fruit, shiraz brings depth and spice, and mourvèdre adds structure and earthiness.',
          'GSM blends are versatile food wines, good with barbecued meat, roast vegetables and Mediterranean dishes. See our guide to [choosing red wine](/blog/how-to-choose-red-wine/) for shiraz and more.',
        ],
      },
      {
        heading: 'How should you serve red wine?',
        paragraphs: [
          'Serve red wine at a cool room temperature, roughly 16 to 18 degrees Celsius, which in an Australian summer may mean a short time in the fridge. Lighter grenache is lovely slightly cooler.',
          'Fuller cabernets benefit from decanting or simply opening the bottle an hour before dinner to soften the tannins.',
        ],
      },
      {
        heading: 'Which red grape should you choose?',
        paragraphs: [
          'Choose cabernet sauvignon for steak nights and cellaring, merlot for soft, easy drinking, and grenache for juicy, food-friendly wines that suit warm weather. Blends give you a bit of everything.',
          'Browse the [red wine range](' + RED + ') and the single-variety collections for cabernet and grenache.',
        ],
      },
      {
        heading: 'How do you store red wine?',
        paragraphs: [
          'Keep bottles lying on their side in a cool, dark place at a steady temperature, away from heat and vibration. Most everyday reds are made to be drunk within a few years, while good cabernets can improve for longer.',
          'Once opened, recork and keep the bottle in the fridge for up to a few days. We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What does cabernet sauvignon taste like?', answer: 'It is full-bodied with firm tannins and flavours of blackcurrant, blackberry and cedar.' },
      { question: 'Is merlot sweeter than cabernet?', answer: 'Merlot is not usually sweeter, but it is softer and fruitier, with gentler tannins than cabernet sauvignon.' },
      { question: 'What is grenache?', answer: 'Grenache is a red grape that makes fruity, medium-bodied wines with red berry and spice flavours. It is called garnacha in Spain.' },
      { question: 'What is a GSM blend?', answer: 'GSM is a blend of grenache, shiraz and mourvèdre, originally from the Rhône Valley and also made in Australia.' },
      { question: 'How should red wine be served?', answer: 'Serve at a cool room temperature, about 16 to 18 degrees Celsius, and open fuller reds before pouring.' },
      { question: 'Where can I buy red wine online in Australia?', answer: 'You can buy red wine online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Cabernet Sauvignon', url: 'https://en.wikipedia.org/wiki/Cabernet_Sauvignon' },
      { text: 'Wikipedia: Grenache', url: 'https://en.wikipedia.org/wiki/Grenache' },
      { text: 'Wine Australia', url: 'https://www.wineaustralia.com/' },
    ],
  }),

  newGuide({
    slug: 'what-is-ipa-beer-india-pale-ale-explained',
    title: 'What Is IPA Beer? India Pale Ale Explained for Australian Drinkers',
    seoTitle: 'What Is IPA Beer? India Pale Ale Explained',
    excerpt: 'IPA stands for India pale ale. Learn what makes an IPA bitter and fruity, the main styles, how strong it is and what food to pair with it.',
    category: 'Beer Guide',
    image: '/images/blog/shared/bottle-shop.webp',
    primaryKeyword: 'ipa beer',
    relatedSubcategory: 'imported-beer',
    lead: 'IPA beer, short for India pale ale, is a hop-forward style of pale ale known for bitterness and aromas of citrus, pine and tropical fruit. This guide explains what an IPA is, where the name comes from, how West Coast, hazy and session IPAs differ, how strong they are and what to eat with them.',
    takeaways: [
      'IPA stands for India pale ale, a pale ale brewed with generous amounts of hops.',
      'West Coast IPAs are clear and bitter; hazy or New England IPAs are cloudy and juicy.',
      'Strength typically runs from about 4 to 7.5 percent ABV, with double IPAs higher.',
      'IPAs pair well with spicy food, burgers and strong cheeses.',
    ],
    sections: [
      {
        heading: 'What does IPA stand for?',
        paragraphs: [
          'IPA stands for India pale ale. The style grew out of English pale ales brewed in the 1700s with extra hops, which the story says helped the beer survive the long sea voyage to India.',
          'Whatever the exact history, modern IPA is a craft-beer staple and one of the most widely brewed styles in the world, including in Australia.',
        ],
        links: [{ text: 'Shop IPA', href: IPA }],
      },
      {
        heading: 'What does IPA taste like?',
        paragraphs: [
          'An IPA is defined by hops. Expect noticeable bitterness and aromas of grapefruit, orange, pine, resin, tropical fruit or floral notes, depending on the hop varieties used. A malt backbone balances the bitterness.',
          'Bitterness is measured in IBU, or international bitterness units, though the sweetness and malt in the beer change how bitter it actually tastes.',
        ],
      },
      {
        heading: 'What are the main IPA styles?',
        paragraphs: [
          'A West Coast IPA is clear, dry and assertively bitter with piney, resinous hops. A hazy or New England IPA is cloudy and soft, with juicy tropical fruit flavours and low bitterness.',
          'Session IPAs are lower in alcohol for easier drinking, and double or imperial IPAs are stronger and richer. English IPAs are more restrained and malt-led.',
        ],
      },
      {
        heading: 'How strong is an IPA?',
        paragraphs: [
          'Most IPAs are around 5 to 7.5 percent ABV, with session IPAs closer to 4 percent and double IPAs at 8 percent or more. Always check the label, because the same style can vary.',
          'Remember that an Australian standard drink contains 10 grams of alcohol, so stronger beers use up more standard drinks per glass.',
        ],
      },
      {
        heading: 'How is IPA different from pale ale and lager?',
        paragraphs: [
          'Pale ale is a gentler, less hoppy cousin of IPA, while lager is fermented cool with a different yeast and usually tastes cleaner and less fruity. IPA is hoppier and often stronger than both.',
          'If you find IPAs too bitter, start with a pale ale or a hazy IPA. Our [lager range](' + LAGER + ') offers a gentler step.',
        ],
      },
      {
        heading: 'What food goes with IPA?',
        paragraphs: [
          'The bitterness and carbonation of an IPA cut through rich and spicy food. Try it with burgers, fried chicken, curries, tacos, barbecue and sharp cheddar.',
          'Citrusy IPAs also match grilled seafood. Avoid very delicate dishes, which a hoppy beer would overwhelm.',
        ],
      },
      {
        heading: 'How should you serve IPA?',
        paragraphs: [
          'Serve IPA cold but not freezing, at about 7 to 10 degrees Celsius, in a tulip or pint glass so the aromas can open. Very cold temperatures mute the hop character.',
          'Hops fade quickly, so drink IPA fresh. Check the packaged-on or best-before date and store cans and bottles cold and out of sunlight.',
        ],
      },
      {
        heading: 'What is the meaning of IPA on the label?',
        paragraphs: [
          'When you see IPA on a label, it signals a hop-driven pale ale, usually with a bolder flavour than a standard lager. Words such as hazy, West Coast, session, double or New England tell you the style.',
          'Check the ABV and the style description to find a version that suits your taste.',
        ],
      },
      {
        heading: 'How do you choose an IPA?',
        paragraphs: [
          'If you like bitterness, choose a West Coast IPA. If you like fruit and softness, choose a hazy IPA. If you want to drink more than one, choose a session IPA.',
          'See the current beers in our [India pale ale collection](' + IPA + '). We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What does IPA stand for?', answer: 'IPA stands for India pale ale, a hop-forward style of pale ale.' },
      { question: 'Why is IPA so bitter?', answer: 'IPAs are brewed with large amounts of hops, which add bitterness and aroma. A malt backbone balances the bitterness.' },
      { question: 'What is a hazy IPA?', answer: 'A hazy or New England IPA is cloudy and juicy, with tropical fruit flavours and low bitterness.' },
      { question: 'How strong is IPA?', answer: 'Most are around 5 to 7.5 percent ABV, with session IPAs lower and double IPAs higher.' },
      { question: 'What food goes with IPA?', answer: 'Spicy food, burgers, fried chicken, curries and sharp cheeses work well.' },
      { question: 'Where can I buy IPA online in Australia?', answer: 'You can buy IPA online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: India pale ale', url: 'https://en.wikipedia.org/wiki/India_pale_ale' },
      { text: 'Wikipedia: Beer', url: 'https://en.wikipedia.org/wiki/Beer' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),

  newGuide({
    slug: 'german-beer-guide-german-wheat-weissbier-pilsner',
    title: 'German Beer Guide: German Wheat Beer, Weissbier and Pilsner',
    seoTitle: 'German Wheat Beer, Weissbier and Pilsner: A Guide',
    excerpt: 'A guide to German beer: the Reinheitsgebot, how German wheat beer and weissbier taste, what pilsner is, and how to serve each style.',
    category: 'Beer Guide',
    image: '/images/blog/shared/bottle-shop.webp',
    primaryKeyword: 'german wheat',
    relatedSubcategory: 'german-beer',
    lead: 'German wheat beer, weissbier and pilsner are three of the most popular German beer styles, from the cloudy, banana-and-clove wheat beer of Bavaria to the crisp, golden pilsner. This guide explains the purity law behind German brewing, how each style tastes, how to pour and serve it, and what to eat with it.',
    takeaways: [
      'German brewing is shaped by the Reinheitsgebot purity law of 1516.',
      'Weissbier is a wheat beer with banana and clove notes, usually served in a tall glass.',
      'Pilsner is a pale, crisp, bitter lager that originated in Pilsen in 1842.',
      'Helles, dunkel, bock, kölsch and altbier are other styles worth knowing.',
    ],
    sections: [
      {
        heading: 'What is the Reinheitsgebot?',
        paragraphs: [
          'The Reinheitsgebot, or German beer purity law, dates from 1516 and limited beer ingredients to water, barley and hops, with yeast understood once it was discovered. It shaped German brewing and is still a point of pride for many breweries.',
          'Not every beer sold in Germany or made by German-style brewers follows the law, but the tradition explains the clean, simple character of many German beers.',
        ],
        links: [{ text: 'Shop German beer', href: GERMAN }],
      },
      {
        heading: 'What is German wheat beer?',
        paragraphs: [
          'German wheat beer, called weissbier or weizen, is brewed with a large share of malted wheat, at least half the grain bill under traditional rules. It is top-fermented with a special yeast.',
          'It is typically cloudy and golden, with a soft body and flavours of banana, clove and bubblegum that come from the yeast. A filtered version is called kristallweizen.',
        ],
      },
      {
        heading: 'What is the difference between hefeweizen and weissbier?',
        paragraphs: [
          'They are closely related. Weissbier means white beer and refers to the style, and hefeweizen means yeast wheat beer, meaning the version left unfiltered with the yeast in suspension, which makes it cloudy.',
          'In practice the words are used almost interchangeably, so check the label for the style description.',
        ],
      },
      {
        heading: 'What is a pilsner?',
        paragraphs: [
          'Pilsner is a pale lager that began in Pilsen, in what is now the Czech Republic, in 1842. It is crisp and golden with a noticeable but balanced hop bitterness.',
          'German pilsner tends to be drier and more bitter than the Czech original, with a clean finish. It is among the most widely brewed beers in the world. Read our guide to [lager and imported beer](/blog/lager-vs-imported-beer-buyers-guide/) for context, or browse the [pilsner collection](' + PILSNER + ').',
        ],
      },
      {
        heading: 'What other German beer styles should you know?',
        paragraphs: [
          'Helles is a soft, malty pale lager from Munich. Dunkel is dark and bready, bock is strong and malty, and doppelbock is stronger still. Kölsch is a light, fruity beer from Cologne, and altbier is a copper-coloured beer from Düsseldorf.',
          'Each has regional traditions and a matching glass, so a German beer list is a good way to taste a range of flavours within a simple ingredient set.',
        ],
      },
      {
        heading: 'How do you pour a German wheat beer?',
        paragraphs: [
          'Wheat beer is traditionally served in a tall, curved glass that shows off the colour and holds the thick head. Tilt the glass and pour slowly until about three-quarters full, then swirl the last of the bottle to stir up the yeast and pour it in.',
          'Pouring this way releases the full flavour of an unfiltered wheat beer and builds a generous foam.',
        ],
      },
      {
        heading: 'What food goes with German beer?',
        paragraphs: [
          'Wheat beer suits breakfast dishes, sausages, pretzels, seafood and light salads. Pilsner works with fried foods, schnitzel, roast chicken and spicy dishes.',
          'Darker beers match roast pork and stews, and malty lagers go with bread, cheese and barbecue.',
        ],
      },
      {
        heading: 'How should you serve and store German beer?',
        paragraphs: [
          'Serve wheat beer at about 6 to 8 degrees Celsius and pilsner at about 4 to 7. Keep bottles upright in a cool, dark place and drink them fresh.',
          'Most German beers are made to be enjoyed within months, not years, so check the best-before date.',
        ],
      },
      {
        heading: 'How do you choose a German beer?',
        paragraphs: [
          'If you like fruity and smooth, choose a wheat beer. If you like crisp and bitter, choose a pilsner. If you like malty and warming, choose a bock or dunkel.',
          'See the current beers in our [German beer collection](' + GERMAN + ') and the wider [imported beer range](' + IMPORTED + '). We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What is German wheat beer?', answer: 'It is a top-fermented beer brewed with a large share of malted wheat, usually cloudy with banana and clove flavours from the yeast.' },
      { question: 'What is the Reinheitsgebot?', answer: 'It is the German beer purity law of 1516, which limited the ingredients to water, barley and hops, with yeast understood once it was known.' },
      { question: 'What is the difference between pilsner and lager?', answer: 'Pilsner is a type of pale lager, crisp and hoppy, that originated in Pilsen in 1842.' },
      { question: 'How do you serve weissbier?', answer: 'Serve it cold in a tall wheat beer glass, pouring slowly and swirling the last of the bottle to include the yeast.' },
      { question: 'Is German beer strong?', answer: 'Most German beers are around 4.5 to 5.5 percent ABV, while bocks and doppelbocks are stronger.' },
      { question: 'Where can I buy German beer online in Australia?', answer: 'You can buy German beer online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Reinheitsgebot', url: 'https://en.wikipedia.org/wiki/Reinheitsgebot' },
      { text: 'Wikipedia: Pilsner', url: 'https://en.wikipedia.org/wiki/Pilsner' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),

  newGuide({
    slug: 'irish-whiskey-guide-bushmills-redbreast-how-its-made',
    title: 'Irish Whiskey Guide: Bushmills, Redbreast and How Irish Whiskey Is Made',
    seoTitle: 'Irish Whiskey Guide: Bushmills, Redbreast and Styles',
    excerpt: 'What Irish whiskey is, how it is made, the four main styles, how it differs from Scotch and bourbon, and how to drink Bushmills and Redbreast.',
    category: 'Whisky Guide',
    image: '/images/blog/shared/whisky-pour.webp',
    primaryKeyword: 'irish whiskey',
    relatedSubcategory: 'irish-whiskey',
    lead: 'Irish whiskey is whiskey made in Ireland and matured in wooden casks for at least three years, known for a smooth, fruity and approachable style. This guide covers how it is made, the main styles, what makes Bushmills and Redbreast distinctive, how it differs from Scotch and bourbon, and how to drink it.',
    takeaways: [
      'Irish whiskey must be made in Ireland and matured in wooden casks for at least three years.',
      'The four main styles are single malt, single pot still, single grain and blended.',
      'Many Irish whiskeys are triple distilled, which contributes to a smooth, light character.',
      'Irish whiskey is spelled with an e; Scotch whisky is not.',
    ],
    sections: [
      {
        heading: 'What is Irish whiskey?',
        paragraphs: [
          'Irish whiskey is a grain spirit made on the island of Ireland, distilled and matured in wooden casks for at least three years. It is typically smooth, fruity and approachable, with less smoke than many Scotches.',
          'The category has grown rapidly worldwide and is a good starting point for people new to whiskey.',
        ],
        links: [{ text: 'Shop Irish whiskey', href: IRISH }],
      },
      {
        heading: 'How is Irish whiskey made?',
        paragraphs: [
          'Irish whiskey can be made from malted barley, unmalted barley and other cereals. Many distilleries triple distil their whiskey, which is common but not required, and the spirit is then matured in oak casks, often ex-bourbon and ex-sherry.',
          'Triple distillation tends to produce a lighter, smoother new-make spirit, which is one reason Irish whiskey is often described as easy to drink.',
        ],
      },
      {
        heading: 'What are the main styles of Irish whiskey?',
        paragraphs: [
          'Single malt is made from malted barley at a single distillery. Single pot still is a distinctively Irish style made from a mash of malted and unmalted barley in pot stills, with a rich, creamy, spicy character.',
          'Single grain is made from grains other than malted barley and is lighter, and blended whiskey combines styles for a smooth, balanced result. Most of the big-selling Irish whiskeys are blends.',
        ],
      },
      {
        heading: 'What is Bushmills known for?',
        paragraphs: [
          'Bushmills is a distillery in County Antrim, Northern Ireland, that holds a licence dating back to 1608 and is one of the best-known names in Irish whiskey. Its single malts are triple distilled and matured in a mix of casks, producing a smooth, fruity and honeyed whiskey.',
          'Bottlings range from a classic ten year old to older sherry-influenced expressions. Browse the range in our [Irish whiskey collection](' + IRISH + ').',
        ],
      },
      {
        heading: 'What is Redbreast known for?',
        paragraphs: [
          'Redbreast is a single pot still Irish whiskey from the Midleton distillery in County Cork, widely admired for its rich, spicy, fruity character with notes of dried fruit and toasted oak. It is often matured in sherry casks.',
          'It is a good example of the pot still style that sets Irish whiskey apart, and it is popular with drinkers who enjoy fuller, sherried whiskies.',
        ],
      },
      {
        heading: 'How is Irish whiskey different from Scotch?',
        paragraphs: [
          'Scotch is made in Scotland and is often made with peated malt, which gives smoke, though many Scotches are unpeated. Irish whiskey is usually unpeated, lighter and smoother, and the pot still style is unique to Ireland. Read our [Scotch whisky guide](/blog/single-malt-vs-blended-scotch/) for comparison.',
          'The spelling also differs: Irish and American makers write whiskey, while Scottish, Japanese, Canadian and Australian makers write whisky.',
        ],
      },
      {
        heading: 'How is Irish whiskey different from bourbon?',
        paragraphs: [
          'Bourbon is American whiskey made from at least 51 percent corn and aged in new charred oak, which gives vanilla and caramel sweetness. Irish whiskey uses barley and other grains, and is often aged in used casks, giving a softer, fruitier profile.',
          'Both are good in cocktails. See our [bourbon collection](' + BOURBON + ') for comparison.',
        ],
      },
      {
        heading: 'How do you drink Irish whiskey?',
        paragraphs: [
          'Enjoy Irish whiskey neat, over ice, with a splash of water, in a highball with soda or ginger ale, or in an Irish coffee. Its smooth style makes it forgiving for newcomers.',
          'Sip a pot still or an older single malt neat to appreciate the layers of fruit, spice and oak.',
        ],
      },
      {
        heading: 'How do you choose an Irish whiskey?',
        paragraphs: [
          'Decide whether you want a smooth blend for mixing, a single malt for sipping or a single pot still for richer flavours. Check the age statement, the cask type and the ABV.',
          'We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What is Irish whiskey?', answer: 'It is whiskey made in Ireland and matured in wooden casks for at least three years, known for a smooth, fruity style.' },
      { question: 'Is Irish whiskey smoother than Scotch?', answer: 'Many drinkers find it smoother and lighter, because it is usually unpeated and often triple distilled.' },
      { question: 'What is single pot still whiskey?', answer: 'It is a style unique to Ireland, made from a mash of malted and unmalted barley in pot stills, with a rich, spicy character.' },
      { question: 'Why is Irish whiskey spelled with an e?', answer: 'Irish and American makers traditionally write whiskey, while Scottish, Japanese, Canadian and Australian makers write whisky.' },
      { question: 'How should I drink Irish whiskey?', answer: 'Neat, over ice, with water, in a highball or in an Irish coffee are all good options.' },
      { question: 'Where can I buy Irish whiskey online in Australia?', answer: 'You can buy Irish whiskey online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Irish whiskey', url: 'https://en.wikipedia.org/wiki/Irish_whiskey' },
      { text: 'Wikipedia: Bushmills Distillery', url: 'https://en.wikipedia.org/wiki/Old_Bushmills_Distillery' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),

  newGuide({
    slug: 'champagne-rose-brut-guide-veuve-clicquot-krug',
    title: 'Champagne Rosé, Brut and the Houses: A Guide to Veuve Clicquot and Krug',
    seoTitle: 'Champagne Rosé, Brut and Houses: Veuve Clicquot, Krug',
    excerpt: 'Champagne explained: how it is made, what brut and rosé mean, how long it ages, and how to choose between houses such as Veuve Clicquot, Krug, Perrier-Jouët and Laurent-Perrier.',
    category: 'Wine Guide',
    image: '/images/blog/shared/gift-bottle.webp',
    primaryKeyword: 'champagne rose',
    relatedSubcategory: 'champagne',
    lead: 'Champagne rosé is one of the most celebratory bottles you can open, and understanding brut, vintage and the main Champagne houses helps you buy with confidence. This guide explains how Champagne is made, what the sweetness labels and rosé style mean, how long it ages and how houses such as Veuve Clicquot, Krug, Perrier-Jouët and Laurent-Perrier differ.',
    takeaways: [
      'Champagne is sparkling wine from the Champagne region of France, made by the traditional method with a second fermentation in the bottle.',
      'Brut is the most common dry style; rosé champagne gets its colour from red wine added to the blend or from brief skin contact.',
      'Non-vintage Champagne ages for at least 15 months and vintage Champagne for at least three years.',
      'Serve Champagne well chilled in a tulip glass, not a shallow coupe.',
    ],
    sections: [
      {
        heading: 'What is Champagne?',
        paragraphs: [
          'Champagne is a sparkling wine made in the Champagne region of north-eastern France. Only wine from this region that follows the appellation rules can be called Champagne, which is why other sparkling wines use different names.',
          'It is made mainly from Chardonnay, Pinot Noir and Pinot Meunier, and its bubbles come from a second fermentation inside the bottle.',
        ],
        links: [{ text: 'Shop Champagne', href: CHAMPAGNE }],
      },
      {
        heading: 'How is Champagne made?',
        paragraphs: [
          'A base wine is made, blended and bottled with yeast and sugar, which starts a second fermentation that creates carbon dioxide and the bubbles. The wine then rests on the yeast, which adds the brioche and toast notes Champagne is known for.',
          'After resting, the yeast is removed in a step called disgorgement and a small amount of sweetened wine, the dosage, is added to set the final sweetness.',
        ],
      },
      {
        heading: 'What do brut and the other sweetness labels mean?',
        paragraphs: [
          'Brut has up to 12 grams of sugar per litre and is the most common style. Extra brut and brut nature are drier still, while extra dry, sec, demi-sec and doux are progressively sweeter.',
          'For most occasions brut is the safe choice. Demi-sec suits dessert and fruit-based courses.',
        ],
      },
      {
        heading: 'What is champagne rosé?',
        paragraphs: [
          'Champagne rosé is pink Champagne. Most are made by adding a small amount of still red wine to the blend, which gives colour and red-berry flavours, while some are made by leaving the juice briefly on the grape skins.',
          'It tends to be fruitier and slightly richer than white Champagne, with notes of strawberry and raspberry. It is a favourite for celebrations and pairs well with salmon, duck and desserts.',
        ],
      },
      {
        heading: 'How long does Champagne age?',
        paragraphs: [
          'Non-vintage Champagne must age for at least 15 months before release, including at least 12 months on the yeast, and vintage Champagne must age for at least three years. Top cuvées often age much longer.',
          'This extended ageing is a major reason Champagne costs more than tank-method sparkling wines such as [prosecco](' + PROSECCO + ').',
        ],
      },
      {
        heading: 'How do the main Champagne houses differ?',
        paragraphs: [
          'Veuve Clicquot is known for a full-bodied, Pinot Noir-led style and its yellow label. Krug is famous for rich, complex, long-aged multi-vintage blends. Perrier-Jouët is associated with a floral, elegant, Chardonnay-led style, and Laurent-Perrier is known for freshness and its rosé.',
          'Treat these as broad impressions rather than rules. Compare bottles in our [Champagne collection](' + CHAMPAGNE + ') and the wider [sparkling wine range](' + SPARKLING + ').',
        ],
      },
      {
        heading: 'How is Champagne different from sparkling wine?',
        paragraphs: [
          'All Champagne is sparkling wine, but not all sparkling wine is Champagne. Sparkling wines made elsewhere may use the same traditional method or a tank method, and they are named by region or style. Our guide to [Champagne, sparkling wine and port](/blog/champagne-vs-sparkling-wine-vs-port/) explains the differences.',
          'Australian sparkling wines made in the traditional method can offer excellent value and similar complexity.',
        ],
      },
      {
        heading: 'How should you serve and store Champagne?',
        paragraphs: [
          'Serve Champagne at about 8 to 10 degrees Celsius in a tulip or white-wine glass, which concentrates the aromas better than a shallow coupe. Open the bottle gently by holding the cork and twisting the bottle.',
          'Store unopened bottles on their side in a cool, dark place. Once open, a sparkling wine stopper keeps it lively for a day or two.',
        ],
      },
      {
        heading: 'How do you choose a bottle of Champagne?',
        paragraphs: [
          'Decide on the occasion and the style, whether a brut non-vintage for everyday celebrations, a rosé for something special or a prestige bottle for a milestone. Check the house, the dosage and the vintage on the label.',
          'We deliver insured across Australia, and an adult (18+) must sign for every delivery.',
        ],
      },
    ],
    faqs: [
      { question: 'What does brut mean on Champagne?', answer: 'Brut means dry, with up to 12 grams of sugar per litre. It is the most common Champagne style.' },
      { question: 'How is champagne rosé made?', answer: 'Most is made by adding a little red wine to the blend, and some by leaving the juice briefly on the grape skins.' },
      { question: 'What grapes are used in Champagne?', answer: 'Mainly Chardonnay, Pinot Noir and Pinot Meunier.' },
      { question: 'How long does Champagne age before release?', answer: 'Non-vintage Champagne ages at least 15 months and vintage Champagne at least three years.' },
      { question: 'What glass should I use for Champagne?', answer: 'A tulip or white-wine glass is better than a shallow coupe, because it holds the aromas and the bubbles.' },
      { question: 'Where can I buy Champagne online in Australia?', answer: 'You can buy Champagne online from Doctors of Whisky with insured delivery across Australia. An adult (18+) must sign for every delivery.' },
    ],
    outbound: [
      { text: 'Wikipedia: Champagne', url: 'https://en.wikipedia.org/wiki/Champagne' },
      { text: 'Wikipedia: Sparkling wine', url: 'https://en.wikipedia.org/wiki/Sparkling_wine' },
      { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' },
    ],
  }),
];
