import { Card, CardContent } from "@/components/ui/card";
import { RestaurantProduct } from "../types";

interface RestaurantProductCardProps {
    product: RestaurantProduct;
    onClick: (product: RestaurantProduct) => void;
}

export function RestaurantProductCard({ product, onClick }: RestaurantProductCardProps) {
    return (
        <Card
            className="group rounded-3xl border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer bg-background overflow-hidden"
            onClick={() => onClick(product)}
        >
            <CardContent className="p-0">
                <div className="aspect-square relative flex items-center justify-center text-6xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                    {product.image}
                </div>
                <div className="p-4 space-y-1">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{product.category}</p>
                    <h3 className="font-black truncate">{product.name}</h3>
                    <p className="text-lg font-black text-primary">${product.price.toFixed(2)}</p>
                </div>
            </CardContent>
        </Card>
    );
}
