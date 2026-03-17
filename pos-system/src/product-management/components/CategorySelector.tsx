import * as React from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { t } from "@/mock/data";
import { useLanguage } from "@/components/language-provider";

const INITIAL_CATEGORIES = ["Electronics", "Audio", "Wearables", "Clothing", "Menswear", "Accessories", "Bags", "Computers"];

interface CategorySelectorProps {
    selectedCategories: string[];
    onChange: (categories: string[]) => void;
}

export function CategorySelector({ selectedCategories, onChange }: CategorySelectorProps) {
    const { currentLanguage } = useLanguage();
    const [categories, setCategories] = React.useState(INITIAL_CATEGORIES);
    const [newCategory, setNewCategory] = React.useState("");
    const [isAdding, setIsAdding] = React.useState(false);

    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            onChange(selectedCategories.filter(c => c !== category));
        } else {
            onChange([...selectedCategories, category]);
        }
    };

    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            onChange([...selectedCategories, newCategory]);
            setNewCategory("");
            setIsAdding(false);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
                {selectedCategories.map(cat => (
                    <Badge
                        key={cat}
                        variant="secondary"
                        className="pl-2 pr-1 py-1 rounded-lg bg-primary/10 text-primary border-none flex items-center gap-1 group"
                    >
                        {t(cat, currentLanguage.code, 'categories')}
                        <button
                            onClick={() => toggleCategory(cat)}
                            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                        >
                            <Plus className="w-3 h-3 rotate-45" />
                        </button>
                    </Badge>
                ))}
                {selectedCategories.length === 0 && (
                    <span className="text-sm text-muted-foreground italic">{t('No categories selected', currentLanguage.code, 'ui')}</span>
                )}
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-xl border-dashed">
                        <Plus className="w-4 h-4 mr-2" />
                        {t('Add Category', currentLanguage.code, 'ui')}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 p-2 rounded-2xl shadow-xl border-2">
                    {categories.map(cat => (
                        <DropdownMenuItem
                            key={cat}
                            onClick={(e) => {
                                e.preventDefault();
                                toggleCategory(cat);
                            }}
                            className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer"
                        >
                            {t(cat, currentLanguage.code, 'categories')}
                            {selectedCategories.includes(cat) && <Check className="w-4 h-4 text-primary" />}
                        </DropdownMenuItem>
                    ))}
                    <div className="p-2 pt-1 mt-1 border-t">
                        {isAdding ? (
                            <div className="flex gap-1">
                                <Input
                                    size={1}
                                    autoFocus
                                    placeholder="New category..."
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                                    className="h-8 text-xs rounded-lg"
                                />
                                <Button size="icon" className="h-8 w-8 rounded-lg shrink-0" onClick={handleAddCategory}>
                                    <Check className="w-3 h-3" />
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start h-8 px-2 text-xs text-primary font-bold rounded-lg"
                                onClick={() => setIsAdding(true)}
                            >
                                <Plus className="w-3 h-3 mr-2" />
                                {t('Create New', currentLanguage.code, 'ui')}
                            </Button>
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
