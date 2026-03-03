import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    activeColorClass?: string;
}

export function CategoryFilter({
    categories,
    activeCategory,
    onCategoryChange,
    activeColorClass = "bg-purple-600 hover:bg-purple-700 shadow-purple-500/20"
}: CategoryFilterProps) {
    return (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(category => (
                <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={`rounded-xl font-bold px-6 py-2 ${activeCategory === category
                            ? "text-white shadow-lg border-none " + activeColorClass
                            : "border-border/50 text-muted-foreground"
                        }`}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </Button>
            ))}
        </div>
    );
}
