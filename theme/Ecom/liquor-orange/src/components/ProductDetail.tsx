import { X, Star, StarHalf, ShoppingCart, Heart, Clock, MapPin, Flame, AlertCircle, ChefHat, Award, Leaf, TrendingUp, Store, Wine, Package, Shield } from 'lucide-react';
import { Product, CartItem } from '../App';
import { useState, useEffect } from 'react';

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, customization?: {
    selectedSize?: string;
    selectedAddons?: string[];
    selectedOptions?: { [key: string]: string };
    customizationPrice?: number;
  }) => void;
  cartItems: CartItem[];
  onRestaurantClick?: (restaurantId: string) => void;
}

export function ProductDetail({ product, onClose, onAddToCart, cartItems, onRestaurantClick }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition' | 'reviews'>('details');
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Check if cart has items from different restaurant
  const cartRestaurantIds = [...new Set(cartItems.map(item => item.restaurant?.id).filter(Boolean))];
  const isDifferentRestaurant = product?.restaurant && 
    cartItems.length > 0 && 
    cartRestaurantIds.length > 0 &&
    !cartRestaurantIds.includes(product.restaurant.id);

  useEffect(() => {
    if (product?.customizations) {
      // Set default size
      if (product.customizations.sizes && product.customizations.sizes.length > 0) {
        setSelectedSize(product.customizations.sizes[0].name);
      }
      // Set default options
      const defaultOptions: { [key: string]: string } = {};
      product.customizations.options?.forEach((option) => {
        if (option.choices && option.choices.length > 0) {
          defaultOptions[option.name] = option.choices[0];
        }
      });
      setSelectedOptions(defaultOptions);
    }
  }, [product]);

  if (!product) return null;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-amber-400 text-amber-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-amber-400 text-amber-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const toggleAddon = (addonName: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName)
        ? prev.filter((name) => name !== addonName)
        : [...prev, addonName]
    );
  };

  const calculateCustomizationPrice = () => {
    let total = 0;
    
    if (selectedSize && product.customizations?.sizes) {
      const size = product.customizations.sizes.find(s => s.name === selectedSize);
      if (size) total += size.price;
    }
    
    if (product.customizations?.addons) {
      selectedAddons.forEach((addonName) => {
        const addon = product.customizations!.addons!.find(a => a.name === addonName);
        if (addon) total += addon.price;
      });
    }
    
    return total;
  };

  const getTotalPrice = () => {
    return (product.price + calculateCustomizationPrice()) * quantity;
  };

  const handleAddToCart = () => {
    const customization = {
      selectedSize,
      selectedAddons,
      selectedOptions,
      customizationPrice: calculateCustomizationPrice()
    };
    
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product, customization);
    }
    onClose();
  };

  // Mock data
  const nutritionInfo = {
    calories: Math.floor(Math.random() * 400) + 300,
    protein: Math.floor(Math.random() * 30) + 10,
    carbs: Math.floor(Math.random() * 50) + 20,
    fat: Math.floor(Math.random() * 25) + 5,
    fiber: Math.floor(Math.random() * 8) + 2,
    sodium: Math.floor(Math.random() * 800) + 200,
  };

  const ingredients = [
    'Premium Quality Ingredients',
    'Fresh Vegetables',
    'Authentic Spices',
    'No Artificial Preservatives',
  ];

  const allergens = ['May contain traces of nuts', 'Contains dairy'];

  const badges = [];
  if (product.reviews > 1500) badges.push({ icon: TrendingUp, text: 'Bestseller', color: 'bg-black' });
  if (product.rating >= 4.7) badges.push({ icon: Award, text: "Most Loved", color: 'bg-gray-800' });

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-[80] transition-opacity"
        onClick={onClose}
      />

      {/* Product Detail Modal */}
      <div className="fixed inset-0 z-[90] overflow-y-auto flex items-center justify-center p-0 md:p-4">
        <div className="bg-gradient-to-b from-gray-50 to-white w-full h-full md:h-[95vh] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:max-w-6xl border border-gray-200">
          
          {/* Header - Elegant with gradient */}
          <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-amber-900/30 p-4 md:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={onClose}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200">{product.title}</h2>
                {product.brand && (
                  <p className="text-sm text-amber-200/70 mt-1">
                    by {product.brand}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-full transition-all ${
                isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500' : ''}`} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Different Restaurant Warning */}
            {isDifferentRestaurant && (
              <div className="m-4 md:m-6 p-4 bg-amber-50 border-2 border-amber-400 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900 mb-1">Items from different restaurants</h4>
                  <p className="text-sm text-amber-800">
                    Your cart has items from <strong>{cartItems[0]?.restaurant?.name}</strong>. 
                    Adding from <strong>{product.restaurant?.name}</strong> will clear your cart.
                  </p>
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-6 p-4 md:p-6">
              {/* Left - Image */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {badges.map((badge, index) => (
                      <span
                        key={index}
                        className={`${badge.color} text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg`}
                      >
                        <badge.icon className="w-4 h-4" />
                        {badge.text}
                      </span>
                    ))}
                    {product.isVeg && (
                      <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                        <Leaf className="w-4 h-4" />
                        Vegetarian
                      </span>
                    )}
                  </div>

                  {/* Spice Level */}
                  {product.spiceLevel && (
                    <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-2 rounded-xl flex items-center gap-2 backdrop-blur-sm">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span className="text-sm font-semibold capitalize">{product.spiceLevel}</span>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-900">{product.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">{product.reviews.toLocaleString()}+ ratings</p>
                  </div>
                  
                  {/* Out of Stock Overlay */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-3" />
                        <p className="text-white font-bold text-2xl">Out of Stock</p>
                        <p className="text-gray-300 mt-2">Check back soon</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Restaurant Card */}
                {product.restaurant && (
                  <button
                    onClick={() => {
                      if (onRestaurantClick && product.restaurant) {
                        onRestaurantClick(product.restaurant.id);
                      }
                    }}
                    className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl p-5 border border-gray-200 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">
                        {product.restaurant.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-black text-white px-2.5 py-1 rounded-lg text-sm font-bold">
                        <Star className="w-3.5 h-3.5 fill-white" />
                        {product.restaurant.rating}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{product.restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{product.restaurant.cuisine}</span>
                      </div>
                    </div>
                    <div className="mt-3 text-sm font-semibold text-gray-900">
                      Delivery: {product.restaurant.deliveryFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${product.restaurant.deliveryFee.toFixed(2)}`
                      )}
                    </div>
                    <p className="text-xs text-gray-600 font-semibold mt-2">Click to view full menu →</p>
                  </button>
                )}

                {/* Liquor Specifications Card */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-5 border border-amber-200">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Wine className="w-5 h-5 text-amber-600" />
                    Product Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.volume && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Volume</p>
                        <p className="font-bold text-gray-900">{product.volume}</p>
                      </div>
                    )}
                    {product.abv && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Alcohol Content</p>
                        <p className="font-bold text-gray-900">{product.abv} ABV</p>
                      </div>
                    )}
                    {product.origin && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Origin</p>
                        <p className="font-bold text-gray-900">{product.origin}</p>
                      </div>
                    )}
                    {product.type && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Type</p>
                        <p className="font-bold text-gray-900">{product.type}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stock & Delivery Info */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-5 h-5 text-gray-700" />
                        <h3 className="font-bold text-gray-900">Availability</h3>
                      </div>
                      {product.inStock ? (
                        <div>
                          <p className="text-sm text-green-600 font-semibold">✓ In Stock</p>
                          {product.stockCount && product.stockCount < 10 && (
                            <p className="text-xs text-orange-600 mt-1">Only {product.stockCount} units left</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-red-600 font-semibold">Out of Stock</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-amber-600" />
                        <h3 className="font-bold text-gray-900">Age Verified</h3>
                      </div>
                      <p className="text-sm text-gray-700">21+ Required</p>
                      <p className="text-xs text-gray-500 mt-1">ID checked at delivery</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Details */}
              <div className="space-y-5">
                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xl text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                        <span className="bg-green-600 text-white text-sm font-bold px-2.5 py-1 rounded-md">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-600">({product.reviews.toLocaleString()} reviews)</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex gap-1">
                    {[
                      { id: 'details', label: 'Customize' },
                      { id: 'nutrition', label: 'Nutrition' },
                      { id: 'reviews', label: 'Reviews' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-3 text-sm font-bold transition-all relative ${
                          activeTab === tab.id ? 'text-black' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.label}
                        {activeTab === tab.id && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="min-h-[300px]">
                  {activeTab === 'details' && (
                    <div className="space-y-5">
                      {product.description && (
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
                        </div>
                      )}

                      {/* Ingredients */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Ingredients</h4>
                        <div className="flex flex-wrap gap-2">
                          {ingredients.map((ing, i) => (
                            <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>

                      {allergens.length > 0 && (
                        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl">
                          <p className="text-xs font-bold text-amber-900 mb-1">⚠️ Allergen Information</p>
                          {allergens.map((a, i) => (
                            <p key={i} className="text-xs text-amber-800">• {a}</p>
                          ))}
                        </div>
                      )}

                      {/* Customization */}
                      {product.customizations && (
                        <div className="space-y-4">
                          <h4 className="text-base font-bold text-gray-900">Customize Your Order</h4>

                          {/* Sizes */}
                          {product.customizations.sizes && product.customizations.sizes.length > 0 && (
                            <div>
                              <p className="text-sm font-semibold text-gray-700 mb-2">Size</p>
                              <div className="grid grid-cols-3 gap-2">
                                {product.customizations.sizes.map((size) => (
                                  <button
                                    key={size.name}
                                    onClick={() => setSelectedSize(size.name)}
                                    className={`p-3 rounded-xl border-2 transition-all text-sm font-semibold ${
                                      selectedSize === size.name
                                        ? 'border-black bg-gray-900 text-white'
                                        : 'border-gray-200 hover:border-gray-400'
                                    }`}
                                  >
                                    <div>{size.name}</div>
                                    {size.price > 0 && (
                                      <div className={`text-xs ${selectedSize === size.name ? 'text-gray-300' : 'text-gray-600'}`}>
                                        +${size.price.toFixed(2)}
                                      </div>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Options */}
                          {product.customizations.options?.map((option) => (
                            <div key={option.name}>
                              <p className="text-sm font-semibold text-gray-700 mb-2">{option.name}</p>
                              <div className="grid grid-cols-2 gap-2">
                                {option.choices.map((choice) => (
                                  <button
                                    key={choice}
                                    onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: choice }))}
                                    className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                                      selectedOptions[option.name] === choice
                                        ? 'border-black bg-gray-900 text-white'
                                        : 'border-gray-200 hover:border-gray-400'
                                    }`}
                                  >
                                    {choice}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}

                          {/* Add-ons */}
                          {product.customizations.addons && product.customizations.addons.length > 0 && (
                            <div>
                              <p className="text-sm font-semibold text-gray-700 mb-2">Add-ons</p>
                              <div className="space-y-2">
                                {product.customizations.addons.map((addon) => (
                                  <label
                                    key={addon.name}
                                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                                      selectedAddons.includes(addon.name)
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-400'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <input
                                        type="checkbox"
                                        checked={selectedAddons.includes(addon.name)}
                                        onChange={() => toggleAddon(addon.name)}
                                        className="w-5 h-5 accent-black"
                                      />
                                      <span className="text-sm font-medium">{addon.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">+${addon.price.toFixed(2)}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'nutrition' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: 'Calories', value: nutritionInfo.calories, unit: 'kcal' },
                          { label: 'Protein', value: nutritionInfo.protein, unit: 'g' },
                          { label: 'Carbs', value: nutritionInfo.carbs, unit: 'g' },
                          { label: 'Fat', value: nutritionInfo.fat, unit: 'g' },
                        ].map((item) => (
                          <div key={item.label} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">{item.label}</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {item.value}<span className="text-sm text-gray-600 ml-1">{item.unit}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            {renderStars(5)}
                            <span className="text-xs text-gray-500">• 1 week ago</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">Amazing food! Fresh and delicious.</p>
                          <p className="text-xs font-semibold text-gray-900">- Customer {i}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-gray-900 font-bold transition-all"
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-gray-900 font-bold transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Add to Cart */}
          <div className="border-t border-gray-200 p-4 md:p-6 bg-white">
            <div className="max-w-6xl mx-auto">
              {calculateCustomizationPrice() > 0 && (
                <div className="mb-4 p-3 bg-gray-50 rounded-xl text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Base Price:</span>
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Customizations:</span>
                    <span className="font-semibold text-gray-900">+${calculateCustomizationPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">× {quantity}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-300">
                    <span>Total:</span>
                    <span className="text-gray-900">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl transition-all flex items-center justify-center gap-3 font-bold text-lg shadow-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                Add {quantity} to Cart • ${getTotalPrice().toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}