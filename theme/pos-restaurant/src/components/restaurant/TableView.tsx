import { Plus, Send, CreditCard, Trash2, Ban, Gift, Users } from 'lucide-react';
import { useRestaurant } from '../../contexts/RestaurantContext';
import { useRestaurantAuth } from '../../contexts/RestaurantAuthContext';
import type { Table } from '../../types/restaurant';
import { useState } from 'react';

interface TableViewProps {
  table: Table;
  onAddItems: () => void;
  onCheckout: () => void;
}

export function TableView({ table, onAddItems, onCheckout }: TableViewProps) {
  const { 
    getOrderByTableId, 
    createOrder, 
    updateOrderItem,
    voidOrderItem,
    compOrderItem,
    sendOrderToKitchen,
    setSelectedOrder,
    assignTableToServer,
  } = useRestaurant();
  const { currentServer, isManager } = useRestaurantAuth();
  const [guestCount, setGuestCount] = useState(2);

  const order = getOrderByTableId(table.id);

  const handleStartOrder = () => {
    if (!currentServer) return;
    
    if (!table.serverId) {
      assignTableToServer(table.id, currentServer.id);
    }

    const newOrder = createOrder(table.id, 'dine-in', currentServer.id);
    setSelectedOrder(newOrder);
  };

  const handleVoidItem = (itemId: string) => {
    if (!order) return;
    const reason = prompt('Enter void reason:');
    if (reason) {
      voidOrderItem(order.id, itemId, reason);
    }
  };

  const handleCompItem = (itemId: string) => {
    if (!order) return;
    if (!isManager()) {
      alert('Manager authorization required');
      return;
    }
    const reason = prompt('Enter comp reason:');
    if (reason) {
      compOrderItem(order.id, itemId, reason);
    }
  };

  const handleSendToKitchen = () => {
    if (!order) return;
    const unsent = order.items.filter(item => !item.sentToKitchen && !item.isVoided);
    if (unsent.length === 0) {
      alert('No new items to send');
      return;
    }
    sendOrderToKitchen(order.id);
  };

  if (!order) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-slate-900 mb-2">Table {table.number}</h2>
          <p className="text-slate-600 mb-6">{table.seats} seats available</p>
          
          <div className="mb-6">
            <label className="block mb-2">
              <span className="text-sm text-slate-700">Number of guests</span>
              <input
                type="number"
                min="1"
                max={table.seats}
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                className="w-full mt-1 px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <button
            onClick={handleStartOrder}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
          >
            Start New Order
          </button>
        </div>
      </div>
    );
  }

  const activeItems = order.items.filter(item => !item.isVoided);
  const unsentItems = activeItems.filter(item => !item.sentToKitchen);
  const courseSections = ['appetizer', 'entree', 'dessert', 'beverage'];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-slate-900 mb-1">Table {table.number}</h2>
            <p className="text-sm text-slate-600">
              Order #{order.orderNumber} • {activeItems.length} items
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-900">${order.total.toFixed(2)}</p>
            <p className="text-sm text-slate-600">Total</p>
          </div>
        </div>

        {unsentItems.length > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-3">
            <p className="text-sm text-amber-900">
              {unsentItems.length} item{unsentItems.length !== 1 ? 's' : ''} not sent to kitchen
            </p>
          </div>
        )}
      </div>

      {/* Order Items by Course */}
      <div className="flex-1 overflow-auto p-6">
        {courseSections.map(course => {
          const courseItems = activeItems.filter(item => item.menuItem.course === course);
          if (courseItems.length === 0) return null;

          return (
            <div key={course} className="mb-6">
              <h3 className="text-sm text-slate-600 mb-3 uppercase tracking-wide">
                {course}s
              </h3>
              <div className="space-y-3">
                {courseItems.map(item => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg p-4 border-2 transition-all ${
                      item.isComped
                        ? 'border-green-300 bg-green-50'
                        : item.sentToKitchen
                        ? 'border-slate-200'
                        : 'border-amber-300 bg-amber-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-slate-900">{item.menuItem.name}</h4>
                          <span className="text-slate-900 ml-2">
                            ${item.totalPrice.toFixed(2)}
                          </span>
                        </div>

                        {item.modifiers.length > 0 && (
                          <div className="text-sm text-slate-600 mb-1">
                            {item.modifiers.map(mod => mod.modifier.name).join(', ')}
                          </div>
                        )}

                        {item.specialInstructions && (
                          <div className="text-sm text-blue-600 italic mb-1">
                            Note: {item.specialInstructions}
                          </div>
                        )}

                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateOrderItem(order.id, item.id, item.quantity - 1)}
                              disabled={item.sentToKitchen || item.quantity <= 1}
                              className="w-7 h-7 bg-slate-100 hover:bg-blue-50 border border-slate-200 rounded flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-slate-900">{item.quantity}</span>
                            <button
                              onClick={() => updateOrderItem(order.id, item.id, item.quantity + 1)}
                              disabled={item.sentToKitchen}
                              className="w-7 h-7 bg-slate-100 hover:bg-blue-50 border border-slate-200 rounded flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              +
                            </button>
                          </div>

                          {!item.sentToKitchen && (
                            <>
                              <button
                                onClick={() => handleVoidItem(item.id)}
                                className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                Void
                              </button>
                            </>
                          )}

                          {item.sentToKitchen && !item.isComped && isManager() && (
                            <button
                              onClick={() => handleCompItem(item.id)}
                              className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                            >
                              <Gift className="w-3 h-3" />
                              Comp
                            </button>
                          )}

                          {item.isComped && (
                            <span className="text-xs text-green-600 px-2 py-0.5 bg-green-100 rounded">
                              COMPED
                            </span>
                          )}

                          {item.sentToKitchen && !item.isComped && (
                            <span className="text-xs text-blue-600 px-2 py-0.5 bg-blue-100 rounded">
                              IN KITCHEN
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {activeItems.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p>No items in order</p>
            <p className="text-sm mt-2">Click "Add Items" to begin</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-white border-t border-slate-200">
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={onAddItems}
            className="py-3 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-2 border-blue-300 text-blue-900 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Items
          </button>
          
          <button
            onClick={handleSendToKitchen}
            disabled={unsentItems.length === 0}
            className="py-3 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-green-300 text-green-900 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            Send ({unsentItems.length})
          </button>
          
          <button
            onClick={onCheckout}
            disabled={activeItems.length === 0 || unsentItems.length > 0}
            className="py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="w-4 h-4" />
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
