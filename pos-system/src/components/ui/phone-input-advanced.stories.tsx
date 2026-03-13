import type { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from './phone-input';

const meta: Meta<typeof PhoneInput> = {
    title: 'Core/PhoneInputAdvanced',
    component: PhoneInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
    args: {
        placeholder: 'Enter phone number...',
    },
};

export const USDefault: Story = {
    args: {
        defaultCountryIso: 'US',
        placeholder: 'Enter phone number...',
    },
};

export const UAE: Story = {
    args: {
        defaultCountryIso: 'AE',
        placeholder: 'Enter phone number...',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'Disabled input',
    },
};
