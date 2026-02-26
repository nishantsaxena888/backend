// Server & Staff
export type ServerRole = 'server' | 'bartender' | 'manager' | 'host';

export interface Server {
  id: string;
  name: string;
  role: ServerRole;
  pin: string;
  section?: string;
}

// Menu Items
export interface MenuModifier {
  id: string;
  name: string;
  price: number;
  category: string; // "add-ons", "substitutions", "sides", etc.
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  image: string;
  course: 'appetizer' | 'entree' | 'dessert' | 'beverage' | 'side';
  prepTime?: number; // minutes
  available: boolean;
  modifiers: string[]; // modifier IDs
  alcoholic?: boolean;
}

// Orders
export interface OrderModifier {
  id: string;
  modifier: MenuModifier;
  quantity: number;
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  modifiers: OrderModifier[];
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
  course: string;
  sentToKitchen: boolean;
  sentAt?: Date;
  voidReason?: string;
  isVoided: boolean;
  isComped: boolean;
  compReason?: string;
}

// Table & Orders
export type TableStatus = 'available' | 'occupied' | 'reserved' | 'needs-attention';
export type OrderType = 'dine-in' | 'takeout' | 'delivery';

export interface Table {
  id: string;
  number: number;
  seats: number;
  status: TableStatus;
  section: string;
  serverId?: string;
  orderId?: string;
  x?: number; // position for floor plan
  y?: number;
}

export interface Order {
  id: string;
  orderNumber: number;
  type: OrderType;
  tableId?: string;
  serverId: string;
  items: OrderItem[];
  status: 'open' | 'sent' | 'completed' | 'paid' | 'cancelled';
  subtotal: number;
  tax: number;
  total: number;
  gratuity?: number;
  discount?: number;
  discountReason?: string;
  createdAt: Date;
  sentToKitchenAt?: Date;
  completedAt?: Date;
  customerName?: string; // for takeout/delivery
  customerPhone?: string;
  specialRequests?: string;
}

// Payments
export interface CheckPayment {
  id: string;
  method: 'cash' | 'card' | 'mobile';
  amount: number;
  tip: number;
  timestamp: Date;
}

export interface Check {
  id: string;
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  gratuity: number;
  total: number;
  payments: CheckPayment[];
  amountPaid: number;
  amountDue: number;
  status: 'open' | 'paid' | 'split';
  splitFrom?: string; // original check ID if this is a split
}

// Kitchen Display
export interface KitchenTicket {
  id: string;
  orderNumber: number;
  tableNumber?: number;
  serverId: string;
  serverName: string;
  items: OrderItem[];
  orderType: OrderType;
  priority: 'normal' | 'rush';
  status: 'pending' | 'preparing' | 'ready';
  createdAt: Date;
  estimatedReadyTime?: Date;
}
