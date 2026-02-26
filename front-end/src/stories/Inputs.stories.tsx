import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Search, Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'

const meta: Meta = {
    title: 'UI/Inputs',
    parameters: {
        docs: {
            description: {
                component:
                    "Form input patterns styled with the active theme's CSS variables. All inputs use border-input and ring-ring focus rings.",
            },
        },
        layout: 'padded',
    },
}
export default meta
type Story = StoryObj

function Input({
    label,
    type = 'text',
    placeholder,
    icon,
    error,
    hint,
    disabled,
}: {
    label?: string
    type?: string
    placeholder?: string
    icon?: React.ReactNode
    error?: string
    hint?: string
    disabled?: boolean
}) {
    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-foreground">{label}</label>
            )}
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={[
                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                        'ring-offset-background placeholder:text-muted-foreground',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        icon ? 'pl-9' : '',
                        error ? 'border-destructive focus-visible:ring-destructive' : '',
                    ]
                        .filter(Boolean)
                        .join(' ')}
                />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
    )
}

function PasswordInput({ label }: { label?: string }) {
    const [show, setShow] = useState(false)
    return (
        <div className="space-y-1.5">
            {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
        </div>
    )
}

export const TextInput: Story = {
    render: () => (
        <div className="max-w-sm space-y-4">
            <Input label="Full Name" placeholder="John Doe" icon={<User className="h-4 w-4" />} />
            <Input label="Email" type="email" placeholder="hello@inventure.ai" icon={<Mail className="h-4 w-4" />} />
            <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" icon={<Phone className="h-4 w-4" />} />
        </div>
    ),
}

export const SearchInput: Story = {
    render: () => (
        <div className="max-w-sm">
            <Input placeholder="Search products…" icon={<Search className="h-4 w-4" />} />
        </div>
    ),
}

export const PasswordField: Story = {
    render: () => (
        <div className="max-w-sm">
            <PasswordInput label="Password" />
        </div>
    ),
}

export const ValidationStates: Story = {
    render: () => (
        <div className="max-w-sm space-y-4">
            <Input
                label="Email (success)"
                type="email"
                placeholder="you@example.com"
                hint="Looks good!"
            />
            <Input
                label="Email (error)"
                type="email"
                placeholder="you@example.com"
                error="Please enter a valid email address."
            />
            <Input label="Disabled" placeholder="Cannot edit" disabled />
        </div>
    ),
}

export const TextArea: Story = {
    render: () => (
        <div className="max-w-sm space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Description</label>
            <textarea
                rows={4}
                placeholder="Tell us about your project…"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
            />
            <p className="text-xs text-muted-foreground">0 / 500 characters</p>
        </div>
    ),
}

export const SelectDropdown: Story = {
    render: () => (
        <div className="max-w-sm space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Category</label>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option>Grocery</option>
                <option>Fashion</option>
                <option>Liquor</option>
                <option>Restaurant</option>
            </select>
        </div>
    ),
}

export const LoginForm: Story = {
    render: () => (
        <div className="max-w-sm mx-auto border border-border rounded-xl p-8 bg-card shadow-sm space-y-5">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-card-foreground">Sign in</h2>
                <p className="text-sm text-muted-foreground mt-1">Welcome back to Inventure</p>
            </div>
            <Input label="Email" type="email" placeholder="you@inventure.ai" icon={<Mail className="h-4 w-4" />} />
            <PasswordInput label="Password" />
            <button className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                Sign in
            </button>
            <p className="text-center text-xs text-muted-foreground">
                Don't have an account?{' '}
                <a href="#" className="text-primary underline underline-offset-2">
                    Create one
                </a>
            </p>
        </div>
    ),
    parameters: { controls: { disable: true } },
}
