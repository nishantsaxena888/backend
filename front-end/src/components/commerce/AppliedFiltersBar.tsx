import { X, Tag, SlidersHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/components/language-provider';

interface AppliedFiltersBarProps {
    priceRange: [number, number];
    selectedCategory: string;
    productCount: number;
    onClearAll: () => void;
    onRemoveCategory: () => void;
    onRemovePrice: () => void;
}

export function AppliedFiltersBar({
    priceRange,
    selectedCategory,
    productCount,
    onClearAll,
    onRemoveCategory,
    onRemovePrice,
}: AppliedFiltersBarProps) {
    const { t } = useLanguage();
    const isDefaultPrice = priceRange[0] === 0 && (priceRange[1] === 50 || priceRange[1] === 200 || priceRange[1] === 5000 || priceRange[1] === 15000);
    const hasCategory = selectedCategory !== "All Products";
    const hasFilters = hasCategory || !isDefaultPrice;

    if (!hasFilters && productCount === 0) return null;

    return (
        <div className="bg-background/80 backdrop-blur-md relative sm:sticky sm:top-[136px] z-30 border-b border-border/50 transition-all duration-300 w-full max-w-full">
            <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
                <div className="flex flex-wrap items-center gap-3">

                    {/* Results Summary */}
                    <div className="flex items-center gap-2 pr-2 sm:pr-4 border-r border-border/50 mr-0.5 sm:mr-1">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Tag className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black uppercase tracking-tighter text-primary leading-none">
                                {productCount} {productCount === 1 ? t('product.single') : t('product.plural')}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-bold tracking-widest leading-none mt-0.5">{t('product.matched')}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 flex-1">
                        {hasCategory && (
                            <Badge variant="secondary" className="pl-3 pr-1 py-1.5 rounded-full border-primary/20 bg-primary/5 hover:bg-primary/10 group animate-in fade-in slide-in-from-left-2">
                                <span className="text-xs font-bold text-primary mr-2">{selectedCategory === 'All Products' ? t('product.all_products') : selectedCategory}</span>
                                <button onClick={onRemoveCategory} className="p-1 rounded-full hover:bg-destructive hover:text-destructive-foreground transition-all">
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        )}

                        {!isDefaultPrice && (
                            <Badge variant="secondary" className="pl-3 pr-1 py-1.5 rounded-full border-primary/20 bg-primary/5 hover:bg-primary/10 group animate-in fade-in slide-in-from-left-2">
                                <span className="text-xs font-bold text-primary mr-2">${priceRange[0]} - ${priceRange[1]}</span>
                                <button onClick={onRemovePrice} className="p-1 rounded-full hover:bg-destructive hover:text-destructive-foreground transition-all">
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        )}

                        {hasFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClearAll}
                                className="text-xs font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-full h-8 px-4"
                            >
                                {t('product.clear_filters')}
                            </Button>
                        )}
                    </div>

                    {/* Accessibility/Sort Placeholder */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Button variant="outline" size="sm" className="rounded-full gap-2 border-border/50 text-xs font-bold">
                            <SlidersHorizontal className="w-3 h-3" /> {t('product.sort_by')}: {t('product.newest')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
