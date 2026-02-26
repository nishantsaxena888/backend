import { X, CreditCard, Banknote, Smartphone, DollarSign, Scissors } from 'lucide-react';
import { useState } from 'react';
import { useRestaurant } from '../../contexts/RestaurantContext';
import type { Order } from '../../types/restaurant';

interface CheckoutViewProps {
  order: Order;
  onComplete: () => void;
  onCancel: () => void;
}

export function CheckoutView({ order, onComplete, onCancel }: CheckoutViewProps) {
  const { updateTableStatus } = useRestaurant();
  const [tipAmount, setTipAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'mobile' | null>(null);
  const [cashAmount, setCashAmount] = useState('');

  const subtotalWithTip = order.total + tipAmount;
  const cashAmountNum = parseFloat(cashAmount) || 0;
  const change = cashAmountNum - subtotalWithTip;

  const suggestedTips = [
    { label: '15%', amount: order.total * 0.15 },
    { label: '18%', amount: order.total * 0.18 },
    { label: '20%', amount: order.total * 0.20 },
    { label: '25%', amount: order.total * 0.25 },
  ];

  const activeItems = order.items.filter(i => !i.isVoided);
  const compedItems = order.items.filter(i => i.isComped);

  const handleCompletePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (paymentMethod === 'cash' && change < 0) {
      alert('Insufficient cash amount');
      return;
    }

    // Mark table as available
    if (order.tableId) {
      updateTableStatus(order.tableId, 'available');
    }

    alert(`Payment complete! Change: $${Math.max(0, change).toFixed(2)}`);
    onComplete();
  };

  return (
    <div className="h-full bg-slate-50 overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-slate-900">Checkout - Order #{order.orderNumber}</h2>
            <button
              onClick={onCancel}
              className="text-slate-600 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="text-slate-900">${order.subtotal.toFixed(2)}</span>
            </div>
            {compedItems.length > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Comped Items</span>
                <span>
                  -${compedItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-600">Tax</span>
              <span className="text-slate-900">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200">
              <span className="text-slate-900">Total</span>
              <span className="text-slate-900">${order.total.toFixed(2)}</span>
            </div>
            {tipAmount > 0 && (
              <>
                <div className="flex justify-between text-blue-600">
                  <span>Tip</span>
                  <span>${tipAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-900">Total with Tip</span>
                  <span className="text-slate-900">${subtotalWithTip.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tip Selection */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-slate-900 mb-4">Add Tip</h3>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {suggestedTips.map(tip => (
              <button
                key={tip.label}
                onClick={() => setTipAmount(tip.amount)}
                className={`py-3 rounded-lg border-2 transition-all ${
                  Math.abs(tipAmount - tip.amount) < 0.01
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-slate-200 hover:border-blue-300 text-slate-700'
                }`}
              >
                <div>{tip.label}</div>
                <div className="text-sm">${tip.amount.toFixed(2)}</div>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm text-slate-700 mb-1">Custom Tip</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  step="0.01"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setTipAmount(0)}
                className="px-4 py-2 border-2 border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 transition-all"
              >
                No Tip
              </button>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-slate-900 mb-4">Payment Method</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-6 rounded-lg border-2 transition-all ${
                paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-slate-900">Card</p>
            </button>

            <button
              onClick={() => setPaymentMethod('cash')}
              className={`p-6 rounded-lg border-2 transition-all ${
                paymentMethod === 'cash'
                  ? 'border-green-500 bg-green-50'
                  : 'border-slate-200 hover:border-green-300'
              }`}
            >
              <Banknote className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-slate-900">Cash</p>
            </button>

            <button
              onClick={() => setPaymentMethod('mobile')}
              className={`p-6 rounded-lg border-2 transition-all ${
                paymentMethod === 'mobile'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-slate-200 hover:border-purple-300'
              }`}
            >
              <Smartphone className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-slate-900">Mobile</p>
            </button>
          </div>

          {/* Cash Payment Details */}
          {paymentMethod === 'cash' && (
            <div>
              <label className="block text-sm text-slate-700 mb-1">Cash Received</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  step="0.01"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-9 pr-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  autoFocus
                />
              </div>
              {cashAmountNum > 0 && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Amount Due</span>
                    <span className="text-slate-900">${subtotalWithTip.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Cash Received</span>
                    <span className="text-slate-900">${cashAmountNum.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 mt-2 border-t border-slate-200">
                    <span className={change >= 0 ? 'text-green-700' : 'text-red-600'}>
                      Change
                    </span>
                    <span className={change >= 0 ? 'text-green-700' : 'text-red-600'}>
                      ${Math.max(0, change).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-4 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all"
          >
            Back to Order
          </button>
          <button
            onClick={handleCompletePayment}
            disabled={!paymentMethod || (paymentMethod === 'cash' && change < 0)}
            className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
}
