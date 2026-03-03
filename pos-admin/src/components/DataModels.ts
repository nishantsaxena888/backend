// Core Data Models for Low-Code Platform

// Product (existing with extended relationships)
export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  cost: number; // for profit calculations
  stock: number;
  reorderLevel: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  warranty: string;
  description: string;
  lastUpdated: string;
  createdAt: string;
  
  // Many-to-Many Relationships
  tags: string[];
  suppliers: string[]; // Supplier IDs
  locations: string[]; // Location IDs
  categories: string[]; // Multiple categories
  
  // One-to-Many (Product belongs to one)
  primarySupplierId?: string;
  manufacturerId?: string;
}

// Supplier
export interface Supplier {
  id: number;
  name: string;
  code: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  rating: number; // 1-5
  status: 'Active' | 'Inactive' | 'Pending';
  paymentTerms: string;
  leadTime: number; // days
  notes: string;
  createdAt: string;
  lastOrderDate?: string;
  
  // Many-to-Many
  products: number[]; // Product IDs
  tags: string[];
}

// Customer
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  type: 'Retail' | 'Wholesale' | 'VIP';
  status: 'Active' | 'Inactive' | 'Suspended';
  totalOrders: number;
  totalSpent: number;
  creditLimit?: number;
  createdAt: string;
  lastOrderDate?: string;
  
  // One-to-Many
  assignedSalesRep?: string;
  
  // Many-to-Many
  tags: string[];
}

// Order
export interface Order {
  id: number;
  orderNumber: string;
  customerId: number; // One-to-Many: Order belongs to one Customer
  customerName: string; // denormalized for display
  orderDate: string;
  dueDate?: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Unpaid' | 'Partial' | 'Paid' | 'Refunded';
  shippingMethod: string;
  shippingAddress: string;
  billingAddress: string;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  
  // One-to-Many: One Order has many OrderItems
  items: OrderItem[];
  
  // Many-to-Many
  tags: string[];
  assignedTo?: string; // user/employee ID
}

// OrderItem (junction/join table with additional data)
export interface OrderItem {
  id: number;
  orderId: number; // Foreign key to Order
  productId: number; // Foreign key to Product
  productName: string; // denormalized
  sku: string; // denormalized
  quantity: number;
  unitPrice: number;
  discount: number;
  tax: number;
  total: number;
  notes?: string;
}

// Location/Warehouse
export interface Location {
  id: number;
  name: string;
  code: string;
  type: 'Warehouse' | 'Store' | 'Distribution Center';
  address: string;
  city: string;
  state: string;
  country: string;
  capacity: number;
  currentUtilization: number; // percentage
  manager: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  createdAt: string;
  
  // Many-to-Many
  products: number[]; // Product IDs stored here
}

// Inventory Transaction (One-to-Many: Product has many transactions)
export interface InventoryTransaction {
  id: number;
  productId: number;
  productName: string; // denormalized
  locationId: number;
  locationName: string; // denormalized
  type: 'Purchase' | 'Sale' | 'Transfer' | 'Adjustment' | 'Return';
  quantity: number; // negative for outgoing
  previousStock: number;
  newStock: number;
  unitCost?: number;
  totalCost?: number;
  reason?: string;
  referenceNumber?: string; // order ID, PO number, etc.
  performedBy: string;
  createdAt: string;
}

// Purchase Order
export interface PurchaseOrder {
  id: number;
  poNumber: string;
  supplierId: number; // One-to-Many: PO belongs to one Supplier
  supplierName: string; // denormalized
  orderDate: string;
  expectedDate?: string;
  receivedDate?: string;
  status: 'Draft' | 'Sent' | 'Confirmed' | 'Received' | 'Cancelled';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  
  // One-to-Many: One PO has many POItems
  items: PurchaseOrderItem[];
}

// Purchase Order Item
export interface PurchaseOrderItem {
  id: number;
  purchaseOrderId: number;
  productId: number;
  productName: string; // denormalized
  sku: string; // denormalized
  quantity: number;
  receivedQuantity: number;
  unitCost: number;
  total: number;
}

// Category (hierarchical - self-referencing relationship)
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId?: number; // self-referencing for hierarchy
  level: number; // 0 for root, 1 for child, etc.
  sortOrder: number;
  isActive: boolean;
  imageUrl?: string;
  
  // Many-to-Many with Products
  productCount: number;
}

// Manufacturer
export interface Manufacturer {
  id: number;
  name: string;
  code: string;
  country: string;
  website?: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  logo?: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  
  // One-to-Many: One Manufacturer has many Products
  productCount: number;
}

// User/Employee
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'Admin' | 'Manager' | 'Sales' | 'Warehouse' | 'Viewer';
  department: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  phone?: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  
  // One-to-Many: User can be assigned to many Orders/Tasks
  assignedOrders: number[];
  assignedCustomers: number[];
}

// Relationship Types Summary:
// 
// One-to-Many:
// - Customer → Orders (one customer has many orders)
// - Order → OrderItems (one order has many items)
// - Product → InventoryTransactions (one product has many transactions)
// - Supplier → PurchaseOrders (one supplier has many POs)
// - PurchaseOrder → PurchaseOrderItems (one PO has many items)
// - Manufacturer → Products (one manufacturer makes many products)
// - Category → Category (parent-child hierarchy)
// - User → Orders (one user assigned to many orders)
//
// Many-to-Many:
// - Product ↔ Supplier (products can have multiple suppliers, suppliers provide multiple products)
// - Product ↔ Location (products stored in multiple locations, locations store multiple products)
// - Product ↔ Category (products can belong to multiple categories)
// - Product ↔ Tags (products can have multiple tags)
// - Customer ↔ Tags (customers can have multiple tags)
// - Order ↔ Tags (orders can have multiple tags)
//
// Many-to-Many with Junction Table:
// - Order ↔ Product (through OrderItem with additional fields like quantity, price)
// - PurchaseOrder ↔ Product (through PurchaseOrderItem)
