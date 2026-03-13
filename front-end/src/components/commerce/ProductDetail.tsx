import { useState } from 'react';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Package, Clock, ImageOff } from 'lucide-react';
import type { Product, ClientConfig } from '@/mock/types';
import {
    Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/components/language-provider';

interface ProductDetailProps {
    product: Product;
    config: ClientConfig;
    onAddToCart: (id: string) => void;
    trigger?: React.ReactNode;
}

export function ProductDetail({ product, config, onAddToCart, trigger }: ProductDetailProps) {
    const { t } = useLanguage();
    const [imageError, setImageError] = useState(false);

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                    />
                ))}
                <span className="text-xs font-medium text-muted-foreground ml-1">{rating}</span>
            </div>
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline" size="sm">{t('product.details')}</Button>}
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden sm:rounded-3xl border-none shadow-2xl">
                <div className="grid md:grid-cols-2">
                    {/* Left: Image Section */}
                    <div className="relative bg-muted/20 flex items-center justify-center p-12 min-h-[400px]">
                        {!product.image || imageError ? (
                            <div className="flex flex-col items-center justify-center text-muted-foreground/20 gap-4">
                                <ImageOff className="w-32 h-32" />
                                <span className="text-sm font-black uppercase tracking-widest leading-none">No Image</span>
                            </div>
                        ) : product.image.startsWith('http') ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                onError={() => setImageError(true)}
                                className="w-full h-full object-cover rounded-2xl shadow-xl"
                            />
                        ) : (
                            <span className="text-[120px] drop-shadow-2xl">{product.image}</span>
                        )}
                        <div className="absolute top-6 left-6">
                            {product.badge && (
                                <Badge className="px-4 py-1 text-xs uppercase font-bold tracking-wider">
                                    {product.badge}
                                </Badge>
                            )}
                        </div>

                        {/* Branding Watermark */}
                        <div className="absolute bottom-6 right-6 flex items-center gap-2 opacity-20 select-none">
                            <span className="text-2xl">{config.logoIcon}</span>
                            <span className="font-bold tracking-tight">{config.name}</span>
                        </div>
                    </div>

                    {/* Right: Info Section */}
                    <div className="p-8 md:p-12 flex flex-col gap-6 bg-background">
                        <div className="space-y-2">
                            <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-widest px-2">
                                {product.category}
                            </Badge>
                            <DialogTitle className="text-3xl font-bold tracking-tight text-foreground leading-tight">
                                {product.name}
                            </DialogTitle>
                            {renderStars(product.rating)}
                        </div>

                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-bold text-primary">${product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xl text-muted-foreground line-through decoration-destructive/30 decoration-2">
                                    ${product.originalPrice}
                                </span>
                            )}
                        </div>

                        <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                            {product.description}
                        </DialogDescription>

                        <div className="grid grid-cols-2 gap-4 py-4 border-y">
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <Truck className="w-5 h-5 text-primary" />
                                <span>{t('product.fast_delivery')}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <RotateCcw className="w-5 h-5 text-primary" />
                                <span>{t('product.easy_returns')}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <Shield className="w-5 h-5 text-primary" />
                                <span>{t('product.certified_quality')}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <Package className="w-5 h-5 text-primary" />
                                <span>{product.inStock ? t('product.in_stock') : t('product.out_of_stock')}</span>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                onClick={() => onAddToCart(product.id)}
                                className="flex-1 h-14 text-lg font-bold rounded-2xl shadow-lg shadow-primary/25"
                                disabled={!product.inStock}
                            >
                                <ShoppingCart className="w-5 h-5 mr-3" />
                                {t('product.add_to_cart')}
                            </Button>
                            <Button variant="outline" className="h-14 w-14 rounded-2xl group">
                                <Heart className="w-6 h-6 group-hover:text-destructive group-hover:fill-destructive transition-colors" />
                            </Button>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-muted-foreground pt-2">
                            <Clock className="w-3 h-3" />
                            {t('product.ends_in')}: 04:22:15
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
