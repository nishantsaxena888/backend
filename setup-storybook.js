const fs = require('fs');
const path = require('path');

const projects = ['pos-liquor', 'pos-restaurant', 'pos-warehouse'];
const baseDir = 'd:/workspace/inventureai';

// Storybook Config
const mainTs = `import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
`;

const previewTsx = `import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../src/components/theme-provider";
import { LanguageProvider } from "../src/components/language-provider";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <LanguageProvider>
          <ThemeProvider defaultTheme="system">
            <TooltipProvider>
              <Story />
            </TooltipProvider>
          </ThemeProvider>
        </LanguageProvider>
      </BrowserRouter>
    ),
  ],
};

export default preview;
`;

// Stories
const buttonStory = `import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};
`;

const badgeStory = `import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};
`;

const cardStory = `import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card';

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content goes here.</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};
`;

const posSwitcherStory = `import type { Meta, StoryObj } from '@storybook/react';
import { POSSwitcher } from './POSSwitcher';

const meta = {
  title: 'Components/POSSwitcher',
  component: POSSwitcher,
  tags: ['autodocs'],
} satisfies Meta<typeof POSSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
`;

projects.forEach(project => {
    const projPath = path.join(baseDir, project);

    // Setup .storybook folder
    const storybookDir = path.join(projPath, '.storybook');
    if (!fs.existsSync(storybookDir)) {
        fs.mkdirSync(storybookDir, { recursive: true });
    }

    fs.writeFileSync(path.join(storybookDir, 'main.ts'), mainTs);
    fs.writeFileSync(path.join(storybookDir, 'preview.tsx'), previewTsx);

    // Setup UI components stories
    const uiDir = path.join(projPath, 'src', 'components', 'ui');
    if (fs.existsSync(uiDir)) {
        fs.writeFileSync(path.join(uiDir, 'button.stories.tsx'), buttonStory);
        fs.writeFileSync(path.join(uiDir, 'badge.stories.tsx'), badgeStory);
        fs.writeFileSync(path.join(uiDir, 'card.stories.tsx'), cardStory);
    }

    // Setup other components stories
    const compDir = path.join(projPath, 'src', 'components');
    if (fs.existsSync(compDir)) {
        if (fs.existsSync(path.join(compDir, 'POSSwitcher.tsx'))) {
            fs.writeFileSync(path.join(compDir, 'POSSwitcher.stories.tsx'), posSwitcherStory);
        }
    }

    console.log('Setup complete for:', project);
});
