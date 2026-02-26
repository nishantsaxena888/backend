import { useState } from 'react';
import { RestaurantLayout } from './components/restaurant/RestaurantLayout';
import { RestaurantAuthProvider } from './contexts/RestaurantAuthContext';
import { RestaurantProvider } from './contexts/RestaurantContext';
import { ServerLoginScreen } from './components/restaurant/ServerLoginScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <RestaurantAuthProvider>
      <RestaurantProvider>
        {isAuthenticated ? (
          <RestaurantLayout onLogout={() => setIsAuthenticated(false)} />
        ) : (
          <ServerLoginScreen onLogin={() => setIsAuthenticated(true)} />
        )}
      </RestaurantProvider>
    </RestaurantAuthProvider>
  );
}
