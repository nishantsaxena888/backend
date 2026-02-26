import { X, Plus, Minus, Trash2, ShoppingCart, Zap } from 'lucide-react';
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
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  const total = subtotal + shipping;

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
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Shopping Cart</h2>
            <p className="text-sm text-emerald-100 mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="hover:bg-white/20 p-2 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Banner */}
        {subtotal > 0 && subtotal < 100 && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
            <div className="flex items-center gap-2 text-sm text-amber-800">
              <Zap className="w-4 h-4 fill-amber-600 text-amber-600" />
              <span>Add <span className="font-semibold">${(100 - subtotal).toFixed(2)}</span> more for free shipping!</span>
            </div>
            <div className="mt-2 w-full bg-amber-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-12 h-12 text-emerald-600" />
              </div>
              <p className="text-slate-900 text-lg font-medium">Your cart is empty</p>
              <p className="text-slate-500 text-sm mt-2">Add items to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-gradient-to-br from-slate-50 to-stone-50 rounded-2xl p-4 border border-stone-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm text-slate-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="text-lg text-slate-900 font-semibold mb-3">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-stone-200">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="hover:bg-emerald-50 p-2 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4 text-slate-600" />
                        </button>
                        <span className="text-sm w-8 text-center font-semibold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="hover:bg-emerald-50 p-2 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 bg-gradient-to-b from-white to-stone-50 p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-900 font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Shipping</span>
                {shipping === 0 ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-emerald-600" />
                    FREE
                  </span>
                ) : (
                  <span className="text-slate-900 font-medium">${shipping.toFixed(2)}</span>
                )}
              </div>
              <div className="border-t border-stone-200 pt-3 flex items-center justify-between">
                <span className="text-lg text-slate-900 font-semibold">Total</span>
                <span className="text-2xl text-slate-900 font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
