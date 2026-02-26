import { X, Star, Tag, Package } from 'lucide-react';

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
    <div className="sticky top-[170px] z-30 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Results Count Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md border border-gray-300">
            <Tag className="w-3.5 h-3.5 text-gray-700" />
            <span className="text-sm text-gray-900">
              <span className="font-semibold text-gray-700">{productCount}</span> {productCount === 1 ? 'product' : 'products'}
            </span>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>

          {/* Filters Label */}
          <span className="text-sm text-gray-600 hidden sm:block">Filters:</span>

          {/* Price Filter Tag */}
          {hasPriceFilter && (
            <button
              onClick={onRemovePriceFilter}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 hover:border-blue-600 transition-all group text-sm"
            >
              <span className="font-medium">${priceMin} - ${priceMax}</span>
              <X className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500" />
            </button>
          )}

          {/* Rating Filter Tags */}
          {selectedRatings.map((rating) => (
            <button
              key={rating}
              onClick={() => onRemoveRating(rating)}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 hover:border-blue-600 transition-all group text-sm"
            >
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                <span className="font-medium">{rating}+</span>
              </div>
              <X className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500" />
            </button>
          ))}

          {/* Bulk Filter Tag */}
          {primeOnly && (
            <button
              onClick={onRemovePrime}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 hover:border-blue-600 transition-all group text-sm"
            >
              <div className="flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-blue-700" />
                <span className="font-medium">Bulk Available</span>
              </div>
              <X className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500" />
            </button>
          )}

          {/* Clear All Button */}
          <button
            onClick={onClearAll}
            className="ml-auto px-4 py-1.5 bg-gray-700 hover:bg-gray-800 text-white rounded-md transition-colors text-sm font-medium"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}