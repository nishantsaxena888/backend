export interface LiquorProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  brand: string;
  volume: string;
  abv: string; // Alcohol by volume
  description?: string;
  inStock: boolean;
  stockCount?: number;
  origin?: string;
  type?: string;
  year?: string;
}

export const liquorProducts: LiquorProduct[] = [
  // Premium Whiskey
  {
    id: 'whiskey-1',
    title: 'Johnnie Walker Blue Label',
    price: 189.99,
    originalPrice: 219.99,
    rating: 4.9,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1651410634315-56a535912396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGlza2V5JTIwYm90dGxlJTIwYmFyfGVufDF8fHx8MTc2NTY2NTk1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Whiskey',
    brand: 'Johnnie Walker',
    volume: '750ml',
    abv: '40%',
    description: 'An exquisite blend of rare whiskies, smooth and sophisticated',
    inStock: true,
    stockCount: 12,
    origin: 'Scotland',
    type: 'Blended Scotch Whisky'
  },
  {
    id: 'whiskey-2',
    title: 'Jack Daniels Old No. 7',
    price: 24.99,
    rating: 4.7,
    reviews: 856,
    image: 'https://images.unsplash.com/photo-1651410634315-56a535912396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGlza2V5JTIwYm90dGxlJTIwYmFyfGVufDF8fHx8MTc2NTY2NTk1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Whiskey',
    brand: 'Jack Daniels',
    volume: '750ml',
    abv: '40%',
    description: 'Classic Tennessee whiskey, charcoal mellowed for smoothness',
    inStock: true,
    stockCount: 45,
    origin: 'Tennessee, USA',
    type: 'Tennessee Whiskey'
  },
  {
    id: 'whiskey-3',
    title: 'Jameson Irish Whiskey',
    price: 27.99,
    rating: 4.6,
    reviews: 623,
    image: 'https://images.unsplash.com/photo-1651410634315-56a535912396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGlza2V5JTIwYm90dGxlJTIwYmFyfGVufDF8fHx8MTc2NTY2NTk1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Whiskey',
    brand: 'Jameson',
    volume: '750ml',
    abv: '40%',
    description: 'Triple distilled Irish whiskey with a smooth, balanced taste',
    inStock: false,
    stockCount: 0,
    origin: 'Ireland',
    type: 'Irish Whiskey'
  },
  {
    id: 'whiskey-4',
    title: 'Glenfiddich 12 Year Single Malt',
    price: 54.99,
    rating: 4.8,
    reviews: 445,
    image: 'https://images.unsplash.com/photo-1651410634315-56a535912396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGlza2V5JTIwYm90dGxlJTIwYmFyfGVufDF8fHx8MTc2NTY2NTk1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Whiskey',
    brand: 'Glenfiddich',
    volume: '750ml',
    abv: '40%',
    description: 'Aged 12 years in oak casks, rich and fruity single malt',
    inStock: true,
    stockCount: 8,
    origin: 'Scotland',
    type: 'Single Malt Scotch'
  },

  // Premium Vodka
  {
    id: 'vodka-1',
    title: 'Grey Goose Vodka',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviews: 712,
    image: 'https://images.unsplash.com/photo-1619095040463-d10ed2852e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2RrYSUyMGJvdHRsZSUyMGdsYXNzfGVufDF8fHx8MTc2NTY2NTk1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Vodka',
    brand: 'Grey Goose',
    volume: '750ml',
    abv: '40%',
    description: 'Premium French vodka, exceptionally smooth and pure',
    inStock: true,
    stockCount: 32,
    origin: 'France',
    type: 'Premium Vodka'
  },
  {
    id: 'vodka-2',
    title: 'Absolut Vodka Original',
    price: 19.99,
    rating: 4.5,
    reviews: 934,
    image: 'https://images.unsplash.com/photo-1619095040463-d10ed2852e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2RrYSUyMGJvdHRsZSUyMGdsYXNzfGVufDF8fHx8MTc2NTY2NTk1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Vodka',
    brand: 'Absolut',
    volume: '750ml',
    abv: '40%',
    description: 'Swedish vodka with rich, full-bodied taste',
    inStock: true,
    stockCount: 67,
    origin: 'Sweden',
    type: 'Premium Vodka'
  },
  {
    id: 'vodka-3',
    title: 'Titos Handmade Vodka',
    price: 23.99,
    rating: 4.7,
    reviews: 1024,
    image: 'https://images.unsplash.com/photo-1619095040463-d10ed2852e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2RrYSUyMGJvdHRsZSUyMGdsYXNzfGVufDF8fHx8MTc2NTY2NTk1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Vodka',
    brand: 'Titos',
    volume: '750ml',
    abv: '40%',
    description: 'American craft vodka, distilled 6 times',
    inStock: true,
    stockCount: 54,
    origin: 'Texas, USA',
    type: 'Craft Vodka'
  },

  // Premium Rum
  {
    id: 'rum-1',
    title: 'Bacardi Superior Rum',
    price: 16.99,
    rating: 4.4,
    reviews: 542,
    image: 'https://images.unsplash.com/photo-1720671820091-0ff031d5a1cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW0lMjBib3R0bGUlMjBjb2NrdGFpbHxlbnwxfHx8fDE3NjU2NjU5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Rum',
    brand: 'Bacardi',
    volume: '750ml',
    abv: '40%',
    description: 'Light, crisp rum perfect for cocktails',
    inStock: true,
    stockCount: 78,
    origin: 'Puerto Rico',
    type: 'White Rum'
  },
  {
    id: 'rum-2',
    title: 'Captain Morgan Spiced Rum',
    price: 21.99,
    rating: 4.6,
    reviews: 689,
    image: 'https://images.unsplash.com/photo-1720671820091-0ff031d5a1cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW0lMjBib3R0bGUlMjBjb2NrdGFpbHxlbnwxfHx8fDE3NjU2NjU5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Rum',
    brand: 'Captain Morgan',
    volume: '750ml',
    abv: '35%',
    description: 'Spiced rum with vanilla and caramel notes',
    inStock: false,
    stockCount: 0,
    origin: 'Caribbean',
    type: 'Spiced Rum'
  },
  {
    id: 'rum-3',
    title: 'Malibu Coconut Rum',
    price: 18.99,
    rating: 4.3,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1720671820091-0ff031d5a1cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW0lMjBib3R0bGUlMjBjb2NrdGFpbHxlbnwxfHx8fDE3NjU2NjU5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Rum',
    brand: 'Malibu',
    volume: '750ml',
    abv: '21%',
    description: 'Caribbean rum with natural coconut flavor',
    inStock: true,
    stockCount: 34,
    origin: 'Barbados',
    type: 'Flavored Rum'
  },

  // Premium Gin
  {
    id: 'gin-1',
    title: 'Tanqueray London Dry Gin',
    price: 26.99,
    rating: 4.7,
    reviews: 534,
    image: 'https://images.unsplash.com/photo-1682618901459-54ae8c166d16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW4lMjB0b25pYyUyMGJvdHRsZXxlbnwxfHx8fDE3NjU2NjU5NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Gin',
    brand: 'Tanqueray',
    volume: '750ml',
    abv: '47.3%',
    description: 'Classic London Dry gin with juniper and botanicals',
    inStock: true,
    stockCount: 29,
    origin: 'England',
    type: 'London Dry Gin'
  },
  {
    id: 'gin-2',
    title: 'Bombay Sapphire Gin',
    price: 24.99,
    rating: 4.6,
    reviews: 678,
    image: 'https://images.unsplash.com/photo-1682618901459-54ae8c166d16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW4lMjB0b25pYyUyMGJvdHRsZXxlbnwxfHx8fDE3NjU2NjU5NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Gin',
    brand: 'Bombay Sapphire',
    volume: '750ml',
    abv: '40%',
    description: 'Premium gin with 10 hand-selected botanicals',
    inStock: true,
    stockCount: 41,
    origin: 'England',
    type: 'Premium Gin'
  },

  // Premium Tequila
  {
    id: 'tequila-1',
    title: 'Patron Silver Tequila',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviews: 423,
    image: 'https://images.unsplash.com/photo-1625869014838-718a21a90549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXF1aWxhJTIwYm90dGxlJTIwbGltZXxlbnwxfHx8fDE3NjU2NjU5NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tequila',
    brand: 'Patron',
    volume: '750ml',
    abv: '40%',
    description: 'Ultra-premium silver tequila, smooth and pure',
    inStock: true,
    stockCount: 18,
    origin: 'Mexico',
    type: 'Silver Tequila'
  },
  {
    id: 'tequila-2',
    title: 'Jose Cuervo Especial Gold',
    price: 19.99,
    rating: 4.3,
    reviews: 756,
    image: 'https://images.unsplash.com/photo-1625869014838-718a21a90549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXF1aWxhJTIwYm90dGxlJTIwbGltZXxlbnwxfHx8fDE3NjU2NjU5NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tequila',
    brand: 'Jose Cuervo',
    volume: '750ml',
    abv: '40%',
    description: 'Golden tequila with smooth, balanced taste',
    inStock: true,
    stockCount: 63,
    origin: 'Mexico',
    type: 'Gold Tequila'
  },
  {
    id: 'tequila-3',
    title: 'Don Julio Blanco',
    price: 44.99,
    rating: 4.8,
    reviews: 389,
    image: 'https://images.unsplash.com/photo-1625869014838-718a21a90549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXF1aWxhJTIwYm90dGxlJTIwbGltZXxlbnwxfHx8fDE3NjU2NjU5NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tequila',
    brand: 'Don Julio',
    volume: '750ml',
    abv: '40%',
    description: 'Premium blanco tequila with crisp agave flavor',
    inStock: false,
    stockCount: 0,
    origin: 'Mexico',
    type: 'Blanco Tequila'
  },

  // Premium Wine
  {
    id: 'wine-1',
    title: 'Caymus Cabernet Sauvignon 2021',
    price: 79.99,
    originalPrice: 89.99,
    rating: 4.9,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1700893417207-99da24343476?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB3aW5lJTIwYm90dGxlfGVufDF8fHx8MTc2NTYwODA3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Wine',
    brand: 'Caymus',
    volume: '750ml',
    abv: '14.5%',
    description: 'Rich, bold Napa Valley Cabernet Sauvignon',
    inStock: true,
    stockCount: 15,
    origin: 'Napa Valley, CA',
    type: 'Red Wine',
    year: '2021'
  },
  {
    id: 'wine-2',
    title: 'La Crema Chardonnay',
    price: 19.99,
    rating: 4.5,
    reviews: 523,
    image: 'https://images.unsplash.com/photo-1642340828763-822a676c1da3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwY2VsbGFyJTIwYm90dGxlc3xlbnwxfHx8fDE3NjU2MzUyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Wine',
    brand: 'La Crema',
    volume: '750ml',
    abv: '13.5%',
    description: 'Elegant California Chardonnay with oak notes',
    inStock: true,
    stockCount: 42,
    origin: 'California, USA',
    type: 'White Wine',
    year: '2022'
  },
  {
    id: 'wine-3',
    title: 'Meiomi Pinot Noir',
    price: 22.99,
    rating: 4.6,
    reviews: 634,
    image: 'https://images.unsplash.com/photo-1700893417207-99da24343476?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB3aW5lJTIwYm90dGxlfGVufDF8fHx8MTc2NTYwODA3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Wine',
    brand: 'Meiomi',
    volume: '750ml',
    abv: '13.5%',
    description: 'Silky California Pinot Noir with berry flavors',
    inStock: true,
    stockCount: 38,
    origin: 'California, USA',
    type: 'Red Wine',
    year: '2022'
  },

  // Premium Beer & Craft
  {
    id: 'beer-1',
    title: 'Corona Extra (12-Pack)',
    price: 16.99,
    rating: 4.4,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1718165658292-68940b6d6635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwYm90dGxlcyUyMGJhcnxlbnwxfHx8fDE3NjU2NjU5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Beer',
    brand: 'Corona',
    volume: '12 x 355ml',
    abv: '4.6%',
    description: 'Mexican lager, refreshing and smooth',
    inStock: true,
    stockCount: 156,
    origin: 'Mexico',
    type: 'Lager'
  },
  {
    id: 'beer-2',
    title: 'Heineken (6-Pack)',
    price: 10.99,
    rating: 4.3,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1718165658292-68940b6d6635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwYm90dGxlcyUyMGJhcnxlbnwxfHx8fDE3NjU2NjU5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Beer',
    brand: 'Heineken',
    volume: '6 x 330ml',
    abv: '5%',
    description: 'Premium Dutch lager with crisp taste',
    inStock: true,
    stockCount: 234,
    origin: 'Netherlands',
    type: 'Lager'
  },
  {
    id: 'beer-3',
    title: 'Blue Moon Belgian White (6-Pack)',
    price: 11.99,
    rating: 4.5,
    reviews: 756,
    image: 'https://images.unsplash.com/photo-1718165658292-68940b6d6635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwYm90dGxlcyUyMGJhcnxlbnwxfHx8fDE3NjU2NjU5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Beer',
    brand: 'Blue Moon',
    volume: '6 x 355ml',
    abv: '5.4%',
    description: 'Belgian-style wheat ale with citrus notes',
    inStock: false,
    stockCount: 0,
    origin: 'Colorado, USA',
    type: 'Wheat Ale'
  }
];

export const liquorCategories = [
  'All Products',
  'Whiskey',
  'Vodka',
  'Rum',
  'Gin',
  'Tequila',
  'Wine',
  'Beer'
];