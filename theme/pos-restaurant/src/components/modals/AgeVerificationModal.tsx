import { useState } from 'react';
import { X, AlertTriangle, CheckCircle, Calendar, Scan } from 'lucide-react';
import { useTransaction } from '../../contexts/TransactionContext';
import { useAuth } from '../../contexts/AuthContext';

interface AgeVerificationModalProps {
  onVerified: () => void;
  onCancel: () => void;
}

export function AgeVerificationModal({ onVerified, onCancel }: AgeVerificationModalProps) {
  const { setAgeVerified } = useTransaction();
  const { currentUser } = useAuth();
  const [method, setMethod] = useState<'id_scan' | 'manual_dob' | 'visual' | null>(null);
  const [dob, setDob] = useState('');
  const [idExpiration, setIdExpiration] = useState('');

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleManualVerification = () => {
    if (!dob) {
      alert('Please enter date of birth');
      return;
    }

    const age = calculateAge(dob);
    if (age < 21) {
      alert(`Customer is ${age} years old. Sale cannot be completed.`);
      return;
    }

    if (idExpiration) {
      const expDate = new Date(idExpiration);
      if (expDate < new Date()) {
        alert('ID is expired. Please check valid identification.');
        return;
      }
    }

    completeVerification();
  };

  const handleIDScan = () => {
    // In production, this would integrate with ID scanner hardware
    alert('ID Scanner integration would go here. For demo, marking as verified.');
    completeVerification();
  };

  const handleVisualVerification = () => {
    if (!confirm('Have you visually confirmed the customer appears to be over 21?')) {
      return;
    }
    completeVerification();
  };

  const completeVerification = () => {
    if (!currentUser) return;
    setAgeVerified(true, currentUser.id);
    onVerified();
  };

  const handleRefuseSale = () => {
    if (confirm('Refuse sale and void transaction?')) {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h2 className="text-white mb-1">Age Verification Required</h2>
                <p className="text-amber-100 text-sm">Customer must be 21+ to purchase alcohol</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-white hover:text-amber-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Warning Notice */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <p className="text-red-900 text-sm">
              <strong>Legal Requirement:</strong> You must verify that the customer is at least 21 years of age before completing this transaction. Selling alcohol to minors is a criminal offense.
            </p>
          </div>

          {/* Verification Method Selection */}
          {!method && (
            <div>
              <h3 className="text-slate-900 mb-3">Select Verification Method</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setMethod('id_scan')}
                  className="p-6 border-2 border-blue-200 hover:border-blue-400 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all"
                >
                  <Scan className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-900">Scan ID</p>
                  <p className="text-xs text-blue-700 mt-1">Recommended</p>
                </button>

                <button
                  onClick={() => setMethod('manual_dob')}
                  className="p-6 border-2 border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-900">Manual Entry</p>
                  <p className="text-xs text-slate-700 mt-1">Enter DOB</p>
                </button>

                <button
                  onClick={() => setMethod('visual')}
                  className="p-6 border-2 border-green-200 hover:border-green-400 bg-green-50 hover:bg-green-100 rounded-xl transition-all"
                >
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-green-900">Visual Check</p>
                  <p className="text-xs text-green-700 mt-1">Over 21</p>
                </button>
              </div>
            </div>
          )}

          {/* ID Scan Method */}
          {method === 'id_scan' && (
            <div className="space-y-4">
              <button
                onClick={() => setMethod(null)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                ← Back to methods
              </button>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center">
                <Scan className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-slate-900 mb-2">Scan Driver's License</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Scan the 2D barcode on the back of the customer's driver's license
                </p>
                <button
                  onClick={handleIDScan}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
                >
                  Simulate Scan (Demo)
                </button>
              </div>
            </div>
          )}

          {/* Manual DOB Entry */}
          {method === 'manual_dob' && (
            <div className="space-y-4">
              <button
                onClick={() => setMethod(null)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                ← Back to methods
              </button>
              <div>
                <label className="block mb-2">
                  <span className="text-sm text-slate-700">Date of Birth *</span>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full mt-1 px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-slate-700">ID Expiration Date (Optional)</span>
                  <input
                    type="date"
                    value={idExpiration}
                    onChange={(e) => setIdExpiration(e.target.value)}
                    className="w-full mt-1 px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
              <button
                onClick={handleManualVerification}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
              >
                Verify Age
              </button>
            </div>
          )}

          {/* Visual Verification */}
          {method === 'visual' && (
            <div className="space-y-4">
              <button
                onClick={() => setMethod(null)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                ← Back to methods
              </button>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-slate-900 mb-2">Visual Age Check</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Use this option only when you have visually confirmed the customer is clearly over 21 years old and no ID is required.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <p className="text-xs text-amber-900">
                    <strong>Note:</strong> Many jurisdictions require ID verification for all customers regardless of apparent age. Check your local regulations.
                  </p>
                </div>
                <button
                  onClick={handleVisualVerification}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
                >
                  Confirm Customer Appears Over 21
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={handleRefuseSale}
              className="flex-1 px-6 py-3 border-2 border-red-300 text-red-700 hover:bg-red-50 rounded-lg transition-all"
            >
              Refuse Sale
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
