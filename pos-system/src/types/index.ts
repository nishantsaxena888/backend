
export type POSTheme =
    | 'warehouse'
    | 'restaurant'
    | 'liquor'
    | 'emerald-grocery'
    | 'fashion-black'
    | 'fashion-gold-luxury'
    | 'green-mvp'
    | 'grey-grocery'
    | 'liquor-black'
    | 'liquor-orange'
    | 'restaurant-black';

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    sku: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface POSConfig {
    id: POSTheme;
    name: string;
    logo: string;
    categories: string[];
    primaryColor: string;
}
