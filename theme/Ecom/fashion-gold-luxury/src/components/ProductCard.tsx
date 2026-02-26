import { Star, StarHalf, ShoppingCart, Clock, Flame, TrendingUp, ChefHat, Package, Settings, Plus, AlertCircle } from 'lucide-react';
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
      stars.push(<Star key={`full-${i}`} className="w-3 h-3 fill-amber-400 text-amber-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-3 h-3 fill-amber-400 text-amber-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-200 hover:border-amber-400 relative">
      {/* Out of Stock Overlay */}
      {!product.inStock && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex items-center justify-center rounded-2xl">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-2" />
            <p className="text-white font-bold text-lg">Out of Stock</p>
            <p className="text-gray-300 text-sm mt-1">Check back soon</p>
          </div>
        </div>
      )}
      
      <div 
        className="relative cursor-pointer" 
        onClick={() => onProductClick(product)}
      >
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.originalPrice && (
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
              {Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) * 100
              )}% OFF
            </span>
          )}
          {product.reviews > 1000 && (
            <span className="bg-black text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Popular
            </span>
          )}
          {product.inStock && product.stockCount && product.stockCount < 10 && (
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
              Only {product.stockCount} left
            </span>
          )}
        </div>
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