import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
    title: 'UI/Badges & Tags',
    parameters: {
        docs: {
            description: {
                component: 'Badge and tag components that derive their colours from the active theme palette.',
            },
        },
        layout: 'padded',
    },
}
export default meta
type Story = StoryObj

function Badge({
    children,
    variant = 'default',
    size = 'default',
}: {
    children: React.ReactNode
    variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning'
    size?: 'default' | 'sm' | 'lg'
}) {
    const variants = {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border border-border text-foreground bg-transparent',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    }
    const sizes = {
        sm: 'px-1.5 py-0 text-[10px]',
        default: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
    }
    return (
        <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
            {children}
        </span>
    )
}

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-3 items-center">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
        </div>
    ),
}

export const AllSizes: Story = {
    render: () => (
        <div className="flex gap-3 items-center">
            <Badge size="sm">Small</Badge>
            <Badge size="default">Default</Badge>
            <Badge size="lg">Large</Badge>
        </div>
    ),
}

export const WithDot: Story = {
    render: () => (
        <div className="flex flex-wrap gap-3 items-center">
            {[
                { label: 'Online', color: 'bg-green-500' },
                { label: 'In Progress', color: 'bg-yellow-500' },
                { label: 'Offline', color: 'bg-red-500' },
                { label: 'Idle', color: 'bg-gray-400' },
            ].map(({ label, color }) => (
                <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-border bg-background text-foreground"
                >
                    <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
                    {label}
                </span>
            ))}
        </div>
    ),
}

export const CategoryTags: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {['Grocery', 'Fashion', 'Liquor', 'Restaurant', 'Electronics', 'Beauty', 'Sports', 'Home'].map(
                    (tag) => (
                        <button
                            key={tag}
                            className="px-3 py-1 rounded-full text-sm border border-border bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-150"
                        >
                            {tag}
                        </button>
                    ),
                )}
            </div>
            <p className="text-xs text-muted-foreground">Click to toggle (hover preview)</p>
        </div>
    ),
}

export const ProductLabels: Story = {
    render: () => (
        <div className="flex flex-col gap-3">
            <div className="flex gap-2 flex-wrap">
                <Badge variant="destructive">🔥 Hot</Badge>
                <Badge variant="default">New</Badge>
                <Badge variant="secondary">Sale</Badge>
                <Badge variant="success">In Stock</Badge>
                <Badge variant="outline">Limited</Badge>
                <Badge variant="warning">Low Stock</Badge>
            </div>
        </div>
    ),
}
