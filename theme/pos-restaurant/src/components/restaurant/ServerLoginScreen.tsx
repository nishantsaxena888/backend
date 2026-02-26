import { useState } from 'react';
import { Users, AlertCircle } from 'lucide-react';
import { useRestaurantAuth } from '../../contexts/RestaurantAuthContext';

interface ServerLoginScreenProps {
  onLogin: () => void;
}

export function ServerLoginScreen({ onLogin }: ServerLoginScreenProps) {
  const { login } = useRestaurantAuth();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      
      if (newPin.length === 4) {
        setTimeout(() => handleLogin(newPin), 100);
      }
    }
  };

  const handleLogin = (pinToCheck: string) => {
    if (login(pinToCheck)) {
      onLogin();
    } else {
      setError('Invalid PIN');
      setPin('');
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 mb-2">Restaurant POS</h1>
          <p className="text-slate-600">Enter your server PIN</p>
        </div>

        {/* PIN Display */}
        <div className="mb-6">
          <div className="flex justify-center gap-3 mb-2">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center ${
                  pin.length > i
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                {pin.length > i && (
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
          {error && (
            <div className="flex items-center justify-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handlePinInput(num.toString())}
              className="h-16 bg-slate-100 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-xl text-slate-900 transition-all active:scale-95"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="h-16 bg-slate-100 hover:bg-red-50 border-2 border-slate-200 hover:border-red-300 rounded-xl text-slate-700 hover:text-red-600 text-sm transition-all active:scale-95"
          >
            Clear
          </button>
          <button
            onClick={() => handlePinInput('0')}
            className="h-16 bg-slate-100 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-xl text-slate-900 transition-all active:scale-95"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="h-16 bg-slate-100 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 rounded-xl text-slate-700 hover:text-amber-600 text-sm transition-all active:scale-95"
          >
            ←
          </button>
        </div>

        {/* Quick Login Hint */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900 text-center mb-2">Demo PINs:</p>
          <p className="text-xs text-blue-700 text-center">
            Server: 1111 / 3333 • Bartender: 2222 • Manager: 9999 • Host: 5555
          </p>
        </div>
      </div>
    </div>
  );
}
