import { useState } from 'react';
import { WarehouseProduct } from '../types';
import { MOCK_WAREHOUSE_PRODUCTS } from '../mock/data';

export function useWarehouseInventory() {
    const [inventory, setInventory] = useState<WarehouseProduct[]>(MOCK_WAREHOUSE_PRODUCTS);

    const updateStock = (sku: string, amount: number) => {
        setInventory(prev => prev.map(item => {
            if (item.sku === sku) {
                // Ensure stock doesn't go below 0
                const newStock = Math.max(0, item.stock + amount);
                return { ...item, stock: newStock };
            }
            return item;
        }));
    };

    return {
        inventory,
        updateStock
    };
}
