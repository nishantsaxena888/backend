import { Users, Clock, Plus } from 'lucide-react';
import { useRestaurant } from '../../contexts/RestaurantContext';
import { useRestaurantAuth } from '../../contexts/RestaurantAuthContext';
import type { Table } from '../../types/restaurant';

interface FloorPlanProps {
  onTableSelect: (tableId: string) => void;
}

export function FloorPlan({ onTableSelect }: FloorPlanProps) {
  const { tables, orders, getOrderByTableId } = useRestaurant();
  const { currentServer } = useRestaurantAuth();

  const sections = Array.from(new Set(tables.map(t => t.section)));

  const getTableColor = (table: Table) => {
    switch (table.status) {
      case 'available':
        return 'bg-green-50 border-green-300 hover:border-green-500';
      case 'occupied':
        return 'bg-blue-50 border-blue-400 hover:border-blue-600';
      case 'needs-attention':
        return 'bg-amber-50 border-amber-400 hover:border-amber-600';
      case 'reserved':
        return 'bg-purple-50 border-purple-300 hover:border-purple-500';
      default:
        return 'bg-slate-50 border-slate-300';
    }
  };

  const getTableIcon = (table: Table) => {
    const order = table.orderId ? getOrderByTableId(table.id) : null;
    if (!order) return null;

    const now = new Date();
    const orderTime = order.createdAt;
    const minutesElapsed = Math.floor((now.getTime() - orderTime.getTime()) / 60000);

    return (
      <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border-2 border-blue-400">
        <Clock className="w-3 h-3 text-blue-600" />
      </div>
    );
  };

  return (
    <div className="h-full overflow-auto bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-slate-900 mb-2">Floor Plan</h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded"></div>
              <span className="text-slate-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-400 rounded"></div>
              <span className="text-slate-600">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-100 border-2 border-amber-400 rounded"></div>
              <span className="text-slate-600">Needs Attention</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 border-2 border-purple-400 rounded"></div>
              <span className="text-slate-600">Reserved</span>
            </div>
          </div>
        </div>

        {sections.map(section => (
          <div key={section} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-slate-900">Section {section}</h3>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tables.filter(t => t.section === section).map(table => {
                const order = table.orderId ? getOrderByTableId(table.id) : null;
                const isMyTable = table.serverId === currentServer?.id;

                return (
                  <button
                    key={table.id}
                    onClick={() => onTableSelect(table.id)}
                    className={`relative p-6 border-2 rounded-xl transition-all hover:shadow-lg active:scale-95 ${getTableColor(table)} ${
                      isMyTable ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    {getTableIcon(table)}
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-2xl text-slate-900">{table.number}</span>
                      </div>
                      
                      <div className="flex items-center justify-center gap-1 text-xs text-slate-600 mb-2">
                        <Users className="w-3 h-3" />
                        <span>{table.seats} seats</span>
                      </div>

                      {order && (
                        <div className="mt-2 pt-2 border-t border-slate-200">
                          <p className="text-xs text-slate-600">
                            ${order.total.toFixed(2)}
                          </p>
                          <p className="text-xs text-slate-500">
                            {order.items.filter(i => !i.isVoided).length} items
                          </p>
                        </div>
                      )}

                      {table.status === 'available' && (
                        <div className="mt-2 text-xs text-green-700">
                          Click to seat
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="mt-8 p-6 bg-white rounded-xl border-2 border-slate-200">
          <h3 className="text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-400 rounded-lg transition-all">
              <Plus className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-900">New Takeout</p>
            </button>
            <button className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-400 rounded-lg transition-all">
              <Plus className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-green-900">New Delivery</p>
            </button>
            <button className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-400 rounded-lg transition-all">
              <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-purple-900">Reservations</p>
            </button>
            <button className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-400 rounded-lg transition-all">
              <Users className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <p className="text-sm text-amber-900">My Tables</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
