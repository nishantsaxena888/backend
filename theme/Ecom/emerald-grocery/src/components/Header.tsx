import { Search, ShoppingCart, MapPin, User, Phone, Clock, TrendingUp, X, LogOut, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
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

export function Header({ cartCount, onCartClick, onCategorySelect, onAddressClick, defaultAddress, user, onSignInClick, onRegisterClick, onSignOut }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const popularSearches = [
    'Fresh Tomatoes',
    'Organic Milk',
    'Chicken Breast',
    'Brown Bread',
    'Fresh Apples',
    'Eggs'
  ];

  const categories = [
    { name: 'Fresh Produce', icon: '🥬' },
    { name: 'Dairy & Eggs', icon: '🥛' },
    { name: 'Meat & Seafood', icon: '🥩' },
    { name: 'Bakery', icon: '🍞' },
    { name: 'Beverages', icon: '🥤' },
    { name: 'Pantry', icon: '🥫' }
  ];

  const productSuggestions = [
    'Fresh Tomatoes',
    'Organic Carrots',
    'Red Onions',
    'Fresh Spinach',
    'Organic Milk',
    'Free Range Eggs',
    'Chicken Breast',
    'Fresh Salmon',
    'Whole Wheat Bread',
    'Orange Juice',
    'Olive Oil',
    'Basmati Rice',
    'Fresh Apples',
    'Bananas'
  ];

  const filteredSuggestions = searchQuery 
    ? productSuggestions.filter(s => 
        s.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSelect = (query: string, isCategory: boolean = false) => {
    setSearchQuery(query);
    setShowSuggestions(false);
    
    if (isCategory) {
      onCategorySelect(query);
    }
    
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(false);
  };

  const handleRemoveSearch = (query: string) => {
    const updated = recentSearches.filter(s => s !== query);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearAllRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Info Bar */}
      <div className="bg-green-600">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-white">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Wholesale Pricing for Retailers & Distributors</span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <span>1-800-GROCERY</span>
              </div>
              <span>|</span>
              <span>Mon-Sat: 6AM - 8PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900 text-xl font-semibold">FreshMart</h1>
                <p className="text-green-600 text-xs font-medium">Wholesale</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full px-4 py-2.5 pr-12 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
                <Search className="w-4 h-4" />
              </button>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {/* Filtered Product Suggestions */}
                  {searchQuery && filteredSuggestions.length > 0 && (
                    <div className="border-b border-gray-100">
                      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 flex items-center gap-2">
                        <Search className="w-3 h-3" />
                        Products
                      </div>
                      {filteredSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-2.5 text-left text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3 text-sm"
                          onClick={() => handleSearchSelect(suggestion)}
                        >
                          <Search className="w-4 h-4 text-gray-400" />
                          <span className="flex-1">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Categories */}
                  {searchQuery && categories.filter(cat => 
                    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length > 0 && (
                    <div className="border-b border-gray-100">
                      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50">
                        Categories
                      </div>
                      {categories
                        .filter(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((category, index) => (
                          <button
                            key={index}
                            className="w-full px-4 py-2.5 text-left text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3 text-sm"
                            onClick={() => handleSearchSelect(category.name, true)}
                          >
                            <span className="text-lg">{category.icon}</span>
                            <span className="flex-1">{category.name}</span>
                          </button>
                        ))}
                    </div>
                  )}

                  {/* Recent Searches */}
                  {!searchQuery && recentSearches.length > 0 && (
                    <div className="border-b border-gray-100">
                      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          Recent Searches
                        </div>
                        <button
                          onClick={clearAllRecent}
                          className="text-green-600 hover:text-green-700 text-xs font-medium"
                        >
                          Clear all
                        </button>
                      </div>
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-2.5 text-left text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3 group text-sm"
                          onClick={() => handleSearchSelect(term)}
                        >
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="flex-1">{term}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveSearch(term);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                          >
                            <X className="w-3 h-3 text-gray-400" />
                          </button>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Popular Searches */}
                  {!searchQuery && (
                    <div className="border-b border-gray-100">
                      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 flex items-center gap-2">
                        <TrendingUp className="w-3 h-3" />
                        Popular Searches
                      </div>
                      {popularSearches.map((term, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-2.5 text-left text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3 text-sm"
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
                      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50">
                        Browse Categories
                      </div>
                      <div className="grid grid-cols-2 gap-2 p-3">
                        {categories.map((category, index) => (
                          <button
                            key={index}
                            className="flex items-center gap-2 p-2.5 rounded-md border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all text-sm"
                            onClick={() => handleSearchSelect(category.name, true)}
                          >
                            <span className="text-xl">{category.icon}</span>
                            <span className="text-gray-900">{category.name}</span>
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
          <div className="flex items-center gap-3">
            {/* Address */}
            <button 
              onClick={onAddressClick}
              className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
              title={defaultAddress ? `Deliver to ${defaultAddress.city}, ${defaultAddress.state}` : "Set delivery address"}
            >
              <MapPin className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="text-xs text-gray-500">Deliver to</p>
                <p className="text-sm text-gray-900 font-medium">
                  {defaultAddress ? `${defaultAddress.city}` : 'Select'}
                </p>
              </div>
            </button>

            {/* Account */}
            {user ? (
              <div className="relative">
                <button 
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  onBlur={() => setTimeout(() => setShowAccountMenu(false), 200)}
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <div className="text-left hidden md:block">
                    <p className="text-xs text-gray-500">Hello</p>
                    <p className="text-sm text-gray-900 font-medium">{user.name}</p>
                  </div>
                </button>
                {showAccountMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm text-gray-900 truncate font-medium">{user.name}</p>
                    </div>
                    <button
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3 group"
                      onClick={() => {
                        setShowAccountMenu(false);
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
                className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 rounded-lg transition-colors font-medium text-sm"
              >
                Sign In
              </button>
            )}

            {/* Cart */}
            <button 
              onClick={onCartClick}
              className="relative px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-sm hidden md:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
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
