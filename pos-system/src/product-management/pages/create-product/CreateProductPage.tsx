import * as React from "react";
import { useProducts } from "../../hooks/useProducts";
import { ProductForm } from "../../components/ProductForm";
import type { Product } from "../../types";

interface CreateProductPageProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function CreateProductPage({ onSuccess, onCancel }: CreateProductPageProps) {
    const { addProduct, loading } = useProducts();

    const handleSubmit = async (data: Product) => {
        try {
            await addProduct(data);
            onSuccess();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProductForm
                onSubmit={handleSubmit}
                onCancel={onCancel}
                isLoading={loading}
            />
        </div>
    );
}
