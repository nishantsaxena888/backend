import * as React from "react";
import { ProductListPage } from "./pages/product-list/ProductListPage";
import { CreateProductPage } from "./pages/create-product/CreateProductPage";
import { EditProductPage } from "./pages/edit-product/EditProductPage";
import type { Product } from "./types";

export function ProductManagement() {
    const [view, setView] = React.useState<"list" | "create" | "edit">("list");
    const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setView("edit");
    };

    const handleBack = () => {
        setEditingProduct(null);
        setView("list");
    };

    return (
        <div className="w-full h-full text-foreground">
            {view === "list" && (
                <ProductListPage
                    onCreateNew={() => setView("create")}
                    onEdit={handleEdit}
                />
            )}

            {view === "create" && (
                <CreateProductPage
                    onSuccess={handleBack}
                    onCancel={handleBack}
                />
            )}

            {view === "edit" && editingProduct && (
                <EditProductPage
                    product={editingProduct}
                    onSuccess={handleBack}
                    onCancel={handleBack}
                />
            )}
        </div>
    );
}
