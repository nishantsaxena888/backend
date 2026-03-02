import type { ClientConfig } from '../../types';

export const config: ClientConfig = {
    id: 'green-mvp',
    name: 'GreenBasket',
    tagline: 'Eco & Organic',
    type: 'grocery',
    logoIcon: '🌿',
    hero: {
        headline: 'Good for You. Good for the Planet.',
        subheadline: 'Certified organic everything — from superfood pantry staples to sustainable home essentials.',
        cta: 'Shop Organic',
        badge: '🌱 Carbon-neutral delivery',
    },
    categories: ['All Products', 'Organic Produce', 'Plant-Based Proteins', 'Superfoods', 'Eco Household', 'Organic Dairy', 'Herbal & Wellness', 'Zero Waste Pantry'],
    phone: '1-888-GREENBASKET',
    hours: 'Mon–Fri: 8 AM – 7 PM',
    topBarMessage: '🌎 1% of every order goes to reforestation',
    freeDeliveryThreshold: 40,
};
