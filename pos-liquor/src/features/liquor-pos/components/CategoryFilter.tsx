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
        <div className="flex flex-col gap-2 w-full">
            {categories.map(category => (
                <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl font-bold px-4 py-6 text-base ${activeCategory === category
                        ? "text-white shadow-md border-none " + activeColorClass
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </Button>
            ))}
        </div>
    );
}
