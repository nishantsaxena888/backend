import { Link } from "react-router-dom";
import { CopyPlus, Store, Beer } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


export function DashboardPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col p-6 md:p-12 lg:p-24 space-y-8">
            <header className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight lg:tracking-tighter">Inventure POS Systems</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                    Select a Point of Sale module below to begin operations. Each module is tailored for specific workflows and inventory types.
                </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                <Link to="/restaurant" className="group">
                    <Card className="h-full border-border/50 hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer bg-card/50 backdrop-blur">
                        <CardHeader className="space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Store className="w-8 h-8" />
                            </div>
                            <CardTitle className="text-2xl font-black">Restaurant POS</CardTitle>
                            <CardDescription className="text-base">
                                Full-service dining operations. Manage tables, orders, food categories, and kitchen dispatch.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link to="/warehouse" className="group">
                    <Card className="h-full border-border/50 hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer bg-card/50 backdrop-blur">
                        <CardHeader className="space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <CopyPlus className="w-8 h-8" />
                            </div>
                            <CardTitle className="text-2xl font-black">Warehouse POS</CardTitle>
                            <CardDescription className="text-base">
                                Heavy inventory and bulk management. Track stock levels, add/remove stock, and handle shipments.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link to="/liquor" className="group">
                    <Card className="h-full border-border/50 hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer bg-card/50 backdrop-blur">
                        <CardHeader className="space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Beer className="w-8 h-8" />
                            </div>
                            <CardTitle className="text-2xl font-black">Liquor POS</CardTitle>
                            <CardDescription className="text-base">
                                Age-restricted sales operations. Manage bottles, categories, age verification, and quick checkout.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
