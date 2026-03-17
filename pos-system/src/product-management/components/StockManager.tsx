import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { t } from "@/mock/data";
import { useLanguage } from "@/components/language-provider";

interface StockManagerProps {
    sku: string;
    stockQuantity: number;
    manageStock: boolean;
    stockStatus: "instock" | "outofstock" | "onbackorder";
    lowStockThreshold: number;
    onChange: (updates: any) => void;
}

export function StockManager({
    sku,
    stockQuantity,
    manageStock,
    stockStatus,
    lowStockThreshold,
    onChange
}: StockManagerProps) {
    const { currentLanguage } = useLanguage();
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="sku" className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('SKU', currentLanguage.code, 'ui')}</Label>
                    <Input
                        id="sku"
                        value={sku}
                        onChange={(e) => onChange({ sku: e.target.value })}
                        className="rounded-xl border-2 focus-visible:ring-primary/20"
                        placeholder={t('e.g. PROD-001', currentLanguage.code, 'ui')}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stock-status" className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Stock Status', currentLanguage.code, 'ui')}</Label>
                    <Select
                        value={stockStatus}
                        onValueChange={(val: "instock" | "outofstock" | "onbackorder") => onChange({ stockStatus: val })}
                    >
                        <SelectTrigger id="stock-status" className="rounded-xl border-2">
                            <SelectValue placeholder={t('Select status', currentLanguage.code, 'ui')} />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-2">
                            <SelectItem value="instock" className="rounded-lg">{t('In Stock', currentLanguage.code, 'ui')}</SelectItem>
                            <SelectItem value="outofstock" className="rounded-lg">{t('Out of Stock', currentLanguage.code, 'ui')}</SelectItem>
                            <SelectItem value="onbackorder" className="rounded-lg">{t('On Backorder', currentLanguage.code, 'ui')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border-2 border-dashed">
                <div className="space-y-0.5">
                    <Label htmlFor="manage-stock" className="text-sm font-bold">{t('Manage Stock', currentLanguage.code, 'ui')}</Label>
                    <p className="text-xs text-muted-foreground">{t('Enable inventory management for this product', currentLanguage.code, 'ui')}</p>
                </div>
                <Switch
                    id="manage-stock"
                    checked={manageStock}
                    onCheckedChange={(checked: boolean) => onChange({ manageStock: checked })}
                />
            </div>

            {manageStock && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                        <Label htmlFor="quantity" className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Stock Quantity', currentLanguage.code, 'ui')}</Label>
                        <Input
                            id="quantity"
                            type="number"
                            value={stockQuantity}
                            onChange={(e) => onChange({ stockQuantity: parseInt(e.target.value) || 0 })}
                            className="rounded-xl border-2 focus-visible:ring-primary/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="threshold" className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Low Stock Threshold', currentLanguage.code, 'ui')}</Label>
                        <Input
                            id="threshold"
                            type="number"
                            value={lowStockThreshold}
                            onChange={(e) => onChange({ lowStockThreshold: parseInt(e.target.value) || 0 })}
                            className="rounded-xl border-2 focus-visible:ring-primary/20"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
