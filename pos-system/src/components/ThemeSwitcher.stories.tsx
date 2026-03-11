import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { POSThemeProvider } from './theme-provider';

const meta: Meta<typeof ThemeSwitcher> = {
    title: 'Components/ThemeSwitcher',
    component: ThemeSwitcher,
    decorators: [
        (Story) => (
            <POSThemeProvider>
                <div className="p-8 min-h-[300px] bg-background">
                    <Story />
                </div>
            </POSThemeProvider>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {};
