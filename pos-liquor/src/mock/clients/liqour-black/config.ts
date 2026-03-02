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
    translations: {
        es: {
            name: 'La Cava de Barricas',
            tagline: 'Licores Finos',
            topBarMessage: '🔞 Debe tener 21+ para comprar · ID verificado al entregar',
            hero: {
                headline: 'Añejado a la Perfección.',
                subheadline: 'Maltas raras, whiskies de lote pequeño y rones añejos — seleccionados para el coleccionista serio.',
                cta: 'Explorar Licores Oscuros',
                badge: '🔒 Verificación de edad requerida al entregar',
            },
            categories: ['Todo', 'Scotch de Malta Única', 'Bourbon y Rye', 'Ron Oscuro', 'Coñac y Armagnac', 'Whisky Japonés', 'Cerveza Artesanal', 'Cristalería y Accesorios'],
        }
    }
};
