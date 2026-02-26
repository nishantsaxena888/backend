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
    title: 'Coca-Cola Classic - 24 Pack, 12 oz Cans (Full Case)',
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.8,
    reviews: 2543,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Beverages',
    prime: true,
  },
  {
    id: '2',
    title: 'Pepsi Cola - 24 Pack, 12 oz Cans (Wholesale Case)',
    price: 17.99,
    originalPrice: 23.99,
    rating: 4.7,
    reviews: 1892,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Beverages',
    prime: true,
  },
  {
    id: '3',
    title: 'Sprite Lemon-Lime Soda - 24 Pack, 12 oz Cans',
    price: 17.49,
    rating: 4.6,
    reviews: 1523,
    image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Sodas & Soft Drinks',
    prime: true,
  },
  {
    id: '4',
    title: 'Lay\'s Classic Potato Chips - 40 Count, 1 oz Bags',
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.9,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Snacks & Chips',
    prime: true,
  },
  {
    id: '5',
    title: 'Mountain Dew - 24 Pack, 12 oz Cans (Full Case)',
    price: 18.49,
    originalPrice: 24.49,
    rating: 4.7,
    reviews: 1687,
    image: 'https://images.unsplash.com/photo-1629203849430-64d96c2cab92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Sodas & Soft Drinks',
    prime: true,
  },
  {
    id: '6',
    title: 'Red Bull Energy Drink - 24 Pack, 8.4 oz Cans',
    price: 42.99,
    rating: 4.8,
    reviews: 2234,
    image: 'https://images.unsplash.com/photo-1622484211269-2b8f8b0b2a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Energy Drinks',
    prime: true,
  },
  {
    id: '7',
    title: 'Doritos Nacho Cheese - 30 Count, 1 oz Bags',
    price: 22.99,
    rating: 4.8,
    reviews: 2765,
    image: 'https://images.unsplash.com/photo-1613919119865-7b3b3f1b3da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Snacks & Chips',
    prime: true,
  },
  {
    id: '8',
    title: 'Monster Energy Drink - 24 Pack, 16 oz Cans',
    price: 38.99,
    originalPrice: 48.99,
    rating: 4.7,
    reviews: 1654,
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Energy Drinks',
    prime: true,
  },
  {
    id: '9',
    title: 'Campbell\'s Tomato Soup - 24 Cans, 10.75 oz Each',
    price: 28.99,
    originalPrice: 36.99,
    rating: 4.6,
    reviews: 1321,
    image: 'https://images.unsplash.com/photo-1591952961842-58c837eaa9a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Canned Goods',
    prime: true,
  },
  {
    id: '10',
    title: 'Cheetos Crunchy - 30 Count, 1 oz Bags',
    price: 21.99,
    originalPrice: 28.99,
    rating: 4.8,
    reviews: 2432,
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Snacks & Chips',
    prime: true,
  },
  {
    id: '11',
    title: 'Dr Pepper - 24 Pack, 12 oz Cans (Wholesale)',
    price: 17.99,
    rating: 4.7,
    reviews: 1562,
    image: 'https://images.unsplash.com/photo-1629203849430-64d96c2cab92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Sodas & Soft Drinks',
    prime: true,
  },
  {
    id: '12',
    title: 'Frito-Lay Variety Pack - 50 Count, Assorted Chips',
    price: 32.99,
    originalPrice: 42.99,
    rating: 4.9,
    reviews: 3321,
    image: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Snacks & Chips',
    prime: true,
  },
  {
    id: '13',
    title: 'Canada Dry Ginger Ale - 24 Pack, 12 oz Cans',
    price: 16.99,
    rating: 4.5,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Sodas & Soft Drinks',
    prime: true,
  },
  {
    id: '14',
    title: 'Pringles Original - 12 Cans, 5.5 oz Each',
    price: 19.99,
    originalPrice: 26.99,
    rating: 4.7,
    reviews: 1834,
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Snacks & Chips',
    prime: true,
  },
  {
    id: '15',
    title: 'Gatorade Sports Drink - 24 Pack, 20 oz Bottles (Mixed)',
    price: 24.99,
    rating: 4.8,
    reviews: 2423,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Beverages',
    prime: true,
  },
  {
    id: '16',
    title: 'Del Monte Canned Corn - 24 Cans, 15.25 oz Each',
    price: 26.99,
    originalPrice: 34.99,
    rating: 4.4,
    reviews: 967,
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Canned Goods',
    prime: true,
  },
  {
    id: '17',
    title: 'Fanta Orange Soda - 24 Pack, 12 oz Cans',
    price: 17.49,
    rating: 4.6,
    reviews: 1323,
    image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Sodas & Soft Drinks',
    prime: true,
  },
  {
    id: '18',
    title: 'SunChips Original - 30 Count, 1.5 oz Bags',
    price: 23.99,
    originalPrice: 31.99,
    rating: 4.5,
    reviews: 1345,
    image: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Snacks & Chips',
    prime: true,
  },
  {
    id: '19',
    title: 'Coca-Cola Zero Sugar - 24 Pack, 12 oz Cans',
    price: 18.99,
    rating: 4.7,
    reviews: 1654,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Beverages',
    prime: true,
  },
  {
    id: '20',
    title: 'Progresso Soup Variety Pack - 18 Cans, Assorted Flavors',
    price: 32.99,
    originalPrice: 42.99,
    rating: 4.6,
    reviews: 1123,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Canned Goods',
    prime: true,
  },
  {
    id: '21',
    title: 'Ruffles Cheddar & Sour Cream - 30 Count, 1 oz Bags',
    price: 22.49,
    rating: 4.8,
    reviews: 1987,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Snacks & Chips',
    prime: true,
  },
  {
    id: '22',
    title: '5-hour Energy Shots - 24 Count, Berry Flavor',
    price: 34.99,
    rating: 4.5,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1622484211269-2b8f8b0b2a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Energy Drinks',
    prime: true,
  },
  {
    id: '23',
    title: 'A&W Root Beer - 24 Pack, 12 oz Cans',
    price: 16.99,
    originalPrice: 22.99,
    rating: 4.7,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Sodas & Soft Drinks',
    prime: true,
  },
  {
    id: '24',
    title: 'Tostitos Chips & Salsa Combo - 12 Sets',
    price: 29.99,
    rating: 4.9,
    reviews: 2156,
    image: 'https://images.unsplash.com/photo-1613919119865-7b3b3f1b3da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Snacks & Chips',
    prime: true,
  },
  {
    id: '25',
    title: 'Whole Milk - 12 x 1 Gallon Jugs (Refrigerated)',
    price: 42.99,
    rating: 4.8,
    reviews: 765,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Dairy Products',
    prime: true,
  },
  {
    id: '26',
    title: 'Frozen Pizza Variety Pack - 12 Pizzas, Assorted',
    price: 48.99,
    originalPrice: 62.99,
    rating: 4.5,
    reviews: 1432,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Frozen Foods',
    prime: true,
  },
  {
    id: '27',
    title: 'Nestle Pure Life Water - 40 Pack, 16.9 oz Bottles',
    price: 12.99,
    rating: 4.6,
    reviews: 2987,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Beverages',
    prime: true,
  },
  {
    id: '28',
    title: 'Oreo Cookies - 12 Family Size Packs, Original',
    price: 32.99,
    originalPrice: 39.99,
    rating: 4.9,
    reviews: 3654,
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4ba6ca96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Packaged Foods',
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
    <div className="w-full bg-white min-h-screen">
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
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden md:sticky md:top-24">
              {/* Filter Header */}
              <div className="px-4 py-3 bg-gray-700 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-white" />
                    <h3 className="text-white font-medium text-sm">Filters</h3>
                  </div>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-white hover:bg-white/20 px-2.5 py-1 rounded transition-colors"
                    >
                      Clear
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