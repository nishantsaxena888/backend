import { X, Star, Tag } from 'lucide-react';

interface AppliedFiltersBarProps {
  priceRange: [number, number];
  selectedRating: number | null;
  selectedDietType: string[];
  selectedSpiceLevel: string[];
  productCount: number;
  onClearAll: () => void;
}

export function AppliedFiltersBar({
  priceRange,
  selectedRating,
  selectedDietType,
  selectedSpiceLevel,
  productCount,
  onClearAll,
}: AppliedFiltersBarProps) {
  const hasPriceFilter = priceRange[0] > 0 || priceRange[1] < 50;
  const hasAnyFilters = hasPriceFilter || selectedRating !== null || selectedDietType.length > 0 || selectedSpiceLevel.length > 0;

  if (!hasAnyFilters) {
    return null;
  }

  return (
    <div className="sticky top-[170px] z-30 bg-white border-b border-gray-200 mb-6">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Results Count Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md border border-gray-300">
            <Tag className="w-3.5 h-3.5 text-gray-700" />
            <span className="text-sm text-gray-900">
              <span className="font-semibold text-gray-900">{productCount}</span> {productCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>

          {/* Filters Label */}
          <span className="text-sm text-gray-600 hidden sm:block">Filters:</span>

          {/* Price Filter Tag */}
          {hasPriceFilter && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md text-sm">
              <span className="font-medium">${priceRange[0]} - ${priceRange[1]}</span>
            </div>
          )}

          {/* Rating Filter Tag */}
          {selectedRating !== null && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{selectedRating}+ Stars</span>
              </div>
            </div>
          )}

          {/* Diet Type Filter Tags */}
          {selectedDietType.map((type) => (
            <div
              key={type}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md text-sm"
            >
              <div className="flex items-center gap-1">
                <div
                  className={`w-3 h-3 rounded-sm border-2 ${
                    type === 'Veg' ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-full ${
                      type === 'Veg' ? 'bg-green-600' : 'bg-red-600'
                    }`}
                    style={{ transform: 'scale(0.6)' }}
                  />
                </div>
                <span className="font-medium">{type}</span>
              </div>
            </div>
          ))}

          {/* Spice Level Filter Tags */}
          {selectedSpiceLevel.map((level) => (
            <div
              key={level}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md text-sm"
            >
              <span className="font-medium capitalize">{level.replace('-', ' ')} 🌶️</span>
            </div>
          ))}

          {/* Clear All Button */}
          <button
            onClick={onClearAll}
            className="ml-auto px-4 py-1.5 bg-black hover:bg-gray-900 text-white rounded-md transition-colors text-sm font-medium shadow-md"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}