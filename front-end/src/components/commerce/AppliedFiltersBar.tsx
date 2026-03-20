import { X, Tag, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/components/language-provider';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppliedFiltersBarProps {
    priceRange: [number, number];
    selectedCategory: string;
    productCount: number;
    onClearAll: () => void;
    onRemoveCategory: () => void;
    onRemovePrice: () => void;
    sortBy: 'newest' | 'price-low' | 'price-high' | 'rating';
    onSortChange: (sort: 'newest' | 'price-low' | 'price-high' | 'rating') => void;
}

export function AppliedFiltersBar({
    priceRange,
    selectedCategory,
    productCount,
    onClearAll,
    onRemoveCategory,
    onRemovePrice,
    sortBy,
    onSortChange,
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

                    {/* Sort Dropdown */}
                    <div className="hidden lg:flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="rounded-full gap-2 border-border/50 text-xs font-black px-6 h-10 hover:bg-muted transition-all active:scale-95 shadow-sm">
                                    <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-muted-foreground font-bold">{t('product.sort_by')}:</span>
                                    <span className="text-foreground font-black uppercase tracking-tight">
                                        {sortBy === 'newest' ? t('product.newest') :
                                            sortBy === 'price-low' ? t('product.price_low') :
                                                sortBy === 'price-high' ? t('product.price_high') :
                                                    t('product.rating')}
                                    </span>
                                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/50 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-3xl p-2 shadow-2xl border-border/50 bg-background/95 backdrop-blur-xl animate-in zoom-in-95 duration-200">
                                {[
                                    { value: 'newest', label: t('product.newest') },
                                    { value: 'price-low', label: t('product.price_low') },
                                    { value: 'price-high', label: t('product.price_high') },
                                    { value: 'rating', label: t('product.rating') }
                                ].map((option) => (
                                    <DropdownMenuItem
                                        key={option.value}
                                        onClick={() => onSortChange(option.value as any)}
                                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-all cursor-pointer mb-1 last:mb-0 ${sortBy === option.value ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                                    >
                                        {option.label}
                                        {sortBy === option.value && <Check className="w-4 h-4" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
}
