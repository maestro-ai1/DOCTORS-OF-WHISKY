import { CategoryGroup } from '@/lib/types';

export const MAIN_CATEGORIES: CategoryGroup[] = [
  {
    id: 'whisky',
    name: 'WHISKY',
    slug: 'whisky',
    description: "Australia's most prestigious collection of rare single malts, aged Japanese whiskies, and limited distillery releases.",
    subGroups: [
      {
        title: 'Shop by Collection',
        items: [
          { label: 'Scotch Whisky', href: '/shop/whisky/collection/scotch-whisky' },
          { label: 'Bourbon', href: '/shop/whisky/collection/bourbon' },
          { label: 'Rye Whiskey', href: '/shop/whisky/collection/rye-whiskey' },
          { label: 'Japanese Whisky', href: '/shop/whisky/collection/japanese-whisky' },
          { label: 'Australian Whisky', href: '/shop/whisky/collection/australian-whisky' },
        ]
      },
      {
        title: 'By Brand',
        items: [
          { label: 'The Macallan', href: '/shop?category=whisky&brand=The Macallan', filterKey: 'brand', filterVal: 'The Macallan' },
          { label: 'Nikka', href: '/shop?category=whisky&brand=Nikka', filterKey: 'brand', filterVal: 'Nikka' },
          { label: 'GlenDronach', href: '/shop?category=whisky&brand=GlenDronach', filterKey: 'brand', filterVal: 'GlenDronach' },
          { label: 'Glenfiddich', href: '/shop?category=whisky&brand=Glenfiddich', filterKey: 'brand', filterVal: 'Glenfiddich' },
          { label: 'Lark (Tasmania)', href: '/shop?category=whisky&brand=Lark', filterKey: 'brand', filterVal: 'Lark' },
          { label: 'Laphroaig', href: '/shop?category=whisky&brand=Laphroaig', filterKey: 'brand', filterVal: 'Laphroaig' },
          { label: 'Johnnie Walker', href: '/shop?category=whisky&brand=Johnnie Walker', filterKey: 'brand', filterVal: 'Johnnie Walker' },
          { label: 'Royal Salute', href: '/shop?category=whisky&brand=Royal Salute', filterKey: 'brand', filterVal: 'Royal Salute' },
        ]
      },
      {
        title: 'By Style',
        items: [
          { label: 'Single Malt', href: '/shop?category=whisky&style=Single Malt', filterKey: 'style', filterVal: 'Single Malt' },
          { label: 'Bourbon & American', href: '/shop?category=whisky&style=Bourbon', filterKey: 'style', filterVal: 'Bourbon' },
          { label: 'Rye Whiskey', href: '/shop?category=whisky&style=Rye', filterKey: 'style', filterVal: 'Rye' },
          { label: 'Blended Scotch', href: '/shop?category=whisky&style=Blended Scotch', filterKey: 'style', filterVal: 'Blended Scotch' },
          { label: 'Pure Malt', href: '/shop?category=whisky&style=Pure Malt', filterKey: 'style', filterVal: 'Pure Malt' }
        ]
      },
      {
        title: 'By Country',
        items: [
          { label: 'Scotch Whisky', href: '/shop?category=whisky&country=Scotland', filterKey: 'country', filterVal: 'Scotland' },
          { label: 'Japanese Whisky', href: '/shop?category=whisky&country=Japan', filterKey: 'country', filterVal: 'Japan' },
          { label: 'Australian Whisky', href: '/shop?category=whisky&country=Australia', filterKey: 'country', filterVal: 'Australia' },
          { label: 'American Whiskey', href: '/shop?category=whisky&country=United States', filterKey: 'country', filterVal: 'United States' },
          { label: 'Irish Whiskey', href: '/shop?category=whisky&country=Ireland', filterKey: 'country', filterVal: 'Ireland' }
        ]
      },
      {
        title: 'By Price',
        items: [
          { label: 'Under $500 AUD', href: '/shop?category=whisky&priceMax=500' },
          { label: '$500 – $1,000 AUD', href: '/shop?category=whisky&priceMin=500&priceMax=1000' },
          { label: '$1,000 – $2,500 AUD', href: '/shop?category=whisky&priceMin=1000&priceMax=2500' },
          { label: 'Over $2,500 (Vault Reserve)', href: '/shop?category=whisky&priceMin=2500' }
        ]
      },
      {
        title: 'By Type & Region',
        items: [
          { label: 'Over 20 Years Aged', href: '/shop?category=whisky&badge=RARE VAULT' },
          { label: 'Under 20 Years', href: '/shop?category=whisky' },
          { label: 'Islay Region (Peated)', href: '/shop?category=whisky&search=Islay' },
          { label: 'Speyside Region', href: '/shop?category=whisky&search=Speyside' },
          { label: 'Highland Region', href: '/shop?category=whisky&search=Highland' },
          { label: 'Limited Editions & Rare Bottles', href: '/shop?category=whisky&badge=COLLECTOR RELEASE' }
        ]
      }
    ]
  },
  {
    id: 'spirit',
    name: 'SPIRIT',
    slug: 'spirit',
    description: 'Rare Cognac decanters, artisanal extra añejo tequilas, ultra-pure vodkas, and monastery herbal liqueurs.',
    subGroups: [
      {
        title: 'Shop by Collection',
        items: [
          { label: 'Vodka', href: '/shop/spirit/collection/vodka' },
          { label: 'Tequila', href: '/shop/spirit/collection/tequila' },
          { label: 'Mezcal', href: '/shop/spirit/collection/mezcal' },
          { label: 'Cognac & Brandy', href: '/shop/spirit/collection/cognac-brandy' },
          { label: 'Gin', href: '/shop/spirit/collection/gin' },
          { label: 'Rum', href: '/shop/spirit/collection/rum' },
          { label: 'Baijiu', href: '/shop/spirit/collection/baijiu' },
          { label: 'Italian Liqueurs & Aperitifs', href: '/shop/spirit/collection/italian-liqueurs' },
          { label: 'Flavoured & Cream Liqueurs', href: '/shop/spirit/collection/flavoured-cream-liqueurs' },
        ]
      },
      {
        title: 'Brandy & Cognac',
        items: [
          { label: 'Cognac (Grande Champagne)', href: '/shop?category=spirit&search=Cognac' },
          { label: 'Louis XIII & Rémy Martin', href: '/shop?category=spirit&search=Remy' },
          { label: 'Martell Cordon Bleu', href: '/shop?category=spirit&search=Martell' },
          { label: 'Calvados Reserve', href: '/shop?category=spirit&search=Calvados' }
        ]
      },
      {
        title: 'Liqueur & Aperitif',
        items: [
          { label: 'Chartreuse V.E.P. & Herbal', href: '/shop?category=spirit&search=Chartreuse' },
          { label: 'Baileys & Coffee Liqueurs', href: '/shop?category=spirit&search=Liqueur' },
          { label: 'Campari, Aperol & Amaro', href: '/shop?category=spirit&search=Amaro' },
          { label: 'Cointreau & Grand Marnier', href: '/shop?category=spirit&search=Orange' }
        ]
      },
      {
        title: 'Vodka',
        items: [
          { label: 'Grey Goose Altius & French', href: '/shop?category=spirit&search=Grey Goose' },
          { label: 'Belvedere 10 & Diamond Rye', href: '/shop?category=spirit&search=Belvedere' },
          { label: 'Polish & Russian Vodka', href: '/shop?category=spirit&search=Vodka' }
        ]
      },
      {
        title: 'Tequila & Mezcal',
        items: [
          { label: 'Don Julio 1942 Ultima Reserva', href: '/shop?category=spirit&search=Don Julio' },
          { label: 'Gran Patrón Burdeos', href: '/shop?category=spirit&search=Patron' },
          { label: 'Extra Añejo & Mezcal', href: '/shop?category=spirit&search=Tequila' }
        ]
      },
      {
        title: 'Rum, Gin & Baijiu',
        items: [
          { label: 'Kweichow Moutai 53% Baijiu', href: '/shop?category=spirit&search=Moutai' },
          { label: 'Diplomatico & Dark Premium Rum', href: '/shop?category=spirit&search=Rum' },
          { label: 'Artisanal & Distiller Gin', href: '/shop?category=spirit&search=Gin' }
        ]
      }
    ]
  },
  {
    id: 'beer-premix-wine',
    name: 'BEER / PREMIX / WINE',
    slug: 'beer-premix-wine',
    description: 'Heritage Australian Icon Wines, Vintage Champagnes, Master Cask Beers, and Luxury Premixes.',
    subGroups: [
      {
        title: 'Shop by Collection',
        items: [
          { label: 'Red Wine', href: '/shop/beer-premix-wine/collection/red-wine' },
          { label: 'White Wine', href: '/shop/beer-premix-wine/collection/white-wine' },
          { label: 'Rosé Wine', href: '/shop/beer-premix-wine/collection/rose-wine' },
          { label: 'Sparkling & Fortified Wine', href: '/shop/beer-premix-wine/collection/sparkling-fortified-wine' },
          { label: 'Craft & Imported Beer', href: '/shop/beer-premix-wine/collection/craft-imported-beer' },
          { label: 'Non-Alcoholic Beer', href: '/shop/beer-premix-wine/collection/non-alcoholic-beer' },
          { label: 'Cider', href: '/shop/beer-premix-wine/collection/cider' },
          { label: 'Vodka & Gin Premix', href: '/shop/beer-premix-wine/collection/vodka-gin-premix' },
          { label: 'Zero Sugar Seltzers', href: '/shop/beer-premix-wine/collection/zero-sugar-seltzers' },
        ]
      },
      {
        title: 'Icon & Fine Wine',
        items: [
          { label: 'Penfolds Grange Shiraz', href: '/shop?category=beer-premix-wine&search=Penfolds' },
          { label: 'Australian Red Wine', href: '/shop?category=beer-premix-wine&search=Shiraz' },
          { label: 'Dom Pérignon Vintage Champagne', href: '/shop?category=beer-premix-wine&search=Champagne' },
          { label: 'Sparkling & Vintage Port', href: '/shop?category=beer-premix-wine&search=Sparkling' }
        ]
      },
      {
        title: 'Craft Beer',
        items: [
          { label: 'Coopers Master Vintage Ale', href: '/shop?category=beer-premix-wine&search=Ale' },
          { label: 'Pale Ale & IPA Reserve', href: '/shop?category=beer-premix-wine&search=Beer' },
          { label: 'Ginger Beer & Imported Lager', href: '/shop?category=beer-premix-wine&search=Lager' }
        ]
      },
      {
        title: 'Luxury Premix',
        items: [
          { label: 'Hard FIZZ Ultra Premix', href: '/shop?category=beer-premix-wine&search=Premix' },
          { label: 'Vodka & Gin Premix Cases', href: '/shop?category=beer-premix-wine&search=Premix' },
          { label: 'Zero Sugar Crafted Mixers', href: '/shop?category=beer-premix-wine&search=Zero' }
        ]
      }
    ]
  },
  {
    id: 'other',
    name: 'OTHER',
    slug: 'other',
    description: 'Collector glassware, Korean Heritage Soju, artisan tonics, and rare condiments.',
    subGroups: [
      {
        title: 'Shop by Collection',
        items: [
          { label: 'Soju', href: '/shop/other/collection/soju' },
          { label: 'Mixers, Water & Condiments', href: '/shop/other/collection/mixers-water-condiments' },
        ]
      },
      {
        title: 'Specialty Spirits & Soju',
        items: [
          { label: 'Ilpoom Jinro Heritage Soju', href: '/shop?category=other&search=Jinro' },
          { label: 'Artisanal Cider Selection', href: '/shop?category=other&search=Cider' }
        ]
      },
      {
        title: 'Mixers & Mineral Water',
        items: [
          { label: 'San Pellegrino Oak Edition', href: '/shop?category=other&search=Water' },
          { label: 'Premium Craft Tonic & Energy', href: '/shop?category=other&search=Energy' }
        ]
      }
    ]
  }
];
