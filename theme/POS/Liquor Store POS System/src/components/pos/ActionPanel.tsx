import { CreditCard, Pause, Trash2, RotateCcw } from 'lucide-react';
import { useTransaction } from '../../contexts/TransactionContext';
import { useAuth } from '../../contexts/AuthContext';

interface ActionPanelProps {
  onCheckout: () => void;
  onHold: () => void;
}

export function ActionPanel({ onCheckout, onHold }: ActionPanelProps) {
  const { currentTransaction, voidTransaction, heldTransactions } = useTransaction();
  const { hasPermission } = useAuth();

  if (!currentTransaction) return null;

  const activeItems = currentTransaction.lineItems.filter(item => !item.voided);
  const canCheckout = activeItems.length > 0 && currentTransaction.total > 0;

  const handleVoidTransaction = () => {
    if (!hasPermission('fullVoid')) {
      alert('Manager override required for full void');
      return;
    }

    if (confirm('Void entire transaction?')) {
      const reason = prompt('Enter void reason:');
      if (reason) {
        voidTransaction(reason);
      }
    }
  };

  const handleHold = () => {
    if (activeItems.length === 0) return;
    
    const holdName = prompt('Enter name for held transaction:');
    if (holdName) {
      onHold();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Transaction Summary */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <h3 className="text-sm text-slate-700 mb-3">Transaction Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Subtotal</span>
            <span className="text-slate-900">${currentTransaction.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Tax (8%)</span>
            <span className="text-slate-900">${currentTransaction.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-blue-200">
            <span className="text-slate-900">Total</span>
            <span className="text-slate-900">${currentTransaction.total.toFixed(2)}</span>
          </div>

          {currentTransaction.amountPaid > 0 && (
            <>
              <div className="flex justify-between text-sm pt-2 border-t border-blue-200">
                <span className="text-green-600">Paid</span>
                <span className="text-green-600">${currentTransaction.amountPaid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Due</span>
                <span className="text-slate-900">${currentTransaction.amountDue.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex-1 p-4 space-y-3">
        <button
          onClick={onCheckout}
          disabled={!canCheckout}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-lg transition-all shadow-md hover:shadow-lg disabled:shadow-none flex items-center justify-center gap-2 disabled:cursor-not-allowed"
        >
          <CreditCard className="w-5 h-5" />
          Checkout (F2)
        </button>

        <button
          onClick={handleHold}
          disabled={activeItems.length === 0}
          className="w-full py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Pause className="w-4 h-4" />
          Hold Sale
        </button>

        {heldTransactions.length > 0 && (
          <button
            onClick={onHold}
            className="w-full py-3 bg-green-100 hover:bg-green-200 text-green-900 border-2 border-green-300 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Recall ({heldTransactions.length})
          </button>
        )}

        <button
          onClick={handleVoidTransaction}
          disabled={activeItems.length === 0}
          className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-900 border-2 border-red-200 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
          Void Transaction
        </button>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <h4 className="text-xs text-slate-600 mb-2">Keyboard Shortcuts</h4>
        <div className="space-y-1 text-xs text-slate-500">
          <div className="flex justify-between">
            <span>Checkout</span>
            <kbd className="px-2 py-0.5 bg-slate-200 rounded">F2</kbd>
          </div>
          <div className="flex justify-between">
            <span>Hold Sale</span>
            <kbd className="px-2 py-0.5 bg-slate-200 rounded">F3</kbd>
          </div>
          <div className="flex justify-between">
            <span>Void</span>
            <kbd className="px-2 py-0.5 bg-slate-200 rounded">F8</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
