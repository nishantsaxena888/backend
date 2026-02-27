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

import { ThemeProvider, useTheme, type Theme } from '../src/components/theme-provider'
import { LanguageProvider } from '../src/components/language-provider'

const ThemeSync = ({ storybookTheme, children }: { storybookTheme: Theme, children: React.ReactNode }) => {
    const { theme, setTheme } = useTheme();
    useEffect(() => {
        if (theme !== storybookTheme && storybookTheme) {
            setTheme(storybookTheme);
        }
    }, [storybookTheme, theme, setTheme]);

    return <>{children}</>;
}

const withProviders = (Story: React.ComponentType, context: any) => {
    const { theme } = context.globals;
    return (
        <ThemeProvider defaultTheme={theme || 'emerald-grocery'}>
            <LanguageProvider>
                <ThemeSync storybookTheme={theme as Theme}>
                    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 p-6">
                        <Story />
                    </div>
                </ThemeSync>
            </LanguageProvider>
        </ThemeProvider>
    );
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
        withProviders,
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
