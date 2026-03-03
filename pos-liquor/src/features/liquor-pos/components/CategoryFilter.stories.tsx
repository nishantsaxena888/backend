import type { Meta, StoryObj } from '@storybook/react';
import { CategoryFilter } from './CategoryFilter';

const meta = {
    title: 'Features/Components/CategoryFilter',
    component: CategoryFilter,
    tags: ['autodocs'],
} satisfies Meta<typeof CategoryFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        categories: ['All', 'Beer', 'Wine', 'Spirits'],
        activeCategory: 'All',
        onCategoryChange: (category) => alert(`Selected: ${category}`),
    },
};

export const ActiveBeer: Story = {
    args: {
        categories: ['All', 'Beer', 'Wine', 'Spirits'],
        activeCategory: 'Beer',
        onCategoryChange: (category) => alert(`Selected: ${category}`),
    },
};
