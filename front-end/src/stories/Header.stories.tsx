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

export const Default: Story = {}

export const WithLightBackground: Story = {
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
