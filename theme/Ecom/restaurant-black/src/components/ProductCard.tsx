import { Star, StarHalf, ShoppingCart, Clock, Flame, TrendingUp, ChefHat, Package, Settings, Plus } from 'lucide-react';
import { Product } from '../App';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onProductClick }: ProductCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }

    return stars;
  };

  const getSpiceIndicator = (level?: string) => {
    if (!level) return null;
    const spiceMap = {
      'mild': '🌶️',
      'medium': '🌶️🌶️',
      'hot': '🌶️🌶️🌶️',
      'extra-hot': '🌶️🌶️🌶️🌶️'
    };
    return spiceMap[level as keyof typeof spiceMap] || null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 hover:border-gray-400">
      <div 
        className="relative cursor-pointer" 
        onClick={() => onProductClick(product)}
      >
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        {/* Veg/Non-Veg Indicator */}
        <div className="absolute top-3 left-3 z-10">
          <div
            className={`w-7 h-7 border-2 ${
              product.isVeg ? 'border-green-600' : 'border-red-600'
            } bg-white rounded-md flex items-center justify-center shadow-md`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full ${
                product.isVeg ? 'bg-green-600' : 'bg-red-600'
              }`}
            />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.originalPrice && (
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
              {Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) * 100
              )}% OFF
            </span>
          )}
          {product.reviews > 1500 && (
            <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-md shadow-md flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Bestseller
            </span>
          )}
        </div>

        {/* Spice Level Indicator */}
        {product.spiceLevel && (
          <div className="absolute bottom-3 right-3">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">
              <Flame className="w-3 h-3" />
              <span className="capitalize">{product.spiceLevel}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Restaurant Info */}
        {product.restaurant && (
          <div className="flex items-center gap-2 mb-2">
            <ChefHat className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-600 font-medium">{product.restaurant.name}</span>
          </div>
        )}

        <h3 
          className="font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-black transition-colors"
          onClick={() => onProductClick(product)}
        >
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Restaurant Details */}
        {product.restaurant && (
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{product.restaurant.deliveryTime}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Package className="w-3 h-3" />
              <span>{product.restaurant.deliveryFee === 0 ? 'FREE' : `$${product.restaurant.deliveryFee}`}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (product.customizations && 
                  (product.customizations.sizes || product.customizations.addons || product.customizations.options)) {
                onProductClick(product);
              } else {
                onAddToCart(product);
              }
            }}
            className="bg-black hover:bg-gray-900 text-white p-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
            title="Add to Cart"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}