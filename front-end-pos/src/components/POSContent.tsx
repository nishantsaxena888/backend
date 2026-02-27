import { useState } from "react";
import { type ClientConfig, type Product } from "@/mock/types";
import { useLanguage } from "@/components/language-provider";
import { useTheme } from "@/components/theme-provider";
import {
    ShoppingCart,
    Search,
    History,
    User,
    LogOut,
    Plus,
    Minus,
    Trash2,
    X,
    ChevronRight,
    Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface POSContentProps {
    config: ClientConfig;
    products: Product[];
}

interface CartItem extends Product {
    qty: number;
}

export function POSContent({ config, products }: POSContentProps) {
    const { t, l } = useLanguage();
    const { theme, setTheme } = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [activeTab, setActiveTab] = useState("all");

    const categories = ["all", ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(p => {
        const matchesSearch = l(p, 'name').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeTab === "all" || p.category === activeTab;
        return matchesSearch && matchesCategory;
    });

    const addToCart = (product: Product) => {
        setCartItems((prev: CartItem[]) => {
            const existing = prev.find((item: CartItem) => item.id === product.id);
            if (existing) {
                return prev.map((item: CartItem) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const updateQty = (id: string, delta: number) => {
        setCartItems((prev: CartItem[]) => prev.map((item: CartItem) => {
            if (item.id === id) {
                return { ...item, qty: Math.max(1, item.qty + delta) };
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        setCartItems((prev: CartItem[]) => prev.filter((item: CartItem) => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc: number, item: CartItem) => acc + item.price * item.qty, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <div className="flex h-screen bg-background overflow-hidden text-foreground">
            {/* Left Sidebar - Navigation */}
            <aside className="w-20 flex flex-col items-center py-6 border-r border-border bg-muted/40 gap-8">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                    {config.logoIcon}
                </div>

                <nav className="flex-1 flex flex-col gap-4">
                    <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl bg-primary/10 text-primary">
                        <Monitor className="w-6 h-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl text-muted-foreground hover:bg-muted">
                        <History className="w-6 h-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl text-muted-foreground hover:bg-muted">
                        <User className="w-6 h-6" />
                    </Button>
                </nav>

                <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                    <LogOut className="w-6 h-6" />
                </Button>
            </aside>

            {/* Main Content - Product Catalog */}
            <main className="flex-1 flex flex-col min-w-0 bg-muted/10">
                <header className="h-20 border-b border-border bg-background px-8 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder={t('search_placeholder') || "Search products..."}
                                className="pl-11 h-12 bg-muted/50 border-none rounded-2xl"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="rounded-xl font-bold border-border/50">
                                    {theme.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-2xl border-border/50">
                                <DropdownMenuLabel>Switch Theme</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {["emerald-grocery", "fashion-black", "fashion-gold-luxury", "green-mvp", "grey-grocery", "liqour-black", "liquor-orange", "restaurant-black"].map((tName) => (
                                    <DropdownMenuItem
                                        key={tName}
                                        onClick={() => setTheme(tName as any)}
                                        className="rounded-xl cursor-pointer"
                                    >
                                        {tName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <div className="flex-1 overflow-hidden p-8 space-y-8">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <ScrollArea className="w-full whitespace-nowrap">
                            <TabsList className="bg-transparent h-auto p-0 gap-2">
                                {categories.map(cat => (
                                    <TabsTrigger
                                        key={cat}
                                        value={cat}
                                        className="px-6 py-2.5 rounded-xl border border-border/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 capitalize font-bold transition-all"
                                    >
                                        {cat === 'all' ? t('product.all_products') : t(cat)}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </ScrollArea>
                    </Tabs>

                    <ScrollArea className="h-[calc(100vh-280px)]">
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pr-4">
                            {filteredProducts.map(product => (
                                <Card
                                    key={product.id}
                                    className="group rounded-3xl border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer bg-background overflow-hidden"
                                    onClick={() => addToCart(product)}
                                >
                                    <CardContent className="p-0">
                                        <div className="aspect-square relative flex items-center justify-center text-4xl bg-muted/30 group-hover:bg-muted/50 transition-colors">
                                            {product.image && product.image.startsWith('http') ? (
                                                <img
                                                    src={product.image}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = "https://placehold.co/400x400/png?text=No+Image";
                                                    }}
                                                />
                                            ) : product.image ? (
                                                <span>{product.image}</span>
                                            ) : (
                                                <img src="https://placehold.co/400x400/png?text=No+Image" className="w-full h-full object-cover" />
                                            )}
                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg">
                                                    <Plus className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 space-y-1">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t(product.category)}</p>
                                            <h3 className="font-black truncate">{l(product, 'name')}</h3>
                                            <p className="text-lg font-black text-primary">${product.price.toFixed(2)}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        {filteredProducts.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground space-y-4">
                                <Search className="w-12 h-12 opacity-20" />
                                <p className="font-bold">{t('product.no_matches')}</p>
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </main>

            {/* Right Sidebar - Cart */}
            <aside className="w-96 border-l border-border bg-background flex flex-col">
                <div className="p-8 border-b border-border flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <ShoppingCart className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black">{t('cart.title')}</h2>
                    </div>
                    <Badge variant="secondary" className="rounded-lg font-black px-2.5 py-1">
                        {cartItems.length}
                    </Badge>
                </div>

                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="group bg-muted/30 p-4 rounded-3xl space-y-4 hover:bg-muted/50 transition-all border border-transparent hover:border-border/50">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center text-2xl shrink-0 overflow-hidden shadow-sm">
                                        {item.image && item.image.startsWith('http') ? (
                                            <img
                                                src={item.image}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = "https://placehold.co/100x100/png?text=No+Img";
                                                }}
                                            />
                                        ) : item.image ? (
                                            <span>{item.image}</span>
                                        ) : (
                                            <img src="https://placehold.co/100x100/png?text=No+Img" className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 py-1">
                                        <h4 className="font-black text-sm truncate leading-none mb-1">{l(item, 'name')}</h4>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t(item.category)}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="font-black text-primary">${(item.price * item.qty).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="w-8 h-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between bg-background rounded-2xl p-1 gap-2 border border-border/50">
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-xl hover:bg-muted text-muted-foreground"
                                            onClick={() => updateQty(item.id, -1)}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-8 text-center text-sm font-black">{item.qty}</span>
                                        <Button
                                            variant="ghost" size="icon"
                                            className="h-8 w-8 rounded-xl hover:bg-muted text-muted-foreground"
                                            onClick={() => updateQty(item.id, 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="pr-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                        ${item.price.toFixed(2)} / ea
                                    </div>
                                </div>
                            </div>
                        ))}

                        {cartItems.length === 0 && (
                            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-20 h-20 bg-muted/50 rounded-[40px] flex items-center justify-center">
                                    <ShoppingCart className="w-10 h-10 text-muted-foreground/30" />
                                </div>
                                <p className="text-sm font-bold text-muted-foreground">{t('cart.empty')}</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <div className="p-8 border-t border-border bg-muted/10 space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-muted-foreground">Subtotal</span>
                            <span className="font-black">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-muted-foreground">Service Tax (8%)</span>
                            <span className="font-black">${tax.toFixed(2)}</span>
                        </div>
                        <Separator className="bg-border/50" />
                        <div className="flex justify-between items-center">
                            <span className="font-black text-lg">Total</span>
                            <span className="font-black text-3xl tracking-tighter text-primary">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <Button
                        className="w-full h-16 text-xl font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between px-8 group"
                        disabled={cartItems.length === 0}
                    >
                        <span className="text-xl leading-none">Checkout</span>
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full h-14 font-black rounded-2xl text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                        onClick={() => setCartItems([])}
                        disabled={cartItems.length === 0}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Cart
                    </Button>
                </div>
            </aside>
        </div>
    );
}
