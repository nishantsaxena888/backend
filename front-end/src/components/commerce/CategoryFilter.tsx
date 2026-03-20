import { Filter } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import type { Product } from "@/mock/types";

interface CategoryFilterProps {
    allProducts: Product[];
    selectedCategory: string;
    onCategorySelect: (category: string) => void;
}

export function CategoryFilter({ allProducts, selectedCategory, onCategorySelect }: CategoryFilterProps) {
    const { t } = useLanguage();
    const sidebarCategories = [...new Set(allProducts.map(p => p.category))];

    return (
        <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <Filter className="w-3 h-3" /> {t('header.categories')}
            </h3>
            <div className="flex flex-col gap-1">
                <button
                    onClick={() => onCategorySelect("All Products")}
                    className={`text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${selectedCategory === "All Products" ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 translate-x-1" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                    {t('product.all_products')}
                </button>
                {sidebarCategories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => onCategorySelect(cat)}
                        className={`text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${selectedCategory === cat ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 translate-x-1" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
                    >
                        {t(cat)}
                    </button>
                ))}
            </div>
        </div>
    );
}
