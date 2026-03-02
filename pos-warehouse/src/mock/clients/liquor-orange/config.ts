import type { ClientConfig } from '../../types';

export const config: ClientConfig = {
    id: 'liquor-orange',
    name: 'Sippers Co.',
    tagline: 'Cocktail Culture',
    type: 'liquor',
    logoIcon: '🍊',
    hero: {
        headline: 'Shake. Stir. Celebrate.',
        subheadline: 'Premium spirits, cocktail kits and mixers — everything you need to make bar-quality drinks at home.',
        cta: 'Build Your Bar Cart',
        badge: '🍹 Free cocktail recipe card with every order',
    },
    categories: ['All', 'Vodka', 'Gin', 'Tequila & Mezcal', 'Rum & Cachaca', 'Mixers & Sodas', 'Cocktail Kits', 'Barware'],
    phone: '1-888-SIPPERS',
    hours: 'Mon–Sun: 10 AM – 10 PM',
    topBarMessage: '🍹 Free cocktail recipe card with every order · 21+ only',
    freeDeliveryThreshold: 60,
};
