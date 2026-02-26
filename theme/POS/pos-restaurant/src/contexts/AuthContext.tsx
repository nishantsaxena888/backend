import { createContext, useContext, useState, ReactNode } from 'react';
import type { User, UserRole, Permission } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (pin: string) => boolean;
  logout: () => void;
  hasPermission: (permission: keyof Permission) => boolean;
  requestManagerOverride: (action: string) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users - in production this would be from a database
const USERS: User[] = [
  { id: '1', name: 'John Cashier', role: 'cashier', pin: '1234' },
  { id: '2', name: 'Sarah Supervisor', role: 'supervisor', pin: '2345' },
  { id: '3', name: 'Mike Manager', role: 'manager', pin: '3456' },
];

const ROLE_PERMISSIONS: Record<UserRole, Permission> = {
  cashier: {
    lineItemVoid: false,
    fullVoid: false,
    priceOverride: false,
    ageOverride: false,
    managerFunctions: false,
    refunds: false,
    discounts: false,
  },
  supervisor: {
    lineItemVoid: true,
    fullVoid: true,
    priceOverride: true,
    ageOverride: false,
    managerFunctions: false,
    refunds: true,
    discounts: true,
  },
  manager: {
    lineItemVoid: true,
    fullVoid: true,
    priceOverride: true,
    ageOverride: true,
    managerFunctions: true,
    refunds: true,
    discounts: true,
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (pin: string): boolean => {
    const user = USERS.find(u => u.pin === pin);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const hasPermission = (permission: keyof Permission): boolean => {
    if (!currentUser) return false;
    return ROLE_PERMISSIONS[currentUser.role][permission];
  };

  const requestManagerOverride = async (action: string): Promise<User | null> => {
    // This would show a manager override modal in production
    // For now, return null to simulate denial
    return null;
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, hasPermission, requestManagerOverride }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
