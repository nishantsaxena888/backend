import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from '@/components/theme-provider'
import { NavBar } from '@/components/layout/Navbar'
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

const meta: Meta<typeof NavBar> = {
    title: 'Layout/Navbar',
    component: NavBar,
    decorators: [
        (Story) => (
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'The navigation bar with category mega-menus built on Radix UI NavigationMenu. Switch themes from the toolbar to see how the hover/focus states adapt.',
            },
        },
    },
}
export default meta
type Story = StoryObj<typeof NavBar>

export const Default: Story = {
    args: {
        config: MOCK_CONFIG,
    }
}
