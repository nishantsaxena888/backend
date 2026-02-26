import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/Header"
import { NavBar } from "@/components/layout/Navbar"
import { useTheme } from "@/components/theme-provider"
import { getClientConfig, getProducts } from "@/mock/api"
import type { ClientConfig, Product } from "@/mock/types"
import { ProductDetail } from "@/components/commerce/ProductDetail"
import { Checkout } from "@/components/commerce/Checkout"
import { useEffect } from "react"

// ── ui imports ───────────────────────────────────────────────────────────────
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  ShoppingCart, Heart, Star,
  AlignLeft, AlignCenter, AlignRight,
  Package, DollarSign,
  ChevronRight, Filter, Zap, Shield, Truck, RefreshCw, Plus, Minus, X
} from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

// ─── APP ROOT ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider defaultTheme="emerald-grocery">
      <HomePage />
    </ThemeProvider>
  )
}

function HomePage() {
  const { theme } = useTheme()
  const [config, setConfig] = useState<ClientConfig | null>(null)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [cartItems, setCartItems] = useState<{ id: string; qty: number }[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 5000]) // High default for luxury pieces
  const [notifications, setNotifications] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

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
  const user = isSignedIn ? { name: "Nishant Saxena", email: "nishant@inventure.ai" } : null

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
      <div className="min-h-screen bg-background text-foreground">

        {/* ── REAL ECOM HEADER ─────────────────────────────────── */}
        <Header
          config={config}
          cartCount={cartCount}
          onCartClick={() => setCartOpen(true)}
          onCategorySelect={setSelectedCategory}
          user={user}
          onSignInClick={() => setIsSignedIn(true)}
          onSignOut={() => setIsSignedIn(false)}
          deliveryCity="New York"
        />

        {/* ── REAL ECOM NAVBAR ─────────────────────────────────── */}
        <NavBar
          config={config}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* ── CART SHEET ───────────────── */}
        <Sheet open={cartOpen} onOpenChange={setCartOpen}>
          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" /> Cart ({cartCount})
              </SheetTitle>
              <SheetDescription>${cartTotal.toFixed(2)} total</SheetDescription>
            </SheetHeader>
            <ScrollArea className="flex-1 mt-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-12 text-sm">Your cart is empty</p>
              ) : (
                <div className="space-y-3">
                  {cartItems.map(ci => {
                    const p = allProducts.find(p => p.id === ci.id)!
                    if (!p) return null
                    return (
                      <div key={ci.id} className="flex items-center gap-3 border border-border rounded-lg p-3">
                        {p.image.startsWith('http') ? (
                          <div className="w-10 h-10 rounded overflow-hidden">
                            <img src={p.image} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <span className="text-2xl">{p.image}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{p.name}</p>
                          <p className="text-xs text-muted-foreground">${p.price} × {ci.qty}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => changeQty(ci.id, -1)}><Minus className="h-3 w-3" /></Button>
                          <span className="w-5 text-center text-sm">{ci.qty}</span>
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => changeQty(ci.id, 1)}><Plus className="h-3 w-3" /></Button>
                        </div>
                        <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => removeFromCart(ci.id)}><X className="h-3 w-3" /></Button>
                      </div>
                    )
                  })}
                </div>
              )}
            </ScrollArea>
            {cartItems.length > 0 && (
              <div className="pt-4 border-t space-y-3">
                <Progress value={Math.min((cartTotal / config.freeDeliveryThreshold) * 100, 100)} className="h-1.5" />
                <p className="text-xs text-muted-foreground text-center">
                  {cartTotal >= config.freeDeliveryThreshold
                    ? "🎉 Free delivery unlocked!"
                    : `Add $${(config.freeDeliveryThreshold - cartTotal).toFixed(2)} more for free delivery`}
                </p>
                <Button
                  className="w-full h-12 text-base font-bold rounded-xl"
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                  }}
                >
                  Checkout · ${cartTotal.toFixed(2)}
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* ── CHECKOUT MODAL ───────────── */}
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

        {/* ── HERO SECTION ────────────────────────────────────────── */}
        <div className="relative py-12 md:py-24 px-4 overflow-hidden rounded-3xl mx-4 my-8">
          <div className="absolute inset-0 bg-primary/10 -z-10" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent -z-10 blur-3xl opacity-50" />

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              {config.hero.badge && (
                <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium animate-bounce">
                  {config.hero.badge}
                </Badge>
              )}
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                {config.hero.headline}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                {config.hero.subheadline}
              </p>
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start pt-4">
                <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25">
                  {config.hero.cta}
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-semibold">
                  Browse Offers
                </Button>
              </div>
            </div>
            <div className="flex-1 relative hidden lg:block">
              <div className="w-full aspect-square rounded-full border-[32px] border-primary/5 animate-[pulse_4s_infinite]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[160px] drop-shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-500 cursor-default">
                  {config.logoIcon}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── PAGE BODY ───────────────────────────────────────────── */}
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">

          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator><ChevronRight className="h-3 w-3" /></BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbLink href="#">Shop</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator><ChevronRight className="h-3 w-3" /></BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbPage>{selectedCategory}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Hero Alert */}
          <Alert className="border-primary/30 bg-primary/5">
            <Zap className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">Client: {config.name} ({theme})</AlertTitle>
            <AlertDescription>
              All data (products, categories, hero content) is now served via a <b>Mock API Service</b> using a separate manifest for each of the 8 clients.
            </AlertDescription>
          </Alert>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Products", value: String(allProducts.length), sub: "In stock", icon: Package },
              { label: "In Cart", value: String(cartCount), sub: "Items added", icon: ShoppingCart },
              { label: "Wishlist", value: String(wishlist.length), sub: "Saved items", icon: Heart },
              { label: "Cart Total", value: `$${cartTotal.toFixed(2)}`, sub: "Before tax", icon: DollarSign },
            ].map(({ label, value, sub, icon: Icon }) => (
              <Card key={label}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                  <Icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main layout */}
          <div className="flex gap-8">

            {/* Sidebar */}
            <aside className="w-64 shrink-0 hidden lg:block space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Price Range</Label>
                    <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={config.id.includes('luxury') ? 15000 : 500} step={config.id.includes('luxury') ? 100 : 1} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${priceRange[0]}</span><span>${priceRange[1]}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</Label>
                    {sidebarCategories.map(cat => (
                      <div key={cat} className="flex items-center gap-2">
                        <Checkbox id={`cat-${cat}`}
                          checked={selectedCategory === cat || selectedCategory === "All Products"}
                          onCheckedChange={() => setSelectedCategory(selectedCategory === cat ? "All Products" : cat)} />
                        <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer">{cat}</Label>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Sort By</Label>
                    <RadioGroup defaultValue="popular">
                      {["popular", "price-low", "price-high", "rating"].map(v => (
                        <div key={v} className="flex items-center gap-2">
                          <RadioGroupItem value={v} id={`sort-${v}`} />
                          <Label htmlFor={`sort-${v}`} className="text-sm font-normal capitalize cursor-pointer">{v.replace("-", " ")}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Price alerts</Label>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => { setPriceRange([0, config.id.includes('luxury') ? 15000 : 500]); setSelectedCategory("All Products") }}>
                    <RefreshCw className="h-3 w-3 mr-1.5" /> Reset Filters
                  </Button>
                </CardContent>
              </Card>
            </aside>

            {/* Products */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline">{filtered.length} products</Badge>
                <div className="flex-1" />
                <ToggleGroup type="single" defaultValue="grid" size="sm">
                  <ToggleGroupItem value="list"><AlignLeft className="h-3.5 w-3.5" /></ToggleGroupItem>
                  <ToggleGroupItem value="grid"><AlignCenter className="h-3.5 w-3.5" /></ToggleGroupItem>
                  <ToggleGroupItem value="wide"><AlignRight className="h-3.5 w-3.5" /></ToggleGroupItem>
                </ToggleGroup>
                <Separator orientation="vertical" className="h-6" />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5 mr-1.5" />Quick Filter</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 space-y-3">
                    <p className="text-sm font-medium">Price Range</p>
                    <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={config.id.includes('luxury') ? 15000 : 500} step={config.id.includes('luxury') ? 100 : 1} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${priceRange[0]}</span><span>${priceRange[1]}</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No products match your filters</p>
                  <Button variant="link" onClick={() => { setPriceRange([0, config.id.includes('luxury') ? 15000 : 500]); setSelectedCategory("All Products") }}>Clear filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map(product => {
                    const inCart = cartItems.find(i => i.id === product.id)
                    const inWishlist = wishlist.includes(product.id)
                    return (
                      <Card key={product.id} className="group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col overflow-hidden">
                        <div className="relative h-44 overflow-hidden bg-accent/20 flex items-center justify-center">
                          {product.image.startsWith('http') ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          ) : (
                            <span className="text-6xl">{product.image}</span>
                          )}
                          {product.badge && <Badge className="absolute top-2 left-2 text-[10px] uppercase font-bold tracking-tight">{product.badge}</Badge>}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id) }}
                                className={`absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${inWishlist ? "bg-primary text-primary-foreground" : "bg-background/60 text-muted-foreground hover:bg-background"
                                  }`}>
                                <Heart className="h-3.5 w-3.5" fill={inWishlist ? "currentColor" : "none"} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>{inWishlist ? "Remove from wishlist" : "Save for later"}</TooltipContent>
                          </Tooltip>
                        </div>
                        <CardHeader className="pb-2 pt-3 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-sm font-semibold leading-tight line-clamp-2">{product.name}</CardTitle>
                            <span className="text-base font-bold text-primary whitespace-nowrap">${product.price}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                              ))}
                            </div>
                            <span className="text-[11px] text-muted-foreground font-medium">{product.rating} ({product.reviews})</span>
                          </div>
                        </CardHeader>
                        <CardFooter className="pt-0 pb-4 gap-2">
                          <ProductDetail
                            product={product}
                            config={config}
                            onAddToCart={addToCart}
                            trigger={<Button variant="outline" size="sm" className="flex-1">Details</Button>}
                          />
                          {inCart ? (
                            <div className="flex items-center gap-1 border border-border rounded-md px-2 bg-muted/30">
                              <button className="h-9 w-6 flex items-center justify-center text-muted-foreground hover:text-foreground"
                                onClick={() => changeQty(product.id, -1)}>
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm font-bold w-5 text-center">{inCart.qty}</span>
                              <button className="h-9 w-6 flex items-center justify-center text-muted-foreground hover:text-foreground"
                                onClick={() => addToCart(product.id)}>
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <Button size="sm" className="flex-1 font-bold" onClick={() => addToCart(product.id)} disabled={!product.inStock}>
                              <Plus className="h-3.5 w-3.5 mr-1.5" /> Add
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <Separator className="my-12" />

          {/* User Section */}
          <section>
            <Tabs defaultValue="orders">
              <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="orders" className="data-[state=active]:bg-background">Recent Orders</TabsTrigger>
                <TabsTrigger value="account" className="data-[state=active]:bg-background">My Profile</TabsTrigger>
                <TabsTrigger value="help" className="data-[state=active]:bg-background">Support</TabsTrigger>
              </TabsList>
              <TabsContent value="orders" className="mt-6">
                <Card className="border-none shadow-none bg-muted/20 p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: "#001", date: "24 Feb 2026", amount: "$42.50", status: "Delivered" },
                        { id: "#002", date: "22 Feb 2026", amount: "$18.99", status: "In Transit" },
                        { id: "#003", date: "15 Feb 2026", amount: "$12.00", status: "Completed" },
                      ].map(row => (
                        <TableRow key={row.id}>
                          <TableCell className="font-mono text-xs">{row.id}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell className="font-bold">{row.amount}</TableCell>
                          <TableCell><Badge variant="outline">{row.status}</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
              <TabsContent value="account" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-6">
                      <Avatar className="h-20 w-20 border-2 border-primary/20">
                        <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${theme}`} />
                        <AvatarFallback>NS</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-xl font-bold">Nishant Saxena</h4>
                        <p className="text-sm text-muted-foreground uppercase">{theme.replace('-', ' ')}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 pt-4">
                      <div className="space-y-1"><Label>Display Name</Label><Input defaultValue="Nishant Saxena" /></div>
                      <div className="space-y-1"><Label>Email Address</Label><Input defaultValue="nishant@inventure.ai" /></div>
                      <Button className="w-fit">Update Profile</Button>
                    </div>
                  </div>
                  <Card className="p-6 bg-primary/5 border-primary/10">
                    <h5 className="font-bold mb-4">Account Overview</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm"><span>Member Since</span><span className="font-medium">Feb 2026</span></div>
                      <div className="flex justify-between text-sm"><span>Total Orders</span><span className="font-medium">12</span></div>
                      <div className="flex justify-between text-sm"><span>Loyalty Points</span><span className="font-medium text-primary">850 pts</span></div>
                      <Separator className="my-2" />
                      <div className="flex justify-between text-sm"><span>Verified Client</span><span className="text-green-600 font-bold">Yes</span></div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="help" className="mt-6">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold">Frequently Asked Questions</h4>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="q1">
                        <AccordionTrigger>What is the delivery window?</AccordionTrigger>
                        <AccordionContent>Orders are typically delivered within 45-60 minutes for food, and same-day for groceries.</AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="q2">
                        <AccordionTrigger>How do I track my order?</AccordionTrigger>
                        <AccordionContent>You will receive a real-time tracking link via SMS once the driver picks up your order.</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <Card className="p-6">
                    <h4 className="font-bold mb-4">Contact Support</h4>
                    <Textarea placeholder="How can we help you today?" className="mb-4" />
                    <Button className="w-full">Submit Ticket</Button>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Trust badges */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
            {[
              { icon: Truck, title: "Fast Delivery", sub: config.hours },
              { icon: Shield, title: "Curated for You", sub: config.tagline },
              { icon: RefreshCw, title: "Support 24/7", sub: config.phone },
              { icon: Zap, title: "Instant Updates", sub: "Phase 2 Complete" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 hover:bg-muted/50 transition-all group">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Icon className="h-6 w-6" />
                </div>
                <h6 className="font-bold text-sm mb-1">{title}</h6>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </section>
        </main>

        <footer className="border-t py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2 font-bold text-xl">
                <span className="text-2xl">{config.logoIcon}</span> {config.name}
              </div>
              <p className="text-sm text-muted-foreground">{config.tagline} · Built with SRP Mock API</p>
            </div>
            <div className="flex gap-8 text-sm font-medium text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
            <p className="text-xs text-muted-foreground">© 2026 InventureAI · Phase 2 Complete</p>
          </div>
        </footer>
      </div>
    </TooltipProvider >
  )
}
