import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta: Meta<typeof Input> = {
    title: 'Core/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'password', 'email', 'number', 'file'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
    },
};

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter password...',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'Disabled input',
    },
};

export const WithValue: Story = {
    args: {
        value: 'Pre-filled value',
    },
};

export const File: Story = {
    args: {
        type: 'file',
    },
};
