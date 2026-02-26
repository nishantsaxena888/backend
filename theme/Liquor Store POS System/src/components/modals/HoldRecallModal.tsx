import { X, Clock, RotateCcw } from 'lucide-react';
import { useTransaction } from '../../contexts/TransactionContext';
import { useState } from 'react';

interface HoldRecallModalProps {
  onClose: () => void;
}

export function HoldRecallModal({ onClose }: HoldRecallModalProps) {
  const { currentTransaction, heldTransactions, holdTransaction, recallTransaction } = useTransaction();
  const [holdName, setHoldName] = useState('');
  const [mode, setMode] = useState<'hold' | 'recall'>('recall');

  const handleHold = () => {
    if (!holdName.trim()) {
      alert('Please enter a name for this transaction');
      return;
    }
    holdTransaction(holdName);
    onClose();
  };

  const handleRecall = (transactionId: string) => {
    recallTransaction(transactionId);
    onClose();
  };

  const activeItems = currentTransaction?.lineItems.filter(item => !item.voided) || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-white">Hold / Recall Transactions</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode('recall')}
              className={`flex-1 py-3 rounded-lg transition-all ${
                mode === 'recall'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <RotateCcw className="w-4 h-4 inline mr-2" />
              Recall ({heldTransactions.length})
            </button>
            <button
              onClick={() => setMode('hold')}
              disabled={activeItems.length === 0}
              className={`flex-1 py-3 rounded-lg transition-all ${
                mode === 'hold'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Hold Current
            </button>
          </div>

          {/* Hold Transaction */}
          {mode === 'hold' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <h3 className="text-amber-900 mb-2">Hold Current Transaction</h3>
                <p className="text-sm text-amber-700 mb-4">
                  This will save the current transaction and start a new one. You can recall it later.
                </p>
                <label className="block mb-4">
                  <span className="text-sm text-slate-700 mb-1 block">
                    Name or identifier for this transaction
                  </span>
                  <input
                    type="text"
                    value={holdName}
                    onChange={(e) => setHoldName(e.target.value)}
                    placeholder="e.g., Customer name, table number..."
                    className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    autoFocus
                  />
                </label>
                <button
                  onClick={handleHold}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
                >
                  Hold Transaction
                </button>
              </div>

              {/* Current Transaction Preview */}
              {currentTransaction && activeItems.length > 0 && (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-700 mb-2">Current transaction:</p>
                  <div className="space-y-1">
                    {activeItems.slice(0, 3).map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-slate-600 truncate">{item.product.name}</span>
                        <span className="text-slate-900">${item.lineTotal.toFixed(2)}</span>
                      </div>
                    ))}
                    {activeItems.length > 3 && (
                      <p className="text-xs text-slate-500">
                        +{activeItems.length - 3} more items
                      </p>
                    )}
                  </div>
                  <div className="pt-2 mt-2 border-t border-slate-200 flex justify-between">
                    <span className="text-slate-900">Total</span>
                    <span className="text-slate-900">${currentTransaction.total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recall Transactions */}
          {mode === 'recall' && (
            <div className="space-y-3">
              {heldTransactions.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p>No held transactions</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-slate-600 mb-4">
                    Select a transaction to recall it
                  </p>
                  {heldTransactions.map(transaction => {
                    const items = transaction.lineItems.filter(item => !item.voided);
                    return (
                      <button
                        key={transaction.id}
                        onClick={() => handleRecall(transaction.id)}
                        className="w-full bg-white border-2 border-slate-200 hover:border-blue-400 rounded-xl p-4 text-left transition-all hover:shadow-md"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-slate-900 mb-1">{transaction.holdName}</h3>
                            <p className="text-sm text-slate-500 font-mono">{transaction.id}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-900">${transaction.total.toFixed(2)}</p>
                            <p className="text-xs text-slate-500">
                              {items.length} item{items.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          Held {transaction.heldAt?.toLocaleTimeString()}
                        </div>
                      </button>
                    );
                  })}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
