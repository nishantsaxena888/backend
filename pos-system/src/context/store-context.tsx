import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { MOCK_PRODUCTS } from '../mock/data';
import type { Product, POSTheme, CartItem } from '../types';

export interface Transaction {
    id: string;
    timestamp: number;
    total: number;
    items: {
        id: string;
        name: string;
        quantity: number;
        price: number;
    }[];
    theme: POSTheme;
}

interface POSStoreState {
    inventory: Record<string, Product[]>;
    transactions: Transaction[];
    cart: CartItem[];
    wishlist: string[];
    updateProduct: (theme: string, productId: string, updates: Partial<Product>) => void;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
    addToCart: (product: Product, quantity?: number) => void;
    updateCartQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    toggleWishlist: (productId: string) => void;
}

const POSStoreContext = createContext<POSStoreState | undefined>(undefined);

export function POSStoreProvider({ children }: { children: ReactNode }) {
    const [inventory, setInventory] = useState<Record<string, Product[]>>(() => {
        const saved = localStorage.getItem('pos-inventory');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Migrate any legacy 'Whisk(e)y' category to 'Whiskey'
                if (parsed.liquor && Array.isArray(parsed.liquor)) {
                    parsed.liquor = parsed.liquor.map((p: Product) =>
                        p.category === 'Whisk(e)y' ? { ...p, category: 'Whiskey' } : p
                    );
                }
                return parsed;
            } catch (e) {
                return MOCK_PRODUCTS;
            }
        }
        return MOCK_PRODUCTS;
    });

    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const saved = localStorage.getItem('pos-transactions');
        return saved ? JSON.parse(saved) : [];
    });

    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('pos-cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [wishlist, setWishlist] = useState<string[]>(() => {
        const saved = localStorage.getItem('pos-wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    // Sync state to localStorage
    useEffect(() => {
        localStorage.setItem('pos-inventory', JSON.stringify(inventory));
    }, [inventory]);

    useEffect(() => {
        localStorage.setItem('pos-transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('pos-cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('pos-wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const updateProduct = (theme: string, productId: string, updates: Partial<Product>) => {
        setInventory(prev => ({
            ...prev,
            [theme]: prev[theme].map(p =>
                p.id === productId ? { ...p, ...updates } : p
            )
        }));
    };

    const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: `TRX-${Date.now()}`,
            timestamp: Date.now(),
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const addToCart = (product: Product, quantity: number = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id)
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
            }
            return [...prev, { ...product, quantity }]
        })
    }

    const updateCartQuantity = (id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + delta)
                return { ...item, quantity: newQty }
            }
            return item
        }).filter(item => item.quantity > 0))
    }

    const clearCart = () => setCart([])

    const toggleWishlist = (productId: string) => {
        setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId])
    }

    return (
        <POSStoreContext.Provider value={{
            inventory,
            transactions,
            cart,
            wishlist,
            updateProduct,
            addTransaction,
            addToCart,
            updateCartQuantity,
            clearCart,
            toggleWishlist
        }}>
            {children}
        </POSStoreContext.Provider>
    );
}

export const usePOSStore = () => {
    const context = useContext(POSStoreContext);
    if (!context) throw new Error('usePOSStore must be used within a POSStoreProvider');
    return context;
};
