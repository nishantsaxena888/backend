# Inventure AI — Multitenant Design System & E-commerce Engine

This workspace contains the source code for the Inventure AI platform, a unified engine designed to serve multiple e-commerce brand identities from a single core codebase.

## 📂 Project Structure

- **`/front-end`**: The main React/TypeScript application. This is the core engine where all commerce features (Cart, Checkout, Auth, etc.) are developed and integrated.
- **`/theme`**: Source definitions for the various client themes (Emerald Grocery, Fashion Black, etc.). This acts as the design system repository.

## 🏗️ Core Technology

The project leverages a **Multi-Client Architecture**:
1. **Dynamic Configuration**: A central `ClientConfig` drives the logic and branding of all components.
2. **CSS variables-based Theming**: Instant visual transformation of components using a Tailwind-integrated CSS variable engine.
3. **Storybook Isolation**: Every component is developed and tested in isolation using Storybook compositions.

## 🚀 Quick Start

For detailed development instructions, please refer to the [Front-End Documentation](./front-end/README.md).

### Key Commands (from root)
```bash
# Start the front-end application
cd front-end && npm run dev

# Start Storybook
cd front-end && npm run storybook
```

---
*Developed by Inventure AI*

## 🏗️ Bootstrapping New Projects with AI

When using an AI coding assistant (like Cursor or GitHub Copilot) to generate a new application within the ecosystem, provide the AI with the exact prompts below. These prompts enforce strict adherence to the project's multi-theme architecture and identical component tracking.

### 1. Generating the POS System
> **Prompt:** "Strictly follow the architectural rules in `prompt_new_project.md` to bootstrap a new project called `front-end-pos`, porting the user interface and features from the `theme/POS` directory into our standardized, multi-theme ecosystem."

### 2. Generating the Admin Dashboard
> **Prompt:** "Strictly follow the architectural rules in `prompt_new_project.md` to bootstrap a new project called `front-end-dashboard`, porting the user interface and features from the `theme/Admin Dashboard Invoice Print Etc` directory into our standardized, multi-theme ecosystem."
