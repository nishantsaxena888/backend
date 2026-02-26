import type { Meta, StoryObj } from '@storybook/react-vite'
import { THEMES } from '../../.storybook/preview'
import { useEffect } from 'react'

// A mini component that renders one theme swatch
function ThemeSwatch({ theme }: { theme: (typeof THEMES)[0] }) {
    useEffect(() => {
        // nothing — the global theme decorator handles htmlElement classes
    }, [])
    return (
        <div
            className={`theme-${theme.value} rounded-xl border overflow-hidden shadow-md transition-all hover:scale-105 hover:shadow-xl`}
        >
            <div className="bg-primary h-16 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">{theme.label}</span>
            </div>
            <div className="bg-background p-3 space-y-2">
                <div className="flex gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                        Primary
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        Secondary
                    </span>
                </div>
                <div className="h-1 rounded-full bg-border" />
                <p className="text-xs text-muted-foreground">muted-foreground text</p>
                <p className="text-xs text-foreground font-semibold">foreground text</p>
            </div>
        </div>
    )
}

const meta: Meta = {
    title: 'Design System/Theme Palette',
    parameters: {
        docs: {
            description: {
                component:
                    'All 8 available themes displayed side-by-side. Use the toolbar at the top to switch the live theme across all stories.',
            },
        },
        layout: 'padded',
    },
}
export default meta
type Story = StoryObj

export const AllThemes: Story = {
    render: () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">🎨 Theme Palette</h2>
                <p className="text-muted-foreground text-sm mb-4">
                    This project ships with 8 hand-crafted themes. Use the <strong>🎨 Theme</strong> toolbar
                    (top of Storybook) to switch the live theme for all stories simultaneously.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {THEMES.map((t) => (
                    <ThemeSwatch key={t.value} theme={t} />
                ))}
            </div>
            <div className="mt-8 rounded-xl border bg-card p-6">
                <h3 className="font-semibold text-card-foreground mb-4">CSS Variables in use</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: 'background', cls: 'bg-background border' },
                        { label: 'foreground', cls: 'bg-foreground' },
                        { label: 'primary', cls: 'bg-primary' },
                        { label: 'primary-fg', cls: 'bg-primary-foreground border' },
                        { label: 'secondary', cls: 'bg-secondary' },
                        { label: 'muted', cls: 'bg-muted' },
                        { label: 'accent', cls: 'bg-accent' },
                        { label: 'destructive', cls: 'bg-destructive' },
                    ].map(({ label, cls }) => (
                        <div key={label} className="flex flex-col gap-1">
                            <div className={`${cls} h-10 rounded-md`} />
                            <span className="text-xs text-muted-foreground font-mono">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ),
    parameters: { controls: { disable: true } },
}
