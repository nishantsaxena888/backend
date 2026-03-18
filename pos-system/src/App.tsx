import { useState, useMemo, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { POSThemeProvider, usePOSTheme } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { CheckoutDialog } from '@/components/CheckoutDialog'
import { ProfilePage } from '@/components/ProfilePage'
import { SettingsPage } from '@/components/SettingsPage'
import { ProductDetails } from '@/components/ProductDetails'
import { AdminDashboard } from '@/components/AdminDashboard'
import { usePOSStore } from '@/context/store-context'
import { useLanguage } from '@/components/language-provider'
import { AuthProvider } from '@/components/auth-context'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { MainLayout } from '@/components/MainLayout'
import { LoginPage } from '@/components/LoginPage'
import { SignupPage } from '@/components/SignupPage'
import { CONFIGS, t } from '@/mock/data'
import type { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { CartSidebar } from '@/components/CartSidebar'
// Sheet imports removed as they are now in Header.tsx
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Store,
  LayoutDashboard,
  Box,
  ArrowRight,
  Settings,
  List,
  Heart,
  Scan,
  CheckCircle2,
  User,
  LogOut
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/components/auth-context'

function HomePage() {
  const { theme } = usePOSTheme()
  const { currentLanguage } = useLanguage()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const config = CONFIGS[theme]
  const translatedName = t(theme, currentLanguage.code)

  return (
    <div className="h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-8 text-center space-y-4 sm:space-y-8 animate-in fade-in duration-700 overflow-hidden">
      <div className="fixed top-2 right-2 sm:top-6 sm:right-6 flex items-center gap-2 sm:gap-3 z-50">
        <ThemeSwitcher />
        <div className="h-6 w-[1px] bg-border mx-1 hidden sm:block opacity-50" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-accent/50 transition-all bg-card/50 backdrop-blur-xl px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl border-2 shadow-sm shrink-0 min-h-[36px] sm:min-h-[44px]">
              <div className="hidden sm:block text-right">
                <p className="text-[10px] sm:text-xs font-black leading-tight uppercase tracking-tighter">{t('Manager Access', currentLanguage.code, 'ui')}</p>
                <p className="text-[8px] sm:text-[9px] uppercase font-bold text-primary tracking-widest">{t('Admin', currentLanguage.code, 'ui')}</p>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center font-black shadow-inner text-[10px] sm:text-xs shrink-0 text-primary">AD</div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 p-2 rounded-[24px] shadow-2xl border-2 bg-popover/80 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
            <DropdownMenuItem
              className="flex items-center gap-4 px-4 py-2.5 rounded-2xl cursor-pointer hover:bg-primary/5 transition-colors"
              onClick={() => navigate('/my-profile')}
            >
              <User className="w-5 h-5" />
              <span className="font-bold text-sm tracking-tight">{t('My Profile', currentLanguage.code, 'ui')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-4 px-4 py-2.5 rounded-2xl cursor-pointer hover:bg-primary/5 transition-colors"
              onClick={() => navigate('/settings')}
            >
              <Settings className="w-5 h-5" />
              <span className="font-bold text-sm tracking-tight">{t('Settings', currentLanguage.code, 'ui')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-4 px-4 py-2.5 rounded-2xl cursor-pointer hover:bg-primary/5 transition-colors"
              onClick={() => navigate('/admin')}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-bold text-sm tracking-tight">{t('Admin Dashboard', currentLanguage.code, 'ui')}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2 bg-muted/50" />
            <DropdownMenuItem
              className="flex items-center gap-4 px-4 py-2.5 rounded-2xl cursor-pointer hover:bg-destructive/10 transition-colors text-destructive"
              onClick={logout}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-bold text-sm tracking-tight">{t('Logout', currentLanguage.code, 'ui')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3 sm:space-y-4 max-w-2xl px-4 w-full">
        <div className="w-12 h-12 sm:w-20 sm:h-20 bg-primary rounded-xl sm:rounded-[28px] flex items-center justify-center text-primary-foreground text-xl sm:text-4xl shadow-xl mx-auto ring-4 sm:ring-8 ring-primary/10">
          {config.logo}
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <h1 className="text-2xl sm:text-5xl font-black tracking-tighter leading-none">
            {translatedName.split(' ')[0]} <span className="text-primary">POS</span>
          </h1>
          <p className="text-xs sm:text-lg text-muted-foreground font-bold tracking-tight px-4">
            {t('The next generation of intelligent commerce for', currentLanguage.code, 'ui')} {currentLanguage.code === 'en' ? `${translatedName.split(' ')[0]}s` : translatedName}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-4xl px-4">
        {[
          { icon: LayoutDashboard, title: t('Dashboard', currentLanguage.code, 'ui'), desc: t('Real-time inventory and sales analytics at your fingertips.', currentLanguage.code, 'ui') },
          { icon: Box, title: t('Inventory', currentLanguage.code, 'ui'), desc: t('Manage thousands of SKUs with automated restocking alerts.', currentLanguage.code, 'ui') },
          { icon: ShoppingCart, title: t('Checkout', currentLanguage.code, 'ui'), desc: t('High-performance terminal design for rapid transactions.', currentLanguage.code, 'ui') }
        ].map((item, i) => (
          <Card key={i} className="p-3 sm:p-6 rounded-2xl sm:rounded-[24px] border-2 bg-card/50 backdrop-blur-xl flex flex-row sm:flex-col items-center sm:items-start text-left sm:text-left gap-3 sm:space-y-2 hover:border-primary transition-all group overflow-hidden">
            <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-xs sm:text-base font-black tracking-tight">{item.title}</h3>
              <p className="text-[9px] sm:text-xs text-muted-foreground font-bold leading-tight sm:leading-relaxed line-clamp-2">{item.desc}</p>
            </div>
          </Card>
        ))}
      </div>

      <Button
        size="lg"
        className="h-12 sm:h-16 px-6 sm:px-12 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-black shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all gap-2 sm:gap-4 w-[calc(100%-2rem)] sm:w-auto"
        onClick={() => navigate('/pos')}
      >
        {t('Open POS Terminal', currentLanguage.code, 'ui')} <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </Button>

    </div>
  )
}

function POSDashboard() {
  const { theme } = usePOSTheme()
  const { currentLanguage } = useLanguage()
  const { inventory, addTransaction, cart, wishlist, addToCart, updateCartQuantity, toggleWishlist, clearCart } = usePOSStore()
  const config = CONFIGS[theme]
  const products = inventory[theme] || []

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [scannerMode, setScannerMode] = useState(false)
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)


  // Auto-focus when scanner mode is active
  useEffect(() => {
    if (scannerMode) {
      searchInputRef.current?.focus()
    }
  }, [scannerMode, cart.length])


  const filteredProducts = useMemo(() => {
    return products.filter((p: Product) => {
      const translatedName = t(p.name, currentLanguage.code, 'products')
      const matchesSearch = translatedName.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [products, search, activeCategory, currentLanguage.code])

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const handleCheckoutComplete = () => {
    addTransaction({
      total: total,
      theme: theme,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    });
    setIsCheckoutOpen(false)
    clearCart()
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      const match = products.find((p: Product) => 
        p.sku.toLowerCase() === search.trim().toLowerCase() || 
        p.id.toLowerCase() === search.trim().toLowerCase()
      )
      
      if (match) {
        addToCart(match)
        setSearch('')
        setScannedProduct(match)
        setTimeout(() => setScannedProduct(null), 2000)
      }

    }
  }


  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <div className="flex-1 flex flex-col p-2 sm:p-6 space-y-3 sm:space-y-6 overflow-hidden relative">
        {selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
            cartQuantity={cart.find((c) => c.id === selectedProduct.id)?.quantity || 0}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onToggleWishlist={(_, productId) => toggleWishlist(productId)}
          />
        ) : (
          <>
            {/* Search & Categories */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 group">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    ref={searchInputRef}
                    placeholder={scannerMode ? t('Scan or Enter ID...', currentLanguage.code, 'ui') : t('Product/barcode...', currentLanguage.code, 'ui')}
                    className={`pl-10 pr-10 h-11 sm:h-14 bg-card rounded-2xl border-2 transition-all focus-visible:ring-primary text-sm sm:text-base placeholder:text-muted-foreground/70 ${scannerMode ? 'border-primary shadow-lg shadow-primary/10' : ''}`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-xl transition-all ${scannerMode ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground hover:bg-muted'}`}
                    onClick={() => setScannerMode(!scannerMode)}
                    title={t('Scanner Mode', currentLanguage.code, 'ui')}
                  >
                    <Scan className="w-4 h-4 sm:w-5 h-5" />
                  </Button>
                </div>

                <div className="flex gap-1 items-center bg-muted/30 p-1 rounded-xl border-2 h-11 sm:h-14">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    className={`h-full w-10 sm:w-12 rounded-xl transition-all ${viewMode === 'grid' ? 'shadow-md shadow-black/5' : 'hover:bg-muted/50'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    className={`h-full w-10 sm:w-12 rounded-xl transition-all ${viewMode === 'list' ? 'shadow-md shadow-black/5' : 'hover:bg-muted/50'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="All" className="w-full" onValueChange={setActiveCategory}>
                <TabsList className="bg-muted/30 p-1 h-auto sm:h-14 rounded-xl border-2 w-full justify-start overflow-x-auto no-scrollbar flex flex-nowrap items-center gap-1 shrink-0 min-w-0">
                  <TabsTrigger value="All" className="shrink-0 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-bold text-xs sm:text-base transition-all whitespace-nowrap">{t('All Items', currentLanguage.code, 'ui')}</TabsTrigger>
                  {config.categories.map((cat: string) => (
                    <TabsTrigger key={cat} value={cat} className="shrink-0 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-bold text-xs sm:text-base transition-all whitespace-nowrap">
                      {t(cat, currentLanguage.code, 'categories')}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Product Grid/List View */}
            <ScrollArea hideScrollbar className="flex-1 -mx-2 px-2">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 pb-4">
                  {filteredProducts.map((product: Product) => {
                    const inCartQty = cart.find(item => item.id === product.id)?.quantity || 0;
                    return (
                      <Card
                        key={product.id}
                        className={`group hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer bg-card overflow-hidden ${inCartQty > 0 ? 'border-primary border-2 shadow-sm' : 'border-2 hover:border-primary/50'}`}
                        onClick={() => setSelectedProduct(product)}
                      >
                        <CardContent className="p-0 relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-background/50 backdrop-blur-md hover:bg-background/80 hover:scale-110 transition-all border shadow-sm"
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                          >
                            <Heart className={`w-4 h-4 transition-colors ${wishlist.includes(product.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                          </Button>

                          {inCartQty > 0 && (
                            <div className="absolute top-1.5 left-1.5 z-10 bg-primary text-primary-foreground font-black pointer-events-none shadow-lg rounded-lg h-5 px-1.5 flex items-center justify-center text-[8px] sm:text-[10px] uppercase tracking-tighter">
                              {inCartQty} in Cart
                            </div>
                          )}

                          <div className="aspect-square bg-muted flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-105 transition-transform duration-300">
                            {product.image}
                          </div>
                          <div className="p-2 sm:p-4">
                            <Badge variant="outline" className="text-[7px] sm:text-[10px] font-black uppercase mb-0.5 py-0.5 sm:py-1 leading-none border-none bg-primary/5 text-primary">
                              {t(product.category, currentLanguage.code, 'categories')}
                            </Badge>
                            <h3 className="font-black text-[11px] sm:text-sm line-clamp-1 leading-tight mb-0.5">
                              {t(product.name, currentLanguage.code, 'products')}
                            </h3>
                            <p className="text-[8px] sm:text-xs text-muted-foreground font-bold opacity-60 tracking-tighter">{product.sku}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="px-2 sm:px-4 pb-2 sm:pb-4 pt-0 justify-between items-center">
                          <span className="text-sm sm:text-lg font-black text-primary tracking-tighter">${product.price}</span>
                          {inCartQty > 0 ? (
                            <div className="flex items-center gap-0.5 sm:gap-1 bg-muted/50 rounded-lg p-0.5">
                              <Button size="icon" variant="ghost" className="h-6 w-6 sm:h-7 sm:w-7" onClick={(e) => { e.stopPropagation(); updateCartQuantity(product.id, -1); }}>
                                <Minus className="h-2.5 w-2.5 sm:h-3 w-3" />
                              </Button>
                              <span className="w-2.5 sm:w-4 text-center text-[10px] sm:text-xs font-black">{inCartQty}</span>
                              <Button size="icon" variant="ghost" className="h-6 w-6 sm:h-7 sm:w-7" onClick={(e) => { e.stopPropagation(); updateCartQuantity(product.id, 1); }}>
                                <Plus className="h-2.5 w-2.5 sm:h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button size="icon" variant="secondary" className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <div className="space-y-2 pb-4">
                  {filteredProducts.map((product: Product) => {
                    const inCartQty = cart.find(item => item.id === product.id)?.quantity || 0;
                    return (
                      <Card
                        key={product.id}
                        className={`group flex flex-row items-center p-3 sm:p-4 gap-4 transition-all cursor-pointer bg-card ${inCartQty > 0 ? 'border-primary border-2 shadow-sm relative' : 'hover:border-primary/50 border-2'}`}
                        onClick={() => setSelectedProduct(product)}
                      >
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-xl flex items-center justify-center text-2xl sm:text-3xl shrink-0 overflow-hidden">
                          {inCartQty > 0 && (
                            <div className="absolute inset-x-0 bottom-0 bg-primary text-primary-foreground text-[10px] sm:text-xs font-black text-center py-0.5 pointer-events-none">
                              {inCartQty}
                            </div>
                          )}
                          {product.image}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-sm sm:text-md line-clamp-1">
                            {t(product.name, currentLanguage.code, 'products')}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-muted-foreground font-bold tracking-widest">{product.sku}</p>
                          <Badge variant="outline" className="text-[8px] sm:text-[9px] font-black uppercase mt-1 py-1 leading-none">
                            {t(product.category, currentLanguage.code, 'categories')}
                          </Badge>
                        </div>
                        <div className="text-right flex flex-col items-end justify-between self-stretch">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-muted"
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                          >
                            <Heart className={`w-4 h-4 transition-colors ${wishlist.includes(product.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                          </Button>
                          <div className="flex items-center gap-3">
                            <span className="text-lg sm:text-xl font-black text-primary">${product.price}</span>
                            {inCartQty > 0 ? (
                              <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5">
                                <Button size="icon" variant="ghost" className="h-6 w-6 sm:h-7 sm:w-7" onClick={(e) => { e.stopPropagation(); updateCartQuantity(product.id, -1); }}>
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-3 sm:w-4 text-center text-xs font-black">{inCartQty}</span>
                                <Button size="icon" variant="ghost" className="h-6 w-6 sm:h-7 sm:w-7" onClick={(e) => { e.stopPropagation(); updateCartQuantity(product.id, 1); }}>
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <Button size="sm" variant="secondary" className="h-8 px-3 rounded-lg font-black text-[10px] uppercase tracking-widest" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
                                <Plus className="w-3 h-3 mr-1" /> {t('Add', currentLanguage.code, 'ui')}
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              )}
              {filteredProducts.length === 0 && (
                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground space-y-2">
                  <Store className="w-10 h-10 sm:w-12 sm:h-12 opacity-20" />
                  <p className="font-bold text-sm">{t('No products found', currentLanguage.code, 'ui')}</p>
                </div>
              )}
            </ScrollArea>
          </>
        )}

        {/* Active Scanner Overlay */}
        {scannerMode && (
          <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center p-6 bg-card/40 backdrop-blur-md animate-in fade-in duration-500 pointer-events-none">
            <div className="flex flex-col items-center gap-8 max-w-md w-full text-center">
              <div className="relative">
                {/* Scanning Animation */}
                <div className="w-40 h-40 rounded-[2.5rem] bg-primary/10 border-4 border-primary/20 flex items-center justify-center relative overflow-hidden group">
                  <Scan className="w-20 h-20 text-primary animate-pulse" />
                  {/* Laser Line Animation */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.5)] animate-[scan-line_2s_ease-in-out_infinite]" />
                </div>
                {/* Corner Accents */}
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
                <div className="absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-2xl" />
              </div>

              <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
                <h2 className="text-3xl font-black tracking-tighter text-primary uppercase italic flex items-center gap-3 justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  {t('Scanner Ready', currentLanguage.code, 'ui')}
                </h2>
                <p className="text-lg font-bold text-muted-foreground leading-tight">
                  {t('Point product at camera or type ID', currentLanguage.code, 'ui')}
                </p>
              </div>

              <Button 
                variant="outline" 
                size="lg" 
                className="mt-8 h-14 px-8 rounded-2xl font-black bg-card border-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all pointer-events-auto shadow-xl"
                onClick={() => setScannerMode(false)}
              >
                {t('Close Scanner', currentLanguage.code, 'ui')}
              </Button>
            </div>
          </div>
        )}

        {/* Scanning Feedback Overlay */}

        {scannedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
            <div className="bg-card/80 backdrop-blur-2xl border-2 border-primary/50 rounded-[32px] p-8 shadow-2xl shadow-primary/20 flex flex-col items-center gap-6 animate-in zoom-in-95 fade-in duration-300 fill-mode-both">
              <div className="relative">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-5xl animate-bounce">
                  {scannedProduct.image}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg animate-in zoom-in duration-500 delay-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-black tracking-tight">{t('Product Scanned', currentLanguage.code, 'ui')}</h2>
                <p className="text-lg font-bold text-muted-foreground">{t(scannedProduct.name, currentLanguage.code, 'products')}</p>
                <div className="flex items-center gap-2 justify-center mt-2">
                  <Badge className="bg-primary/20 text-primary border-primary/20 font-black h-8 px-4 text-sm">
                    {t('Added to Cart', currentLanguage.code, 'ui')}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


      <aside className="hidden lg:flex shrink-0">
        <CartSidebar 
          onCheckout={() => setIsCheckoutOpen(true)}
          subtotal={subtotal}
          tax={tax}
          total={total}
        />
      </aside>

      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={total}
        onComplete={handleCheckoutComplete}
      />
    </div>
  )
}

function AdminPage() {
  const navigate = useNavigate()
  return <AdminDashboard onBack={() => navigate('/')} />
}

export default function App() {
  return (
    <LanguageProvider>
      <POSThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/pos" element={<POSDashboard />} />
                <Route path="/my-profile" element={<div className="flex-1 p-4 sm:p-8 overflow-auto"><div className="max-w-7xl mx-auto w-full"><ProfilePage /></div></div>} />
                <Route path="/settings" element={<div className="flex-1 p-4 sm:p-8 overflow-auto"><div className="max-w-7xl mx-auto w-full"><SettingsPage /></div></div>} />
              </Route>
              <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
              {/* Redirect any other route to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </POSThemeProvider>
    </LanguageProvider>
  )
}
