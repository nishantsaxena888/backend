import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { usePOSStore } from '@/context/store-context';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/mock/data';

interface CartSidebarProps {
    onCheckout: () => void;
    subtotal: number;
    tax: number;
    total: number;
}

export function CartSidebar({ onCheckout, subtotal, tax, total }: CartSidebarProps) {
    const { cart, updateCartQuantity, removeFromCart, clearCart } = usePOSStore();
    const { currentLanguage } = useLanguage();

    return (
        <div className="w-[380px] h-full bg-card/50 backdrop-blur-3xl border-l-2 flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-6 border-b-2 flex items-center justify-between bg-card/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="font-black tracking-tighter text-lg">{t('Current Order', currentLanguage.code, 'ui')}</h2>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            {cart.length} {t('Items Selected', currentLanguage.code, 'ui')}
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={clearCart}>
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                    {cart.map((item) => (
                        <div key={item.id} className="p-3 rounded-2xl bg-card border-2 hover:border-primary/30 transition-all group relative">
                            <div className="flex gap-3">
                                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
                                    {item.image}
                                </div>
                                <div className="flex-1 min-w-0 pr-6">
                                    <h4 className="font-black text-xs line-clamp-1">{t(item.name, currentLanguage.code, 'products')}</h4>
                                    <p className="text-[10px] font-bold text-muted-foreground">${item.price} / {t('unit', currentLanguage.code, 'ui')}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5">
                                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateCartQuantity(item.id, -1)}>
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-5 text-center text-[10px] font-black">{item.quantity}</span>
                                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateCartQuantity(item.id, 1)}>
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <span className="font-black text-xs text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="absolute top-2 right-2 h-7 w-7 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
                                onClick={() => removeFromCart(item.id)}
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    ))}


                    {cart.length === 0 && (
                        <div className="h-64 flex flex-col items-center justify-center text-muted-foreground/30 space-y-4">
                            <ShoppingCart className="w-12 h-12" />
                            <p className="font-black text-xs uppercase tracking-widest">{t('Cart is empty', currentLanguage.code, 'ui')}</p>
                        </div>
                    )}
                </div>
            </ScrollArea>

            <div className="p-6 bg-card/80 border-t-2 space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <span>{t('Subtotal', currentLanguage.code, 'ui')}</span>
                        <span className="text-foreground font-black">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <span>{t('Tax (8%)', currentLanguage.code, 'ui')}</span>
                        <span className="text-foreground font-black">${tax.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t-2 flex justify-between items-center">
                        <span className="font-black text-lg tracking-tighter uppercase">{t('Total', currentLanguage.code, 'ui')}</span>
                        <span className="text-2xl font-black tracking-tighter text-primary">${total.toFixed(2)}</span>
                    </div>
                </div>

                <Button 
                    className="w-full h-14 rounded-2xl font-black text-md shadow-2xl shadow-primary/20 gap-3 group" 
                    disabled={cart.length === 0}
                    onClick={onCheckout}
                >
                    {t('Proceed to Checkout', currentLanguage.code, 'ui')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </div>
    );
}
