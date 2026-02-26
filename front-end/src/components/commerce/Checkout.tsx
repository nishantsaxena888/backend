import { useState } from 'react';
import { X, CreditCard, Truck, CheckCircle, ArrowLeft, Zap, Shield, RotateCcw } from 'lucide-react';
import type { CartItem, ClientConfig } from '@/mock/types';
import { AddressManager, type Address } from './AddressManager';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/components/language-provider';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CheckoutProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    config: ClientConfig;
    onClearCart: () => void;
}

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'success';

export function Checkout({ isOpen, onClose, items, config, onClearCart }: CheckoutProps) {
    const { t } = useLanguage();
    const [step, setStep] = useState<CheckoutStep>('shipping');
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= config.freeDeliveryThreshold ? 0 : 15;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handlePlaceOrder = () => {
        setStep('success');
        setTimeout(() => {
            onClearCart();
            onClose();
            // Reset for next time
            setTimeout(() => setStep('shipping'), 500);
        }, 4000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden sm:rounded-3xl border-none shadow-2xl bg-background">
                <div className="flex flex-col h-[90vh] md:h-auto max-h-[90vh]">

                    {/* Header */}
                    <div className="bg-primary p-6 text-primary-foreground relative">
                        <div className="flex items-center gap-4">
                            {step !== 'shipping' && step !== 'success' && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setStep(step === 'payment' ? 'shipping' : 'payment')}
                                    className="text-primary-foreground hover:bg-white/20 rounded-full"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            )}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                                    {config.logoIcon}
                                </div>
                                <div>
                                    <DialogTitle className="text-2xl font-bold tracking-tight">{t('checkout.title')}</DialogTitle>
                                    <DialogDescription className="text-primary-foreground/70 text-xs font-medium uppercase tracking-widest">
                                        {step === 'success' ? t('checkout.confirmed') : `${config.name} • ${t(`checkout.step_${step}`)}`}
                                    </DialogDescription>
                                </div>
                            </div>
                        </div>
                        {step !== 'success' && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="absolute top-6 right-6 text-primary-foreground hover:bg-white/20 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        )}
                    </div>

                    {/* Stepper */}
                    {step !== 'success' && (
                        <div className="px-8 py-4 border-b flex items-center justify-center gap-4 bg-muted/30">
                            <Badge variant={step === 'shipping' ? 'default' : 'secondary'} className="rounded-full px-4 py-1">1. {t('checkout.shipping')}</Badge>
                            <div className="w-8 h-[1px] bg-muted-foreground/30" />
                            <Badge variant={step === 'payment' ? 'default' : 'secondary'} className="rounded-full px-4 py-1">2. {t('checkout.payment')}</Badge>
                            <div className="w-8 h-[1px] bg-muted-foreground/30" />
                            <Badge variant={step === 'review' ? 'default' : 'secondary'} className="rounded-full px-4 py-1">3. {t('checkout.review')}</Badge>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto p-8">
                        <div className="max-w-2xl mx-auto space-y-8">

                            {/* Step 1: Shipping */}
                            {step === 'shipping' && (
                                <div className="space-y-6">
                                    <AddressManager
                                        mode="select"
                                        selectedAddressId={selectedAddress?.id}
                                        onSelectAddress={setSelectedAddress}
                                    />
                                    <Button
                                        disabled={!selectedAddress}
                                        onClick={() => setStep('payment')}
                                        className="w-full h-14 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20"
                                    >
                                        {t('checkout.continue_to_payment')}
                                    </Button>
                                </div>
                            )}

                            {/* Step 2: Payment */}
                            {step === 'payment' && (
                                <div className="space-y-6">
                                    <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 space-y-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <CreditCard className="w-5 h-5 text-primary" />
                                            <h3 className="font-bold">{t('checkout.card_info')}</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t('checkout.card_number')}</Label>
                                                <Input
                                                    value={paymentInfo.cardNumber}
                                                    onChange={e => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                                                    placeholder="0000 0000 0000 0000"
                                                    className="bg-background rounded-xl h-12"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t('checkout.expiry')}</Label>
                                                    <Input
                                                        value={paymentInfo.expiryDate}
                                                        onChange={e => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                                                        placeholder="MM/YY"
                                                        className="bg-background rounded-xl h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t('checkout.cvv')}</Label>
                                                    <Input
                                                        value={paymentInfo.cvv}
                                                        onChange={e => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                                                        placeholder="123"
                                                        className="bg-background rounded-xl h-12"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => setStep('review')}
                                        className="w-full h-14 text-lg font-bold rounded-2xl"
                                    >
                                        {t('checkout.review_order')}
                                    </Button>
                                </div>
                            )}

                            {/* Step 3: Review */}
                            {step === 'review' && (
                                <div className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="p-5 rounded-3xl bg-muted/50 border space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-primary tracking-widest">{t('checkout.shipping_to')}</Label>
                                            <p className="font-bold">{selectedAddress?.fullName}</p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{selectedAddress?.address}, {selectedAddress?.city}</p>
                                        </div>
                                        <div className="p-5 rounded-3xl bg-muted/50 border space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-primary tracking-widest">{t('checkout.payment')}</Label>
                                            <p className="font-bold">{t('checkout.card_ending')} {paymentInfo.cardNumber.slice(-4)}</p>
                                            <p className="text-xs text-muted-foreground">{t('checkout.expires')} {paymentInfo.expiryDate}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-bold flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-primary" />
                                            {t('checkout.order_summary')}
                                        </h3>
                                        <div className="space-y-3">
                                            {items.map(item => (
                                                <div key={item.id} className="flex items-center gap-4 group">
                                                    <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                                                        {item.image.startsWith('http') ? (
                                                            <img src={item.image} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-2xl">{item.image}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-sm truncate">{item.name}</p>
                                                        <p className="text-xs text-muted-foreground">{t('checkout.qty')}: {item.quantity}</p>
                                                    </div>
                                                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-2 pt-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                                            <span className="font-medium">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{t('cart.shipping')}</span>
                                            <span className="font-medium text-primary">{shipping === 0 ? t('checkout.free') : `$${shipping.toFixed(2)}`}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{t('cart.tax')}</span>
                                            <span className="font-medium">${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-xl font-black pt-4 border-t border-dashed">
                                            <span>{t('cart.total')}</span>
                                            <span className="text-primary">${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handlePlaceOrder}
                                        className="w-full h-16 text-xl font-black rounded-2xl shadow-2xl shadow-primary/30 animate-pulse-subtle"
                                    >
                                        {t('checkout.place_order')} • ${total.toFixed(2)}
                                    </Button>
                                </div>
                            )}

                            {/* Step 4: Success */}
                            {step === 'success' && (
                                <div className="text-center py-12 space-y-6">
                                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 scale-up-center">
                                        <CheckCircle className="w-16 h-16 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-4xl font-black tracking-tighter">{t('checkout.success_title')}</h2>
                                        <p className="text-muted-foreground">{t('checkout.success_msg')}</p>
                                    </div>
                                    <div className="p-8 bg-primary/5 rounded-[40px] border border-primary/10 max-w-sm mx-auto">
                                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{t('checkout.order_amount')}</p>
                                        <p className="text-5xl font-black tracking-tighter">${total.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-center gap-6 pt-4 grayscale opacity-40">
                                        <Truck className="w-6 h-6" />
                                        <RotateCcw className="w-6 h-6" />
                                        <Shield className="w-6 h-6" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
