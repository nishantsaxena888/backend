import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import LiquorPOS from "@/features/liquor-pos/pages/LiquorPOS"

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider defaultTheme="liquor-orange">
          <TooltipProvider>
            <LiquorPOS />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
