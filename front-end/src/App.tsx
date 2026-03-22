import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/Header"
import { useTheme } from "@/components/theme-provider"
import { getClientConfig, getProducts } from "@/mock/api"
import type { ClientConfig, Product } from "@/mock/types"
import { Checkout } from "@/components/commerce/Checkout"
import { AuthModal } from "@/components/commerce/AuthModal"
import { AgeVerification } from "@/components/commerce/AgeVerification"
import { ProfileView } from "@/components/commerce/ProfileView"
import { PrivacyView } from "@/components/commerce/PrivacyView"
import { TermsView } from "@/components/commerce/TermsView"
import { HelpView } from "@/components/commerce/HelpView"
import { Footer } from "@/components/layout/Footer"
import { ProductDetailsView } from "./components/commerce/ProductDetailsView"
import { WishlistView } from "./components/commerce/WishlistView"
import { SettingsView } from "./components/commerce/SettingsView"
import { ComingSoonView } from "./components/commerce/ComingSoonView"
import { useRef } from "react"
import { DynamicRenderer } from "@/components/dynamic/DynamicRenderer"
import layout from "@/config/layout.json"

// ── ui imports ───────────────────────────────────────────────────────────────
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LanguageProvider, useLanguage } from "@/components/language-provider"

import {
  ShoppingCart,
  Package,
  Zap,
  Plus,
  Minus,
  X,
  ImageOff
} from "lucide-react"

// ─── APP ROOT ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="emerald-grocery">
        <HomePage />
      </ThemeProvider>
    </LanguageProvider>
  )
}

function CartItemImage({ p, l }: { p: Product; l: (obj: any, field: string) => string }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center text-3xl shadow-sm overflow-hidden shrink-0">
      {!p.image || imageError ? (
        <ImageOff className="w-8 h-8 text-muted-foreground/20" />
      ) : p.image.startsWith('http') ? (
        <img
          src={p.image}
          alt={l(p, 'name')}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      ) : p.image}
    </div>
  );
}

function HomePage() {
  const { theme } = useTheme();
  const { t, l } = useLanguage();
  const [config, setConfig] = useState<ClientConfig | null>(null)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<{ id: string; qty: number }[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'profile' | 'privacy' | 'terms' | 'help' | 'product-details' | 'wishlist' | 'settings' | 'coming-soon'>('home')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [comingSoonTitle, setComingSoonTitle] = useState<string>('')
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [ageVerified, setAgeVerified] = useState<boolean>(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'rating'>('newest')

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (config) {
      const verified = localStorage.getItem(`ageVerified_${config.id}`) === 'true';
      setAgeVerified(verified);
    }
  }, [config]);

  // ── Fetch dynamic data on theme/client change ──────────────────────────────
  useEffect(() => {
    async function init() {
      setIsLoading(true)
      try {
        const [c, p] = await Promise.all([
          getClientConfig(theme),
          getProducts(theme)
        ])
        setConfig(c)
        setAllProducts(p)
        setSelectedCategory("All Products")

        // Adjust price range based on client type
        if (c.id.includes('luxury')) setPriceRange([0, 15000])
        else if (c.type === 'liquor') setPriceRange([0, 200])
        else setPriceRange([0, 50])

      } catch (err) {
        console.error("Failed to fetch client data", err)
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [theme])

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cartItems.reduce((s, i) => {
    const p = allProducts.find(p => p.id === i.id)
    return s + (p?.price ?? 0) * i.qty
  }, 0)

  function addToCart(id: string) {
    setCartItems(prev => {
      const ex = prev.find(i => i.id === id)
      return ex
        ? prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { id, qty: 1 }]
    })
  }
  function removeFromCart(id: string) {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }
  function changeQty(id: string, delta: number) {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
          .filter(i => i.qty > 0)
    )
  }
  function toggleWishlist(id: string) {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function handleCategorySelect(category: string) {
    setSelectedCategory(category)
    setSearchQuery("") // Clear text search when category is selected
    setCurrentView('home')
  }

  function handleProductSelect(product: Product) {
    setSelectedProduct(product)
    
    // Calculate related products (same category, excludes current)
    const related = allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
    setRelatedProducts(related)
    
    setCurrentView('product-details')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSearch(query: string) {
    setSearchQuery(query)
    setSelectedCategory("All Products") // Reset category when doing text search? Or keep it?
    // Let's reset it for now to avoid conflicts, or merge filters.
    // Usually, search is global.
    setCurrentView('home')
  }

  const filtered = allProducts.filter(p => {
    const matchCat = selectedCategory === "All Products" || p.category === selectedCategory
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
    const matchSearch = !searchQuery ||
      l(p, 'name').toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchPrice && matchSearch
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return 0 // newest = original order in this mock
  })


  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    setCurrentView('home');
  };

  if (isLoading || !config) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 space-y-4">
        <Zap className="h-12 w-12 text-primary animate-pulse" />
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

        {/* ── REAL ECOM HEADER ─────────────────────────────────── */}
        <Header
          config={config}
          cartCount={cartCount}
          onCartClick={() => setCartOpen(true)}
          onCategorySelect={handleCategorySelect}
          onSearch={handleSearch}
          selectedCategory={selectedCategory}
          user={user}
          onSignInClick={() => setAuthModalOpen(true)}
          onSignOut={handleSignOut}
          onProfileClick={() => setCurrentView('profile')}
          wishlistCount={wishlist.length}
          onWishlistClick={() => setCurrentView('wishlist')}
          deliveryCity="New York"
        />

        {/* ── CART SHEET ───────────────── */}
        <Sheet open={cartOpen} onOpenChange={setCartOpen}>
          <SheetContent className="flex flex-col border-none shadow-2xl w-full sm:max-w-md p-4 sm:p-8">
            <SheetHeader className="space-y-1">
              <SheetTitle className="text-3xl font-black tracking-tight flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                {t('cart.title')}
              </SheetTitle>
              <SheetDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {cartCount} {t('cart.items')} · ${cartTotal.toFixed(2)} {t('cart.total')}
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="flex-1 mt-8 -mx-4 px-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <Package className="w-10 h-10 text-muted-foreground/30" />
                  </div>
                  <p className="text-sm font-bold text-muted-foreground">{t('cart.empty')}</p>
                  <Button variant="outline" className="rounded-xl font-bold" onClick={() => setCartOpen(false)}>{t('cart.start_shopping')}</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(ci => {
                    const p = allProducts.find(p => p.id === ci.id)!
                    if (!p) return null
                    return (
                      <div key={ci.id} className="flex items-start gap-3 sm:gap-4 group bg-muted/30 hover:bg-muted/50 p-3 sm:p-4 rounded-3xl transition-all">
                        <CartItemImage p={p} l={l} />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-xs sm:text-sm font-black truncate leading-tight pr-2">{l(p, 'name')}</p>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-6 w-6 rounded-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all shrink-0" 
                              onClick={() => removeFromCart(ci.id)}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs sm:text-sm font-black text-primary">${p.price}</p>
                            <div className="flex items-center gap-1 bg-background rounded-xl p-0.5 sm:p-1 shadow-sm border border-border/50 shrink-0">
                              <Button size="icon" variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-muted" onClick={() => changeQty(ci.id, -1)}><Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" /></Button>
                              <span className="w-4 text-center text-[10px] sm:text-xs font-black">{ci.qty}</span>
                              <Button size="icon" variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-muted" onClick={() => changeQty(ci.id, 1)}><Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" /></Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </ScrollArea>

            {cartItems.length > 0 && (
              <div className="pt-8 border-t space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t('cart.free_delivery')}</span>
                    <span className="text-[10px] font-black uppercase text-primary tracking-widest">
                      {cartTotal >= config.freeDeliveryThreshold ? t('cart.unlocked') : `$${(config.freeDeliveryThreshold - cartTotal).toFixed(2)} ${t('cart.remaining')}`}
                    </span>
                  </div>
                  <Progress value={Math.min((cartTotal / config.freeDeliveryThreshold) * 100, 100)} className="h-2 rounded-full" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-muted-foreground">{t('cart.order_total')}</span>
                    <span className="text-2xl font-black tracking-tighter">${cartTotal.toFixed(2)}</span>
                  </div>
                  <Button
                    className="w-full h-16 text-lg font-black rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                    onClick={() => {
                      setCartOpen(false);
                      if (!user) {
                        setAuthModalOpen(true);
                      } else {
                        setCheckoutOpen(true);
                      }
                    }}
                  >
                    {t('cart.checkout')}
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {currentView === 'home' ? (
          <DynamicRenderer 
            sections={layout.pages.home} 
            context={{
                config,
                allProducts,
                selectedCategory,
                searchQuery,
                cartItems,
                wishlist,
                priceRange,
                viewMode,
                sortBy,
                filtered,
                products: filtered,
                onAddToCart: addToCart,
                onChangeQty: changeQty,
                onToggleWishlist: toggleWishlist,
                onCategorySelect: handleCategorySelect,
                onProductSelect: handleProductSelect,
                onSortChange: setSortBy,
                onPriceRangeChange: setPriceRange,
                onViewModeChange: setViewMode,
                onRemoveCategory: () => { setSelectedCategory("All Products"); setSearchQuery(""); },
                onRemovePrice: () => setPriceRange(config.id.includes('luxury') ? [0, 15000] : config.type === 'liquor' ? [0, 200] : [0, 50]),
                onCtaClick: () => productsRef.current?.scrollIntoView({ behavior: 'smooth' }),
                onExploreClick: () => productsRef.current?.scrollIntoView({ behavior: 'smooth' }),
                onClearAll: () => {
                    setSelectedCategory("All Products");
                    setSearchQuery("");
                    setPriceRange(config.id.includes('luxury') ? [0, 15000] : config.type === 'liquor' ? [0, 200] : [0, 50]);
                },
                productCount: filtered.length,
                productsRef: productsRef
            }} 
          />
        ) : currentView === 'privacy' ? (
          <PrivacyView config={config} onClose={() => setCurrentView('home')} />
        ) : currentView === 'terms' ? (
          <TermsView config={config} onClose={() => setCurrentView('home')} />
        ) : currentView === 'help' ? (
          <HelpView config={config} onClose={() => setCurrentView('home')} />
        ) : currentView === 'product-details' && selectedProduct ? (
          <ProductDetailsView 
            product={selectedProduct} 
            config={config} 
            relatedProducts={relatedProducts}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            onProductSelect={handleProductSelect}
            cartItems={cartItems}
            onChangeQty={changeQty}
            inWishlist={wishlist.includes(selectedProduct.id)}
            onClose={() => setCurrentView('home')} 
          />
        ) : currentView === 'wishlist' ? (
          <WishlistView 
            wishlist={allProducts.filter(p => wishlist.includes(p.id))}
            config={config}
            cartItems={cartItems}
            onAddToCart={addToCart}
            onChangeQty={changeQty}
            onToggleWishlist={toggleWishlist}
            onProductSelect={handleProductSelect}
            onClose={() => setCurrentView('home')}
          />
        ) : currentView === 'profile' ? (
          <ProfileView
            user={user}
            config={config}
            onSignOut={handleSignOut}
            onClose={() => { setCurrentView('home'); window.scrollTo(0, 0); }}
            onWishlistClick={() => { setCurrentView('wishlist'); window.scrollTo(0, 0); }}
            onContactSupport={() => { setCurrentView('help'); window.scrollTo(0, 0); }}
            onPrivacyClick={() => { setCurrentView('privacy'); window.scrollTo(0, 0); }}
            onOrdersClick={() => { setComingSoonTitle('Order History'); setCurrentView('coming-soon'); window.scrollTo(0, 0); }}
            onAddressesClick={() => { setComingSoonTitle('Saved Addresses'); setCurrentView('coming-soon'); window.scrollTo(0, 0); }}
            onPaymentClick={() => { setComingSoonTitle('Payment Methods'); setCurrentView('coming-soon'); window.scrollTo(0, 0); }}
            onEditProfile={() => { setCurrentView('settings'); window.scrollTo(0, 0); }}
          />
        ) : currentView === 'settings' ? (
          <SettingsView user={user} onClose={() => setCurrentView('profile')} />
        ) : currentView === 'coming-soon' ? (
          <ComingSoonView title={comingSoonTitle} onClose={() => setCurrentView('profile')} />
        ) : null}

        {/* ── MODALS ───────────── */}
        {!ageVerified && config.type === 'liquor' && (
          <AgeVerification config={config} onVerified={() => setAgeVerified(true)} />
        )}

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          config={config}
          onAuthSuccess={setUser}
        />

        <Checkout
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          items={cartItems.map(ci => ({
            ...allProducts.find(p => p.id === ci.id)!,
            quantity: ci.qty
          }))}
          config={config}
          onClearCart={() => setCartItems([])}
        />

        <Footer
          config={config}
          onCategorySelect={handleCategorySelect}
          onViewChange={(v: any) => {
            setCurrentView(v);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    </TooltipProvider>
  )
}
