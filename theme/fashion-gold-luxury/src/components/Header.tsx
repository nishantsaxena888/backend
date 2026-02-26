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
  onRegisterClick: () => void;
  onSignOut: () => void;
}

export function Header({ 
  cartCount, 
  onCartClick, 
  onCategorySelect, 
  onAddressClick,
  defaultAddress,
  user,
  onSignInClick,
  onSignOut
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const categories = [
    { name: 'Bags', icon: '👜' },
    { name: 'Sunglasses', icon: '🕶️' },
    { name: 'Perfume', icon: '💐' },
    { name: 'Jewelry', icon: '💎' },
    { name: 'Clothing', icon: '👗' },
    { name: 'Shoes', icon: '👠' },
  ];

  const popularSearches = ['Gucci', 'Ray-Ban', 'Chanel', 'Designer Bags', 'Luxury Perfume', 'Jewelry'];

  const allSuggestions = [
    'Gucci Marmont', 'Ray-Ban Aviator', 'Chanel No. 5', 'Tiffany Bracelet',
    'Louis Vuitton Bag', 'Prada Sunglasses', 'Dior Sauvage', 'Cartier Love Bracelet',
    'Hermes Birkin', 'Tom Ford Perfume', 'Versace T-Shirt', 'Louboutin Pumps'
  ];

  const filteredSuggestions = searchQuery
    ? allSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const handleSearchSelect = (term: string, isCategory = false) => {
    setSearchQuery(term);
    setShowSuggestions(false);
    if (isCategory) {
      onCategorySelect(term);
    }
    if (!recentSearches.includes(term)) {
      setRecentSearches([term, ...recentSearches].slice(0, 5));
    }
  };

  const handleRemoveSearch = (term: string) => {
    setRecentSearches(recentSearches.filter(s => s !== term));
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-2xl sticky top-0 z-50 border-b border-amber-900/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 p-2.5 rounded-xl shadow-lg shadow-yellow-900/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200">LuxeMode</h1>
              <p className="text-xs text-yellow-200/70">Luxury Fashion & Accessories</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search luxury fashion, bags, perfumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full px-4 py-2.5 pr-12 bg-white/10 border border-yellow-900/30 rounded-xl text-white placeholder-yellow-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent focus:bg-white/15 transition-all backdrop-blur-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-md transition-colors">
                <Search className="w-4 h-4" />
              </button>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                  {/* Filtered Product Suggestions */}
                  {searchQuery && filteredSuggestions.length > 0 && (
                    <div className="border-b border-gray-100">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                        Dishes
                      </div>
                      {filteredSuggestions.map((suggestion, index) => (
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

                  {/* Recent Searches */}
                  {!searchQuery && recentSearches.length > 0 && (
                    <div className="border-b border-gray-100">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 flex items-center justify-between">
                        <span>Recent</span>
                        <button
                          onClick={clearAllRecent}
                          className="text-green-600 hover:text-green-700 font-medium"
                        >
                          Clear all
                        </button>
                      </div>
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3 group"
                          onClick={() => handleSearchSelect(term)}
                        >
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="flex-1">{term}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveSearch(term);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                          >
                            <X className="w-3 h-3 text-gray-500" />
                          </button>
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
                      {popularSearches.map((term, index) => (
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
            {/* Address */}
            <button 
              onClick={onAddressClick}
              className="hidden lg:flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <MapPin className="w-5 h-5 text-white" />
              <div className="text-left">
                <p className="text-xs text-gray-400">Deliver to</p>
                <p className="text-sm text-white font-medium">
                  {defaultAddress ? `${defaultAddress.city}` : 'Select'}
                </p>
              </div>
            </button>

            {/* Account */}
            {user ? (
              <div className="relative">
                <button 
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  onBlur={() => setTimeout(() => setShowUserMenu(false), 200)}
                >
                  <User className="w-5 h-5 text-white" />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs text-gray-400">Hello</p>
                    <p className="text-sm text-white font-medium">{user.name}</p>
                  </div>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[200px]">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-xl">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm text-gray-900 truncate font-medium">{user.name}</p>
                    </div>
                    <button
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3 group"
                      onClick={() => {
                        setShowUserMenu(false);
                        onSignOut();
                      }}
                    >
                      <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
                      <span className="flex-1 group-hover:text-red-600">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onSignInClick}
                className="px-4 py-2 bg-white hover:bg-gray-100 text-black rounded-lg transition-colors font-semibold text-sm"
              >
                Sign In
              </button>
            )}

            {/* Cart */}
            <button 
              onClick={onCartClick}
              className="relative px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-yellow-900/30"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              <span className="text-white font-semibold text-sm hidden md:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
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