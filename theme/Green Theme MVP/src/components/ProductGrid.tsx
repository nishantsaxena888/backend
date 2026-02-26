import { Product } from '../App';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { AppliedFiltersBar } from './AppliedFiltersBar';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  selectedCategory: string;
}

const products: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones - Noise Cancelling with 30H Battery Life',
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviews: 12453,
    image: 'https://images.unsplash.com/photo-1572119244337-bcb4aae995af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Electronics',
    prime: true,
  },
  {
    id: '2',
    title: 'MacBook Pro 14" Laptop - M3 Chip, 16GB RAM, 512GB SSD',
    price: 1599.99,
    originalPrice: 1999.99,
    rating: 4.8,
    reviews: 8932,
    image: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Electronics',
    prime: true,
  },
  {
    id: '3',
    title: 'Smartphone Pro Max - 256GB, 5G Enabled, Triple Camera System',
    price: 899.99,
    rating: 4.6,
    reviews: 15234,
    image: 'https://images.unsplash.com/photo-1741061963569-9d0ef54d10d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Electronics',
    prime: true,
  },
  {
    id: '4',
    title: 'Professional DSLR Camera - 24MP, 4K Video, Bundle with Lens',
    price: 749.99,
    originalPrice: 999.99,
    rating: 4.7,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Electronics',
    prime: true,
  },
  {
    id: '5',
    title: 'Smart Watch Series 8 - Fitness Tracker, GPS, Heart Rate Monitor',
    price: 279.99,
    originalPrice: 399.99,
    rating: 4.4,
    reviews: 9876,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Electronics',
    prime: true,
  },
  {
    id: '6',
    title: 'The Complete Collection of Classic Literature - Hardcover Box Set',
    price: 45.99,
    rating: 4.9,
    reviews: 2341,
    image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Books',
    prime: true,
  },
  {
    id: '7',
    title: 'Gaming Console Next Gen - 1TB SSD, 4K Gaming, Wireless Controller',
    price: 499.99,
    rating: 4.8,
    reviews: 18765,
    image: 'https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Electronics',
    prime: true,
  },
  {
    id: '8',
    title: 'iPad Pro 12.9" Tablet - M2 Chip, 128GB, WiFi + Cellular',
    price: 1099.99,
    originalPrice: 1299.99,
    rating: 4.7,
    reviews: 6543,
    image: 'https://images.unsplash.com/photo-1714071803623-9594e3b77862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Electronics',
    prime: true,
  },
  {
    id: '9',
    title: 'Wireless Bluetooth Speaker - Waterproof, 20H Playtime',
    price: 39.99,
    originalPrice: 69.99,
    rating: 4.3,
    reviews: 7821,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Electronics',
    prime: true,
  },
  {
    id: '10',
    title: '4K Smart TV 55" - HDR, Streaming Apps Built-in, Voice Control',
    price: 449.99,
    originalPrice: 699.99,
    rating: 4.6,
    reviews: 4532,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Electronics',
    prime: true,
  },
  {
    id: '11',
    title: 'Mechanical Gaming Keyboard - RGB Backlit, Wireless/Wired',
    price: 79.99,
    rating: 4.5,
    reviews: 5621,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Electronics',
    prime: true,
  },
  {
    id: '12',
    title: 'Coffee Maker with Grinder - Programmable, 12-Cup Capacity',
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.4,
    reviews: 3210,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Home & Kitchen',
    prime: true,
  },
];

export function ProductGrid({ onAddToCart, onProductClick, selectedCategory }: ProductGridProps) {
  const [sortBy, setSortBy] = useState('featured');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(2000);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    rating: true,
    prime: true,
  });
  const [primeOnly, setPrimeOnly] = useState(false);

  // Filter products by category
  let filteredProducts = selectedCategory === 'All Products' 
    ? products 
    : products.filter(p => {
        const productCategory = p.category.toLowerCase();
        const selectedCat = selectedCategory.toLowerCase();
        
        if (selectedCat.includes('home') && productCategory.includes('home')) {
          return true;
        }
        
        return productCategory === selectedCat;
      });

  // Filter by price range
  filteredProducts = filteredProducts.filter(
    p => p.price >= priceMin && p.price <= priceMax
  );

  // Filter by rating
  if (selectedRatings.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      selectedRatings.some(rating => p.rating >= rating)
    );
  }

  // Filter by prime
  if (primeOnly) {
    filteredProducts = filteredProducts.filter(p => p.prime);
  }

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const clearAllFilters = () => {
    setPriceMin(0);
    setPriceMax(2000);
    setSelectedRatings([]);
    setPrimeOnly(false);
    setSortBy('featured');
  };

  const activeFiltersCount = [
    priceMin > 0 || priceMax < 2000,
    selectedRatings.length > 0,
    primeOnly,
  ].filter(Boolean).length;

  return (
    <div className="w-full bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100 min-h-screen">
      {/* Sticky Applied Filters Bar - Shows at top when filters active */}
      {activeFiltersCount > 0 && (
        <AppliedFiltersBar
          priceMin={priceMin}
          priceMax={priceMax}
          selectedRatings={selectedRatings}
          primeOnly={primeOnly}
          productCount={sortedProducts.length}
          onClearAll={clearAllFilters}
          onRemovePriceFilter={() => { setPriceMin(0); setPriceMax(2000); }}
          onRemoveRating={toggleRating}
          onRemovePrime={() => setPrimeOnly(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile Filter Toggle - Only show on mobile */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-stone-300 rounded-xl hover:border-emerald-500 transition-colors shadow-sm"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* DESKTOP: Sidebar Left + Products Right - Grid Layout */}
        <div className="md:flex md:gap-6">
          {/* LEFT SIDEBAR - FILTERS - Always visible on desktop */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-[280px] md:flex-shrink-0 mb-6 md:mb-0`}>
            <div className="bg-white rounded-2xl shadow-md border border-stone-200 overflow-hidden md:sticky md:top-24">
              {/* Filter Header */}
              <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-white" />
                    <h3 className="text-white font-semibold">Filters</h3>
                  </div>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-white hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
                {/* PRICE FILTER */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('price')}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm text-gray-900">Price</span>
                    {expandedSections.price ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {expandedSections.price && (
                    <div className="px-4 pb-4 space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Range:</span>
                        <span className="text-emerald-600 font-semibold">${priceMin} - ${priceMax}</span>
                      </div>

                      {/* Dual Range Slider */}
                      <div className="relative pt-2 pb-4">
                        <div className="absolute w-full h-1.5 bg-slate-200 rounded-full top-1/2 -translate-y-1/2"></div>
                        <div 
                          className="absolute h-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full top-1/2 -translate-y-1/2"
                          style={{
                            left: `${(priceMin / 2000) * 100}%`,
                            right: `${100 - (priceMax / 2000) * 100}%`
                          }}
                        ></div>
                        <input
                          type="range"
                          min="0"
                          max="2000"
                          step="10"
                          value={priceMin}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value < priceMax - 50) {
                              setPriceMin(value);
                            }
                          }}
                          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-emerald-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                        />
                        <input
                          type="range"
                          min="0"
                          max="2000"
                          step="10"
                          value={priceMax}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value > priceMin + 50) {
                              setPriceMax(value);
                            }
                          }}
                          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-teal-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-teal-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
                        />
                      </div>

                      {/* Min/Max Inputs */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="text-xs text-gray-500 mb-1 block">Min</label>
                          <input
                            type="number"
                            placeholder="$0"
                            value={priceMin === 0 ? '' : priceMin}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === '') {
                                setPriceMin(0);
                                return;
                              }
                              const value = parseInt(val);
                              if (!isNaN(value) && value >= 0 && value <= 2000) {
                                if (value < priceMax - 10 || priceMax === 2000) {
                                  setPriceMin(value);
                                }
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <span className="text-gray-400 mt-5">—</span>
                        <div className="flex-1">
                          <label className="text-xs text-gray-500 mb-1 block">Max</label>
                          <input
                            type="number"
                            placeholder="$2000"
                            value={priceMax === 2000 ? '' : priceMax}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === '') {
                                setPriceMax(2000);
                                return;
                              }
                              const value = parseInt(val);
                              if (!isNaN(value) && value >= 0 && value <= 2000) {
                                if (value > priceMin + 10 || priceMin === 0) {
                                  setPriceMax(value);
                                }
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Quick Price Filters */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => { setPriceMin(0); setPriceMax(50); }}
                          className={`px-3 py-2 text-xs rounded-lg transition-all ${
                            priceMin === 0 && priceMax === 50
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600'
                          }`}
                        >
                          Under $50
                        </button>
                        <button
                          onClick={() => { setPriceMin(50); setPriceMax(100); }}
                          className={`px-3 py-2 text-xs rounded-lg transition-all ${
                            priceMin === 50 && priceMax === 100
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600'
                          }`}
                        >
                          $50-$100
                        </button>
                        <button
                          onClick={() => { setPriceMin(100); setPriceMax(500); }}
                          className={`px-3 py-2 text-xs rounded-lg transition-all ${
                            priceMin === 100 && priceMax === 500
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600'
                          }`}
                        >
                          $100-$500
                        </button>
                        <button
                          onClick={() => { setPriceMin(500); setPriceMax(2000); }}
                          className={`px-3 py-2 text-xs rounded-lg transition-all ${
                            priceMin === 500 && priceMax === 2000
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600'
                          }`}
                        >
                          $500+
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* RATING FILTER */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('rating')}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm text-gray-900">Customer Reviews</span>
                    {expandedSections.rating ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {expandedSections.rating && (
                    <div className="px-4 pb-4 space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <label
                          key={rating}
                          className="flex items-center gap-2 cursor-pointer hover:bg-emerald-50 p-2 rounded-lg transition-colors group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedRatings.includes(rating)}
                            onChange={() => toggleRating(rating)}
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-2 focus:ring-emerald-500"
                          />
                          <div className="flex items-center gap-1">
                            {[...Array(rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                            {[...Array(5 - rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-gray-300" />
                            ))}
                            <span className="text-xs text-gray-600 ml-1 group-hover:text-emerald-600">& Up</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* PRIME FILTER */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('prime')}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm text-gray-900">Prime</span>
                    {expandedSections.prime ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {expandedSections.prime && (
                    <div className="px-4 pb-4 space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer hover:bg-teal-50 p-2 rounded-lg transition-colors group">
                        <input
                          type="checkbox"
                          checked={primeOnly}
                          onChange={(e) => setPrimeOnly(e.target.checked)}
                          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                        />
                        <span className="text-sm text-teal-600 group-hover:font-medium">Prime Eligible</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - PRODUCTS */}
          <div className="min-w-0">
            {/* Header with Sort */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl text-gray-900">
                  {selectedCategory === 'All Products' ? 'All Products' : selectedCategory}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'result' : 'results'}
                </p>
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm hover:border-blue-400 transition-colors"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onProductClick={onProductClick}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SlidersHorizontal className="w-12 h-12 text-emerald-600" />
                  </div>
                  <p className="text-slate-900 text-xl mb-2">No products found</p>
                  <p className="text-slate-500 text-sm mb-6">Try adjusting your filters to see more results</p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}