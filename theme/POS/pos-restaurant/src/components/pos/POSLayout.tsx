import { useState, useEffect } from 'react';
import { ProductEntry } from './ProductEntry';
import { TransactionPanel } from './TransactionPanel';
import { ActionPanel } from './ActionPanel';
import { POSHeader } from './POSHeader';
import { AgeVerificationModal } from '../modals/AgeVerificationModal';
import { ManagerOverrideModal } from '../modals/ManagerOverrideModal';
import { CheckoutModal } from '../modals/CheckoutModal';
import { HoldRecallModal } from '../modals/HoldRecallModal';
import { ReceiptModal } from '../modals/ReceiptModal';
import { useTransaction } from '../../contexts/TransactionContext';
import { useAuth } from '../../contexts/AuthContext';
import type { Transaction } from '../../types';

interface POSLayoutProps {
  onLogout: () => void;
}

export function POSLayout({ onLogout }: POSLayoutProps) {
  const { currentTransaction, startNewTransaction, voidTransaction } = useTransaction();
  const { currentUser, hasPermission } = useAuth();
  const [showAgeVerification, setShowAgeVerification] = useState(false);
  const [showManagerOverride, setShowManagerOverride] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showHoldRecall, setShowHoldRecall] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [completedTransaction, setCompletedTransaction] = useState<Transaction | null>(null);
  const [overrideAction, setOverrideAction] = useState('');
  const [overrideCallback, setOverrideCallback] = useState<((approved: boolean) => void) | null>(null);

  useEffect(() => {
    // Start a new transaction when component mounts
    if (!currentTransaction) {
      startNewTransaction();
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'F2':
          e.preventDefault();
          handleCheckoutClick();
          break;
        case 'F3':
          e.preventDefault();
          setShowHoldRecall(true);
          break;
        case 'F8':
          e.preventDefault();
          handleVoidShortcut();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTransaction]);

  const handleVoidShortcut = () => {
    if (!currentTransaction) return;
    
    const activeItems = currentTransaction.lineItems.filter(item => !item.voided);
    if (activeItems.length === 0) return;

    if (!hasPermission('fullVoid')) {
      alert('Manager override required for full void');
      return;
    }

    if (confirm('Void entire transaction?')) {
      const reason = prompt('Enter void reason:');
      if (reason) {
        voidTransaction(reason);
      }
    }
  };

  const handleCheckoutClick = () => {
    if (!currentTransaction || currentTransaction.lineItems.length === 0) return;

    // Check if age verification is needed
    const hasAgeRestrictedItems = currentTransaction.lineItems.some(
      item => !item.voided && item.product.ageRestricted
    );

    if (hasAgeRestrictedItems && !currentTransaction.ageVerified) {
      setShowAgeVerification(true);
    } else {
      setShowCheckout(true);
    }
  };

  const handleAgeVerified = () => {
    setShowAgeVerification(false);
    setShowCheckout(true);
  };

  const handleTransactionComplete = (transaction: Transaction) => {
    setCompletedTransaction(transaction);
    setShowCheckout(false);
    setShowReceipt(true);
  };

  const requestManagerOverride = (action: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setOverrideAction(action);
      setOverrideCallback(() => resolve);
      setShowManagerOverride(true);
    });
  };

  const handleManagerOverrideResult = (approved: boolean) => {
    setShowManagerOverride(false);
    if (overrideCallback) {
      overrideCallback(approved);
      setOverrideCallback(null);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <POSHeader onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Product Entry */}
        <div className="w-96 bg-white border-r border-slate-200">
          <ProductEntry />
        </div>

        {/* Center: Transaction Items */}
        <div className="flex-1 bg-slate-50">
          <TransactionPanel onRequestManagerOverride={requestManagerOverride} />
        </div>

        {/* Right: Action Panel */}
        <div className="w-80 bg-white border-l border-slate-200">
          <ActionPanel
            onCheckout={handleCheckoutClick}
            onHold={() => setShowHoldRecall(true)}
          />
        </div>
      </div>

      {/* Modals */}
      {showAgeVerification && (
        <AgeVerificationModal
          onVerified={handleAgeVerified}
          onCancel={() => setShowAgeVerification(false)}
        />
      )}

      {showManagerOverride && (
        <ManagerOverrideModal
          action={overrideAction}
          onApprove={() => handleManagerOverrideResult(true)}
          onDeny={() => handleManagerOverrideResult(false)}
        />
      )}

      {showCheckout && currentTransaction && (
        <CheckoutModal
          transaction={currentTransaction}
          onComplete={handleTransactionComplete}
          onCancel={() => setShowCheckout(false)}
        />
      )}

      {showHoldRecall && (
        <HoldRecallModal onClose={() => setShowHoldRecall(false)} />
      )}

      {showReceipt && completedTransaction && (
        <ReceiptModal
          transaction={completedTransaction}
          onClose={() => {
            setShowReceipt(false);
            setCompletedTransaction(null);
          }}
        />
      )}
    </div>
  );
}