import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Printer, CreditCard, Banknote, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { t } from "@/mock/data";
import { useLanguage } from "@/components/language-provider";

interface CheckoutDialogProps {
    isOpen: boolean;
    onClose: () => void;
    total: number;
    onComplete: () => void;
}

export function CheckoutDialog({ isOpen, onClose, total, onComplete }: CheckoutDialogProps) {
    const { currentLanguage } = useLanguage();
    const subtotal = total / 1.08;
    const tax = total - subtotal;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden rounded-[24px] border-none shadow-2xl bg-card">
                <div className="bg-primary px-6 py-10 text-primary-foreground text-center relative">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tighter">{t('Ready for Payment', currentLanguage.code, 'ui')}</DialogTitle>
                    <DialogDescription className="text-primary-foreground/70 font-bold uppercase tracking-widest text-[10px] mt-1">
                        {t('Transaction Summary', currentLanguage.code, 'ui')}
                    </DialogDescription>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{t('Select Payment Method', currentLanguage.code, 'ui')}</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-20 flex flex-col gap-2 rounded-2xl border-2 hover:border-primary hover:bg-primary/5 transition-all group active:scale-95">
                                <CreditCard className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="font-black text-[10px] uppercase tracking-wider">{t('Credit Card', currentLanguage.code, 'ui')}</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col gap-2 rounded-2xl border-2 hover:border-primary hover:bg-primary/5 transition-all group active:scale-95">
                                <Banknote className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="font-black text-[10px] uppercase tracking-wider">{t('Cash', currentLanguage.code, 'ui')}</span>
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3 bg-muted/30 p-4 rounded-2xl border border-border/50">
                        <div className="flex justify-between text-xs font-bold">
                            <span className="text-muted-foreground">{t('Subtotal', currentLanguage.code, 'ui')}</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                            <span className="text-muted-foreground">{t('Tax (8%)', currentLanguage.code, 'ui')}</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <Separator className="bg-border/50" />
                        <div className="flex justify-between items-center pt-1">
                            <span className="text-sm font-black uppercase tracking-wider">{t('Grand Total', currentLanguage.code, 'ui')}</span>
                            <span className="text-2xl font-black text-primary tracking-tighter">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 pt-0 flex flex-col gap-3">
                    <Button className="w-full h-14 rounded-xl text-md font-black shadow-xl shadow-primary/20 active:scale-95 transition-all" onClick={onComplete}>
                        {t('Finalize Transaction', currentLanguage.code, 'ui')}
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="secondary" className="flex-1 font-bold h-10 rounded-lg text-xs">
                            <Printer className="w-3.5 h-3.5 mr-2" /> {t('Print', currentLanguage.code, 'ui')}
                        </Button>
                        <Button variant="secondary" className="flex-1 font-bold h-10 rounded-lg text-xs">
                            <Mail className="w-3.5 h-3.5 mr-2" /> {t('Email', currentLanguage.code, 'ui')}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
