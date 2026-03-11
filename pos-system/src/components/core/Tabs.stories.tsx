import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';
import { POSThemeProvider } from '../theme-provider';

const meta: Meta<typeof Tabs> = {
    title: 'Core/Tabs',
    component: Tabs,
    decorators: [
        (Story) => (
            <POSThemeProvider>
                <div className="p-8 bg-background">
                    <Story />
                </div>
            </POSThemeProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Categories: Story = {
    render: () => (
        <Tabs defaultValue="all" className="w-full max-w-2xl">
            <TabsList>
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="grocery">Grocery</TabsTrigger>
                <TabsTrigger value="bakery">Bakery</TabsTrigger>
                <TabsTrigger value="drinks">Drinks</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="p-6 bg-card/30 rounded-[32px] border-2 border-dashed">
                Displaying all products...
            </TabsContent>
        </Tabs>
    ),
};

export const Dashboard: Story = {
    render: () => (
        <div className="max-w-md mx-auto">
            <Tabs defaultValue="sales">
                <TabsList className="w-full">
                    <TabsTrigger value="sales" className="flex-1">Sales</TabsTrigger>
                    <TabsTrigger value="inventory" className="flex-1">Inventory</TabsTrigger>
                    <TabsTrigger value="staff" className="flex-1">Staff</TabsTrigger>
                </TabsList>
                <TabsContent value="sales">Sales analytics content...</TabsContent>
            </Tabs>
        </div>
    ),
};
