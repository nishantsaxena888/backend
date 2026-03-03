import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import WarehousePOS from "@/features/warehouse-pos/pages/WarehousePOS"

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider defaultTheme="warehouse-blue">
          <TooltipProvider>
            <WarehousePOS />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
