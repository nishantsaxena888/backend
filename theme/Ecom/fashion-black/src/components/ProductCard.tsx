import { Star, StarHalf, ShoppingCart, Clock, Flame, TrendingUp, ChefHat, Package, Settings, Plus, AlertCircle, Heart } from 'lucide-react';
import { Product } from '../App';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onProductClick }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

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

  const onClick = () => {
    onProductClick(product);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 hover:border-black transition-all cursor-pointer group overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.originalPrice && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wide">
              Sale
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-900 text-white text-xs font-bold px-2 py-1 uppercase tracking-wide">
              Sold Out
            </span>
          )}
        </div>

        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white hover:bg-black text-black hover:text-white transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {product.brand}
          </p>
        )}

        {/* Title */}
        <h3 className="text-sm font-medium text-black mb-2 line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-black">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-red-600">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </>
          )}
        </div>

        {/* Colors Available */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 mb-3">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-5 h-5 rounded-full border border-gray-300"
                style={{ 
                  backgroundColor: color.toLowerCase().includes('black') ? '#000' :
                                  color.toLowerCase().includes('white') ? '#fff' :
                                  color.toLowerCase().includes('red') ? '#dc2626' :
                                  color.toLowerCase().includes('blue') ? '#2563eb' :
                                  color.toLowerCase().includes('pink') ? '#ec4899' :
                                  color.toLowerCase().includes('brown') || color.toLowerCase().includes('tan') ? '#92400e' :
                                  '#9ca3af'
                }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Quick Add Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={!product.inStock}
          className={`w-full py-2.5 text-sm font-medium uppercase tracking-wide transition-all ${
            product.inStock
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {product.inStock ? 'Add to Bag' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}