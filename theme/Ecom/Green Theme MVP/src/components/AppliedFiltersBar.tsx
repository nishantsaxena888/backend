import { X, Star, Tag } from 'lucide-react';

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
    <div className="sticky top-[192px] z-30 bg-gradient-to-r from-slate-50 to-stone-50 border-y border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Results Count Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-emerald-200 shadow-sm">
            <Tag className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-slate-900">
              <span className="font-semibold text-emerald-600">{productCount}</span> {productCount === 1 ? 'result' : 'results'}
            </span>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-stone-300 hidden sm:block"></div>

          {/* Filters Label */}
          <span className="text-sm text-slate-600 hidden sm:block">Active filters:</span>

          {/* Price Filter Tag */}
          {hasPriceFilter && (
            <button
              onClick={onRemovePriceFilter}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-emerald-200 text-emerald-700 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all group shadow-sm"
            >
              <span className="text-sm font-medium">${priceMin} - ${priceMax}</span>
              <X className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700" />
            </button>
          )}

          {/* Rating Filter Tags */}
          {selectedRatings.map((rating) => (
            <button
              key={rating}
              onClick={() => onRemoveRating(rating)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-amber-200 text-amber-700 rounded-xl hover:bg-amber-50 hover:border-amber-300 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{rating}+</span>
              </div>
              <X className="w-4 h-4 text-amber-600 group-hover:text-amber-700" />
            </button>
          ))}

          {/* Prime Filter Tag */}
          {primeOnly && (
            <button
              onClick={onRemovePrime}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-teal-200 text-teal-700 rounded-xl hover:bg-teal-50 hover:border-teal-300 transition-all group shadow-sm"
            >
              <span className="text-sm font-medium">Prime Eligible</span>
              <X className="w-4 h-4 text-teal-600 group-hover:text-teal-700" />
            </button>
          )}

          {/* Clear All Button */}
          <button
            onClick={onClearAll}
            className="ml-auto px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg text-sm font-medium"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}
