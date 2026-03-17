import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { usePOSTheme } from './theme-provider';
import { useLanguage } from './language-provider';
import { usePOSStore } from '@/context/store-context';
import { CONFIGS, t } from '@/mock/data';
import { ShoppingCart, Heart, Plus, Minus, Trash2, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from './core/Button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function MainLayout() {
    const { theme } = usePOSTheme();
    const { currentLanguage } = useLanguage();
    const { cart, wishlist, inventory, updateCartQuantity, clearCart, addToCart, toggleWishlist } = usePOSStore();
    const navigate = useNavigate();
    const products = inventory[theme] || [];

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const CartContent = ({ isMobile = false }) => (
        <div className={`flex flex-col h-full ${isMobile ? '' : 'w-[400px] border-l shadow-2xl bg-card'}`}>
            <div className="p-4 sm:p-6 border-b flex items-center justify-between">
                <h2 className="text-lg font-black flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> {t('Current Order', currentLanguage.code, 'ui')}
                </h2>
                <Badge variant="secondary" className="font-black h-6">{cart.length} {t('Items', currentLanguage.code, 'ui')}</Badge>
            </div>

            <ScrollArea className="flex-1 p-4 sm:p-6">
                <div className="space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="flex gap-3 sm:gap-4 items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg flex items-center justify-center text-lg sm:text-xl">
                                {item.image}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-black line-clamp-1 leading-none">{item.name}</p>
                                <p className="text-[10px] sm:text-xs text-muted-foreground font-bold">${item.price} {t('each', currentLanguage.code, 'ui')}</p>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 bg-muted/50 rounded-lg p-1">
                                <Button size="icon" variant="ghost" className="h-6 w-6 sm:h-7 sm:w-7" onClick={() => updateCartQuantity(item.id, -1)}>
                                    <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-3 text-center text-[10px] sm:text-xs font-black">{item.quantity}</span>
                                <Button size="icon" variant="ghost" className="h-6 w-6 sm:h-7 sm:w-7" onClick={() => updateCartQuantity(item.id, 1)}>
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>
                            <p className="text-xs sm:text-sm font-black w-14 sm:w-16 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                    {cart.length === 0 && (
                        <div className="h-64 flex flex-col items-center justify-center text-center space-y-2 opacity-30">
                            <ShoppingCart className="w-12 h-12" />
                            <p className="text-xs sm:text-sm font-bold">{t('New order ready for transaction', currentLanguage.code, 'ui')}</p>
                        </div>
                    )}
                </div>
            </ScrollArea>

            <footer className="p-4 sm:p-6 bg-muted/30 border-t space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm font-bold">
                        <span className="text-muted-foreground">{t('Subtotal', currentLanguage.code, 'ui')}</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm font-bold">
                        <span className="text-muted-foreground">{t('Tax (8%)', currentLanguage.code, 'ui')}</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                        <span className="text-lg sm:text-xl font-black">{t('Total', currentLanguage.code, 'ui')}</span>
                        <span className="text-xl sm:text-2xl font-black tracking-tighter text-primary">${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <Button variant="outline" className="h-12 sm:h-14 font-black rounded-xl border-2" onClick={clearCart} disabled={cart.length === 0}>
                        <Trash2 className="w-4 h-4 mr-2" /> {t('Void', currentLanguage.code, 'ui')}
                    </Button>
                    <Button
                        className="h-12 sm:h-14 font-black rounded-xl text-md sm:text-lg shadow-xl shadow-primary/20"
                        onClick={() => {/* This will be handled by POSDashboard or a global checkout */ }}
                        disabled={cart.length === 0}
                    >
                        {t('Pay', currentLanguage.code, 'ui')} <ChevronRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 h-5" />
                    </Button>
                </div>
            </footer>
        </div>
    );

    const WishlistContent = ({ isMobile = false }) => {
        const wishlistItems = products.filter(p => wishlist.includes(p.id));
        return (
            <div className={`flex flex-col h-full ${isMobile ? '' : 'w-[400px] border-l shadow-2xl bg-card'}`}>
                <div className="p-4 sm:p-6 border-b flex items-center justify-between">
                    <h2 className="text-lg font-black flex items-center gap-2">
                        <Heart className="w-5 h-5 text-destructive fill-destructive" /> {t('Saved Items', currentLanguage.code, 'ui')}
                    </h2>
                    <Badge variant="secondary" className="font-black h-6">{wishlistItems.length} {t('Items', currentLanguage.code, 'ui')}</Badge>
                </div>

                <ScrollArea className="flex-1 p-4 sm:p-6">
                    <div className="space-y-4">
                        {wishlistItems.map(item => (
                            <div key={item.id} className="flex gap-3 sm:gap-4 items-center">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg flex items-center justify-center text-lg sm:text-xl">
                                    {item.image}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm font-black line-clamp-1 leading-none">{item.name}</p>
                                    <p className="text-[10px] sm:text-xs text-muted-foreground font-bold">${item.price}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="secondary" className="h-8 px-3 rounded-lg font-black text-[10px] uppercase tracking-widest" onClick={() => addToCart(item)}>
                                        <Plus className="w-3 h-3 mr-1" /> {t('Add', currentLanguage.code, 'ui')}
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => toggleWishlist(item.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {wishlistItems.length === 0 && (
                            <div className="h-64 flex flex-col items-center justify-center text-center space-y-2 opacity-30">
                                <Heart className="w-12 h-12" />
                                <p className="text-xs sm:text-sm font-bold">{t('Your wishlist is empty', currentLanguage.code, 'ui')}</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-screen bg-background text-foreground transition-all duration-500 overflow-hidden">
            <Header
                theme={theme}
                onBack={() => navigate('/')}
                onProfile={() => navigate('/my-profile')}
                onSettings={() => navigate('/settings')}
                cartCount={cart.length}
                wishlistCount={wishlist.length}
                CartContent={CartContent}
                WishlistContent={WishlistContent}
            />
            <main className="flex-1 flex flex-col overflow-hidden">
                <Outlet context={{ total, subtotal, tax }} />
            </main>
        </div>
    );
}
