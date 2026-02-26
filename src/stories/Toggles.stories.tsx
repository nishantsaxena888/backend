import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Check } from 'lucide-react'

const meta: Meta = {
    title: 'UI/Toggles & Checkboxes',
    parameters: {
        docs: {
            description: {
                component: 'Toggle switches and checkbox components styled with the active theme.',
            },
        },
        layout: 'padded',
    },
}
export default meta
type Story = StoryObj

function Toggle({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
    const [checked, setChecked] = useState(defaultChecked)
    return (
        <div className="flex items-center justify-between gap-8">
            <span className="text-sm text-foreground">{label}</span>
            <button
                role="switch"
                aria-checked={checked}
                onClick={() => setChecked(!checked)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${checked ? 'bg-primary' : 'bg-muted'
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    )
}

function Checkbox({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
    const [checked, setChecked] = useState(defaultChecked)
    return (
        <label className="flex items-center gap-3 cursor-pointer select-none">
            <span
                onClick={() => setChecked(!checked)}
                className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${checked ? 'bg-primary border-primary' : 'border-border bg-background'
                    }`}
            >
                {checked && <Check className="h-3 w-3 text-primary-foreground" />}
            </span>
            <span className="text-sm text-foreground">{label}</span>
        </label>
    )
}

export const Toggles: Story = {
    render: () => (
        <div className="max-w-xs space-y-4 border border-border rounded-xl p-6 bg-card">
            <h3 className="font-semibold text-card-foreground">Notifications</h3>
            <Toggle label="Email notifications" defaultChecked />
            <Toggle label="Push notifications" />
            <Toggle label="SMS alerts" />
            <Toggle label="Marketing emails" defaultChecked />
        </div>
    ),
}

export const Checkboxes: Story = {
    render: () => (
        <div className="max-w-xs space-y-3 border border-border rounded-xl p-6 bg-card">
            <h3 className="font-semibold text-card-foreground">Filters</h3>
            <Checkbox label="Grocery" defaultChecked />
            <Checkbox label="Fashion" />
            <Checkbox label="Liquor" defaultChecked />
            <Checkbox label="Restaurant" />
        </div>
    ),
}

export const MixedForm: Story = {
    render: () => (
        <div className="max-w-sm space-y-5 border border-border rounded-xl p-6 bg-card">
            <h3 className="text-lg font-semibold text-card-foreground">Account Preferences</h3>
            <div className="space-y-3">
                <Checkbox label="Subscribe to weekly digest" defaultChecked />
                <Checkbox label="Accept promotional offers" />
                <Checkbox label="Share usage data to improve Inventure" defaultChecked />
            </div>
            <div className="border-t border-border pt-4 space-y-3">
                <Toggle label="Dark mode" />
                <Toggle label="Compact view" defaultChecked />
                <Toggle label="Show prices without tax" />
            </div>
            <button className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                Save preferences
            </button>
        </div>
    ),
}
