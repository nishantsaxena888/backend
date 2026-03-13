import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LanguageProvider } from './language-provider';

const meta: Meta<typeof LanguageSwitcher> = {
    title: 'Components/LanguageSwitcher',
    component: LanguageSwitcher,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {
    render: () => (
        <LanguageProvider>
            <div className="p-8 bg-slate-900 rounded-3xl">
                <LanguageSwitcher />
            </div>
        </LanguageProvider>
    ),
};
