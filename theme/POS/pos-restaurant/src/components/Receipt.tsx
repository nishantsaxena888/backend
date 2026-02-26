import { X, Printer, Download, CheckCircle, Wine } from 'lucide-react';
import type { Transaction } from '../App';

interface ReceiptProps {
  transaction: Transaction;
  onClose: () => void;
}

export function Receipt({ transaction, onClose }: ReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('Receipt download functionality would generate a PDF here');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-auto shadow-2xl">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-3 shadow-lg">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-white mb-1">Payment Successful!</h2>
          <p className="text-emerald-50 text-sm">Transaction completed</p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-6">
          {/* Store Info */}
          <div className="text-center pb-6 border-b-2 border-dashed border-slate-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mb-3">
              <Wine className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-slate-900 mb-2">Premium Liquor Store</h3>
            <p className="text-sm text-slate-600">123 Main Street, City, State 12345</p>
            <p className="text-sm text-slate-600">Tel: (555) 123-4567</p>
            <p className="text-sm text-slate-600">www.premiumliquor.com</p>
          </div>

          {/* Transaction Details */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Transaction ID</span>
              <span className="text-sm text-slate-900 font-mono">{transaction.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Date</span>
              <span className="text-sm text-slate-900">
                {transaction.timestamp.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Time</span>
              <span className="text-sm text-slate-900">
                {transaction.timestamp.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-sm text-slate-600">Payment Method</span>
              <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-full">
                {transaction.paymentMethod}
              </span>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            <h4 className="text-slate-900 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></span>
              Purchased Items
            </h4>
            <div className="space-y-2">
              {transaction.items.map((item, index) => (
                <div key={item.id} className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover border-2 border-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm text-slate-900 line-clamp-1 mb-1">{item.name}</h5>
                      <p className="text-xs text-slate-500 mb-1">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-indigo-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-3 pt-4 border-t-2 border-dashed border-slate-200">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="text-slate-900">${transaction.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Tax (8%)</span>
              <span className="text-slate-900">${transaction.tax.toFixed(2)}</span>
            </div>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-white">Total Paid</span>
                <span className="text-white">${transaction.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Age Verification Notice */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
              <p className="text-xs text-amber-900 leading-relaxed">
                This purchase contains alcoholic beverages. Age verification was completed in accordance with state law. Customer confirmed to be 21+ years of age.
              </p>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="text-center pt-4 border-t-2 border-dashed border-slate-200">
            <p className="text-slate-900 mb-1">Thank You for Your Purchase!</p>
            <p className="text-sm text-slate-600 mb-3">We appreciate your business</p>
            <div className="inline-block bg-slate-100 px-4 py-2 rounded-lg">
              <p className="text-xs text-slate-700">Please drink responsibly</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handlePrint}
              className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            New Transaction
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
