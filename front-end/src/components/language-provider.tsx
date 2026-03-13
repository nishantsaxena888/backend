import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        // Header
        'search.placeholder': 'Search for products...',
        'header.deliver_to': 'Deliver to',
        'header.sign_in': 'Sign In',
        'header.member': 'Member',
        'header.cart': 'Cart',
        'header.recent': 'Recent Searches',
        'header.clear_all': 'Clear All',
        'header.categories': 'Categories',
        'header.suggested_categories': 'Suggested Categories',
        'header.logged_account': 'Logged Account',

        // Auth Modal
        'auth.title': 'Welcome Back', // Updated from 'Premium Membership'
        'auth.sign_in': 'Sign In',
        'auth.create_account': 'Create Account',
        'auth.email': 'Email Address',
        'auth.password': 'Password',
        'auth.forgot': 'Forgot?',
        'auth.full_name': 'Full Name',
        'auth.submit': 'Join the Experience',
        'auth.or': 'or continue with email',
        'auth.continue_google': 'Continue with Google',
        'auth.continue_facebook': 'Continue with Facebook',
        'auth.demo_mode': 'Demo Mode: Any credentials will authorize you and store your session locally.',

        // Cart
        'cart.title': 'Your Cart',
        'cart.items': 'Items',
        'cart.empty': 'Your cart is currently empty',
        'cart.start_shopping': 'Start Shopping',
        'cart.free_delivery': 'Free Delivery Progress',
        'cart.unlocked': 'Unlocked!',
        'cart.remaining': 'remaining',
        'cart.order_total': 'Order Total',
        'cart.checkout': 'Proceed to Checkout',
        'cart.subtotal': 'Subtotal',
        'cart.shipping': 'Shipping',
        'cart.tax': 'Tax',
        'cart.total': 'Total',

        // Checkout
        'checkout.title': 'Secure Checkout',
        'checkout.shipping': 'Shipping',
        'checkout.payment': 'Payment',
        'checkout.review': 'Review',
        'checkout.success': 'Order Success',
        'checkout.place_order': 'Place Order',
        'checkout.thank_you': 'Thank you for your order!',
        'checkout.confirmed': 'Order Confirmed',
        'checkout.step_shipping': 'Shipping Step',
        'checkout.step_payment': 'Payment Step',
        'checkout.step_review': 'Final Review',
        'checkout.continue_to_payment': 'Continue to Payment',
        'checkout.card_info': 'Card Information',
        'checkout.card_number': 'Card Number',
        'checkout.expiry': 'Expiry',
        'checkout.cvv': 'CVV',
        'checkout.review_order': 'Review Order',
        'checkout.shipping_to': 'Shipping To',
        'checkout.card_ending': 'Card ending in',
        'checkout.expires': 'Expires',
        'checkout.order_summary': 'Order Summary',
        'checkout.qty': 'Qty',
        'checkout.free': 'FREE',
        'checkout.success_title': 'Success!',
        'checkout.success_msg': "Thank you for your order. We've sent a confirmation email to your primary address.",
        'checkout.order_amount': 'Order Amount',

        // Product
        'product.all_products': 'All Products',
        'product.no_matches': 'Zero matches found',
        'product.widen_search': 'Try widening your search filters.',
        'product.single': 'Product',
        'product.plural': 'Products',
        'product.matched': 'MATCHED',
        'product.clear_filters': 'Clear all filters',
        'product.sort_by': 'Sort by',
        'product.newest': 'Newest',
        'product.add_to_cart': 'Add to Cart',
        'product.quick_view': 'Quick View',
        'product.in_stock': 'In Stock',
        'product.out_of_stock': 'Out of Stock',
        'product.details': 'Details',
        'product.reviews': 'reviews',
        'product.add_wishlist': 'Add to Favorites',
        'product.remove_wishlist': 'Remove from wishlist',
        'product.fast_delivery': 'Fast Delivery',
        'product.easy_returns': 'Easy Returns',
        'product.certified_quality': 'Certified Quality',
        'product.ends_in': 'Ends in',
        'product.price': 'Price',
        'product.min': 'MIN',
        'product.max': 'MAX',
        'product.curated_for': 'products curated for',
        'product.view_grid': 'Grid',
        'product.view_list': 'List',

        // Profile
        'profile.vip': 'VIP Member',
        'profile.edit': 'Edit Profile',
        'profile.sign_out': 'Sign Out',
        'profile.orders': 'Order History',
        'profile.wishlist': 'My Wishlist',
        'profile.addresses': 'Saved Addresses',
        'profile.payment': 'Payment Methods',
        'profile.privacy': 'Privacy & Security',
        'profile.need_help': 'Need Help?',
        'profile.priority_support': 'Our priority support team is available 24/7 for our VIP members.',
        'profile.contact_support': 'Contact Support',
        'profile.recent_orders': 'Recent Orders',
        'profile.shopping_history': 'Shopping History',
        'profile.no_orders': 'No active orders found',
        'profile.no_orders_msg': "You haven't placed any orders with",
        'profile.no_orders_cta': "yet. Start exploring our categories to find amazing deals!",
        'profile.return_to_shop': 'Return to Shop',

        // Age Verification
        'age.title': 'Age Verification',
        'age.requirement': 'Legal Entry Requirement',
        'age.instruction_pre': 'You must be',
        'age.age_limit': '21 years or older',
        'age.instruction_post': 'to access',
        'age.instruction_final': 'Please enter your date of birth below.',
        'age.month': 'Month',
        'age.day': 'Day',
        'age.year': 'Year',
        'age.month_placeholder': 'MM',
        'age.day_placeholder': 'DD',
        'age.year_placeholder': 'YYYY',
        'age.verify_button': 'Verify & Enter',
        'age.terms': 'By entering this site, you agree to our terms and confirm you are of legal drinking age. Please enjoy responsibly.',
        'age.license': 'Licensed for delivery in NJ only',
        'age.error_incomplete': 'Please enter your complete date of birth',
        'age.error_underage': 'You must be 21 or older to access this site',

        // Address Management
        'address.delivery_title': 'Delivery Address',
        'address.saved_title': 'Saved Addresses',
        'address.manage_msg': 'Manage your shipping destinations',
        'address.add_new': 'Add New',
        'address.update_details': 'Update Details',
        'address.new_destination': 'New Destination',
        'address.full_name': 'Full Name',
        'address.phone': 'Phone',
        'address.street': 'Street Address',
        'address.city': 'City',
        'address.state': 'State',
        'address.zip': 'ZIP',
        'address.type': 'Type',
        'address.type_home': 'Home',
        'address.type_work': 'Work',
        'address.type_other': 'Other',
        'address.use_default': 'Use as default',
        'address.update': 'Update',
        'address.save': 'Save Address',
        'address.cancel': 'Cancel',
        'address.empty_msg': 'Your address book is empty',
        'address.default_badge': 'Default',

        // Footer
        'footer.navigation': 'Navigation',
        'footer.shop_all': 'Shop All',
        'footer.my_profile': 'My Profile',
        'footer.contact': 'Contact',
        'footer.newsletter': 'Newsletter',
        'footer.subscribe_msg': 'Subscribe to our newsletter for the latest updates and exclusive offers.',
        'footer.email_placeholder': 'Enter your email',
        'footer.subscribe': 'Subscribe',
        'footer.follow_us': 'Follow Us',
        'footer.categories': 'Categories',
        'footer.quick_links': 'Quick Links',
        'footer.help': 'Help & Support',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',

        // Hero
        'hero.explore': 'Explore Collection',
    },
    es: {
        // Header
        'search.placeholder': 'Buscar productos...',
        'header.deliver_to': 'Entregar a',
        'header.sign_in': 'Iniciar sesión',
        'header.member': 'Miembro',
        'header.cart': 'Carrito',
        'header.recent': 'Búsquedas recientes',
        'header.clear_all': 'Borrar Todo', // Updated from 'Borrar todo'
        'header.categories': 'Categorías', // Updated from 'Explorar categorías'
        'header.suggested_categories': 'Categorías Sugeridas',
        'header.logged_account': 'Cuenta Activa',

        // Auth Modal
        'auth.title': 'Bienvenido de Nuevo', // Updated from 'Membresía Premium'
        'auth.sign_in': 'Iniciar Sesión',
        'auth.create_account': 'Crear Cuenta',
        'auth.email': 'Correo Electrónico',
        'auth.password': 'Contraseña',
        'auth.forgot': '¿Olvidó?',
        'auth.full_name': 'Nombre Completo',
        'auth.submit': 'Únete a la Experiencia',
        'auth.or': 'o continuar con correo electrónico',
        'auth.continue_google': 'Continuar con Google',
        'auth.continue_facebook': 'Continuar con Facebook',
        'auth.demo_mode': 'Modo de demostración: cualquier credencial lo autorizará y almacenará su sesión localmente.',

        // Cart
        'cart.title': 'Tu Carrito',
        'cart.items': 'Artículos',
        'cart.empty': 'Tu carrito está actualmente vacío',
        'cart.start_shopping': 'Empezar a comprar',
        'cart.free_delivery': 'Progreso de Envío Gratis',
        'cart.unlocked': '¡Desbloqueado!',
        'cart.remaining': 'restante',
        'cart.order_total': 'Total del pedido',
        'cart.checkout': 'Proceder al pago',
        'cart.subtotal': 'Subtotal',
        'cart.shipping': 'Envío',
        'cart.tax': 'Impuesto',
        'cart.total': 'Total',

        // Checkout
        'checkout.title': 'Pago Seguro',
        'checkout.shipping': 'Envío',
        'checkout.payment': 'Pago',
        'checkout.review': 'Revisar',
        'checkout.success': 'Pedido Exitoso',
        'checkout.place_order': 'Realizar Pedido',
        'checkout.thank_you': '¡Gracias por su pedido!',
        'checkout.confirmed': 'Pedido Confirmado',
        'checkout.step_shipping': 'Paso de Envío',
        'checkout.step_payment': 'Paso de Pago',
        'checkout.step_review': 'Revisión Final',
        'checkout.continue_to_payment': 'Continuar al Pago',
        'checkout.card_info': 'Información de la Tarjeta',
        'checkout.card_number': 'Número de Tarjeta',
        'checkout.expiry': 'Vencimiento',
        'checkout.cvv': 'CVV',
        'checkout.review_order': 'Revisar Pedido',
        'checkout.shipping_to': 'Enviando a',
        'checkout.card_ending': 'Tarjeta terminada en',
        'checkout.expires': 'Vence',
        'checkout.order_summary': 'Resumen del Pedido',
        'checkout.qty': 'Cant.',
        'checkout.free': 'GRATIS',
        'checkout.success_title': '¡Éxito!',
        'checkout.success_msg': 'Gracias por su pedido. Hemos enviado un correo electrónico de confirmación a su dirección principal.',
        'checkout.order_amount': 'Monto del Pedido',

        // Product
        'product.all_products': 'Todos los productos',
        'product.no_matches': 'No se encontraron coincidencias',
        'product.widen_search': 'Intente ampliar sus filtros de búsqueda.',
        'product.single': 'Producto',
        'product.plural': 'Productos',
        'product.matched': 'COINCIDENCIAS',
        'product.clear_filters': 'Borrar todos los filtros',
        'product.sort_by': 'Ordenar por',
        'product.newest': 'Más recientes',
        'product.add_to_cart': 'Añadir al carrito',
        'product.quick_view': 'Vista rápida',
        'product.in_stock': 'En Stock',
        'product.out_of_stock': 'Agotado',
        'product.details': 'Detalles',
        'product.reviews': 'reseñas',
        'product.add_wishlist': 'Añadir a favoritos',
        'product.remove_wishlist': 'Eliminar de favoritos',
        'product.fast_delivery': 'Entrega rápida',
        'product.easy_returns': 'Devoluciones fáciles',
        'product.certified_quality': 'Calidad certificada',
        'product.ends_in': 'Termina en',
        'product.price': 'Precio',
        'product.min': 'MIN',
        'product.max': 'MAX',
        'product.curated_for': 'productos seleccionados para',
        'product.view_grid': 'Cuadrícula',
        'product.view_list': 'Lista',

        // Profile
        'profile.vip': 'Miembro VIP',
        'profile.edit': 'Editar Perfil',
        'profile.sign_out': 'Cerrar Sesión',
        'profile.orders': 'Historial de Pedidos',
        'profile.wishlist': 'Mi Lista de Deseos',
        'profile.addresses': 'Direcciones Guardadas',
        'profile.payment': 'Métodos de Pago',
        'profile.privacy': 'Privacidad y Seguridad',
        'profile.need_help': '¿Necesitas Ayuda?',
        'profile.priority_support': 'Nuestro equipo de soporte prioritario está disponible las 24 horas, los 7 días de la semana para nuestros miembros VIP.',
        'profile.contact_support': 'Contactar Soporte',
        'profile.recent_orders': 'Pedidos Recientes',
        'profile.shopping_history': 'Historial de Compras',
        'profile.no_orders': 'No se encontraron pedidos activos',
        'profile.no_orders_msg': 'Aún no has realizado ningún pedido con',
        'profile.no_orders_cta': '¡Empieza a explorar nuestras categorías para encontrar ofertas increíbles!',
        'profile.return_to_shop': 'Volver a la Tienda',

        // Age Verification
        'age.title': 'Verificación de Edad',
        'age.requirement': 'Requisito Legal de Entrada',
        'age.instruction_pre': 'Debes tener',
        'age.age_limit': '21 años o más',
        'age.instruction_post': 'para acceder a',
        'age.instruction_final': 'Por favor, introduce tu fecha de nacimiento a continuación.',
        'age.month': 'Mes',
        'age.day': 'Día',
        'age.year': 'Año',
        'age.month_placeholder': 'MM',
        'age.day_placeholder': 'DD',
        'age.year_placeholder': 'AAAA',
        'age.verify_button': 'Verificar y Entrar',
        'age.terms': 'Al entrar en este sitio, aceptas nuestros términos y confirmas que tienes la edad legal para beber alcohol. Por favor, disfruta con responsabilidad.',
        'age.license': 'Licenciado para entrega solo en NJ',
        'age.error_incomplete': 'Por favor, introduce tu fecha de nacimiento completa',
        'age.error_underage': 'Debes tener 21 años o más para acceder a este sitio',

        // Address Management
        'address.delivery_title': 'Dirección de Entrega',
        'address.saved_title': 'Direcciones Guardadas',
        'address.manage_msg': 'Gestiona tus destinos de envío',
        'address.add_new': 'Añadir Nueva',
        'address.update_details': 'Actualizar Detalles',
        'address.new_destination': 'Nuevo Destino',
        'address.full_name': 'Nombre Completo',
        'address.phone': 'Teléfono',
        'address.street': 'Dirección',
        'address.city': 'Ciudad',
        'address.state': 'Estado',
        'address.zip': 'Código Postal',
        'address.type': 'Tipo',
        'address.type_home': 'Casa',
        'address.type_work': 'Trabajo',
        'address.type_other': 'Otro',
        'address.use_default': 'Usar como predeterminada',
        'address.update': 'Actualizar',
        'address.save': 'Guardar Dirección',
        'address.cancel': 'Cancelar',
        'address.empty_msg': 'Tu libreta de direcciones está vacía',
        'address.default_badge': 'Predeterminado',

        // Footer
        'footer.navigation': 'Navegación',
        'footer.shop_all': 'Comprar Todo',
        'footer.my_profile': 'Mi Perfil',
        'footer.contact': 'Contacto',
        'footer.newsletter': 'Boletín informativo',
        'footer.subscribe_msg': 'Suscríbase a nuestro boletín para recibir las últimas actualizaciones y ofertas exclusivas.',
        'footer.email_placeholder': 'Introduce tu correo electrónico',
        'footer.subscribe': 'Suscribirse',
        'footer.follow_us': 'Síguenos',
        'footer.categories': 'Categorías',
        'footer.quick_links': 'Enlaces Rápidos',
        'footer.help': 'Ayuda y Soporte',
        'footer.privacy': 'Política de Privacidad',
        'footer.terms': 'Términos de Servicio',

        // Hero
        'hero.explore': 'Explorar Colección',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    l: (obj: any, field: string) => any;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved as Language) || 'en';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations['en']] || key;
    };

    /** Helper to get localized value from an object with optional translations field */
    const l = (obj: any, field: string): any => {
        if (!obj) return '';

        // Handle nested paths like 'hero.headline'
        const parts = field.split('.');

        const getNestedValue = (target: any, path: string[]) => {
            return path.reduce((acc, part) => acc?.[part], target);
        };

        // 1. Try to get localized value
        const localized = obj.translations?.[language];
        const localizedValue = localized ? getNestedValue(localized, parts) : undefined;

        if (localizedValue !== undefined) return localizedValue;

        // 2. Fallback to default value (English)
        const defaultValue = getNestedValue(obj, parts);

        return defaultValue ?? '';
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, l }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
    return context;
};
