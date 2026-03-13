import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutDialog } from './CheckoutDialog';
import { POSThemeProvider } from './theme-provider';
import { LanguageProvider } from './language-provider';

const meta: Meta<typeof CheckoutDialog> = {
    title: 'Components/CheckoutDialog',
    component: CheckoutDialog,
    decorators: [
        (Story) => (
            <LanguageProvider>
                <POSThemeProvider>
                    <div className="p-8 bg-background">
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
type Story = StoryObj<typeof CheckoutDialog>;

export const Default: Story = {
    args: {
        isOpen: true,
        total: 156.50,
        onClose: () => console.log('Close'),
        onComplete: () => console.log('Complete'),
    },
};
