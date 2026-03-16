import type { ClientConfig } from "@/mock/types";
import { useLanguage } from "@/components/language-provider";

interface NavBarProps {
    config: ClientConfig;
    selectedCategory?: string;
    onCategoryChange?: (category: string) => void;
}

export function NavBar({ config, selectedCategory = 'All Products', onCategoryChange }: NavBarProps) {
    const { t, language } = useLanguage();

    // Get localized categories or fall back to English
    const clientCategories = language === 'en'
        ? config.categories
        : (config.translations?.[language]?.categories ?? config.categories);

    const categories = ['All Products', ...clientCategories];

    return (
        <nav className="bg-background border-b border-border relative sm:sticky sm:top-[113px] z-40 w-full max-w-full">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-2 overflow-x-auto py-3 w-full"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {categories.map((cat, idx) => (
                        <button
                            key={cat + idx}
                            onClick={() => onCategoryChange?.(cat === 'All Products' ? 'All Products' : config.categories[idx - 1])}
                            className={[
                                'flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium shrink-0',
                                (selectedCategory === cat || (cat === 'All Products' && selectedCategory === 'All Products') || (idx > 0 && selectedCategory === config.categories[idx - 1]))
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'bg-muted/50 text-foreground hover:bg-accent hover:text-accent-foreground',
                            ].join(' ')}
                        >
                            <span>{cat === 'All Products' ? t('product.all_products') : cat}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
