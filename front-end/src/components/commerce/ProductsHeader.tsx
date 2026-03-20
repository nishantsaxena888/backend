import { Package } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLanguage } from "@/components/language-provider";
import type { ClientConfig } from "@/mock/types";

interface ProductsHeaderProps {
    searchQuery: string;
    selectedCategory: string;
    productCount: number;
    config: ClientConfig;
    viewMode: 'grid' | 'list';
    onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function ProductsHeader({ searchQuery, selectedCategory, productCount, config, viewMode, onViewModeChange }: ProductsHeaderProps) {
    const { t, l } = useLanguage();

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tighter leading-none break-words">
                    {searchQuery ? searchQuery : (selectedCategory === "All Products" ? t('product.all_products') : t(selectedCategory) || selectedCategory)}
                </h2>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-3 flex items-center gap-2">
                    <Package className="w-3 h-3" /> {productCount} {t('product.curated_for')} {l(config, 'name')}
                </p>
            </div>
            <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(v) => v && onViewModeChange(v as 'grid' | 'list')}
                className="bg-muted/50 p-1 rounded-xl border border-border/50 shrink-0 self-start md:self-auto"
            >
                <ToggleGroupItem value="grid" className="rounded-lg h-10 px-4 font-bold text-[10px] uppercase data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">{t('product.view_grid')}</ToggleGroupItem>
                <ToggleGroupItem value="list" className="rounded-lg h-10 px-4 font-bold text-[10px] uppercase data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">{t('product.view_list')}</ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
}
