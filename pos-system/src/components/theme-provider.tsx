import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { POSTheme } from "../types";

interface ThemeProviderState {
    theme: POSTheme;
    setTheme: (theme: POSTheme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function POSThemeProvider({
    children,
    defaultTheme = "warehouse",
}: {
    children: ReactNode;
    defaultTheme?: POSTheme;
}) {
    const [theme, setTheme] = useState<POSTheme>(() => {
        return (localStorage.getItem("pos-theme") as POSTheme) || defaultTheme;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("theme-warehouse", "theme-restaurant", "theme-liquor");
        root.classList.add(`theme-${theme}`);
        localStorage.setItem("pos-theme", theme);
    }, [theme]);

    return (
        <ThemeProviderContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const usePOSTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (!context) throw new Error("usePOSTheme must be used within a POSThemeProvider");
    return context;
};
