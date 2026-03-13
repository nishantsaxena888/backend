import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { POSThemeProvider } from './theme-provider';
import { LanguageProvider } from './language-provider';

const meta: Meta<typeof ThemeSwitcher> = {
    title: 'Components/ThemeSwitcher',
    component: ThemeSwitcher,
    decorators: [
        (Story) => (
            <LanguageProvider>
                <POSThemeProvider>
                    <div className="p-8 min-h-[300px] bg-background">
                        <Story />
                    </div>
                </POSThemeProvider>
            </LanguageProvider>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {};
