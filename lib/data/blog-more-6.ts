import type { BlogPost } from '@/lib/types';

type Sections = NonNullable<BlogPost['sections']>;

/** Extra sections appended after the main guide sections (Macallan, storage, tequila and vodka comparisons, investing). */
export const BLOG_MORE_6: Record<string, Sections> = {
  'macallan-sherry-cask-legacy': [
    {
      heading: 'What are the main Macallan ranges?',
      paragraphs: [
        'Sherry Oak is the classic range, in 12, 18, 25 and 30 year old expressions. Double Cask combines American and European sherry-seasoned oak. Triple Cask Matured uses sherry-seasoned European and American oak and ex-bourbon American oak. The Colour Collection and the Edition series are limited releases, and Rare Cask and Harmony are high-end collections.',
        'Each range targets a different taste and budget, so read the description before you buy. If you are new to Macallan, a 12 year old is the standard starting point.',
      ],
    },
    {
      heading: 'How do you avoid fake Macallan?',
      paragraphs: [
        'Macallan is among the most counterfeited whiskies in the world, particularly rare bottles. Buy from reputable retailers with clear provenance, inspect the label, capsule, bottle shape and batch code, and be suspicious of prices that seem too low.',
        'Keep receipts and original boxes, and consider authenticating very valuable bottles before you buy at auction. Our [investing guide](/blog/beginners-guide-investing-in-rare-whisky/) covers authenticity and provenance in more detail.',
      ],
    },
    {
      heading: 'How do you serve and pair Macallan?',
      paragraphs: [
        'Serve neat in a tulip glass at room temperature, adding a few drops of water if you like. The 12 year old Sherry Oak pairs with dark chocolate, orange peel and roasted nuts. The 18 year old pairs with aged cheese, dried fruit and rich desserts.',
        'Allow the whisky a few minutes in the glass to open up. For a related style, compare with other sherried malts in our [Scotch collection](/shop/whisky/collection/scotch-whisky/). Buyers must be 18 or over.',
      ],
    },
  ],
  'how-to-store-and-cellar-rare-whisky': [
    {
      heading: 'How do you store whisky during an Australian summer?',
      paragraphs: [
        'Heat is the main threat in Australia. Avoid garages, sheds, cars and rooms that heat up in the afternoon, and avoid shelves near ovens, windows or air-conditioning vents. A cupboard in a cool, interior room works well, and a wine fridge set to a moderate temperature is useful for valuable bottles.',
        'If you must store whisky in a warm place, keep bottles in boxes and in the coolest area available. Temperature swings are more harmful than steady warmth.',
      ],
    },
    {
      heading: 'Do you need to decant whisky?',
      paragraphs: [
        'No. Decanting is for serving, not storage. A decanter looks good, but a poorly sealed decanter lets whisky oxidise, and lead crystal should not be used for long-term storage because lead can leach into the spirit. For short-term serving, use a decanter with a tight stopper.',
        'For storage, keep whisky in its original bottle with the original closure.',
      ],
    },
    {
      heading: 'How should you transport and gift whisky?',
      paragraphs: [
        'Keep bottles upright and padded, and never leave them in a hot car. Use the original box or a padded bag, and avoid shaking. If you are giving a bottle as a gift, a box protects the label and presents it well.',
        'For shipping, use packaging designed for bottles with padding on all sides. Doctors of Whisky offers insured delivery across Australia. Compare gift options in our [Scotch whisky collection](/shop/whisky/collection/scotch-whisky/).',
      ],
    },
  ],
  'don-julio-vs-patron-tequila-compared': [
    {
      heading: 'How do you make a margarita and a paloma?',
      paragraphs: [
        'Margarita: shake 60 mL blanco tequila, 30 mL fresh lime juice and 30 mL orange liqueur with ice, then strain over fresh ice in a salt-rimmed glass. For a less sweet drink, reduce the liqueur. Paloma: pour 45 mL blanco tequila over ice, add a squeeze of lime and top with grapefruit soda.',
        'Use fresh lime juice and good ice. For the orange liqueur, see [Cointreau](/shop/spirit/cointreau-orange-liqueur/).',
      ],
    },
    {
      heading: 'What is in the Don Julio range?',
      paragraphs: [
        'Don Julio Blanco, Reposado and Añejo form the core, and Don Julio 1942 is the luxury añejo. Don Julio 70 is a clear añejo (cristalino), and Don Julio Real is an extra añejo. Some limited editions and collaborations are released occasionally.',
        'Browse the range in our [Don Julio collection](/shop/spirit/collection/don-julio/), and read about reposado and añejo ageing in our [tequila aging guide](/blog/tequila-aging-guide-blanco-reposado-anejo/).',
      ],
    },
    {
      heading: 'What is in the Patrón range?',
      paragraphs: [
        'Patrón Silver, Reposado and Añejo are the core expressions, with Gran Patrón as the premium line. Patrón also makes coffee and orange liqueurs: Patrón XO Café is a coffee liqueur blending tequila and coffee, and Patrón Citrónge is an orange liqueur.',
        'See them in our [Patrón collection](/shop/spirit/collection/patron/), including the [Patrón XO Café](/shop/spirit/patron-cafe-xo-750ml-patron/) and [Citrónge](/shop/spirit/patron-citronge-1l-patron/).',
      ],
    },
  ],
  'grey-goose-vs-belvedere-vodka-compared': [
    {
      heading: 'How do you make and serve a premium vodka martini?',
      paragraphs: [
        'Chill the glass and the vodka. Stir 60 mL vodka and 10 mL dry vermouth with plenty of ice for about 30 seconds, then strain into the chilled glass. Garnish with a lemon twist or olives. For a dirty martini, add a splash of olive brine.',
        'For a bone-dry martini, rinse the glass with vermouth and discard it. Shake it if you prefer a colder, slightly cloudier drink, though stirring gives a silkier texture.',
      ],
    },
    {
      heading: 'What is in the Grey Goose and Belvedere ranges?',
      paragraphs: [
        'Grey Goose includes the original vodka, Altius, and flavoured and Essences variants. Our range also includes [Grey Goose Altius](/shop/spirit/grey-goose-altius-ultra-premium-french-vodka/) and [Grey Goose 1L](/shop/spirit/grey-goose-1l-grey-goose/). Belvedere offers its Pure vodka, flavoured vodkas such as citrus and ginger zest, and single-estate rye releases such as Smogóry Forest and Lake Bartężek.',
        'Single-estate vodkas highlight differences in the rye and terroir, and they are an interesting step for enthusiasts.',
      ],
    },
    {
      heading: 'How do you choose a size and gift?',
      paragraphs: [
        'A 700 mL bottle is the standard size, 1 L offers better value per millilitre, and smaller bottles such as 200 mL make good samples and gifts. Limited-edition bottles and gift boxes make attractive presents.',
        'Store vodka in the freezer if you like it very cold, and keep it sealed. Compare with other styles in our [Russian vodka collection](/shop/spirit/collection/russian-vodka/) and read [how vodka is made](/blog/how-vodka-is-made/).',
      ],
    },
  ],
  'beginners-guide-investing-in-rare-whisky': [
    {
      heading: 'Where do you buy and sell rare whisky?',
      paragraphs: [
        'Retailers sell new releases and stocked bottles, auction houses and online auctions handle the secondary market, and dealers and brokers specialise in rare bottles. Each has different fees and risks. Auctions can give the best price but charge buyer’s and seller’s fees, while dealers offer convenience but usually take a margin.',
        'Check reviews and track records, ask for authentication, and compare fees before you commit. When selling, factor in time, because a bottle may take weeks or months to sell at the price you want.',
      ],
    },
    {
      heading: 'What are the red flags to watch for?',
      paragraphs: [
        'Prices far below market, sellers who refuse to provide extra photos or batch codes, bottles with missing or damaged seals, inconsistent label printing, a low or unusual fill level and vague provenance are all warning signs. Be careful with private sales and social media offers.',
        'If in doubt, walk away. A genuine bargain is rare, and a fake bottle is worthless.',
      ],
    },
    {
      heading: 'What about tax, insurance and record keeping?',
      paragraphs: [
        'Tax treatment can depend on your circumstances and how you hold and sell the whisky, so speak to a tax adviser before buying significant bottles. Keep receipts, photos and condition notes for each bottle, since they support provenance and insurance claims.',
        'Check whether your home and contents insurance covers alcohol and collectables, and what limits apply. If not, specialist cover may be available. This is general information only and not financial advice.',
      ],
    },
  ],
};
