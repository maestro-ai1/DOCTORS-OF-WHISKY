import type { BlogPost } from '@/lib/types';

type Sections = NonNullable<BlogPost['sections']>;

/** Extra sections appended after the main guide sections (vodka, tequila, mezcal, cognac, gin). */
export const BLOG_MORE_2: Record<string, Sections> = {
  'how-vodka-is-made': [
    {
      heading: 'What should good vodka taste like?',
      paragraphs: [
        'Good vodka is clean, with no harsh burn, chemical or medicinal smell. Chilled, it should feel smooth and slightly oily on the tongue. At room temperature you may notice subtle notes of grain, vanilla, pepper, citrus or sweetness, depending on the base.',
        'Taste vodkas in small glasses, both at room temperature and chilled. If you notice an alcohol sting at the back of the throat or a harsh finish, it usually points to a poorly cut or poorly filtered spirit. Cheap vodka can still be fine for mixing, but a premium bottle shows its quality when sipped.',
      ],
    },
    {
      heading: 'How do flavoured vodkas and infusions work?',
      paragraphs: [
        'Flavoured vodka is made by adding natural or artificial flavour, and sometimes sugar, after distillation. Some brands use real fruit essences, while others rely on sweeteners, so compare labels. Flavoured vodka is easy to mix and suits casual drinks.',
        'You can also infuse your own. Steep fresh fruit, chilli, vanilla beans or herbs in plain vodka for a few days, taste regularly and then strain. Use a clean glass jar, keep it in a cool place and drink within a few months.',
      ],
    },
    {
      heading: 'What are the best vodka cocktails to make at home?',
      paragraphs: [
        'A Vodka Martini: 60 mL vodka and 10 mL dry vermouth, stirred with ice and served with a lemon twist or olives. A Cosmopolitan: 40 mL vodka, 15 mL Cointreau, 15 mL lime juice and 30 mL cranberry juice, shaken. A Moscow Mule: 45 mL vodka, lime juice and ginger beer over ice in a mug.',
        'A Bloody Mary uses vodka, tomato juice, lemon, Worcestershire sauce and spice. A Vodka Soda is the simplest of all. For more ideas, see our guide to the [best mixers for your home bar](/blog/best-mixers-for-home-bar/) and browse [orange liqueur](/shop/spirit/collection/orange-liqueur/) for Cosmopolitans.',
      ],
    },
  ],
  'tequila-aging-guide-blanco-reposado-anejo': [
    {
      heading: 'What are the common tequila myths?',
      paragraphs: [
        'There is no worm in tequila, which is a mezcal marketing tradition. Tequila is not meant to be a shot with salt and lime, a habit that began to mask poor quality. Gold tequila is not necessarily aged: most gold tequila is a mixto coloured with caramel. And tequila is not made from cactus: it comes from the blue Weber agave, which is a succulent related to lilies.',
        'Another myth is that añejo is always better. It is smoother and more complex, but blanco tastes more of the plant and is often the better cocktail base.',
      ],
    },
    {
      heading: 'What are the classic tequila cocktails?',
      paragraphs: [
        'A Margarita: 60 mL blanco tequila, 30 mL lime juice and 30 mL orange liqueur such as Cointreau, shaken with ice and strained over a salted rim. A Paloma: 45 mL blanco, lime juice and grapefruit soda over ice. Ranch Water: tequila, lime and sparkling mineral water. A Tequila Sunrise combines tequila, orange juice and grenadine.',
        'Use a 100% agave blanco or reposado for the best result. Browse [Cointreau and other orange liqueurs](/shop/spirit/collection/orange-liqueur/) to complete your margarita kit.',
      ],
    },
    {
      heading: 'What is the difference between highland and lowland tequila?',
      paragraphs: [
        'Tequila from Jalisco’s highlands (Los Altos) tends to be sweeter, fruitier and floral, because the red clay soil and cooler climate produce larger, sweeter agave. Tequila from the lowlands (the valley around the town of Tequila) is more earthy, herbal and peppery.',
        'Neither is better. If you like soft and fruity tequila, look for highland producers, and if you like savoury and earthy tequila, try lowland ones. The producer’s website or label may state the region.',
      ],
    },
  ],
  'mezcal-vs-tequila-difference': [
    {
      heading: 'What are the best mezcal cocktails?',
      paragraphs: [
        'A Mezcal Margarita swaps tequila for mezcal for a smoky twist. The Oaxaca Old Fashioned, created by bartender Phil Ward in 2007, combines reposado tequila, a little mezcal, agave syrup and bitters. A Mezcal Negroni uses equal parts mezcal, Campari and sweet vermouth. A Mezcal Paloma adds smoke to grapefruit and lime.',
        'Use a lightly smoky joven espadín as your cocktail base, and keep the more complex mezcals for sipping. See other bottles in our [mezcal collection](/shop/spirit/collection/mezcal/).',
      ],
    },
    {
      heading: 'Is mezcal sustainable?',
      paragraphs: [
        'Mezcal’s growth has raised sustainability concerns. Agave plants take 7 to 30 years to mature depending on the species, and over-harvesting of wild agave, deforestation for firewood and monoculture are real issues. Producers who replant, use sustainable firewood and cultivate a mix of species help protect the industry.',
        'Choose brands that name their agave, region and producer, which signals traceability. Rarer wild agaves are best treated as occasional luxuries.',
      ],
    },
    {
      heading: 'What food goes with mezcal?',
      paragraphs: [
        'Traditionally, mezcal is served with orange slices dusted with sal de gusano. In Oaxaca it is also paired with tlayudas, mole, grilled meats and chapulines (toasted grasshoppers). The smoke and acidity cut through rich, spicy food.',
        'Try it with barbecued meats, smoked cheese, dark chocolate and tropical fruit. Smoky mezcal can also stand up to strong flavours that overwhelm more delicate spirits. Compare it with [reposado tequila](/blog/tequila-aging-guide-blanco-reposado-anejo/) for a different style.',
      ],
    },
  ],
  'cognac-vs-brandy-explained': [
    {
      heading: 'What do Napoléon and Hors d’Âge mean?',
      paragraphs: [
        'Beyond VS, VSOP and XO, you may see Napoléon and Hors d’Âge. Napoléon is a blend with a youngest component of at least six years, usually sitting between VSOP and XO. Hors d’Âge means “beyond age” and is a legal equivalent of XO, with a minimum of ten years, though houses often use it for exceptionally old blends.',
        'The best way to judge a premium cognac is by the house, the cru and the tasting notes, rather than the age term alone.',
      ],
    },
    {
      heading: 'What are the best cognac cocktails?',
      paragraphs: [
        'The Sidecar: 50 mL cognac, 20 mL Cointreau and 20 mL lemon juice, shaken and strained into a chilled glass. The French Connection: cognac and amaretto over ice. The Vieux Carré: rye, cognac, sweet vermouth, Bénédictine and bitters. A cognac and ginger ale is a simple highball.',
        'Use a VS or VSOP for cocktails and save XO for sipping. Browse [Cointreau](/shop/spirit/cointreau-orange-liqueur/) for your Sidecar.',
      ],
    },
    {
      heading: 'How do Cognac, Armagnac and Calvados compare?',
      paragraphs: [
        'Armagnac comes from Gascony and is typically distilled once in a column still, giving a more rustic, fuller spirit that is often released as vintages. Calvados is apple (and pear) brandy from Normandy. Cognac is double distilled in pot stills, giving a refined, floral and layered style.',
        'If you enjoy cognac, Armagnac is a rewarding next step, and Calvados offers a fruit-forward alternative. All three are best enjoyed neat. For another aged spirit comparison, read our [single malt versus blended Scotch guide](/blog/single-malt-vs-blended-scotch/).',
      ],
    },
  ],
  'london-dry-vs-contemporary-gin': [
    {
      heading: 'What botanicals are used in gin?',
      paragraphs: [
        'Juniper is essential. Coriander seed adds citrus and spice, angelica root adds earthy depth and helps fix aromas, and orris root adds a floral, powdery note. Citrus peel (lemon, orange, grapefruit), cassia or cinnamon, cardamom, liquorice and grains of paradise are also common.',
        'Contemporary gins add cucumber, rose, lavender, tea, seaweed and native Australian botanicals such as lemon myrtle and pepperberry. The best way to discover a favourite is to taste the gin neat first, then in a G&T.',
      ],
    },
    {
      heading: 'What are the best gin cocktails?',
      paragraphs: [
        'The Dry Martini: 60 mL gin and 10 mL dry vermouth, stirred with ice and served with a lemon twist or olive. The Negroni: equal parts gin, Campari and sweet vermouth. The Tom Collins: gin, lemon juice, sugar and soda. The Gimlet: gin and lime cordial or fresh lime and sugar.',
        'Use a London dry for martinis and Negronis, and a contemporary gin for a Gin and Tonic that highlights unusual botanicals.',
      ],
    },
    {
      heading: 'What is the difference between distilled gin and compound gin?',
      paragraphs: [
        'Distilled gin is made by redistilling a neutral spirit with botanicals. London dry is a type of distilled gin. Compound gin is made by simply mixing flavouring into neutral alcohol without redistilling, and it is usually cheaper and less refined.',
        'Gin liqueur and flavoured gin, such as pink gin, may have added sugar and lower ABV. Check the label for style and ABV. Browse our [gin collection](/shop/spirit/collection/gin/) for classic and modern styles.',
      ],
    },
  ],
};
