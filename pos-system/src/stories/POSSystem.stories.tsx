import type { Meta, StoryObj } from '@storybook/react';
import App from '../App';

const meta: Meta<typeof App> = {
    title: 'POS/System',
    component: App,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof App>;

export const Default: Story = {};

export const Warehouse: Story = {
    play: async () => {
        localStorage.setItem('pos-theme', 'warehouse');
        window.location.reload();
    }
};

export const Restaurant: Story = {
    play: async () => {
        localStorage.setItem('pos-theme', 'restaurant');
        window.location.reload();
    }
};

export const Liquor: Story = {
    play: async () => {
        localStorage.setItem('pos-theme', 'liquor');
        window.location.reload();
    }
};
