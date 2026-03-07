import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { InventoryTable } from './components/InventoryTable';
import { OrdersManagement } from './components/OrdersManagement';
import { CustomersManagement } from './components/CustomersManagement';
import { SuppliersManagement } from './components/SuppliersManagement';
import { LocationsManagement } from './components/LocationsManagement';
import { LayoutDashboard, Package, Menu, X, ShoppingCart, Users, Building2, MapPin, BarChart3, Utensils, Warehouse, Wine } from 'lucide-react';
import { RestaurantProductForm } from './components/forms/RestaurantProductForm';
import { WarehouseProductForm } from './components/forms/WarehouseProductForm';
import { LiquorProductForm } from './components/forms/LiquorProductForm';

type View = 'dashboard' | 'inventory' | 'orders' | 'customers' | 'suppliers' | 'locations' | 'reports' | 'restaurant-pos' | 'warehouse-pos' | 'liquor-pos';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'
          } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl">Low-Code Platform</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 mt-2">Platform Area</div>
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'dashboard'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Dashboard</span>}
          </button>

          <button
            onClick={() => setCurrentView('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'inventory'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <Package className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Products</span>}
          </button>

          <button
            onClick={() => setCurrentView('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'orders'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <ShoppingCart className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Orders</span>}
          </button>

          <button
            onClick={() => setCurrentView('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'customers'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <Users className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Customers</span>}
          </button>

          <button
            onClick={() => setCurrentView('suppliers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'suppliers'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <Building2 className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Suppliers</span>}
          </button>

          <button
            onClick={() => setCurrentView('locations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'locations'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <MapPin className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Locations</span>}
          </button>

          <button
            onClick={() => setCurrentView('reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'reports'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <BarChart3 className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Reports</span>}
          </button>
          {/* POS Links */}
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 mt-8">External Systems</div>

          <button
            onClick={() => setCurrentView('restaurant-pos')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${currentView === 'restaurant-pos' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <div className="flex items-center gap-3">
              <Utensils className={`w-5 h-5 flex-shrink-0 ${currentView === 'restaurant-pos' ? 'text-orange-600' : 'text-orange-500'}`} />
              {sidebarOpen && <span>Add Restaurant Item</span>}
            </div>
          </button>

          <button
            onClick={() => setCurrentView('warehouse-pos')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${currentView === 'warehouse-pos' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <div className="flex items-center gap-3">
              <Warehouse className={`w-5 h-5 flex-shrink-0 ${currentView === 'warehouse-pos' ? 'text-blue-600' : 'text-blue-500'}`} />
              {sidebarOpen && <span>Add Warehouse Item</span>}
            </div>
          </button>

          <button
            onClick={() => setCurrentView('liquor-pos')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${currentView === 'liquor-pos' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <div className="flex items-center gap-3">
              <Wine className={`w-5 h-5 flex-shrink-0 ${currentView === 'liquor-pos' ? 'text-purple-600' : 'text-purple-500'}`} />
              {sidebarOpen && <span>Add Liquor Item</span>}
            </div>
          </button>
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm">Low-Code Platform</p>
              <p className="text-xs text-gray-600 mt-1">
                Complete inventory & order management with extensive relationships
              </p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {currentView === 'dashboard' && <Dashboard onNavigate={(v) => setCurrentView(v as View)} />}
          {currentView === 'inventory' && <InventoryTable />}
          {currentView === 'orders' && <OrdersManagement />}
          {currentView === 'customers' && <CustomersManagement />}
          {currentView === 'suppliers' && <SuppliersManagement />}
          {currentView === 'locations' && <LocationsManagement />}
          {currentView === 'reports' && (
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h2 className="text-3xl mb-4">Reports & Analytics</h2>
              <p className="text-gray-600">Advanced reporting with data from all modules. Coming soon...</p>
              <div className="mt-6 bg-blue-50 p-6 rounded-lg">
                <p className="text-sm">Available Reports:</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li>• Sales by Customer (using Order → Customer relationship)</li>
                  <li>• Inventory by Location (using Product → Location relationship)</li>
                  <li>• Supplier Performance (using Supplier → Purchase Orders)</li>
                  <li>• Product Movement (using Inventory Transactions)</li>
                </ul>
              </div>
            </div>
          )}
          {currentView === 'restaurant-pos' && <RestaurantProductForm />}
          {currentView === 'warehouse-pos' && <WarehouseProductForm />}
          {currentView === 'liquor-pos' && <LiquorProductForm />}
        </div>
      </main>
    </div >
  );
}