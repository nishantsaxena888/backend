import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { POSThemeProvider } from '../theme-provider';
import { Plus, ArrowRight } from 'lucide-react';

const meta: Meta<typeof Button> = {
    title: 'Core/Button',
    component: Button,
    decorators: [
        (Story) => (
            <POSThemeProvider>
                <div className="p-8 bg-background flex flex-wrap gap-4 items-center justify-center">
                    <Story />
                </div>
            </POSThemeProvider>
        ),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: 'Confirm Order',
        variant: 'default',
    },
};

export const Outline: Story = {
    args: {
        children: 'Void Transaction',
        variant: 'outline',
    },
};

export const WithIcon: Story = {
    args: {
        children: (
            <>
                Open Terminal <ArrowRight />
            </>
        ),
        variant: 'default',
        size: 'lg',
    },
};

export const IconButton: Story = {
    args: {
        children: <Plus />,
        size: 'icon',
        variant: 'secondary',
    },
};

export const Large: Story = {
    args: {
        children: 'Checkout Now',
        size: 'lg',
        className: 'w-full max-w-sm'
    },
};
