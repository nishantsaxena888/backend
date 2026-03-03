import type { Meta, StoryObj } from '@storybook/react';
import RestaurantPOS from './RestaurantPOS';

const meta = {
    title: 'Features/RestaurantPOS',
    component: RestaurantPOS,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof RestaurantPOS>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
