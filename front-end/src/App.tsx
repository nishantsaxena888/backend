import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/Header"
import { NavBar } from "@/components/layout/Navbar"
import { useTheme } from "@/components/theme-provider"
import { getClientConfig, getProducts } from "@/mock/api"
import type { ClientConfig, Product } from "@/mock/types"
import { Checkout } from "@/components/commerce/Checkout"
import { AuthModal } from "@/components/commerce/AuthModal"
import { AgeVerification } from "@/components/commerce/AgeVerification"
import { ProfileView } from "@/components/commerce/ProfileView"
import { AppliedFiltersBar } from "@/components/commerce/AppliedFiltersBar"
import { HeroSection } from "@/components/layout/HeroSection"
import { ProductGrid } from "@/components/commerce/ProductGrid"
import { Footer } from "@/components/layout/Footer"

// ── ui imports ───────────────────────────────────────────────────────────────
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LanguageProvider, useLanguage } from "@/components/language-provider"

import {
  ShoppingCart,
  Package,
  Zap,
  Plus,
  Minus,
  X,
  Filter,
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
  const [cartItems, setCartItems] = useState<{ id: string; qty: number }[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'profile'>('home')
  const [ageVerified, setAgeVerified] = useState<boolean>(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

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
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    )
  }
  function toggleWishlist(id: string) {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const filtered = allProducts.filter(p => {
    const matchCat = selectedCategory === "All Products" || p.category === selectedCategory
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
    return matchCat && matchPrice
  })

  const sidebarCategories = [...new Set(allProducts.map(p => p.category))]

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
          onCategorySelect={(c) => { setSelectedCategory(c); setCurrentView('home'); }}
          user={user}
          onSignInClick={() => setAuthModalOpen(true)}
          onSignOut={handleSignOut}
          onProfileClick={() => setCurrentView('profile')}
          deliveryCity="New York"
        />

        {/* ── CART SHEET ───────────────── */}
        <Sheet open={cartOpen} onOpenChange={setCartOpen}>
          <SheetContent className="flex flex-col border-none shadow-2xl rounded-l-[40px] w-full sm:max-w-md p-8">
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
                      <div key={ci.id} className="flex items-center gap-4 group bg-muted/30 hover:bg-muted/50 p-4 rounded-3xl transition-all">
                        <CartItemImage p={p} l={l} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black truncate leading-tight mb-1">{l(p, 'name')}</p>
                          <p className="text-xs font-bold text-primary">${p.price}</p>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 bg-background rounded-xl p-1 shadow-sm border border-border/50">
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-muted" onClick={() => changeQty(ci.id, -1)}><Minus className="h-3 w-3" /></Button>
                          <span className="w-4 text-center text-xs font-black">{ci.qty}</span>
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-muted" onClick={() => changeQty(ci.id, 1)}><Plus className="h-3 w-3" /></Button>
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors" onClick={() => removeFromCart(ci.id)}><X className="h-4 w-4" /></Button>
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
          <>
            <HeroSection config={config} />
            <NavBar
              config={config}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <AppliedFiltersBar
              priceRange={priceRange as [number, number]}
              selectedCategory={selectedCategory}
              productCount={filtered.length}
              onClearAll={() => {
                setSelectedCategory("All Products");
                setPriceRange(config.id.includes('luxury') ? [0, 15000] : config.type === 'liquor' ? [0, 200] : [0, 50]);
              }}
              onRemoveCategory={() => setSelectedCategory("All Products")}
              onRemovePrice={() => setPriceRange(config.id.includes('luxury') ? [0, 15000] : config.type === 'liquor' ? [0, 200] : [0, 50])}
            />

            <main className="max-w-7xl mx-auto px-4 py-6 md:py-12">
              <div className="flex flex-col md:flex-row gap-12">
                <aside className="hidden md:block w-64 space-y-10 shrink-0">
                  <div className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                      <Filter className="w-3 h-3" /> {t('header.categories')}
                    </h3>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => setSelectedCategory("All Products")}
                        className={`text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${selectedCategory === "All Products" ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 translate-x-1" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
                      >
                        {t('product.all_products')}
                      </button>
                      {sidebarCategories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${selectedCategory === cat ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 translate-x-1" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
                        >
                          {t(cat)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center px-1">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">{t('product.price')}</h3>
                      <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">USD</span>
                    </div>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={config.id.includes('luxury') ? 15000 : config.type === 'liquor' ? 200 : 50}
                        step={1}
                        className="py-4"
                      />
                      <div className="flex justify-between mt-2 text-[10px] font-black text-muted-foreground tracking-widest">
                        <span>{t('product.min')} ${priceRange[0]}</span>
                        <span>{t('product.max')} ${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </aside>

                <div className="flex-1 space-y-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h2 className="text-3xl sm:text-5xl font-black tracking-tighter leading-none break-words">
                        {selectedCategory === "All Products" ? t('product.all_products') : selectedCategory}
                      </h2>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-3 flex items-center gap-2">
                        <Package className="w-3 h-3" /> {filtered.length} {t('product.curated_for')} {config.name}
                      </p>
                    </div>
                    <ToggleGroup
                      type="single"
                      value={viewMode}
                      onValueChange={(v) => v && setViewMode(v as 'grid' | 'list')}
                      className="bg-muted/50 p-1 rounded-xl border border-border/50 shrink-0 self-start md:self-auto"
                    >
                      <ToggleGroupItem value="grid" className="rounded-lg h-10 px-4 font-bold text-[10px] uppercase data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">{t('product.view_grid')}</ToggleGroupItem>
                      <ToggleGroupItem value="list" className="rounded-lg h-10 px-4 font-bold text-[10px] uppercase data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">{t('product.view_list')}</ToggleGroupItem>
                    </ToggleGroup>
                  </div>

                  {filtered.length > 0 ? (
                    <ProductGrid
                      products={filtered}
                      config={config}
                      cartItems={cartItems}
                      wishlist={wishlist}
                      onAddToCart={addToCart}
                      onChangeQty={changeQty}
                      onToggleWishlist={toggleWishlist}
                      viewMode={viewMode}
                    />
                  ) : (
                    <div className="py-32 text-center space-y-6 bg-muted/20 rounded-[60px] border-4 border-dotted border-border/50">
                      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto text-5xl grayscale opacity-50">🔎</div>
                      <div className="space-y-2 max-w-xs mx-auto">
                        <h4 className="text-2xl font-black tracking-tight">{t('product.no_matches')}</h4>
                        <p className="text-sm font-medium text-muted-foreground">{t('product.widen_search')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </>
        ) : (
          <ProfileView
            user={user}
            config={config}
            onSignOut={handleSignOut}
            onClose={() => setCurrentView('home')}
          />
        )}

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
          onCategorySelect={(c) => { setSelectedCategory(c); setCurrentView('home'); }}
          onViewChange={(v) => setCurrentView(v)}
        />
      </div>
    </TooltipProvider>
  )
}
