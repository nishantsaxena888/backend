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
import { t } from "@/mock/data";
import { useLanguage } from "@/components/language-provider";

export function ThemeSwitcher({ isSimple }: { isSimple?: boolean }) {
    const { theme, setTheme } = usePOSTheme();
    const { currentLanguage } = useLanguage();

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
                <Button variant="outline" className={`flex items-center ${isSimple ? 'h-12 w-12 border-none bg-transparent hover:bg-primary/5' : 'gap-1.5 sm:gap-3 h-8 sm:h-10 px-2 sm:px-4 border-2 bg-card/50 backdrop-blur-xl hover:bg-accent hover:border-primary shrink-0'} rounded-xl transition-all group overflow-hidden`}>
                    <Palette className={`${isSimple ? 'w-6 h-6' : 'w-4 h-4'} text-primary group-hover:rotate-12 transition-transform shrink-0`} />
                    {!isSimple && (
                        <>
                            <div className="hidden md:flex items-center gap-2 font-bold text-xs sm:text-sm tracking-tight">
                                <span className="text-base leading-none shrink-0">{activeTheme.label.split(' ')[0]}</span>
                                <span className="truncate">{activeTheme.label.split(' ').slice(1).join(' ')}</span>
                            </div>
                            <ChevronDown className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity shrink-0 hidden sm:block" />
                        </>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2 rounded-[24px] shadow-2xl border-2 bg-popover/80 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t('Select Theme', currentLanguage.code, 'ui')}</div>
                {themes.map((themeItem) => (
                    <DropdownMenuItem
                        key={themeItem.id}
                        onClick={() => setTheme(themeItem.id)}
                        className={`flex items-center gap-4 px-4 py-2.5 rounded-2xl cursor-pointer ${theme === themeItem.id ? 'bg-primary text-primary-foreground font-black shadow-lg shadow-primary/20 scale-105 transition-all' : 'hover:bg-primary/5 transition-colors'}`}
                    >
                        <span className="text-xl leading-none">{themeItem.label.split(' ')[0]}</span>
                        <span className="font-bold text-sm tracking-tight">{t(themeItem.label.split(' ').slice(1).join(' '), currentLanguage.code, 'ui')}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
