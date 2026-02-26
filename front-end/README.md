# Inventure — Core E-commerce Engine

A high-performance, multitenant e-commerce platform built for scale. This repository contains the unified front-end engine that serves multiple distinct brand identities (Grocery, Fashion, Liquor, Restaurant) from a single React/TypeScript codebase using a dynamic context-aware architecture.

## 🏗️ Architectural Overview

### 1. Multitenancy via `ClientConfig`
The entire application is driven by a `ClientConfig` object. This configuration dictates branding, business logic (e.g., age-gating), and feature availability.
- **Source**: `src/mock/api.ts` provides the `getClientConfig(id)` function.
- **Injection**: Config is passed down as a prop or consumed via context to ensure components remain "brand-agnostic" but "context-aware".

### 2. CSS-in-JS Theme Engine
Instead of hardcoded colors, the system uses a CSS Variable mapping strategy located in `src/index.css` and `tailwind.config.js`.
- **Theme Switching**: Managed by `src/components/theme-provider.tsx`.
- **Atomic Scaling**: Tailwind classes like `text-primary`, `bg-accent`, and `border-border` dynamically map to the active client's hex codes.
- **Radius & Borders**: Variable border-radii (`--radius`) ensure that a "Grocery" store can feel rounded and friendly, while a "Luxury" store remains sharp and minimal.

### 3. Component Hierarchy
- **`@/components/ui/`**: 47 low-level primitives (shadcn/ui). These are the building blocks.
- **`@/components/layout/`**: Structural elements (Header, NavBar, HeroSection) that define the page framework.
- **`@/components/commerce/`**: Complex business modules (Cart, Checkout, AuthModal, AddressManager, ProductGrid). These handle state and cross-component logic.

## 🛠️ Developer Guide

### Directory Structure
```bash
src/
├── components/
│   ├── commerce/   # High-level business logic & complex UI
│   ├── layout/     # Page-level structural shells
│   ├── ui/         # Atomic shadcn/ui primitives (Design System)
├── mock/           # Data layer, type definitions, and client configs
├── stories/        # Storybook compositions for isolated development
└── App.tsx         # Main orchestration layer and routing
```

### State Management Strategy
- **Persistence**: `localStorage` is used for Cart, Auth, and Address books to ensure session continuity.
- **Events**: A `CustomEvent` bus (`addressesUpdated`, etc.) is used to sync state across decoupled components without bloating the global context.
- **Modals**: Most complex flows (Auth, Checkout, QuickView) are implemented as `Dialog` (Radix UI) compositions for optimal accessibility.

### Storybook-First Development
We use Storybook not just for documentation, but as our primary development sandbox.
- **Compositions**: `src/stories/CommerceComponents.stories.tsx` contains full-page state simulations.
- **Edge Cases**: Stories are used to test components against all 8 client configurations (e.g., testing the Login modal in 'Liquor' vs 'Fashion' themes).

## 🚀 Commands
```bash
# Start local development server
npm run dev

# Launch Storybook environment
npm run storybook

# Production build
npm run build
```

## 📐 Design & Quality Standards
1. **Zero-Hardcoding**: Never use hex codes in components. Use Tailwind theme variables.
2. **Type Safety**: Avoid `any`. Use the shared types in `src/mock/types.ts`.
3. **Responsive-First**: Every component must be verified in Storybook at `360px` (Mobile), `768px` (Tablet), and `1440px` (Desktop).
4. **Interactive Polish**: Use `active:scale-[0.98]` for buttons and `animate-in` for modals to maintain the premium "Inventure feel".

---
*Technical Documentation for the Inventure Engineering Team*
