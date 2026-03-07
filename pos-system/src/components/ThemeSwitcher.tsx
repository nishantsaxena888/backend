
import { usePOSTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import {
    Palette,
    ChevronDown
} from "lucide-react";
import type { POSTheme } from "../types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
    const { theme, setTheme } = usePOSTheme();

    const themes: { id: POSTheme; label: string }[] = [
        { id: 'emerald-grocery', label: '🥦 Emerald Grocery' },
        { id: 'fashion-black', label: '🖤 Fashion Black' },
        { id: 'fashion-gold-luxury', label: '✨ Fashion Gold Luxury' },
        { id: 'green-mvp', label: '🌿 Green MVP' },
        { id: 'grey-grocery', label: '🩶 Grey Grocery' },
        { id: 'liquor-black', label: '🥃 Liquor Black' },
        { id: 'liquor-orange', label: '🍊 Liquor Orange' },
        { id: 'restaurant-black', label: '🍽️ Restaurant Black' },
        { id: 'warehouse', label: '🏗️ Warehouse POS' },
        { id: 'restaurant', label: '🍽️ Restaurant POS' },
        { id: 'liquor', label: '🍾 Liquor POS' },
    ];

    const activeTheme = themes.find(t => t.id === theme) || themes[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-3 h-12 px-4 rounded-2xl border-2 bg-card/50 backdrop-blur-xl hover:bg-accent hover:border-primary transition-all group overflow-hidden">
                    <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:rotate-12 transition-transform" />
                    <span className="font-black text-xs sm:text-sm tracking-tight hidden md:inline">{activeTheme.label}</span>
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2 rounded-[24px] shadow-2xl border-2 bg-popover/80 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Select Theme</div>
                {themes.map((t) => (
                    <DropdownMenuItem
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${theme === t.id ? 'bg-primary text-primary-foreground font-black shadow-lg shadow-primary/20 scale-105' : 'hover:bg-primary/5 hover:translate-x-1'}`}
                    >
                        <span className="text-xl leading-none">{t.label.split(' ')[0]}</span>
                        <span className="font-bold text-sm tracking-tight">{t.label.split(' ').slice(1).join(' ')}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
