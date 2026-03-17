import { useState } from 'react'
import type { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, Minus, Heart, ShoppingCart } from 'lucide-react'
import { t } from '@/mock/data'
import { useLanguage } from '@/components/language-provider'

interface ProductDetailsProps {
    product: Product;
    onBack: () => void;
    onAddToCart: (product: Product, quantity: number) => void;
    cartQuantity: number;
    isWishlisted: boolean;
    onToggleWishlist: (e: React.MouseEvent, productId: string) => void;
}

export function ProductDetails({
    product,
    onBack,
    onAddToCart,
    cartQuantity,
    isWishlisted,
    onToggleWishlist,
}: ProductDetailsProps) {
    const { currentLanguage } = useLanguage()
    const [qty, setQty] = useState(1)

    return (
        <div className="flex flex-col h-full bg-background animate-in slide-in-from-right-8 duration-500 overflow-hidden">
            <div className="flex items-center gap-4 mb-4 sm:mb-6 shrink-0">
                <Button variant="outline" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl border-2" onClick={onBack}>
                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
                <h2 className="text-xl sm:text-2xl font-black">{t('Product Details', currentLanguage.code, 'ui')}</h2>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-start h-full">
                    {/* Image Section */}
                    <div className="bg-card w-full aspect-square md:aspect-[4/5] lg:aspect-square flex items-center justify-center text-8xl sm:text-9xl relative overflow-hidden group border-2 rounded-[32px] sm:rounded-[48px] shadow-sm">
                        {product.image}

                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-background/80 backdrop-blur-md shadow-xl hover:scale-110 transition-all border-2"
                                onClick={(e) => onToggleWishlist(e, product.id)}
                            >
                                <Heart className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${isWishlisted ? 'fill-destructive text-destructive' : 'text-foreground'}`} />
                            </Button>
                        </div>

                        {cartQuantity > 0 && (
                            <Badge className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-primary text-primary-foreground font-black shadow-xl h-8 sm:h-10 px-4 flex items-center justify-center text-sm sm:text-base border-2 rounded-xl pointer-events-none">
                                {cartQuantity} {t('in Cart', currentLanguage.code, 'ui')}
                            </Badge>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col justify-center h-full py-2">
                        <div className="flex-1 flex flex-col justify-center gap-6 sm:gap-8">
                            <div className="space-y-3 sm:space-y-4">
                                <Badge variant="secondary" className="font-black text-xs sm:text-sm uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 leading-none rounded-lg border-2">
                                    {t(product.category, currentLanguage.code, 'categories')}
                                </Badge>
                                <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black leading-tight tracking-tighter line-clamp-2">
                                    {t(product.name, currentLanguage.code, 'products')}
                                </h1>
                                <p className="text-sm sm:text-base text-muted-foreground font-bold tracking-widest uppercase">
                                    SKU: {product.sku}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed">
                                    {t('Experience the premium quality of our', currentLanguage.code, 'ui')} {t(product.name, currentLanguage.code, 'products')}{t('product_desc_suffix', currentLanguage.code, 'ui')}
                                </p>
                            </div>

                            <div className="text-5xl sm:text-6xl font-black text-primary tracking-tighter">
                                ${product.price}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-12 shrink-0">
                            <div className="flex items-center justify-between bg-card rounded-2xl p-2 sm:p-3 border-2 w-full sm:w-auto shrink-0 shadow-sm">
                                <Button size="icon" variant="ghost" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl" onClick={() => setQty(Math.max(1, qty - 1))}>
                                    <Minus className="h-5 w-5 sm:h-6 sm:w-6" />
                                </Button>
                                <span className="w-12 sm:w-16 text-center text-xl sm:text-2xl font-black">{qty}</span>
                                <Button size="icon" variant="ghost" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl" onClick={() => setQty(qty + 1)}>
                                    <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                                </Button>
                            </div>

                            <Button
                                size="lg"
                                className="h-14 sm:h-20 w-full rounded-2xl text-lg sm:text-xl font-black shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-3"
                                onClick={() => {
                                    onAddToCart(product, qty)
                                    setQty(1)
                                }}
                            >
                                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                                {t('Add to Cart', currentLanguage.code, 'ui')} - ${(product.price * qty).toFixed(2)}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
