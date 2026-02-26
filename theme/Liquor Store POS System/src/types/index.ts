// User & Permissions
export type UserRole = 'cashier' | 'supervisor' | 'manager';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  pin: string;
}

export interface Permission {
  lineItemVoid: boolean;
  fullVoid: boolean;
  priceOverride: boolean;
  ageOverride: boolean;
  managerFunctions: boolean;
  refunds: boolean;
  discounts: boolean;
}

// Products
export interface Product {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  abv?: number;
  size?: string;
  ageRestricted: boolean;
  taxable: boolean;
}

// Transaction
export interface LineItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  voided: boolean;
  voidedBy?: string;
  voidReason?: string;
}

export interface Payment {
  id: string;
  method: 'cash' | 'card' | 'digital' | 'gift_card' | 'store_credit';
  amount: number;
  timestamp: Date;
}

export type TransactionStatus = 'active' | 'held' | 'completed' | 'voided';

export interface Transaction {
  id: string;
  status: TransactionStatus;
  lineItems: LineItem[];
  payments: Payment[];
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  cashierId: string;
  customerId?: string;
  ageVerified: boolean;
  ageVerifiedBy?: string;
  createdAt: Date;
  completedAt?: Date;
  heldAt?: Date;
  holdName?: string;
}

// Age Verification
export interface AgeVerification {
  verified: boolean;
  method: 'id_scan' | 'manual_dob' | 'visual';
  verifiedBy: string;
  timestamp: Date;
  dob?: Date;
  idExpiration?: Date;
}

// Manager Override
export interface ManagerOverride {
  action: string;
  requestedBy: string;
  approvedBy?: string;
  approved: boolean;
  timestamp: Date;
  reason?: string;
}
