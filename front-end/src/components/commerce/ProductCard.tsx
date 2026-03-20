import { useState } from "react";
import { Heart, Plus, Minus, Star, ImageOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Product, ClientConfig } from "@/mock/types";
import { useLanguage } from "@/components/language-provider";

interface ProductCardProps {
    product: Product;
    config: ClientConfig;
    inCart?: { id: string; qty: number };
    inWishlist: boolean;
    onAddToCart: (id: string) => void;
    onChangeQty: (id: string, delta: number) => void;
    onToggleWishlist: (id: string) => void;
    onProductSelect: (product: Product) => void;
}

export function ProductCard({
    product,
    inCart,
    inWishlist,
    onAddToCart,
    onChangeQty,
    onToggleWishlist,
    onProductSelect
}: Omit<ProductCardProps, 'config'>) {
    const { t, l } = useLanguage();
    const [imageError, setImageError] = useState(false);

    return (
        <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-none bg-muted/20 hover:bg-background rounded-[24px] md:rounded-[40px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-500">
            <div className="relative h-48 md:h-64 overflow-hidden bg-muted/40 flex items-center justify-center m-2 md:m-4 mb-0 rounded-[20px] md:rounded-[32px]">
                {!product.image || imageError ? (
                    <div className="flex flex-col items-center justify-center text-muted-foreground/30 gap-2">
                        <ImageOff className="w-16 h-16 md:w-20 md:h-20" />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">No Image</span>
                    </div>
                ) : product.image.startsWith('http') ? (
                    <img
                        src={product.image}
                        alt={l(product, 'name')}
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <span className="text-8xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 drop-shadow-xl select-none">
                        {product.image}
                    </span>
                )}

                {product.badge && (
                    <Badge className="absolute top-4 left-4 h-7 text-[10px] font-black uppercase tracking-widest px-4 border-none shadow-lg">
                        {l(product, 'badge')}
                    </Badge>
                )}

                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id) }}
                            className={`absolute top-4 right-4 h-12 w-12 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all duration-300 ${inWishlist
                                ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-100"
                                : "bg-background/60 text-muted-foreground hover:bg-background hover:scale-110"
                                }`}
                        >
                            <Heart className="h-5 w-5" fill={inWishlist ? "currentColor" : "none"} />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="font-bold text-xs">{inWishlist ? t('product.remove_wishlist') : t('product.add_wishlist')}</TooltipContent>
                </Tooltip>
            </div>

            <CardHeader className="pb-2 pt-4 md:pt-6 px-4 md:px-6 flex-1 space-y-2">
                <div className="flex flex-col gap-1">
                    <CardTitle className="text-base md:text-lg font-bold tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {l(product, 'name')}
                    </CardTitle>
                    <span className="text-xl md:text-2xl font-black text-primary tracking-tighter">${product.price}</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-2.5 w-2.5 md:h-3 md:w-3 ${i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                        ))}
                    </div>
                    <span className="text-[9px] md:text-[10px] text-muted-foreground font-black uppercase tracking-widest">{product.rating} ({product.reviews})</span>
                </div>
            </CardHeader>

            <CardFooter className="pt-2 md:pt-4 pb-4 md:pb-6 px-4 md:px-6 gap-2">
                <Button 
                    variant="outline" 
                    className="flex-1 min-w-0 h-10 md:h-12 rounded-xl md:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest border-2 hover:bg-primary/5 px-2"
                    onClick={() => onProductSelect(product)}
                >
                    <span className="truncate">{t('product.details')}</span>
                </Button>
                {inCart ? (
                    <div className="flex items-center gap-1 border-2 border-primary/20 rounded-xl md:rounded-2xl px-1 h-10 md:h-12 bg-primary/5">
                        <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg"
                            onClick={() => onChangeQty(product.id, -1)}>
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm md:text-base font-black w-4 md:w-6 text-center text-primary">{inCart.qty}</span>
                        <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg"
                            onClick={() => onAddToCart(product.id)}>
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                ) : (
                    <Button
                        className="flex-1 min-w-0 h-10 md:h-12 rounded-xl md:rounded-2xl font-black text-[9px] sm:text-xs shadow-xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all px-2 sm:px-4"
                        onClick={() => onAddToCart(product.id)}
                        disabled={!product.inStock}
                    >
                        <Plus className="h-4 w-4 sm:mr-2 stroke-[3px] shrink-0" />
                        <span className="truncate hidden xs:inline">{t('product.add_to_cart')}</span>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
