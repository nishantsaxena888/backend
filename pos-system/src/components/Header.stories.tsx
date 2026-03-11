import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { POSThemeProvider } from './theme-provider';

const MockCartContent = ({ isMobile }: { isMobile?: boolean }) => (
    <div className="p-8 text-center font-bold">
        {isMobile ? "Mobile Cart Content" : "Desktop Cart Content"}
    </div>
);

const meta: Meta<typeof Header> = {
    title: 'Components/Header',
    component: Header,
    decorators: [
        (Story) => (
            <POSThemeProvider>
                <div className="w-full">
                    <Story />
                </div>
            </POSThemeProvider>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Warehouse: Story = {
    args: {
        theme: 'warehouse',
        cartCount: 3,
        onBack: () => console.log('Back clicked'),
        CartContent: MockCartContent,
    },
};

export const Restaurant: Story = {
    args: {
        theme: 'restaurant',
        cartCount: 0,
        onBack: () => console.log('Back clicked'),
        CartContent: MockCartContent,
    },
};

export const Liquor: Story = {
    args: {
        theme: 'liquor',
        cartCount: 5,
        onBack: () => console.log('Back clicked'),
        CartContent: MockCartContent,
    },
};
