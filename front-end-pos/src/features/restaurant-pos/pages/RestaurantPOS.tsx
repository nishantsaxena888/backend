import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus, X, ShoppingBag } from "lucide-react";
import { MOCK_RESTAURANT_PRODUCTS, RESTAURANT_CATEGORIES } from "../mock/data";
import { useRestaurantCart } from "../hooks/useRestaurantCart";
import { POSSwitcher } from "@/components/POSSwitcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function RestaurantPOS() {
    const [activeCategory, setActiveCategory] = useState("All");
    const {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        total
    } = useRestaurantCart();

    const filteredProducts = activeCategory === "All"
        ? MOCK_RESTAURANT_PRODUCTS
        : MOCK_RESTAURANT_PRODUCTS.filter(p => p.category === activeCategory);

    return (
        <div className="flex h-screen bg-background overflow-hidden text-foreground">
            {/* Left Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-muted/10">
                <header className="h-20 border-b border-border bg-background px-8 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <Link to="/">
                            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-muted">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-black">Restaurant POS</h1>
                        <POSSwitcher />
                    </div>
                </header>

                <div className="p-6">
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
                        {RESTAURANT_CATEGORIES.map(category => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? "default" : "outline"}
                                className={`rounded-xl font-bold px-6 py-2 ${activeCategory === category
                                    ? "shadow-lg shadow-primary/20"
                                    : "border-border/50 text-muted-foreground"
                                    }`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    <ScrollArea className="h-[calc(100vh-200px)]">
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pr-4">
                            {filteredProducts.map(product => (
                                <Card
                                    key={product.id}
                                    className="group rounded-3xl border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer bg-background overflow-hidden"
                                    onClick={() => addToCart(product)}
                                >
                                    <CardContent className="p-0">
                                        <div className="aspect-square relative flex items-center justify-center text-6xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                                            {product.image}
                                        </div>
                                        <div className="p-4 space-y-1">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{product.category}</p>
                                            <h3 className="font-black truncate">{product.name}</h3>
                                            <p className="text-lg font-black text-primary">${product.price.toFixed(2)}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </main>

            {/* Right Sidebar - Cart */}
            <aside className="w-96 border-l border-border bg-background flex flex-col shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] z-10">
                <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black">Current Order</h2>
                    </div>
                    <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-sm font-black">
                        {cartItems.length} items
                    </span>
                </div>

                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="group bg-muted/30 p-4 rounded-3xl space-y-4 hover:bg-muted/50 transition-all border border-transparent hover:border-border/50">
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-2xl shrink-0">
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
                                <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
                                <p className="text-sm font-bold text-muted-foreground">No items in the cart</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <div className="p-6 border-t border-border bg-muted/10 space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-muted-foreground">Subtotal</span>
                            <span className="font-black">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-muted-foreground">Tax (8%)</span>
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
                            className="h-14 font-black rounded-2xl border-border/50"
                            onClick={clearCart}
                            disabled={cartItems.length === 0}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="h-14 font-black rounded-2xl shadow-lg shadow-primary/20 bg-orange-600 hover:bg-orange-700 text-white"
                            disabled={cartItems.length === 0}
                            onClick={() => {
                                alert('Order sent to kitchen!');
                                clearCart();
                            }}
                        >
                            Place Order
                        </Button>
                    </div>
                </div>
            </aside>
        </div>
    );
}
