## Project: Inventure — Storybook Component Migration
### Workspace
Root: /Users/nishantsaxena/workspace/inventureai/
### Folder Structure
inventureai/
├── front-end/                  ← The Storybook project (work here)
│   ├── .storybook/
│   │   ├── main.ts             ← Storybook config (react-vite, stories: src/**/*.stories.*)
│   │   └── preview.tsx         ← Global theme toolbar decorator + CSS import
│   └── src/
│       ├── index.css           ← 8 CSS variable theme classes (Tailwind v3)
│       ├── lib/utils.ts        ← cn() helper
│       ├── components/
│       │   ├── theme-provider.tsx          ← ThemeProvider + useTheme hook
│       │   ├── layout/
│       │   │   ├── Header.tsx              ← Simple placeholder (needs replacing)
│       │   │   └── Navbar.tsx              ← Simple placeholder (needs replacing)
│       │   └── ui/                         ← 4 exist: button, card, dropdown-menu, navigation-menu
│       │                                      44 MISSING shadcn primitives
│       └── stories/            ← 11 stories already written (Button, Card, Badges,
│                                  Inputs, Toggles, Typography, Header, Navbar,
│                                  ProductShowcase, ThemePalette, Configure.mdx)
│
└── theme/
    ├── Ecom/                   ← 8 full e-commerce theme implementations (SOURCE)
    │   ├── emerald-grocery/    ← 🥦 Green grocery (base reference)
    │   ├── grey-grocery/       ← 🩶 Grey grocery
    │   ├── Green Theme MVP/    ← 🌿 Green minimal
    │   ├── fashion-black/      ← 🖤 Fashion boutique
    │   ├── fashion-gold-luxury/← ✨ Luxury fashion
    │   ├── liqour-black/       ← 🥃 Dark liquor store
    │   ├── liquor-orange/      ← 🍊 Orange liquor store
    │   └── restaurant-black/   ← 🍽️ Food delivery
    │
    ├── POS/                    ← 2 POS systems (future work)
    │   ├── pos-restaurant/
    │   └── Liquor Store POS System/
    │
    ├── Admin Dashboard Invoice Print Etc/  ← IGNORE for now
    └── Amazon Clone with Tailwind/         ← IGNORE for now
### Tech Stack
- React + TypeScript + Vite
- Tailwind CSS v3 (in front-end/) — themes are CSS variable overrides
- Tailwind CSS v4 compiled (in theme/ folders — pre-built index.css)
- shadcn/ui components (48 files per theme — Radix UI primitives)
- Storybook v10 with react-vite framework
- Path alias: @ → front-end/src/
### 8 Available Themes (CSS classes applied to <html>)
1. theme-emerald-grocery   🥦
2. theme-fashion-black     🖤
3. theme-fashion-gold-luxury ✨
4. theme-green-mvp         🌿
5. theme-grey-grocery      🩶
6. theme-liqour-black      🥃
7. theme-liquor-orange     🍊
8. theme-restaurant-black  🍽️
### Storybook Theme Toolbar
- preview.tsx has a global theme toolbar (paintbrush icon)
- Switching theme applies theme-{value} class to <html>
- All stories automatically reflect the active theme via CSS variables
### Ecom Component Inventory (all 8 themes share these)
LAYER 1 — shadcn/ui primitives (per theme: ui/ folder, 48 files)
  Core: button, input, card, badge, select, checkbox, radio-group, switch, slider
  Overlay: dialog, sheet, dropdown-menu, popover, tooltip, hover-card, alert-dialog
  Navigation: tabs, accordion, navigation-menu, breadcrumb, pagination, menubar, sidebar
  Forms: form, label, textarea, input-otp, calendar
  Display: avatar, progress, skeleton, separator, scroll-area, carousel, chart, table
  Utility: sonner, toggle, toggle-group, collapsible, aspect-ratio, resizable, context-menu, command, drawer
  Helpers: utils.ts, use-mobile.ts
LAYER 2 — Ecom business components (SOURCE: theme/Ecom/emerald-grocery/src/components/)
  Present in ALL 8:   Header, NavBar, HeroSection, ProductCard, ProductGrid,
                      Cart, ProductDetail, Checkout, AuthModal,
                      AddressManager, AppliedFiltersBar
  Fashion/Liquor/Restaurant only: RestaurantPage
  Liquor only: AgeVerification
### Migration Plan (Phase by Phase)
✅ Phase 1 — UI Foundation
  - 47/47 shadcn/ui primitives migrated to `@/components/ui/`.
  - Global CSS themes mapped to Tailwind variables for all 8 clients.
  - Standardized component styling (rounded corners, shadows, transitions).

✅ Phase 2 — Page Shell (Multi-Client)
  - **Header.tsx**: Dynamic branding, search suggestions, theme switcher, and auth state.
  - **NavBar.tsx**: Client-specific category rendering with active states.
  - **Footer.tsx**: (Implicitly integrated via HomePage shell).

✅ Phase 3 — Core Product UI
  - **HeroSection**: Hero content (badges, headlines, CTAs) driven by client manifest.
  - **ProductCard/Grid**: Unified grid with dynamic filtering, price ranges, and status badges.
  - **Multi-Media Support**: Handles both Unsplash high-res URLs and character/emoji branding.

✅ Phase 4 — Commerce Flow
  - **Cart**: Sheet-based cart with real-time total calculation and free delivery threshold progress.
  - **ProductDetail**: Premium Dialog-based modal with rich product attributes and cart integration.
  - **Checkout**: Full 4-step flow (Shipping -> Payment -> Review -> Success) with dynamic shipping costs.
  - **AddressManager**: Localized address storage with default logic, used in Checkout.

✅ Phase 5 — Auth & Account
  - **AuthModal.tsx**: ✅ Implemented. Dynamic login/register flows with client-branded headers and social SSO slots.
  - **Session Management**: ✅ Persistent user sessions via localStorage with auto-hydrating state.
  - **Protected Flows**: ✅ Integrated into Cart; Checkout now triggers Auth for guest users.
  - **Profile View**: ⏳ Basic profile header/menu integrated into Header. Full account page pending.

Phase 6 — Extras
  - **Step 12: RestaurantPage.tsx**: Specialized layout for food/restaurant clients.
  - **Step 13: AgeVerification.tsx**: Mandatory entry barrier for liquor clients.

### 💎 Architectural Update: Data-Driven Branding
The application is now fully reactive to the **Mock API Service** (`@/mock/api.ts`).
- **Context Injection**: Every business component receives a `config: ClientConfig` prop.
- **Dynamic UX**: Features like "Free Delivery" or "Category Filters" adjust automatically based on the client manifest.
- **Theme Coupling**: CSS variables are strictly tied to the `theme-*` classes on the `<html>` tag, managed by `ThemeProvider`.

### Current Status
✅ **Phase 1-4 Complete**: Core e-commerce engine is fully functional.
✅ **Phase 5 (Major part Complete)**: Auth system is live and integrated. Checkout is now a "protected route".
⏳ **Next**: Finalizing specialized client extras (Restaurant Layouts & Age Barriers).
