import { Search, ShoppingCart, MapPin, Menu, User, Heart, Clock, TrendingUp, X, LogOut, Package, Settings, Sparkles } from 'lucide-react';
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
  const [trendingSearches, setTrendingSearches] = useState<string[]>([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const popularSearches = [
    'Wireless Headphones',
    'MacBook Pro',
    'Gaming Console',
    'Smart Watch',
    'iPhone 15',
    'AirPods Pro'
  ];

  const categories = [
    { name: 'Electronics', icon: '💻' },
    { name: 'Fashion', icon: '👔' },
    { name: 'Home & Living', icon: '🏠' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Books', icon: '📚' },
    { name: 'Beauty', icon: '💄' }
  ];

  const productSuggestions = [
    'Wireless Headphones',
    'MacBook Pro',
    'Gaming Console',
    'Smart Watch',
    'DSLR Camera',
    'Tablet',
    'Bluetooth Speaker',
    'Mechanical Keyboard',
    'iPhone 15 Pro',
    'AirPods Pro',
    'Gaming Mouse',
    'Monitor 4K',
    'Laptop Stand',
    'Webcam HD'
  ];

  const filteredSuggestions = searchQuery 
    ? productSuggestions.filter(s => 
        s.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSelect = (query: string, isCategory: boolean = false) => {
    setSearchQuery(query);
    setShowSuggestions(false);
    
    // If it's a category, update the category filter
    if (isCategory) {
      onCategorySelect(query);
    }
    
    // Add to recent searches
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
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center">
            <button className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <Sparkles className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Search Bar - Expanded */}
          <div className="flex-1 mx-4">
            <div className="relative max-w-3xl">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full px-4 py-2.5 pr-12 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition-all">
                <Search className="w-4 h-4" />
              </button>

              {/* Search Suggestions */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                  {/* Filtered Product Suggestions - Show when typing */}
                  {searchQuery && filteredSuggestions.length > 0 && (
                    <div className="border-b border-gray-100">
                      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 flex items-center gap-2">
                        <Search className="w-3 h-3" />
                        Products
                      </div>
                      {filteredSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 group"
                          onClick={() => handleSearchSelect(suggestion)}
                        >
                          <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                          <span className="flex-1">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Categories - Show when typing */}
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
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 group"
                            onClick={() => handleSearchSelect(category.name, true)}
                          >
                            <span className="text-xl">{category.icon}</span>
                            <span className="flex-1">{category.name}</span>
                          </button>
                        ))}
                    </div>
                  )}

                  {/* Recent Searches - Show when not typing */}
                  {!searchQuery && recentSearches.length > 0 && (
                    <div className="border-b border-gray-100">
                      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          Recent Searches
                        </div>
                        <button
                          onClick={clearAllRecent}
                          className="text-blue-600 hover:text-blue-700 text-xs"
                        >
                          Clear all
                        </button>
                      </div>
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 group"
                          onClick={() => handleSearchSelect(term)}
                        >
                          <Clock className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
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

                  {/* Popular Searches - Show when not typing */}
                  {!searchQuery && (
                    <div className="border-b border-gray-100">
                      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 flex items-center gap-2">
                        <TrendingUp className="w-3 h-3" />
                        Popular Searches
                      </div>
                      {popularSearches.map((term, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 group"
                          onClick={() => handleSearchSelect(term)}
                        >
                          <TrendingUp className="w-4 h-4 text-orange-500" />
                          <span className="flex-1">{term}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Categories - Show when not typing */}
                  {!searchQuery && (
                    <div>
                      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50">
                        Browse Categories
                      </div>
                      <div className="grid grid-cols-2 gap-2 p-4">
                        {categories.map((category, index) => (
                          <button
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                            onClick={() => handleSearchSelect(category.name, true)}
                          >
                            <span className="text-2xl">{category.icon}</span>
                            <span className="text-sm group-hover:text-blue-600">{category.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1">
            {/* Address - Icon Only with Tooltip */}
            <button 
              onClick={onAddressClick}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
              title={defaultAddress ? `Deliver to ${defaultAddress.city}, ${defaultAddress.state}` : "Set delivery address"}
            >
              <MapPin className="w-5 h-5 text-gray-700" />
              {defaultAddress && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </button>

            {/* Wishlist - Icon Only */}
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-gray-700" />
            </button>

            {/* Account - Icon Only */}
            {user ? (
              <div className="relative">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title={`Hi, ${user.name}`}
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  onBlur={() => setTimeout(() => setShowAccountMenu(false), 200)}
                >
                  <User className="w-5 h-5 text-gray-700" />
                </button>
                {showAccountMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 min-w-[200px]">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <p className="text-xs text-gray-600">Signed in as</p>
                      <p className="text-sm text-gray-900 truncate">{user.name}</p>
                    </div>
                    <button
                      className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 transition-colors flex items-center gap-3 group"
                      onClick={() => {
                        setShowAccountMenu(false);
                        onSignOut();
                      }}
                    >
                      <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                      <span className="flex-1 group-hover:text-red-600">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Account"
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  onBlur={() => setTimeout(() => setShowAccountMenu(false), 200)}
                >
                  <User className="w-5 h-5 text-gray-700" />
                </button>
                {showAccountMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 min-w-[160px]">
                    <div className="py-1">
                      <button
                        className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 transition-colors flex items-center gap-3 group"
                        onClick={() => {
                          setShowAccountMenu(false);
                          onSignInClick();
                        }}
                      >
                        <User className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                        <span className="flex-1">Sign In</span>
                      </button>
                      <button
                        className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 transition-colors flex items-center gap-3 group"
                        onClick={() => {
                          setShowAccountMenu(false);
                          onRegisterClick();
                        }}
                      >
                        <Settings className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                        <span className="flex-1">Register</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all relative"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden md:inline text-sm">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}