import { useState, useEffect } from 'react';
import { POSLayout } from './components/pos/POSLayout';
import { AuthProvider } from './contexts/AuthContext';
import { TransactionProvider } from './contexts/TransactionContext';
import { LoginScreen } from './components/auth/LoginScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthProvider>
      <TransactionProvider>
        {isAuthenticated ? (
          <POSLayout onLogout={() => setIsAuthenticated(false)} />
        ) : (
          <LoginScreen onLogin={() => setIsAuthenticated(true)} />
        )}
      </TransactionProvider>
    </AuthProvider>
  );
}
