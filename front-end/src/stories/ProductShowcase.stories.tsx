import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ShoppingCart, Star, Heart, Share2, ChevronLeft, ChevronRight, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const meta: Meta = {
    title: 'Compositions/Product Showcase',
    parameters: {
        docs: {
            description: {
                component:
                    'Full product-page compositions that assemble multiple themed components together. Switch theme from the toolbar to see the complete visual transformation.',
            },
        },
        layout: 'padded',
    },
}
export default meta
type Story = StoryObj

const PRODUCTS = [
    { id: 1, name: 'Organic Avocados', price: 4.99, rating: 4.8, category: 'Grocery', reviews: 312 },
    { id: 2, name: 'Leather Jacket', price: 249.0, rating: 4.6, category: 'Fashion', reviews: 89 },
    { id: 3, name: 'Single Malt Whisky', price: 89.99, rating: 4.9, category: 'Liquor', reviews: 147 },
    { id: 4, name: 'Wagyu Burger', price: 22.5, rating: 4.7, category: 'Restaurant', reviews: 258 },
]

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    className={`h-3 w-3 ${i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                        }`}
                />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">({rating})</span>
        </div>
    )
}

function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
    const [liked, setLiked] = useState(false)
    return (
        <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-44 bg-primary/10 flex items-center justify-center">
                <Package className="h-20 w-20 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                <button
                    onClick={() => setLiked(!liked)}
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                >
                    <Heart
                        className={`h-4 w-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                    />
                </button>
                <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                    {product.category}
                </span>
            </div>
            <CardHeader className="pb-1 pt-4">
                <CardTitle className="text-base">{product.name}</CardTitle>
                <Stars rating={product.rating} />
                <CardDescription className="text-xs">{product.reviews} reviews</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between pt-0">
                <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                <Button size="sm">
                    <ShoppingCart className="h-4 w-4" />
                    Add
                </Button>
            </CardContent>
        </Card>
    )
}

export const ProductGrid: Story = {
    render: () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
                    <p className="text-sm text-muted-foreground">Handpicked just for you</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PRODUCTS.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    ),
    parameters: { controls: { disable: true } },
}

export const ProductDetail: Story = {
    render: () => {
        const product = PRODUCTS[0]
        return (
            <div className="max-w-2xl border border-border rounded-2xl overflow-hidden shadow-sm bg-card">
                <div className="grid md:grid-cols-2">
                    <div className="h-64 md:h-auto bg-primary/10 flex items-center justify-center">
                        <Package className="h-24 w-24 text-primary opacity-70" />
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                                {product.category}
                            </span>
                            <h2 className="text-2xl font-bold text-card-foreground mt-1">{product.name}</h2>
                            <Stars rating={product.rating} />
                            <p className="text-sm text-muted-foreground mt-1">{product.reviews} verified reviews</p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-6">
                            Premium quality product sourced from trusted suppliers. Delivered fresh to your doorstep
                            within 24 hours.
                        </p>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
                            <span className="text-sm line-through text-muted-foreground">${(product.price * 1.2).toFixed(2)}</span>
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">17% OFF</span>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button className="flex-1">
                                <ShoppingCart className="h-4 w-4" />
                                Add to Cart
                            </Button>
                            <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
                            <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    parameters: { controls: { disable: true } },
}
