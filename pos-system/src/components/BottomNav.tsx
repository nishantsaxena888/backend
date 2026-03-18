import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "./core/Button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

interface BottomNavProps {
    cartCount?: number;
    wishlistCount?: number;
    CartContent?: React.ComponentType<{ isMobile?: boolean }>;
    WishlistContent?: React.ComponentType<{ isMobile?: boolean }>;
    hideCart?: boolean;
    hideWishlist?: boolean;
}

export function BottomNav({ cartCount = 0, wishlistCount = 0, CartContent, WishlistContent, hideCart = false, hideWishlist = false }: BottomNavProps) {
    return (
        <nav className="sm:hidden fixed bottom-4 left-4 right-4 h-16 bg-card/80 backdrop-blur-2xl border-2 border-primary/20 rounded-[24px] shadow-2xl z-[60] flex items-center justify-around px-2 overflow-hidden">
            {/* Theme & Language Switchers - Simplified for Bottom Nav */}
            <ThemeSwitcher isSimple />
            <LanguageSwitcher isSimple />

            {/* Wishlist */}
            {!hideWishlist && WishlistContent && (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-2xl hover:bg-primary/5 transition-all">
                            <Heart className={`w-6 h-6 ${wishlistCount > 0 ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                            {wishlistCount > 0 && (
                                <Badge className="absolute top-2 right-2 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-[10px] font-black border-2 border-card" variant="destructive">
                                    {wishlistCount}
                                </Badge>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="p-0 rounded-t-[32px] h-[80vh] border-t-4 border-primary/20">
                        <WishlistContent isMobile={true} />
                    </SheetContent>
                </Sheet>
            )}

            {/* Cart */}
            {!hideCart && CartContent && (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-2xl hover:bg-primary/5 transition-all">
                            <ShoppingCart className="w-6 h-6 text-muted-foreground" />
                            {cartCount > 0 && (
                                <Badge className="absolute top-2 right-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-[10px] font-black border-2 border-card" variant="default">
                                    {cartCount}
                                </Badge>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="p-0 rounded-t-[32px] h-[80vh] border-t-4 border-primary/20">
                        <CartContent isMobile={true} />
                    </SheetContent>
                </Sheet>
            )}
        </nav>
    );
}
