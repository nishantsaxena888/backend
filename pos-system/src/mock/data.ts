import type { POSConfig, Product, Language } from '../types';

export const LANGUAGES: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'jp', name: 'Japanese', flag: '🇯🇵' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
];

export const TRANSLATIONS: Record<string, any> = {
    es: {
        warehouse: "Almacén Industrial",
        restaurant: "Restaurante Bistro",
        liquor: "Licores Vintage",
        categories: {
            'Heavy Machinery': 'Maquinaria Pesada',
            'Tools': 'Herramientas',
            'Safety Gear': 'Equipo de Seguridad',
            'Construction': 'Construcción',
            'Starters': 'Entradas',
            'Main Course': 'Plato Principal',
            'Desserts': 'Postres',
            'Beverages': 'Bebidas',
            'Whisk(e)y': 'Whisky',
            'Wine': 'Vino',
            'Beer': 'Cerveza',
            'Spirits': 'Licores'
        },
        products: {
            'Hydraulic Press': 'Prensa Hidráulica',
            'Power Drill x4': 'Taladro de Potencia x4',
            'Truffle Pasta': 'Pasta de Trufa',
            'Red Wine Bottle': 'Botella de Vino Tinto',
            'Single Malt 18y': 'Malta Única 18 años',
            'Cabernet Sauvignon': 'Cabernet Sauvignon'
        }
    },
    hi: {
        warehouse: "औद्योगिक गोदाम",
        restaurant: "बिस्ट्रो फ्लेयर",
        liquor: "विंटेज स्पिरिट्स",
        categories: {
            'Heavy Machinery': 'भारी मशीनरी',
            'Tools': 'औजार',
            'Safety Gear': 'सुरक्षा उपकरण',
            'Construction': 'निर्माण',
            'Starters': 'स्टार्टर्स',
            'Main Course': 'मुख्य भोजन',
            'Desserts': 'मिठाई',
            'Beverages': 'पेय पदार्थ',
            'Whisk(e)y': 'व्हिस्की',
            'Wine': 'शराब',
            'Beer': 'बीयर',
            'Spirits': 'स्पिरिट्स'
        },
        products: {
            'Hydraulic Press': 'हाइड्रोलिक प्रेस',
            'Power Drill x4': 'पावर ड्रिल x4',
            'Truffle Pasta': 'ट्रफल पास्ता',
            'Red Wine Bottle': 'लाल शराब की बोतल',
            'Single Malt 18y': 'सिंगल माल्ट 18y',
            'Cabernet Sauvignon': 'कैबरनेट सॉविनन'
        }
    },
    ar: {
        warehouse: "مستودع صناعي",
        restaurant: "بيسترو فلير",
        liquor: "مشروبات معتقة",
        categories: {
            'Heavy Machinery': 'آلات ثقيلة',
            'Tools': 'أدوات',
            'Safety Gear': 'معدات السلامة',
            'Construction': 'بناء',
            'Starters': 'مقبلات',
            'Main Course': 'الطبق الرئيسي',
            'Desserts': 'حلويات',
            'Beverages': 'مشروبات',
            'Whisk(e)y': 'ويسكي',
            'Wine': 'نبيذ',
            'Beer': 'بيرة',
            'Spirits': 'مشروبات كحولية'
        },
        products: {
            'Hydraulic Press': 'مكبس هيدروليكي',
            'Power Drill x4': 'مثقاب كهربائي x4',
            'Truffle Pasta': 'باستا الكمأة',
            'Red Wine Bottle': 'زجاجة نبيذ أحمر',
            'Single Malt 18y': 'سنجل مالت 18 سنة',
            'Cabernet Sauvignon': 'كابيرنت سوفينيون'
        }
    },
    zh: {
        warehouse: "工业仓库",
        restaurant: "小酒馆风情",
        liquor: "年份烈酒",
        categories: {
            'Heavy Machinery': '重型机械',
            'Tools': '工具',
            'Safety Gear': '安全装备',
            'Construction': '建筑',
            'Starters': '前菜',
            'Main Course': '主菜',
            'Desserts': '甜点',
            'Beverages': '饮料',
            'Whisk(e)y': '威士忌',
            'Wine': '葡萄酒',
            'Beer': '啤酒',
            'Spirits': '烈酒'
        },
        products: {
            'Hydraulic Press': '液压机',
            'Power Drill x4': '电钻 x4',
            'Truffle Pasta': '松露意大利面',
            'Red Wine Bottle': '红酒瓶',
            'Single Malt 18y': '18年单项麦芽',
            'Cabernet Sauvignon': '赤霞珠'
        }
    }
};

export const t = (key: string, locale: string, section?: 'categories' | 'products') => {
    if (locale === 'en') return key;
    const langData = TRANSLATIONS[locale];
    if (!langData) return key;

    if (section && langData[section]) {
        return langData[section][key] || key;
    }

    return langData[key] || key;
};

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
