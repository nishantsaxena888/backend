import { useState, useEffect } from "react"
import { ThemeProvider, useTheme } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { getClientConfig, getProducts } from "@/mock/api"
import type { ClientConfig, Product } from "@/mock/types"
import { TooltipProvider } from "@/components/ui/tooltip"
import { POSContent } from "@/components/POSContent"
import { Skeleton } from "@/components/ui/skeleton"
import { Zap } from "lucide-react"

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="emerald-grocery">
        <TooltipProvider>
          <POSApp />
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

function POSApp() {
  const { theme } = useTheme();
  const [config, setConfig] = useState<ClientConfig | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function init() {
      setIsLoading(true)
      try {
        const [c, p] = await Promise.all([
          getClientConfig(theme),
          getProducts(theme)
        ])
        setConfig(c)
        setProducts(p)
      } catch (err) {
        console.error("Failed to fetch POS data", err)
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [theme])

  if (isLoading || !config) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 space-y-4">
        <Zap className="h-12 w-12 text-primary animate-pulse" />
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    )
  }

  return <POSContent config={config} products={products} />
}
