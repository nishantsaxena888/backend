import { Star, StarHalf, ShoppingCart, Heart, Zap } from 'lucide-react';
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
      stars.push(<Star key={`full-${i}`} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3.5 h-3.5 text-slate-300" />);
    }

    return stars;
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-stone-200">
      {/* Discount Badge */}
      {product.originalPrice && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
          -{discountPercentage}%
        </div>
      )}

      {/* Prime Badge */}
      {product.prime && (
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1">
          <Zap className="w-3 h-3 fill-white" />
          Prime
        </div>
      )}

      {/* Wishlist Button */}
      <button className="absolute top-14 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg">
        <Heart className="w-4 h-4 text-slate-700 hover:fill-red-500 hover:text-red-500 transition-colors" />
      </button>

      {/* Product Image */}
      <div 
        className="aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-stone-100 cursor-pointer"
        onClick={() => onProductClick(product)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Title */}
        <h3 
          className="text-sm text-slate-900 mb-2 line-clamp-2 h-10 cursor-pointer hover:text-emerald-600 transition-colors"
          onClick={() => onProductClick(product)}
        >
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-slate-500">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-slate-400">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-semibold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg group/btn"
        >
          <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          <span className="font-medium">Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
