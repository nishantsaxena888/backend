import type { Meta, StoryObj } from '@storybook/react';
import { LiquorCartItem } from './LiquorCartItem';
import { MOCK_LIQUOR_PRODUCTS } from '../mock/data';

const meta = {
    title: 'Features/Components/LiquorCartItem',
    component: LiquorCartItem,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="w-[400px] p-4 bg-muted/10">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof LiquorCartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleItem: Story = {
    args: {
        item: { ...MOCK_LIQUOR_PRODUCTS[0], quantity: 1 },
        onUpdateQuantity: (id, delta) => alert(`Update ${id} by ${delta}`),
        onRemove: (id) => alert(`Remove ${id}`),
    },
};

export const MultipleItems: Story = {
    args: {
        item: { ...MOCK_LIQUOR_PRODUCTS[1], quantity: 5 },
        onUpdateQuantity: (id, delta) => alert(`Update ${id} by ${delta}`),
        onRemove: (id) => alert(`Remove ${id}`),
    },
};
