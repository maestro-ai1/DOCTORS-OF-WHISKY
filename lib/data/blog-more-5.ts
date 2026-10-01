import type { BlogPost } from '@/lib/types';

type Sections = NonNullable<BlogPost['sections']>;

/** Extra sections appended after the main guide sections (rosé, sparkling and port, premix, seltzers, mixers). */
export const BLOG_MORE_5: Record<string, Sections> = {
  'everything-about-rose-wine': [
    {
      heading: 'Which regions are famous for rosé?',
      paragraphs: [
        'Provence in France is the benchmark for pale, dry rosé from Grenache, Cinsault and Syrah. Tavel, in the Rhône Valley, makes deeper, fuller rosé. Spain produces rosado, often from Garnacha in Navarra, and Italy’s rosato ranges from light to robust.',
        'In Australia, McLaren Vale, the Barossa and Victorian regions make rosé from Grenache, Shiraz, Sangiovese and other grapes. Each region shows a different style, from delicate and savoury to bold and fruity.',
      ],
    },
    {
      heading: 'How do you make rosé drinks for summer?',
      paragraphs: [
        'A rosé spritz is simple: rosé, soda water and ice, with berries or a slice of citrus. Frosé is frozen rosé blended into a slushy. Sangria rosada uses rosé, brandy, fruit and a splash of lemonade, and a rosé and lemonade jug suits parties.',
        'Use a dry, crisp rosé for mixed drinks, and keep the expensive bottles for sipping. For more refreshing ideas, see our guide to [ready-to-drink premixes](/blog/ready-to-drink-premix-trend/).',
      ],
    },
    {
      heading: 'What are the common rosé myths?',
      paragraphs: [
        'Rosé is not just for summer: it suits food year-round. Rosé is not always sweet: many of the best are bone-dry. Rosé is not made by mixing red and white wine in most regions. And darker colour does not mean sweeter or lower quality: it reflects grape variety and skin contact.',
        'Finally, not all rosé should be drunk young. Some richer rosés, and sparkling rosé Champagne, can age for years.',
      ],
    },
  ],
  'champagne-vs-sparkling-wine-vs-port': [
    {
      heading: 'What are the Champagne styles and grapes?',
      paragraphs: [
        'Blanc de Blancs is made only from Chardonnay and tastes crisp and elegant. Blanc de Noirs is made from Pinot Noir and Pinot Meunier and is fuller and richer. Rosé Champagne adds red wine or uses skin contact. Non-vintage is a blend of years for a consistent house style, while vintage Champagne comes from a single year.',
        'Prestige cuvées such as Dom Pérignon are made only from the best grapes in top years. Our [sparkling wine collection](/shop/beer-premix-wine/collection/sparkling/) includes several of these styles.',
      ],
    },
    {
      heading: 'How do you open and serve sparkling wine safely?',
      paragraphs: [
        'Chill the bottle to 6 to 8 degrees. Remove the foil and loosen the cage while keeping a thumb over the cork. Hold the bottle at 45 degrees, twist the bottle (not the cork) and ease the cork out so it sighs rather than pops. Pour in two stages to control the foam.',
        'Never point the bottle at anyone, and never use a knife to open it unless you know how. Serve in tulip glasses, which keep the bubbles and aromas better than wide coupes.',
      ],
    },
    {
      heading: 'What are the best sparkling cocktails, and how do you serve Port?',
      paragraphs: [
        'A Mimosa is sparkling wine and orange juice, a Kir Royale adds crème de cassis, and a French 75 combines gin, lemon, sugar and Champagne. A Bellini uses peach purée and Prosecco.',
        'Port is served in small glasses after dinner. Serve tawny slightly cool and ruby at room temperature, and decant vintage Port to remove sediment. Opened tawny and ruby Port keep for weeks to a few months, so follow the label’s storage advice and keep the bottle sealed.',
      ],
    },
  ],
  'ready-to-drink-premix-trend': [
    {
      heading: 'How many drinks should you buy for a party?',
      paragraphs: [
        'A common planning guide is about one and a half drinks per guest in the first hour and one drink an hour after that, though it varies with the event. Include non-alcoholic options, water and food, and avoid pushing guests to drink more than they want.',
        'Cases of 24 cans are convenient for large gatherings. Keep cans chilled in a cooler with ice, and check the standard drinks per can so you know what you are serving.',
      ],
    },
    {
      heading: 'What should you read on a premix can?',
      paragraphs: [
        'Look at ABV, the number of standard drinks, the sugar per 100 mL, the energy in kilojoules and the best-before date. Ingredients are listed in order of weight. A product with real spirit, carbonated water and natural flavour is generally a better choice than one dominated by sugar and artificial flavours.',
        'If you want to avoid sweeteners or sugar, check the panel rather than the front of the can. Compare two flavours of the same brand, since they can differ.',
      ],
    },
    {
      heading: 'How can you serve alcohol responsibly at home?',
      paragraphs: [
        'In Australia, anyone serving alcohol commercially must complete Responsible Service of Alcohol training, and the same principles help at home. Serve food, offer water and non-alcoholic drinks, never serve people who are intoxicated and make sure nobody drives after drinking.',
        'Premix is easy to drink quickly because it is cold and sweet. Encourage guests to pace themselves, and keep taxis or a designated driver in mind. Buyers must be 18 or over.',
      ],
    },
  ],
  'rise-of-zero-sugar-seltzers': [
    {
      heading: 'How do seltzers compare with light beer, premix and wine?',
      paragraphs: [
        'Seltzers are usually lighter, cleaner and lower in sugar than traditional premix, and they have less flavour than beer or wine. Light beer is similar in alcohol but has a malty taste, while wine contains more alcohol per serve and more complexity.',
        'Seltzers are a good fit for people who want something refreshing and simple. If you want more flavour, a spirit and soda or a spritz made at home gives you more control.',
      ],
    },
    {
      heading: 'How do you read the nutrition panel?',
      paragraphs: [
        'Australian labels show energy in kilojoules (kJ) and sugars in grams, both per serve and per 100 mL. Compare the “per 100 mL” columns to fairly compare cans of different sizes. A drink with 0 g sugar per 100 mL has no sugars, while one with a small amount may still be described as low sugar.',
        'Remember that alcohol itself contains energy, so a zero-sugar seltzer still has kilojoules. Count standard drinks as well as sugar.',
      ],
    },
    {
      heading: 'What are the best ways to serve seltzers?',
      paragraphs: [
        'Serve very cold in the can or pour over ice in a tall glass, and add a slice of lime, lemon or fresh berries. You can also use fruit-flavoured seltzers as a spritz base with a splash of vodka or gin for a stronger drink.',
        'For parties, keep a mix of flavours and pack cans in a cooler. Pair with light food such as salads, seafood and grilled chicken. Read more about [mixers for a home bar](/blog/best-mixers-for-home-bar/) if you want to make your own.',
      ],
    },
  ],
  'best-mixers-for-home-bar': [
    {
      heading: 'What do you need for a starter home bar?',
      paragraphs: [
        'A versatile starter kit: one vodka, one gin, one whisky or bourbon, a white rum and a tequila. Mixers: tonic water, soda water, ginger beer and a cola. Extras: sweet and dry vermouth, Angostura bitters, an orange liqueur and a coffee liqueur. Fresh lemons, limes and oranges, plus good ice.',
        'Tools: a shaker, a jigger, a long spoon, a strainer and a peeler. This setup covers most classic cocktails. Explore each spirit in our guides to [gin](/blog/london-dry-vs-contemporary-gin/) and [tequila](/blog/tequila-aging-guide-blanco-reposado-anejo/).',
      ],
    },
    {
      heading: 'How do you make simple syrup and fresh juice?',
      paragraphs: [
        'Simple syrup is equal parts sugar and hot water, stirred until dissolved and cooled. It keeps in the fridge for a few weeks. For a richer syrup use two parts sugar to one part water. Fresh lemon and lime juice should be squeezed on the day, since bottled juice lacks brightness.',
        'Making your own syrups, such as honey or ginger, adds flavour to drinks. Label and date bottles, and keep them chilled.',
      ],
    },
    {
      heading: 'What are some non-alcoholic drinks using mixers?',
      paragraphs: [
        'A Virgin Mule: ginger beer, lime juice and mint over ice. A tonic with lemon or grapefruit and rosemary. A soda with fresh fruit and herbs. Mix ginger beer with cranberry or apple juice for a festive drink.',
        'Good mixers make non-alcoholic drinks feel special. Offering them alongside alcoholic options means everyone enjoys the party. Buyers of alcohol must be 18 or over.',
      ],
    },
  ],
};
