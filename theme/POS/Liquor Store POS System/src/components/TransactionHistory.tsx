import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Calendar, DollarSign, CreditCard } from 'lucide-react';
import type { Transaction } from '../App';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);
  const totalTransactions = transactions.length;
  const averageTransaction = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  return (
    <div className="p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Revenue</p>
              <p className="text-slate-900">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Transactions</p>
              <p className="text-slate-900">{totalTransactions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Average Transaction</p>
              <p className="text-slate-900">${averageTransaction.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            {transactions.length === 0 ? (
              <>
                <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <p>No transactions yet</p>
              </>
            ) : (
              <p>No transactions found</p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4">
                <button
                  onClick={() => setExpandedId(expandedId === transaction.id ? null : transaction.id)}
                  className="w-full flex items-center justify-between text-left hover:bg-slate-50 -m-4 p-4 rounded-xl transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-slate-900">{transaction.id}</span>
                      <span className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-full">
                        {transaction.paymentMethod}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>{transaction.timestamp.toLocaleDateString()}</span>
                      <span>{transaction.timestamp.toLocaleTimeString()}</span>
                      <span>{transaction.items.length} item{transaction.items.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-900">${transaction.total.toFixed(2)}</span>
                    {expandedId === transaction.id ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {expandedId === transaction.id && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                    {/* Items */}
                    <div>
                      <h4 className="text-sm text-slate-700 mb-2">Items</h4>
                      <div className="space-y-2">
                        {transaction.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 bg-slate-50 rounded-lg p-3 border border-slate-100">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover border-2 border-slate-200"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-900 truncate">{item.name}</p>
                              <p className="text-xs text-slate-500">{item.category}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-slate-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Totals */}
                    <div className="bg-slate-50 rounded-xl p-3 space-y-1 border border-slate-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Subtotal</span>
                        <span className="text-slate-900">${transaction.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Tax</span>
                        <span className="text-slate-900">${transaction.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200">
                        <span className="text-slate-900">Total</span>
                        <span className="text-slate-900">${transaction.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}