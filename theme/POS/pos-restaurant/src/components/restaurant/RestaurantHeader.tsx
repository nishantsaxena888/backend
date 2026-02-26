import { LogOut, User, Clock, LayoutGrid, UtensilsCrossed, ChefHat, CreditCard, ArrowLeft } from 'lucide-react';
import { useRestaurantAuth } from '../../contexts/RestaurantAuthContext';
import { useRestaurant } from '../../contexts/RestaurantContext';
import { useState, useEffect } from 'react';

interface RestaurantHeaderProps {
  onLogout: () => void;
  viewMode: string;
  onViewModeChange: (mode: any) => void;
  onBackToFloor: () => void;
}

export function RestaurantHeader({ onLogout, viewMode, onViewModeChange, onBackToFloor }: RestaurantHeaderProps) {
  const { currentServer } = useRestaurantAuth();
  const { orders } = useRestaurant();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeOrders = orders.filter(o => o.status !== 'paid' && o.serverId === currentServer?.id);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-white">Restaurant POS</h1>
          
          {viewMode !== 'floor' && (
            <button
              onClick={onBackToFloor}
              className="flex items-center gap-2 px-3 py-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Floor Plan
            </button>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white bg-opacity-20 rounded-lg">
            <User className="w-4 h-4 text-white" />
            <span className="text-white text-sm">
              {currentServer?.name} ({currentServer?.role})
            </span>
          </div>

          {currentServer?.section && (
            <div className="px-3 py-1.5 bg-green-500 bg-opacity-80 rounded-lg">
              <span className="text-white text-sm">Section {currentServer.section}</span>
            </div>
          )}

          {activeOrders.length > 0 && (
            <div className="px-3 py-1.5 bg-amber-500 bg-opacity-80 rounded-lg">
              <span className="text-white text-sm">{activeOrders.length} Active Orders</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onViewModeChange('floor')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                viewMode === 'floor'
                  ? 'bg-white text-blue-600'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
              title="Floor Plan (F1)"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-sm">Floor</span>
            </button>
            
            <button
              onClick={() => onViewModeChange('kitchen')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                viewMode === 'kitchen'
                  ? 'bg-white text-blue-600'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
              title="Kitchen Display (F3)"
            >
              <ChefHat className="w-4 h-4" />
              <span className="text-sm">Kitchen</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-white">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-mono">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-white transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
