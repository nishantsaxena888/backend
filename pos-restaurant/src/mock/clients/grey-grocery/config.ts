import type { ClientConfig } from '../../types';

export const config: ClientConfig = {
    id: 'grey-grocery',
    name: 'Prestige Market',
    tagline: 'Premium Supermarket',
    type: 'grocery',
    logoIcon: '🛒',
    hero: {
        headline: 'Premium Ingredients, Everyday',
        subheadline: 'Curated imported goods, artisanal produce and gourmet staples — all under one roof.',
        cta: 'Explore Premium Selection',
        badge: '✨ New artisanal arrivals every week',
    },
    categories: ['All Products', 'Artisanal Bakery', 'Imported & Gourmet', 'Premium Meats', 'Fine Cheese & Charcuterie', 'Natural Wines', 'Organic Produce', 'Specialty Pantry'],
    phone: '1-800-PRESTIGE',
    hours: 'Mon–Sun: 7 AM – 10 PM',
    topBarMessage: 'Curated Gourmet Groceries — Next-Day Home Delivery',
    freeDeliveryThreshold: 50,
};
