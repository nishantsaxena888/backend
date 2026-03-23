import type { Meta, StoryObj } from '@storybook/react'
import { Header } from '@/components/layout/Header'
import { NavBar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/layout/HeroSection'
import { ProductGrid } from '@/components/commerce/ProductGrid'
import { ProfileView } from '@/components/commerce/ProfileView'
import { AppliedFiltersBar } from '@/components/commerce/AppliedFiltersBar'
import { AgeVerification } from '@/components/commerce/AgeVerification'
import { AuthModal } from '@/components/commerce/AuthModal'
import { Checkout } from '@/components/commerce/Checkout'
import { ProductDetail } from '@/components/commerce/ProductDetail'
import { AddressManager } from '@/components/commerce/AddressManager'
import { ThemeProvider } from '@/components/theme-provider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getProducts } from '@/mock/api'
import type { Product, ClientConfig } from '@/mock/types'
import { useState, useEffect } from 'react'

const meta: Meta = {
    title: 'Commerce Engine/Components',
    decorators: [
        (Story) => (
            <ThemeProvider defaultTheme="emerald-grocery">
                <div className="min-h-screen bg-background text-foreground">
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
}

export default meta
type Story = StoryObj

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

// ── 1. Header ────────────────────────────────────────────────────────────────
export const SiteHeader: Story = {
    render: () => (
        <Header
            config={MOCK_CONFIG}
            cartCount={3}
            onCartClick={() => { }}
            onCategorySelect={() => { }}
            user={null}
            onSignInClick={() => { }}
            onSignOut={() => { }}
            onProfileClick={() => { }}
            deliveryCity="New York"
            wishlistCount={0}
            onWishlistClick={() => { }}
        />
    )
}

// ── 2. Navigation ────────────────────────────────────────────────────────────
export const Navigation: Story = {
    render: () => (
        <div className="p-8">
            <NavBar
                config={MOCK_CONFIG}
                selectedCategory="Vegetables"
                onCategoryChange={() => { }}
            />
        </div>
    )
}

// ── 3. Hero ──────────────────────────────────────────────────────────────────
export const Hero: Story = {
    render: () => <HeroSection config={MOCK_CONFIG} />
}

// ── 4. Filters Bar ────────────────────────────────────────────────────────────
export const Filters: Story = {
    render: () => (
        <div className="p-8">
            <AppliedFiltersBar
                priceRange={[20, 100]}
                selectedCategory="Dairy"
                productCount={42}
                onClearAll={() => { }}
                onRemoveCategory={() => { }}
                onRemovePrice={() => { }}
                sortBy="newest"
                onSortChange={() => { }}
            />
        </div>
    )
}

// ── 5. Product Grid (Responsive) ─────────────────────────────────────────────
export const Products: Story = {
    render: () => {
        const [products, setProducts] = useState<Product[]>([])
        useEffect(() => {
            getProducts('emerald-grocery').then(setProducts)
        }, [])

        return (
            <div className="p-8 space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter">Responsive Catalog</h2>
                        <p className="text-muted-foreground font-medium">Resize screen to see grid adapt (1 to 4 cols)</p>
                    </div>
                    <Badge variant="outline" className="h-8 rounded-full px-4">Live Mock Data</Badge>
                </div>
                <ProductGrid
                    products={products}
                    config={MOCK_CONFIG}
                    cartItems={[{ id: 'p1', qty: 2 }]}
                    wishlist={['p2']}
                    onAddToCart={() => { }}
                    onChangeQty={() => { }}
                    onToggleWishlist={() => { }}
                    onProductSelect={() => { }}
                />
            </div>
        )
    }
}

// ── 6. Auth Modal ────────────────────────────────────────────────────────────
export const Authentication: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <div className="p-20 flex justify-center">
                <Button size="lg" onClick={() => setOpen(true)} className="rounded-2xl h-16 px-10 font-bold">Open Auth Experience</Button>
                <AuthModal
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    config={MOCK_CONFIG}
                    onAuthSuccess={() => { }}
                />
            </div>
        )
    }
}

// ── 7. Checkout Process ───────────────────────────────────────────────────────
export const CheckoutFlow: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        const [items, setItems] = useState<(Product & { quantity: number })[]>([])
        useEffect(() => {
            getProducts('emerald-grocery').then(p => {
                setItems(p.slice(0, 3).map(x => ({ ...x, quantity: 1 })))
            })
        }, [])

        return (
            <div className="p-20 flex justify-center">
                <Button size="lg" onClick={() => setOpen(true)} className="rounded-2xl h-16 px-10 font-bold">Start Checkout Flow</Button>
                <Checkout
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    items={items}
                    config={MOCK_CONFIG}
                    onClearCart={() => { }}
                />
            </div>
        )
    }
}

// ── 8. Product Detail ────────────────────────────────────────────────────────
export const QuickView: Story = {
    render: () => {
        const [product, setProduct] = useState<Product | null>(null)
        useEffect(() => {
            getProducts('emerald-grocery').then(p => setProduct(p[0]))
        }, [])

        return (
            <div className="p-20 flex justify-center">
                {product ? (
                    <ProductDetail
                        product={product}
                        config={MOCK_CONFIG}
                        onAddToCart={() => { }}
                        trigger={
                            <Button size="lg" className="rounded-2xl h-16 px-10 font-bold">Quick View Product</Button>
                        }
                    />
                ) : (
                    <p>Loading product...</p>
                )}
            </div>
        )
    }
}

// ── 9. Profile Dashboard ─────────────────────────────────────────────────────
export const MemberProfile: Story = {
    render: () => (
        <div className="bg-muted/30 py-12">
            <ProfileView
                user={{ name: 'Nishant Saxena', email: 'nishant@inventure.ai' }}
                config={MOCK_CONFIG}
                onSignOut={() => { }}
                onClose={() => { }}
            />
        </div>
    )
}

// ── 10. Age Gate ─────────────────────────────────────────────────────────────
export const AgeGate: Story = {
    render: () => (
        <div className="h-[600px] flex items-center justify-center bg-muted/20 border-2 border-dashed border-border rounded-[40px] m-8">
            <AgeVerification
                config={{ ...MOCK_CONFIG, type: 'liquor', name: 'Vintner Reserve', logoIcon: '🍷' }}
                onVerified={() => alert('Verified!')}
            />
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Entry Gated Mode</p>
        </div>
    )
}

// ── 11. Address Book ─────────────────────────────────────────────────────────
export const AddressBook: Story = {
    render: () => (
        <div className="p-8 max-w-xl mx-auto">
            <AddressManager mode="manage" />
        </div>
    )
}
