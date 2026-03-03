import { Button } from "@/components/ui/button";

interface RestaurantCategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export function RestaurantCategoryFilter({
    categories,
    activeCategory,
    onCategoryChange
}: RestaurantCategoryFilterProps) {
    return (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(category => (
                <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={`rounded-xl font-bold px-6 py-2 ${activeCategory === category
                        ? "shadow-lg shadow-primary/20"
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
