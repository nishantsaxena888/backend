import type { Meta, StoryObj } from '@storybook/react';
import { POSSwitcher } from './POSSwitcher';

const meta = {
  title: 'Components/POSSwitcher',
  component: POSSwitcher,
  tags: ['autodocs'],
} satisfies Meta<typeof POSSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
