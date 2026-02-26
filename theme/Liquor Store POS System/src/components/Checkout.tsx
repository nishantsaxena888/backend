import { useState } from 'react';
import { X, CreditCard, Banknote, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';
import type { CartItem, Transaction } from '../App';

interface CheckoutProps {
  items: CartItem[];
  onComplete: (transaction: Transaction) => void;
  onCancel: () => void;
}

export function Checkout({ items, onComplete, onCancel }: CheckoutProps) {
  const [step, setStep] = useState<'age-verification' | 'payment'>('age-verification');
  const [ageVerified, setAgeVerified] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'cash' | 'digital' | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cashAmount, setCashAmount] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleAgeVerification = (verified: boolean) => {
    setAgeVerified(verified);
    if (verified) {
      setStep('payment');
    }
  };

  const handlePayment = () => {
    if (!selectedPayment) return;

    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const transaction: Transaction = {
        id: `TXN-${Date.now()}`,
        items: items,
        subtotal,
        tax,
        total,
        timestamp: new Date(),
        paymentMethod: selectedPayment.charAt(0).toUpperCase() + selectedPayment.slice(1)
      };

      onComplete(transaction);
      setProcessing(false);
    }, 1500);
  };

  const quickCashAmounts = [20, 50, 100, 200];
  const cashAmountNum = parseFloat(cashAmount) || 0;
  const change = cashAmountNum - total;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl p-6 flex items-center justify-between">
          <h2 className="text-white">Checkout</h2>
          <button
            onClick={onCancel}
            className="text-indigo-100 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {step === 'age-verification' && (
            <div className="space-y-6">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-amber-900 mb-1">Age Verification Required</h3>
                  <p className="text-sm text-amber-700">
                    This transaction contains alcohol products. Customer must be 21 years or older.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-slate-900">Verify Customer Age</h3>
                <p className="text-slate-600">
                  Please check the customer's valid government-issued ID to confirm they are at least 21 years old.
                </p>

                <div className="bg-slate-50 rounded-xl p-4 space-y-2 border border-slate-200">
                  <h4 className="text-slate-900">Acceptable Forms of ID:</h4>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>Driver's License</li>
                    <li>State ID Card</li>
                    <li>Passport</li>
                    <li>Military ID</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAgeVerification(false)}
                    className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all"
                  >
                    Customer Not of Legal Age
                  </button>
                  <button
                    onClick={() => handleAgeVerification(true)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md"
                  >
                    Age Verified - Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div>
                <h3 className="text-slate-900 mb-3">Order Summary</h3>
                <div className="bg-slate-50 rounded-xl p-4 space-y-2 border border-slate-200">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-600">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-200 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Tax (8%)</span>
                      <span className="text-slate-900">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-200">
                      <span className="text-slate-900">Total</span>
                      <span className="text-slate-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Age Verification Status */}
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-sm text-emerald-700">Age Verified</span>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-slate-900 mb-3">Select Payment Method</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setSelectedPayment('card')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedPayment === 'card'
                        ? 'border-indigo-600 bg-indigo-50 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className={`w-8 h-8 mx-auto mb-2 ${
                      selectedPayment === 'card' ? 'text-indigo-600' : 'text-slate-400'
                    }`} />
                    <span className={`text-sm ${
                      selectedPayment === 'card' ? 'text-indigo-600' : 'text-slate-700'
                    }`}>
                      Card
                    </span>
                  </button>

                  <button
                    onClick={() => setSelectedPayment('cash')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedPayment === 'cash'
                        ? 'border-indigo-600 bg-indigo-50 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Banknote className={`w-8 h-8 mx-auto mb-2 ${
                      selectedPayment === 'cash' ? 'text-indigo-600' : 'text-slate-400'
                    }`} />
                    <span className={`text-sm ${
                      selectedPayment === 'cash' ? 'text-indigo-600' : 'text-slate-700'
                    }`}>
                      Cash
                    </span>
                  </button>

                  <button
                    onClick={() => setSelectedPayment('digital')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedPayment === 'digital'
                        ? 'border-indigo-600 bg-indigo-50 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Smartphone className={`w-8 h-8 mx-auto mb-2 ${
                      selectedPayment === 'digital' ? 'text-indigo-600' : 'text-slate-400'
                    }`} />
                    <span className={`text-sm ${
                      selectedPayment === 'digital' ? 'text-indigo-600' : 'text-slate-700'
                    }`}>
                      Digital
                    </span>
                  </button>
                </div>
              </div>

              {/* Cash Payment Details */}
              {selectedPayment === 'cash' && (
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-sm text-slate-700 mb-1 block">Cash Received</span>
                    <input
                      type="number"
                      step="0.01"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </label>

                  <div className="flex gap-2">
                    {quickCashAmounts.map(amount => (
                      <button
                        key={amount}
                        onClick={() => setCashAmount(amount.toString())}
                        className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-sm border border-slate-200"
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  {cashAmountNum > 0 && (
                    <div className="bg-slate-50 rounded-xl p-3 space-y-1 border border-slate-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Total Due</span>
                        <span className="text-slate-900">${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Cash Received</span>
                        <span className="text-slate-900">${cashAmountNum.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-slate-200">
                        <span className={change >= 0 ? 'text-slate-900' : 'text-rose-600'}>
                          Change
                        </span>
                        <span className={change >= 0 ? 'text-slate-900' : 'text-rose-600'}>
                          ${Math.max(0, change).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Complete Payment Button */}
              <button
                onClick={handlePayment}
                disabled={!selectedPayment || processing || (selectedPayment === 'cash' && change < 0)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Complete Payment</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}