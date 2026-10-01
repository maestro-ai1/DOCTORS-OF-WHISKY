import type { BlogPost } from '@/lib/types';

type Sections = NonNullable<BlogPost['sections']>;

/** Extra sections appended after the main guide sections (beer, non-alcoholic beer, cider, red wine, white wine). */
export const BLOG_MORE_4: Record<string, Sections> = {
  'lager-vs-imported-beer-buyers-guide': [
    {
      heading: 'What are the main beer styles?',
      paragraphs: [
        'Pilsner is a crisp, hoppy pale lager that originated in Plzeň in the Czech Republic. Helles is a softer, maltier German lager. Pale ale is a fruity, balanced ale, and IPA (India Pale Ale) is a hoppier, more bitter version. Wheat beer is cloudy and refreshing, often with banana and clove notes, and stout and porter are dark and roasty.',
        'Most imported beers you will find in Australia are pale lagers, but variety is growing. Use the style name on the label as a starting point and compare ABV and bitterness.',
      ],
    },
    {
      heading: 'What are the Australian beer glass sizes?',
      paragraphs: [
        'Glass names differ from state to state, so a schooner, middy, pot or pint can mean different sizes depending on where you order. The three common sizes are about 285 mL, 425 mL and 570 mL, and the safest way to order is to ask the size in millilitres or point to the glass.',
        'At home, serve beer in a clean glass, since oils and detergent residue can flatten the head. Pour at an angle, then straighten the glass for a good head. Standard-drink information on the label is a better guide to how much you are drinking than the glass name.',
      ],
    },
    {
      heading: 'What food goes with beer?',
      paragraphs: [
        'Light lagers and pilsners suit seafood, salads, spicy food and barbecue. Wheat beer pairs with brunch, salads and mild curries. IPA matches burgers, spicy food and strong cheese, and dark beers match roast meat and chocolate desserts.',
        'Corona with lime is an easy summer match for tacos and grilled fish, and Peroni suits pizza and pasta. For more ideas, see our guide to [cider](/blog/guide-to-australian-craft-cider/).',
      ],
    },
  ],
  'why-non-alcoholic-beer-is-booming': [
    {
      heading: 'What other non-alcoholic drinks are growing?',
      paragraphs: [
        'Non-alcoholic wine, spirits and spritzes are growing quickly alongside beer. Alcohol-free gin, whisky and aperitif alternatives allow people to make mocktails and spritzes, and non-alcoholic sparkling wine offers a celebratory option.',
        'Quality varies, so read reviews and try small sizes first. Many people keep a mix of regular and non-alcoholic drinks at home, so guests can choose.',
      ],
    },
    {
      heading: 'How do Dry July and Sober October fit in?',
      paragraphs: [
        'Dry July, a fundraising campaign that began in Australia in 2008, and similar months such as Sober October encourage people to take a break from alcohol. Non-alcoholic beer is a popular way to keep the social side of drinking during these months.',
        'If you are cutting down, tracking standard drinks and having alcohol-free days helps. If you are concerned about your drinking, speak to your GP or call a support service.',
      ],
    },
    {
      heading: 'How do you pour and serve non-alcoholic beer?',
      paragraphs: [
        'Serve very cold, in a clean glass, and pour at an angle to build a head. Cold temperatures mask any sweetness and make the beer taste crisper. Dealcoholised beers can taste a little thin when warm.',
        'Look at the ingredients and nutrition label if calories, carbohydrates or gluten matter to you. Brands differ widely. A squeeze of lime in a lager style or a slice of orange in a wheat beer can lift the flavour.',
      ],
    },
  ],
  'guide-to-australian-craft-cider': [
    {
      heading: 'How is craft cider made, step by step?',
      paragraphs: [
        'Apples are washed and milled into pulp, then pressed to extract juice. The juice is fermented with wild or cultured yeast, converting sugar to alcohol over weeks or months. The cider is then racked off the lees, blended, sometimes sweetened or back-sweetened, carbonated or left still, and bottled.',
        'Small craft makers often use single-variety fruit, wild fermentation or barrel ageing, which gives more complex and varied flavours. Large producers focus on consistency and a refreshing, sweeter style.',
      ],
    },
    {
      heading: 'How does cider compare with beer and wine?',
      paragraphs: [
        'Cider is usually gluten-free, whereas most beer is not. It is typically 4 to 8 per cent ABV, similar to beer and lower than most wine. Calories and sugar vary widely: a dry cider can be low in sugar, while a sweet cider can contain as much as a soft drink.',
        'Check the label for ABV and, where shown, sugar. Cider is a good alternative if you find beer too bitter or wine too heavy, and it matches many foods well.',
      ],
    },
    {
      heading: 'What are the best cider cocktails?',
      paragraphs: [
        'A cider spritz is cider topped with soda and a slice of lemon or orange. A Snakebite is half cider and half lager. Hot spiced cider, with cloves, cinnamon and orange, is a winter favourite. Cider and bourbon make a smooth, autumnal highball.',
        'Fruit ciders such as strawberry lime can be served over ice with extra fruit. See our [bourbon guide](/blog/what-makes-bourbon-different/) for the bourbon mix.',
      ],
    },
  ],
  'how-to-choose-red-wine': [
    {
      heading: 'What do tannin, acidity and body mean?',
      paragraphs: [
        'Tannin is the dry, grippy feeling from grape skins, seeds and oak. Acidity is the freshness that makes your mouth water. Body is the weight or richness of the wine on your palate. Alcohol, sweetness and fruit intensity all affect body.',
        'Understanding these makes choosing easier. If you like soft, round wines, look for low tannin and medium body. If you like firm, structured wines, choose higher tannin, such as Cabernet Sauvignon.',
      ],
    },
    {
      heading: 'What food goes with red wine?',
      paragraphs: [
        'Cabernet Sauvignon suits steak and lamb, because the tannins soften with protein and fat. Shiraz suits barbecue, spicy sausages and hearty stews. Merlot suits roast chicken and mushrooms, and Pinot Noir suits duck, salmon and mushroom dishes. Lighter reds such as Sangiovese pair with pizza and tomato pasta.',
        'As a rule, the richer the dish, the more full-bodied the wine. Spicy food can make high-alcohol wines taste hotter, so choose fruit-forward, low-tannin reds.',
      ],
    },
    {
      heading: 'How do you taste wine, and what do scores mean?',
      paragraphs: [
        'Look at the colour, swirl to release aromas, smell for fruit and oak, then take a sip and notice sweetness, acidity, tannin and finish. A long, balanced finish usually means higher quality.',
        'Critics score wine out of 100, and in Australia the Halliday Wine Companion and other guides are widely followed. A score of 90 or above is generally considered excellent, but personal taste matters more than any number. If you plan to cellar bottles, our [guide to storing whisky](/blog/how-to-store-and-cellar-rare-whisky/) covers many of the same storage principles.',
      ],
    },
  ],
  'white-wine-styles-explained': [
    {
      heading: 'How do you taste white wine?',
      paragraphs: [
        'Check the colour: pale lemon suggests a young, crisp wine, and deeper gold suggests oak or age. Swirl and smell for citrus, stone fruit, tropical fruit or flowers. Sip and notice the acidity, sweetness, weight and finish.',
        'Compare two wines side by side, such as an unoaked Chardonnay and an oaked one, to learn the difference. Taking small notes helps you remember what you liked.',
      ],
    },
    {
      heading: 'Which white wine is best for cooking?',
      paragraphs: [
        'Use a dry, crisp, unoaked white wine such as Sauvignon Blanc or Pinot Grigio for cooking. They add acidity and freshness to sauces, risottos and seafood without overpowering the dish. Avoid heavily oaked Chardonnay or sweet wine unless a recipe asks for it.',
        'A useful rule is to cook with a wine you would be happy to drink. The “cooking wine” sold in some supermarkets is salty and often poor quality. A dry white wine also keeps well in the fridge for a few days.',
      ],
    },
    {
      heading: 'Which Australian regions make the best white wine?',
      paragraphs: [
        'The Adelaide Hills and Margaret River make elegant Chardonnay and Sauvignon Blanc. The Clare and Eden Valleys are famous for dry, age-worthy Riesling. The Hunter Valley is known for Semillon that develops honeyed complexity with age. The Yarra Valley and Tasmania produce cool-climate Chardonnay and aromatic whites.',
        'Choose by region and style, and read tasting notes on the label. Compare with other Australian wines in our [red wine guide](/blog/how-to-choose-red-wine/).',
      ],
    },
  ],
};
