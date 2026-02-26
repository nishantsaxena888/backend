import type { ClientConfig } from '../../types';

export const config: ClientConfig = {
    id: 'restaurant-black',
    name: 'Spice Route',
    tagline: 'Gourmet Indian & Global',
    type: 'restaurant',
    logoIcon: '🍽️',
    hero: {
        headline: 'Authentic Flavors, Delivered Hot.',
        subheadline: 'From charcoal-grilled kebabs to authentic hand-tossed pizzas — the best of global cuisine at your doorstep.',
        cta: 'Order Now',
        badge: '⭐ Top rated in your area',
    },
    categories: ['All', 'North Indian', 'South Indian', 'Chinese', 'Pizza & Italian', 'Burgers & Fast Food', 'Desserts & Sweets', 'Beverages', 'Street Food'],
    phone: '1-800-SPICE-ROUTE',
    hours: 'Mon–Sun: 11 AM – 11 PM',
    topBarMessage: '🚚 Fast delivery within 45 mins or it\'s on us!',
    freeDeliveryThreshold: 25,
};
