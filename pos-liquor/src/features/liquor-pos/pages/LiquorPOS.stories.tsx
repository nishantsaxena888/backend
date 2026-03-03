import type { Meta, StoryObj } from '@storybook/react';
import LiquorPOS from './LiquorPOS';

const meta = {
    title: 'Features/LiquorPOS',
    component: LiquorPOS,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof LiquorPOS>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
