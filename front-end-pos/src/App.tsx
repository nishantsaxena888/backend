import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Routes, Route } from "react-router-dom"
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage"
import RestaurantPOS from "@/features/restaurant-pos/pages/RestaurantPOS"
import WarehousePOS from "@/features/warehouse-pos/pages/WarehousePOS"
import LiquorPOS from "@/features/liquor-pos/pages/LiquorPOS"

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="emerald-grocery">
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/restaurant" element={<RestaurantPOS />} />
            <Route path="/warehouse" element={<WarehousePOS />} />
            <Route path="/liquor" element={<LiquorPOS />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
