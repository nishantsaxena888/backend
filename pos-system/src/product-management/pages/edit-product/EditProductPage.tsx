import { useProducts } from "../../hooks/useProducts";
import { ProductForm } from "../../components/ProductForm";
import type { Product } from "../../types";

interface EditProductPageProps {
    product: Product;
    onSuccess: () => void;
    onCancel: () => void;
}

export function EditProductPage({ product, onSuccess, onCancel }: EditProductPageProps) {
    const { updateProduct, loading } = useProducts();

    const handleSubmit = async (data: Product) => {
        try {
            await updateProduct(product.id!, data);
            onSuccess();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProductForm
                initialData={product}
                onSubmit={handleSubmit}
                onCancel={onCancel}
                isLoading={loading}
            />
        </div>
    );
}
