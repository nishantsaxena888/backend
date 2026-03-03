import type { Meta, StoryObj } from '@storybook/react';
import { RestaurantProductCard } from './RestaurantProductCard';
import { MOCK_RESTAURANT_PRODUCTS } from '../mock/data';

const meta = {
    title: 'Features/Components/RestaurantProductCard',
    component: RestaurantProductCard,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="w-[300px] p-4 bg-muted/10">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof RestaurantProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        product: MOCK_RESTAURANT_PRODUCTS[0],
        onClick: (product) => alert(`Added ${product.name} to cart`),
    },
};
