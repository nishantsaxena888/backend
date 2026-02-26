import { X, Star, Clock, MapPin, Info, Search, ChevronRight } from 'lucide-react';
import { Product } from '../App';
import { useState } from 'react';
import { ProductCard } from './ProductCard';

interface RestaurantPageProps {
  restaurant: {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    deliveryTime: string;
    deliveryFee: number;
  } | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  allProducts: Product[];
}

export function RestaurantPage({ restaurant, onClose, onAddToCart, onProductClick, allProducts }: RestaurantPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>('All Items');

  if (!restaurant) return null;

  // Filter products by restaurant
  const restaurantProducts = allProducts.filter(p => p.restaurant?.id === restaurant.id);

  // Get unique categories from restaurant products
  const menuCategories = ['All Items', ...Array.from(new Set(restaurantProducts.map(p => p.category)))];

  // Filter by search and category
  const filteredProducts = restaurantProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedMenuCategory === 'All Items' || product.category === selectedMenuCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-[80] transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Restaurant Page Modal */}
      <div className="fixed inset-0 z-[90] overflow-y-auto flex items-center justify-center p-0 md:p-4">
        <div className="bg-white w-full h-full md:h-[95vh] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:max-w-7xl">
          {/* Restaurant Header */}
          <div className="relative">
            {/* Cover Image */}
            <div className="h-64 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-md p-3 rounded-full transition-all z-10"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Restaurant Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                <div className="max-w-7xl mx-auto">
                  <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{restaurant.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{restaurant.cuisine}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      <span>Delivery: {restaurant.deliveryFee === 0 ? 'FREE' : `$${restaurant.deliveryFee.toFixed(2)}`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Search & Categories Bar */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-20 shadow-sm">
              <div className="max-w-7xl mx-auto px-6 py-4">
                {/* Search Bar */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search menu items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    />
                  </div>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {menuCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedMenuCategory(category)}
                      className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                        selectedMenuCategory === category
                          ? 'bg-green-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-6">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl text-gray-900 font-semibold mb-2">No items found</h3>
                  <p className="text-gray-600">Try searching for something else</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedMenuCategory}
                      <span className="text-gray-500 text-lg ml-3">({filteredProducts.length} items)</span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onProductClick={onProductClick}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
