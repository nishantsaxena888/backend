import type { Meta, StoryObj } from '@storybook/react-vite'
import { Star, TrendingUp, Package } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Card> = {
    title: 'UI/Card',
    component: Card,
    parameters: {
        docs: {
            description: {
                component:
                    'A flexible card container that responds to the active theme. Use CardHeader, CardTitle, CardDescription, CardContent, and CardFooter to compose rich card layouts.',
            },
        },
    },
}
export default meta
type Story = StoryObj<typeof Card>

// ── Simple ───────────────────────────────────────────────────────────────────
export const Simple: Story = {
    render: () => (
        <Card className="max-w-sm">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>A short description about this card.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    This is the main content area of the card. It can contain any React children.
                </p>
            </CardContent>
        </Card>
    ),
}

// ── With Footer ───────────────────────────────────────────────────────────────
export const WithFooter: Story = {
    render: () => (
        <Card className="max-w-sm">
            <CardHeader>
                <CardTitle>New Feature</CardTitle>
                <CardDescription>Available in the Pro plan</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Unlock advanced analytics and unlimited exports with the Pro plan.
                </p>
            </CardContent>
            <CardFooter className="gap-2">
                <Button>Upgrade</Button>
                <Button variant="outline">Learn more</Button>
            </CardFooter>
        </Card>
    ),
}

// ── Product Card ─────────────────────────────────────────────────────────────
export const ProductCard: Story = {
    render: () => (
        <Card className="max-w-xs overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-40 bg-primary/10 flex items-center justify-center">
                <Package className="h-16 w-16 text-primary" />
            </div>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Premium Coffee</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-yellow-500 font-semibold">
                        <Star className="h-3 w-3 fill-yellow-500" />
                        4.9
                    </div>
                </div>
                <CardDescription>Single-origin Arabica beans</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
                <span className="text-xl font-bold text-primary">$24.99</span>
                <Button size="sm"><ShoppingCart className="h-4 w-4" /> Add</Button>
            </CardFooter>
        </Card>
    ),
}

// ── Stats Card ────────────────────────────────────────────────────────────────
export const StatsCard: Story = {
    render: () => (
        <div className="grid grid-cols-3 gap-4 max-w-2xl">
            {[
                { label: 'Total Revenue', value: '$45,231', trend: '+20.1%' },
                { label: 'Orders', value: '2,350', trend: '+15.3%' },
                { label: 'Active Users', value: '1,247', trend: '+8.7%' },
            ].map((stat) => (
                <Card key={stat.label}>
                    <CardHeader className="pb-2">
                        <CardDescription>{stat.label}</CardDescription>
                        <CardTitle className="text-2xl">{stat.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                            <TrendingUp className="h-3 w-3" />
                            {stat.trend} from last month
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    ),
}

// ── Grid of cards ────────────────────────────────────────────────────────────
export const CardGrid: Story = {
    render: () => (
        <div className="grid grid-cols-2 gap-4 max-w-xl">
            {['Grocery', 'Fashion', 'Liquor', 'Restaurant'].map((name) => (
                <Card
                    key={name}
                    className="flex flex-col items-center p-6 space-y-2 text-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-base">{name}</CardTitle>
                    <CardDescription className="text-xs">Explore our {name.toLowerCase()} collection</CardDescription>
                </Card>
            ))}
        </div>
    ),
}

function ShoppingCart(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
    )
}
