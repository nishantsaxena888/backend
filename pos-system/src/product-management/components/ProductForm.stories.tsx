import type { Meta, StoryObj } from '@storybook/react';
import { ProductForm } from './ProductForm';

const meta: Meta<typeof ProductForm> = {
    title: 'Admin/Components/ProductForm',
    component: ProductForm,
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof ProductForm>;

export const Create: Story = {
    args: {
        onSubmit: (data) => console.log('Form Submit:', data),
        onCancel: () => console.log('Cancel'),
    },
};

export const Edit: Story = {
    args: {
        initialData: {
            name: "Sample Product",
            description: "This is a product description",
            regularPrice: 99.99,
            sku: "SKU-001",
            categories: ["Electronics"],
            status: "publish"
        },
        onSubmit: (data) => console.log('Form Submit:', data),
        onCancel: () => console.log('Cancel'),
    },
};
