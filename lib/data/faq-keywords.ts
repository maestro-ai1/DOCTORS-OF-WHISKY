import type { FaqItem } from '@/lib/types';

// FAQ entries written around Navigational / Informational keywords from the Semrush bank (KD <= 28).
// Answers use only public category facts (scripts/seo-content-data.mjs) and the store rules in lib/config.ts.
// kw = the bank keyword the question targets (volume / KD in the trailing comment).
export const KEYWORD_FAQS: (FaqItem & { kw: string })[] = [
  {
    kw: 'what is cognac', // 1000 / KD 21
    question: 'What is cognac?',
    answer:
      'Cognac is a brandy made from white grapes in the Cognac region of France, double-distilled in copper pot stills and aged in oak, with ages labelled VS, VSOP and XO. Browse our cognac and brandy range to compare labels and sizes, with insured delivery across Australia.',
  },
  {
    kw: 'is ginger beer alcoholic', // 720 / KD 17
    question: 'Is ginger beer alcoholic?',
    answer:
      'It depends on the bottle: ginger beer is a ginger-flavoured drink that is either non-alcoholic or brewed alcoholic, so check the ABV on the label. It is also a classic mixer for the Dark and Stormy and Moscow Mule. See our ginger beer range for the current bottles.',
  },
  {
    kw: 'bourbon is whiskey', // 590 / KD 17
    question: 'Is bourbon whiskey?',
    answer:
      'Yes. Bourbon is American whiskey made from a mash of at least 51% corn and aged in new charred oak containers, which gives its vanilla and caramel character. Explore our bourbon collection and have it delivered Australia-wide.',
  },
  {
    kw: 'what is mezcal', // 590 / KD 28
    question: 'What is mezcal?',
    answer:
      'Mezcal is a Mexican agave spirit, most often made from espadín agave, with a smoky character from roasting the agave hearts in earthen pits. Shop our mezcal range online and we deliver insured across Australia.',
  },
  {
    kw: 'what is baileys irish cream', // what is baileys 390 / KD 22
    question: 'What is Baileys Irish Cream?',
    answer:
      'Baileys Irish Cream is a liqueur made from Irish whiskey and cream, first launched in 1974. See our Baileys Irish Cream collection for the available flavours and sizes.',
  },
  {
    kw: 'what is ipa beer', // 390 / KD 20
    question: 'What is IPA beer?',
    answer:
      'IPA stands for India pale ale, a hop-forward style of pale ale. If you prefer something crisper, lager is a bottom-fermented beer conditioned cold for a clean taste. Browse our imported beer and lager ranges.',
  },
  {
    kw: 'what is a lager', // 390 / KD 27
    question: 'What is a lager?',
    answer:
      'Lager is a bottom-fermented beer conditioned cold, giving a crisp, clean taste. Our lager and imported beer collections list the current bottles, with insured delivery across Australia.',
  },
  {
    kw: 'what is limoncello liqueur', // 390 / KD 14
    question: 'What is limoncello liqueur?',
    answer:
      'Limoncello is an Italian lemon liqueur made by steeping lemon zest in spirit and sweetening it with sugar syrup. Shop our limoncello range online with delivery Australia-wide.',
  },
  {
    kw: 'what is a absinthe', // 210 / KD 27
    question: 'What is absinthe?',
    answer:
      'Absinthe is a high-strength anise-flavoured spirit made with wormwood, fennel and anise, traditionally diluted with iced water. See our absinthe collection for current bottles; every delivery needs an adult (18+) signature.',
  },
  {
    kw: 'what is cider drink', // 210 / KD 20
    question: 'What is cider?',
    answer:
      'Cider is a fermented apple (or pear) drink that ranges from dry to sweet, and is popular across Australia. Browse our cider collection to buy online with insured delivery.',
  },
  {
    kw: 'what is amaro', // amaro 3600 / KD 27
    question: 'What is amaro?',
    answer:
      'Amaro is an Italian bittersweet herbal liqueur, traditionally sipped after a meal; Aperol and Campari belong to the wider Italian bitter family. Explore our amaro range to buy online.',
  },
  {
    kw: 'what is soju', // soju 22200 (Commercial); soju alcohol 1600
    question: 'What is soju and is it alcoholic?',
    answer:
      'Soju is a clear Korean spirit, traditionally made from rice and now often from other starches, usually bottled at a lower strength than most spirits, so it is alcoholic. Check the ABV on the label of the bottle you choose. See our soju collection.',
  },
];
