import type { ClientConfig } from "@/mock/types";

interface NavBarProps {
    config: ClientConfig;
    selectedCategory?: string;
    onCategoryChange?: (category: string) => void;
}

export function NavBar(_props: NavBarProps) {



    return (
        <nav className="bg-background border-b border-border relative sm:sticky sm:top-[113px] z-40 w-full max-w-full">
            <div className="max-w-7xl mx-auto px-4">
                {/* <div className="flex items-center gap-2 overflow-x-auto py-3 w-full"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {categories.map((cat, idx) => (
                        <button
                            key={cat + idx}
                            onClick={() => onCategoryChange?.(cat)}
                            className={[
                                'flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium shrink-0',
                                selectedCategory === cat
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'bg-muted/50 text-foreground hover:bg-accent hover:text-accent-foreground',
                            ].join(' ')}
                        >
                            <span>{t(cat) || cat}</span>
                        </button>
                    ))}
                </div> */}
            </div>
        </nav>
    );
}
