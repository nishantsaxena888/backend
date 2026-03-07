import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, ShieldAlert } from "lucide-react";
import { MOCK_LIQUOR_PRODUCTS, LIQUOR_CATEGORIES } from "../mock/data";
import { useLiquorCart } from "../hooks/useLiquorCart";
import { POSSwitcher } from "@/components/POSSwitcher";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CategoryFilter } from "../components/CategoryFilter";
import { LiquorProductCard } from "../components/LiquorProductCard";
import { LiquorCartItem } from "../components/LiquorCartItem";
import { CheckoutModal } from "@/components/CheckoutModal";

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
                        <h1 className="text-2xl font-black">Liquor Checkout</h1>
                        <POSSwitcher />
                    </div>
                    <Badge variant="outline" className="text-destructive border-destructive/50 bg-destructive/10 gap-1 rounded-md px-3 py-1 font-bold">
                        <ShieldAlert className="w-4 h-4" />
                        Age Verification Required
                    </Badge>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    {/* Vertical Category Sidebar */}
                    <aside className="w-72 border-r border-border bg-background p-6 flex flex-col shrink-0">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-black">Categories</h2>
                            <Badge variant="secondary" className="font-mono">{LIQUOR_CATEGORIES.length}</Badge>
                        </div>
                        <ScrollArea className="flex-1 pr-4 -mr-4">
                            <CategoryFilter
                                categories={LIQUOR_CATEGORIES}
                                activeCategory={activeCategory}
                                onCategoryChange={setActiveCategory}
                                activeColorClass="bg-orange-600 hover:bg-orange-700 shadow-orange-500/20"
                            />
                        </ScrollArea>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="flex-1 p-6 overflow-hidden flex flex-col bg-muted/5 relative">
                        {/* Barcode Scanner UI (Mock) */}
                        <div className="mb-6 bg-background rounded-2xl p-4 border border-border flex items-center gap-4 shadow-sm">
                            <div className="w-12 h-12 bg-muted/30 rounded-xl flex items-center justify-center text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><rect width="10" height="8" x="7" y="8" rx="1" /><path d="M7 12h10" /></svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-muted-foreground mb-1">Scan Barcode or Search SKU</p>
                                <input
                                    type="text"
                                    placeholder="Focus here to scan... (e.g. 080432400438)"
                                    className="w-full bg-transparent border-none text-xl font-bold outline-none placeholder:text-muted-foreground/30 focus:placeholder:text-transparent transition-colors"
                                />
                            </div>
                            <Button className="font-bold rounded-xl h-10 px-6">Lookup</Button>
                        </div>

                        <ScrollArea className="flex-1">
                            {/* Denser Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pr-4 pb-6">
                                {filteredProducts.map(product => (
                                    <LiquorProductCard
                                        key={product.id}
                                        product={product}
                                        onClick={addToCart}
                                    />
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </main>

            {/* Right Sidebar - Cart */}
            <aside className="w-96 border-l border-border bg-background flex flex-col shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] z-10">
                <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                            <ShoppingCart className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black">Register</h2>
                    </div>
                </div>

                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <LiquorCartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeFromCart}
                            />
                        ))}

                        {cartItems.length === 0 && (
                            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                                <ShoppingCart className="w-12 h-12 text-muted-foreground/30" />
                                <p className="text-sm font-bold text-muted-foreground">Scan an item to begin</p>
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
                            className="h-14 font-black rounded-2xl shadow-lg shadow-orange-500/20 bg-orange-600 hover:bg-orange-700 text-white"
                            disabled={cartItems.length === 0}
                            onClick={() => setIsCheckoutOpen(true)}
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </aside>

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
