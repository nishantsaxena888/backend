import { Search, ShoppingCart, MapPin, User, Phone, Clock, TrendingUp, X, LogOut, Package, Zap, Palette } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/components/theme-provider';

interface HeaderProps {
    cartCount: number;
    onCartClick: () => void;
    onCategorySelect?: (category: string) => void;
    user?: { name: string; email: string } | null;
    onSignInClick?: () => void;
    onSignOut?: () => void;
    deliveryCity?: string;
}

const POPULAR_SEARCHES = [
    'Fresh Tomatoes', 'Organic Milk', 'Chicken Breast',
    'Brown Bread', 'Fresh Apples', 'Eggs',
];

const PRODUCT_SUGGESTIONS = [
    'Fresh Tomatoes', 'Organic Carrots', 'Red Onions', 'Fresh Spinach',
    'Organic Milk', 'Free Range Eggs', 'Chicken Breast', 'Fresh Salmon',
    'Whole Wheat Bread', 'Orange Juice', 'Olive Oil', 'Basmati Rice',
    'Fresh Apples', 'Bananas',
];

const BROWSE_CATEGORIES = [
    { name: 'Fresh Produce', icon: '🥬' },
    { name: 'Dairy & Eggs', icon: '🥛' },
    { name: 'Meat & Seafood', icon: '🥩' },
    { name: 'Bakery', icon: '🍞' },
    { name: 'Beverages', icon: '🥤' },
    { name: 'Pantry', icon: '🥫' },
];

const THEMES = [
    { value: 'emerald-grocery', label: '🥦 Emerald Grocery' },
    { value: 'fashion-black', label: '🖤 Fashion Black' },
    { value: 'fashion-gold-luxury', label: '✨ Fashion Gold Luxury' },
    { value: 'green-mvp', label: '🌿 Green MVP' },
    { value: 'grey-grocery', label: '🩶 Grey Grocery' },
    { value: 'liqour-black', label: '🥃 Liquor Black' },
    { value: 'liquor-orange', label: '🍊 Liquor Orange' },
    { value: 'restaurant-black', label: '🍽️ Restaurant Black' },
] as const;

export function Header({
    cartCount,
    onCartClick,
    onCategorySelect,
    user = null,
    onSignInClick,
    onSignOut,
    deliveryCity,
}: HeaderProps) {
    const { theme, setTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) setRecentSearches(JSON.parse(saved));
    }, []);

    const filteredSuggestions = searchQuery
        ? PRODUCT_SUGGESTIONS.filter(s =>
            s.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5)
        : [];

    const filteredCategories = searchQuery
        ? BROWSE_CATEGORIES.filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    function selectSearch(query: string, isCategory = false) {
        setSearchQuery(query);
        setShowSuggestions(false);
        if (isCategory) onCategorySelect?.(query);
        const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    }

    function removeRecent(query: string, e: React.MouseEvent) {
        e.stopPropagation();
        const updated = recentSearches.filter(s => s !== query);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    }

    function clearAllRecent(e: React.MouseEvent) {
        e.stopPropagation();
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    }

    return (
        <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">

            {/* ── Top Info Bar ──────────────────────────────────────── */}
            <div className="bg-primary">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <div className="flex items-center justify-between text-sm text-primary-foreground">
                        <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            <span>Wholesale Pricing for Retailers &amp; Distributors</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5" />
                                <span>1-800-GROCERY</span>
                            </div>
                            <span>|</span>
                            <span>Mon–Sat: 6 AM – 8 PM</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Header ───────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center gap-6">

                    {/* Logo */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <Zap className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-foreground text-xl font-semibold">Inventure</h1>
                            <p className="text-primary text-xs font-medium">Wholesale</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl relative">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products, categories..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                className="w-full px-4 py-2.5 pr-12 bg-muted/50 border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent focus:bg-background transition-all text-sm"
                            />
                            <button
                                onClick={() => selectSearch(searchQuery)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors"
                            >
                                <Search className="w-4 h-4" />
                            </button>

                            {/* Suggestions Dropdown */}
                            {showSuggestions && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">

                                    {/* Product suggestions */}
                                    {searchQuery && filteredSuggestions.length > 0 && (
                                        <div className="border-b border-border">
                                            <div className="px-4 py-2 text-xs text-muted-foreground bg-muted/50 flex items-center gap-2">
                                                <Search className="w-3 h-3" /> Products
                                            </div>
                                            {filteredSuggestions.map(s => (
                                                <button key={s} onClick={() => selectSearch(s)}
                                                    className="w-full px-4 py-2.5 text-left text-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-3 text-sm">
                                                    <Search className="w-4 h-4 text-muted-foreground" />
                                                    <span className="flex-1">{s}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Category suggestions when searching */}
                                    {searchQuery && filteredCategories.length > 0 && (
                                        <div className="border-b border-border">
                                            <div className="px-4 py-2 text-xs text-muted-foreground bg-muted/50">Categories</div>
                                            {filteredCategories.map(c => (
                                                <button key={c.name} onClick={() => selectSearch(c.name, true)}
                                                    className="w-full px-4 py-2.5 text-left text-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-3 text-sm">
                                                    <span className="text-lg">{c.icon}</span>
                                                    <span className="flex-1">{c.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Recent searches */}
                                    {!searchQuery && recentSearches.length > 0 && (
                                        <div className="border-b border-border">
                                            <div className="px-4 py-2 text-xs text-muted-foreground bg-muted/50 flex items-center justify-between">
                                                <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> Recent</div>
                                                <button onClick={clearAllRecent} className="text-primary hover:text-primary/80 text-xs font-medium">Clear all</button>
                                            </div>
                                            {recentSearches.map(term => (
                                                <button key={term} onClick={() => selectSearch(term)}
                                                    className="w-full px-4 py-2.5 text-left text-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-3 group text-sm">
                                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                                    <span className="flex-1">{term}</span>
                                                    <span onClick={e => removeRecent(term, e)}
                                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-all">
                                                        <X className="w-3 h-3 text-muted-foreground" />
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Popular searches */}
                                    {!searchQuery && (
                                        <div className="border-b border-border">
                                            <div className="px-4 py-2 text-xs text-muted-foreground bg-muted/50 flex items-center gap-2">
                                                <TrendingUp className="w-3 h-3" /> Popular
                                            </div>
                                            {POPULAR_SEARCHES.map(term => (
                                                <button key={term} onClick={() => selectSearch(term)}
                                                    className="w-full px-4 py-2.5 text-left text-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-3 text-sm">
                                                    <TrendingUp className="w-4 h-4 text-primary" />
                                                    <span className="flex-1">{term}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Browse categories */}
                                    {!searchQuery && (
                                        <div>
                                            <div className="px-4 py-2 text-xs text-muted-foreground bg-muted/50">Browse Categories</div>
                                            <div className="grid grid-cols-2 gap-2 p-3">
                                                {BROWSE_CATEGORIES.map(c => (
                                                    <button key={c.name} onClick={() => selectSearch(c.name, true)}
                                                        className="flex items-center gap-2 p-2.5 rounded-md border border-border hover:border-primary hover:bg-accent transition-all text-sm text-foreground">
                                                        <span className="text-xl">{c.icon}</span>
                                                        <span>{c.name}</span>
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

                        {/* Theme Selector */}
                        <Select value={theme} onValueChange={setTheme}>
                            <SelectTrigger className="w-44 hidden sm:flex h-9 text-xs">
                                <Palette className="h-3.5 w-3.5 mr-1.5 text-primary shrink-0" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {THEMES.map(t => (
                                    <SelectItem key={t.value} value={t.value} className="text-xs">{t.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Delivery location */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors cursor-pointer">
                            <MapPin className="w-5 h-5 text-muted-foreground" />
                            <div className="text-left">
                                <p className="text-xs text-muted-foreground">Deliver to</p>
                                <p className="text-sm text-foreground font-medium">{deliveryCity ?? 'Select'}</p>
                            </div>
                        </div>

                        {/* Account */}
                        {user ? (
                            <div className="relative">
                                <button
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                                    onClick={() => setShowAccountMenu(v => !v)}
                                    onBlur={() => setTimeout(() => setShowAccountMenu(false), 200)}
                                >
                                    <User className="w-5 h-5 text-muted-foreground" />
                                    <div className="text-left hidden md:block">
                                        <p className="text-xs text-muted-foreground">Hello</p>
                                        <p className="text-sm text-foreground font-medium">{user.name}</p>
                                    </div>
                                </button>
                                {showAccountMenu && (
                                    <div className="absolute right-0 top-full mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 min-w-[200px]">
                                        <div className="px-4 py-3 bg-muted/50 border-b border-border">
                                            <p className="text-xs text-muted-foreground">Signed in as</p>
                                            <p className="text-sm text-foreground truncate font-medium">{user.name}</p>
                                        </div>
                                        <button
                                            className="w-full px-4 py-2.5 text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-3 group"
                                            onClick={() => { setShowAccountMenu(false); onSignOut?.(); }}
                                        >
                                            <LogOut className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
                                            <span className="flex-1 group-hover:text-destructive">Sign Out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={onSignInClick}
                                className="px-4 py-2 bg-background border border-border hover:bg-accent text-foreground rounded-lg transition-colors font-medium text-sm"
                            >
                                Sign In
                            </button>
                        )}

                        {/* Cart Button */}
                        <button
                            onClick={onCartClick}
                            className="relative px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5 text-primary-foreground" />
                            <span className="text-primary-foreground font-medium text-sm hidden md:inline">Cart</span>
                            {cartCount > 0 && (
                                <Badge className="absolute -top-2 -right-2 h-5 min-w-5 px-1 text-[10px] font-bold bg-destructive text-destructive-foreground border-0">
                                    {cartCount > 9 ? '9+' : cartCount}
                                </Badge>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
