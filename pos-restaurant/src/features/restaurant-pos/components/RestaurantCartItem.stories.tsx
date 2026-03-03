import type { Meta, StoryObj } from '@storybook/react';
import { RestaurantCartItem } from './RestaurantCartItem';
import { MOCK_RESTAURANT_PRODUCTS } from '../mock/data';

const meta = {
    title: 'Features/Components/RestaurantCartItem',
    component: RestaurantCartItem,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="w-[400px] p-4 bg-muted/10">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof RestaurantCartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        item: { ...MOCK_RESTAURANT_PRODUCTS[0], quantity: 1 },
        onUpdateQuantity: (id, delta) => alert(`Update ${id} by ${delta}`),
        onRemove: (id) => alert(`Remove ${id}`),
    },
};
