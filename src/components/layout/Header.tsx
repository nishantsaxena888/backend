import { useTheme, type Theme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Palette } from "lucide-react"

export function ThemeSwitcher() {
    const { setTheme } = useTheme()

    const themes: { name: string; value: Theme }[] = [
        { name: "Emerald Grocery", value: "emerald-grocery" },
        { name: "Fashion Black", value: "fashion-black" },
        { name: "Fashion Gold Luxury", value: "fashion-gold-luxury" },
        { name: "Green MVP", value: "green-mvp" },
        { name: "Grey Grocery", value: "grey-grocery" },
        { name: "Liquor Black", value: "liqour-black" },
        { name: "Liquor Orange", value: "liquor-orange" },
        { name: "Restaurant Black", value: "restaurant-black" },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Palette className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {themes.map((t) => (
                    <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value)}>
                        {t.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold italic">I</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">Inventure</span>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                    <Button variant="default">Get Started</Button>
                </div>
            </div>
        </header>
    )
}
