import { LogOut, User, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';

interface POSHeaderProps {
  onLogout: () => void;
}

export function POSHeader({ onLogout }: POSHeaderProps) {
  const { currentUser } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-white">Liquor Store POS</h1>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white bg-opacity-20 rounded-lg">
            <User className="w-4 h-4 text-white" />
            <span className="text-white text-sm">
              {currentUser?.name} ({currentUser?.role})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-mono">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-white transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
