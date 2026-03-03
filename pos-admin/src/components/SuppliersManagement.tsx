import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Download, Building2, Package, Star, TrendingUp } from 'lucide-react';
import { Supplier } from './DataModels';

const mockSuppliers: Supplier[] = [
  { id: 1, name: 'Tech Distributors Inc', code: 'SUP-001', contactPerson: 'Alice Johnson', email: 'alice@techdist.com', phone: '555-1001', address: '100 Tech Way', city: 'San Jose', country: 'USA', rating: 5, status: 'Active', paymentTerms: 'Net 30', leadTime: 7, notes: 'Reliable electronics supplier', createdAt: '2023-01-15', lastOrderDate: '2024-12-10', products: [1, 2, 3, 4, 5], tags: ['Electronics', 'Reliable'] },
  { id: 2, name: 'Global Electronics Co', code: 'SUP-002', contactPerson: 'Bob Chen', email: 'bob@globalelec.com', phone: '555-1002', address: '200 Industrial Blvd', city: 'Shenzhen', country: 'China', rating: 4, status: 'Active', paymentTerms: 'Net 45', leadTime: 21, notes: 'Large volume supplier', createdAt: '2022-06-20', lastOrderDate: '2024-12-08', products: [1, 2, 6, 7, 8], tags: ['Electronics', 'International', 'Bulk'] },
  { id: 3, name: 'Premium Accessories Ltd', code: 'SUP-003', contactPerson: 'Carol Martinez', email: 'carol@premium.com', phone: '555-1003', address: '300 Fashion Ave', city: 'New York', country: 'USA', rating: 5, status: 'Active', paymentTerms: 'Net 30', leadTime: 5, notes: 'High-quality accessories', createdAt: '2023-03-10', lastOrderDate: '2024-12-12', products: [9, 10, 11], tags: ['Accessories', 'Premium'] },
  { id: 4, name: 'Budget Parts Wholesale', code: 'SUP-004', contactPerson: 'David Lee', email: 'david@budget.com', phone: '555-1004', address: '400 Warehouse Dr', city: 'Houston', country: 'USA', rating: 3, status: 'Active', paymentTerms: 'Net 60', leadTime: 14, notes: 'Competitive pricing', createdAt: '2023-08-22', lastOrderDate: '2024-11-28', products: [12, 13, 14], tags: ['Budget', 'Wholesale'] },
  { id: 5, name: 'Eco-Friendly Products Inc', code: 'SUP-005', contactPerson: 'Emma Green', email: 'emma@ecofriendly.com', phone: '555-1005', address: '500 Green Street', city: 'Portland', country: 'USA', rating: 5, status: 'Active', paymentTerms: 'Net 30', leadTime: 10, notes: 'Sustainable products', createdAt: '2024-02-14', lastOrderDate: '2024-12-05', products: [15, 16], tags: ['Eco-Friendly', 'Sustainable'] },
  { id: 6, name: 'Fast Ship Logistics', code: 'SUP-006', contactPerson: 'Frank Wilson', email: 'frank@fastship.com', phone: '555-1006', address: '600 Express Lane', city: 'Memphis', country: 'USA', rating: 4, status: 'Active', paymentTerms: 'Net 15', leadTime: 3, notes: 'Quick turnaround', createdAt: '2023-11-05', lastOrderDate: '2024-12-11', products: [17, 18, 19], tags: ['Fast Delivery', 'Logistics'] },
  { id: 7, name: 'Quality Components Corp', code: 'SUP-007', contactPerson: 'Grace Kim', email: 'grace@quality.com', phone: '555-1007', address: '700 Quality Rd', city: 'Detroit', country: 'USA', rating: 5, status: 'Active', paymentTerms: 'Net 30', leadTime: 7, notes: 'ISO certified', createdAt: '2022-09-18', products: [20, 21, 22], tags: ['Quality', 'Certified'] },
  { id: 8, name: 'Discontinued Supplier', code: 'SUP-008', contactPerson: 'Henry Brown', email: 'henry@old.com', phone: '555-1008', address: '800 Old Ave', city: 'Boston', country: 'USA', rating: 2, status: 'Inactive', paymentTerms: 'Net 30', leadTime: 30, notes: 'No longer active', createdAt: '2021-05-12', lastOrderDate: '2023-06-15', products: [], tags: [] },
];

export function SuppliersManagement() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const statuses = ['Active', 'Inactive', 'Pending'];
  const ratings = [5, 4, 3, 2, 1];

  // Filter suppliers
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = !searchTerm || 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(supplier.status);
    const matchesRating = ratingFilter.length === 0 || ratingFilter.includes(supplier.rating);
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setShowDetails(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(s => s.id !== id));
    }
  };

  const totalSuppliers = filteredSuppliers.length;
  const activeSuppliers = filteredSuppliers.filter(s => s.status === 'Active').length;
  const avgRating = totalSuppliers > 0 
    ? filteredSuppliers.reduce((sum, s) => sum + s.rating, 0) / totalSuppliers 
    : 0;
  const totalProducts = filteredSuppliers.reduce((sum, s) => sum + s.products.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Suppliers Management</h2>
          <p className="text-gray-600 mt-2">Manage supplier relationships and sourcing</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          New Supplier
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Suppliers</p>
              <p className="text-2xl mt-1">{totalSuppliers}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Suppliers</p>
              <p className="text-2xl mt-1">{activeSuppliers}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Rating</p>
              <p className="text-2xl mt-1">{avgRating.toFixed(1)}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Products</p>
              <p className="text-2xl mt-1">{totalProducts}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
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
              placeholder="Search by name, code, or contact person..."
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
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Rating</label>
            <div className="flex flex-wrap gap-2">
              {ratings.map(rating => (
                <button
                  key={rating}
                  onClick={() => {
                    if (ratingFilter.includes(rating)) {
                      setRatingFilter(ratingFilter.filter(r => r !== rating));
                    } else {
                      setRatingFilter([...ratingFilter, rating]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 ${
                    ratingFilter.includes(rating)
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating} <Star className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">Supplier</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-right">Lead Time</th>
                <th className="px-4 py-3 text-right">Products</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div>{supplier.name}</div>
                      <div className="text-xs text-gray-500">{supplier.code}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <div>{supplier.contactPerson}</div>
                      <div className="text-gray-500">{supplier.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {supplier.city}, {supplier.country}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(supplier.status)}`}>
                      {supplier.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: supplier.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">{supplier.leadTime} days</td>
                  <td className="px-4 py-3 text-right">{supplier.products.length}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(supplier)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit supplier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(supplier.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete supplier"
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

      {/* Supplier Details Modal */}
      {showDetails && selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-2xl">{selectedSupplier.name}</h3>
                <p className="text-gray-600 mt-1">{selectedSupplier.code}</p>
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
                  <p className="text-sm text-gray-600">Contact Person</p>
                  <p>{selectedSupplier.contactPerson}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p>{selectedSupplier.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p>{selectedSupplier.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(selectedSupplier.status)}`}>
                    {selectedSupplier.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Address</p>
                <p>{selectedSupplier.address}</p>
                <p>{selectedSupplier.city}, {selectedSupplier.country}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: selectedSupplier.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lead Time</p>
                  <p className="text-xl">{selectedSupplier.leadTime} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Terms</p>
                  <p>{selectedSupplier.paymentTerms}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Products</p>
                  <p className="text-xl">{selectedSupplier.products.length}</p>
                </div>
              </div>

              {selectedSupplier.lastOrderDate && (
                <div>
                  <p className="text-sm text-gray-600">Last Order Date</p>
                  <p>{selectedSupplier.lastOrderDate}</p>
                </div>
              )}

              {selectedSupplier.notes && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Notes</p>
                  <p className="bg-gray-50 p-3 rounded-lg">{selectedSupplier.notes}</p>
                </div>
              )}

              {selectedSupplier.tags.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSupplier.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">Relationships: Many-to-Many</p>
                <p className="text-xs text-gray-600 mt-1">
                  This supplier provides {selectedSupplier.products.length} products. Suppliers can provide multiple products, and products can have multiple suppliers.
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
