import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus, X, ShoppingCart, ShieldAlert } from "lucide-react";
import { MOCK_LIQUOR_PRODUCTS, LIQUOR_CATEGORIES } from "../mock/data";
import { useLiquorCart } from "../hooks/useLiquorCart";
import { POSSwitcher } from "@/components/POSSwitcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckoutModal } from "@/components/CheckoutModal";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function LiquorPOS() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        total
    } = useLiquorCart();

    const filteredProducts = activeCategory === "All"
        ? MOCK_LIQUOR_PRODUCTS
        : MOCK_LIQUOR_PRODUCTS.filter(p => p.category === activeCategory);

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const renderCart = (isMobile: boolean = false) => (
        <>
            {!isMobile && (
                <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                            <ShoppingCart className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black">Register</h2>
                    </div>
                </div>
            )}

            <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="group bg-muted/30 p-4 rounded-3xl space-y-4 hover:bg-muted/50 transition-all border border-transparent hover:border-border/50">
                            <div className="flex gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-2xl shrink-0">
                                    {item.image}
                                </div>
                                <div className="flex-1 min-w-0 py-1">
                                    <h4 className="font-black text-sm leading-tight mb-1">{item.name}</h4>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="font-black text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                                    onClick={() => removeFromCart(item.id)}
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
                                        onClick={() => updateQuantity(item.id, -1)}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-xl hover:bg-muted text-muted-foreground"
                                        onClick={() => updateQuantity(item.id, 1)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {cartItems.length === 0 && (
                        <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                            <ShoppingCart className="w-12 h-12 text-muted-foreground/30" />
                            <p className="text-sm font-bold text-muted-foreground">Scan an item to begin</p>
                        </div>
                    )}
                </div>
            </ScrollArea>

            <div className={`p-6 border-t border-border bg-muted/10 space-y-6 ${isMobile ? 'pb-8 pt-4' : ''}`}>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-muted-foreground">Subtotal</span>
                        <span className="font-black">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-muted-foreground">Liquor Tax (12%)</span>
                        <span className="font-black">${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="bg-border/50" />
                    <div className="flex justify-between items-center">
                        <span className="font-black text-lg">Total</span>
                        <span className="font-black text-3xl tracking-tighter text-primary">${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        className="h-14 font-black rounded-2xl border-border/50 text-destructive hover:bg-destructive hover:text-white"
                        onClick={clearCart}
                        disabled={cartItems.length === 0}
                    >
                        Void
                    </Button>
                    <Button
                        className="h-14 font-black rounded-2xl shadow-lg shadow-purple-500/20 bg-purple-600 hover:bg-purple-700 text-white"
                        disabled={cartItems.length === 0}
                        onClick={() => setIsCheckoutOpen(true)}
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    );

    return (
        <div className="flex h-[100dvh] bg-background overflow-hidden text-foreground">
            {/* Left Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-muted/10 pb-20 lg:pb-0">
                <header className="h-16 lg:h-20 border-b border-border bg-background px-4 lg:px-8 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2 lg:gap-4">
                        <Link to="/">
                            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-muted">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="text-xl lg:text-2xl font-black">Liquor Checkout</h1>
                        <div className="hidden sm:block"><POSSwitcher /></div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Badge variant="outline" className="hidden sm:flex text-destructive border-destructive/50 bg-destructive/10 gap-1 rounded-md px-3 py-1 font-bold">
                            <ShieldAlert className="w-4 h-4" />
                            Age Verification Required
                        </Badge>
                        <div className="sm:hidden"><POSSwitcher /></div>
                    </div>
                </header>

                <div className="p-4 lg:p-6 flex-1 overflow-hidden flex flex-col min-h-0">
                    <div className="flex gap-2 mb-4 lg:mb-6 overflow-x-auto pb-2 scrollbar-none shrink-0">
                        {LIQUOR_CATEGORIES.map(category => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? "default" : "outline"}
                                className={`rounded-xl font-bold px-4 lg:px-6 py-2 whitespace-nowrap ${activeCategory === category
                                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 border-none"
                                    : "border-border/50 text-muted-foreground"
                                    }`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    <ScrollArea className="flex-1 -pr-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 pr-4 pb-6">
                            {filteredProducts.map(product => (
                                <Card
                                    key={product.id}
                                    className="group rounded-[1.5rem] border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer bg-background overflow-hidden relative"
                                    onClick={() => addToCart(product)}
                                >
                                    <CardContent className="p-0">
                                        <div className="aspect-square relative flex items-center justify-center text-5xl lg:text-6xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                                            {product.image}
                                            <div className="absolute top-2 right-2 lg:top-3 lg:right-3">
                                                <Badge variant="secondary" className="bg-background/80 backdrop-blur font-mono text-[10px] lg:text-xs shadow-sm shadow-black/5">
                                                    {product.abv}% ABV
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="p-3 lg:p-4 space-y-1">
                                            <div className="flex justify-between items-start">
                                                <p className="text-[9px] lg:text-[10px] font-black uppercase text-muted-foreground tracking-widest">{product.brand}</p>
                                                <span className="text-[10px] lg:text-xs text-muted-foreground">{product.size}</span>
                                            </div>
                                            <h3 className="font-black truncate text-sm lg:text-base">{product.name}</h3>
                                            <p className="text-base lg:text-lg font-black text-primary">${product.price.toFixed(2)}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </main>

            {/* Desktop Right Sidebar - Cart */}
            <aside className="hidden lg:flex w-96 border-l border-border bg-background flex-col shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] z-10 shrink-0">
                {renderCart(false)}
            </aside>

            {/* Mobile/Tablet Sticky Cart Button */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-4 px-6 z-40 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total ({totalItems} items)</span>
                    <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
                </div>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="h-14 px-8 rounded-2xl font-black bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20">
                            View Cart
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[90%] sm:max-w-[400px] p-0 flex flex-col border-l border-border shadow-2xl">
                        <SheetHeader className="p-6 border-b border-border bg-background text-left flex flex-row items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 shrink-0 mt-0">
                                <ShoppingCart className="w-5 h-5" />
                            </div>
                            <SheetTitle className="text-xl font-black m-0">Register</SheetTitle>
                        </SheetHeader>
                        {renderCart(true)}
                    </SheetContent>
                </Sheet>
            </div>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                onComplete={() => {
                    alert('Sale Completed. Opening Cash Drawer!');
                    clearCart();
                }}
                subtotal={subtotal}
                tax={tax}
                total={total}
            />
        </div>
    );
}
