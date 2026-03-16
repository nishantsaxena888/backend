import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

// ── Core Primitives ──────────────────────────────────────────────────────────
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// ── Cards ────────────────────────────────────────────────────────────────────
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

// ── Feedback ─────────────────────────────────────────────────────────────────
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

// ── Avatar ───────────────────────────────────────────────────────────────────
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// ── Overlays ─────────────────────────────────────────────────────────────────
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

// ── Navigation ───────────────────────────────────────────────────────────────
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

// ── Form Controls ────────────────────────────────────────────────────────────
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// ── Table ────────────────────────────────────────────────────────────────────
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// ── Icons ────────────────────────────────────────────────────────────────────
import {
    Info, AlertTriangle, ShoppingCart, Heart, Star,
    Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
    ChevronRight
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────

const meta: Meta = {
    title: 'Phase 1 — UI Library',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: '**Phase 1 complete** — All 47 shadcn/ui primitives are now available in `front-end/src/components/ui/`. Browse each section below to see every component rendering with the active theme.',
            },
        },
    },
}
export default meta
type Story = StoryObj

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────
function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
    return (
        <div className="space-y-3 py-4">
            <div className="border-b border-border pb-2">
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
            </div>
            <div className="flex flex-wrap gap-3 items-start">{children}</div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// OVERVIEW — All component categories at a glance
// ─────────────────────────────────────────────────────────────────────────────
export const Overview: Story = {
    name: '📦 Phase 1 Overview',
    render: () => (
        <div className="space-y-2 max-w-4xl">
            <div className="rounded-xl bg-primary/10 border border-primary/20 p-5 mb-6">
                <h1 className="text-2xl font-bold text-primary mb-1">✅ Phase 1 — shadcn/ui Library Complete</h1>
                <p className="text-sm text-muted-foreground">
                    47 components copied from <code className="font-mono bg-muted px-1 rounded text-xs">theme/Ecom/emerald-grocery/src/components/ui/</code> into{' '}
                    <code className="font-mono bg-muted px-1 rounded text-xs">front-end/src/components/ui/</code>.
                    All imports fixed. Zero TypeScript errors. Switch the <strong>🎨 Theme</strong> toolbar to see every component adapt.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: 'Core', count: 6, items: 'Button, Input, Textarea, Label, Badge, Separator' },
                    { label: 'Layout', count: 5, items: 'Card, Accordion, Tabs, Separator, Scroll Area' },
                    { label: 'Overlay', count: 5, items: 'Dialog, Sheet, Tooltip, Popover, Alert Dialog' },
                    { label: 'Form Controls', count: 7, items: 'Checkbox, Radio, Switch, Slider, Select, Toggle' },
                    { label: 'Navigation', count: 5, items: 'Breadcrumb, Pagination, Navigation Menu, Menubar, Sidebar' },
                    { label: 'Feedback', count: 4, items: 'Alert, Progress, Skeleton, Sonner' },
                    { label: 'Display', count: 5, items: 'Avatar, Table, Chart, Carousel, Calendar' },
                    { label: 'Utility', count: 10, items: 'Command, Drawer, Collapsible, Resizable, Context Menu, Hover Card…' },
                ].map(({ label, count, items }) => (
                    <Card key={label} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-foreground">{label}</span>
                            <Badge variant="secondary">{count}</Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{items}</p>
                    </Card>
                ))}
            </div>
        </div>
    ),
    parameters: { controls: { disable: true } },
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. CORE PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────
export const CorePrimitives: Story = {
    name: '1 · Core Primitives',
    render: () => (
        <div className="max-w-3xl space-y-1">
            <Section title="Button — 6 variants" description="bg-primary, destructive, outline, secondary, ghost, link">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
            </Section>

            <Section title="Button sizes">
                <Button size="lg">Large</Button>
                <Button size="default">Default</Button>
                <Button size="sm">Small</Button>
                <Button size="icon"><ShoppingCart className="h-4 w-4" /></Button>
            </Section>

            <Section title="Badge — variants">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
            </Section>

            <Section title="Input + Label">
                <div className="space-y-1.5 w-64">
                    <Label htmlFor="email-demo">Email address</Label>
                    <Input id="email-demo" type="email" placeholder="you@inventure.ai" />
                </div>
                <div className="space-y-1.5 w-64">
                    <Label htmlFor="pwd-demo">Password</Label>
                    <Input id="pwd-demo" type="password" placeholder="••••••••" />
                </div>
            </Section>

            <Section title="Textarea">
                <div className="space-y-1.5 w-64">
                    <Label htmlFor="ta-demo">Notes</Label>
                    <Textarea id="ta-demo" placeholder="Write something…" rows={3} />
                </div>
            </Section>

            <Section title="Separator">
                <div className="w-64 space-y-2">
                    <p className="text-sm text-foreground">Above the line</p>
                    <Separator />
                    <p className="text-sm text-muted-foreground">Below the line</p>
                </div>
            </Section>
        </div>
    ),
    parameters: { controls: { disable: true } },
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. FORM CONTROLS
// ─────────────────────────────────────────────────────────────────────────────
export const FormControls: Story = {
    name: '2 · Form Controls',
    render: () => {
        const [sliderVal, setSliderVal] = useState([40])
        return (
            <div className="max-w-3xl space-y-1">
                <Section title="Checkbox">
                    {['Grocery', 'Fashion', 'Liquor', 'Restaurant'].map(label => (
                        <div key={label} className="flex items-center space-x-2">
                            <Checkbox id={`cb-${label}`} defaultChecked={label === 'Grocery'} />
                            <Label htmlFor={`cb-${label}`}>{label}</Label>
                        </div>
                    ))}
                </Section>

                <Section title="Radio Group">
                    <RadioGroup defaultValue="standard" className="space-y-1">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="r-standard" />
                            <Label htmlFor="r-standard">Standard delivery</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="r-express" />
                            <Label htmlFor="r-express">Express delivery</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pickup" id="r-pickup" />
                            <Label htmlFor="r-pickup">Store pickup</Label>
                        </div>
                    </RadioGroup>
                </Section>

                <Section title="Switch">
                    <div className="space-y-2">
                        {[
                            { label: 'Email notifications', defaultChecked: true },
                            { label: 'Push alerts', defaultChecked: false },
                            { label: 'Dark mode', defaultChecked: false },
                        ].map(({ label, defaultChecked }) => (
                            <div key={label} className="flex items-center justify-between w-56">
                                <Label>{label}</Label>
                                <Switch defaultChecked={defaultChecked} />
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title="Slider" description="Drag to adjust price range">
                    <div className="w-64 space-y-2">
                        <Slider value={sliderVal} onValueChange={setSliderVal} min={0} max={100} step={1} />
                        <p className="text-xs text-muted-foreground">Value: {sliderVal[0]}</p>
                    </div>
                </Section>

                <Section title="Select">
                    <Select>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="grocery">🥦 Grocery</SelectItem>
                            <SelectItem value="fashion">🖤 Fashion</SelectItem>
                            <SelectItem value="liquor">🥃 Liquor</SelectItem>
                            <SelectItem value="restaurant">🍽️ Restaurant</SelectItem>
                        </SelectContent>
                    </Select>
                </Section>

                <Section title="Toggle">
                    <Toggle><Bold className="h-4 w-4" /></Toggle>
                    <Toggle><Italic className="h-4 w-4" /></Toggle>
                    <Toggle><Underline className="h-4 w-4" /></Toggle>
                </Section>

                <Section title="Toggle Group — single select">
                    <ToggleGroup type="single" defaultValue="center">
                        <ToggleGroupItem value="left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
                        <ToggleGroupItem value="center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
                        <ToggleGroupItem value="right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
                    </ToggleGroup>
                </Section>
            </div>
        )
    },
    parameters: { controls: { disable: true } },
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. OVERLAYS & DIALOGS
// ─────────────────────────────────────────────────────────────────────────────
export const Overlays: Story = {
    name: '3 · Overlays & Dialogs',
    render: () => (
        <div className="max-w-3xl space-y-1">
            <Section title="Dialog — modal">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Order Confirmed 🎉</DialogTitle>
                            <DialogDescription>
                                Your order has been placed and will arrive in 30–45 min.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline">Back</Button>
                            <Button>Track Order</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Section>

            <Section title="Alert Dialog — destructive confirm">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete your account and all data. This cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Section>

            <Section title="Sheet — slide-in drawer">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline"><ShoppingCart className="h-4 w-4" /> Cart (3)</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Your Cart</SheetTitle>
                            <SheetDescription>3 items · $84.97</SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-4">
                            {['Organic Avocados — $4.99', 'Almond Milk — $3.49', 'Sourdough Bread — $6.99'].map(item => (
                                <div key={item} className="flex justify-between text-sm border-b border-border pb-3">
                                    <span className="text-foreground">{item.split('—')[0]}</span>
                                    <span className="text-muted-foreground">{item.split('—')[1]}</span>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full mt-6">Checkout</Button>
                    </SheetContent>
                </Sheet>
            </Section>

            <Section title="Tooltip">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
                        </TooltipTrigger>
                        <TooltipContent>Add to wishlist</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon"><Star className="h-4 w-4" /></Button>
                        </TooltipTrigger>
                        <TooltipContent>Rate this product</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </Section>

            <Section title="Popover">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Filter Options</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 space-y-3">
                        <p className="font-medium text-sm text-foreground">Price Range</p>
                        <Slider defaultValue={[20, 80]} min={0} max={100} step={1} />
                        <div className="flex gap-2 pt-1">
                            <Button size="sm" className="flex-1">Apply</Button>
                            <Button size="sm" variant="outline" className="flex-1">Reset</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </Section>
        </div>
    ),
    parameters: { controls: { disable: true } },
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. NAVIGATION & LAYOUT
// ─────────────────────────────────────────────────────────────────────────────
export const NavigationAndLayout: Story = {
    name: '4 · Navigation & Layout',
    render: () => (
        <div className="max-w-3xl space-y-1">
            <Section title="Tabs">
                <Tabs defaultValue="products" className="w-full">
                    <TabsList>
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>
                    <TabsContent value="products" className="text-sm text-muted-foreground pt-2">
                        Browse our curated product selection for this category.
                    </TabsContent>
                    <TabsContent value="reviews" className="text-sm text-muted-foreground pt-2">
                        Customer reviews and ratings updated daily.
                    </TabsContent>
                    <TabsContent value="details" className="text-sm text-muted-foreground pt-2">
                        Sourcing, nutrition facts, and shipping information.
                    </TabsContent>
                </Tabs>
            </Section>

            <Section title="Accordion — FAQ">
                <Accordion type="single" collapsible className="w-full max-w-md">
                    {[
                        { q: 'What is the delivery time?', a: 'Standard delivery takes 2–4 hours. Express is 30 minutes.' },
                        { q: 'Can I return an item?', a: 'Yes — within 7 days of purchase for eligible items.' },
                        { q: 'Is same-day delivery available?', a: 'Available in select areas. Check your pincode at checkout.' },
                    ].map((item, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-sm">{item.q}</AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Section>

            <Section title="Breadcrumb">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator><ChevronRight className="h-3 w-3" /></BreadcrumbSeparator>
                        <BreadcrumbItem><BreadcrumbLink href="#">Grocery</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator><ChevronRight className="h-3 w-3" /></BreadcrumbSeparator>
                        <BreadcrumbItem><BreadcrumbLink href="#">Dairy & Eggs</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator><ChevronRight className="h-3 w-3" /></BreadcrumbSeparator>
                        <BreadcrumbItem><BreadcrumbPage>Organic Milk</BreadcrumbPage></BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Section>
        </div>
    ),
    parameters: { controls: { disable: true } },
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. FEEDBACK & DISPLAY
// ─────────────────────────────────────────────────────────────────────────────
export const FeedbackAndDisplay: Story = {
    name: '5 · Feedback & Display',
    render: () => {
        const [progress, setProgress] = useState(68)
        return (
            <div className="max-w-3xl space-y-1">
                <Section title="Alert — variants">
                    <div className="space-y-3 w-full max-w-md">
                        <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription>New products have been added to your saved list.</AlertDescription>
                        </Alert>
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Out of stock</AlertTitle>
                            <AlertDescription>Some items in your cart are no longer available.</AlertDescription>
                        </Alert>
                    </div>
                </Section>

                <Section title="Progress">
                    <div className="w-72 space-y-3">
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Order progress</span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} />
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setProgress(p => Math.max(0, p - 10))}>−10</Button>
                            <Button size="sm" variant="outline" onClick={() => setProgress(p => Math.min(100, p + 10))}>+10</Button>
                        </div>
                    </div>
                </Section>

                <Section title="Skeleton — loading state">
                    <div className="space-y-3 w-72">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[160px]" />
                            </div>
                        </div>
                        <Skeleton className="h-[120px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-4 w-3/5" />
                        </div>
                    </div>
                </Section>

                <Section title="Avatar">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                        <AvatarFallback>FX</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">NS</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">+4</AvatarFallback>
                    </Avatar>
                </Section>
            </div>
        )
    },
    parameters: { controls: { disable: true } },
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. TABLE
// ─────────────────────────────────────────────────────────────────────────────
export const DataTable: Story = {
    name: '6 · Table',
    render: () => {
        const orders = [
            { id: '#ORD-001', product: 'Organic Avocados', qty: 2, price: '$9.98', status: 'Delivered' },
            { id: '#ORD-002', product: 'Sourdough Bread', qty: 1, price: '$6.99', status: 'In Transit' },
            { id: '#ORD-003', product: 'Almond Milk', qty: 3, price: '$10.47', status: 'Processing' },
            { id: '#ORD-004', product: 'Greek Yoghurt', qty: 2, price: '$7.98', status: 'Delivered' },
        ]
        const statusColor: Record<string, string> = {
            Delivered: 'text-green-600 bg-green-50',
            'In Transit': 'text-blue-600 bg-blue-50',
            Processing: 'text-yellow-700 bg-yellow-50',
        }
        return (
            <div className="max-w-2xl border border-border rounded-xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead className="text-center">Qty</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell className="font-mono text-xs text-muted-foreground">{order.id}</TableCell>
                                <TableCell className="font-medium">{order.product}</TableCell>
                                <TableCell className="text-center">{order.qty}</TableCell>
                                <TableCell className="text-right">{order.price}</TableCell>
                                <TableCell className="text-center">
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor[order.status]}`}>
                                        {order.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    },
    parameters: { controls: { disable: true } },
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. CARDS GALLERY
// ─────────────────────────────────────────────────────────────────────────────
export const CardsGallery: Story = {
    name: '7 · Cards',
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle>Product Card</CardTitle>
                    <CardDescription>Basic card with header + content</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Standard card layout using CardHeader, CardContent and CardFooter.</p>
                </CardContent>
                <CardFooter className="gap-2">
                    <Button size="sm">Buy Now</Button>
                    <Button size="sm" variant="outline">Save</Button>
                </CardFooter>
            </Card>

            <Card className="bg-primary text-primary-foreground border-0">
                <CardHeader>
                    <CardTitle className="text-primary-foreground">Primary Card</CardTitle>
                    <CardDescription className="text-primary-foreground/70">Uses primary CSS variable</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-primary-foreground/80">This entire card uses the active theme's primary colour.</p>
                </CardContent>
                <CardFooter>
                    <Button variant="secondary" size="sm">Learn More</Button>
                </CardFooter>
            </Card>

            <Card className="border-2 border-primary">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Stats</CardTitle>
                        <Badge>Live</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {[
                        { label: 'Revenue', value: '$24,350', icon: '📈' },
                        { label: 'Orders', value: '1,247', icon: '📦' },
                        { label: 'Customers', value: '892', icon: '👥' },
                    ].map(({ label, value, icon }) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{icon} {label}</span>
                            <span className="font-semibold text-foreground">{value}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    ),
    parameters: { controls: { disable: true } },
}
