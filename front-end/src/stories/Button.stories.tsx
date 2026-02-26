import type { Meta, StoryObj } from '@storybook/react-vite'
import { ShoppingCart, ArrowRight, Trash2, Heart, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        docs: {
            description: {
                component:
                    'A versatile button component built with CVA. Supports 6 variants and 4 sizes. Colours are driven by CSS theme variables.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
            description: 'Visual style of the button',
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon'],
            description: 'Size variant',
        },
        disabled: { control: 'boolean' },
        children: { control: 'text' },
    },
}
export default meta
type Story = StoryObj<typeof Button>

// ── Playground ──────────────────────────────────────────────────────────────
export const Playground: Story = {
    args: {
        children: 'Button',
        variant: 'default',
        size: 'default',
    },
}

// ── All Variants ─────────────────────────────────────────────────────────────
export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 items-center">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
        </div>
    ),
    parameters: { controls: { disable: true } },
}

// ── All Sizes ────────────────────────────────────────────────────────────────
export const AllSizes: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 items-center">
            <Button size="lg">Large</Button>
            <Button size="default">Default</Button>
            <Button size="sm">Small</Button>
            <Button size="icon"><Plus /></Button>
        </div>
    ),
    parameters: { controls: { disable: true } },
}

// ── With Icons ───────────────────────────────────────────────────────────────
export const WithIcons: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 items-center">
            <Button><ShoppingCart /> Add to Cart</Button>
            <Button variant="outline"><Heart /> Save</Button>
            <Button variant="secondary">
                Continue <ArrowRight />
            </Button>
            <Button variant="destructive"><Trash2 /> Delete</Button>
            <Button size="icon" variant="outline"><Plus /></Button>
        </div>
    ),
    parameters: { controls: { disable: true } },
}

// ── Disabled states ──────────────────────────────────────────────────────────
export const DisabledStates: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4 items-center">
            <Button disabled>Default</Button>
            <Button disabled variant="destructive">Destructive</Button>
            <Button disabled variant="outline">Outline</Button>
            <Button disabled variant="secondary">Secondary</Button>
        </div>
    ),
    parameters: { controls: { disable: true } },
}

// ── Loading spinner ──────────────────────────────────────────────────────────
export const Loading: Story = {
    render: () => (
        <Button disabled>
            <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
            </svg>
            Loading…
        </Button>
    ),
    parameters: { controls: { disable: true } },
}
