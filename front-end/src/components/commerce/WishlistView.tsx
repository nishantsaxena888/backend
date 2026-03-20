import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import type { Product, ClientConfig } from "@/mock/types";
import { useLanguage } from "@/components/language-provider";

interface WishlistViewProps {
    wishlist: Product[];
    config: ClientConfig;
    cartItems: { id: string; qty: number }[];
    onAddToCart: (id: string) => void;
    onChangeQty: (id: string, delta: number) => void;
    onToggleWishlist: (id: string) => void;
    onProductSelect: (product: Product) => void;
    onClose: () => void;
}

export function WishlistView({
    wishlist,
    config,
    cartItems,
    onAddToCart,
    onChangeQty,
    onToggleWishlist,
    onProductSelect,
    onClose
}: WishlistViewProps) {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/10">
                <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={onClose}
                            className="rounded-2xl hover:bg-muted transition-all active:scale-90"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <h1 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-3">
                            <Heart className="w-6 h-6 text-primary fill-primary" />
                            {t('wishlist.title') || 'My Wishlist'}
                        </h1>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {wishlist.length > 0 ? (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <p className="text-muted-foreground font-medium">
                                You have <span className="text-foreground font-black">{wishlist.length}</span> items saved in your wishlist.
                            </p>
                        </div>
                        <ProductGrid 
                            products={wishlist}
                            config={config}
                            cartItems={cartItems}
                            wishlist={wishlist.map(p => p.id)}
                            onAddToCart={onAddToCart}
                            onChangeQty={onChangeQty}
                            onToggleWishlist={onToggleWishlist}
                            onProductSelect={onProductSelect}
                            viewMode="grid"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                        <div className="w-24 h-24 rounded-[32px] bg-muted/30 flex items-center justify-center text-muted-foreground/20">
                            <Heart className="w-12 h-12" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black tracking-tight">Your wishlist is empty</h2>
                            <p className="text-muted-foreground max-w-sm mx-auto font-medium">
                                Save items you love to your wishlist and they'll show up here so you can find them easily later.
                            </p>
                        </div>
                        <Button 
                            onClick={onClose}
                            className="h-14 px-8 rounded-2xl font-bold shadow-xl shadow-primary/20"
                        >
                            <ShoppingBag className="w-5 h-5 mr-3" />
                            Continue Shopping
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}
