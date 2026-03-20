import type { Product } from '../../types';

export const products: Product[] = [
    { id: 'eg-1', name: 'Organic Avocados (4 pack)', price: 4.99, originalPrice: 6.49, rating: 4.8, reviews: 1234, image: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=400&q=80', category: 'Fresh Produce', badge: 'Organic', description: 'Creamy, perfectly ripe organic avocados sourced from California farms.', inStock: true, tags: ['vegan', 'keto', 'organic'],
        translations: { es: { name: 'Aguacates Orgánicos (Paquete de 4)', description: 'Aguacates orgánicos cremosos y perfectamente maduros de granjas de California.', badge: 'Orgánico' } }
    },
    { id: 'eg-2', name: 'Baby Spinach (500g)', price: 3.49, rating: 4.6, reviews: 876, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80', category: 'Fresh Produce', badge: 'Fresh', description: 'Tender baby spinach leaves, washed and ready to eat.', inStock: true, tags: ['vegan', 'organic'],
        translations: { es: { name: 'Espinacas Baby (500g)', description: 'Hojas tiernas de espinaca baby, lavadas y listas para comer.', badge: 'Fresco' } }
    },
    { id: 'eg-3', name: 'Roma Tomatoes (1 kg)', price: 2.99, rating: 4.5, reviews: 654, image: 'https://images.unsplash.com/photo-1546094096-0df4bcabd337?w=400&q=80', category: 'Fresh Produce', badge: 'Local', description: 'Sun-ripened Roma tomatoes, perfect for sauces and salads.', inStock: true,
        translations: { es: { name: 'Tomates Roma (1 kg)', description: 'Tomates Roma madurados al sol, perfectos para salsas y ensaladas.', badge: 'Local' } }
    },
    { id: 'eg-4', name: 'Free-Range Eggs (12 pack)', price: 5.49, rating: 4.9, reviews: 2341, image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=400&q=80', category: 'Dairy & Eggs', badge: 'Free-Range', description: 'Eggs from hens raised on open pastures, rich in omega-3.', inStock: true,
        translations: { es: { name: 'Huevos de Pastoreo (Paquete de 12)', description: 'Huevos de gallinas criadas en pastos abiertos, ricos en omega-3.', badge: 'Pastoreo' } }
    },
    { id: 'eg-5', name: 'Whole Milk (2L)', price: 3.99, rating: 4.7, reviews: 987, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80', category: 'Dairy & Eggs', badge: '', description: 'Full-cream pasteurised whole milk from local dairy farms.', inStock: true,
        translations: { es: { name: 'Leche Entera (2L)', description: 'Leche entera pasteurizada de granjas lecheras locales.' } }
    },
    { id: 'eg-6', name: 'Greek Yoghurt (500g)', price: 3.49, originalPrice: 4.49, rating: 4.7, reviews: 543, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80', category: 'Dairy & Eggs', badge: 'Sale', description: 'Thick and creamy Greek yoghurt, high in protein.', inStock: true,
        translations: { es: { name: 'Yogur Griego (500g)', description: 'Yogur griego espeso y cremoso, con alto contenido de proteínas.', badge: 'Oferta' } }
    },
    { id: 'eg-7', name: 'Chicken Breast (1 kg)', price: 8.99, rating: 4.6, reviews: 1123, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d11d36?w=400&q=80', category: 'Meat & Seafood', badge: 'Fresh', description: 'Skinless, boneless chicken breast — antibiotic-free.', inStock: true,
        translations: { es: { name: 'Pechuga de Pollo (1 kg)', description: 'Pechuga de pollo sin piel ni huesos, libre de antibióticos.', badge: 'Fresco' } }
    },
    { id: 'eg-8', name: 'Atlantic Salmon Fillet', price: 12.99, rating: 4.8, reviews: 678, image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400&q=80', category: 'Meat & Seafood', badge: 'Premium', description: 'Fresh Atlantic salmon — wild-caught, skin-on fillet.', inStock: true,
        translations: { es: { name: 'Filete de Salmón del Atlántico', description: 'Salmón fresco del Atlántico — filete con piel, capturado en estado salvaje.', badge: 'Premium' } }
    },
    { id: 'eg-9', name: 'Sourdough Loaf', price: 5.99, rating: 4.7, reviews: 890, image: 'https://images.unsplash.com/photo-1585478259715-4d3170c6c8b7?w=400&q=80', category: 'Bakery', badge: 'Baked Today', description: 'Stone-baked sourdough with a crisp crust and open crumb.', inStock: true,
        translations: { es: { name: 'Hogaza de Masa Madre', description: 'Masa madre horneada en piedra con una corteza crujiente y miga abierta.', badge: 'Horneado Hoy' } }
    },
    { id: 'eg-10', name: 'Croissants (4 pack)', price: 3.99, rating: 4.5, reviews: 432, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80', category: 'Bakery', badge: '', description: 'Flaky, buttery French-style croissants baked fresh daily.', inStock: true,
        translations: { es: { name: 'Croissants (Paquete de 4)', description: 'Croissants al estilo francés, hojaldrados y mantecosos, horneados frescos a diario.' } }
    },
    { id: 'eg-11', name: 'Orange Juice (1L)', price: 3.49, rating: 4.4, reviews: 567, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80', category: 'Beverages', badge: 'No Added Sugar', description: 'Freshly squeezed orange juice, no preservatives.', inStock: true,
        translations: { es: { name: 'Jugo de Naranja (1L)', description: 'Jugo de naranja recién exprimido, sin conservantes.', badge: 'Sin Azúcar Añadida' } }
    },
    { id: 'eg-12', name: 'Sparkling Water (6 pack)', price: 4.49, rating: 4.3, reviews: 321, image: 'https://images.unsplash.com/photo-1599751449318-de7f3d27a0dd?w=400&q=80', category: 'Beverages', badge: '', description: 'Natural mineral sparkling water, lightly carbonated.', inStock: true,
        translations: { es: { name: 'Agua con Gas (Paquete de 6)', description: 'Agua mineral natural con gas, ligeramente carbonatada.' } }
    },
    { id: 'eg-13', name: 'Extra Virgin Olive Oil', price: 9.99, originalPrice: 13.99, rating: 4.9, reviews: 1456, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80', category: 'Pantry', badge: 'Popular', description: 'Cold-pressed Greek EVOO, robust and fruity.', inStock: true,
        translations: { es: { name: 'Aceite de Oliva Virgen Extra', description: 'AOVE griego prensado en frío, robusto y afrutado.', badge: 'Popular' } }
    },
    { id: 'eg-14', name: 'Basmati Rice (2 kg)', price: 6.99, rating: 4.6, reviews: 789, image: 'https://images.unsplash.com/photo-1536304993881-ff86e0c9c99e?w=400&q=80', category: 'Pantry', badge: '', description: 'Aged basmati rice, long-grain and aromatic.', inStock: true,
        translations: { es: { name: 'Arroz Basmati (2 kg)', description: 'Arroz basmati añejo, de grano largo y aromático.' } }
    },
    { id: 'eg-15', name: 'Frozen Peas (1 kg)', price: 2.49, rating: 4.3, reviews: 234, image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400&q=80', category: 'Frozen Foods', badge: '', description: 'Garden peas flash-frozen at peak freshness.', inStock: true,
        translations: { es: { name: 'Gisantes Congelados (1 kg)', description: 'Guisantes de jardín congelados rápidamente en su punto máximo de frescura.' } }
    },
    { id: 'eg-16', name: 'Dark Chocolate (85%)', price: 2.99, rating: 4.8, reviews: 1789, image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80', category: 'Snacks', badge: 'Popular', description: 'Rich 85% dark chocolate — guilt-free indulgence.', inStock: true,
        translations: { es: { name: 'Chocolate Negro (85%)', description: 'Rico chocolate negro al 85% — indulgencia sin culpa.', badge: 'Popular' } }
    },
];
