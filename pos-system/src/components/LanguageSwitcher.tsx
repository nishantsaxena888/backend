import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, t } from "../mock/data";
import { useLanguage } from "./language-provider";

export function LanguageSwitcher() {
    const { currentLanguage, setLanguage } = useLanguage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="flex gap-2 h-10 px-3 rounded-xl border-2 bg-card/50 backdrop-blur-xl hover:bg-accent hover:border-primary transition-all group overflow-hidden"
                >
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm uppercase tracking-wider">{currentLanguage.code}</span>
                    </div>
                    <ChevronDown className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-52 p-2 rounded-[24px] shadow-2xl border-2 bg-popover/80 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200"
            >
                <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    {t('Select Language', currentLanguage.code, 'ui')}
                </div>
                {LANGUAGES.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang)}
                        className={`flex items-center justify-between px-4 py-2.5 rounded-2xl cursor-pointer ${currentLanguage.code === lang.code
                            ? 'bg-primary text-primary-foreground font-bold'
                            : 'hover:bg-primary/5 transition-colors'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-xl leading-none">{lang.flag}</span>
                            <span className="text-sm font-medium">{lang.name}</span>
                        </div>
                        {currentLanguage.code === lang.code && (
                            <Check className="w-4 h-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
