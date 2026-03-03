import type { Meta, StoryObj } from '@storybook/react';
import WarehousePOS from './WarehousePOS';

const meta = {
    title: 'Features/WarehousePOS',
    component: WarehousePOS,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof WarehousePOS>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
