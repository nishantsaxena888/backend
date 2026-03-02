import { WarehouseProduct } from "../types";

export const MOCK_WAREHOUSE_PRODUCTS: WarehouseProduct[] = [
    {
        id: "w1",
        name: "Premium Rice Bag",
        sku: "RCA-101",
        stock: 145,
        category: "Grains",
        unit: "50kg bag",
        lowStockThreshold: 20
    },
    {
        id: "w2",
        name: "Refined Sugar",
        sku: "SGR-205",
        stock: 15,
        category: "Staples",
        unit: "25kg bag",
        lowStockThreshold: 30
    },
    {
        id: "w3",
        name: "Canola Extract Oil",
        sku: "OIL-331",
        stock: 50,
        category: "Oils",
        unit: "5L tin",
        lowStockThreshold: 10
    },
    {
        id: "w4",
        name: "All Purpose Flour",
        sku: "FLR-412",
        stock: 210,
        category: "Grains",
        unit: "20kg bag",
        lowStockThreshold: 50
    },
    {
        id: "w5",
        name: "Pinto Beans",
        sku: "BNS-508",
        stock: 5,
        category: "Legumes",
        unit: "10kg bag",
        lowStockThreshold: 15
    }
];
