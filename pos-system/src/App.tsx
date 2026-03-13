import { useState, useMemo } from 'react'
import { POSThemeProvider, usePOSTheme } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { CheckoutDialog } from '@/components/CheckoutDialog'
import { Header } from '@/components/Header'
import { AdminDashboard } from '@/components/AdminDashboard'
import { usePOSStore } from '@/context/store-context'
import { useLanguage } from '@/components/language-provider'
import { CONFIGS, t } from '@/mock/data'
import type { Product, CartItem } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
  List
} from 'lucide-react'

function HomePage({ onStart, onAdmin }: { onStart: () => void; onAdmin: () => void }) {
  const { theme } = usePOSTheme()
  const { currentLanguage } = useLanguage()
  const config = CONFIGS[theme]
  const translatedName = t(theme, currentLanguage.code)

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 text-center space-y-8 sm:space-y-12 animate-in fade-in duration-700 overflow-x-hidden">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex gap-2">
        <Button variant="outline" size="icon" className="rounded-2xl border-2" onClick={onAdmin}>
          <Settings className="w-5 h-5" />
        </Button>
        <ThemeSwitcher />
      </div>

      <div className="space-y-6 max-w-2xl px-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary rounded-[24px] sm:rounded-[32px] flex items-center justify-center text-primary-foreground text-4xl sm:text-5xl shadow-2xl mx-auto ring-8 ring-primary/10 animate-pulse">
          {config.logo}
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-none">
            {translatedName.split(' ')[0]} <span className="text-primary">POS</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-bold tracking-tight">
            The next generation of intelligent commerce for {translatedName.split(' ')[0]}s.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl px-4">
        {[
          { icon: LayoutDashboard, title: 'Dashboard', desc: 'Real-time inventory and sales analytics at your fingertips.' },
          { icon: Box, title: 'Inventory', desc: 'Manage thousands of SKUs with automated restocking alerts.' },
          { icon: ShoppingCart, title: 'Checkout', desc: 'High-performance terminal design for rapid transactions.' }
        ].map((item, i) => (
          <Card key={i} className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border-2 bg-card/50 backdrop-blur-xl space-y-4 hover:border-primary transition-all group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-tight">{item.title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-bold leading-relaxed">{item.desc}</p>
          </Card>
        ))}
      </div>

      <Button
        size="lg"
        className="h-16 sm:h-20 px-8 sm:px-12 rounded-[20px] sm:rounded-[24px] text-lg sm:text-xl font-black shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all gap-4"
        onClick={onStart}
      >
        Open POS Terminal <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>

      <div className="pt-8 sm:pt-12 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-4">
        Inventure AI Systems · Licensed Terminal #4928-1
      </div>
    </div>
  )
}

function POSDashboard({ onBack }: { onBack: () => void }) {
  const { theme } = usePOSTheme()
  const { currentLanguage } = useLanguage()
  const { inventory, addTransaction } = usePOSStore()
  const config = CONFIGS[theme]
  const products = inventory[theme] || []

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((p: Product) => {
      const translatedName = t(p.name, currentLanguage.code, 'products')
      const matchesSearch = translatedName.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [products, search, activeCategory, currentLanguage.code])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }).filter(item => item.quantity > 0))
  }

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
    setCart([])
  }

  const CartContent = ({ isMobile = false }) => (
    <div className={`flex flex-col h-full ${isMobile ? '' : 'w-[400px] border-l shadow-2xl bg-card'}`}>
      <div className="p-4 sm:p-6 border-b flex items-center justify-between">
        <h2 className="text-lg font-black flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" /> Current Order
        </h2>
        <Badge variant="secondary" className="font-black h-6">{cart.length} Items</Badge>
      </div>

      <ScrollArea className="flex-1 p-4 sm:p-6">
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-3 sm:gap-4 items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg flex items-center justify-center text-lg sm:text-xl">
                {item.image}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-black line-clamp-1 leading-none">{item.name}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-bold">${item.price} each</p>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-muted/50 rounded-lg p-1">
                <Button size="icon" variant="ghost" className="h-6 w-6 sm:h-7 sm:w-7" onClick={() => updateQuantity(item.id, -1)}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-3 text-center text-[10px] sm:text-xs font-black">{item.quantity}</span>
                <Button size="icon" variant="ghost" className="h-6 w-6 sm:h-7 sm:w-7" onClick={() => updateQuantity(item.id, 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs sm:text-sm font-black w-14 sm:w-16 text-right">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-2 opacity-30">
              <ShoppingCart className="w-12 h-12" />
              <p className="text-xs sm:text-sm font-bold">New order ready for transaction</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <footer className="p-4 sm:p-6 bg-muted/30 border-t space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm font-bold">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm font-bold">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-lg sm:text-xl font-black">Total</span>
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Button variant="outline" className="h-12 sm:h-14 font-black rounded-xl border-2" onClick={() => setCart([])} disabled={cart.length === 0}>
            <Trash2 className="w-4 h-4 mr-2" /> Void
          </Button>
          <Button
            className="h-12 sm:h-14 font-black rounded-xl text-md sm:text-lg shadow-xl shadow-primary/20"
            onClick={() => setIsCheckoutOpen(true)}
            disabled={cart.length === 0}
          >
            Pay <ChevronRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 h-5" />
          </Button>
        </div>
      </footer>
    </div>
  )

  return (
    <div className="flex flex-col h-screen bg-background text-foreground transition-all duration-500 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
      <Header
        theme={theme}
        onBack={onBack}
        cartCount={cart.length}
        CartContent={CartContent}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Product Selection */}
        <div className="flex-1 flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-hidden">
          {/* Search & Categories */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Product/barcode..."
                  className="pl-10 h-10 sm:h-12 bg-card rounded-xl border-2 focus-visible:ring-primary"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex bg-muted/30 p-1.5 rounded-xl border-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutDashboard className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="All" className="w-full" onValueChange={setActiveCategory}>
              <TabsList className="bg-muted/50 p-1 h-10 sm:h-12 rounded-xl border w-full justify-start overflow-x-auto no-scrollbar">
                <TabsTrigger value="All" className="px-4 sm:px-6 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold text-xs sm:text-sm">All Items</TabsTrigger>
                {config.categories.map((cat: string) => (
                  <TabsTrigger key={cat} value={cat} className="px-4 sm:px-6 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold text-xs sm:text-sm">
                    {t(cat, currentLanguage.code, 'categories')}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Product Grid/List View */}
          <ScrollArea className="flex-1 -mx-2 px-2">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 pb-4">
                {filteredProducts.map((product: Product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl active:scale-95 transition-all cursor-pointer bg-card border-2 hover:border-primary/50 overflow-hidden"
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-square bg-muted flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform">
                        {product.image}
                      </div>
                      <div className="p-3 sm:p-4">
                        <Badge variant="outline" className="text-[8px] sm:text-[10px] font-black uppercase mb-1">
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
                      <Button size="icon" variant="secondary" className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg">
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2 pb-4">
                {filteredProducts.map((product: Product) => (
                  <Card
                    key={product.id}
                    className="group flex flex-row items-center p-3 sm:p-4 gap-4 hover:border-primary/50 transition-all cursor-pointer bg-card border-2"
                    onClick={() => addToCart(product)}
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-xl flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                      {product.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-sm sm:text-md line-clamp-1">
                        {t(product.name, currentLanguage.code, 'products')}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground font-bold tracking-widest">{product.sku}</p>
                      <Badge variant="outline" className="text-[8px] sm:text-[9px] font-black uppercase mt-1">
                        {t(product.category, currentLanguage.code, 'categories')}
                      </Badge>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className="text-lg sm:text-xl font-black text-primary">${product.price}</span>
                      <Button size="sm" variant="secondary" className="h-8 px-3 rounded-lg font-black text-[10px] uppercase tracking-widest">
                        <Plus className="w-3 h-3 mr-1" /> Add
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            {filteredProducts.length === 0 && (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground space-y-2">
                <Store className="w-10 h-10 sm:w-12 sm:h-12 opacity-20" />
                <p className="font-bold text-sm">No products found</p>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Right Side: Cart (Desktop only) */}
        <aside className="hidden sm:flex shrink-0">
          <CartContent />
        </aside>
      </div>

      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={total}
        onComplete={handleCheckoutComplete}
      />
    </div>
  )
}

export default function App() {
  const [view, setView] = useState<'home' | 'pos' | 'admin'>('home')

  return (
    <LanguageProvider>
      <POSThemeProvider>
        {view === 'home' && <HomePage onStart={() => setView('pos')} onAdmin={() => setView('admin')} />}
        {view === 'pos' && <POSDashboard onBack={() => setView('home')} />}
        {view === 'admin' && <AdminDashboard onBack={() => setView('home')} />}
      </POSThemeProvider>
    </LanguageProvider>
  )
}
