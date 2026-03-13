import type { Meta, StoryObj } from '@storybook/react';
import { ProductManagement } from './ProductManagement';
import { LanguageProvider } from '../components/language-provider';

const meta: Meta<typeof ProductManagement> = {
    title: 'Admin/ProductManagement',
    component: ProductManagement,
    decorators: [
        (Story) => (
            <LanguageProvider>
                <div className="bg-background min-h-screen w-full">
                    <Story />
                </div>
            </LanguageProvider>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof ProductManagement>;

export const Default: Story = {};

export const CreateView: Story = {
    play: async () => {
        // Navigation is handled by state
    }
};
