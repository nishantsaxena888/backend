import { Label } from "@/components/ui/label";
import { CurrencyInput } from "@/components/ui/currency-input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { t } from "@/mock/data";
import { useLanguage } from "@/components/language-provider";

interface PriceSectionProps {
    regularPrice: number;
    salePrice?: number | null;
    taxClass: string;
    currency: string;
    onChange: (updates: any) => void;
}

export function PriceSection({
    regularPrice,
    salePrice,
    taxClass,
    currency,
    onChange
}: PriceSectionProps) {
    const { currentLanguage } = useLanguage();
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="regular-price" className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Regular Price', currentLanguage.code, 'ui')} ({currency})</Label>
                    <CurrencyInput
                        id="regular-price"
                        value={regularPrice}
                        onChange={(e) => onChange({ regularPrice: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        className="h-12 text-lg font-black rounded-xl border-2"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="sale-price" className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Sale Price', currentLanguage.code, 'ui')} ({currency})</Label>
                    <CurrencyInput
                        id="sale-price"
                        value={salePrice?.toString() || ""}
                        onChange={(e) => onChange({ salePrice: e.target.value ? parseFloat(e.target.value) : null })}
                        placeholder="0.00"
                        className="h-12 text-lg font-black rounded-xl border-2 text-primary"
                    />
                    <p className="text-[10px] text-muted-foreground italic">{t('Leave empty to disable sale', currentLanguage.code, 'ui')}</p>
                </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="tax-class" className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Tax Class', currentLanguage.code, 'ui')}</Label>
                    <Select
                        value={taxClass}
                        onValueChange={(val: string) => onChange({ taxClass: val })}
                    >
                        <SelectTrigger id="tax-class" className="rounded-xl border-2">
                            <SelectValue placeholder={t('Select tax class', currentLanguage.code, 'ui')} />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-2">
                            <SelectItem value="standard" className="rounded-lg">{t('Standard Tax (15%)', currentLanguage.code, 'ui')}</SelectItem>
                            <SelectItem value="reduced" className="rounded-lg">{t('Reduced Rate (5%)', currentLanguage.code, 'ui')}</SelectItem>
                            <SelectItem value="zero" className="rounded-lg">{t('Zero Rate (0%)', currentLanguage.code, 'ui')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="currency" className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Display Currency', currentLanguage.code, 'ui')}</Label>
                    <Select
                        value={currency}
                        onValueChange={(val: string) => onChange({ currency: val })}
                    >
                        <SelectTrigger id="currency" className="rounded-xl border-2">
                            <SelectValue placeholder={t('Select currency', currentLanguage.code, 'ui')} />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-2">
                            <SelectItem value="USD" className="rounded-lg">{t('USD ($)', currentLanguage.code, 'ui')}</SelectItem>
                            <SelectItem value="EUR" className="rounded-lg">{t('EUR (€)', currentLanguage.code, 'ui')}</SelectItem>
                            <SelectItem value="GBP" className="rounded-lg">{t('GBP (£)', currentLanguage.code, 'ui')}</SelectItem>
                            <SelectItem value="INR" className="rounded-lg">{t('INR (₹)', currentLanguage.code, 'ui')}</SelectItem>
                            <SelectItem value="AED" className="rounded-lg">{t('AED (د.إ)', currentLanguage.code, 'ui')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
