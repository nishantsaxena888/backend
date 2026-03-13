import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
    title: 'Core/Textarea',
    component: Textarea,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
    args: {
        placeholder: 'Type your message here...',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'Disabled textarea',
    },
};

export const WithValue: Story = {
    args: {
        value: 'This is some pre-filled text in the textarea component.',
    },
};

export const Rows: Story = {
    args: {
        rows: 10,
        placeholder: 'Textarea with 10 rows',
    },
};
