import { Product } from '../App';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { AppliedFiltersBar } from './AppliedFiltersBar';
import { fashionProducts } from '../data/fashionProducts';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  selectedCategory: string;
}

export function ProductGrid({ onAddToCart, onProductClick, selectedCategory }: ProductGridProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedStockStatus, setSelectedStockStatus] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [showPriceFilter, setShowPriceFilter] = useState(true);
  const [showRatingFilter, setShowRatingFilter] = useState(true);
  const [showStockFilter, setShowStockFilter] = useState(true);
  const [showBrandFilter, setShowBrandFilter] = useState(true);

  const filteredProducts = fashionProducts.filter((product) => {
    if (selectedCategory !== 'All Products' && product.category !== selectedCategory) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    if (selectedRating && product.rating < selectedRating) {
      return false;
    }
    if (selectedStockStatus.length > 0) {
      if (selectedStockStatus.includes('In Stock') && !product.inStock) return false;
      if (selectedStockStatus.includes('Out of Stock') && product.inStock) return false;
    }
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
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
    priceRange[1] !== 15000 ||
    selectedRating !== null ||
    selectedStockStatus.length > 0 ||
    selectedBrands.length > 0;

  const clearAllFilters = () => {
    setPriceRange([0, 15000]);
    setSelectedRating(null);
    setSelectedStockStatus([]);
    setSelectedBrands([]);
  };

  const toggleStockStatus = (status: string) => {
    setSelectedStockStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
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
                max="15000"
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

        {/* Stock Status Filter */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowStockFilter(!showStockFilter)}
            className="w-full flex items-center justify-between mb-3"
          >
            <h4 className="text-sm text-gray-700 font-semibold">Stock Status</h4>
            {showStockFilter ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {showStockFilter && (
            <div className="space-y-2">
              {['In Stock', 'Out of Stock'].map((status) => (
                <label key={status} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStockStatus.includes(status)}
                    onChange={() => toggleStockStatus(status)}
                    className="accent-black"
                  />
                  <span className="text-sm text-gray-700">{status}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Brand Filter */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowBrandFilter(!showBrandFilter)}
            className="w-full flex items-center justify-between mb-3"
          >
            <h4 className="text-sm text-gray-700 font-semibold">Brand</h4>
            {showBrandFilter ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {showBrandFilter && (
            <div className="space-y-2">
              {['Brand A', 'Brand B', 'Brand C'].map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="accent-black"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
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
          selectedStockStatus={selectedStockStatus}
          selectedBrands={selectedBrands}
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