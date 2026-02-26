import { ProductCard } from "./ProductCard";
import type { Product, ClientConfig } from "@/mock/types";

interface ProductGridProps {
    products: Product[];
    config: ClientConfig;
    cartItems: { id: string; qty: number }[];
    wishlist: string[];
    onAddToCart: (id: string) => void;
    onChangeQty: (id: string, delta: number) => void;
    onToggleWishlist: (id: string) => void;
}

export function ProductGrid({
    products,
    config,
    cartItems,
    wishlist,
    onAddToCart,
    onChangeQty,
    onToggleWishlist
}: ProductGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
            {products.map(product => {
                const inCart = cartItems.find(i => i.id === product.id);
                const inWishlist = wishlist.includes(product.id);
                return (
                    <ProductCard
                        key={product.id}
                        product={product}
                        config={config}
                        inCart={inCart}
                        inWishlist={inWishlist}
                        onAddToCart={onAddToCart}
                        onChangeQty={onChangeQty}
                        onToggleWishlist={onToggleWishlist}
                    />
                );
            })}
        </div>
    );
}
