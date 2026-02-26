import { Trash2, Plus, Minus, ShoppingCart, X } from 'lucide-react';
import type { CartItem } from '../App';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onClearCart, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + tax;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-indigo-600" />
            <h2 className="text-slate-900">Cart</h2>
          </div>
          {items.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-sm text-rose-600 hover:text-rose-700"
            >
              Clear All
            </button>
          )}
        </div>
        <p className="text-sm text-slate-600">{items.length} item{items.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-auto p-4 bg-slate-50">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <ShoppingCart className="w-16 h-16 mb-4" />
            <p>Cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-3 relative shadow-sm border border-slate-100 hover:border-indigo-200 transition-all"
              >
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="absolute top-2 right-2 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="flex gap-3 mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm text-slate-900 line-clamp-2 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 border border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-slate-600" />
                    </button>
                    <span className="w-8 text-center text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 border border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-xs text-slate-500">
                      ${item.price.toFixed(2)} each
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {items.length > 0 && (
        <div className="border-t border-slate-200 p-4 bg-white">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="text-slate-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Tax (8%)</span>
              <span className="text-slate-900">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200">
              <span className="text-slate-900">Total</span>
              <span className="text-slate-900">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button
            onClick={onCheckout}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}