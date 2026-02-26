import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
    title: 'Design System/Typography',
    parameters: {
        docs: {
            description: {
                component:
                    'Base typography styles driven by CSS variables. All colours automatically adapt to the selected theme.',
            },
        },
        layout: 'padded',
    },
}
export default meta
type Story = StoryObj

export const Headings: Story = {
    render: () => (
        <div className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground">Heading 1 — 5xl</h1>
            <h2 className="text-4xl font-bold tracking-tight text-foreground">Heading 2 — 4xl</h2>
            <h3 className="text-3xl font-semibold text-foreground">Heading 3 — 3xl</h3>
            <h4 className="text-2xl font-semibold text-foreground">Heading 4 — 2xl</h4>
            <h5 className="text-xl font-medium text-foreground">Heading 5 — xl</h5>
            <h6 className="text-lg font-medium text-foreground">Heading 6 — lg</h6>
        </div>
    ),
}

export const Body: Story = {
    render: () => (
        <div className="max-w-prose space-y-4">
            <p className="text-base leading-7 text-foreground">
                <strong>Body Regular:</strong> The quick brown fox jumps over the lazy dog. Inventure
                Platform brings one universal layout to every commerce vertical — grocery, fashion, liquor,
                and restaurant — simply by switching a CSS theme class.
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
                <strong>Body Small / Muted:</strong> Supporting text that provides additional context.
                Should remain readable and contrast well against the background colour of the active theme.
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Overline / Label — Extra Small Uppercase
            </p>
        </div>
    ),
}

export const Colours: Story = {
    render: () => (
        <div className="space-y-2">
            {[
                { cls: 'text-foreground', label: 'Foreground' },
                { cls: 'text-primary', label: 'Primary' },
                { cls: 'text-secondary-foreground', label: 'Secondary Foreground' },
                { cls: 'text-muted-foreground', label: 'Muted Foreground' },
                { cls: 'text-accent-foreground', label: 'Accent Foreground' },
                { cls: 'text-destructive', label: 'Destructive' },
            ].map(({ cls, label }) => (
                <p key={cls} className={`${cls} text-xl font-semibold`}>
                    {label} — <span className="font-mono text-sm opacity-60">.{cls}</span>
                </p>
            ))}
        </div>
    ),
}

export const Prose: Story = {
    render: () => (
        <article className="max-w-prose space-y-6">
            <h1 className="text-4xl font-extrabold text-foreground">One Layout, Infinite Possibilities</h1>
            <p className="text-lg text-muted-foreground italic">
                How Inventure powers 4 different commerce verticals with a single React codebase.
            </p>
            <p className="leading-7 text-foreground">
                Inventure is a universal app shell built on React + Tailwind CSS + Radix UI. The entire
                visual language — colours, borders, backgrounds, and foregrounds — is driven by CSS custom
                properties (variables) that are overridden per theme.
            </p>
            <h2 className="text-2xl font-bold text-foreground">Why CSS Variables?</h2>
            <p className="leading-7 text-foreground">
                CSS variables cascade perfectly with Tailwind's <code className="font-mono text-primary text-sm">hsl(var(--primary))</code>{' '}
                pattern. A single class on <code className="font-mono text-primary text-sm">&lt;html&gt;</code> like{' '}
                <code className="font-mono text-primary text-sm">theme-fashion-gold-luxury</code> re-defines
                every token at once.
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                "The entire interface transforms as you switch between our 8 curated themes."
            </blockquote>
        </article>
    ),
}
