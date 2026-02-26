import { useState } from 'react';
import { X, CreditCard, Truck, CheckCircle, ArrowLeft, MapPin } from 'lucide-react';
import { CartItem } from '../App';
import { AddressManager, Address, getSavedAddresses } from './AddressManager';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
}

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'success';

export function Checkout({ isOpen, onClose, items, onClearCart }: CheckoutProps) {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleContinueWithAddress = () => {
    if (selectedAddress || (useNewAddress && shippingInfo.fullName && shippingInfo.email && shippingInfo.address)) {
      setStep('payment');
    }
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    setUseNewAddress(false);
    // Populate shipping info from selected address
    setShippingInfo({
      fullName: address.fullName,
      email: '', // Email is separate from saved addresses
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      phone: address.phone,
    });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const handlePlaceOrder = () => {
    setStep('success');
    setTimeout(() => {
      onClearCart();
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setStep('shipping');
    setShippingInfo({
      fullName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
    });
    setPaymentInfo({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={step !== 'success' ? handleClose : undefined}
      />

      {/* Checkout Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {step !== 'shipping' && step !== 'success' && (
                <button
                  onClick={() => {
                    if (step === 'payment') setStep('shipping');
                    if (step === 'review') setStep('payment');
                  }}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h2 className="text-2xl">Checkout</h2>
                {step !== 'success' && (
                  <p className="text-sm text-blue-100 mt-1">
                    {step === 'shipping' && 'Shipping Information'}
                    {step === 'payment' && 'Payment Details'}
                    {step === 'review' && 'Review Your Order'}
                  </p>
                )}
              </div>
            </div>
            {step !== 'success' && (
              <button
                onClick={handleClose}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Progress Steps */}
          {step !== 'success' && (
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 'shipping' ? 'bg-blue-600 text-white' : 'bg-green-500 text-white'
                  }`}>
                    {step === 'shipping' ? '1' : <CheckCircle className="w-5 h-5" />}
                  </div>
                  <span className="text-sm text-gray-700">Shipping</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 'shipping' ? 'bg-gray-300 text-gray-600' : 
                    step === 'payment' ? 'bg-blue-600 text-white' : 'bg-green-500 text-white'
                  }`}>
                    {step === 'review' ? <CheckCircle className="w-5 h-5" /> : '2'}
                  </div>
                  <span className="text-sm text-gray-700">Payment</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 'review' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    3
                  </div>
                  <span className="text-sm text-gray-700">Review</span>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {step === 'shipping' && (
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Saved Addresses or New Address Toggle */}
                {getSavedAddresses().length > 0 && !useNewAddress && (
                  <div>
                    <AddressManager 
                      mode="select"
                      selectedAddressId={selectedAddress?.id}
                      onSelectAddress={handleSelectAddress}
                    />
                    
                    <div className="mt-6">
                      <button
                        onClick={() => setUseNewAddress(true)}
                        className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                      >
                        <MapPin className="w-5 h-5" />
                        <span>Use a different address</span>
                      </button>
                    </div>

                    {/* Email field (not stored in address) */}
                    {selectedAddress && (
                      <div className="mt-6">
                        <label className="block text-sm text-gray-700 mb-2">Email for Order Confirmation *</label>
                        <input
                          type="email"
                          required
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="john@example.com"
                        />
                      </div>
                    )}

                    <button
                      onClick={handleContinueWithAddress}
                      disabled={!selectedAddress || !shippingInfo.email}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-4 rounded-xl transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}

                {/* New Address Form */}
                {(getSavedAddresses().length === 0 || useNewAddress) && (
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    {useNewAddress && (
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg text-gray-900">Enter New Address</h3>
                        <button
                          type="button"
                          onClick={() => setUseNewAddress(false)}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          ← Back to saved addresses
                        </button>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.fullName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Street Address *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="123 Main St, Apt 4B"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">State *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="NY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">ZIP Code *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="10001"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-4 rounded-xl transition-all mt-6 font-semibold"
                    >
                      Continue to Payment
                    </button>
                  </form>
                )}
              </div>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="max-w-2xl mx-auto space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    required
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-4 rounded-xl transition-all mt-6 font-semibold"
                >
                  Review Order
                </button>
              </form>
            )}

            {step === 'review' && (
              <div className="max-w-3xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Shipping Info */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg text-gray-900">Shipping Address</h3>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{shippingInfo.fullName}</p>
                      <p>{shippingInfo.address}</p>
                      <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                      <p>{shippingInfo.phone}</p>
                      <p>{shippingInfo.email}</p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg text-gray-900">Payment Method</h3>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                      <p>{paymentInfo.cardName}</p>
                      <p>Expires: {paymentInfo.expiryDate}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 bg-white rounded-lg p-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-300 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Shipping:</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Tax:</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl text-gray-900 pt-2 border-t border-gray-300">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-4 rounded-xl transition-all text-lg font-semibold shadow-lg hover:shadow-xl"
                >
                  Place Order - ${total.toFixed(2)}
                </button>
              </div>
            )}

            {step === 'success' && (
              <div className="max-w-md mx-auto text-center py-12">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
                <h3 className="text-3xl text-gray-900 mb-4">Order Successful!</h3>
                <p className="text-gray-600 mb-2">
                  Thank you for your purchase, {shippingInfo.fullName}!
                </p>
                <p className="text-gray-500 text-sm mb-8">
                  A confirmation email has been sent to {shippingInfo.email}
                </p>
                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-2">Order Total</p>
                  <p className="text-3xl text-blue-600">${total.toFixed(2)}</p>
                </div>
                <p className="text-gray-500 text-sm">
                  Redirecting to home page...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}