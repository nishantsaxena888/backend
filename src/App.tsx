import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/Header"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, ShoppingBag, Wine, Utensils } from "lucide-react"

export default function App() {
  return (
    <ThemeProvider defaultTheme="emerald-grocery">
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <div className="bg-red-500 text-white p-4 text-center font-bold">
          Tailwind Test: If this is red, Tailwind is working.
          <button
            onClick={() => alert("JS is working!")}
            className="ml-4 bg-white text-red-500 px-2 py-1 rounded"
          >
            Click Me for JS Test
          </button>
        </div>
        <Header />
        <Navbar />

        <main className="flex-1">
          <section className="py-12 md:py-24 lg:py-32 bg-muted/20">
            <div className="container space-y-12 px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                    Multi-Theme Engine
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    One Layout, Infinite Possibilities
                  </h1>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Watch the entire interface transform as you switch between our 8 curated themes.
                    Strictly built with shadcn/ui and Tailwind CSS.
                  </p>
                </div>
              </div>

              <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-4 lg:gap-12">
                <FeatureCard
                  icon={<ShoppingCart className="h-10 w-10 text-primary" />}
                  title="Grocery"
                  description="Optimized for fresh markets and daily supplies."
                />
                <FeatureCard
                  icon={<ShoppingBag className="h-10 w-10 text-primary" />}
                  title="Fashion"
                  description="Premium aesthetics for high-end boutique stores."
                />
                <FeatureCard
                  icon={<Wine className="h-10 w-10 text-primary" />}
                  title="Liquor"
                  description="Sophisticated dark modes for fine collections."
                />
                <FeatureCard
                  icon={<Utensils className="h-10 w-10 text-primary" />}
                  title="Restaurant"
                  description="Appetizing layouts for culinary excellence."
                />
              </div>
            </div>
          </section>

          <section className="py-12 md:py-24 border-t">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                    Universal Configurable Components
                  </h2>
                  <p className="text-muted-foreground">
                    Every element in this layout is connected to CSS variables. Changing the theme
                    recalculates everything from borders and shadows to primary accents and backgrounds.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="default">Primary Action</Button>
                    <Button variant="default">Get Started</Button>
                  </div>
                </div>
                <div className="bg-accent/50 rounded-xl p-8 border shadow-sm">
                  <div className="space-y-2">
                    <div className="h-4 w-[250px] bg-muted animate-pulse rounded" />
                    <div className="h-4 w-[200px] bg-muted animate-pulse rounded" />
                    <div className="h-4 w-[300px] bg-muted animate-pulse rounded" />
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="h-20 bg-primary/20 rounded-lg flex items-center justify-center font-bold text-primary">Primary Alpha</div>
                    <div className="h-20 bg-secondary rounded-lg flex items-center justify-center font-bold text-secondary-foreground">Secondary</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t py-6 bg-muted/50">
          <div className="container text-center text-sm text-muted-foreground">
            © 2026 Inventure Platform. Built with shadcn/ui.
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="flex flex-col items-center p-6 space-y-4 text-center transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="p-3 rounded-full bg-primary/10">
          {icon}
        </div>
      </CardHeader>
      <CardTitle className="text-xl font-bold">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  )
}
