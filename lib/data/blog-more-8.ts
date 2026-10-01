import type { BlogPost } from '@/lib/types';

type Sections = NonNullable<BlogPost['sections']>;

/** Final sections (amaro, liqueurs, soju, beer, cider, wine). */
export const BLOG_MORE_8: Record<string, Sections> = {
  'amaro-101-italy-bittersweet-tradition': [
    {
      heading: 'How do you build an amaro collection?',
      paragraphs: [
        'Start with one light, one medium and one dark amaro, so you can sip, mix and compare. A light bottle such as Montenegro suits spritzes and aperitivo drinks, a medium one such as Lucano suits after-dinner sipping, and a darker, more bitter bottle such as Amaro del Capo or Averna suits cocktails and cold-weather drinking.',
        'Then add a Chartreuse or a herbal liqueur for variety. Keep a bottle of sweet vermouth and some orange peel, since they pair with almost every amaro.',
        'Amaro is also a good gift, because most people have not tried more than one or two. Add a note suggesting a serve, such as over ice with orange, and you have an easy, memorable present.',
      ],
    },
  ],
  'best-cream-coffee-liqueurs-for-cocktails': [
    {
      heading: 'How do you build the perfect espresso martini at home?',
      paragraphs: [
        'Chill a coupe or martini glass. Brew a fresh double espresso and let it cool slightly. Add 45 mL vodka, 30 mL coffee liqueur and the espresso to a shaker with plenty of ice, and shake hard for about 15 seconds. Double-strain into the glass and garnish with three coffee beans.',
        'The key is fresh coffee, a hard shake and good ice. If the foam is thin, shake longer. If the drink is too sweet, reduce the liqueur or add a little more espresso. A pinch of salt can lift the flavour.',
        'You can prepare a batch ahead: mix vodka and liqueur in a bottle, chill it and add fresh espresso for each serve.',
      ],
    },
    {
      heading: 'What is the best glassware and serve size?',
      paragraphs: [
        'Use a chilled coupe or martini glass for espresso martinis and a short tumbler for White Russians and Mudslides. Pour 30 mL of liqueur for a standard serve, and use plenty of ice for drinks served on the rocks.',
        'Cream liqueurs are rich, so small servings are often enough. For after-dinner drinks, serve in a small glass with a few cubes. Remember to count standard drinks, as sweet drinks are easy to over-drink.',
      ],
    },
  ],
  'soju-explained-koreas-spirit': [
    {
      heading: 'How should you store and open soju?',
      paragraphs: [
        'Unopened soju can be stored at room temperature in a cool, dark place, but it tastes best chilled. Refrigerate or freeze the bottle for an hour before serving. Once opened, keep it sealed and in the fridge, and finish it within a few weeks, since flavoured soju in particular can lose freshness.',
        'In Korea, the traditional way to open a bottle is to give it a firm flick or shake to create a small whirlpool and then twist the cap. It is a fun ritual to share.',
      ],
    },
    {
      heading: 'What is the history of soju?',
      paragraphs: [
        'Soju has been made in Korea for centuries, with distillation techniques thought to have arrived in the 13th century. A government ban on using rice for alcohol in the 1960s, caused by food shortages, pushed producers towards diluted spirits made from other starches, which is why modern green-bottle soju tastes different from traditional versions.',
        'In recent years there has been a revival of traditional rice soju, and premium bottles are made with the same care as other craft spirits. If you want to taste the older style, look for pot-still rice soju, such as [Ilpoom Jinro 1924](/shop/other/ilpoom-jinro-1924-heritage-premium-soju/).',
      ],
    },
  ],
  'lager-vs-imported-beer-buyers-guide': [
    {
      heading: 'How do you build a mixed case of beer?',
      paragraphs: [
        'Choose a base lager for everyday drinking, add one or two imported styles you want to try, and include a non-alcoholic option for guests who prefer it. For a party, a mix of light lager, a wheat beer and a pale ale covers most tastes.',
        'Check best-before dates and buy in quantities you can drink within a few months. If you buy by the carton, store it upright in a cool place, and move a few bottles into the fridge at a time.',
      ],
    },
    {
      heading: 'How do you pour and taste a beer properly?',
      paragraphs: [
        'Use a clean glass, tilt it 45 degrees and pour down the side, then straighten as it fills to build a one to two finger head. The head traps aroma and keeps the beer fresh. Smell the beer before drinking, noticing hops, malt and yeast character.',
        'Take a small sip and let it roll across your tongue. Note the bitterness, sweetness, body and finish. Comparing a lager and an imported beer side by side is the quickest way to learn the difference. For beer without the alcohol, see our [non-alcoholic beer guide](/blog/why-non-alcoholic-beer-is-booming/).',
      ],
    },
  ],
  'why-non-alcoholic-beer-is-booming': [
    {
      heading: 'How do non-alcoholic styles differ?',
      paragraphs: [
        'Non-alcoholic lagers are the most common and the easiest to enjoy. Non-alcoholic wheat beers and pale ales have more flavour but are less widely available. Some brands also offer non-alcoholic stouts, and the choice grows every year.',
        'Because the alcohol is removed or limited, body can be thinner, which brewers offset with extra malt, hops and carbonation. If one style does not suit you, try another, since each brewer’s approach is different.',
      ],
    },
    {
      heading: 'How should you shop for non-alcoholic beer online?',
      paragraphs: [
        'Check the product name, the ABV on the label and the pack size. Beware of listings that mix up regular and alcohol-free versions of the same brand, because labels can look alike. If a product page does not clearly state the ABV, ask before buying.',
        'Choose reputable retailers and confirm the best-before date. Cases of 24 are good value if you plan to drink it regularly, while single packs suit trials. Buyers of alcohol must be 18 or over, and ID may be checked on delivery.',
      ],
    },
  ],
  'guide-to-australian-craft-cider': [
    {
      heading: 'How do you choose a cider for different occasions?',
      paragraphs: [
        'For a barbecue or hot day, choose a crisp, dry or fruit-flavoured cider served over ice. For a roast dinner or cheese platter, pick a dry, complex cider with some tannin. For a celebration, try a sparkling cider in a flute, and for dessert, a sweeter cider or perry.',
        'If you are new to cider, start with a medium style and move towards dry or traditional as your palate develops. Compare labels for ABV and sweetness, and read tasting notes.',
      ],
    },
    {
      heading: 'How should you store and serve cider?',
      paragraphs: [
        'Store cider upright in a cool, dark place, and drink it within the best-before date. Serve it cold, at about 4 to 8 degrees, in a tall glass or over ice. Bottle-conditioned ciders may have sediment, so pour gently.',
        'Pair with food using the same logic as wine: dry cider with rich dishes, sweeter cider with spicy food or dessert. Ciders also keep well in a cooler for outdoor events, making them easy party drinks.',
      ],
    },
  ],
  'how-to-choose-red-wine': [
    {
      heading: 'How do you build a small red wine collection?',
      paragraphs: [
        'Start with one light, one medium and one full-bodied red, such as Pinot Noir, Merlot and Shiraz, so you have a bottle for most meals. Add a Cabernet Sauvignon for steak nights, and a special bottle for celebrations.',
        'Store wine on its side in a cool, dark place at a steady temperature. You do not need a cellar: a cupboard away from heat works for wines you will drink within a year. Buy by the case if you find a wine you like, since bulk buying is often cheaper. Keep a note of what you drink and enjoy, which helps you buy better next time.',
      ],
    },
  ],
  'white-wine-styles-explained': [
    {
      heading: 'How do you choose white wine for different occasions?',
      paragraphs: [
        'For a barbecue or summer lunch, choose a crisp Sauvignon Blanc or Pinot Grigio. For a roast chicken dinner, an oaked Chardonnay works well. For spicy Asian food, a dry or off-dry Riesling is a better choice, and for a celebration a sparkling wine suits.',
        'If you are buying for a group, choose a crowd-pleasing style such as Sauvignon Blanc and offer a second option. Buy a few extra bottles, because white wine goes quickly, and chill them in advance. For a gift, a well-known producer and attractive packaging make a good impression.',
      ],
    },
  ],
  'everything-about-rose-wine': [
    {
      heading: 'How do you pair rosé with food in more detail?',
      paragraphs: [
        'Pale, dry rosé suits seafood salads, grilled prawns, Niçoise salad and goat’s cheese. Medium-bodied rosé suits barbecued chicken, pork and Mediterranean vegetables. Darker, fruitier rosé suits pizza, burgers and lightly spiced dishes. Sparkling rosé is excellent with canapés, sushi and fried food.',
        'Because rosé combines the freshness of white wine with some red-wine structure, it is a safe choice when guests are eating different dishes. If you want a more refreshing, lower-alcohol option, try a rosé spritz. For other summer drinks, see [Australian craft cider](/blog/guide-to-australian-craft-cider/).',
      ],
    },
  ],
  'champagne-vs-sparkling-wine-vs-port': [
    {
      heading: 'How do you choose between Champagne, sparkling wine and Prosecco?',
      paragraphs: [
        'Choose Champagne for milestones, gifts and when you want the prestige and complexity of long-aged wine. Choose Australian or other traditional-method sparkling for similar style at a lower price. Choose Prosecco for brunch, spritzes and casual parties where fresh, fruity bubbles are the aim.',
        'Check the sweetness level (Brut for dry, Extra Dry for slightly sweeter) and whether it is vintage or non-vintage. Buy a few bottles in advance, chill them in the fridge for several hours, and keep one in reserve. Buyers must be 18 or over.',
      ],
    },
  ],
};
