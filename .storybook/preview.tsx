import type { Preview } from '@storybook/react-vite'
import React, { useEffect } from 'react'
import '../src/index.css'

// All 8 themes from theme-provider.tsx / index.css
export const THEMES = [
    { label: '🥦 Emerald Grocery', value: 'emerald-grocery' },
    { label: '🖤 Fashion Black', value: 'fashion-black' },
    { label: '✨ Fashion Gold Luxury', value: 'fashion-gold-luxury' },
    { label: '🌿 Green MVP', value: 'green-mvp' },
    { label: '🩶 Grey Grocery', value: 'grey-grocery' },
    { label: '🥃 Liquor Black', value: 'liqour-black' },
    { label: '🍊 Liquor Orange', value: 'liquor-orange' },
    { label: '🍽️ Restaurant Black', value: 'restaurant-black' },
]

const ALL_THEME_CLASSES = THEMES.map((t) => `theme-${t.value}`)

// Decorator that applies the selected theme class to <html>
const withTheme = (Story: React.ComponentType, context: any) => {
    const { theme } = context.globals

    useEffect(() => {
        const root = document.documentElement
        // Remove all theme classes first
        root.classList.remove(...ALL_THEME_CLASSES)
        if (theme) {
            root.classList.add(`theme-${theme}`)
        }
    }, [theme])

    return <Story />
}

const preview: Preview = {
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            defaultValue: 'emerald-grocery',
            toolbar: {
                title: '🎨 Theme',
                icon: 'paintbrush',
                dynamicTitle: true,
                items: THEMES.map((t) => ({
                    value: t.value,
                    title: t.label,
                    right: t.value,
                })),
            },
        },
    },
    decorators: [
        withTheme,
        (Story) => (
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300 p-6">
                <Story />
            </div>
        ),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: { disable: true }, // we use the CSS var-driven background
        a11y: {
            test: 'todo',
        },
    },
}

export default preview
