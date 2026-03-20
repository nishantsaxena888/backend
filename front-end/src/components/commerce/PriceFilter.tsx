import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/components/language-provider";
import type { ClientConfig } from "@/mock/types";

interface PriceFilterProps {
    config: ClientConfig;
    priceRange: [number, number];
    onPriceRangeChange: (range: number[]) => void;
}

export function PriceFilter({ config, priceRange, onPriceRangeChange }: PriceFilterProps) {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-1">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">{t('product.price')}</h3>
                <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">USD</span>
            </div>
            <div className="px-2">
                <Slider
                    value={priceRange}
                    onValueChange={onPriceRangeChange}
                    max={config.id.includes('luxury') ? 15000 : config.type === 'liquor' ? 200 : 50}
                    step={1}
                    className="py-4"
                />
                <div className="flex justify-between mt-2 text-[10px] font-black text-muted-foreground tracking-widest">
                    <span>{t('product.min')} ${priceRange[0]}</span>
                    <span>{t('product.max')} ${priceRange[1]}</span>
                </div>
            </div>
        </div>
    );
}
