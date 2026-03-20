import { useState } from 'react';
import { 
    Star, 
    ShoppingCart, 
    Heart, 
    Truck, 
    Shield, 
    RotateCcw, 
    Package, 
    Clock, 
    ArrowLeft, 
    Share2, 
    ChevronRight,
    ImageOff
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { Product, ClientConfig } from '@/mock/types';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/components/language-provider';
import { cn } from "@/lib/utils";

interface ProductDetailsViewProps {
    product: Product;
    config: ClientConfig;
    relatedProducts: Product[];
    onAddToCart: (id: string) => void;
    onToggleWishlist: (id: string) => void;
    onProductSelect: (product: Product) => void;
    cartItems: { id: string; qty: number }[];
    onChangeQty: (id: string, delta: number) => void;
    inWishlist: boolean;
    onClose: () => void;
}

export function ProductDetailsView({ 
    product, 
    config, 
    relatedProducts,
    onAddToCart, 
    onToggleWishlist,
    onProductSelect,
    cartItems,
    onChangeQty,
    inWishlist,
    onClose 
}: ProductDetailsViewProps) {
    const { t, l } = useLanguage();
    const [imageError, setImageError] = useState(false);

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1.5">
                <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                "w-4 h-4 transition-all duration-300",
                                i < Math.floor(rating) 
                                    ? "text-primary fill-primary " 
                                    : "text-muted-foreground/20"
                            )}
                        />
                    ))}
                </div>
                <span className="text-sm font-black text-foreground ml-1">{rating}</span>
                <span className="text-xs font-bold text-muted-foreground ml-1">({product.reviews} {t('product.reviews')})</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background animate-in fade-in duration-500">
            {/* Navigation Header */}
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
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest hidden sm:flex">
                            <span className="cursor-pointer hover:text-primary transition-colors" onClick={onClose}>Shop</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-foreground font-black">{product.category}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-muted transition-all active:scale-90">
                            <Share2 className="w-5 h-5" />
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => onToggleWishlist(product.id)}
                            className={cn(
                                "rounded-2xl transition-all active:scale-90",
                                inWishlist ? "text-primary bg-primary/10" : "hover:bg-muted"
                            )}
                        >
                            <Heart className={cn("w-5 h-5", inWishlist && "fill-primary")} />
                        </Button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                    
                    {/* Visual Section (Column 1-7) */}
                    <div className="lg:col-span-12 xl:col-span-7 space-y-8">
                        <div className="relative aspect-square md:aspect-[4/3] bg-muted/20 rounded-[40px] md:rounded-[60px] flex items-center justify-center p-8 md:p-16 overflow-hidden shadow-2xl shadow-primary/5">
                            {!product.image || imageError ? (
                                <div className="flex flex-col items-center justify-center text-muted-foreground/10 gap-6">
                                    <ImageOff className="w-40 h-40" />
                                    <span className="text-xl font-black uppercase tracking-widest select-none">No Image Preview</span>
                                </div>
                            ) : product.image.startsWith('http') ? (
                                <img
                                    src={product.image}
                                    alt={l(product, 'name')}
                                    onError={() => setImageError(true)}
                                    className="w-full h-full object-cover rounded-[32px] md:rounded-[48px] shadow-2xl transition-transform duration-700 hover:scale-105"
                                />
                            ) : (
                                <span className="text-[180px] md:text-[240px] drop-shadow-2xl animate-in zoom-in-50 duration-700">{product.image}</span>
                            )}

                            {/* Floating Badge */}
                            {product.badge && (
                                <div className="absolute top-8 left-8">
                                    <Badge className="px-6 py-2 text-sm font-black uppercase tracking-[0.2em] shadow-2xl border-none">
                                        {product.badge}
                                    </Badge>
                                </div>
                            )}

                            {/* Branding Watermark */}
                            <div className="absolute bottom-8 right-12 flex items-center gap-3 opacity-10 select-none grayscale pointer-events-none">
                                <span className="text-4xl">{config.logoIcon}</span>
                                <span className="text-2xl font-black tracking-tighter">{config.name}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section (Column 8-12) */}
                    <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-8 md:gap-12">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                                    {product.category}
                                </Badge>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.9] text-foreground">
                                    {l(product, 'name')}
                                </h1>
                            </div>
                            
                            <div className="flex items-center justify-between py-2">
                                <div className="flex flex-col">
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-5xl font-black text-primary tracking-tighter">${product.price}</span>
                                        {product.originalPrice && (
                                            <span className="text-2xl text-muted-foreground line-through decoration-destructive/30 decoration-4">
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Free delivery on orders over ${config.freeDeliveryThreshold}</p>
                                </div>
                                <div className="hidden sm:block">
                                    {renderStars(product.rating)}
                                </div>
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                                {l(product, 'description')}
                            </p>
                        </div>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-2 gap-6 p-8 rounded-[40px] bg-muted/20 border border-border/50">
                            <div className="flex flex-col gap-2">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Logistics</h4>
                                    <p className="text-sm font-bold">{t('product.fast_delivery')}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <RotateCcw className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assurance</h4>
                                    <p className="text-sm font-bold">{t('product.easy_returns')}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Certified</h4>
                                    <p className="text-sm font-bold">{t('product.certified_quality')}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Package className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Availability</h4>
                                    <p className={cn("text-sm font-bold", product.inStock ? "text-emerald-500" : "text-destructive")}>
                                        {product.inStock ? t('product.in_stock') : t('product.out_of_stock')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <Button 
                                    size="lg"
                                    disabled={!product.inStock}
                                    onClick={() => onAddToCart(product.id)}
                                    className="flex-1 h-20 text-xl font-black rounded-[24px] md:rounded-[32px] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    <ShoppingCart className="w-6 h-6 mr-4 stroke-[3px]" />
                                    {t('product.add_to_cart')}
                                </Button>
                            </div>
                            
                            <div className="flex items-center justify-center gap-4 py-4 px-6 rounded-2xl bg-muted/30">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                    <Clock className="w-3.5 h-3.5 text-primary" />
                                    <span>Special Offer Ends:</span>
                                    <span className="text-foreground">04:22:15</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-20 pt-20 border-t border-border/50">
                    <h3 className="text-2xl font-black tracking-tight mb-8">Related Products</h3>
                    {relatedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map(p => (
                                <ProductCard 
                                    key={p.id}
                                    product={p}
                                    inCart={cartItems.find(item => item.id === p.id)}
                                    inWishlist={false} // Will be handled if needed, for simplicity set false for now or pass actual
                                    onAddToCart={onAddToCart}
                                    onChangeQty={onChangeQty}
                                    onToggleWishlist={onToggleWishlist}
                                    onProductSelect={onProductSelect}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground italic">No related products found in this category.</p>
                    )}
                </div>
            </main>
        </div>
    );
}
