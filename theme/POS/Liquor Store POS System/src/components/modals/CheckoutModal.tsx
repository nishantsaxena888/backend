import { useState } from 'react';
import { X, CreditCard, Banknote, Smartphone, Wallet, DollarSign } from 'lucide-react';
import { useTransaction } from '../../contexts/TransactionContext';
import type { Transaction } from '../../types';

interface CheckoutModalProps {
  transaction: Transaction;
  onComplete: (transaction: Transaction) => void;
  onCancel: () => void;
}

type PaymentMethod = 'cash' | 'card' | 'digital' | 'gift_card' | 'store_credit';

export function CheckoutModal({ transaction, onComplete, onCancel }: CheckoutModalProps) {
  const { addPayment, completeTransaction } = useTransaction();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [cashAmount, setCashAmount] = useState('');
  const [processing, setProcessing] = useState(false);

  const amountDue = transaction.amountDue;
  const cashAmountNum = parseFloat(cashAmount) || 0;
  const change = cashAmountNum - amountDue;

  const handleAddPayment = (method: PaymentMethod, amount: number) => {
    addPayment({ method, amount });
    
    // Check if fully paid
    const newAmountPaid = transaction.amountPaid + amount;
    if (newAmountPaid >= transaction.total) {
      // Complete transaction
      setTimeout(() => {
        const completed = completeTransaction();
        if (completed) {
          onComplete(completed);
        }
      }, 500);
    } else {
      // Reset for next payment (split tender)
      setSelectedMethod(null);
      setCashAmount('');
    }
  };

  const handleCashPayment = () => {
    if (cashAmountNum < amountDue) {
      alert('Cash amount must be at least the amount due');
      return;
    }
    handleAddPayment('cash', cashAmountNum);
  };

  const handleCardPayment = () => {
    setProcessing(true);
    // Simulate card processing
    setTimeout(() => {
      handleAddPayment('card', amountDue);
      setProcessing(false);
    }, 1500);
  };

  const handleDigitalPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      handleAddPayment('digital', amountDue);
      setProcessing(false);
    }, 1000);
  };

  const quickCashAmounts = [20, 50, 100];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-white">Checkout</h2>
            <button
              onClick={onCancel}
              className="text-white hover:text-blue-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Transaction Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
            <h3 className="text-slate-900 mb-3">Transaction Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-900">${transaction.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Tax</span>
                <span className="text-slate-900">${transaction.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-blue-200">
                <span className="text-slate-900">Total</span>
                <span className="text-slate-900">${transaction.total.toFixed(2)}</span>
              </div>

              {transaction.payments.length > 0 && (
                <>
                  <div className="pt-2 border-t border-blue-200">
                    <p className="text-sm text-slate-700 mb-2">Payments:</p>
                    {transaction.payments.map(payment => (
                      <div key={payment.id} className="flex justify-between text-sm">
                        <span className="text-green-600">{payment.method}</span>
                        <span className="text-green-600">${payment.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-200">
                    <span className="text-slate-900">Amount Due</span>
                    <span className="text-slate-900">${amountDue.toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Payment Method Selection */}
          {!selectedMethod && (
            <div>
              <h3 className="text-slate-900 mb-3">
                {transaction.payments.length > 0 ? 'Add Payment' : 'Select Payment Method'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedMethod('card')}
                  className="p-6 border-2 border-blue-200 hover:border-blue-400 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all"
                >
                  <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-900">Card</p>
                </button>

                <button
                  onClick={() => setSelectedMethod('cash')}
                  className="p-6 border-2 border-green-200 hover:border-green-400 bg-green-50 hover:bg-green-100 rounded-xl transition-all"
                >
                  <Banknote className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-green-900">Cash</p>
                </button>

                <button
                  onClick={() => setSelectedMethod('digital')}
                  className="p-6 border-2 border-purple-200 hover:border-purple-400 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all"
                >
                  <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-purple-900">Digital</p>
                </button>

                <button
                  onClick={() => setSelectedMethod('gift_card')}
                  className="p-6 border-2 border-amber-200 hover:border-amber-400 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all"
                >
                  <Wallet className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm text-amber-900">Gift Card</p>
                </button>
              </div>
            </div>
          )}

          {/* Cash Payment */}
          {selectedMethod === 'cash' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-900">Cash Payment</h3>
                <button
                  onClick={() => {
                    setSelectedMethod(null);
                    setCashAmount('');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Change method
                </button>
              </div>

              <label className="block">
                <span className="text-sm text-slate-700 mb-1 block">Cash Received</span>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    step="0.01"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>
              </label>

              <div className="flex gap-2">
                {quickCashAmounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => setCashAmount(amount.toString())}
                    className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors border border-green-200"
                  >
                    ${amount}
                  </button>
                ))}
                <button
                  onClick={() => setCashAmount(Math.ceil(amountDue).toString())}
                  className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors border border-blue-200"
                >
                  Exact
                </button>
              </div>

              {cashAmountNum > 0 && (
                <div className="bg-slate-50 rounded-xl p-4 space-y-2 border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Amount Due</span>
                    <span className="text-slate-900">${amountDue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Cash Received</span>
                    <span className="text-slate-900">${cashAmountNum.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className={change >= 0 ? 'text-green-700' : 'text-red-600'}>
                      Change
                    </span>
                    <span className={change >= 0 ? 'text-green-700' : 'text-red-600'}>
                      ${Math.max(0, change).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleCashPayment}
                disabled={change < 0}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-lg transition-all shadow-md disabled:cursor-not-allowed"
              >
                Complete Cash Payment
              </button>
            </div>
          )}

          {/* Card Payment */}
          {selectedMethod === 'card' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-900">Card Payment</h3>
                <button
                  onClick={() => setSelectedMethod(null)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Change method
                </button>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center">
                <CreditCard className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-slate-900 mb-2">Insert, Swipe, or Tap Card</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Amount: ${amountDue.toFixed(2)}
                </p>
                {!processing ? (
                  <button
                    onClick={handleCardPayment}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
                  >
                    Process Card Payment
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Digital Payment */}
          {selectedMethod === 'digital' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-900">Digital Wallet</h3>
                <button
                  onClick={() => setSelectedMethod(null)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Change method
                </button>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-8 text-center">
                <Smartphone className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-slate-900 mb-2">Apple Pay / Google Pay</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Amount: ${amountDue.toFixed(2)}
                </p>
                {!processing ? (
                  <button
                    onClick={handleDigitalPayment}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Process Digital Payment
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-purple-600">
                    <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
