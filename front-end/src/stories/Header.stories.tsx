import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/Header'

const meta: Meta<typeof Header> = {
    title: 'Layout/Header',
    component: Header,
    decorators: [
        (Story) => (
            <ThemeProvider>
                <div className="min-h-[200px]">
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'The sticky site header with the Inventure brand logo, theme switcher dropdown, and primary CTA button. The theme switcher calls `setTheme()` from the ThemeProvider context. Try switching themes via the toolbar — the header colours will update.',
            },
        },
    },
}
export default meta
type Story = StoryObj<typeof Header>

import type { ClientConfig } from '@/mock/types'

const MOCK_CONFIG: ClientConfig = {
    id: 'emerald-grocery',
    name: 'Emerald Grocery',
    type: 'grocery' as const,
    logoIcon: '🥦',
    tagline: 'Fresh from farm to your door',
    topBarMessage: 'Free delivery on orders over $50!',
    categories: ['Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Meat'],
    hero: {
        badge: 'NEW ARRIVALS',
        headline: 'Organic Freshness Delivered',
        subheadline: 'Shop the best local produce and grocery essentials with same-day delivery.',
        cta: 'Shop Now'
    },
    freeDeliveryThreshold: 50,
    phone: '1-800-EMERALD',
    hours: '8 AM - 10 PM'
}

export const Default: Story = {
    args: {
        config: MOCK_CONFIG,
        cartCount: 2,
        onCartClick: () => { },
        user: { name: 'Nishant', email: 'nishant@example.com' }
    }
}

export const WithLightBackground: Story = {
    args: {
        config: MOCK_CONFIG,
        cartCount: 0,
        onCartClick: () => { }
    },
    decorators: [
        (Story) => (
            <ThemeProvider defaultTheme="grey-grocery">
                <div className="min-h-[200px] bg-background">
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
}

export const GoldLuxury: Story = {
    args: {
        config: { ...MOCK_CONFIG, id: 'fashion-gold-luxury', logoIcon: '✨', name: 'Gold Luxury' },
        cartCount: 5,
        onCartClick: () => { }
    },
    decorators: [
        (Story) => (
            <ThemeProvider defaultTheme="fashion-gold-luxury">
                <div className="min-h-[200px] bg-background">
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
}
