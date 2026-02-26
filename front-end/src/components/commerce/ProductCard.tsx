import { Heart, Plus, Minus, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ProductDetail } from "@/components/commerce/ProductDetail";
import type { Product, ClientConfig } from "@/mock/types";

interface ProductCardProps {
    product: Product;
    config: ClientConfig;
    inCart?: { id: string; qty: number };
    inWishlist: boolean;
    onAddToCart: (id: string) => void;
    onChangeQty: (id: string, delta: number) => void;
    onToggleWishlist: (id: string) => void;
}

export function ProductCard({
    product,
    config,
    inCart,
    inWishlist,
    onAddToCart,
    onChangeQty,
    onToggleWishlist
}: ProductCardProps) {
    return (
        <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-none bg-muted/20 hover:bg-background rounded-[40px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-500">
            <div className="relative h-64 overflow-hidden bg-muted/40 flex items-center justify-center m-4 mb-0 rounded-[32px]">
                {product.image.startsWith('http') ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <span className="text-8xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 drop-shadow-xl select-none">
                        {product.image}
                    </span>
                )}

                {product.badge && (
                    <Badge className="absolute top-4 left-4 h-7 text-[10px] font-black uppercase tracking-widest px-4 border-none shadow-lg">
                        {product.badge}
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
                    <TooltipContent side="left" className="font-bold text-xs">{inWishlist ? "Remove from wishlist" : "Add to Favorites"}</TooltipContent>
                </Tooltip>
            </div>

            <CardHeader className="pb-2 pt-6 px-8 flex-1 space-y-1">
                <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl font-bold tracking-tight leading-none group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                    </CardTitle>
                    <span className="text-2xl font-black text-primary tracking-tighter">${product.price}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                        ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{product.rating} ({product.reviews} reviews)</span>
                </div>
            </CardHeader>

            <CardFooter className="pt-4 pb-8 px-8 gap-3">
                <ProductDetail
                    product={product}
                    config={config}
                    onAddToCart={onAddToCart}
                    trigger={
                        <Button variant="outline" className="flex-1 h-14 rounded-2xl font-black text-xs uppercase tracking-widest border-2 hover:bg-primary/5">
                            Details
                        </Button>
                    }
                />
                {inCart ? (
                    <div className="flex items-center gap-2 border-2 border-primary/20 rounded-2xl px-2 h-14 bg-primary/5">
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-primary hover:bg-primary hover:text-primary-foreground rounded-xl"
                            onClick={() => onChangeQty(product.id, -1)}>
                            <Minus className="h-4 h-4" />
                        </Button>
                        <span className="text-lg font-black w-8 text-center text-primary">{inCart.qty}</span>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-primary hover:bg-primary hover:text-primary-foreground rounded-xl"
                            onClick={() => onAddToCart(product.id)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <Button
                        className="flex-1 h-14 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all"
                        onClick={() => onAddToCart(product.id)}
                        disabled={!product.inStock}
                    >
                        <Plus className="h-5 w-5 mr-2 stroke-[3px]" /> Add to Cart
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
