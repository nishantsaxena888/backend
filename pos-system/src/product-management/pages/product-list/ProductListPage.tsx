import { Plus, Package } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { ProductTable } from "../../components/ProductTable";
import { Button } from "@/components/ui/button";
import type { Product } from "../../types";

interface ProductListPageProps {
    onCreateNew: () => void;
    onEdit: (product: Product) => void;
}

export function ProductListPage({ onCreateNew, onEdit }: ProductListPageProps) {
    const { products, loading, deleteProduct, deleteProductsBulk } = useProducts();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-lg ring-4 ring-primary/5">
                        <Package className="w-6 h-6" />
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-2xl font-black tracking-tight">Products</h1>
                        <p className="text-sm text-muted-foreground">Manage your store inventory and product details.</p>
                    </div>
                </div>
                <Button onClick={onCreateNew} className="rounded-xl shadow-xl shadow-primary/20 h-11 px-6">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Product
                </Button>
            </div>

            <div className="relative">
                {loading && (
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-3xl">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            <span className="text-xs font-bold text-primary italic uppercase tracking-widest">Loading...</span>
                        </div>
                    </div>
                )}
                <ProductTable
                    products={products}
                    onEdit={onEdit}
                    onDelete={deleteProduct}
                    onDeleteBulk={deleteProductsBulk}
                />
            </div>
        </div>
    );
}
