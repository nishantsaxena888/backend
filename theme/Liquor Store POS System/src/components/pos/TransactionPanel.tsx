import { AlertCircle, X, Trash2 } from 'lucide-react';
import { useTransaction } from '../../contexts/TransactionContext';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

interface TransactionPanelProps {
  onRequestManagerOverride: (action: string) => Promise<boolean>;
}

export function TransactionPanel({ onRequestManagerOverride }: TransactionPanelProps) {
  const { currentTransaction, updateLineItemQuantity, voidLineItem } = useTransaction();
  const { hasPermission } = useAuth();
  const [voidingItemId, setVoidingItemId] = useState<string | null>(null);

  if (!currentTransaction) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">
        <p>No active transaction</p>
      </div>
    );
  }

  const activeItems = currentTransaction.lineItems.filter(item => !item.voided);
  const hasAgeRestrictedItems = activeItems.some(item => item.product.ageRestricted);

  const handleVoidLineItem = async (lineItemId: string) => {
    const canVoid = hasPermission('lineItemVoid');
    
    if (!canVoid) {
      const approved = await onRequestManagerOverride('Void Line Item');
      if (!approved) return;
    }

    const reason = prompt('Enter void reason:');
    if (reason) {
      voidLineItem(lineItemId, reason);
    }
  };

  const handleQuantityChange = (lineItemId: string, delta: number) => {
    const item = currentTransaction.lineItems.find(i => i.id === lineItemId);
    if (!item) return;
    
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      updateLineItemQuantity(lineItemId, newQuantity);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-slate-900">Current Transaction</h2>
            <p className="text-sm text-slate-600">
              {activeItems.length} item{activeItems.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600">Transaction ID</p>
            <p className="text-sm text-slate-900 font-mono">{currentTransaction.id}</p>
          </div>
        </div>

        {/* Age Restriction Warning */}
        {hasAgeRestrictedItems && !currentTransaction.ageVerified && (
          <div className="mt-3 p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-900">Age verification required</p>
              <p className="text-xs text-amber-700">This transaction contains age-restricted items</p>
            </div>
          </div>
        )}

        {currentTransaction.ageVerified && (
          <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
            <p className="text-sm text-green-900">✓ Age verified</p>
          </div>
        )}
      </div>

      {/* Line Items */}
      <div className="flex-1 overflow-auto bg-slate-50 p-4">
        {activeItems.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            <p>Scan items to begin transaction</p>
          </div>
        ) : (
          <div className="space-y-2">
            {currentTransaction.lineItems.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white rounded-lg p-4 border-2 transition-all ${
                  item.voided
                    ? 'border-red-200 bg-red-50 opacity-50'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-slate-900 truncate">{item.product.name}</h3>
                        <p className="text-sm text-slate-500">{item.product.sku}</p>
                      </div>
                      {!item.voided && (
                        <button
                          onClick={() => handleVoidLineItem(item.id)}
                          className="ml-2 p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Void item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {item.product.ageRestricted && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded mb-2">
                        <AlertCircle className="w-3 h-3" />
                        Age Restricted
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      {!item.voided ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="w-8 h-8 bg-slate-100 hover:bg-blue-50 border border-slate-200 rounded flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="w-12 text-center text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="w-8 h-8 bg-slate-100 hover:bg-blue-50 border border-slate-200 rounded flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                          <span className="text-sm text-slate-600">
                            × ${item.unitPrice.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <div className="text-sm text-red-600">VOIDED: {item.voidReason}</div>
                      )}
                      <div className="text-right">
                        <span className={item.voided ? 'line-through text-red-600' : 'text-slate-900'}>
                          ${item.lineTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
