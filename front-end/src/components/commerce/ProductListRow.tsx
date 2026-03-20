import { useState } from "react";
import { Heart, Plus, Minus, Star, ShoppingCart, ImageOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Product, ClientConfig } from "@/mock/types";
import { useLanguage } from "@/components/language-provider";

interface ProductListRowProps {
    product: Product;
    config: ClientConfig;
    inCart?: { id: string; qty: number };
    inWishlist: boolean;
    onAddToCart: (id: string) => void;
    onChangeQty: (id: string, delta: number) => void;
    onToggleWishlist: (id: string) => void;
    onProductSelect: (product: Product) => void;
}

export function ProductListRow({
    product,
    inCart,
    inWishlist,
    onAddToCart,
    onChangeQty,
    onToggleWishlist,
    onProductSelect
}: Omit<ProductListRowProps, 'config'>) {
    const { t, l } = useLanguage();
    const [imageError, setImageError] = useState(false);

    return (
        <div className="group bg-muted/20 hover:bg-background border-none rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 p-3 md:p-4 flex flex-col sm:flex-row gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-2">
            {/* Image Section */}
            <div className="relative w-full sm:w-32 md:w-48 aspect-square sm:aspect-auto sm:h-auto bg-muted/40 rounded-[18px] md:rounded-[24px] flex items-center justify-center shrink-0 overflow-hidden">
                {!product.image || imageError ? (
                    <div className="flex flex-col items-center justify-center text-muted-foreground/30 gap-1">
                        <ImageOff className="w-10 h-10 md:w-12 md:h-12" />
                        <span className="text-[8px] font-black uppercase tracking-widest leading-none">No Image</span>
                    </div>
                ) : product.image.startsWith('http') ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <span className="text-5xl md:text-7xl group-hover:scale-110 transition-transform duration-500 select-none">
                        {product.image}
                    </span>
                )}

                {product.badge && (
                    <Badge className="absolute top-2 left-2 text-[8px] md:text-[9px] font-black uppercase tracking-widest px-2 border-none">
                        {l(product, 'badge')}
                    </Badge>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between py-1">
                <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                            <Badge variant="secondary" className="text-[8px] md:text-[9px] uppercase font-bold tracking-widest px-2 py-0 h-4">
                                {t(product.category) || product.category}
                            </Badge>
                            <h3 className="text-lg md:text-xl font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">
                                {l(product, 'name')}
                            </h3>
                        </div>
                        <span className="text-xl md:text-2xl font-black text-primary tracking-tighter shrink-0">${product.price}</span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-3 leading-relaxed max-w-2xl">
                        {l(product, 'description')}
                    </p>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                            ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{product.rating} ({product.reviews} {t('product.reviews')})</span>
                    </div>
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-2">
                    <Button 
                        variant="outline" 
                        className="h-10 rounded-xl font-bold text-xs border-2 hover:bg-primary/5 px-4 uppercase tracking-widest"
                        onClick={() => onProductSelect(product)}
                    >
                        {t('product.details')}
                    </Button>

                    {inCart ? (
                        <div className="flex items-center gap-1 border-2 border-primary/20 rounded-xl px-1 h-10 bg-primary/5">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg"
                                onClick={() => onChangeQty(product.id, -1)}>
                                <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-black w-6 text-center text-primary">{inCart.qty}</span>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg"
                                onClick={() => onAddToCart(product.id)}>
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            className="h-10 rounded-xl font-bold text-xs shadow-lg shadow-primary/10 transition-all px-4"
                            onClick={() => onAddToCart(product.id)}
                            disabled={!product.inStock}
                        >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {t('product.add_to_cart')}
                        </Button>
                    )}

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => onToggleWishlist(product.id)}
                                className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 ${inWishlist
                                    ? "bg-primary/10 text-primary"
                                    : "bg-muted text-muted-foreground hover:bg-primary/5 hover:text-primary"
                                    }`}
                            >
                                <Heart className="h-5 w-5" fill={inWishlist ? "currentColor" : "none"} />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="font-bold text-xs">{inWishlist ? t('product.remove_wishlist') : t('product.add_wishlist')}</TooltipContent>
                    </Tooltip>

                    <Badge variant="outline" className={`ml-auto hidden xs:flex h-6 rounded-full border-2 font-black text-[9px] uppercase tracking-widest ${product.inStock ? 'text-emerald-500 border-emerald-500/20' : 'text-destructive border-destructive/20'}`}>
                        {product.inStock ? t('product.in_stock') : t('product.out_of_stock')}
                    </Badge>
                </div>
            </div>
        </div>
    );
}
