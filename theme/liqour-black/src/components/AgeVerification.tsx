import { Wine, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface AgeVerificationProps {
  onVerified: () => void;
}

export function AgeVerification({ onVerified }: AgeVerificationProps) {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!month || !day || !year) {
      setError('Please enter your complete date of birth');
      return;
    }

    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 21) {
      setError('You must be 21 or older to access this site');
      return;
    }

    localStorage.setItem('ageVerified', 'true');
    onVerified();
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-500/10 to-gray-600/10 rounded-full blur-3xl -z-10"></div>
        
        {/* Header */}
        <div className="p-8 pb-6 text-center border-b border-gray-200">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-2xl mb-4 shadow-lg">
            <Wine className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl text-slate-900 mb-2 font-bold">
            Age Verification Required
          </h2>
          <p className="text-sm text-slate-600">
            You must be 21 years of age or older to enter this site
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="p-8 space-y-6">
          <div>
            <label className="block text-sm text-slate-700 mb-3 font-medium">
              Please enter your date of birth
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <input
                  type="number"
                  min="1"
                  max="12"
                  placeholder="MM"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-center"
                />
                <p className="text-xs text-gray-500 mt-1 text-center">Month</p>
              </div>
              <div>
                <input
                  type="number"
                  min="1"
                  max="31"
                  placeholder="DD"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-center"
                />
                <p className="text-xs text-gray-500 mt-1 text-center">Day</p>
              </div>
              <div>
                <input
                  type="number"
                  min="1900"
                  max="2024"
                  placeholder="YYYY"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-center"
                />
                <p className="text-xs text-gray-500 mt-1 text-center">Year</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
          >
            Enter Site
          </button>

          {/* Legal Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs text-amber-900 text-center leading-relaxed">
              <span className="font-semibold">Legal Notice:</span> By entering this site, you agree to our terms and confirm you are of legal drinking age in New Jersey (21+). Please drink responsibly.
            </p>
          </div>

          {/* State Notice */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              Licensed for delivery in <span className="font-semibold text-gray-700">New Jersey</span> only
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
