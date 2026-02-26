import { createContext, useContext, useState, ReactNode } from 'react';
import type { Table, Order, OrderItem, MenuItem, OrderModifier, MenuModifier, TableStatus, OrderType } from '../types/restaurant';

interface RestaurantContextType {
  tables: Table[];
  orders: Order[];
  selectedTable: Table | null;
  selectedOrder: Order | null;
  setSelectedTable: (table: Table | null) => void;
  setSelectedOrder: (order: Order | null) => void;
  updateTableStatus: (tableId: string, status: TableStatus) => void;
  createOrder: (tableId: string | undefined, type: OrderType, serverId: string) => Order;
  addItemToOrder: (orderId: string, menuItem: MenuItem, modifiers: MenuModifier[], specialInstructions?: string) => void;
  updateOrderItem: (orderId: string, itemId: string, quantity: number) => void;
  voidOrderItem: (orderId: string, itemId: string, reason: string) => void;
  compOrderItem: (orderId: string, itemId: string, reason: string) => void;
  sendOrderToKitchen: (orderId: string) => void;
  completeOrder: (orderId: string) => void;
  getOrderByTableId: (tableId: string) => Order | undefined;
  getOrdersByServerId: (serverId: string) => Order[];
  assignTableToServer: (tableId: string, serverId: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | null>(null);

// Mock initial tables
const INITIAL_TABLES: Table[] = [
  { id: 't1', number: 1, seats: 2, status: 'available', section: 'A', x: 50, y: 50 },
  { id: 't2', number: 2, seats: 2, status: 'available', section: 'A', x: 150, y: 50 },
  { id: 't3', number: 3, seats: 4, status: 'available', section: 'A', x: 50, y: 150 },
  { id: 't4', number: 4, seats: 4, status: 'available', section: 'A', x: 150, y: 150 },
  { id: 't5', number: 5, seats: 6, status: 'available', section: 'B', x: 300, y: 50 },
  { id: 't6', number: 6, seats: 6, status: 'available', section: 'B', x: 300, y: 150 },
  { id: 't7', number: 7, seats: 4, status: 'available', section: 'B', x: 450, y: 50 },
  { id: 't8', number: 8, seats: 4, status: 'available', section: 'B', x: 450, y: 150 },
  { id: 't9', number: 9, seats: 8, status: 'available', section: 'Bar', x: 600, y: 100 },
  { id: 't10', number: 10, seats: 2, status: 'available', section: 'Bar', x: 700, y: 100 },
];

let orderCounter = 1;

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const updateTableStatus = (tableId: string, status: TableStatus) => {
    setTables(prev => prev.map(table => 
      table.id === tableId ? { ...table, status } : table
    ));
  };

  const createOrder = (tableId: string | undefined, type: OrderType, serverId: string): Order => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      orderNumber: orderCounter++,
      type,
      tableId,
      serverId,
      items: [],
      status: 'open',
      subtotal: 0,
      tax: 0,
      total: 0,
      createdAt: new Date(),
    };

    setOrders(prev => [...prev, newOrder]);
    
    if (tableId) {
      setTables(prev => prev.map(table =>
        table.id === tableId 
          ? { ...table, status: 'occupied', orderId: newOrder.id, serverId }
          : table
      ));
    }

    return newOrder;
  };

  const addItemToOrder = (
    orderId: string,
    menuItem: MenuItem,
    modifiers: MenuModifier[],
    specialInstructions?: string
  ) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const modifierPrice = modifiers.reduce((sum, mod) => sum + mod.price, 0);
      const totalPrice = menuItem.price + modifierPrice;

      const newItem: OrderItem = {
        id: `ITEM-${Date.now()}-${Math.random()}`,
        menuItem,
        quantity: 1,
        modifiers: modifiers.map(m => ({
          id: `MOD-${Date.now()}-${Math.random()}`,
          modifier: m,
          quantity: 1,
        })),
        specialInstructions,
        unitPrice: totalPrice,
        totalPrice,
        course: menuItem.course,
        sentToKitchen: false,
        isVoided: false,
        isComped: false,
      };

      const updatedItems = [...order.items, newItem];
      const subtotal = updatedItems
        .filter(item => !item.isVoided)
        .reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
      const tax = subtotal * 0.08;
      const total = subtotal + tax;

      return {
        ...order,
        items: updatedItems,
        subtotal,
        tax,
        total,
      };
    }));
  };

  const updateOrderItem = (orderId: string, itemId: string, quantity: number) => {
    if (quantity <= 0) return;

    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const updatedItems = order.items.map(item =>
        item.id === itemId
          ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
          : item
      );

      const subtotal = updatedItems
        .filter(item => !item.isVoided)
        .reduce((sum, item) => sum + item.totalPrice, 0);
      const tax = subtotal * 0.08;
      const total = subtotal + tax;

      return {
        ...order,
        items: updatedItems,
        subtotal,
        tax,
        total,
      };
    }));
  };

  const voidOrderItem = (orderId: string, itemId: string, reason: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const updatedItems = order.items.map(item =>
        item.id === itemId
          ? { ...item, isVoided: true, voidReason: reason }
          : item
      );

      const subtotal = updatedItems
        .filter(item => !item.isVoided)
        .reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
      const tax = subtotal * 0.08;
      const total = subtotal + tax;

      return {
        ...order,
        items: updatedItems,
        subtotal,
        tax,
        total,
      };
    }));
  };

  const compOrderItem = (orderId: string, itemId: string, reason: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const updatedItems = order.items.map(item =>
        item.id === itemId
          ? { ...item, isComped: true, compReason: reason }
          : item
      );

      const subtotal = updatedItems
        .filter(item => !item.isVoided && !item.isComped)
        .reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
      const tax = subtotal * 0.08;
      const total = subtotal + tax;

      return {
        ...order,
        items: updatedItems,
        subtotal,
        tax,
        total,
      };
    }));
  };

  const sendOrderToKitchen = (orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const updatedItems = order.items.map(item =>
        !item.sentToKitchen ? { ...item, sentToKitchen: true, sentAt: new Date() } : item
      );

      return {
        ...order,
        items: updatedItems,
        status: 'sent',
        sentToKitchenAt: new Date(),
      };
    }));
  };

  const completeOrder = (orderId: string) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? { ...order, status: 'completed', completedAt: new Date() }
        : order
    ));
  };

  const getOrderByTableId = (tableId: string): Order | undefined => {
    return orders.find(order => order.tableId === tableId && order.status !== 'paid');
  };

  const getOrdersByServerId = (serverId: string): Order[] => {
    return orders.filter(order => order.serverId === serverId && order.status !== 'paid');
  };

  const assignTableToServer = (tableId: string, serverId: string) => {
    setTables(prev => prev.map(table =>
      table.id === tableId ? { ...table, serverId } : table
    ));
  };

  return (
    <RestaurantContext.Provider
      value={{
        tables,
        orders,
        selectedTable,
        selectedOrder,
        setSelectedTable,
        setSelectedOrder,
        updateTableStatus,
        createOrder,
        addItemToOrder,
        updateOrderItem,
        voidOrderItem,
        compOrderItem,
        sendOrderToKitchen,
        completeOrder,
        getOrderByTableId,
        getOrdersByServerId,
        assignTableToServer,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) throw new Error('useRestaurant must be used within RestaurantProvider');
  return context;
}
