import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import LiquorPOS from "@/features/liquor-pos/pages/LiquorPOS"

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="liqour-black">
        <TooltipProvider>
          <LiquorPOS />
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
