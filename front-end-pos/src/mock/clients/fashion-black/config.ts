import type { ClientConfig } from '../../types';

export const config: ClientConfig = {
    id: 'fashion-black',
    name: 'NOIR',
    tagline: 'Streetwear & Urban',
    type: 'fashion',
    logoIcon: '🖤',
    hero: {
        headline: 'Wear the Night.',
        subheadline: 'Curated streetwear drops from emerging designers — limited runs, bold statements.',
        cta: 'Shop New Drops',
        badge: '🔥 Limited edition — drops every Friday',
    },
    categories: ['All', 'Hoodies & Sweatshirts', 'Cargo & Trousers', 'Graphic Tees', 'Outerwear', 'Footwear', 'Accessories', 'Collaborations'],
    phone: '1-800-NOIR-STYLE',
    hours: 'Mon–Sat: 10 AM – 8 PM',
    topBarMessage: 'New drops every Friday · Free returns within 30 days',
    freeDeliveryThreshold: 75,
    translations: {
        es: {
            name: 'NOIR',
            tagline: 'Streetwear y Urbano',
            topBarMessage: 'Nuevos lanzamientos cada viernes · Devoluciones gratis en 30 días',
            hero: {
                headline: 'Viste la Noche.',
                subheadline: 'Drops de streetwear seleccionados de diseñadores emergentes — ediciones limitadas, declaraciones audaces.',
                cta: 'Comprar Lanzamientos',
                badge: '🔥 Edición limitada — lanzamientos cada viernes',
            },
            categories: ['Todo', 'Sudaderas con Capucha', 'Cargos y Pantalones', 'Camisetas Gráficas', 'Ropa de Abrigo', 'Calzado', 'Accesorios', 'Colaboraciones'],
        }
    }
};
