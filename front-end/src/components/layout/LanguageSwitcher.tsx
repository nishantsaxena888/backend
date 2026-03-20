import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, useLanguage } from "@/components/language-provider";

export function LanguageSwitcher() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={`flex items-center gap-2 h-10 px-3 rounded-xl hover:bg-primary/5 transition-all text-muted-foreground hover:text-foreground group`}
                >
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-xs uppercase tracking-widest">{language.code}</span>
                    </div>
                    <ChevronDown className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-52 p-2 rounded-2xl shadow-2xl border-border/50 bg-background/80 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 z-[110]"
            >
                <div className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                    {t('Select Language') || 'Select Language'}
                </div>
                <div className="space-y-1">
                    {LANGUAGES.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => setLanguage(lang)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                                language.code === lang.code
                                ? 'bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20'
                                : 'hover:bg-primary/10 hover:text-primary'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold tracking-tight">{lang.name}</span>
                            </div>
                            {language.code === lang.code && (
                                <Check className="w-4 h-4" />
                            )}
                        </DropdownMenuItem>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
