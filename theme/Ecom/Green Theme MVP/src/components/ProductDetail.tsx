import { X, Star, StarHalf, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../App';

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  if (!product) return null;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[80] transition-opacity"
        onClick={onClose}
      />

      {/* Product Detail Modal */}
      <div className="fixed inset-0 z-[90] overflow-y-auto flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="border-b border-gray-200 p-6 flex items-center justify-between">
            <h2 className="text-2xl text-gray-900">Product Details</h2>
            <button
              onClick={onClose}
              className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-2xl bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Thumbnail Gallery - Mock */}
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square rounded-lg bg-gray-100 border-2 border-transparent hover:border-blue-600 cursor-pointer overflow-hidden">
                      <img
                        src={product.image}
                        alt={`View ${i}`}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full mb-3">
                    {product.category}
                  </span>
                  <h1 className="text-3xl text-gray-900 mb-3">
                    {product.title}
                  </h1>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xl text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                        <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                          Save {Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100
                          )}%
                        </span>
                      </>
                    )}
                  </div>
                  {product.prime && (
                    <p className="text-sm text-blue-600">Eligible for Prime shipping</p>
                  )}
                </div>

                {/* Features */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <RotateCcw className="w-5 h-5 text-blue-600" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span>1-year warranty included</span>
                  </div>
                </div>

                {/* Product Description */}
                <div className="mb-6">
                  <h3 className="text-lg text-gray-900 mb-3">Product Description</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.title} - Experience premium quality and exceptional performance with this top-rated product. 
                    Designed with the latest technology and premium materials to ensure long-lasting durability and satisfaction. 
                    Perfect for both everyday use and special occasions.
                  </p>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h3 className="text-lg text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Premium quality construction and materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Advanced features for enhanced performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Easy to use with intuitive controls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Energy efficient and eco-friendly design</span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button className="bg-white border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 text-gray-700 hover:text-red-500 p-4 rounded-xl transition-all">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>

                {/* Stock Status */}
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">
                    ✓ In Stock - Ships within 2-3 business days
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl text-gray-900 mb-6">Customer Reviews</h3>
              
              <div className="space-y-6">
                {/* Review 1 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(5)}
                      </div>
                      <p className="text-sm text-gray-900">Amazing product!</p>
                    </div>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Absolutely love this product! Exceeded my expectations in every way. 
                    The quality is outstanding and it works perfectly.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">- Sarah M.</p>
                </div>

                {/* Review 2 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(4)}
                      </div>
                      <p className="text-sm text-gray-900">Great value for money</p>
                    </div>
                    <span className="text-xs text-gray-500">1 week ago</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Very happy with this purchase. Good quality and fast shipping. 
                    Would definitely recommend to others.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">- John D.</p>
                </div>

                {/* Review 3 */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(5)}
                      </div>
                      <p className="text-sm text-gray-900">Highly recommended!</p>
                    </div>
                    <span className="text-xs text-gray-500">2 weeks ago</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Perfect! Exactly what I was looking for. The build quality is excellent 
                    and it's very easy to use. Five stars!
                  </p>
                  <p className="text-sm text-gray-500 mt-2">- Emily R.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
