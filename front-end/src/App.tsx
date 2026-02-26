import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/Header"
import { NavBar } from "@/components/layout/Navbar"

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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  ShoppingCart, Heart, Star,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Info, AlertTriangle, Package, DollarSign,
  ChevronRight, Filter, Zap, Shield, Truck, RefreshCw, Plus, Minus, X
} from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Organic Avocados", price: 4.99, rating: 4.8, reviews: 234, category: "Fresh Produce", badge: "Organic", image: "🥑" },
  { id: 2, name: "Sourdough Bread", price: 6.99, rating: 4.6, reviews: 189, category: "Bakery", badge: "Fresh", image: "🍞" },
  { id: 3, name: "Almond Milk", price: 3.49, rating: 4.4, reviews: 312, category: "Dairy & Eggs", badge: "Vegan", image: "🥛" },
  { id: 4, name: "Greek Yoghurt", price: 3.99, rating: 4.7, reviews: 156, category: "Dairy & Eggs", badge: "Sale", image: "🫙" },
  { id: 5, name: "Wild Salmon", price: 12.99, rating: 4.9, reviews: 98, category: "Meat & Seafood", badge: "Premium", image: "🐟" },
  { id: 6, name: "Dark Chocolate", price: 2.99, rating: 4.5, reviews: 421, category: "Snacks", badge: "Popular", image: "🍫" },
]

// ─── APP ROOT ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider defaultTheme="emerald-grocery">
      <HomePage />
    </ThemeProvider>
  )
}

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [cartItems, setCartItems] = useState<{ id: number; qty: number }[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState([0, 50])
  const [notifications, setNotifications] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cartItems.reduce((s, i) => {
    const p = PRODUCTS.find(p => p.id === i.id)
    return s + (p?.price ?? 0) * i.qty
  }, 0)

  function addToCart(id: number) {
    setCartItems(prev => {
      const ex = prev.find(i => i.id === id)
      return ex
        ? prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { id, qty: 1 }]
    })
  }
  function removeFromCart(id: number) {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }
  function changeQty(id: number, delta: number) {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    )
  }
  function toggleWishlist(id: number) {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const filtered = PRODUCTS.filter(p => {
    const matchCat = selectedCategory === "All Products" || p.category === selectedCategory
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
    return matchCat && matchPrice
  })

  const sidebarCategories = [...new Set(PRODUCTS.map(p => p.category))]
  const user = isSignedIn ? { name: "Nishant Saxena", email: "nishant@inventure.ai" } : null

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">

        {/* ── REAL ECOM HEADER ─────────────────────────────────── */}
        <Header
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
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* ── CART SHEET (triggered from header) ───────────────── */}
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
                    const p = PRODUCTS.find(p => p.id === ci.id)!
                    return (
                      <div key={ci.id} className="flex items-center gap-3 border border-border rounded-lg p-3">
                        <span className="text-2xl">{p.image}</span>
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
                <Progress value={Math.min((cartTotal / 30) * 100, 100)} className="h-1.5" />
                <p className="text-xs text-muted-foreground text-center">
                  {cartTotal >= 30 ? "🎉 Free delivery unlocked!" : `Add $${(30 - cartTotal).toFixed(2)} more for free delivery`}
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full">Checkout · ${cartTotal.toFixed(2)}</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm your order?</AlertDialogTitle>
                      <AlertDialogDescription>
                        {cartCount} items · ${cartTotal.toFixed(2)} total. We'll process your order immediately.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => { setCartItems([]); setCartOpen(false) }}>Place Order 🎉</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </SheetContent>
        </Sheet>

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
            <Info className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">Phase 2 Live — Real Ecom Header & Navbar</AlertTitle>
            <AlertDescription>
              The header and nav above are the real Ecom components, fully re-themed to use CSS variables.
              Switch themes via the header's theme selector — every element updates instantly.
            </AlertDescription>
          </Alert>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Products", value: String(PRODUCTS.length), sub: "In stock", icon: Package },
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
                    <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={50} step={1} />
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
                  <Button variant="outline" size="sm" className="w-full" onClick={() => { setPriceRange([0, 50]); setSelectedCategory("All Products") }}>
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
                    <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={50} step={1} />
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
                  <Button variant="link" onClick={() => { setPriceRange([0, 50]); setSelectedCategory("All Products") }}>Clear filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map(product => {
                    const inCart = cartItems.find(i => i.id === product.id)
                    const inWishlist = wishlist.includes(product.id)
                    return (
                      <Card key={product.id} className="group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                        <div className="relative h-40 bg-accent/40 rounded-t-lg flex items-center justify-center text-6xl">
                          {product.image}
                          <Badge className="absolute top-2 left-2 text-xs">{product.badge}</Badge>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button onClick={() => toggleWishlist(product.id)}
                                className={`absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center transition-colors ${inWishlist ? "bg-destructive text-white" : "bg-background/80 text-muted-foreground hover:text-destructive"
                                  }`}>
                                <Heart className="h-3.5 w-3.5" fill={inWishlist ? "currentColor" : "none"} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>{inWishlist ? "Remove from wishlist" : "Save for later"}</TooltipContent>
                          </Tooltip>
                        </div>
                        <CardHeader className="pb-2 pt-3">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-sm font-semibold leading-tight">{product.name}</CardTitle>
                            <span className="text-base font-bold text-primary whitespace-nowrap">${product.price}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}`} />
                              ))}
                            </div>
                            <span className="text-[11px] text-muted-foreground">{product.rating} ({product.reviews})</span>
                          </div>
                        </CardHeader>
                        <CardFooter className="pt-0 gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex-1">Details</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-3">
                                  <span className="text-3xl">{product.image}</span> {product.name}
                                </DialogTitle>
                                <DialogDescription>{product.category} · {product.reviews} reviews · {product.rating}★</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-3 py-2">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground text-sm">Price</span>
                                  <span className="text-xl font-bold text-primary">${product.price}</span>
                                </div>
                                <Progress value={product.rating * 20} className="h-2" />
                                <p className="text-xs text-muted-foreground">Rating: {product.rating}/5.0</p>
                              </div>
                              <DialogFooter>
                                <Button onClick={() => addToCart(product.id)} className="w-full">
                                  <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          {inCart ? (
                            <div className="flex items-center gap-1 border border-border rounded-md px-2">
                              <button className="h-7 w-5 flex items-center justify-center text-muted-foreground hover:text-foreground"
                                onClick={() => changeQty(product.id, -1)}>
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm font-medium w-4 text-center">{inCart.qty}</span>
                              <button className="h-7 w-5 flex items-center justify-center text-muted-foreground hover:text-foreground"
                                onClick={() => addToCart(product.id)}>
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <Button size="sm" className="flex-1" onClick={() => addToCart(product.id)}>
                              <ShoppingCart className="h-3.5 w-3.5 mr-1.5" /> Add
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

          <Separator />

          {/* Tabs section */}
          <section>
            <Tabs defaultValue="orders">
              <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="help">Help</TabsTrigger>
              </TabsList>
              <TabsContent value="orders" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Your last 5 purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { id: "#001", item: "Organic Bundle", amount: "$42.50", status: "Delivered" },
                          { id: "#002", item: "Dairy Pack", amount: "$18.99", status: "In Transit" },
                          { id: "#003", item: "Bakery Box", amount: "$12.00", status: "Processing" },
                          { id: "#004", item: "Seafood Box", amount: "$35.99", status: "Delivered" },
                          { id: "#005", item: "Snack Pack", amount: "$9.99", status: "Cancelled" },
                        ].map(row => (
                          <TableRow key={row.id}>
                            <TableCell className="font-mono text-xs text-muted-foreground">{row.id}</TableCell>
                            <TableCell className="font-medium">{row.item}</TableCell>
                            <TableCell>{row.amount}</TableCell>
                            <TableCell>
                              <Badge variant={row.status === "Delivered" ? "default" : row.status === "Cancelled" ? "destructive" : "secondary"} className="text-xs">
                                {row.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="account" className="mt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=NS" />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">NS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">Nishant Saxena</p>
                          <p className="text-sm text-muted-foreground">nishant@inventure.ai</p>
                          <Badge variant="secondary" className="mt-1 text-xs">Premium Member</Badge>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-3">
                        <div className="space-y-1"><Label>Full Name</Label><Input defaultValue="Nishant Saxena" /></div>
                        <div className="space-y-1"><Label>Email</Label><Input defaultValue="nishant@inventure.ai" type="email" /></div>
                        <div className="space-y-1"><Label>Bio</Label><Textarea rows={3} defaultValue="Building the future of e-commerce." /></div>
                      </div>
                      <Button className="w-full">Save Changes</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { label: "Email notifications", checked: true },
                        { label: "SMS order updates", checked: true },
                        { label: "Weekly deals digest", checked: false },
                        { label: "Price drop alerts", checked: notifications },
                      ].map(({ label, checked }) => (
                        <div key={label} className="flex items-center justify-between">
                          <Label className="font-normal">{label}</Label>
                          <Switch defaultChecked={checked} />
                        </div>
                      ))}
                      <Separator />
                      <div className="space-y-2">
                        <Label>Preferred Theme</Label>
                        <p className="text-xs text-muted-foreground">Use the theme selector in the top-right header to switch themes.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="help" className="mt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader><CardTitle>FAQs</CardTitle></CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        {[
                          { q: "How long does delivery take?", a: "Standard: 2–4 hours. Express: 30 minutes." },
                          { q: "Can I return a product?", a: "Yes — return within 7 days for a full refund." },
                          { q: "Is my payment secure?", a: "All transactions are encrypted with TLS." },
                          { q: "Do you offer bulk discounts?", a: "Orders over $100 get 10% off automatically." },
                        ].map((item, i) => (
                          <AccordionItem key={i} value={`faq-${i}`}>
                            <AccordionTrigger className="text-sm">{item.q}</AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Contact Us</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Avg response time</AlertTitle>
                        <AlertDescription>We reply within 2 business hours.</AlertDescription>
                      </Alert>
                      <div className="space-y-3">
                        <div className="space-y-1"><Label>Subject</Label><Input placeholder="Describe your issue…" /></div>
                        <div className="space-y-1"><Label>Message</Label><Textarea rows={4} /></div>
                        <div className="space-y-1">
                          <Label>Formatting</Label>
                          <div className="flex gap-1">
                            <Toggle size="sm"><Bold className="h-3.5 w-3.5" /></Toggle>
                            <Toggle size="sm"><Italic className="h-3.5 w-3.5" /></Toggle>
                            <Toggle size="sm"><Underline className="h-3.5 w-3.5" /></Toggle>
                          </div>
                        </div>
                        <Button className="w-full">Send Message</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Skeleton loading states */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-muted-foreground">Loading States</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <Card key={i}>
                  <div className="h-32 bg-muted/50 rounded-t-lg flex items-center justify-center">
                    <Skeleton className="h-16 w-16 rounded-xl" />
                  </div>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-3 w-full mb-2" /><Skeleton className="h-3 w-4/5" />
                    <div className="flex gap-2 mt-4"><Skeleton className="h-8 flex-1 rounded-md" /><Skeleton className="h-8 flex-1 rounded-md" /></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Trust badges */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: "Free Delivery", sub: "On orders over $30" },
              { icon: Shield, title: "Secure Payment", sub: "256-bit SSL" },
              { icon: RefreshCw, title: "Easy Returns", sub: "7-day policy" },
              { icon: Zap, title: "Fast Dispatch", sub: "Order before 2 PM" },
            ].map(({ icon: Icon, title, sub }) => (
              <Card key={title} className="flex items-center gap-3 p-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </Card>
            ))}
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t mt-8 py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-primary">
              <Zap className="h-5 w-5" /> Inventure
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>Active theme:</span>
              <Badge variant="outline">Phase 2 ✅</Badge>
            </div>
            <p className="text-xs text-muted-foreground">© 2026 Inventure · Phase 2 complete</p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}
