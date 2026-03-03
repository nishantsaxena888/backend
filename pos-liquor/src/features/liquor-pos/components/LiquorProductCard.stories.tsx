import type { Meta, StoryObj } from '@storybook/react';
import { LiquorProductCard } from './LiquorProductCard';
import { MOCK_LIQUOR_PRODUCTS } from '../mock/data';

const meta = {
    title: 'Features/Components/LiquorProductCard',
    component: LiquorProductCard,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="w-[300px] p-4 bg-muted/10">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof LiquorProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        product: MOCK_LIQUOR_PRODUCTS[0],
        onClick: (product) => alert(`Added ${product.name} to cart`),
    },
};

export const ExpensiveWine: Story = {
    args: {
        product: MOCK_LIQUOR_PRODUCTS.find(p => p.price > 100) || MOCK_LIQUOR_PRODUCTS[1],
        onClick: (product) => alert(`Added ${product.name} to cart`),
    },
};
