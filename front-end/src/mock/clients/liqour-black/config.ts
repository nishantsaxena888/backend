import type { ClientConfig } from '../../types';

export const config: ClientConfig = {
    id: 'liqour-black',
    name: 'The Barrel Room',
    tagline: 'Fine Spirits',
    type: 'liquor',
    logoIcon: '🥃',
    hero: {
        headline: 'Aged to Perfection.',
        subheadline: 'Rare single malts, small-batch bourbons and aged rums — curated for the serious collector.',
        cta: 'Explore Dark Spirits',
        badge: '🔒 Age verification required at delivery',
    },
    categories: ['All', 'Single Malt Scotch', 'Bourbon & Rye', 'Dark Rum', 'Cognac & Armagnac', 'Japanese Whisky', 'Craft Beer', 'Glassware & Accessories'],
    phone: '1-800-BARRELROOM',
    hours: 'Mon–Sat: 11 AM – 9 PM',
    topBarMessage: '🔞 Must be 21+ to purchase · ID checked at delivery',
    freeDeliveryThreshold: 100,
};
