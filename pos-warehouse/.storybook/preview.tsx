import type { Preview } from "@storybook/react";
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
          <ThemeProvider defaultTheme="warehouse-blue">
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
