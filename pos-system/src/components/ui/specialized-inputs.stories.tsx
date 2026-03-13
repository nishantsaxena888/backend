import type { Meta, StoryObj } from '@storybook/react';
import { PasswordField } from './password-field';
import { NumberInput } from './number-input';
import { CurrencyInput } from './currency-input';
import { PhoneInput } from './phone-input';

const meta: Meta = {
    title: 'Core/SpecializedInputs',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

export const Password: StoryObj<typeof PasswordField> = {
    render: (args) => <PasswordField {...args} className="w-80" />,
    args: {
        placeholder: 'Enter password...',
    },
};

export const Number: StoryObj<typeof NumberInput> = {
    render: (args) => <NumberInput {...args} className="w-80" />,
    args: {
        placeholder: 'Enter quantity...',
    },
};

export const Currency: StoryObj<typeof CurrencyInput> = {
    render: (args) => <CurrencyInput {...args} className="w-80" />,
    args: {
        placeholder: '0.00',
        currencySymbol: '$',
    },
};

export const EuroCurrency: StoryObj<typeof CurrencyInput> = {
    render: (args) => <CurrencyInput {...args} className="w-80" />,
    args: {
        placeholder: '0.00',
        currencySymbol: '€',
    },
};

export const EuroSuffix: StoryObj<typeof CurrencyInput> = {
    render: (args) => <CurrencyInput {...args} className="w-80" />,
    args: {
        placeholder: '0.00',
        currencySymbol: '€',
        side: 'right',
    },
};

export const Phone: StoryObj<typeof PhoneInput> = {
    render: (args) => <PhoneInput {...args} className="w-80" />,
    args: {
        placeholder: '+1 (555) 000-0000',
    },
};
