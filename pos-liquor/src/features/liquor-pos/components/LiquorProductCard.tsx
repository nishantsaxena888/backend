import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LiquorProduct } from "../types";

interface LiquorProductCardProps {
    product: LiquorProduct;
    onClick: (product: LiquorProduct) => void;
}

export function LiquorProductCard({ product, onClick }: LiquorProductCardProps) {
    return (
        <Card
            className="group rounded-3xl border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer bg-background overflow-hidden relative"
            onClick={() => onClick(product)}
        >
            <CardContent className="p-0">
                <div className="aspect-square relative flex items-center justify-center text-6xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                    {product.image}
                    <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur font-mono text-xs shadow-sm">
                            {product.abv}% ABV
                        </Badge>
                    </div>
                </div>
                <div className="p-4 space-y-1">
                    <div className="flex justify-between items-start">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{product.brand}</p>
                        <span className="text-xs text-muted-foreground">{product.size}</span>
                    </div>
                    <h3 className="font-black truncate">{product.name}</h3>
                    <p className="text-lg font-black text-primary">${product.price.toFixed(2)}</p>
                </div>
            </CardContent>
        </Card>
    );
}
