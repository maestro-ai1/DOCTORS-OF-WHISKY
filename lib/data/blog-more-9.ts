import type { BlogPost } from '@/lib/types';

type Sections = NonNullable<BlogPost['sections']>;

/** Final sections (premix, seltzers, mixers, Macallan, storage, tequila and vodka comparisons, investing). */
export const BLOG_MORE_9: Record<string, Sections> = {
  'ready-to-drink-premix-trend': [
    {
      heading: 'How do premix flavours compare?',
      paragraphs: [
        'Vodka sodas and gin and tonics are the driest and lightest, with little sweetness. Cocktail-style flavours such as margarita, mojito and pornstar martini taste sweeter and more dessert-like, and fruit flavours such as strawberry, watermelon and lemon are the sweetest and fruitiest.',
        'If you prefer a drink that tastes like a cocktail, choose one of the cocktail flavours. If you prefer something crisp and light, choose a soda or tonic style. Buy a mixed case to find your favourites before committing to a large order.',
      ],
    },
    {
      heading: 'How do you keep premix cold at an outdoor event?',
      paragraphs: [
        'Use a large cooler with ice, add a little water so the ice makes contact with every can, and keep the lid shut. Pre-chill cans in the fridge the night before, since warm cans melt ice quickly. Keep the cooler in the shade and avoid leaving it in a hot car.',
        'Bring a rubbish bag for empty cans and a separate cooler for non-alcoholic drinks. If you are hosting a larger group, keep a second cooler as a refill. For more serving ideas, read our guide to [the best mixers for your home bar](/blog/best-mixers-for-home-bar/).',
      ],
    },
  ],
  'rise-of-zero-sugar-seltzers': [
    {
      heading: 'Who are zero sugar seltzers best for?',
      paragraphs: [
        'They suit people who want a lighter, lower-sugar alcoholic drink, those who find sweet premix too sugary, and anyone who prefers a simple, refreshing can. They also suit active lifestyles, summer events and casual get-togethers.',
        'They are less suitable if you want a strong cocktail flavour or a high-alcohol drink. Some people also dislike the neutral flavour. As with any alcoholic drink, they are not suitable for people who are pregnant, driving or under 18.',
      ],
    },
    {
      heading: 'How do you choose and buy a seltzer in Australia?',
      paragraphs: [
        'Check that the listing shows the ABV, the pack size, the standard drinks and the flavour. Compare per-can prices across pack sizes, as cases of 24 are often cheaper per can. Look at the best-before date and storage advice.',
        'Because the category is new and product names can be similar, read the full product description and nutrition panel before you buy. Explore the range in our [zero sugar seltzers collection](/shop/beer-premix-wine/collection/zero-sugar-seltzers/) and [vodka premix collection](/shop/beer-premix-wine/collection/vodka-premix/).',
      ],
    },
  ],
  'best-mixers-for-home-bar': [
    {
      heading: 'How do you match mixers to spirits?',
      paragraphs: [
        'Gin pairs with tonic, soda and citrus. Vodka is the most flexible and suits soda, tonic, ginger beer, juices and coffee. Whisky and bourbon suit soda, ginger ale or cola, and rum suits cola, ginger beer, lime and pineapple juice. Tequila suits grapefruit soda, lime and sparkling water.',
        'Match intensity: a delicate gin deserves a light tonic, while a bold spiced rum can stand up to cola. Keep the ratio lower in mixer for strong spirits so the spirit’s character shows.',
      ],
    },
    {
      heading: 'How do you make drinks consistently?',
      paragraphs: [
        'Use a jigger to measure, because eyeballing pours leads to unbalanced drinks. Use plenty of ice, fresh citrus and cold mixers. Build drinks in the glass for highballs, and shake or stir for cocktails.',
        'Taste as you go and adjust sweetness or acidity. Over time you will learn your preferred ratios. Our guides to [vodka](/blog/how-vodka-is-made/) and [gin](/blog/london-dry-vs-contemporary-gin/) help you pick a base spirit.',
      ],
    },
  ],
  'macallan-sherry-cask-legacy': [
    {
      heading: 'Is Macallan worth buying as a gift?',
      paragraphs: [
        'Yes, because it is widely recognised, beautifully packaged and consistently well made. A 12 year old Macallan is a safe, impressive gift for someone who enjoys whisky, and an 18 year old is a memorable gift for a milestone. Older bottles are better suited to collectors.',
        'If the recipient is new to whisky, a Double Cask 12 is softer and sweeter. If they like richer, spicier whisky, choose the Sherry Oak. Include the box, since it adds to the presentation. Browse options in our [Scotch whisky collection](/shop/whisky/collection/scotch-whisky/). Buyers must be 18 or over.',
      ],
    },
  ],
  'how-to-store-and-cellar-rare-whisky': [
    {
      heading: 'What are the best storage options for different budgets?',
      paragraphs: [
        'For a few bottles, a cool interior cupboard is enough. For a growing collection, a lockable glass-door cabinet kept out of direct sun helps you display bottles safely. For valuable bottles, consider a dedicated temperature-controlled cabinet or a wine fridge with the temperature set to the mid teens.',
        'If you have a large or high-value collection, professional bonded storage with insurance and climate control may be worth the cost. Whatever you choose, keep an inventory with photos, receipts and purchase dates, and check bottles occasionally for leaks, cork damage and label changes.',
      ],
    },
  ],
  'don-julio-vs-patron-tequila-compared': [
    {
      heading: 'How do you taste Don Julio and Patrón side by side?',
      paragraphs: [
        'Pour 30 mL of each blanco into identical glasses and nose them before tasting. Notice the aroma first: Patrón is often fresher and more citrusy, while Don Julio is rounder and sweeter. Then sip neat, letting the tequila coat your tongue, and compare the finish.',
        'Repeat with the reposados and add a few drops of water to each. Take notes and rate each category. Taste blind with friends to avoid brand bias. It is a good way to find which style suits you.',
      ],
    },
    {
      heading: 'What snacks pair with premium tequila?',
      paragraphs: [
        'Blanco pairs with ceviche, guacamole, grilled prawns and fresh citrus. Reposado suits tacos, grilled chicken and mild cheeses. Añejo suits dark chocolate, roasted nuts, dried fruit and tres leches cake.',
        'Serve with a glass of water and a lime wedge for those who like it. Good tequila is meant to be sipped, so take your time. Explore more styles in our [mezcal versus tequila guide](/blog/mezcal-vs-tequila-difference/).',
      ],
    },
    {
      heading: 'Are Don Julio and Patrón good gifts?',
      paragraphs: [
        'Yes. Both are recognised, widely loved and presented in attractive bottles. Don Julio 1942 in its distinctive bottle is a particularly impressive gift, and Patrón’s bottle design is also iconic. For a cocktail enthusiast, a Patrón Silver with Patrón Citrónge makes a margarita kit.',
        'Consider the recipient’s taste: for sipping choose a reposado or añejo, for cocktails choose a blanco. Include a card with a recipe, and a good lime or two. Buyers must be 18 or over.',
      ],
    },
  ],
  'grey-goose-vs-belvedere-vodka-compared': [
    {
      heading: 'How do you run a blind tasting of premium vodkas?',
      paragraphs: [
        'Chill both vodkas to the same temperature and pour 20 mL each into identical glasses labelled with letters. Have a friend assign the letters so you do not know which is which. Taste each neat, noting aroma, texture and finish, then taste again at room temperature.',
        'Rate each on smoothness, flavour, finish and overall preference, and then reveal the labels. Many people are surprised by their choice. Do the same with a mid-priced vodka for comparison.',
      ],
    },
    {
      heading: 'What snacks and food pair with premium vodka?',
      paragraphs: [
        'Vodka is traditionally served with salty and fatty foods: smoked salmon, caviar, pickles, cured meats and blinis. The cold, clean spirit refreshes the palate. A martini pairs with olives, oysters and salty nuts.',
        'For something simpler, try chilled vodka with a bowl of salty chips. If you want to explore other spirits, see our [mezcal guide](/blog/mezcal-vs-tequila-difference/) and [cognac explained](/blog/cognac-vs-brandy-explained/).',
      ],
    },
    {
      heading: 'Are premium vodkas worth the price?',
      paragraphs: [
        'For sipping chilled and in a martini, a premium vodka is worth the extra cost for its smoothness. For heavily flavoured mixed drinks, it is less so. Use premium vodka where you can taste it, and a good value bottle elsewhere.',
        'Compare price per millilitre, bottle size and gift packaging. Consider a smaller bottle first if you are unsure. As always, drink responsibly and check the standard drinks on the label.',
      ],
    },
  ],
  'beginners-guide-investing-in-rare-whisky': [
    {
      heading: 'What are the alternatives to buying rare bottles?',
      paragraphs: [
        'Instead of rare bottles, some people choose to buy well-known, widely available whisky and drink it, which has no investment risk. Others buy limited releases from distilleries they like, with the main aim of enjoyment and a possible bonus if values rise.',
        'Cask investment schemes and whisky funds exist, but they carry their own risks and fees, so research them carefully and seek independent advice. Traditional investments such as shares and bonds are regulated and more liquid. Whisky should be a small part of a broader plan.',
      ],
    },
    {
      heading: 'What is a sensible way to start collecting?',
      paragraphs: [
        'Choose a theme, such as a favourite distillery, a region or a style, and buy bottles you love. Set a budget and a limit, record every purchase and store bottles properly. Join a whisky society, attend tastings and learn from other collectors.',
        'Buy two bottles of favourite releases when you can, one to drink and one to keep. If you decide to sell, you will have enjoyed the whisky regardless. See our [Scotch whisky collection](/shop/whisky/collection/scotch-whisky/) and [Japanese whisky collection](/shop/whisky/collection/japanese-whisky/). Buyers must be 18 or over.',
      ],
    },
  ],
};
