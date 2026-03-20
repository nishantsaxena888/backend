import { Search, ShoppingCart, MapPin, User, Phone, Clock, X, LogOut, Zap, Palette, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/components/theme-provider';
import { useLanguage } from '@/components/language-provider';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import type { ClientConfig } from '@/mock/types';

interface HeaderProps {
    config: ClientConfig;
    cartCount: number;
    onCartClick: () => void;
    onCategorySelect?: (category: string) => void;
    user?: { name: string; email: string } | null;
    onSignInClick?: () => void;
    onSignOut?: () => void;
    onProfileClick?: () => void;
    deliveryCity?: string;
    selectedCategory?: string;
    onSearch?: (query: string) => void;
    wishlistCount: number;
    onWishlistClick: () => void;
}

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
    config,
    cartCount,
    onCartClick,
    onCategorySelect,
    user = null,
    onSignInClick,
    onSignOut,
    onProfileClick,
    deliveryCity,
    selectedCategory,
    onSearch,
    wishlistCount,
    onWishlistClick,
}: HeaderProps) {
    const { theme, setTheme } = useTheme();
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const accountMenuRef = useRef<HTMLDivElement>(null);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
                setShowAccountMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            const parsed = JSON.parse(saved) as string[];
            setRecentSearches(parsed.filter(s => s && s.trim() !== ''));
        }
    }, []);

    // Sync search bar with selected category from parent
    useEffect(() => {
        if (selectedCategory && selectedCategory !== 'All Products') {
            setSearchQuery(t(selectedCategory));
        } else if (selectedCategory === 'All Products') {
            setSearchQuery('');
        }
    }, [selectedCategory, t]);

    const filteredCategories = searchQuery
        ? config.categories.filter(c =>
            c.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    function selectSearch(query: string, isCategory = false, categoryKey?: string) {
        if (!query.trim() && !isCategory) {
            setShowSuggestions(false);
            return;
        }
        const displayQuery = isCategory && categoryKey ? t(categoryKey) : query;
        setSearchQuery(displayQuery);
        setShowSuggestions(false);
        if (isCategory) onCategorySelect?.(categoryKey || query);
        else onSearch?.(displayQuery);
        const updated = [displayQuery, ...recentSearches.filter(s => s && s.trim() !== '' && s !== displayQuery)].slice(0, 5);
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
        <header className="bg-background border-b border-border sticky top-0 z-[100] shadow-sm w-full max-w-full">
            {/* ── Top Info Bar ──────────────────────────────────────── */}
            <div className="bg-primary">
                <div className="max-w-7xl mx-auto px-4 py-1.5 md:py-2">
                    <div className="flex items-center justify-between text-[10px] sm:text-xs text-primary-foreground font-bold tracking-widest uppercase gap-4">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                            <Zap className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{config.topBarMessage}</span>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-8 shrink-0">

                            <div className="hidden md:flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5" />
                                    <span>{config.phone}</span>
                                </div>
                                <span className="opacity-30">|</span>
                                <span>{config.hours}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Header ───────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* Logo */}
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0" onClick={() => onCategorySelect?.('All Products')}>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-primary/20 shrink-0 cursor-pointer">
                                {config.logoIcon}
                            </div>
                            <div className="hidden xs:block min-w-0 cursor-pointer">
                                <h1 className="text-foreground text-base sm:text-xl font-black tracking-tight leading-none truncate">{config.name}</h1>
                                <p className="text-primary text-[8px] sm:text-[9px] font-black uppercase tracking-widest mt-0.5 truncate">{config.tagline}</p>
                            </div>
                        </div>

                        {/* Search Bar - Desktop Only Header Integration */}
                        <div className="hidden md:block flex-1 max-w-xl relative mx-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder={t('search.placeholder')}
                                    className="w-full px-4 py-2.5 pr-12 bg-muted/50 border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-background transition-all text-sm"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    onFocus={() => setShowSuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                />
                                <button
                                    onClick={() => selectSearch(searchQuery)}
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                                >
                                    <Search className="w-4 h-4" />
                                </button>
                                {showSuggestions && <SearchSuggestions />}
                            </div>
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                            {/* Theme Selector - Hidden on Mobile */}
                            <div className="hidden lg:block relative group">
                                <Select value={theme} onValueChange={setTheme}>
                                    <SelectTrigger className="w-10 xl:w-44 h-10 p-0 xl:px-3 text-xs border-none bg-muted/50 rounded-full xl:rounded-xl">
                                        <Palette className="h-4 w-4 xl:mr-2 text-primary shrink-0" />
                                        <span className="hidden xl:inline"><SelectValue /></span>
                                    </SelectTrigger>
                                    <SelectContent align="end" sideOffset={8} className="z-[110] min-w-[200px] rounded-2xl border-border/50 shadow-2xl p-2">
                                        {THEMES.map(t => (
                                            <SelectItem key={t.value} value={t.value} className="text-xs font-bold rounded-xl py-2.5 px-4 mb-1 last:mb-0 transition-colors">
                                                {t.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <LanguageSwitcher />

                            {/* Delivery - Hidden on Mobile */}
                            <div className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-xl transition-colors cursor-pointer border border-transparent hover:border-border">
                                <MapPin className="w-5 h-5 text-primary" />
                                <div className="text-left">
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none">{t('header.deliver_to')}</p>
                                    <p className="text-sm text-foreground font-black whitespace-nowrap">{deliveryCity ?? 'Select'}</p>
                                </div>
                            </div>

                            {/* Account */}
                            <div className="relative" ref={accountMenuRef}>
                                {user ? (
                                    <button
                                        className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 hover:bg-accent hover:text-accent-foreground rounded-xl transition-all"
                                        onClick={() => setShowAccountMenu(v => !v)}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <div className="text-left hidden sm:block">
                                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none">{t('header.member')}</p>
                                            <p className="text-sm text-foreground font-black leading-none mt-1">{user.name.split(' ')[0]}</p>
                                        </div>
                                    </button>
                                ) : (
                                    <>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={onSignInClick}
                                            className="hidden sm:flex rounded-xl font-bold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                                        >
                                            {t('header.sign_in')}
                                        </Button>
                                        <button onClick={onSignInClick} className="sm:hidden p-2 text-muted-foreground hover:bg-muted rounded-full">
                                            <User className="w-5 h-5" />
                                        </button>
                                    </>
                                )}

                                {showAccountMenu && (
                                    <div className="absolute right-0 top-full mt-2 bg-popover border border-border rounded-2xl shadow-2xl z-50 min-w-[220px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                        <div className="px-5 py-4 bg-muted/30 border-b border-border">
                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t('header.logged_account')}</p>
                                            <p className="text-sm text-foreground truncate font-black mt-1">{user?.name}</p>
                                        </div>
                                        <div className="p-2">
                                            <button
                                                className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-primary/5 rounded-xl transition-colors flex items-center gap-3 group"
                                                onClick={() => { setShowAccountMenu(false); onProfileClick?.(); }}
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold">{t('profile.title')}</span>
                                            </button>
                                            <button
                                                className="w-full px-4 py-3 text-left text-sm text-destructive hover:bg-destructive/5 rounded-xl transition-colors flex items-center gap-3 group"
                                                onClick={() => { setShowAccountMenu(false); onSignOut?.(); }}
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive group-hover:bg-destructive group-hover:text-destructive-foreground transition-all">
                                                    <LogOut className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold">{t('profile.sign_out')}</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Wishlist Button */}
                            <button
                                onClick={onWishlistClick}
                                className="relative p-2 sm:p-2.5 hover:bg-accent hover:text-accent-foreground rounded-xl transition-all group"
                            >
                                <Heart className={`w-5 h-5 transition-all ${wishlistCount > 0 ? 'text-primary fill-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                                {wishlistCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center p-0 text-[8px] font-black bg-primary text-primary-foreground border-2 border-background rounded-full">
                                        {wishlistCount}
                                    </Badge>
                                )}
                            </button>
                            
                            {/* Cart Button */}
                            <button
                                onClick={onCartClick}
                                className="relative flex items-center gap-2 p-2 sm:px-4 sm:py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span className="font-black text-sm hidden sm:inline">{t('header.cart')}</span>
                                {cartCount > 0 && (
                                    <Badge className="absolute -top-1.5 -right-1.5 h-5 min-w-5 flex items-center justify-center p-0 text-[10px] font-black bg-destructive text-destructive-foreground border-2 border-background rounded-full">
                                        {cartCount > 9 ? '9+' : cartCount}
                                    </Badge>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Bar Row */}
                    <div className="md:hidden relative">
                        <input
                            type="text"
                            placeholder={t('search.placeholder')}
                            className="w-full h-12 px-4 pr-12 bg-muted/50 border-2 border-transparent focus:border-primary rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-background transition-all text-sm font-medium"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        />
                        <button
                            onClick={() => selectSearch(searchQuery)}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        {showSuggestions && (
                            <div className="absolute top-full left-0 right-0 z-[110] mt-2">
                                <SearchSuggestions isMobile />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );

    function SearchSuggestions({ isMobile = false }: { isMobile?: boolean }) {
        return (
            <div className={`${isMobile ? 'w-full' : 'absolute top-full left-0 right-0 mt-2 shadow-2xl'} bg-popover border border-border rounded-[24px] z-[110] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200`}>
                {searchQuery && filteredCategories.length > 0 && (
                    <div className="p-2">
                        <div className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t('header.suggested_categories')}</div>
                        {filteredCategories.map(c => (
                            <button key={c} onMouseDown={(e) => { e.preventDefault(); selectSearch(c, true, c); }}
                                className="w-full px-4 py-3 text-left text-foreground hover:bg-primary/5 rounded-xl transition-all flex items-center gap-4 group">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    <Search className="w-4 h-4" />
                                </div>
                                <span className="font-bold text-sm tracking-tight">{t(c)}</span>
                            </button>
                        ))}
                    </div>
                )}

                {!searchQuery && recentSearches.length > 0 && (
                    <div className="p-2">
                        <div className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center justify-between">
                            <span className="flex items-center gap-2">{t('header.recent')}</span>
                            <button onClick={clearAllRecent} className="text-primary hover:underline font-black">{t('header.clear_all')}</button>
                        </div>
                        {recentSearches.map(term => (
                            <div key={term} className="flex items-center group">
                                <button onMouseDown={(e) => { e.preventDefault(); selectSearch(term); }}
                                    className="flex-1 px-4 py-3 text-left text-foreground hover:bg-primary/5 rounded-xl transition-all flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-all">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <span className="font-bold text-sm tracking-tight">{t(term)}</span>
                                </button>
                                <button onClick={e => removeRecent(term, e)}
                                    className="p-3 mr-1 hover:text-destructive transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {!searchQuery && (
                    <div className="p-4 bg-muted/20">
                        <div className="px-2 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">{t('header.categories')}</div>
                        <div className="grid grid-cols-2 gap-2">
                            {config.categories.slice(0, 4).map(c => (
                                <button key={c} onMouseDown={(e) => { e.preventDefault(); selectSearch(c, true, c); }}
                                    className="flex flex-col gap-2 p-4 rounded-2xl bg-background border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all text-left group">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <span className="font-black text-xs tracking-tight uppercase">{t(c)}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
