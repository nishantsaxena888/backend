import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import RestaurantPOS from "@/features/restaurant-pos/pages/RestaurantPOS"

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="restaurant-black">
        <TooltipProvider>
          <RestaurantPOS />
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
