import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import RestaurantPOS from "@/features/restaurant-pos/pages/RestaurantPOS"

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider defaultTheme="restaurant-light">
          <TooltipProvider>
            <RestaurantPOS />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
