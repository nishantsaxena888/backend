// ─── Shared domain types for all 8 mock clients ───────────────────────────────

export type ClientType = 'grocery' | 'fashion' | 'liquor' | 'restaurant';

export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    /** Unsplash URL or emoji string – component handles both */
    image: string;
    category: string;
    badge?: string;
    description: string;
    inStock: boolean;
    tags?: string[];
    translations?: {
        es?: Partial<Pick<Product, 'name' | 'description' | 'badge' | 'category'>>;
    };
}

export interface CartItem extends Product {
    quantity: number;
}

export interface HeroConfig {
    headline: string;
    subheadline: string;
    cta: string;
    badge?: string;
}

export interface ClientConfig {
    /** Must match the theme CSS class suffix, e.g. "emerald-grocery" */
    id: string;
    name: string;
    tagline: string;
    type: ClientType;
    /** Emoji shown in the logo square */
    logoIcon: string;
    hero: HeroConfig;
    /** Ordered list for the NavBar */
    categories: string[];
    /** Top info-bar content */
    phone: string;
    hours: string;
    topBarMessage: string;
    /** Cart free-delivery threshold in $ */
    freeDeliveryThreshold: number;
    /** Localized versions of the above strings */
    translations?: {
        es?: Partial<Omit<ClientConfig, 'id' | 'type' | 'categories' | 'freeDeliveryThreshold' | 'translations' | 'hero'>> & {
            hero?: Partial<HeroConfig>;
            categories?: string[];
        };
    };
}
