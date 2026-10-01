import type { BlogPost } from '@/lib/types';

const UPDATED = '2026-10-01';

/** Long-form guides, batch 4 (beer, non-alcoholic beer, cider, red wine, white wine). Keyword volumes / KD are from the keyword bank. */
export const BLOG_LONG_4: Record<string, Partial<BlogPost>> = {
  // lager beer 1000/17 · australian lager 1300/19 · imported beer 320/6 · beer flavours 2400/13
  'lager-vs-imported-beer-buyers-guide': {
    primaryKeyword: 'lager beer',
    secondaryKeywords: ['australian lager', 'imported beer', 'australian beer', 'beer flavours', 'flavoured beer', 'what beer is a lager', 'beer carton'],
    seoTitle: 'Lager Beer vs Imported Beer: A Buyer’s Guide',
    seoDescription: 'Lager beer vs imported beer explained: how lager is brewed, how it differs from ale, why freshness matters and which imported beers to buy in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'Lager is defined by bottom-fermenting yeast and cold conditioning, not by country.',
      'Imported beer covers many styles beyond lager, including pilsner, wheat beer, ale and stout.',
      'Freshness matters: check the best-before date and avoid beer that has been stored warm or in sunlight.',
      'Brown bottles and cans protect beer from light better than green or clear glass.',
    ],
    sections: [
      {
        heading: 'What is a lager?',
        paragraphs: [
          'Lager is a style of beer brewed with bottom-fermenting yeast at cool temperatures, then conditioned in cold storage for weeks (the word comes from the German for “to store”). The result is a clean, crisp, smooth beer without the fruity esters that warm-fermented ale yeasts produce.',
          'Most of the world’s beer is lager. It ranges from pale, light and refreshing pilsners and Australian lagers to darker, maltier Märzen and bock styles. If a bottle just says “lager”, expect a light-bodied, easy-drinking beer.',
        ],
      },
      {
        heading: 'What is the difference between lager and ale?',
        paragraphs: [
          'Ale uses top-fermenting yeast at warmer temperatures and tends to taste fruitier and more complex, as in pale ales, IPAs, stouts and wheat beers. Lager uses bottom-fermenting yeast at colder temperatures and tastes cleaner and crisper.',
          'Neither is better. Choose lager for hot weather, barbecues and food that needs a clean palate, and ale when you want more aroma and flavour.',
        ],
      },
      {
        heading: 'What counts as an imported beer?',
        paragraphs: [
          'Imported beer is any beer brewed overseas and shipped to Australia. It spans many styles. Italy’s Peroni Nastro Azzurro is a crisp pale lager, Mexico’s Modelo Especial and Corona are light, easy lagers, and Belgium’s Hoegaarden is a cloudy wheat beer spiced with coriander and orange peel.',
          'Imported lagers often taste a little different from Australian lagers because of local malt, hops and water. See our [imported beer collection](/shop/beer-premix-wine/collection/imported-beer/) for options, including [Peroni Nastro Azzurro](/shop/beer-premix-wine/peroni-nastro-6pack-imported-beer/) and [Hoegaarden](/shop/beer-premix-wine/hoegaarden-wheat-beer/).',
        ],
        links: [{ text: 'Shop imported beer', href: '/shop/beer-premix-wine/collection/imported-beer/' }],
      },
      {
        heading: 'Why does freshness matter so much?',
        paragraphs: [
          'Beer is not designed to age, and most lagers taste best within months of packaging. Heat speeds up staling, which gives a wet-cardboard flavour, and sunlight reacting with hops causes “lightstruck” beer with a skunky smell. Brown glass and cans offer the best protection, while clear and green bottles offer little.',
          'Check the best-before date, buy from sellers who store beer cool and keep cartons out of direct light at home. Refrigerate before serving, and do not repeatedly chill and warm the same bottles.',
        ],
      },
      {
        heading: 'What about flavoured beer?',
        paragraphs: [
          'Flavoured beers, such as lime, citrus and fruit-infused lagers, are a growing category. They are usually lighter and sweeter than a standard lager, and they are designed for warm days and casual drinking.',
          'If you like a lime wedge in your Corona, you will probably enjoy the style. Look at the ABV and sugar information on the label if you are watching either.',
        ],
      },
      {
        heading: 'How do you serve and store beer?',
        paragraphs: [
          'Serve lager cold, at around 3 to 5 degrees, in a clean glass to release aroma and keep the head. Wheat beers and ales taste better slightly warmer. Store unopened beer upright in a cool, dark place, and drink within the best-before date.',
          'Australian standard drinks are shown on every label. A 330 mL bottle at 5 per cent ABV is about 1.3 standard drinks.',
        ],
      },
      {
        heading: 'How do you choose between local and imported?',
        paragraphs: [
          'For everyday drinking and value, local lagers are fresh and cheap, with a strong Australian style of light, cold-served beer. For variety, imported beer lets you try styles that local brewers do not make as often, such as Czech pilsner or Belgian wheat beer.',
          'Browse our [lager collection](/shop/beer-premix-wine/collection/lager/) too. If you are looking for lighter options, read our guide to [non-alcoholic beer](/blog/why-non-alcoholic-beer-is-booming/), or explore [Australian craft cider](/blog/guide-to-australian-craft-cider/). Buyers must be 18 or over.',
        ],
        links: [{ text: 'Shop lager', href: '/shop/beer-premix-wine/collection/lager/' }],
      },
    ],
    faqs: [
      { question: 'What is lager beer?', answer: 'Lager is beer brewed with bottom-fermenting yeast at cool temperatures and conditioned cold. It tastes clean, crisp and smooth.' },
      { question: 'What is the difference between lager and ale?', answer: 'Ale uses top-fermenting yeast at warmer temperatures and tastes fruitier. Lager uses bottom-fermenting yeast at colder temperatures and tastes cleaner.' },
      { question: 'Is imported beer better than Australian beer?', answer: 'Not necessarily. Imported beer offers different styles, but local lagers are often fresher and better value.' },
      { question: 'Why does beer taste skunky?', answer: 'Skunky beer is “lightstruck”. Sunlight reacts with hop compounds, especially in clear or green bottles.' },
      { question: 'How cold should lager be served?', answer: 'Lager is best served at about 3 to 5 degrees Celsius in a clean glass.' },
      { question: 'How many standard drinks are in a bottle of beer?', answer: 'A 330 mL bottle at 5% ABV is about 1.3 standard drinks.' },
    ],
  },

  // alcohol free beer 880/11 · best non alcoholic beer australia 590/14 · zero alcohol beer 1600/25 · low carb zero alcohol beer 320/16
  'why-non-alcoholic-beer-is-booming': {
    primaryKeyword: 'alcohol free beer',
    secondaryKeywords: ['zero alcohol beer', 'best non alcoholic beer australia', 'best zero alcohol beer', 'non alcoholic beers', 'best alcohol free beer', 'low carb zero alcohol beer'],
    seoTitle: 'Alcohol Free Beer: Why It Is Booming and What to Buy',
    seoDescription: 'Alcohol free and zero alcohol beer explained: how it is made, how it tastes, what the labels mean in Australia and which non-alcoholic beers are worth buying.',
    updated: UPDATED,
    keyTakeaways: [
      'Alcohol free beer is made by brewing normally and removing the alcohol, or by limiting fermentation.',
      'In Australia, a beer labelled non-alcoholic contains no more than 0.5% ABV, and some are labelled 0.0%.',
      'Taste has improved dramatically, and the best options now rival regular lagers.',
      'Check the ABV on the label if you need zero alcohol, for example when driving, pregnant or avoiding alcohol.',
    ],
    sections: [
      {
        heading: 'Why is non-alcoholic beer booming?',
        paragraphs: [
          'More Australians are cutting back on alcohol for health, fitness and lifestyle reasons, and non-alcoholic beer lets them keep the ritual of a cold beer without the effects. Big brewers have also invested heavily, which has improved quality and brought the category into pubs, bars and supermarkets.',
          'It is also a sign of changing social habits. Having a non-alcoholic option at a barbecue, a work function or the football is normal, and it makes it easier to pace yourself or take the designated driver role.',
        ],
      },
      {
        heading: 'How is non-alcoholic beer made?',
        paragraphs: [
          'There are two main methods. In the first, brewers make a normal beer and then remove the alcohol using vacuum distillation or membrane filtration. In the second, they restrict fermentation so little alcohol forms, using special yeasts or low-temperature mashing.',
          'Dealcoholised beers tend to keep more flavour and body, while arrested-fermentation beers can taste sweeter and more worty. Modern brewers often combine methods and add hops to restore aroma.',
        ],
      },
      {
        heading: 'What do the labels mean in Australia?',
        paragraphs: [
          'You will see “non-alcoholic”, “alcohol free”, “zero alcohol” and “0.0%”. In Australia, a beer labelled non-alcoholic cannot contain more than 0.5 per cent alcohol by volume, and some brands go lower and label 0.0%. A beer at 0.5 per cent has traces of alcohol, similar to ripe fruit or bread.',
          'If you must avoid alcohol entirely, for example for health, religious or pregnancy reasons, look for 0.0% on the label or ask your doctor. Check the ABV rather than assuming.',
        ],
      },
      {
        heading: 'What does non-alcoholic beer taste like?',
        paragraphs: [
          'The best are now close to regular lager: clean, lightly bitter and refreshing. The main differences are slightly less body and a touch of sweetness. Colder temperatures and a good glass improve the experience.',
          'Try [Heineken Zero](/shop/beer-premix-wine/heineken-zero-cans-330ml-non-alcoholic-beer/) for a crisp lager style or [Clausthaler Original](/shop/beer-premix-wine/clausthaler-original-500ml/), a German brand that has specialised in alcohol-free beer for decades. See our [non-alcoholic beer collection](/shop/beer-premix-wine/collection/non-alcoholic-beer/).',
        ],
        links: [{ text: 'Shop non-alcoholic beer', href: '/shop/beer-premix-wine/collection/non-alcoholic-beer/' }],
      },
      {
        heading: 'Is non-alcoholic beer healthy?',
        paragraphs: [
          'It is lower in calories than most regular beers and has no meaningful alcohol, which helps if you are cutting back. Some brands are also low in carbohydrates. It is not a health food, though, so check labels for sugar and calories if those matter to you.',
          'Non-alcoholic beer is not suitable for everyone, so if you have a medical reason to avoid alcohol or are pregnant, speak to your doctor first.',
        ],
      },
      {
        heading: 'When is non-alcoholic beer the right choice?',
        paragraphs: [
          'It suits driving, training days, Dry July or Sober October, mid-week drinks and any occasion where you want a beer without the buzz. It also pairs with food in the same way as a regular lager.',
          'Many people alternate alcoholic and non-alcoholic drinks at a party, which keeps them hydrated and helps them track how much they have had. For comparison with regular beer, see our [lager vs imported beer guide](/blog/lager-vs-imported-beer-buyers-guide/).',
        ],
      },
      {
        heading: 'What should you look for when buying?',
        paragraphs: [
          'Check the production or best-before date, since freshness matters even more for low-alcohol beer. Choose a style you already like, such as lager, pale ale or wheat beer, and look at the ABV on the label.',
          'Buyers of alcohol must be 18 or over, and non-alcoholic beer is often sold alongside regular beer. Browse the range and compare sizes and pack formats.',
        ],
      },
    ],
    faqs: [
      { question: 'What is alcohol free beer?', answer: 'Alcohol free beer is beer made so that it contains no or almost no alcohol, either by removing alcohol after brewing or by limiting fermentation.' },
      { question: 'What is the difference between non-alcoholic and 0.0% beer?', answer: 'In Australia, non-alcoholic beer can contain up to 0.5% ABV, while 0.0% beer contains no measurable alcohol.' },
      { question: 'Does non-alcoholic beer taste like regular beer?', answer: 'The best do. Modern non-alcoholic lagers are crisp and refreshing, though they may have slightly less body than regular beer.' },
      { question: 'Can you drive after drinking non-alcoholic beer?', answer: 'Beer labelled 0.5% or below contains very little alcohol, but you should check the label and your own situation. 0.0% beer contains none.' },
      { question: 'Is non-alcoholic beer lower in calories?', answer: 'Usually yes, because alcohol contributes calories. Check the label for the specific beer.' },
      { question: 'What is the best non-alcoholic beer?', answer: 'It depends on taste. Heineken Zero and Clausthaler are popular, and trying a few styles is the best way to find a favourite.' },
    ],
  },

  // cider australia 2400/17 · pear cider 1300/14 · sydney cider 1000/12 · berry cider 260/10
  'guide-to-australian-craft-cider': {
    primaryKeyword: 'cider australia',
    secondaryKeywords: ['pear cider', 'sydney cider', 'berry cider', 'ciders', 'cider drink', 'cider beverage', 'what is cider made from'],
    seoTitle: 'Cider in Australia: Dry, Sweet and Craft Cider Guide',
    seoDescription: 'Cider in Australia explained: how cider is made, dry vs sweet styles, pear cider and perry, serving tips, food pairings and which ciders to buy.',
    updated: UPDATED,
    keyTakeaways: [
      'Cider is made by fermenting apple juice, and perry is the pear equivalent.',
      'Styles range from bone-dry and still to sweet, sparkling and fruit-flavoured.',
      'Most ciders are 4 to 8 per cent ABV and are gluten-free, but check the label.',
      'Serve cider cold or over ice, and match dry styles with pork, cheese and roast chicken.',
    ],
    sections: [
      {
        heading: 'What is cider made from?',
        paragraphs: [
          'Cider is made from fermented apple juice. Pear cider, known as perry, is made the same way from pears. Producers press the fruit, ferment the juice with yeast and sometimes blend or sweeten the result before bottling.',
          'The apple variety matters. Dessert apples make fresh, fruity ciders, while traditional cider apples with more tannin and acid make deeper, more complex ones. The best craft ciders balance sweetness, acidity and body in the same way that a good wine does.',
        ],
      },
      {
        heading: 'What cider styles are there?',
        paragraphs: [
          'Dry cider has little residual sugar and is crisp, tart and refreshing. Medium cider balances sweetness and acid, and sweet cider tastes like apple juice with a kick. Sparkling cider is carbonated, and still cider tastes closer to a light white wine.',
          'There are also fruit ciders, such as strawberry and lime, berry or pear. They are sweet, easy-drinking and popular in summer. Check the label for style and ABV, since two ciders at the same price can taste very different.',
        ],
      },
      {
        heading: 'Where does Australian cider come from?',
        paragraphs: [
          'Cool-climate apple regions drive Australian cider. Tasmania, the Adelaide Hills, Victoria’s high country and parts of New South Wales, including Batlow and Orange, grow apples well suited to cider. Local producers range from large brands to small craft makers who press their own fruit.',
          'The industry has grown quickly, with small cideries now operating in most states. Choosing local cider supports regional growers and gives you a fresher product.',
        ],
      },
      {
        heading: 'What is pear cider?',
        paragraphs: [
          'Pear cider, or perry, is lighter and more floral than apple cider, with gentle sweetness and a soft texture. It is popular as a refreshing summer drink and as an alternative for people who find apple cider too sharp.',
          'Many mass-market “pear ciders” are made from concentrate and sweetened, while craft perry uses real perry pears and can be dry and complex. Read the label to find out which you are buying.',
        ],
      },
      {
        heading: 'Which ciders should you try?',
        paragraphs: [
          'Start with a dry cider if you want to see the apple character. [Mercury Dry Cider](/shop/beer-premix-wine/mercury-dry-cider-bottles/) is a crisp style, and [Somersby Apple Cider](/shop/beer-premix-wine/somersby-apple-cider-bottles/) is a popular, sweeter option. For fruit-forward drinks, try [Little Fat Lamb Strawberry Lime](/shop/beer-premix-wine/little-fat-lamb-strawberry-lime-cider/).',
          'See the full [cider collection](/shop/beer-premix-wine/collection/cider/) to compare styles.',
        ],
        links: [{ text: 'Shop cider', href: '/shop/beer-premix-wine/collection/cider/' }],
      },
      {
        heading: 'What food goes with cider?',
        paragraphs: [
          'Dry cider’s acidity cuts through rich food, so it pairs well with roast pork, sausages, cheese, charcuterie and fried food. Sweeter ciders suit spicy dishes and desserts such as apple pie. Fruit ciders are good with barbecue and light salads.',
          'Serve cider cold in a tall glass or over ice. For something different, mix it with a splash of bourbon or a squeeze of lemon.',
        ],
      },
      {
        heading: 'How much alcohol is in cider?',
        paragraphs: [
          'Most cider sits between 4 and 8 per cent ABV, with the standard range around 4.5 to 5.5. A 330 mL bottle at 5 per cent contains about 1.3 standard drinks. Craft and still ciders can be stronger.',
          'Cider is generally gluten-free, since it is made from fruit, but check the label if you have coeliac disease. For more drinks that suit warm days, see our guide to [rosé wine](/blog/everything-about-rose-wine/) and [ready-to-drink premixes](/blog/ready-to-drink-premix-trend/). Buyers must be 18 or over.',
        ],
      },
    ],
    faqs: [
      { question: 'What is cider made from?', answer: 'Cider is made from fermented apple juice. Pear cider, or perry, is made from fermented pears.' },
      { question: 'What is the difference between dry and sweet cider?', answer: 'Dry cider has little residual sugar and tastes crisp and tart, while sweet cider retains more sugar and tastes like apple juice.' },
      { question: 'Is cider gluten-free?', answer: 'Cider is usually gluten-free because it is made from fruit, but you should check the label if you have coeliac disease.' },
      { question: 'How much alcohol is in cider?', answer: 'Most cider is between 4 and 8% ABV. A 330 mL bottle at 5% contains about 1.3 standard drinks.' },
      { question: 'What is perry?', answer: 'Perry is cider made from pears rather than apples. It is lighter, more floral and often gently sweet.' },
      { question: 'How should cider be served?', answer: 'Cider is best served cold in a tall glass or over ice. Dry styles pair well with pork, cheese and fried food.' },
    ],
  },

  // shiraz wine 2900/24 · cabernet sauvignon wine 1000/17 · malbec red wine 720/14 · australian red wine 880/19
  'how-to-choose-red-wine': {
    primaryKeyword: 'shiraz wine',
    secondaryKeywords: ['cabernet sauvignon wine', 'malbec red wine', 'cab sav wine', 'australian red wine', 'red wine varieties', 'sweet red wine australia', 'is shiraz a sweet or dry wine', 'what is a good red wine to drink'],
    seoTitle: 'How to Choose Red Wine: Shiraz, Cabernet, Merlot Guide',
    seoDescription: 'How to choose red wine: understand body and tannin, compare Shiraz, Cabernet Sauvignon, Merlot and Malbec, and learn how to read an Australian wine label.',
    updated: UPDATED,
    keyTakeaways: [
      'Choose red wine by body (light, medium, full) and tannin (the drying sensation) first, then by grape.',
      'Shiraz is Australia’s signature red, bold and fruity and almost always dry, not sweet.',
      'Cabernet Sauvignon is structured and tannic, Merlot is softer and Malbec is plush and dark.',
      'Serve most reds slightly below room temperature, around 16 to 18 degrees.',
    ],
    sections: [
      {
        heading: 'How do you choose a red wine?',
        paragraphs: [
          'Start with body, which describes how heavy the wine feels. Light reds such as Pinot Noir feel delicate, medium reds such as Merlot are balanced, and full-bodied reds such as Shiraz and Cabernet Sauvignon feel rich and powerful. Then consider tannin, the drying grip from grape skins and oak. Low-tannin reds feel soft, and high-tannin reds feel firm.',
          'Match the wine to the occasion. A light or medium red suits relaxed meals, while a full-bodied red suits grilled meat, hearty stews and long dinners. If you are unsure, choose a medium-bodied red with soft tannins.',
        ],
      },
      {
        heading: 'Is Shiraz sweet or dry?',
        paragraphs: [
          'Shiraz is dry. The fruit flavours, such as blackberry, plum and sometimes chocolate, can taste sweet, but the wine usually has little residual sugar. Syrah is the same grape, usually in a more peppery, savoury, cooler-climate style.',
          'Barossa Valley and McLaren Vale produce big, ripe, concentrated Shiraz, while cooler regions such as the Yarra Valley and Canberra make more elegant, spicy examples. Browse our [red wine collection](/shop/beer-premix-wine/collection/red-wine/) for Australian options, including [Penfolds Grange 2018](/shop/beer-premix-wine/penfolds-grange-2018-shiraz-australian-icon/), the country’s most famous Shiraz.',
        ],
        links: [{ text: 'Shop red wine', href: '/shop/beer-premix-wine/collection/red-wine/' }],
      },
      {
        heading: 'What does Cabernet Sauvignon taste like?',
        paragraphs: [
          'Cabernet Sauvignon is full-bodied and structured, with blackcurrant, cedar and sometimes mint or capsicum notes, and firm tannins. Coonawarra and Margaret River are the Australian benchmarks. The wine often ages well, and it is the classic partner for steak and lamb.',
          'Try the [Alexander Hill Cab Sav](/shop/beer-premix-wine/alexander-hill-cab-sav-red-wine/) if you want a Cabernet at an approachable price.',
        ],
      },
      {
        heading: 'What is Merlot and Malbec like?',
        paragraphs: [
          'Merlot is softer and plumper than Cabernet, with red plum, cherry and chocolate and gentler tannins. It is a good all-rounder and a good place to start if you are new to red wine. See [Alexander Hill Merlot](/shop/beer-premix-wine/alexanderhill-merlot-red-wine/).',
          'Malbec, from Argentina and increasingly Australia, is dark and juicy with blackberry, violet and a velvety texture. It pairs well with barbecued meat.',
        ],
      },
      {
        heading: 'Is there a sweet red wine?',
        paragraphs: [
          'Yes, though most red wine is dry. Lambrusco, a lightly sparkling Italian red, is often off-dry and is easy to drink. Port and other fortified wines are sweet, and some Australian reds labelled “sweet red” are blended with a touch of sugar.',
          'If you prefer a sweeter style, look for the words “off-dry”, “semi-sweet” or “sweet” on the label, and ask for fruit-forward wines. You will find [Don Camillo Lambrusco](/shop/beer-premix-wine/doncamillo-lambrusco-red-red-wine/) in our range.',
        ],
      },
      {
        heading: 'How do you read an Australian wine label?',
        paragraphs: [
          'The label shows the producer, the grape variety, the vintage (year) and the region. Under Australian labelling rules, if a variety, region or vintage is stated, at least 85 per cent of the wine must come from that variety, region or year. “Blend” or multiple varieties, such as Shiraz Cabernet, list the main grape first.',
          'The ABV, standard drinks and allergen statements, such as sulphites, also appear. Wines labelled “South Eastern Australia” come from a broad region, while specific regions such as Barossa Valley signal more place-specific character.',
        ],
      },
      {
        heading: 'How should you serve and store red wine?',
        paragraphs: [
          'Serve most red wine at 16 to 18 degrees, slightly cooler than a warm room. In summer, chill it briefly. Open full-bodied reds 30 to 60 minutes before serving, or decant to soften tannins.',
          'Store bottles on their side in a cool, dark place at a stable temperature. For a bottle to give as a gift, look for a recognised producer and a gift box. If you plan to cellar wine, our [whisky storage guide](/blog/how-to-store-and-cellar-rare-whisky/) covers many of the same principles. Buyers must be 18 or over.',
        ],
      },
    ],
    faqs: [
      { question: 'Is Shiraz a sweet or dry wine?', answer: 'Shiraz is a dry wine. It tastes fruity and rich, but it usually contains little residual sugar.' },
      { question: 'What is the difference between Shiraz and Cabernet Sauvignon?', answer: 'Shiraz is fruity, spicy and plush, while Cabernet Sauvignon is more structured and tannic, with blackcurrant and cedar notes.' },
      { question: 'What is a good red wine for beginners?', answer: 'Merlot and soft Shiraz are good starting points because they have approachable fruit flavours and gentle tannins.' },
      { question: 'Is there a sweet red wine?', answer: 'Yes. Lambrusco and fortified wines such as Port are sweeter, though most red wine is dry.' },
      { question: 'What temperature should red wine be served?', answer: 'Most red wine is best served at about 16 to 18 degrees Celsius, slightly below room temperature.' },
      { question: 'Do I need to decant red wine?', answer: 'Full-bodied or young red wines benefit from decanting or breathing for 30 to 60 minutes, but it is not essential for light or mature wines.' },
    ],
  },

  // sauvignon blanc 8100/21 · dry white wine 3600/14 · sweet white wine 1300/12 · chardonnay wine 1600/27 · types of white wines to drink 1600/17
  'white-wine-styles-explained': {
    primaryKeyword: 'sauvignon blanc',
    secondaryKeywords: ['dry white wine', 'sweet white wine', 'chardonnay wine', 'types of white wines to drink', 'best white wine', 'sauvignon blanc wine', 'whats a dry white wine'],
    seoTitle: 'Sauvignon Blanc, Chardonnay and Riesling: White Wine Guide',
    seoDescription: 'White wine styles explained: Sauvignon Blanc, Chardonnay, Riesling and Pinot Grigio, what dry and sweet mean, food pairings and how to serve white wine.',
    updated: UPDATED,
    keyTakeaways: [
      'White wine style depends on grape, climate and winemaking, especially oak and sweetness.',
      'Sauvignon Blanc is zesty and herbal, Chardonnay ranges from lean to buttery, and Riesling is aromatic with high acidity.',
      'Dry means little sugar, sweet means noticeable sugar, and acidity can make a wine taste drier or sweeter than it is.',
      'Serve white wine cold, around 7 to 10 degrees, but not so cold that flavour is muted.',
    ],
    sections: [
      {
        heading: 'What are the main types of white wine?',
        paragraphs: [
          'The most popular white grapes in Australia are Sauvignon Blanc, Chardonnay, Riesling, Pinot Gris/Grigio and Semillon. Each gives a distinct style. Sauvignon Blanc is zesty and herbaceous, Chardonnay is richer and rounder, Riesling is floral and crisp, Pinot Grigio is light and neutral, and Semillon can be lean when young and honeyed when aged.',
          'Aromatic styles such as Gewürztraminer and Viognier are more perfumed and often a little fuller. Choose by the flavour you want rather than the name alone.',
        ],
      },
      {
        heading: 'What does Sauvignon Blanc taste like?',
        paragraphs: [
          'Sauvignon Blanc is crisp and refreshing, with flavours of citrus, passionfruit, gooseberry and freshly cut grass. It is usually fermented in stainless steel without oak, which preserves its zest. Marlborough in New Zealand made the style famous, and the Adelaide Hills and Margaret River produce excellent Australian versions.',
          'See the [white wine collection](/shop/beer-premix-wine/collection/white-wine/) and try [Alexander Hill Sauvignon Blanc](/shop/beer-premix-wine/balexanderhill-savblanccopy-white-wine/) or [Charlotte’s Inlet Sav Blanc](/shop/beer-premix-wine/charlottes-inlet-sav-blanc-white-wine/).',
        ],
        links: [{ text: 'Shop white wine', href: '/shop/beer-premix-wine/collection/white-wine/' }],
      },
      {
        heading: 'What does Chardonnay taste like?',
        paragraphs: [
          'Chardonnay is the most versatile white grape. Unoaked or lightly oaked versions taste of citrus, green apple and stone fruit, while barrel-fermented, malolactic Chardonnay is richer, with butter, toast and cream. Cool-climate regions such as the Yarra Valley, Adelaide Hills and Margaret River make elegant styles.',
          'Compare [Alexander Hill Chardonnay](/shop/beer-premix-wine/alexanderhill-chardonnay-white-wine/) with [Betty & Max Chardonnay](/shop/beer-premix-wine/betty-max-chardonnay-white-wine/) to taste how style varies.',
        ],
      },
      {
        heading: 'What does Riesling taste like?',
        paragraphs: [
          'Riesling is high in acidity and floral, with lime, green apple and mineral notes. Australian Rieslings from the Clare and Eden Valleys are typically dry and age beautifully, developing toast and kerosene-like complexity. Others, especially German-style Rieslings, can be off-dry or sweet.',
          'For a dry, citrusy example, try [Sail the High Seas Riesling](/shop/beer-premix-wine/sail-the-high-seas-riesling-white-wine/) or [Jacob’s Creek Riesling](/shop/beer-premix-wine/jacobs-creek-riesling-case-white-wine/).',
        ],
      },
      {
        heading: 'What does dry white wine mean?',
        paragraphs: [
          'Dry means the wine has little or no residual sugar, so it does not taste sweet. Most Sauvignon Blanc, Pinot Grigio, Chardonnay and Australian Riesling are dry. If you want a dry white wine for cooking or sipping, any of these will work.',
          'Sweet white wine has noticeable sugar, such as Moscato, late-harvest Riesling and Sauternes. Acidity matters here: a high-acid wine with a touch of sugar can taste dry, and a low-acid wine can taste sweeter than it is. The label sometimes indicates sweetness, and staff or tasting notes can help.',
        ],
      },
      {
        heading: 'What food goes with white wine?',
        paragraphs: [
          'Match weight and acidity. Crisp Sauvignon Blanc suits salads, goat’s cheese, oysters and Thai food. Oaked Chardonnay suits roast chicken, creamy pasta and lobster. Riesling pairs with spicy Asian food and pork. Pinot Grigio is a flexible match for light seafood and antipasto.',
          'As a rule, the richer the dish, the fuller the wine, and the spicier the dish, the more a touch of sweetness helps.',
        ],
      },
      {
        heading: 'How should you serve and store white wine?',
        paragraphs: [
          'Serve light, crisp whites at 7 to 9 degrees and fuller whites such as Chardonnay at 10 to 12. Taking the bottle out of the fridge 10 minutes before pouring lets flavours open up. Use a clean glass with a slightly narrow rim to concentrate aroma.',
          'Store unopened bottles in a cool, dark place on their side if cork-sealed. Once opened, reseal and refrigerate, and drink within a few days. For other chilled, refreshing drinks, see our guide to [rosé wine](/blog/everything-about-rose-wine/) and [Champagne, sparkling wine and port](/blog/champagne-vs-sparkling-wine-vs-port/). Buyers must be 18 or over.',
        ],
      },
    ],
    faqs: [
      { question: 'What is a dry white wine?', answer: 'A dry white wine has little or no residual sugar. Sauvignon Blanc, Chardonnay and Pinot Grigio are usually dry.' },
      { question: 'What is the difference between Sauvignon Blanc and Chardonnay?', answer: 'Sauvignon Blanc is crisp, zesty and herbaceous, while Chardonnay is rounder and can range from lean to buttery depending on oak.' },
      { question: 'Is Riesling sweet?', answer: 'Not always. Many Australian Rieslings are dry, though some styles, especially German-style, can be off-dry or sweet.' },
      { question: 'What temperature should white wine be served?', answer: 'Crisp whites are best at 7 to 9 degrees, and fuller whites such as Chardonnay at 10 to 12 degrees Celsius.' },
      { question: 'What white wine is best for beginners?', answer: 'Sauvignon Blanc and Pinot Grigio are good starting points because they are fresh, light and easy to drink.' },
      { question: 'How long does opened white wine last?', answer: 'Opened white wine lasts about three to five days if resealed and refrigerated, though it is best within a couple of days.' },
    ],
  },
};
