import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Download, User, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { Customer } from './DataModels';

const mockCustomers: Customer[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0100', address: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001', country: 'USA', type: 'Retail', status: 'Active', totalOrders: 12, totalSpent: 5420.50, createdAt: '2024-01-15', tags: ['VIP'] },
  { id: 2, name: 'Acme Corp', email: 'sales@acme.com', phone: '555-0200', company: 'Acme Corporation', address: '456 Business Ave', city: 'Los Angeles', state: 'CA', zipCode: '90001', country: 'USA', type: 'Wholesale', status: 'Active', totalOrders: 45, totalSpent: 125000.00, createdAt: '2023-06-20', creditLimit: 150000, tags: ['Wholesale', 'Priority'] },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0300', address: '789 Oak Dr', city: 'Chicago', state: 'IL', zipCode: '60601', country: 'USA', type: 'VIP', status: 'Active', totalOrders: 28, totalSpent: 15240.75, createdAt: '2023-11-10', lastOrderDate: '2024-12-08', tags: ['VIP', 'Frequent'] },
  { id: 4, name: 'Tech Solutions Inc', email: 'info@techsol.com', phone: '555-0400', company: 'Tech Solutions', address: '321 Tech Park', city: 'San Francisco', state: 'CA', zipCode: '94102', country: 'USA', type: 'Wholesale', status: 'Active', totalOrders: 67, totalSpent: 234500.00, createdAt: '2023-03-12', creditLimit: 250000, lastOrderDate: '2024-12-10', tags: ['Wholesale', 'Enterprise'] },
  { id: 5, name: 'Mike Johnson', email: 'mike@email.com', phone: '555-0500', address: '555 Pine St', city: 'Seattle', state: 'WA', zipCode: '98101', country: 'USA', type: 'Retail', status: 'Inactive', totalOrders: 3, totalSpent: 890.25, createdAt: '2024-08-22', tags: [] },
  { id: 6, name: 'Global Retailers Ltd', email: 'orders@globalret.com', phone: '555-0600', company: 'Global Retailers', address: '777 Commerce Blvd', city: 'Miami', state: 'FL', zipCode: '33101', country: 'USA', type: 'Wholesale', status: 'Active', totalOrders: 89, totalSpent: 456700.00, createdAt: '2022-11-05', creditLimit: 500000, lastOrderDate: '2024-12-12', tags: ['Wholesale', 'International'] },
  { id: 7, name: 'Sarah Williams', email: 'sarah.w@email.com', phone: '555-0700', address: '999 Maple Ave', city: 'Boston', state: 'MA', zipCode: '02101', country: 'USA', type: 'VIP', status: 'Active', totalOrders: 42, totalSpent: 28450.00, createdAt: '2023-07-18', lastOrderDate: '2024-12-11', tags: ['VIP', 'Loyal'] },
  { id: 8, name: 'Budget Stores Co', email: 'purchasing@budget.com', phone: '555-0800', company: 'Budget Stores', address: '111 Discount Dr', city: 'Dallas', state: 'TX', zipCode: '75201', country: 'USA', type: 'Wholesale', status: 'Active', totalOrders: 34, totalSpent: 78900.00, createdAt: '2024-02-28', creditLimit: 100000, lastOrderDate: '2024-12-09', tags: ['Wholesale'] },
];

export function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const types = ['Retail', 'Wholesale', 'VIP'];
  const statuses = ['Active', 'Inactive', 'Suspended'];

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = !searchTerm || 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter.length === 0 || typeFilter.includes(customer.type);
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(customer.status);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'Wholesale':
        return 'bg-blue-100 text-blue-800';
      case 'Retail':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetails(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const totalCustomers = filteredCustomers.length;
  const activeCustomers = filteredCustomers.filter(c => c.status === 'Active').length;
  const totalRevenue = filteredCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgCustomerValue = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Customers Management</h2>
          <p className="text-gray-600 mt-2">Manage customer accounts and relationships</p>
        </div>
        <button 
          onClick={() => { setEditingCustomer(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Customer
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Customers</p>
              <p className="text-2xl mt-1">{totalCustomers}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Customers</p>
              <p className="text-2xl mt-1">{activeCustomers}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-2xl mt-1">${totalRevenue.toFixed(0)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Customer Value</p>
              <p className="text-2xl mt-1">${avgCustomerValue.toFixed(0)}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm mb-2">Customer Type</label>
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => {
                    if (typeFilter.includes(type)) {
                      setTypeFilter(typeFilter.filter(t => t !== type));
                    } else {
                      setTypeFilter([...typeFilter, type]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    typeFilter.includes(type)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Status</label>
            <div className="flex flex-wrap gap-2">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => {
                    if (statusFilter.includes(status)) {
                      setStatusFilter(statusFilter.filter(s => s !== status));
                    } else {
                      setStatusFilter([...statusFilter, status]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    statusFilter.includes(status)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Orders</th>
                <th className="px-4 py-3 text-right">Total Spent</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div>{customer.name}</div>
                      {customer.company && (
                        <div className="text-xs text-gray-500">{customer.company}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <div>{customer.email}</div>
                      <div className="text-gray-500">{customer.phone}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {customer.city}, {customer.state}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(customer.type)}`}>
                      {customer.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">{customer.totalOrders}</td>
                  <td className="px-4 py-3 text-right">${customer.totalSpent.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(customer)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(customer)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit customer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete customer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {showDetails && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-2xl">{selectedCustomer.name}</h3>
                <p className="text-gray-600 mt-1">{selectedCustomer.company}</p>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p>{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p>{selectedCustomer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${getTypeColor(selectedCustomer.type)}`}>
                    {selectedCustomer.type}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(selectedCustomer.status)}`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Address</p>
                <p>{selectedCustomer.address}</p>
                <p>{selectedCustomer.city}, {selectedCustomer.state} {selectedCustomer.zipCode}</p>
                <p>{selectedCustomer.country}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-xl">{selectedCustomer.totalOrders}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-xl">${selectedCustomer.totalSpent.toFixed(2)}</p>
                </div>
                {selectedCustomer.creditLimit && (
                  <div>
                    <p className="text-sm text-gray-600">Credit Limit</p>
                    <p className="text-xl">${selectedCustomer.creditLimit.toFixed(2)}</p>
                  </div>
                )}
                {selectedCustomer.lastOrderDate && (
                  <div>
                    <p className="text-sm text-gray-600">Last Order</p>
                    <p>{selectedCustomer.lastOrderDate}</p>
                  </div>
                )}
              </div>

              {selectedCustomer.tags.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">Relationship: One-to-Many</p>
                <p className="text-xs text-gray-600 mt-1">
                  This customer has {selectedCustomer.totalOrders} orders. View in Orders module to see details.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetails(false)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
