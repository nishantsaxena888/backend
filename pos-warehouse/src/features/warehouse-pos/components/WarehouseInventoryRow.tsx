import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Plus, Minus, AlertCircle } from "lucide-react";
import { WarehouseProduct } from "../types";

interface WarehouseInventoryRowProps {
    product: WarehouseProduct;
    onUpdateStock: (sku: string, delta: number) => void;
}

export function WarehouseInventoryRow({ product, onUpdateStock }: WarehouseInventoryRowProps) {
    const isLowStock = product.stock <= product.lowStockThreshold;

    return (
        <TableRow className="group hover:bg-muted/30 transition-colors">
            <TableCell className="font-mono text-xs">{product.sku}</TableCell>
            <TableCell className="font-bold">{product.name}</TableCell>
            <TableCell>
                <Badge variant="outline" className="rounded-md bg-background">
                    {product.category}
                </Badge>
            </TableCell>
            <TableCell className="text-right text-muted-foreground text-sm">
                {product.unit}
            </TableCell>
            <TableCell className="text-right font-black text-lg">
                {product.stock}
            </TableCell>
            <TableCell className="text-center">
                {isLowStock ? (
                    <Badge variant="destructive" className="rounded-md gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Low Stock
                    </Badge>
                ) : (
                    <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 rounded-md border-none">
                        In Stock
                    </Badge>
                )}
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 rounded-lg border-border/50 hover:bg-muted hover:text-destructive"
                        onClick={() => onUpdateStock(product.sku, -1)}
                    >
                        <Minus className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 rounded-lg border-border/50 hover:bg-muted text-primary"
                        onClick={() => onUpdateStock(product.sku, 1)}
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}
