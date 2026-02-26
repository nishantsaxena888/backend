import { useState } from 'react';
import { Search, Wine, Beer, Martini, Grape, Plus } from 'lucide-react';
import type { Product } from '../App';

const PRODUCTS: Product[] = [
  // Wine
  {
    id: 'wine-1',
    name: 'Château Margaux 2015',
    category: 'Red Wine',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop',
    stock: 12,
    abv: 13.5,
    size: '750ml'
  },
  {
    id: 'wine-2',
    name: 'Cloudy Bay Sauvignon Blanc',
    category: 'White Wine',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400&h=400&fit=crop',
    stock: 24,
    abv: 13.0,
    size: '750ml'
  },
  {
    id: 'wine-3',
    name: 'Moët & Chandon Brut',
    category: 'Champagne',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=400&fit=crop',
    stock: 18,
    abv: 12.0,
    size: '750ml'
  },
  {
    id: 'wine-4',
    name: 'Caymus Cabernet Sauvignon',
    category: 'Red Wine',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1566995541428-6823fdf5eb1e?w=400&h=400&fit=crop',
    stock: 15,
    abv: 14.5,
    size: '750ml'
  },
  {
    id: 'wine-5',
    name: 'Kendall-Jackson Chardonnay',
    category: 'White Wine',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&h=400&fit=crop',
    stock: 30,
    abv: 13.5,
    size: '750ml'
  },
  {
    id: 'wine-6',
    name: 'La Marca Prosecco',
    category: 'Champagne',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1598524722718-f6200e8fbd29?w=400&h=400&fit=crop',
    stock: 36,
    abv: 11.0,
    size: '750ml'
  },

  // Beer
  {
    id: 'beer-1',
    name: 'Stella Artois',
    category: 'Beer',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop',
    stock: 48,
    abv: 5.0,
    size: '6-pack'
  },
  {
    id: 'beer-2',
    name: 'Guinness Draught',
    category: 'Beer',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop',
    stock: 42,
    abv: 4.2,
    size: '6-pack'
  },
  {
    id: 'beer-3',
    name: 'Blue Moon Belgian White',
    category: 'Beer',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?w=400&h=400&fit=crop',
    stock: 36,
    abv: 5.4,
    size: '6-pack'
  },
  {
    id: 'beer-4',
    name: 'Corona Extra',
    category: 'Beer',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1532634993-15f421e42ec0?w=400&h=400&fit=crop',
    stock: 60,
    abv: 4.6,
    size: '12-pack'
  },
  {
    id: 'beer-5',
    name: 'Samuel Adams Boston Lager',
    category: 'Beer',
    price: 12.49,
    image: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=400&h=400&fit=crop',
    stock: 30,
    abv: 5.0,
    size: '6-pack'
  },

  // Spirits
  {
    id: 'spirits-1',
    name: 'Jack Daniel\'s Tennessee Whiskey',
    category: 'Whiskey',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400&h=400&fit=crop',
    stock: 25,
    abv: 40.0,
    size: '750ml'
  },
  {
    id: 'spirits-2',
    name: 'Grey Goose Vodka',
    category: 'Vodka',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1560508801-b85a34baff0a?w=400&h=400&fit=crop',
    stock: 20,
    abv: 40.0,
    size: '750ml'
  },
  {
    id: 'spirits-3',
    name: 'Patrón Silver Tequila',
    category: 'Tequila',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop',
    stock: 15,
    abv: 40.0,
    size: '750ml'
  },
  {
    id: 'spirits-4',
    name: 'Tanqueray London Dry Gin',
    category: 'Gin',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1598679253544-2c97992403ea?w=400&h=400&fit=crop',
    stock: 22,
    abv: 47.3,
    size: '750ml'
  },
  {
    id: 'spirits-5',
    name: 'Bacardi Superior Rum',
    category: 'Rum',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop',
    stock: 28,
    abv: 40.0,
    size: '750ml'
  },
  {
    id: 'spirits-6',
    name: 'Hennessy V.S Cognac',
    category: 'Cognac',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop',
    stock: 18,
    abv: 40.0,
    size: '750ml'
  },
  {
    id: 'spirits-7',
    name: 'Johnnie Walker Black Label',
    category: 'Whiskey',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=400&fit=crop',
    stock: 20,
    abv: 40.0,
    size: '750ml'
  },
  {
    id: 'spirits-8',
    name: 'Bombay Sapphire Gin',
    category: 'Gin',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=400&fit=crop',
    stock: 24,
    abv: 40.0,
    size: '750ml'
  }
];

const CATEGORIES = [
  { name: 'All', icon: Grape },
  { name: 'Red Wine', icon: Wine },
  { name: 'White Wine', icon: Wine },
  { name: 'Champagne', icon: Martini },
  { name: 'Beer', icon: Beer },
  { name: 'Whiskey', icon: Martini },
  { name: 'Vodka', icon: Martini },
  { name: 'Tequila', icon: Martini },
  { name: 'Gin', icon: Martini },
  { name: 'Rum', icon: Martini },
  { name: 'Cognac', icon: Martini }
];

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
}

export function ProductCatalog({ onAddToCart }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all shadow-sm ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:shadow'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02] hover:border-indigo-200"
          >
            <div className="aspect-square bg-slate-100 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.stock < 10 && (
                <div className="absolute top-2 right-2 bg-rose-500 text-white px-2 py-1 rounded text-xs shadow-md">
                  Low Stock
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="text-xs text-indigo-600 mb-1">{product.category}</div>
              <h3 className="text-slate-900 mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
                <span>{product.size}</span>
                <span>•</span>
                <span>{product.abv}% ABV</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-900">${product.price.toFixed(2)}</span>
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={product.stock === 0}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Stock: {product.stock} units
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No products found</p>
        </div>
      )}
    </div>
  );
}