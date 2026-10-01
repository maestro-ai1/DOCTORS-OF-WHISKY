import type { BlogPost } from '@/lib/types';

type Sections = NonNullable<BlogPost['sections']>;

/** Extra sections appended after the main guide sections (rum, baijiu, amaro, liqueurs, soju). */
export const BLOG_MORE_3: Record<string, Sections> = {
  'white-spiced-dark-rum-guide': [
    {
      heading: 'What are the best rum cocktails to make?',
      paragraphs: [
        'A Daiquiri: 60 mL white rum, 25 mL lime juice and 15 mL sugar syrup, shaken and strained. A Mojito: white rum, lime, sugar, mint and soda. A Piña Colada: 60 mL rum, 90 mL pineapple juice and 30 mL coconut cream, blended or shaken. A Dark ’n’ Stormy: dark rum floated over ginger beer and lime.',
        'Spiced rum works with cola, ginger beer or lemonade. See our guide to the [best mixers](/blog/best-mixers-for-home-bar/) for what to pair with each style.',
      ],
    },
    {
      heading: 'How do rum regions and styles differ?',
      paragraphs: [
        'Cuba and Puerto Rico are known for light, clean, column-distilled rums. Jamaica makes heavy, funky pot-still rum with intense fruit and ester aromas. Barbados is balanced and rounded, while Guyana’s Demerara rums are rich and dark with a smoky, treacle edge. Martinique and other French islands make rhum agricole from fresh cane juice, which tastes grassy and vegetal.',
        'Knowing these helps you read a label. If you want a clean cocktail base, choose Spanish-style. If you want rich sipping rum, look to Barbados, Guyana and Jamaica.',
      ],
    },
    {
      heading: 'How do you read a rum label?',
      paragraphs: [
        'Check where it was distilled, the age statement, the cask type and the ABV. Be careful with age statements on rums blended through the solera system, where the number may refer to the oldest component or an average, rather than the youngest as it does for Scotch.',
        'Some rums contain added sugar, which can make them taste sweeter and smoother. “Navy strength” means at least 57 per cent ABV. Look for the style, colour and any statement about additives, and compare prices with similar bottles.',
      ],
    },
  ],
  'what-is-baijiu': [
    {
      heading: 'How is baijiu used in cocktails?',
      paragraphs: [
        'Bartenders use baijiu for its savoury, fruity and funky character. A baijiu Margarita swaps tequila for light-aroma baijiu with lime and orange liqueur. A baijiu Old Fashioned replaces whisky with a bolder baijiu and a touch of sugar. A baijiu Mule uses ginger beer and lime.',
        'Start with a small measure, since the strong flavours can dominate. Lighter, cleaner baijiu works best for mixing, while premium sauce aroma is better sipped neat.',
      ],
    },
    {
      heading: 'What is the etiquette of drinking and gifting baijiu?',
      paragraphs: [
        'Baijiu is central to Chinese banquets, business meetings and celebrations. It is poured for others first, usually starting with the guest of honour or eldest, and glasses are raised for toasts such as ganbei. You can sip rather than empty the glass each time, especially if you do not want to drink too much.',
        'Premium bottles, especially Moutai, are popular as gifts, often presented in red boxes. If you are giving baijiu, choose a recognised brand and keep the packaging.',
      ],
    },
    {
      heading: 'How do you avoid fake baijiu?',
      paragraphs: [
        'Counterfeit baijiu, especially of high-value brands such as Moutai, is a known problem. Buy from reputable retailers, check packaging quality, seals, labels and batch codes, and be suspicious of unusually low prices.',
        'Store bottles upright and away from sunlight. Open bottles keep well because of the high alcohol content. Browse genuine bottles in our [baijiu collection](/shop/spirit/collection/baijiu/). Buyers must be 18 or over.',
      ],
    },
  ],
  'amaro-101-italy-bittersweet-tradition': [
    {
      heading: 'What is aperitivo culture, and how do you make a spritz?',
      paragraphs: [
        'Aperitivo is the Italian ritual of having a light drink and snacks before dinner. The classic is the Aperol Spritz: three parts prosecco, two parts Aperol and one part soda water over ice, with an orange slice. Campari Soda and the Americano are other aperitivo staples.',
        'Amaro can also join the ritual. Try Montenegro with soda and an orange slice for a lighter, floral long drink. For other Italian drinks, see our [limoncello collection](/shop/spirit/collection/limoncello/).',
      ],
    },
    {
      heading: 'What are the best amaro cocktails?',
      paragraphs: [
        'The Negroni: equal parts gin, Campari and sweet vermouth. The Boulevardier: bourbon in place of gin. The Paper Plane: equal parts bourbon, Aperol, Amaro Nonino and lemon juice. The Black Manhattan: rye, Averna and bitters. A simple Averna and cola is also popular.',
        'Because amaro is sweet and complex, it can balance strong spirits. Use quality ice and stir spirit-forward drinks.',
      ],
    },
    {
      heading: 'How do amaro, Fernet and Chartreuse differ?',
      paragraphs: [
        'Fernet is a very bitter, minty, often high-strength style of amaro and a bartender favourite. Chartreuse is a French herbal liqueur made by monks to a secret recipe, with 130 botanicals and high strength in its green version. Amaro is the broad Italian family, ranging from light to dark, sweet to bitter.',
        'Amaro is shelf-stable thanks to its sugar and alcohol. Store it upright in a cool, dark place, and it will keep for years. See the full range in our [amaro collection](/shop/spirit/collection/amaro/).',
      ],
    },
  ],
  'best-cream-coffee-liqueurs-for-cocktails': [
    {
      heading: 'How do you use Baileys in drinks and desserts?',
      paragraphs: [
        'Pour Baileys over ice for a simple after-dinner drink, add it to hot chocolate or coffee, or blend it into milkshakes. The Mudslide combines vodka, coffee liqueur, Baileys and cream. An Irish Coffee uses Irish whiskey, hot coffee, sugar and cream, and a Baileys coffee swaps the whiskey for the liqueur.',
        'In baking, Baileys flavours chocolate cake, cheesecake, brownies and ice cream. Add it after cooking if you want to keep its flavour. It also makes a good dessert sauce.',
      ],
    },
    {
      heading: 'Which Baileys flavours are available?',
      paragraphs: [
        'Beyond the original, our range includes flavours such as Apple Pie, Cinnamon Scroll and Colada, which suit gifting and festive occasions. They are sweeter and more dessert-like than the original, and are best served cold over ice.',
        'See the full range in our [Baileys Irish Cream collection](/shop/spirit/collection/baileys-irish-cream/) or try [Baileys 700 mL](/shop/spirit/baileys-700-baileys-irish-cream/).',
      ],
    },
    {
      heading: 'What is a B-52 and how do you layer a shot?',
      paragraphs: [
        'The B-52 is a layered shot of coffee liqueur, Irish cream and orange liqueur. Pour the Kahlúa first, then gently pour the Baileys over the back of a spoon so it floats, and finally the orange liqueur in the same way. Each liquid has a different density, which is why they stay in layers.',
        'Layered shots are easy to over-drink, so keep an eye on the standard drinks. See [Cointreau](/shop/spirit/cointreau-orange-liqueur/) for the top layer. Buyers must be 18 or over.',
      ],
    },
  ],
  'soju-explained-koreas-spirit': [
    {
      heading: 'What is the difference between soju, sake and shochu?',
      paragraphs: [
        'Sake is a Japanese rice wine, brewed rather than distilled and usually around 15 per cent ABV. Shochu is a Japanese distilled spirit made from ingredients such as sweet potato, barley or rice. Soju is a Korean spirit, traditionally distilled from rice, and today most commonly a diluted, sweetened spirit.',
        'Soju tends to be cleaner and sweeter than shochu and has a lower strength than most spirits. If you enjoy one, you may enjoy the others in different ways.',
      ],
    },
    {
      heading: 'What food goes with soju?',
      paragraphs: [
        'Soju is designed for food. Pair it with Korean barbecue, fried chicken, spicy stews, kimchi pancakes and seafood. Its clean, slightly sweet taste refreshes the palate between bites of rich or spicy food. Fruit-flavoured soju also goes well with desserts.',
        'Chill the bottle, pour small glasses and share with friends. In Korea, anju (food eaten with drinks) is an important part of the experience.',
      ],
    },
    {
      heading: 'How do you make soju cocktails?',
      paragraphs: [
        'Somaek is soju mixed into beer, usually in a small shot glass dropped into a pint or poured into a glass of lager. A soju spritz combines soju, soda water and a splash of juice or a slice of citrus. Flavoured soju works with lemonade, yogurt drinks and tonic.',
        'Keep the mix simple and use cold ingredients. For more Asian spirits, read about [Chinese baijiu](/blog/what-is-baijiu/). Remember that soju is easy to drink, so check the standard-drink count.',
      ],
    },
  ],
};
