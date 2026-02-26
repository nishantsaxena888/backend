import { Product } from '../App';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { AppliedFiltersBar } from './AppliedFiltersBar';
import { products } from '../data/products';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  selectedCategory: string;
}

export function ProductGrid({ onAddToCart, onProductClick, selectedCategory }: ProductGridProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedDietType, setSelectedDietType] = useState<string[]>([]);
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [showPriceFilter, setShowPriceFilter] = useState(true);
  const [showRatingFilter, setShowRatingFilter] = useState(true);
  const [showDietFilter, setShowDietFilter] = useState(true);
  const [showSpiceFilter, setShowSpiceFilter] = useState(true);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'All Restaurants' && product.category !== selectedCategory) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    if (selectedRating && product.rating < selectedRating) {
      return false;
    }
    if (selectedDietType.length > 0) {
      if (selectedDietType.includes('Veg') && !product.isVeg) return false;
      if (selectedDietType.includes('Non-Veg') && product.isVeg) return false;
    }
    if (selectedSpiceLevel.length > 0 && product.spiceLevel) {
      if (!selectedSpiceLevel.includes(product.spiceLevel)) return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const hasActiveFilters =
    priceRange[0] !== 0 ||
    priceRange[1] !== 50 ||
    selectedRating !== null ||
    selectedDietType.length > 0 ||
    selectedSpiceLevel.length > 0;

  const clearAllFilters = () => {
    setPriceRange([0, 50]);
    setSelectedRating(null);
    setSelectedDietType([]);
    setSelectedSpiceLevel([]);
  };

  const toggleDietType = (type: string) => {
    setSelectedDietType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleSpiceLevel = (level: string) => {
    setSelectedSpiceLevel((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const FilterSidebar = () => (
    <div className="w-full h-full flex flex-col">
      {/* Filter Header */}
      <div className="px-4 py-3 bg-black border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-white" />
            <h3 className="text-white font-semibold">Filters</h3>
          </div>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="md:hidden text-white hover:bg-white/20 p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto">
        {/* Sort By */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="text-sm text-gray-700 mb-3 font-semibold">Sort By</h4>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="relevance">Relevance</option>
            <option value="rating">Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowPriceFilter(!showPriceFilter)}
            className="w-full flex items-center justify-between mb-3"
          >
            <h4 className="text-sm text-gray-700 font-semibold">Price Range</h4>
            {showPriceFilter ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {showPriceFilter && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-black"
              />
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowRatingFilter(!showRatingFilter)}
            className="w-full flex items-center justify-between mb-3"
          >
            <h4 className="text-sm text-gray-700 font-semibold">Rating</h4>
            {showRatingFilter ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {showRatingFilter && (
            <div className="space-y-2">
              {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === rating}
                    onChange={() => setSelectedRating(rating)}
                    className="accent-black"
                  />
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-700">{rating} & above</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Diet Type Filter */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowDietFilter(!showDietFilter)}
            className="w-full flex items-center justify-between mb-3"
          >
            <h4 className="text-sm text-gray-700 font-semibold">Diet Type</h4>
            {showDietFilter ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {showDietFilter && (
            <div className="space-y-2">
              {['Veg', 'Non-Veg'].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDietType.includes(type)}
                    onChange={() => toggleDietType(type)}
                    className="accent-black"
                  />
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-sm border-2 ${
                        type === 'Veg'
                          ? 'border-green-600 bg-green-50'
                          : 'border-red-600 bg-red-50'
                      }`}
                    >
                      <div
                        className={`w-full h-full rounded-full ${
                          type === 'Veg' ? 'bg-green-600' : 'bg-red-600'
                        }`}
                        style={{ transform: 'scale(0.6)' }}
                      />
                    </div>
                    <span className="text-sm text-gray-700">{type}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Spice Level Filter */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowSpiceFilter(!showSpiceFilter)}
            className="w-full flex items-center justify-between mb-3"
          >
            <h4 className="text-sm text-gray-700 font-semibold">Spice Level</h4>
            {showSpiceFilter ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {showSpiceFilter && (
            <div className="space-y-2">
              {['mild', 'medium', 'hot', 'extra-hot'].map((level) => (
                <label key={level} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSpiceLevel.includes(level)}
                    onChange={() => toggleSpiceLevel(level)}
                    className="accent-black"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {level.replace('-', ' ')} 🌶️
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Applied Filters Bar */}
      {hasActiveFilters && (
        <AppliedFiltersBar
          priceRange={priceRange}
          selectedRating={selectedRating}
          selectedDietType={selectedDietType}
          selectedSpiceLevel={selectedSpiceLevel}
          onClearAll={clearAllFilters}
          productCount={sortedProducts.length}
        />
      )}

      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-[177px] bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <FilterSidebar />
          </div>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-50 bg-black hover:bg-gray-900 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="font-medium">Filters</span>
        </button>

        {/* Mobile Filter Overlay */}
        {isMobileFilterOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[60]"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="md:hidden fixed inset-y-0 left-0 w-80 bg-white z-[70] shadow-2xl">
              <FilterSidebar />
            </div>
          </>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{sortedProducts.length}</span>{' '}
              {sortedProducts.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🍽️</span>
              </div>
              <h3 className="text-xl text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2 bg-black hover:bg-gray-900 text-white rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}