import type { ClientConfig } from '../../types';

export const config: ClientConfig = {
    id: 'emerald-grocery',
    name: 'FreshMart',
    tagline: 'Wholesale',
    type: 'grocery',
    logoIcon: '🥦',
    hero: {
        headline: 'Fresh Groceries, Delivered Fast',
        subheadline: 'Farm-to-table quality at wholesale prices. Order before 2 PM for same-day delivery.',
        cta: 'Shop Fresh Produce',
        badge: '🚚 Free delivery over $30',
    },
    categories: ['All Products', 'Fresh Produce', 'Dairy & Eggs', 'Meat & Seafood', 'Bakery', 'Beverages', 'Pantry', 'Frozen Foods', 'Snacks'],
    phone: '1-800-FRESHMART',
    hours: 'Mon–Sat: 6 AM – 8 PM',
    topBarMessage: 'Wholesale Pricing for Retailers & Distributors',
    freeDeliveryThreshold: 30,
    translations: {
        es: {
            name: 'FreshMart',
            tagline: 'Venta al por mayor',
            topBarMessage: 'Precios de Mayoreo para Minoristas y Distribuidores',
            hero: {
                headline: 'Grocies Frescos, Entrega Rápida',
                subheadline: 'Calidad de la granja a la mesa a precios de mayorista. Ordene antes de las 2 p. m. para entrega el mismo día.',
                cta: 'Comprar Productos Frescos',
                badge: '🚚 Entrega gratuita en pedidos superiores a $30',
            }
        }
    }
};
