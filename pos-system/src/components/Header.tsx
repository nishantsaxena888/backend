import { LayoutDashboard, ShoppingCart } from "lucide-react";
import { Button } from "./core/Button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import type { POSTheme } from "../types";
import { CONFIGS } from "../mock/data";

interface HeaderProps {
    theme: POSTheme;
    onBack: () => void;
    cartCount: number;
    CartContent: React.ComponentType<{ isMobile?: boolean }>;
}

export function Header({ theme, onBack, cartCount, CartContent }: HeaderProps) {
    const config = CONFIGS[theme];

    return (
        <header className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-4 border-b bg-card shadow-sm z-10 shrink-0 gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl hover:bg-muted shrink-0" onClick={onBack}>
                    <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground text-lg sm:text-2xl shadow-lg ring-4 ring-primary/10 shrink-0">
                    {config.logo}
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                    <h1 className="text-sm sm:text-xl font-black tracking-tight leading-none truncate">{config.name}</h1>
                    <p className="hidden xs:block text-[8px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-0.5 sm:mt-1 truncate">Terminal #01 · Active</p>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-6 shrink-0">
                <ThemeSwitcher />

                <div className="hidden lg:flex items-center gap-3">
                    <Separator orientation="vertical" className="h-8" />
                    <div className="text-right">
                        <p className="text-sm font-black">Manager Access</p>
                        <p className="text-[10px] uppercase font-black text-primary">Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center font-black">AD</div>
                </div>

                <div className="sm:hidden">
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
        </header>
    );
}
