import { Star, StarHalf, ShoppingCart } from 'lucide-react';
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
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer">
      {product.originalPrice && (
        <div className="absolute top-4 right-4 z-10 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
          {Math.round(
            ((product.originalPrice - product.price) /
              product.originalPrice) *
              100
          )}% OFF
        </div>
      )}

      <div 
        className="aspect-square overflow-hidden bg-gray-50"
        onClick={() => onProductClick(product)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <h3 
          className="text-sm text-gray-900 mb-2 line-clamp-2 h-10 hover:text-blue-600"
          onClick={() => onProductClick(product)}
        >
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}