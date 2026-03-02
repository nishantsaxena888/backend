import type { ClientConfig } from '../../types';

export const config: ClientConfig = {
    id: 'warehouse-blue',
    name: 'Industrial Supply Co.',
    tagline: 'Wholesale & B2B',
    type: 'retail',
    logoIcon: '📦',
    hero: {
        headline: 'Heavy Duty Supplies & Equipment',
        subheadline: 'Industrial grade products for your warehouse and operations.',
        cta: 'Browse Catalog',
        badge: 'Forklift Delivery Available',
    },
    categories: ['All Products', 'Packaging', 'Safety Gear', 'Tools', 'Storage'],
    phone: '1-800-WAREHOUSE',
    hours: 'Mon–Fri: 8 AM – 6 PM',
    topBarMessage: 'Bulk discounts available on orders over $1,000',
    freeDeliveryThreshold: 500,
};
