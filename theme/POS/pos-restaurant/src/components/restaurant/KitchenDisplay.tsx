import { Clock, ChefHat, CheckCircle, AlertCircle } from 'lucide-react';
import { useRestaurant } from '../../contexts/RestaurantContext';

export function KitchenDisplay() {
  const { orders } = useRestaurant();

  const activeOrders = orders.filter(o => o.status === 'sent' || o.status === 'open');

  const getOrderAge = (order: typeof activeOrders[0]) => {
    if (!order.sentToKitchenAt) return 0;
    const now = new Date();
    return Math.floor((now.getTime() - order.sentToKitchenAt.getTime()) / 60000);
  };

  const getOrderPriority = (order: typeof activeOrders[0]) => {
    const age = getOrderAge(order);
    if (age > 30) return 'urgent';
    if (age > 20) return 'warning';
    return 'normal';
  };

  const sortedOrders = [...activeOrders].sort((a, b) => {
    const ageA = getOrderAge(a);
    const ageB = getOrderAge(b);
    return ageB - ageA;
  });

  return (
    <div className="h-full overflow-auto bg-slate-900 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 text-white">
          <ChefHat className="w-8 h-8" />
          <h2 className="text-white">Kitchen Display System</h2>
          <div className="ml-auto px-4 py-2 bg-blue-600 rounded-lg">
            {activeOrders.length} Active Orders
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedOrders.map(order => {
          const priority = getOrderPriority(order);
          const age = getOrderAge(order);
          const sentItems = order.items.filter(item => item.sentToKitchen && !item.isVoided);

          const priorityColors = {
            urgent: 'bg-red-500 border-red-600',
            warning: 'bg-amber-500 border-amber-600',
            normal: 'bg-blue-500 border-blue-600',
          };

          return (
            <div
              key={order.id}
              className={`bg-white rounded-xl shadow-lg border-4 ${priorityColors[priority]} overflow-hidden`}
            >
              {/* Header */}
              <div className={`p-4 text-white ${priorityColors[priority]}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {order.type === 'dine-in' && order.tableId && (
                      <div className="px-3 py-1 bg-white bg-opacity-30 rounded-lg">
                        Table {orders.find(o => o.id === order.id)?.tableId?.replace('t', '')}
                      </div>
                    )}
                    {order.type === 'takeout' && (
                      <div className="px-3 py-1 bg-white bg-opacity-30 rounded-lg">
                        Takeout
                      </div>
                    )}
                    {order.type === 'delivery' && (
                      <div className="px-3 py-1 bg-white bg-opacity-30 rounded-lg">
                        Delivery
                      </div>
                    )}
                  </div>
                  <div className="text-2xl">#{order.orderNumber}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{age} min ago</span>
                  </div>
                  <div className="text-sm">{sentItems.length} items</div>
                </div>
              </div>

              {/* Items */}
              <div className="p-4 space-y-3 max-h-96 overflow-auto">
                {sentItems.map(item => (
                  <div
                    key={item.id}
                    className="bg-slate-50 rounded-lg p-3 border-2 border-slate-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-900 text-xs rounded">
                            {item.menuItem.course}
                          </span>
                          <span className="text-2xl text-blue-600">×{item.quantity}</span>
                        </div>
                        <h4 className="text-slate-900">{item.menuItem.name}</h4>
                      </div>
                    </div>

                    {item.modifiers.length > 0 && (
                      <div className="mb-2 pl-3 border-l-2 border-blue-300">
                        {item.modifiers.map(mod => (
                          <div key={mod.id} className="text-sm text-slate-600">
                            • {mod.modifier.name}
                          </div>
                        ))}
                      </div>
                    )}

                    {item.specialInstructions && (
                      <div className="p-2 bg-amber-50 border-l-4 border-amber-400 rounded-r">
                        <p className="text-sm text-amber-900">
                          <strong>Note:</strong> {item.specialInstructions}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all shadow-md flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Mark Complete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {activeOrders.length === 0 && (
        <div className="text-center py-20">
          <ChefHat className="w-24 h-24 mx-auto mb-4 text-slate-600" />
          <p className="text-slate-400 text-xl">No active orders</p>
        </div>
      )}
    </div>
  );
}
