import { X, Plus, Minus, Trash2, ShoppingCart, Zap, Store } from 'lucide-react';
import { CartItem } from '../App';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  // Calculate item price including customizations
  const getItemPrice = (item: CartItem) => {
    return item.price + (item.customizationPrice || 0);
  };

  const subtotal = items.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0);
  
  // Get delivery fee from first restaurant (since we only allow one restaurant)
  const deliveryFee = items.length > 0 && items[0].restaurant ? items[0].restaurant.deliveryFee : 0;
  
  const total = subtotal + deliveryFee;

  // Get restaurant info
  const restaurant = items.length > 0 ? items[0].restaurant : null;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-[70] flex flex-col">
        {/* Header */}
        <div className="bg-black text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Your Cart</h2>
            <p className="text-sm text-gray-400 mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-gray-800 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Restaurant Banner */}
        {restaurant && items.length > 0 && (
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 font-semibold">{restaurant.name}</h3>
                <p className="text-xs text-gray-600">{restaurant.cuisine} • {restaurant.deliveryTime}</p>
              </div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-900 text-lg font-medium">Your cart is empty</p>
              <p className="text-gray-500 text-sm mt-2">Add items to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex gap-4">
                    {/* Veg/Non-Veg Indicator */}
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div
                        className={`absolute -top-1 -left-1 w-4 h-4 border-2 ${
                          item.isVeg ? 'border-green-600' : 'border-red-600'
                        } bg-white rounded-sm flex items-center justify-center`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.isVeg ? 'bg-green-600' : 'bg-red-600'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm text-gray-900 font-medium mb-1 line-clamp-2">
                        {item.title}
                      </h3>

                      {/* Customizations */}
                      {(item.selectedSize || (item.selectedAddons && item.selectedAddons.length > 0) || item.selectedOptions) && (
                        <div className="mb-2 space-y-1">
                          {item.selectedSize && (
                            <p className="text-xs text-gray-600">
                              <span className="font-medium">Size:</span> {item.selectedSize}
                            </p>
                          )}
                          {item.selectedOptions && Object.entries(item.selectedOptions).length > 0 && (
                            <div className="text-xs text-gray-600">
                              {Object.entries(item.selectedOptions).map(([key, value]) => (
                                <p key={key}>
                                  <span className="font-medium">{key}:</span> {value}
                                </p>
                              ))}
                            </div>
                          )}
                          {item.selectedAddons && item.selectedAddons.length > 0 && (
                            <p className="text-xs text-gray-600">
                              <span className="font-medium">Add-ons:</span> {item.selectedAddons.join(', ')}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-base text-gray-900 font-semibold">
                          ${getItemPrice(item).toFixed(2)}
                          {item.customizationPrice && item.customizationPrice > 0 && (
                            <span className="text-xs text-gray-500 font-normal ml-1">
                              (+${item.customizationPrice.toFixed(2)})
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200 mt-2 w-fit">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="hover:bg-gray-100 p-1.5 rounded-md transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                        <span className="text-sm w-8 text-center font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="hover:bg-gray-100 p-1.5 rounded-md transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Order Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-gray-900 font-semibold">Total</span>
                <span className="text-xl text-gray-900 font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 rounded-xl transition-all shadow-lg font-bold text-lg"
            >
              Proceed to Checkout • ${total.toFixed(2)}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Age verification required at delivery (21+)
            </p>
          </div>
        )}
      </div>
    </>
  );
}