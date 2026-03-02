import { useState, useMemo } from 'react';
import { LiquorCartItem, LiquorProduct } from '../types';

export function useLiquorCart() {
    const [cartItems, setCartItems] = useState<LiquorCartItem[]>([]);

    const addToCart = (product: LiquorProduct) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCartItems(prev =>
            prev.map(item => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                }
                return item;
            })
        );
    };

    const clearCart = () => setCartItems([]);

    const subtotal = useMemo(() =>
        cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
        [cartItems]);

    // Adjusted tax to include liquor percentage explicitly or use standard
    const tax = useMemo(() => subtotal * 0.12, [subtotal]); // 12% liquor tax rate example
    const total = useMemo(() => subtotal + tax, [subtotal, tax]);

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        total
    };
}
