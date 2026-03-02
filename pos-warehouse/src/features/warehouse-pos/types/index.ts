export interface WarehouseProduct {
    id: string;
    name: string;
    sku: string;
    stock: number;
    category: string;
    unit: string;
    lowStockThreshold: number;
}
