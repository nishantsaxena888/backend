import { ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import { Button } from "./core/Button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";
import type { POSTheme } from "../types";
import { useLanguage } from "./language-provider";
import { useAuth } from "./auth-context";
import { CONFIGS, t } from "../mock/data";

interface HeaderProps {
    theme: POSTheme;
    onBack: () => void;
    onProfile?: () => void;
    onSettings?: () => void;
    cartCount: number;
    wishlistCount: number;
    CartContent: React.ComponentType<{ isMobile?: boolean }>;
    WishlistContent: React.ComponentType<{ isMobile?: boolean }>;
}

export function Header({ theme, onBack, onProfile, onSettings, cartCount, wishlistCount, CartContent, WishlistContent }: HeaderProps) {
    const config = CONFIGS[theme];
    const { currentLanguage } = useLanguage();
    const { logout } = useAuth();
    const translatedName = t(theme, currentLanguage.code);

    return (
        <header className="flex items-center justify-between px-2 sm:px-6 py-1.5 sm:py-4 border-b bg-card shadow-sm z-10 shrink-0 gap-1 sm:gap-2">
            <div className="flex items-center gap-1 sm:gap-4 min-w-0 flex-1">
                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl hover:bg-muted shrink-0" onClick={onBack}>
                    <ArrowLeft className="w-3.5 h-3.5 sm:w-5 h-5" />
                </Button>
                <div className="w-7 h-7 sm:w-12 sm:h-12 bg-primary rounded-md sm:rounded-xl flex items-center justify-center text-primary-foreground text-[10px] sm:text-2xl shadow-lg ring-1 sm:ring-4 ring-primary/10 shrink-0">
                    {config.logo}
                </div>
                <div className="min-w-0 flex flex-col justify-center ml-0.5 sm:ml-0 flex-1">
                    <h1 className="text-[10px] sm:text-xl font-black tracking-tighter leading-none truncate max-w-[80px] sm:max-w-none">{translatedName}</h1>
                    <p className="hidden md:block text-[8px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-0.5 sm:mt-1 truncate">{t('Terminal #01 · Active', currentLanguage.code, 'ui')}</p>
                </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-6 shrink-0">
                <div className="hidden sm:flex items-center gap-1 sm:gap-4">
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>

                <div className="flex items-center gap-1.5 sm:gap-3">
                    <Separator orientation="vertical" className="h-6 sm:h-8 hidden xs:block" />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-1.5 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-black">{t('Manager Access', currentLanguage.code, 'ui')}</p>
                                    <p className="text-[10px] uppercase font-black text-primary">{t('Admin', currentLanguage.code, 'ui')}</p>
                                </div>
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center font-black shadow-inner text-xs sm:text-sm shrink-0">AD</div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-60 p-2 rounded-[24px] shadow-2xl border-2 bg-popover/80 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
                            <DropdownMenuItem
                                className="flex items-center gap-4 px-4 py-2.5 rounded-2xl cursor-pointer hover:bg-primary/5 transition-colors"
                                onClick={onProfile}
                            >
                                <User className="w-5 h-5" />
                                <span className="font-bold text-sm tracking-tight">{t('My Profile', currentLanguage.code, 'ui')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="flex items-center gap-4 px-4 py-2.5 rounded-2xl cursor-pointer hover:bg-primary/5 transition-colors"
                                onClick={onSettings}
                            >
                                <Settings className="w-5 h-5" />
                                <span className="font-bold text-sm tracking-tight">{t('Settings', currentLanguage.code, 'ui')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-2 bg-muted/50" />
                            <DropdownMenuItem
                                className="flex items-center gap-4 px-4 py-2.5 rounded-2xl cursor-pointer hover:bg-destructive/10 transition-colors text-destructive"
                                onClick={logout}
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-bold text-sm tracking-tight">{t('Logout', currentLanguage.code, 'ui')}</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="relative rounded-xl border-2">
                                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-destructive text-destructive' : 'text-foreground'}`} />
                                {wishlistCount > 0 && (
                                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-[10px]" variant="destructive">
                                        {wishlistCount}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="p-0 w-full xs:w-[400px]">
                            <WishlistContent isMobile={true} />
                        </SheetContent>
                    </Sheet>

                    <div className="lg:hidden ml-1">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="relative rounded-xl border-2">
                                    <ShoppingCart className="w-5 h-5" />
                                    {cartCount > 0 && (
                                        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-[10px]" variant="default">
                                            {cartCount}
                                        </Badge>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="p-0 w-full xs:w-[400px]">
                                <CartContent isMobile={true} />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
