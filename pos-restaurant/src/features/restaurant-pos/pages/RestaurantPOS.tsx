import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { MOCK_RESTAURANT_PRODUCTS, RESTAURANT_CATEGORIES } from "../mock/data";
import { useRestaurantCart } from "../hooks/useRestaurantCart";
import { POSSwitcher } from "@/components/POSSwitcher";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { RestaurantCategoryFilter } from "../components/RestaurantCategoryFilter";
import { RestaurantProductCard } from "../components/RestaurantProductCard";
import { RestaurantCartItem } from "../components/RestaurantCartItem";
import { CheckoutModal } from "@/components/CheckoutModal";

export default function RestaurantPOS() {
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
                    <RestaurantCategoryFilter
                        categories={RESTAURANT_CATEGORIES}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />

                    <ScrollArea className="h-[calc(100vh-200px)]">
                        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 pr-4">
                            {filteredProducts.map(product => (
                                <RestaurantProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={addToCart}
                                />
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
                            <RestaurantCartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeFromCart}
                            />
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
                            onClick={() => setIsCheckoutOpen(true)}
                        >
                            Checkout Order
                        </Button>
                    </div>
                </div>
            </aside>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                onComplete={() => {
                    alert('Order completed and sent to kitchen!');
                    clearCart();
                }}
                subtotal={subtotal}
                tax={tax}
                total={total}
            />
        </div>
    );
}
