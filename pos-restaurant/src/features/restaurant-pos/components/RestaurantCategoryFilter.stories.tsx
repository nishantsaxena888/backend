import type { Meta, StoryObj } from '@storybook/react';
import { RestaurantCategoryFilter } from './RestaurantCategoryFilter';

const meta = {
    title: 'Features/Components/RestaurantCategoryFilter',
    component: RestaurantCategoryFilter,
    tags: ['autodocs'],
} satisfies Meta<typeof RestaurantCategoryFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        categories: ['All', 'Burgers', 'Drinks', 'Dessert'],
        activeCategory: 'All',
        onCategoryChange: (category) => alert(`Selected: ${category}`),
    },
};
