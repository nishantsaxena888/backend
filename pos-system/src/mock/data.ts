import type { POSConfig, Product } from '../types';

export const CONFIGS: Record<string, POSConfig> = {
    warehouse: {
        id: 'warehouse',
        name: 'Industrial Warehouse POS',
        logo: '🏗️',
        categories: ['Heavy Machinery', 'Tools', 'Safety Gear', 'Construction'],
        primaryColor: '#f97316',
    },
    restaurant: {
        id: 'restaurant',
        name: 'Bistro Flare POS',
        logo: '🍽️',
        categories: ['Starters', 'Main Course', 'Desserts', 'Beverages'],
        primaryColor: '#ef4444',
    },
    liquor: {
        id: 'liquor',
        name: 'Vintage Spirits POS',
        logo: '🍾',
        categories: ['Whisk(e)y', 'Wine', 'Beer', 'Spirits'],
        primaryColor: '#fbbf24',
    },
    'emerald-grocery': {
        id: 'emerald-grocery',
        name: 'Emerald Grocery',
        logo: '🥦',
        categories: ['Produce', 'Dairy', 'Bakery', 'Frozen'],
        primaryColor: '#10b981',
    },
    'fashion-black': {
        id: 'fashion-black',
        name: 'Fashion Black',
        logo: '🖤',
        categories: ['Apparel', 'Accessories', 'Shoes', 'New Arrivals'],
        primaryColor: '#000000',
    },
    'fashion-gold-luxury': {
        id: 'fashion-gold-luxury',
        name: 'Fashion Gold Luxury',
        logo: '✨',
        categories: ['Jewelry', 'Watches', 'Fine Art', 'Premium'],
        primaryColor: '#f59e0b',
    },
    'green-mvp': {
        id: 'green-mvp',
        name: 'Green MVP',
        logo: '🌿',
        categories: ['Eco-Friendly', 'Organic', 'Sustainable', 'Home'],
        primaryColor: '#059669',
    },
    'grey-grocery': {
        id: 'grey-grocery',
        name: 'Grey Grocery',
        logo: '🩶',
        categories: ['Pantry', 'Cleaning', 'Personal Care', 'Bulk'],
        primaryColor: '#6b7280',
    },
    'liquor-black': {
        id: 'liquor-black',
        name: 'Liquor Black',
        logo: '🥃',
        categories: ['Scotch', 'Bourbon', 'Gin', 'Vodka'],
        primaryColor: '#f97316',
    },
    'liquor-orange': {
        id: 'liquor-orange',
        name: 'Liquor Orange',
        logo: '🍊',
        categories: ['Citrus Spirits', 'Liqueurs', 'Mixers', 'Seasonal'],
        primaryColor: '#f97316',
    },
    'restaurant-black': {
        id: 'restaurant-black',
        name: 'Restaurant Black',
        logo: '🍽️',
        categories: ['Specialties', 'Wine List', 'Chef Selection', 'Cocktails'],
        primaryColor: '#dc2626',
    },
};

export const MOCK_PRODUCTS: Record<string, Product[]> = {
    warehouse: [
        { id: 'w1', name: 'Hydraulic Press', price: 1200, category: 'Heavy Machinery', image: '🏗️', sku: 'WH-001' },
        { id: 'w2', name: 'Power Drill x4', price: 450, category: 'Tools', image: '🔧', sku: 'WH-002' },
    ],
    restaurant: [
        { id: 'r1', name: 'Truffle Pasta', price: 28, category: 'Main Course', image: '🍝', sku: 'RS-001' },
        { id: 'r2', name: 'Red Wine Bottle', price: 45, category: 'Beverages', image: '🍷', sku: 'RS-002' },
    ],
    liquor: [
        { id: 'l1', name: 'Single Malt 18y', price: 120, category: 'Whisk(e)y', image: '🥃', sku: 'LQ-001' },
        { id: 'l2', name: 'Cabernet Sauvignon', price: 55, category: 'Wine', image: '🍷', sku: 'LQ-002' },
    ],
    'emerald-grocery': [
        { id: 'eg1', name: 'Organic Broccoli', price: 2.5, category: 'Produce', image: '🥦', sku: 'EG-001' },
        { id: 'eg2', name: 'Whole Milk 1L', price: 1.8, category: 'Dairy', image: '🥛', sku: 'EG-002' },
    ],
    'fashion-black': [
        { id: 'fb1', name: 'Black Leather Jacket', price: 150, category: 'Apparel', image: '🧥', sku: 'FB-001' },
        { id: 'fb2', name: 'Classic Sunglasses', price: 85, category: 'Accessories', image: '🕶️', sku: 'FB-002' },
    ],
    'fashion-gold-luxury': [
        { id: 'fgl1', name: '24K Gold Watch', price: 2500, category: 'Watches', image: '⌚', sku: 'FGL-001' },
        { id: 'fgl2', name: 'Diamond Earrings', price: 1800, category: 'Jewelry', image: '💎', sku: 'FGL-002' },
    ],
    'green-mvp': [
        { id: 'gmv1', name: 'Bamboo Toothbrush', price: 4, category: 'Eco-Friendly', image: '🪥', sku: 'GMV-001' },
        { id: 'gmv2', name: 'Recycled Tote Bag', price: 12, category: 'Sustainable', image: '🛍️', sku: 'GMV-002' },
    ],
    'grey-grocery': [
        { id: 'gg1', name: 'Box of Pasta', price: 1.2, category: 'Pantry', image: '🍝', sku: 'GG-001' },
        { id: 'gg2', name: 'Dish Soap', price: 3.5, category: 'Cleaning', image: '🧼', sku: 'GG-002' },
    ],
    'liquor-black': [
        { id: 'lb1', name: 'Smoky Islay Scotch', price: 85, category: 'Scotch', image: '🥃', sku: 'LB-001' },
        { id: 'lb2', name: 'London Dry Gin', price: 35, category: 'Gin', image: '🍸', sku: 'LB-002' },
    ],
    'liquor-orange': [
        { id: 'lo1', name: 'Triple Sec', price: 22, category: 'Liqueurs', image: '🍊', sku: 'LO-001' },
        { id: 'lo2', name: 'Orange Bitters', price: 15, category: 'Mixers', image: '🧪', sku: 'LO-002' },
    ],
    'restaurant-black': [
        { id: 'rb1', name: 'Wagyu Steak', price: 120, category: 'Specialties', image: '🥩', sku: 'RB-001' },
        { id: 'rb2', name: 'Old Fashioned', price: 18, category: 'Cocktails', image: '🥃', sku: 'RB-002' },
    ],
};
