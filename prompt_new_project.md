# New Project Scaffolding Guide

To ensure consistency across the Inventure ecosystem, follow these steps to initialize a new frontend application (e.g., Admin Dashboard, POS).

## 1. Project Initialization
```bash
npx -y create-vite@latest ./ --template react-ts
```

## 2. Dependency Synchronization
Copy the `dependencies` and `devDependencies` from the core `front-end` project to ensure version parity. Key libraries include:
- **UI (Version Locked)**: `shadcn/ui` (same version + same components.json registry), `@radix-ui/*`, `lucide-react`, `class-variance-authority`, `tailwind-merge`.
  - Do not upgrade/downgrade shadcn or modify components.json independently.
- **Logic**: `react-hook-form`, `date-fns`, `cmdk`, `recharts`.
- **Styling**: `tailwindcss`, `autoprefixer`, `postcss`.

## 3. Configuration Sync
Copy the following configuration files from `front-end/`:
- `tailwind.config.js` (Ensure all theme variables are preserved).
- `components.json` (For shadcn/ui consistency).
- `tsconfig.json` & `vite.config.ts`.
- `.storybook/` (Storybook config must be copied from `front-end/` to keep addons + preview decorators identical).

## 4. Core Architecture Blocks
Replicate these directories and files to maintain the **"Biological Pattern"**:

### `src/mock/`
- `types.ts`: Shared data interfaces (Product, Order, Customer).
- `api.ts`: Simulates async fetching with `DELAY` and a registry map.
- `clients/`: Client-specific configurations and data overrides.

### `src/components/`
- `language-provider.tsx`: Standardized i18n with `l()` helper.
- `theme-provider.tsx`: Standardized theme switching logic.
- `ui/`: shadcn/ui primitives only (version-locked to core frontend). Do not use raw Radix directly inside feature components. No custom base components allowed outside this directory.

### `src/index.css`
- Ensure all `.theme-{client-id}` classes are imported to support multi-theming in the new layout.

### `src/stories/` (or colocated `*.stories.tsx`)
- Each reusable component must have a Storybook story.

## 5. Implementation Rules
1. **Localization**: Use the `l(object, field)` helper for all dynamic database fields (names, descriptions). Use `t(key)` for static UI labels.
2. **Theming**: Use CSS variables (primary, background, accent) throughout the UI. NEVER use hardcoded hex codes.
3. **API Integrity**: Components must never call data directly. Always use `api.getXYZ()` to allow for seamless backend swapping later.
4. **shadcn Standardization**: All UI must use standard shadcn components from `src/components/ui/` (same version as core front-end). No custom primitives unless added via shadcn pattern.
5. **Storybook Coverage**: Every reusable component must have a Storybook story with multi-language and multi-theme coverage (light/dark + client themes).

### Storybook Preview Requirements
Stories must demonstrate:
- Language switching (using `language-provider.tsx`)
- Theme switching (using `theme-provider.tsx` + `.theme-{client-id}` classes)

## Governance Principle

All frontend applications must remain:
- Version synchronized
- shadcn standardized
- Fully multilingual
- Fully multi-theme capable
- Storybook documented
- Backend swappable

No deviations allowed without architecture approval.
