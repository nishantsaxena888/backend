import { X } from 'lucide-react';
import { Star } from 'lucide-react';

interface AppliedFiltersBarProps {
  priceMin: number;
  priceMax: number;
  selectedRatings: number[];
  primeOnly: boolean;
  productCount: number;
  onClearAll: () => void;
  onRemovePriceFilter: () => void;
  onRemoveRating: (rating: number) => void;
  onRemovePrime: () => void;
}

export function AppliedFiltersBar({
  priceMin,
  priceMax,
  selectedRatings,
  primeOnly,
  productCount,
  onClearAll,
  onRemovePriceFilter,
  onRemoveRating,
  onRemovePrime,
}: AppliedFiltersBarProps) {
  const hasPriceFilter = priceMin > 0 || priceMax < 2000;
  const hasAnyFilters = hasPriceFilter || selectedRatings.length > 0 || primeOnly;

  if (!hasAnyFilters) {
    return null;
  }

  return (
    <div className="sticky top-[118px] z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Applied Filters Label */}
          <span className="text-sm text-gray-600 mr-2">Applied Filters:</span>

          {/* Price Filter Tag */}
          {hasPriceFilter && (
            <button
              onClick={onRemovePriceFilter}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors group border border-blue-200"
            >
              <span className="text-sm">Price: ${priceMin} - ${priceMax}</span>
              <X className="w-3.5 h-3.5 text-blue-600 group-hover:text-blue-800" />
            </button>
          )}

          {/* Rating Filter Tags */}
          {selectedRatings.map((rating) => (
            <button
              key={rating}
              onClick={() => onRemoveRating(rating)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors group border border-amber-200"
            >
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="text-sm">{rating}+ Stars</span>
              </div>
              <X className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-800" />
            </button>
          ))}

          {/* Prime Filter Tag */}
          {primeOnly && (
            <button
              onClick={onRemovePrime}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors group border border-purple-200"
            >
              <span className="text-sm">Prime Eligible</span>
              <X className="w-3.5 h-3.5 text-purple-600 group-hover:text-purple-800" />
            </button>
          )}

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300 mx-1"></div>

          {/* Clear All Button */}
          <button
            onClick={onClearAll}
            className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm shadow-sm"
          >
            Clear All
          </button>

          {/* Product Count */}
          <div className="ml-auto hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <span className="px-3 py-1 bg-gray-100 rounded-lg border border-gray-200">
              {productCount} {productCount === 1 ? 'product' : 'products'} found
            </span>
          </div>
        </div>

        {/* Mobile Product Count */}
        <div className="sm:hidden mt-2 text-xs text-gray-600 text-center">
          {productCount} {productCount === 1 ? 'product' : 'products'} found
        </div>
      </div>
    </div>
  );
}
