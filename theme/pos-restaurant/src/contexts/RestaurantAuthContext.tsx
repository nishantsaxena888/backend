import { createContext, useContext, useState, ReactNode } from 'react';
import type { Server, ServerRole } from '../types/restaurant';

interface RestaurantAuthContextType {
  currentServer: Server | null;
  login: (pin: string) => boolean;
  logout: () => void;
  isManager: () => boolean;
}

const RestaurantAuthContext = createContext<RestaurantAuthContextType | null>(null);

// Mock servers
const SERVERS: Server[] = [
  { id: '1', name: 'Alice Server', role: 'server', pin: '1111', section: 'A' },
  { id: '2', name: 'Bob Bartender', role: 'bartender', pin: '2222', section: 'Bar' },
  { id: '3', name: 'Charlie Server', role: 'server', pin: '3333', section: 'B' },
  { id: '4', name: 'Diana Manager', role: 'manager', pin: '9999' },
  { id: '5', name: 'Eve Host', role: 'host', pin: '5555' },
];

export function RestaurantAuthProvider({ children }: { children: ReactNode }) {
  const [currentServer, setCurrentServer] = useState<Server | null>(null);

  const login = (pin: string): boolean => {
    const server = SERVERS.find(s => s.pin === pin);
    if (server) {
      setCurrentServer(server);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentServer(null);
  };

  const isManager = (): boolean => {
    return currentServer?.role === 'manager';
  };

  return (
    <RestaurantAuthContext.Provider value={{ currentServer, login, logout, isManager }}>
      {children}
    </RestaurantAuthContext.Provider>
  );
}

export function useRestaurantAuth() {
  const context = useContext(RestaurantAuthContext);
  if (!context) throw new Error('useRestaurantAuth must be used within RestaurantAuthProvider');
  return context;
}
