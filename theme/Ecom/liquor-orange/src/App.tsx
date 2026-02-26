import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { ProductDetail } from './components/ProductDetail';
import { AddressManager, getDefaultAddress, Address } from './components/AddressManager';
import { AuthModal } from './components/AuthModal';
import { AgeVerification } from './components/AgeVerification';
import { liquorProducts, LiquorProduct } from './data/liquorProducts';
import { X } from 'lucide-react';

export interface Product extends LiquorProduct {
  quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAddressManagerOpen, setIsAddressManagerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Check age verification on mount
  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setIsAgeVerified(true);
    }
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Load default address on mount and when address manager is closed
  useEffect(() => {
    const address = getDefaultAddress();
    setDefaultAddress(address);
  }, [isAddressManagerOpen]);

  // Listen for address updates (when user clicks "Set Default" or adds/edits addresses)
  useEffect(() => {
    const handleAddressUpdate = () => {
      const address = getDefaultAddress();
      console.log('Address updated:', address); // Debug log
      setDefaultAddress(address);
    };

    window.addEventListener('addressesUpdated', handleAddressUpdate);
    return () => window.removeEventListener('addressesUpdated', handleAddressUpdate);
  }, []);

  const addToCart = (product: Product, customization?: {
    selectedSize?: string;
    selectedAddons?: string[];
    selectedOptions?: { [key: string]: string };
    customizationPrice?: number;
  }) => {
    setCartItems((prev) => {
      // Check if adding from different restaurant
      const existingRestaurants = [...new Set(prev.map(item => item.restaurant?.id).filter(Boolean))];
      if (product.restaurant && existingRestaurants.length > 0 && !existingRestaurants.includes(product.restaurant.id)) {
        // Clear cart if from different restaurant
        if (!confirm(`Your cart contains items from ${prev[0]?.restaurant?.name}. Adding items from ${product.restaurant.name} will clear your cart. Continue?`)) {
          return prev;
        }
        return [{ ...product, quantity: 1, ...customization }];
      }

      // Find existing item with same customization
      const existing = prev.find((item) => 
        item.id === product.id &&
        item.selectedSize === customization?.selectedSize &&
        JSON.stringify(item.selectedAddons) === JSON.stringify(customization?.selectedAddons) &&
        JSON.stringify(item.selectedOptions) === JSON.stringify(customization?.selectedOptions)
      );

      if (existing) {
        return prev.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, ...customization }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        onCategorySelect={setSelectedCategory}
        onAddressClick={() => setIsAddressManagerOpen(true)}
        defaultAddress={defaultAddress}
        user={user}
        onSignInClick={() => {
          setAuthMode('signin');
          setIsAuthModalOpen(true);
        }}
        onRegisterClick={() => {
          setAuthMode('register');
          setIsAuthModalOpen(true);
        }}
        onSignOut={() => {
          setUser(null);
          localStorage.removeItem('user');
        }}
      />
      <NavBar 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <HeroSection />
      <ProductGrid 
        onAddToCart={addToCart} 
        onProductClick={setSelectedProduct}
        selectedCategory={selectedCategory}
      />
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onClearCart={() => setCartItems([])}
      />

      {/* Address Manager Modal */}
      {isAddressManagerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsAddressManagerOpen(false)}
          />
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Manage Addresses</h2>
                <button
                  onClick={() => setIsAddressManagerOpen(false)}
                  className="hover:bg-white/20 p-2 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <AddressManager mode="manage" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onAuthSuccess={(user) => {
          setUser(user);
          setIsAuthModalOpen(false);
        }}
      />

      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        cartItems={cartItems}
      />

      {/* Age Verification Modal */}
      {!isAgeVerified && (
        <AgeVerification
          onVerified={() => {
            setIsAgeVerified(true);
            localStorage.setItem('ageVerified', 'true');
          }}
        />
      )}
    </div>
  );
}