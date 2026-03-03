import type { Meta, StoryObj } from '@storybook/react';
import { WarehouseInventoryRow } from './WarehouseInventoryRow';
import { MOCK_WAREHOUSE_PRODUCTS } from '../mock/data';
import { Table, TableBody } from '@/components/ui/table';

const meta = {
    title: 'Features/Components/WarehouseInventoryRow',
    component: WarehouseInventoryRow,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="p-4 bg-muted/10 w-full">
                <Table>
                    <TableBody>
                        <Story />
                    </TableBody>
                </Table>
            </div>
        ),
    ],
} satisfies Meta<typeof WarehouseInventoryRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InStock: Story = {
    args: {
        product: { ...MOCK_WAREHOUSE_PRODUCTS[0], stock: 100, lowStockThreshold: 10 },
        onUpdateStock: (sku, delta) => alert(`Update ${sku} by ${delta}`),
    },
};

export const LowStock: Story = {
    args: {
        product: { ...MOCK_WAREHOUSE_PRODUCTS[0], stock: 5, lowStockThreshold: 10 },
        onUpdateStock: (sku, delta) => alert(`Update ${sku} by ${delta}`),
    },
};
