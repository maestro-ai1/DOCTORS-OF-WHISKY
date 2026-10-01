import type { BlogPost } from '@/lib/types';

const UPDATED = '2026-10-01';

/** Long-form guides, batch 3 (rum, baijiu, amaro, liqueurs, soju). Keyword volumes / KD are from the keyword bank. */
export const BLOG_LONG_3: Record<string, Partial<BlogPost>> = {
  // dark rum 1300/12 · plantation rum 720/12 · captain morgan dark rum 480/12 · overproof rum 480/12
  'white-spiced-dark-rum-guide': {
    primaryKeyword: 'dark rum',
    secondaryKeywords: ['plantation rum', 'captain morgan dark rum', 'overproof rum', 'bundaberg red rum', 'rum cocktails', 'premium rum', 'white rum for pina colada', 'rum with spices'],
    seoTitle: 'Dark Rum, White Rum and Spiced Rum: Which to Buy',
    seoDescription: 'Dark rum, white rum and spiced rum explained: how each is made, how they taste, what to mix them with and which bottles to buy in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'White rum is light and clean, spiced rum is flavoured with spices and sugar, and dark rum is richer, usually from longer ageing or heavier distillation.',
      'Rum is made from sugarcane juice or molasses, and style varies by country and distillery.',
      'Use white rum for daiquiris and mojitos, dark rum for sipping and tiki drinks, and spiced rum for easy mixers.',
      'Overproof rum is bottled at much higher strength and is used in small amounts.',
    ],
    sections: [
      {
        heading: 'What is dark rum?',
        paragraphs: [
          'Dark rum is a rum with deep colour and rich flavour, often featuring molasses, caramel, dried fruit, baking spices and oak. The colour can come from long ageing in barrels, from heavier distillation that keeps more flavour, or from added caramel colouring, so the shade alone does not tell you the quality.',
          'Some dark rums are aged for many years and are best sipped neat. Others are blended or flavoured for mixing in drinks such as the Dark ’n’ Stormy (dark rum, ginger beer and lime) and tiki cocktails. Read the label for age statement and whether it is aged, blended or flavoured.',
        ],
      },
      {
        heading: 'How is rum made?',
        paragraphs: [
          'Rum is distilled from sugarcane products, most often molasses (a by-product of sugar refining) or fresh sugarcane juice. Molasses is fermented with yeast, then distilled in either column stills for a lighter style or pot stills for a heavier, funkier one. Rum may then be aged in oak barrels, filtered and blended.',
          'Styles vary by region. Spanish-style rums such as Cuban and Puerto Rican are typically light and clean. English-style rums from Jamaica, Barbados and Guyana are heavier and richer. French-style rhum agricole is made from fresh cane juice and has a grassy, vegetal character.',
        ],
      },
      {
        heading: 'What is white rum used for?',
        paragraphs: [
          'White (light or silver) rum is unaged or aged briefly and then filtered. It tastes clean and slightly sweet, and it is the base for the Daiquiri, Mojito, Piña Colada and Cuba Libre. It also works for any cocktail where you want sweetness and lift without heavy flavour.',
          'If you are new to rum, a bottle of white rum is the most versatile start. Try [Bacardi Carta Blanca](/shop/spirit/bacardi-carta-blanca-white-rum/) or browse the full [white rum collection](/shop/spirit/collection/white-rum/).',
        ],
        links: [{ text: 'Shop white rum', href: '/shop/spirit/collection/white-rum/' }],
      },
      {
        heading: 'What is spiced rum?',
        paragraphs: [
          'Spiced rum begins as a white or lightly aged rum and is flavoured with spices such as cinnamon, vanilla, clove and nutmeg, and sometimes caramel or sugar. It tends to be sweet, warm and easy to drink with cola, ginger beer or lemonade.',
          'Popular examples include Captain Morgan, Kraken and Bacardi’s Oakheart. See [Captain Morgan Spiced Rum](/shop/spirit/captain-morgan-spiced-rum/) or [Kraken 94 Proof](/shop/spirit/kraken-94-proof-spiced-rum/) in our [spiced rum collection](/shop/spirit/collection/spiced-rum/). Kraken’s higher strength gives a bolder drink than standard spiced rum.',
        ],
        links: [{ text: 'Shop spiced rum', href: '/shop/spirit/collection/spiced-rum/' }],
      },
      {
        heading: 'What does overproof rum mean?',
        paragraphs: [
          'Overproof rum is bottled at a much higher strength than usual, typically 57 per cent ABV and above and sometimes well beyond. It is used in small amounts in tiki drinks, flaming garnishes and to add punch to punches. It is not meant to be drunk in large servings.',
          'Because it is so strong, measure carefully and count standard drinks. Under Australian rules, a standard drink is 10 grams of pure alcohol, and high-strength spirits reach that quickly.',
        ],
      },
      {
        heading: 'Is there Australian rum?',
        paragraphs: [
          'Yes. Queensland’s sugar industry supports a rum tradition that includes Bundaberg Rum, which has been produced in Bundaberg since the late 1880s, and a growing number of craft distillers using local cane. Australian rum tends to be sweet, smooth and full-bodied.',
          'If you like the idea of supporting local producers, explore local options alongside imported rum so you can compare how climate and cane affect the flavour.',
        ],
      },
      {
        heading: 'How do you choose and serve rum?',
        paragraphs: [
          'Choose white rum for fresh, citrusy drinks, spiced rum for easy mixers and dark rum for sipping and richer cocktails. Check the label for age and any added flavouring. For sipping, serve neat or over a large ice cube in a tumbler.',
          'For ideas on what to pair with it, read our guide to [the best mixers for your home bar](/blog/best-mixers-for-home-bar/). Buyers must be 18 or over.',
        ],
      },
    ],
    faqs: [
      { question: 'What is dark rum?', answer: 'Dark rum is a rich, deeply coloured rum with notes of molasses, caramel and spice. The colour comes from ageing, heavy distillation or added caramel.' },
      { question: 'What is the difference between white, spiced and dark rum?', answer: 'White rum is light and unaged or briefly aged, spiced rum is flavoured with spices and sweetness, and dark rum is richer and often aged longer.' },
      { question: 'Is spiced rum the same as dark rum?', answer: 'No. Spiced rum is flavoured with spices and may be light or dark in colour, while dark rum gets its character from ageing and heavier distillation.' },
      { question: 'What is white rum used for?', answer: 'White rum is used for cocktails such as the Daiquiri, Mojito and Piña Colada, because it is clean and slightly sweet.' },
      { question: 'What is overproof rum?', answer: 'Overproof rum is bottled at very high strength, usually above 57% ABV, and is used in small amounts for cocktails and flambé.' },
      { question: 'Is Bundaberg Rum Australian?', answer: 'Yes. Bundaberg Rum is made in Bundaberg, Queensland, from local sugarcane molasses.' },
    ],
  },

  // chinese baijiu 480/26 · moutai 3600/28 · kweichow moutai 1000/28 · china baijiu 320/29
  'what-is-baijiu': {
    primaryKeyword: 'chinese baijiu',
    secondaryKeywords: ['moutai', 'kweichow moutai', 'maotai', 'china baijiu', 'baijiu alcohol', 'what is baijiu', 'chinese drink baijiu'],
    seoTitle: 'Chinese Baijiu: What It Is, Moutai and How to Drink It',
    seoDescription: 'What is Chinese baijiu? How it is made, the main aroma styles, why Kweichow Moutai is famous and how to drink baijiu for the first time in Australia.',
    updated: UPDATED,
    keyTakeaways: [
      'Baijiu is China’s national spirit, distilled from fermented sorghum or other grains using a mould starter called qu.',
      'It is grouped by aroma (sauce, strong, light, rice), not by age.',
      'Kweichow Moutai is the most famous sauce-aroma baijiu and is typically about 53% ABV.',
      'Baijiu is traditionally sipped from small cups and shared with food and toasts.',
    ],
    sections: [
      {
        heading: 'What is Chinese baijiu?',
        paragraphs: [
          'Baijiu (白酒, “white liquor”) is the best-selling spirit in the world by volume, thanks to its enormous domestic market in China. It is a clear spirit usually bottled between 35 and 60 per cent ABV, with 52 to 53 per cent common for premium styles.',
          'Despite the name, baijiu does not taste like vodka. It is fermented, savoury and fragrant, often with notes of tropical fruit, soy, sesame, aged cheese or flowers. First-time drinkers often find it surprising, which is part of its charm.',
        ],
      },
      {
        heading: 'How is baijiu made?',
        paragraphs: [
          'Most baijiu uses sorghum, sometimes mixed with rice, wheat, corn or glutinous rice. The grain is steamed, mixed with a mould-based starter called qu, and fermented in pits or vessels. Unlike most spirits, baijiu is fermented as a solid mass rather than in liquid, which is called solid-state fermentation.',
          'The fermented grain is distilled, often several times, and the spirit is then aged in clay jars or stainless steel before blending. Fermentation in old mud pits can add distinctive aromas, which is why some producers treasure their oldest pits.',
        ],
      },
      {
        heading: 'What are the main aroma styles?',
        paragraphs: [
          'Baijiu is classified by aroma. Sauce aroma (jiangxiang), made famous by Moutai, is savoury, nutty and complex. Strong aroma (nongxiang) is fruity and powerful, such as Luzhou Laojiao and Wuliangye. Light aroma (qingxiang) is clean and delicate, such as Fenjiu. Rice aroma (mixiang) is soft and gentle, from southern China.',
          'If you are new, light aroma is the easiest entry point, while sauce aroma is the most intense and most prized. There are other, rarer styles too, but these four cover most of what you will find.',
        ],
      },
      {
        heading: 'Why is Kweichow Moutai so famous?',
        paragraphs: [
          'Kweichow Moutai is made in Maotai town in Guizhou province and is China’s best-known baijiu. It is a sauce-aroma baijiu made through a long, multi-stage process and aged for years before blending. Its prestige as a national gift and banquet spirit has made it one of the world’s most valuable spirits brands.',
          'You can see it in our [baijiu collection](/shop/spirit/collection/baijiu/), including the [Kweichow Moutai Flying Fairy 53%](/shop/spirit/kweichow-moutai-flying-fairy-baijiu-53-percent/) and [Moutai by Camus](/shop/spirit/moutai-by-camus-baijiu/).',
        ],
        links: [{ text: 'Shop baijiu', href: '/shop/spirit/collection/baijiu/' }],
      },
      {
        heading: 'How do you drink baijiu?',
        paragraphs: [
          'Baijiu is traditionally drunk from tiny cups, usually with food. The toast “ganbei” (“dry cup”) is common at banquets, though you can sip rather than finishing every serving. Serve it at room temperature, and take your time to notice how the flavour changes.',
          'Baijiu is also increasingly used in cocktails, where it can add a savoury, fruity layer. Start with small measures, because it is strong.',
        ],
      },
      {
        heading: 'What food goes with baijiu?',
        paragraphs: [
          'Baijiu was built for Chinese food. Sauce aroma pairs well with rich braised meats and Sichuan dishes, strong aroma with spicy and oily food, and light aroma with seafood and subtle flavours. Drinking it alongside a meal softens its intensity.',
          'If you are curious about other Asian spirits, see our guide to [soju, Korea’s most popular spirit](/blog/soju-explained-koreas-spirit/).',
        ],
      },
      {
        heading: 'How should you start with baijiu in Australia?',
        paragraphs: [
          'Begin with a smaller or lower-priced bottle to see whether you like the style, and choose by aroma category. Shui Jing Fang from Chengdu, such as the [Red Fortune](/shop/spirit/shui-jing-fang-red-fortune-baijiu/), is a good way to try a strong-aroma style before moving to premium sauce aroma.',
          'Store bottles upright, away from heat and sunlight. Buyers must be 18 or over, and standard-drink labels will help you keep count.',
        ],
      },
    ],
    faqs: [
      { question: 'What is baijiu?', answer: 'Baijiu is a Chinese spirit distilled from fermented grains such as sorghum, using a mould starter called qu. It is usually 35 to 60% ABV.' },
      { question: 'What does baijiu taste like?', answer: 'Baijiu is savoury and fragrant, with notes that vary by style, from tropical fruit and flowers to soy, sesame and aged cheese.' },
      { question: 'Is baijiu the same as vodka?', answer: 'No. Vodka is a neutral, filtered spirit, while baijiu is fermented in a distinct way and carries strong flavour.' },
      { question: 'What is Moutai?', answer: 'Kweichow Moutai is a famous sauce-aroma baijiu made in Maotai town, Guizhou province, China.' },
      { question: 'How do you drink baijiu?', answer: 'Sip it from small cups at room temperature, usually with food. The traditional toast is ganbei.' },
      { question: 'How strong is baijiu?', answer: 'Baijiu is typically between 35% and 60% ABV, with many premium bottles at 52 to 53%.' },
    ],
  },

  // amaro montenegro 2400/17 · amaro nonino 880/10 · amaro averna 590/19 · amaro del capo 390/7
  'amaro-101-italy-bittersweet-tradition': {
    primaryKeyword: 'amaro montenegro',
    secondaryKeywords: ['amaro averna', 'amaro del capo', 'amaro nonino', 'montenegro drink', 'montenegro liquor', 'amaro', 'what is amaro'],
    seoTitle: 'Amaro Montenegro and More: A Guide to Italian Amaro',
    seoDescription: 'What is amaro? A guide to Italian bitter liqueurs, from Montenegro, Averna and Del Capo to Lucano, with how to drink amaro and which bottle to start with.',
    updated: UPDATED,
    keyTakeaways: [
      'Amaro is an Italian herbal liqueur with a bittersweet flavour, traditionally served after dinner.',
      'Amaro Montenegro is light and floral, Averna is rich and caramel-like, and Del Capo is bold and herbal.',
      'Amaro can be drunk neat, over ice, with soda or in cocktails such as the Negroni and Paper Plane.',
      'It is lower in strength than most spirits, usually 16 to 35 per cent ABV.',
    ],
    sections: [
      {
        heading: 'What is amaro?',
        paragraphs: [
          'Amaro (plural amari) means “bitter” in Italian. It is a herbal liqueur made by infusing roots, herbs, spices and citrus peel in alcohol, then sweetening the result. The flavour is bittersweet, ranging from light and floral to dark and intensely herbal.',
          'Most amari are traditionally served as a digestivo, a small glass after a meal to aid digestion. Many recipes are closely guarded family secrets and date back more than a century.',
        ],
      },
      {
        heading: 'What does Amaro Montenegro taste like?',
        paragraphs: [
          'Amaro Montenegro is one of Italy’s most popular amari. Created in Bologna in 1885, it is light and approachable, with notes of orange peel, vanilla, rose and gentle herbs. It sits at around 23 per cent ABV, so it is easy to drink.',
          'It is a good first amaro because the bitterness is balanced by sweetness and aroma. Try it over ice with an orange slice or with soda for a longer drink. See [Amaro Montenegro](/shop/spirit/amaro-montengro/) in our [amaro collection](/shop/spirit/collection/amaro/).',
        ],
        links: [{ text: 'Shop amaro', href: '/shop/spirit/collection/amaro/' }],
      },
      {
        heading: 'What are Averna and Amaro del Capo like?',
        paragraphs: [
          'Averna comes from Sicily and dates to 1868. It is dark, sweet and rich with caramel, cola, orange and herbal notes, and it is a good choice if you like a smoother, more dessert-like amaro. It is also excellent in cocktails.',
          'Amaro del Capo comes from Calabria and is made with a long list of herbs and citrus peels. It is bolder, more peppery and more bitter, and it is often served very cold. Try [Amaro Averna](/shop/spirit/amaro-averna/) or [Caffo Amaro del Capo](/shop/spirit/caffo-amaro-del-capo/).',
        ],
      },
      {
        heading: 'Where do Lucano, Nonino and Chartreuse fit in?',
        paragraphs: [
          'Amaro Lucano comes from Basilicata and has a sweet, orange-and-spice character. [Amaro Lucano](/shop/spirit/amaro-lucano/) is a popular after-dinner pour. Amaro Nonino is a lighter, grappa-based amaro from Friuli with notes of orange and caramel, and it is the signature ingredient in the Paper Plane cocktail.',
          'Chartreuse is not an Italian amaro but sits in the same herbal liqueur family. Made by monks in France from many botanicals, its green version is high-strength and intensely herbal. See [Chartreuse VEP](/shop/spirit/chartreuse-vep-green-herbal-liqueur/) for a rare example.',
        ],
      },
      {
        heading: 'How do you drink amaro?',
        paragraphs: [
          'The simplest way is neat, in a small glass, at room temperature or slightly chilled. Over ice with a slice of orange or lemon softens the bitterness. With soda or tonic it makes a refreshing long drink, a common aperitivo habit in Italy.',
          'For something more adventurous, use it in the Negroni (gin, Campari and sweet vermouth), the Boulevardier, the Paper Plane (bourbon, Aperol, Nonino and lemon) or a simple amaro and cola.',
        ],
      },
      {
        heading: 'What is the difference between amaro and aperitivo bitters?',
        paragraphs: [
          'Aperitivo bitters, such as Campari and Aperol, are served before a meal to stimulate the appetite. They are brighter, more citrus-led and usually served with soda or prosecco in a spritz. Amari are heavier and served after the meal.',
          'The boundaries blur, since Montenegro is happily drunk either way. If you enjoy spritzes, you may also like our [limoncello collection](/shop/spirit/collection/limoncello/) and [sambuca collection](/shop/spirit/collection/sambuca/).',
        ],
      },
      {
        heading: 'Which amaro should you buy first?',
        paragraphs: [
          'Start with Amaro Montenegro if you prefer light and floral, Averna if you like rich and sweet, and Amaro del Capo if you enjoy a bold herbal bite. A single bottle will last a long time because amaro is typically poured in small measures.',
          'Store it upright in a cool, dark place. Buyers must be 18 or over.',
        ],
      },
    ],
    faqs: [
      { question: 'What is amaro?', answer: 'Amaro is an Italian herbal liqueur made by infusing herbs, roots and citrus peel in alcohol and sweetening it. It tastes bittersweet and is usually served after dinner.' },
      { question: 'What does Amaro Montenegro taste like?', answer: 'Amaro Montenegro tastes of orange peel, vanilla, rose and gentle herbs. It is light and approachable at about 23% ABV.' },
      { question: 'How do you drink amaro?', answer: 'Amaro can be sipped neat, over ice with citrus, with soda or tonic, or used in cocktails such as the Negroni and Paper Plane.' },
      { question: 'Is amaro the same as Campari?', answer: 'No. Campari is an aperitivo bitter served before meals, while amaro is typically a sweeter, heavier digestivo served after meals, although they are in the same family.' },
      { question: 'Does amaro need to be refrigerated?', answer: 'No. Amaro is shelf-stable and can be kept at room temperature, although some people like to serve it chilled.' },
      { question: 'What is the best amaro for beginners?', answer: 'Amaro Montenegro or Averna. Montenegro is light and floral, and Averna is sweet and rich.' },
    ],
  },

  // kahlua liquor 1000/15 · baileys chocolate 1600/17 · frozen espresso martini 210/16 · irish cream 1300/26
  'best-cream-coffee-liqueurs-for-cocktails': {
    primaryKeyword: 'kahlua liquor',
    secondaryKeywords: ['kahlua coffee liqueur', 'baileys irish cream coffee', 'baileys chocolate', 'irish cream', 'espresso martini vodka', 'frozen espresso martini', 'vodka for espresso martinis'],
    seoTitle: 'Kahlúa, Baileys and Coffee Liqueur Cocktails to Make',
    seoDescription: 'Kahlúa liquor vs Baileys: how the coffee and cream liqueurs differ, how to make an espresso martini and white Russian, and how to store them.',
    updated: UPDATED,
    keyTakeaways: [
      'Kahlúa is a rum-based coffee liqueur, while Baileys is an Irish whiskey and cream liqueur.',
      'Use coffee liqueur in the Espresso Martini and White Russian, and cream liqueur in Mudslides and over ice.',
      'Cream liqueurs have a best-before date and should be stored cool and consumed within the time on the label.',
      'Both are low-strength and sweet, so they suit desserts and after-dinner drinks.',
    ],
    sections: [
      {
        heading: 'What is the difference between Kahlúa and Baileys?',
        paragraphs: [
          'Kahlúa is a coffee liqueur from Mexico, made with rum, sugar, vanilla and Arabica coffee. It tastes of roasted coffee and caramel and is lower in strength than most spirits. Baileys is an Irish cream liqueur made from Irish whiskey, cream and flavourings, with chocolate and vanilla notes and a smooth, creamy texture.',
          'They are not interchangeable. Kahlúa adds coffee depth and bitterness to drinks, while Baileys adds creaminess and sweetness. They are often used together, as in the layered B-52 shot.',
        ],
      },
      {
        heading: 'How do you make an espresso martini?',
        paragraphs: [
          'The Espresso Martini was created by bartender Dick Bradsell in London in the 1980s. The classic recipe is 45 mL vodka, 15 to 30 mL coffee liqueur and a freshly brewed espresso shot, shaken hard with ice and strained into a chilled glass. The foam on top comes from shaking the hot coffee with ice.',
          'For the best result, use fresh espresso and a clean vodka. Adjust sweetness by changing the amount of Kahlúa. Browse our [coffee liqueur collection](/shop/spirit/collection/coffee-liqueur/) and try [Kahlúa Liqueur](/shop/spirit/kahlua-liqueur/).',
        ],
        links: [{ text: 'Shop coffee liqueur', href: '/shop/spirit/collection/coffee-liqueur/' }],
      },
      {
        heading: 'What else can you make with coffee liqueur?',
        paragraphs: [
          'The White Russian combines vodka, coffee liqueur and cream over ice. The Black Russian leaves out the cream. A Mudslide mixes vodka, coffee liqueur and Irish cream, and a Brave Bull uses tequila and coffee liqueur.',
          'You can also pour coffee liqueur over ice cream, stir it into hot chocolate or add it to a tiramisu. A frozen Espresso Martini, blended with ice, is a good summer variation.',
        ],
      },
      {
        heading: 'What is Baileys, and what does it taste like?',
        paragraphs: [
          'Baileys was launched in Dublin in 1974 and was the first Irish cream liqueur. It is made with Irish whiskey, fresh dairy cream and flavourings including cocoa and vanilla, and it is typically 17 per cent ABV. It tastes sweet, creamy and chocolatey with a warm whiskey backbone.',
          'It is delicious over ice, in coffee, or poured over desserts. Our [Baileys Irish Cream collection](/shop/spirit/collection/baileys-irish-cream/) includes the classic 700 mL and 1 L bottles and a range of flavours.',
        ],
        links: [{ text: 'Shop Baileys Irish Cream', href: '/shop/spirit/collection/baileys-irish-cream/' }],
      },
      {
        heading: 'How do you store cream liqueurs?',
        paragraphs: [
          'Store cream liqueur in a cool, dark place, away from heat, and follow the best-before date and storage guidance on the bottle. Refrigerating after opening is a good habit in warm weather, and always keep the cap on tight.',
          'If the liqueur looks curdled, smells sour or has changed texture, discard it. Coffee liqueur is more stable, but still keep it sealed and away from sunlight. For more on storing spirits, see our [guide to storing whisky](/blog/how-to-store-and-cellar-rare-whisky/).',
        ],
      },
      {
        heading: 'Which orange and other liqueurs belong in a home bar?',
        paragraphs: [
          'Beyond cream and coffee, an orange liqueur such as Cointreau is essential for margaritas, Cosmopolitans and sidecars. Cinnamon liqueurs add warmth in winter drinks, and amaretto and herbal liqueurs add variety.',
          'Explore the [orange liqueur collection](/shop/spirit/collection/orange-liqueur/) and see how different mixers can lift them in our [home bar mixers guide](/blog/best-mixers-for-home-bar/).',
        ],
      },
      {
        heading: 'How much should you pour?',
        paragraphs: [
          'A standard serve of liqueur is 30 mL. Because these drinks taste sweet and smooth, it is easy to drink more than you realise. Check the standard-drink count on the bottle, and remember that buyers must be 18 or over.',
          'For gifting, a bottle of Baileys or Kahlúa with a recipe card is a popular choice, especially around Christmas.',
        ],
      },
    ],
    faqs: [
      { question: 'What is Kahlúa made from?', answer: 'Kahlúa is a Mexican coffee liqueur made from rum, sugar, vanilla and Arabica coffee.' },
      { question: 'What is Baileys made from?', answer: 'Baileys is made from Irish whiskey, fresh cream, cocoa and vanilla flavourings. It is about 17% ABV.' },
      { question: 'What is an espresso martini?', answer: 'An espresso martini is a cocktail of vodka, coffee liqueur and fresh espresso, shaken with ice and strained into a chilled glass.' },
      { question: 'What is a white Russian?', answer: 'A white Russian combines vodka, coffee liqueur and cream, served over ice.' },
      { question: 'Does Baileys need to be refrigerated?', answer: 'Unopened Baileys can be stored in a cool, dark place. After opening, keep it sealed and cool, and follow the best-before date and storage guidance on the label.' },
      { question: 'Can I use Baileys instead of Kahlúa?', answer: 'Not as a direct swap. Baileys is creamy and sweet while Kahlúa is a coffee liqueur, so they give different flavours. They are often used together.' },
    ],
  },

  // soju alcohol percentage 1300/18 · jinro soju 1300/14 · alcohol content soju 1600/25 · chum churum soju 390/9
  'soju-explained-koreas-spirit': {
    primaryKeyword: 'soju alcohol percentage',
    secondaryKeywords: ['jinro soju', 'alcohol content soju', 'soju alcohol content', 'chum churum soju', 'soju lychee', 'grape soju', 'soju price', 'is soju strong'],
    seoTitle: 'Soju Alcohol Percentage and Guide: What Is Soju?',
    seoDescription: 'Soju explained: alcohol percentage, standard drinks in a bottle, how it is made, popular brands such as Jinro and Chum Churum, flavours and how to drink it.',
    updated: UPDATED,
    keyTakeaways: [
      'Most popular soju is 16 to 17 per cent ABV, though traditional and premium styles can be much stronger.',
      'A 360 mL bottle at 17% contains about 4.8 Australian standard drinks.',
      'Soju is traditionally sipped from small glasses with food, often shared.',
      'Flavoured sojus such as lychee, grape and peach are lower in strength and very popular.',
    ],
    sections: [
      {
        heading: 'What is the alcohol percentage of soju?',
        paragraphs: [
          'The most common green-bottle soju sold in Australia is around 16 to 17 per cent ABV, which is roughly in between wine and whisky. Flavoured soju is often lower, typically 12 to 14 per cent. Traditional and premium soju can reach 25 per cent and above, and some regional styles such as Andong soju are far stronger.',
          'So is soju strong? It tastes mild and goes down easily, which can make it deceptively strong. Always check the label for ABV, and count standard drinks rather than glasses.',
        ],
      },
      {
        heading: 'How many standard drinks are in a bottle of soju?',
        paragraphs: [
          'An Australian standard drink contains 10 grams of pure alcohol. A typical 360 mL bottle of soju at 17 per cent ABV contains about 4.8 standard drinks. At 16 per cent it is about 4.5, and at 13 per cent about 3.7.',
          'Soju is often shared, but if you are drinking alone it is worth remembering the number. The Australian guidelines recommend no more than four standard drinks on any day, and no more than ten in a week.',
        ],
      },
      {
        heading: 'What is soju made from?',
        paragraphs: [
          'Traditional soju is distilled from rice and is similar to a light vodka or shochu. Since the mid-20th century, much soju has been made from other starches such as sweet potato, tapioca and wheat, which are diluted and sweetened to a lower strength.',
          'Premium soju made in a pot still from rice alone, such as the [Ilpoom Jinro 1924 Heritage Premium Soju](/shop/other/ilpoom-jinro-1924-heritage-premium-soju/), has a fuller, grainier flavour closer to a sipping spirit.',
        ],
      },
      {
        heading: 'What are the main soju brands?',
        paragraphs: [
          'Jinro, founded in 1924, is the world’s best-selling soju brand and is known for its clean, slightly sweet green-bottle soju. Chum Churum is another leading brand and comes in plain and fruit flavours. Charm Malgeun and other brands add lychee, grape, peach, mango and blueberry.',
          'You can browse the range in our [soju collection](/shop/other/collection/soju/), including [Chum Churum Apple Mango](/shop/other/chum-churum-soju-apple-mango/).',
        ],
        links: [{ text: 'Shop soju', href: '/shop/other/collection/soju/' }],
      },
      {
        heading: 'What do flavoured sojus taste like?',
        paragraphs: [
          'Flavoured soju is sweeter and lighter, with the fruit tasting like a candy or soft drink. Lychee, grape and peach are the most popular. It is easy to drink on its own, with ice, or mixed with soda or yogurt drinks.',
          'Try [Charm Malgeun Mango Soju](/shop/other/charm-malgeun-mango-soju/) or [Blueberry](/shop/other/charm-malgeun-soju-blueberry/) if you like fruity drinks.',
        ],
      },
      {
        heading: 'How do you drink soju?',
        paragraphs: [
          'Soju is typically served chilled and sipped from small glasses, often as a shot, alongside food. In Korea, drinking is social: you pour for others rather than yourself, and younger drinkers pour for elders with two hands and turn away slightly when drinking.',
          'Popular pairings include Korean barbecue, fried chicken and spicy stews. You can also make cocktails such as a soju spritz or the beer and soju mix known as somaek.',
        ],
      },
      {
        heading: 'What does soju cost, and how should you choose?',
        paragraphs: [
          'Standard green-bottle soju is inexpensive. Flavoured and premium bottles cost more, with premium pot-still soju priced like a good spirit. Choose based on how you plan to drink it: plain soju for food, flavoured for casual drinks and premium for sipping.',
          'To explore other Asian spirits, read our guide to [Chinese baijiu](/blog/what-is-baijiu/). Buyers must be 18 or over.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the alcohol percentage of soju?', answer: 'Most popular soju is 16 to 17% ABV. Flavoured soju is often 12 to 14%, and traditional or premium soju can be stronger.' },
      { question: 'How many standard drinks are in a bottle of soju?', answer: 'A 360 mL bottle at 17% ABV contains about 4.8 Australian standard drinks.' },
      { question: 'Is soju strong?', answer: 'Soju is milder than whisky or vodka but stronger than wine or beer per serve, and it tastes smooth, so it is easy to drink quickly.' },
      { question: 'What is soju made from?', answer: 'Soju is made from rice or other starches such as sweet potato, tapioca and wheat. Premium soju is distilled from rice.' },
      { question: 'What is the best soju brand?', answer: 'Jinro and Chum Churum are the most popular. Premium options such as Ilpoom Jinro 1924 offer a fuller flavour.' },
      { question: 'How do you drink soju?', answer: 'Serve it chilled in small glasses with food, or use it in cocktails such as soju spritz and somaek.' },
    ],
  },
};
