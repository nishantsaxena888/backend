import { TrendingUp, TrendingDown, Package, AlertTriangle, DollarSign, ShoppingCart, Utensils, Warehouse, Wine } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const salesData = [
  { month: 'Jan', sales: 4200, orders: 120 },
  { month: 'Feb', sales: 3800, orders: 98 },
  { month: 'Mar', sales: 5100, orders: 145 },
  { month: 'Apr', sales: 4600, orders: 132 },
  { month: 'May', sales: 6200, orders: 178 },
  { month: 'Jun', sales: 7100, orders: 201 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#3b82f6' },
  { name: 'Clothing', value: 25, color: '#10b981' },
  { name: 'Food & Beverage', value: 20, color: '#f59e0b' },
  { name: 'Books', value: 12, color: '#8b5cf6' },
  { name: 'Other', value: 8, color: '#6b7280' },
];

const topProducts = [
  { id: 1, name: 'Wireless Headphones', sold: 342, revenue: 25650 },
  { id: 2, name: 'Smart Watch', sold: 289, revenue: 57800 },
  { id: 3, name: 'Laptop Stand', sold: 267, revenue: 8010 },
  { id: 4, name: 'USB-C Cable', sold: 245, revenue: 3675 },
  { id: 5, name: 'Desk Lamp', sold: 198, revenue: 8910 },
];

interface DashboardProps {
  onNavigate?: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl">Dashboard</h2>
        <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>

      {/* POS Applications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button onClick={() => onNavigate?.('restaurant-pos')} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all group flex items-center justify-between cursor-pointer w-full text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
              <Utensils className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Add Restaurant Item</h3>
              <p className="text-sm text-gray-500">Create new menu items</p>
            </div>
          </div>
          <span className="text-gray-400 group-hover:text-orange-500 transition-colors">→</span>
        </button>

        <button onClick={() => onNavigate?.('warehouse-pos')} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group flex items-center justify-between cursor-pointer w-full text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <Warehouse className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Add Warehouse Item</h3>
              <p className="text-sm text-gray-500">Register new inventory</p>
            </div>
          </div>
          <span className="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
        </button>

        <button onClick={() => onNavigate?.('liquor-pos')} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all group flex items-center justify-between cursor-pointer w-full text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
              <Wine className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Add Liquor Item</h3>
              <p className="text-sm text-gray-500">Register new beverages</p>
            </div>
          </div>
          <span className="text-gray-400 group-hover:text-purple-500 transition-colors">→</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <span className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              12.5%
            </span>
          </div>
          <p className="text-gray-600 mb-1">Total Products</p>
          <p className="text-3xl">1,284</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              8.2%
            </span>
          </div>
          <p className="text-gray-600 mb-1">Total Revenue</p>
          <p className="text-3xl">$124,593</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <span className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              15.3%
            </span>
          </div>
          <p className="text-gray-600 mb-1">Total Orders</p>
          <p className="text-3xl">874</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <span className="flex items-center gap-1 text-red-600">
              <TrendingDown className="w-4 h-4" />
              3.1%
            </span>
          </div>
          <p className="text-gray-600 mb-1">Low Stock Items</p>
          <p className="text-3xl">23</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl">Top Selling Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Product Name</th>
                <th className="px-6 py-3 text-left">Units Sold</th>
                <th className="px-6 py-3 text-left">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.sold}</td>
                  <td className="px-6 py-4">${product.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}
