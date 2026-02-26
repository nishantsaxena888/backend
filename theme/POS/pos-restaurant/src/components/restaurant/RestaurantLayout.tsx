import { useState, useEffect } from 'react';
import { RestaurantHeader } from './RestaurantHeader';
import { FloorPlan } from './FloorPlan';
import { TableView } from './TableView';
import { MenuSelection } from './MenuSelection';
import { OrderView } from './OrderView';
import { CheckoutView } from './CheckoutView';
import { KitchenDisplay } from './KitchenDisplay';
import { useRestaurant } from '../../contexts/RestaurantContext';
import { useRestaurantAuth } from '../../contexts/RestaurantAuthContext';

interface RestaurantLayoutProps {
  onLogout: () => void;
}

type ViewMode = 'floor' | 'table' | 'kitchen' | 'checkout';

export function RestaurantLayout({ onLogout }: RestaurantLayoutProps) {
  const { selectedTable, selectedOrder, setSelectedTable, setSelectedOrder, tables } = useRestaurant();
  const { currentServer } = useRestaurantAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('floor');
  const [showMenu, setShowMenu] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'F1':
          e.preventDefault();
          setViewMode('floor');
          break;
        case 'F2':
          e.preventDefault();
          if (selectedOrder) setShowMenu(true);
          break;
        case 'F3':
          e.preventDefault();
          setViewMode('kitchen');
          break;
        case 'F4':
          e.preventDefault();
          if (selectedOrder) setViewMode('checkout');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOrder]);

  const handleTableSelect = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (table) {
      setSelectedTable(table);
      setViewMode('table');
    }
  };

  const handleBackToFloor = () => {
    setSelectedTable(null);
    setSelectedOrder(null);
    setViewMode('floor');
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <RestaurantHeader 
        onLogout={onLogout} 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onBackToFloor={handleBackToFloor}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'floor' && (
          <FloorPlan onTableSelect={handleTableSelect} />
        )}

        {viewMode === 'table' && selectedTable && (
          <div className="h-full flex">
            <div className="flex-1 bg-slate-50 overflow-auto">
              <TableView 
                table={selectedTable}
                onAddItems={() => setShowMenu(true)}
                onCheckout={() => setViewMode('checkout')}
              />
            </div>
            {showMenu && (
              <div className="w-2/5 bg-white border-l border-slate-200">
                <MenuSelection onClose={() => setShowMenu(false)} />
              </div>
            )}
          </div>
        )}

        {viewMode === 'kitchen' && (
          <KitchenDisplay />
        )}

        {viewMode === 'checkout' && selectedOrder && (
          <CheckoutView 
            order={selectedOrder}
            onComplete={handleBackToFloor}
            onCancel={() => setViewMode('table')}
          />
        )}
      </div>
    </div>
  );
}