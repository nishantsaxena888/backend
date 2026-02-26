interface NavBarProps {
    selectedCategory?: string;
    onCategoryChange?: (category: string) => void;
}

const CATEGORIES = [
    { name: 'All Products', icon: '🛒' },
    { name: 'Fresh Produce', icon: '🥬' },
    { name: 'Dairy & Eggs', icon: '🥛' },
    { name: 'Meat & Seafood', icon: '🥩' },
    { name: 'Bakery', icon: '🍞' },
    { name: 'Beverages', icon: '🥤' },
    { name: 'Pantry', icon: '🥫' },
    { name: 'Frozen Foods', icon: '❄️' },
    { name: 'Snacks', icon: '🍿' },
    { name: 'Household', icon: '🧹' },
];

export function NavBar({ selectedCategory = 'All Products', onCategoryChange }: NavBarProps) {
    function isActive(cat: typeof CATEGORIES[number]) {
        if (cat.name === selectedCategory) return true;
        if (cat.name.toLowerCase().includes('produce') &&
            selectedCategory.toLowerCase().includes('produce')) return true;
        if (cat.name.toLowerCase().includes('dairy') &&
            selectedCategory.toLowerCase().includes('dairy')) return true;
        return false;
    }

    return (
        <nav className="bg-background border-b border-border sticky top-[113px] z-40">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-2 overflow-x-auto py-3"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.name}
                            onClick={() => onCategoryChange?.(cat.name)}
                            className={[
                                'flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium shrink-0',
                                isActive(cat)
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'bg-muted/50 text-foreground hover:bg-accent hover:text-accent-foreground',
                            ].join(' ')}
                        >
                            <span className="text-base leading-none">{cat.icon}</span>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
