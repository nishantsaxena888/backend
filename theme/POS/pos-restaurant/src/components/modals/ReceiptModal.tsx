import { X, Printer, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import type { Transaction } from '../../types';

interface ReceiptModalProps {
  transaction: Transaction;
  onClose: () => void;
}

export function ReceiptModal({ transaction, onClose }: ReceiptModalProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const email = prompt('Enter customer email:');
    if (email) {
      alert(`Receipt would be sent to ${email}`);
    }
  };

  const handleSMS = () => {
    const phone = prompt('Enter customer phone number:');
    if (phone) {
      alert(`Receipt would be sent via SMS to ${phone}`);
    }
  };

  const activeItems = transaction.lineItems.filter(item => !item.voided);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-auto shadow-2xl">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-center rounded-t-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-3">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-white mb-1">Transaction Complete!</h2>
          <p className="text-green-100 text-sm">Payment processed successfully</p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-4">
          {/* Store Info */}
          <div className="text-center pb-4 border-b-2 border-dashed border-slate-200">
            <h3 className="text-slate-900 mb-1">Liquor Store POS</h3>
            <p className="text-sm text-slate-600">123 Main Street</p>
            <p className="text-sm text-slate-600">City, State 12345</p>
            <p className="text-sm text-slate-600">Phone: (555) 123-4567</p>
          </div>

          {/* Transaction Details */}
          <div className="bg-slate-50 rounded-lg p-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Transaction ID</span>
              <span className="text-slate-900 font-mono">{transaction.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Date & Time</span>
              <span className="text-slate-900">
                {transaction.completedAt?.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Items */}
          <div>
            <h4 className="text-slate-900 mb-2">Items</h4>
            <div className="space-y-2">
              {activeItems.map(item => (
                <div key={item.id} className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.quantity} × ${item.unitPrice.toFixed(2)}
                      </p>
                    </div>
                    <span className="text-sm text-slate-900">
                      ${item.lineTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 pt-4 border-t-2 border-dashed border-slate-200">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="text-slate-900">${transaction.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Tax</span>
              <span className="text-slate-900">${transaction.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200">
              <span className="text-slate-900">Total</span>
              <span className="text-slate-900">${transaction.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payments */}
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <h4 className="text-green-900 text-sm mb-2">Payments</h4>
            {transaction.payments.map(payment => (
              <div key={payment.id} className="flex justify-between text-sm">
                <span className="text-green-700 capitalize">{payment.method.replace('_', ' ')}</span>
                <span className="text-green-900">${payment.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Age Verification */}
          {transaction.ageVerified && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
              <p className="text-xs text-amber-900">
                ✓ Age verification completed
              </p>
            </div>
          )}

          {/* Thank You */}
          <div className="text-center pt-4 border-t-2 border-dashed border-slate-200">
            <p className="text-slate-900 mb-1">Thank You!</p>
            <p className="text-sm text-slate-600">Please drink responsibly</p>
          </div>

          {/* Receipt Options */}
          <div className="space-y-2">
            <p className="text-sm text-slate-700">Send receipt:</p>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-200 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleEmail}
                className="flex-1 py-2.5 bg-green-100 hover:bg-green-200 text-green-900 border border-green-200 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                onClick={handleSMS}
                className="flex-1 py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-200 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                SMS
              </button>
            </div>
          </div>

          {/* New Transaction */}
          <button
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md"
          >
            New Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
