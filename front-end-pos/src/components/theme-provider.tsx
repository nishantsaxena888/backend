import { createContext, useContext, useEffect, useState } from "react"

export type Theme =
    | "emerald-grocery"
    | "fashion-black"
    | "fashion-gold-luxury"
    | "green-mvp"
    | "grey-grocery"
    | "liqour-black"
    | "liquor-orange"
    | "restaurant-black"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "emerald-grocery",
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = "emerald-grocery",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        try {
            return (localStorage.getItem(storageKey) as Theme) || defaultTheme
        } catch (e) {
            return defaultTheme
        }
    })

    useEffect(() => {
        const root = window.document.documentElement

        // Remove all theme classes
        root.classList.remove(
            "theme-emerald-grocery",
            "theme-fashion-black",
            "theme-fashion-gold-luxury",
            "theme-green-mvp",
            "theme-grey-grocery",
            "theme-liqour-black",
            "theme-liquor-orange",
            "theme-restaurant-black"
        )

        root.classList.add(`theme-${theme}`)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            try {
                localStorage.setItem(storageKey, theme)
            } catch (e) { }
            setTheme(theme)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}
