import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/layout/Navbar'

const meta: Meta<typeof Navbar> = {
    title: 'Layout/Navbar',
    component: Navbar,
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
type Story = StoryObj<typeof Navbar>

export const Default: Story = {}
