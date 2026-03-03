import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Download, ShoppingCart, User, Package, DollarSign, Calendar, FileText } from 'lucide-react';
import { Order, OrderItem, Customer } from './DataModels';
import { InvoiceGenerator } from './InvoiceGenerator';

const mockCustomers: Customer[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0100', address: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001', country: 'USA', type: 'Retail', status: 'Active', totalOrders: 12, totalSpent: 5420.50, createdAt: '2024-01-15', tags: ['VIP'] },
  { id: 2, name: 'Acme Corp', email: 'sales@acme.com', phone: '555-0200', company: 'Acme Corporation', address: '456 Business Ave', city: 'Los Angeles', state: 'CA', zipCode: '90001', country: 'USA', type: 'Wholesale', status: 'Active', totalOrders: 45, totalSpent: 125000.00, createdAt: '2023-06-20', tags: ['Wholesale', 'Priority'] },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0300', address: '789 Oak Dr', city: 'Chicago', state: 'IL', zipCode: '60601', country: 'USA', type: 'VIP', status: 'Active', totalOrders: 28, totalSpent: 15240.75, createdAt: '2023-11-10', tags: ['VIP', 'Frequent'] },
];

const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    customerId: 1,
    customerName: 'John Doe',
    orderDate: '2024-12-01',
    dueDate: '2024-12-10',
    status: 'Delivered',
    paymentStatus: 'Paid',
    shippingMethod: 'Express',
    shippingAddress: '123 Main St, New York, NY 10001',
    billingAddress: '123 Main St, New York, NY 10001',
    subtotal: 450.00,
    tax: 40.50,
    shipping: 15.00,
    discount: 20.00,
    total: 485.50,
    createdAt: '2024-12-01',
    updatedAt: '2024-12-05',
    items: [
      { id: 1, orderId: 1, productId: 1, productName: 'Wireless Headphones', sku: 'WH-001', quantity: 2, unitPrice: 79.99, discount: 10.00, tax: 15.00, total: 164.98 },
      { id: 2, orderId: 1, productId: 2, productName: 'Smart Watch', sku: 'SW-002', quantity: 1, unitPrice: 199.99, discount: 10.00, tax: 19.00, total: 208.99 },
    ],
    tags: ['Priority', 'Express'],
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    customerId: 2,
    customerName: 'Acme Corp',
    orderDate: '2024-12-05',
    dueDate: '2024-12-20',
    status: 'Processing',
    paymentStatus: 'Partial',
    shippingMethod: 'Standard',
    shippingAddress: '456 Business Ave, Los Angeles, CA 90001',
    billingAddress: '456 Business Ave, Los Angeles, CA 90001',
    subtotal: 12500.00,
    tax: 1125.00,
    shipping: 0.00,
    discount: 625.00,
    total: 13000.00,
    createdAt: '2024-12-05',
    updatedAt: '2024-12-08',
    items: [
      { id: 3, orderId: 2, productId: 11, productName: 'Phone Case', sku: 'PC-011', quantity: 500, unitPrice: 24.99, discount: 625.00, tax: 1125.00, total: 12495.00 },
    ],
    tags: ['Wholesale', 'Bulk'],
  },
  {
    id: 3,
    orderNumber: 'ORD-2024-003',
    customerId: 3,
    customerName: 'Jane Smith',
    orderDate: '2024-12-10',
    status: 'Pending',
    paymentStatus: 'Unpaid',
    shippingMethod: 'Standard',
    shippingAddress: '789 Oak Dr, Chicago, IL 60601',
    billingAddress: '789 Oak Dr, Chicago, IL 60601',
    subtotal: 89.97,
    tax: 8.10,
    shipping: 10.00,
    discount: 0.00,
    total: 108.07,
    createdAt: '2024-12-10',
    updatedAt: '2024-12-10',
    items: [
      { id: 4, orderId: 3, productId: 4, productName: 'USB-C Cable', sku: 'UC-004', quantity: 3, unitPrice: 14.99, discount: 0.00, tax: 4.05, total: 44.97 },
      { id: 5, orderId: 3, productId: 6, productName: 'Coffee Mug', sku: 'CM-006', quantity: 2, unitPrice: 12.99, discount: 0.00, tax: 2.34, total: 25.98 },
    ],
    tags: [],
  },
];

export function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [paymentFilter, setPaymentFilter] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const paymentStatuses = ['Unpaid', 'Partial', 'Paid', 'Refunded'];

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = !searchTerm || 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(order.status);
    const matchesPayment = paymentFilter.length === 0 || paymentFilter.includes(order.paymentStatus);
    const matchesDateFrom = !dateFrom || order.orderDate >= dateFrom;
    const matchesDateTo = !dateTo || order.orderDate <= dateTo;
    
    return matchesSearch && matchesStatus && matchesPayment && matchesDateFrom && matchesDateTo;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'Unpaid':
        return 'bg-red-100 text-red-800';
      case 'Refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handleGenerateInvoice = (order: Order) => {
    setInvoiceOrder(order);
    setShowInvoice(true);
  };

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = filteredOrders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Orders Management</h2>
          <p className="text-gray-600 mt-2">Manage customer orders and track fulfillment</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          New Order
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-2xl mt-1">{totalOrders}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-2xl mt-1">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Order Value</p>
              <p className="text-2xl mt-1">${avgOrderValue.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Customers</p>
              <p className="text-2xl mt-1">{customers.filter(c => c.status === 'Active').length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <User className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order number or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="From"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="To"
            />
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm mb-2">Order Status</label>
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
            <label className="block text-sm mb-2">Payment Status</label>
            <div className="flex flex-wrap gap-2">
              {paymentStatuses.map(status => (
                <button
                  key={status}
                  onClick={() => {
                    if (paymentFilter.includes(status)) {
                      setPaymentFilter(paymentFilter.filter(s => s !== status));
                    } else {
                      setPaymentFilter([...paymentFilter, status]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    paymentFilter.includes(status)
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

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">Order #</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Items</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Payment</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-blue-600">{order.orderNumber}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div>{order.customerName}</div>
                      <div className="text-xs text-gray-500">
                        {customers.find(c => c.id === order.customerId)?.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{order.orderDate}</td>
                  <td className="px-4 py-3">{order.items.length} items</td>
                  <td className="px-4 py-3">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPaymentColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit order"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleGenerateInvoice(order)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Generate Invoice"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-2xl">Order Details</h3>
                <p className="text-gray-600 mt-1">{selectedOrder.orderNumber}</p>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="mb-3">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p>{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p>{customers.find(c => c.id === selectedOrder.customerId)?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Shipping Address</p>
                    <p>{selectedOrder.shippingAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Billing Address</p>
                    <p>{selectedOrder.billingAddress}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="mb-3">Order Items</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Product</th>
                        <th className="px-4 py-2 text-left">SKU</th>
                        <th className="px-4 py-2 text-right">Qty</th>
                        <th className="px-4 py-2 text-right">Unit Price</th>
                        <th className="px-4 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id} className="border-t border-gray-100">
                          <td className="px-4 py-2">{item.productName}</td>
                          <td className="px-4 py-2 text-gray-600">{item.sku}</td>
                          <td className="px-4 py-2 text-right">{item.quantity}</td>
                          <td className="px-4 py-2 text-right">${item.unitPrice.toFixed(2)}</td>
                          <td className="px-4 py-2 text-right">${item.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h4 className="mb-3">Order Summary</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${selectedOrder.shipping.toFixed(2)}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-${selectedOrder.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span>Total:</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Status Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${getPaymentColor(selectedOrder.paymentStatus)}`}>
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
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

      {/* Invoice Modal */}
      {showInvoice && invoiceOrder && (
        <InvoiceGenerator
          order={invoiceOrder}
          customer={customers.find(c => c.id === invoiceOrder.customerId)!}
          onClose={() => setShowInvoice(false)}
        />
      )}
    </div>
  );
}