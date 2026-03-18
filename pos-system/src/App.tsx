import { useState, useMemo } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { POSThemeProvider, usePOSTheme } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { CheckoutDialog } from '@/components/CheckoutDialog'
import { Header } from '@/components/Header'
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
import type { Product, CartItem } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CartSidebar } from '@/components/CartSidebar'
// Sheet imports removed as they are now in Header.tsx
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  Store,
  LayoutDashboard,
  Box,
  ArrowRight,
  Settings,
  List,
  Heart
} from 'lucide-react'

function HomePage() {
  const { theme } = usePOSTheme()
  const { currentLanguage } = useLanguage()
  const navigate = useNavigate()
  const config = CONFIGS[theme]
  const translatedName = t(theme, currentLanguage.code)

  return (
    <div className="h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-8 text-center space-y-4 sm:space-y-8 animate-in fade-in duration-700 overflow-hidden">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex gap-2">
        <Button variant="outline" size="icon" className="rounded-2xl border-2" onClick={() => navigate('/admin')}>
          <Settings className="w-5 h-5" />
        </Button>
        <ThemeSwitcher />
      </div>

      <div className="space-y-4 max-w-2xl px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-[20px] sm:rounded-[28px] flex items-center justify-center text-primary-foreground text-3xl sm:text-4xl shadow-2xl mx-auto ring-8 ring-primary/10 animate-pulse">
          {config.logo}
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter leading-none">
            {translatedName.split(' ')[0]} <span className="text-primary">POS</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-bold tracking-tight">
            {t('The next generation of intelligent commerce for', currentLanguage.code, 'ui')} {currentLanguage.code === 'en' ? `${translatedName.split(' ')[0]}s` : translatedName}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 w-full max-w-4xl px-4">
        {[
          { icon: LayoutDashboard, title: t('Dashboard', currentLanguage.code, 'ui'), desc: t('Real-time inventory and sales analytics at your fingertips.', currentLanguage.code, 'ui') },
          { icon: Box, title: t('Inventory', currentLanguage.code, 'ui'), desc: t('Manage thousands of SKUs with automated restocking alerts.', currentLanguage.code, 'ui') },
          { icon: ShoppingCart, title: t('Checkout', currentLanguage.code, 'ui'), desc: t('High-performance terminal design for rapid transactions.', currentLanguage.code, 'ui') }
        ].map((item, i) => (
          <Card key={i} className="p-4 sm:p-6 rounded-[24px] border-2 bg-card/50 backdrop-blur-xl space-y-2 hover:border-primary transition-all group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <item.icon className="w-4 h-4 sm:w-5 h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-black tracking-tight">{item.title}</h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-bold leading-relaxed">{item.desc}</p>
          </Card>
        ))}
      </div>

      <Button
        size="lg"
        className="h-14 sm:h-16 px-8 sm:px-12 rounded-2xl text-base sm:text-lg font-black shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all gap-4"
        onClick={() => navigate('/pos')}
      >
        {t('Open POS Terminal', currentLanguage.code, 'ui')} <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>

    </div>
  )
}

function POSDashboard() {
  const { theme } = usePOSTheme()
  const { currentLanguage } = useLanguage()
  const { inventory, addTransaction, cart, wishlist, addToCart, updateCartQuantity, toggleWishlist, clearCart } = usePOSStore()
  const navigate = useNavigate()
  const config = CONFIGS[theme]
  const products = inventory[theme] || []

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

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

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <div className="flex-1 flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-hidden relative">
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
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder={t('Product/barcode...', currentLanguage.code, 'ui')}
                    className="pl-11 h-12 sm:h-14 bg-card rounded-2xl border-2 focus-visible:ring-primary text-base placeholder:text-muted-foreground/70"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex gap-1.5 items-center bg-muted/30 p-1.5 rounded-2xl border-2 h-12 sm:h-14">
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
                <TabsList className="bg-muted/30 p-1.5 h-auto sm:h-14 rounded-2xl border-2 w-full justify-start overflow-x-auto no-scrollbar flex flex-nowrap items-center gap-1.5 shrink-0 min-w-0">
                  <TabsTrigger value="All" className="shrink-0 px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-bold text-sm sm:text-base transition-all whitespace-nowrap">{t('All Items', currentLanguage.code, 'ui')}</TabsTrigger>
                  {config.categories.map((cat: string) => (
                    <TabsTrigger key={cat} value={cat} className="shrink-0 px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-bold text-sm sm:text-base transition-all whitespace-nowrap">
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
                            <Badge className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground font-black pointer-events-none shadow-sm h-6 px-2 flex items-center justify-center">
                              {inCartQty} {t('in Cart', currentLanguage.code, 'ui')}
                            </Badge>
                          )}

                          <div className="aspect-square bg-muted flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-105 transition-transform duration-300">
                            {product.image}
                          </div>
                          <div className="p-3 sm:p-4">
                            <Badge variant="outline" className="text-[8px] sm:text-[10px] font-black uppercase mb-1 py-1 leading-none">
                              {t(product.category, currentLanguage.code, 'categories')}
                            </Badge>
                            <h3 className="font-black text-xs sm:text-sm line-clamp-1">
                              {t(product.name, currentLanguage.code, 'products')}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-muted-foreground font-bold">{product.sku}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0 justify-between items-center">
                          <span className="text-base sm:text-lg font-black text-primary">${product.price}</span>
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
                            <Button size="icon" variant="secondary" className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
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
