import { Search, ShoppingCart, MapPin, User, Clock, TrendingUp, X, LogOut, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Address } from './AddressManager';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onCategorySelect: (category: string) => void;
  onAddressClick?: () => void;
  defaultAddress?: Address | null;
  user: { name: string; email: string } | null;
  onSignInClick: () => void;
  onSignOut: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (query: string) => void;
}

export function Header({ 
  onCartClick, 
  cartCount, 
  searchQuery, 
  setSearchQuery,
  onSearchSubmit,
  onAddressClick,
  defaultAddress,
  user,
  onSignInClick,
  onSignOut
}: HeaderProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const suggestions = [
    'Designer Handbags',
    'Luxury Watches',
    'Designer Sunglasses',
    'Fine Jewelry',
    'Premium Sneakers',
  ];

  const categories = [
    { name: 'Women', icon: '👗' },
    { name: 'Men', icon: '👔' },
    { name: 'Bags', icon: '👜' },
    { name: 'Shoes', icon: '👠' },
    { name: 'Accessories', icon: '💍' },
    { name: 'Sunglasses', icon: '🕶️' },
  ];

  const handleSearchSelect = (term: string, isCategory?: boolean) => {
    setSearchQuery(term);
    setShowSuggestions(false);
    if (onSearchSubmit) {
      onSearchSubmit(term);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-none">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-black">LUXEMODE</h1>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Fashion & Lifestyle</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black hover:bg-gray-800 text-white transition-colors">
                <Search className="w-4 h-4" />
              </button>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                  {/* Filtered Product Suggestions */}
                  {searchQuery && suggestions.length > 0 && (
                    <div className="border-b border-gray-100">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                        Dishes
                      </div>
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3"
                          onClick={() => handleSearchSelect(suggestion)}
                        >
                          <Search className="w-4 h-4 text-gray-400" />
                          <span className="flex-1">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Popular Searches */}
                  {!searchQuery && (
                    <div className="border-b border-gray-100">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                        Popular
                      </div>
                      {suggestions.map((term, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3"
                          onClick={() => handleSearchSelect(term)}
                        >
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="flex-1">{term}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Browse Categories */}
                  {!searchQuery && (
                    <div>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                        Categories
                      </div>
                      <div className="p-3 grid grid-cols-2 gap-2">
                        {categories.map((category, index) => (
                          <button
                            key={index}
                            className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all"
                            onClick={() => handleSearchSelect(category.name, true)}
                          >
                            <span className="text-xl">{category.icon}</span>
                            <span className="text-sm text-gray-900">{category.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* User Account - Simple version for fashion site */}
            {user ? (
              <div className="hidden md:flex items-center gap-2 text-gray-700">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Hi, {user.name.split(' ')[0]}</span>
              </div>
            ) : (
              <button
                onClick={onSignInClick}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Cart */}
            <button 
              onClick={onCartClick}
              className="relative px-4 py-3 bg-black hover:bg-gray-800 text-white transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold text-sm hidden md:inline">BAG</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}