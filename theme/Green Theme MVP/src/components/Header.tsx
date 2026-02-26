import { Search, ShoppingCart, MapPin, User, Heart, Clock, TrendingUp, X, LogOut, Zap } from 'lucide-react';
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
    <header className="bg-slate-900 shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-white">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <button className="hover:text-amber-200 transition-colors">Help Center</button>
              <button className="hover:text-amber-200 transition-colors">Track Order</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Zap className="h-6 w-6 text-white fill-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-white text-xl tracking-tight">ShopHub</h1>
              <p className="text-emerald-400 text-xs">Premium Store</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full px-5 py-3 pr-12 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all">
                <Search className="w-4 h-4" />
              </button>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                  {/* Filtered Product Suggestions */}
                  {searchQuery && filteredSuggestions.length > 0 && (
                    <div className="border-b border-slate-700">
                      <div className="px-4 py-2 text-xs text-slate-400 bg-slate-900/50 flex items-center gap-2">
                        <Search className="w-3 h-3" />
                        Products
                      </div>
                      {filteredSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 transition-colors flex items-center gap-3"
                          onClick={() => handleSearchSelect(suggestion)}
                        >
                          <Search className="w-4 h-4 text-slate-400" />
                          <span className="flex-1">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Categories */}
                  {searchQuery && categories.filter(cat => 
                    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length > 0 && (
                    <div className="border-b border-slate-700">
                      <div className="px-4 py-2 text-xs text-slate-400 bg-slate-900/50">
                        Categories
                      </div>
                      {categories
                        .filter(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((category, index) => (
                          <button
                            key={index}
                            className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 transition-colors flex items-center gap-3"
                            onClick={() => handleSearchSelect(category.name, true)}
                          >
                            <span className="text-xl">{category.icon}</span>
                            <span className="flex-1">{category.name}</span>
                          </button>
                        ))}
                    </div>
                  )}

                  {/* Recent Searches */}
                  {!searchQuery && recentSearches.length > 0 && (
                    <div className="border-b border-slate-700">
                      <div className="px-4 py-2 text-xs text-slate-400 bg-slate-900/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          Recent Searches
                        </div>
                        <button
                          onClick={clearAllRecent}
                          className="text-emerald-400 hover:text-emerald-300 text-xs"
                        >
                          Clear all
                        </button>
                      </div>
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 transition-colors flex items-center gap-3 group"
                          onClick={() => handleSearchSelect(term)}
                        >
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="flex-1">{term}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveSearch(term);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-600 rounded transition-all"
                          >
                            <X className="w-3 h-3 text-slate-400" />
                          </button>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Popular Searches */}
                  {!searchQuery && (
                    <div className="border-b border-slate-700">
                      <div className="px-4 py-2 text-xs text-slate-400 bg-slate-900/50 flex items-center gap-2">
                        <TrendingUp className="w-3 h-3" />
                        Popular Searches
                      </div>
                      {popularSearches.map((term, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 transition-colors flex items-center gap-3"
                          onClick={() => handleSearchSelect(term)}
                        >
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                          <span className="flex-1">{term}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Browse Categories */}
                  {!searchQuery && (
                    <div>
                      <div className="px-4 py-2 text-xs text-slate-400 bg-slate-900/50">
                        Browse Categories
                      </div>
                      <div className="grid grid-cols-2 gap-2 p-4">
                        {categories.map((category, index) => (
                          <button
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-xl border border-slate-700 hover:border-emerald-500 hover:bg-slate-700/50 transition-all"
                            onClick={() => handleSearchSelect(category.name, true)}
                          >
                            <span className="text-2xl">{category.icon}</span>
                            <span className="text-sm text-white">{category.name}</span>
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
              className="relative p-3 hover:bg-slate-800 rounded-xl transition-colors group"
              title={defaultAddress ? `Deliver to ${defaultAddress.city}, ${defaultAddress.state}` : "Set delivery address"}
            >
              <MapPin className="w-5 h-5 text-slate-300 group-hover:text-emerald-400" />
              {defaultAddress && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-slate-900"></span>
              )}
            </button>

            {/* Wishlist */}
            <button 
              className="relative p-3 hover:bg-slate-800 rounded-xl transition-colors group"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-slate-300 group-hover:text-emerald-400" />
            </button>

            {/* Account */}
            {user ? (
              <div className="relative">
                <button 
                  className="p-3 hover:bg-slate-800 rounded-xl transition-colors group"
                  title={`Hi, ${user.name}`}
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  onBlur={() => setTimeout(() => setShowAccountMenu(false), 200)}
                >
                  <User className="w-5 h-5 text-slate-300 group-hover:text-emerald-400" />
                </button>
                {showAccountMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 min-w-[200px]">
                    <div className="px-4 py-3 bg-slate-900/50 border-b border-slate-700">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm text-white truncate">{user.name}</p>
                    </div>
                    <button
                      className="w-full px-4 py-3 text-left text-sm text-white hover:bg-slate-700 transition-colors flex items-center gap-3 group"
                      onClick={() => {
                        setShowAccountMenu(false);
                        onSignOut();
                      }}
                    >
                      <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
                      <span className="flex-1 group-hover:text-red-400">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onSignInClick}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all"
              >
                Sign In
              </button>
            )}

            {/* Cart */}
            <button 
              onClick={onCartClick}
              className="relative p-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all group"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-slate-900">
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
