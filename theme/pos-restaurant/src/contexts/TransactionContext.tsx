import { createContext, useContext, useState, ReactNode } from 'react';
import type { Transaction, LineItem, Product, Payment, TransactionStatus } from '../types';
import { useAuth } from './AuthContext';

interface TransactionContextType {
  currentTransaction: Transaction | null;
  heldTransactions: Transaction[];
  addLineItem: (product: Product, quantity?: number) => void;
  updateLineItemQuantity: (lineItemId: string, quantity: number) => void;
  voidLineItem: (lineItemId: string, reason: string) => boolean;
  voidTransaction: (reason: string) => boolean;
  holdTransaction: (holdName: string) => void;
  recallTransaction: (transactionId: string) => void;
  addPayment: (payment: Omit<Payment, 'id' | 'timestamp'>) => void;
  completeTransaction: () => Transaction | null;
  setAgeVerified: (verified: boolean, verifiedBy: string) => void;
  calculateTotals: () => void;
  startNewTransaction: () => void;
}

const TransactionContext = createContext<TransactionContextType | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [heldTransactions, setHeldTransactions] = useState<Transaction[]>([]);

  const startNewTransaction = () => {
    if (!currentUser) return;
    
    const newTransaction: Transaction = {
      id: `TXN-${Date.now()}`,
      status: 'active',
      lineItems: [],
      payments: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      amountPaid: 0,
      amountDue: 0,
      cashierId: currentUser.id,
      ageVerified: false,
      createdAt: new Date(),
    };
    
    setCurrentTransaction(newTransaction);
  };

  const addLineItem = (product: Product, quantity: number = 1) => {
    if (!currentTransaction) {
      startNewTransaction();
    }

    setCurrentTransaction(prev => {
      if (!prev) return null;

      const existingItem = prev.lineItems.find(
        item => item.product.id === product.id && !item.voided
      );

      if (existingItem) {
        return {
          ...prev,
          lineItems: prev.lineItems.map(item =>
            item.id === existingItem.id
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  lineTotal: (item.quantity + quantity) * item.unitPrice,
                }
              : item
          ),
        };
      }

      const newLineItem: LineItem = {
        id: `LINE-${Date.now()}-${Math.random()}`,
        product,
        quantity,
        unitPrice: product.price,
        lineTotal: product.price * quantity,
        voided: false,
      };

      return {
        ...prev,
        lineItems: [...prev.lineItems, newLineItem],
      };
    });

    calculateTotals();
  };

  const updateLineItemQuantity = (lineItemId: string, quantity: number) => {
    if (quantity <= 0) return;

    setCurrentTransaction(prev => {
      if (!prev) return null;

      return {
        ...prev,
        lineItems: prev.lineItems.map(item =>
          item.id === lineItemId
            ? {
                ...item,
                quantity,
                lineTotal: quantity * item.unitPrice,
              }
            : item
        ),
      };
    });

    calculateTotals();
  };

  const voidLineItem = (lineItemId: string, reason: string): boolean => {
    if (!currentUser) return false;

    setCurrentTransaction(prev => {
      if (!prev) return null;

      return {
        ...prev,
        lineItems: prev.lineItems.map(item =>
          item.id === lineItemId
            ? {
                ...item,
                voided: true,
                voidedBy: currentUser.id,
                voidReason: reason,
              }
            : item
        ),
      };
    });

    calculateTotals();
    return true;
  };

  const voidTransaction = (reason: string): boolean => {
    if (!currentTransaction || !currentUser) return false;

    setCurrentTransaction(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: 'voided',
      };
    });

    // Start fresh transaction
    setTimeout(() => startNewTransaction(), 100);
    return true;
  };

  const holdTransaction = (holdName: string) => {
    if (!currentTransaction) return;

    const heldTransaction: Transaction = {
      ...currentTransaction,
      status: 'held',
      heldAt: new Date(),
      holdName,
    };

    setHeldTransactions(prev => [...prev, heldTransaction]);
    startNewTransaction();
  };

  const recallTransaction = (transactionId: string) => {
    const transaction = heldTransactions.find(t => t.id === transactionId);
    if (!transaction) return;

    setCurrentTransaction({ ...transaction, status: 'active' });
    setHeldTransactions(prev => prev.filter(t => t.id !== transactionId));
  };

  const addPayment = (payment: Omit<Payment, 'id' | 'timestamp'>) => {
    setCurrentTransaction(prev => {
      if (!prev) return null;

      const newPayment: Payment = {
        ...payment,
        id: `PAY-${Date.now()}`,
        timestamp: new Date(),
      };

      const newAmountPaid = prev.amountPaid + payment.amount;
      const newAmountDue = prev.total - newAmountPaid;

      return {
        ...prev,
        payments: [...prev.payments, newPayment],
        amountPaid: newAmountPaid,
        amountDue: Math.max(0, newAmountDue),
      };
    });
  };

  const completeTransaction = (): Transaction | null => {
    if (!currentTransaction || currentTransaction.amountDue > 0) return null;

    const completedTransaction: Transaction = {
      ...currentTransaction,
      status: 'completed',
      completedAt: new Date(),
    };

    // In production, save to database here
    startNewTransaction();
    return completedTransaction;
  };

  const setAgeVerified = (verified: boolean, verifiedBy: string) => {
    setCurrentTransaction(prev => {
      if (!prev) return null;
      return {
        ...prev,
        ageVerified: verified,
        ageVerifiedBy: verifiedBy,
      };
    });
  };

  const calculateTotals = () => {
    setCurrentTransaction(prev => {
      if (!prev) return null;

      const activeItems = prev.lineItems.filter(item => !item.voided);
      const subtotal = activeItems.reduce((sum, item) => sum + item.lineTotal, 0);
      const tax = subtotal * 0.08; // 8% tax
      const total = subtotal + tax;
      const amountDue = total - prev.amountPaid;

      return {
        ...prev,
        subtotal,
        tax,
        total,
        amountDue: Math.max(0, amountDue),
      };
    });
  };

  return (
    <TransactionContext.Provider
      value={{
        currentTransaction,
        heldTransactions,
        addLineItem,
        updateLineItemQuantity,
        voidLineItem,
        voidTransaction,
        holdTransaction,
        recallTransaction,
        addPayment,
        completeTransaction,
        setAgeVerified,
        calculateTotals,
        startNewTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(TransactionContext);
  if (!context) throw new Error('useTransaction must be used within TransactionProvider');
  return context;
}
