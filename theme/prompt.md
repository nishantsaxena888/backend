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
✅ Phase 1 — Fill ui/ gap
  47 shadcn primitives copied to front-end/src/components/ui/

✅ Phase 2 — Page Shell (Multi-Client Ready)
  Step 1: Header.tsx   — Unified with Mock API config prop.
  Step 2: NavBar.tsx   — Unified with Mock API config prop.

✅ Phase 3 — Core Product UI (Multi-Client Ready)
  Step 3: HeroSection  — Fully data-driven from client manifest.
  Step 4: ProductCard  — Reactive to both Unsplash URLs and Emojis.
  Step 5: ProductGrid  — Dynamic filtering and pagination support.

✅ Phase 4 — Commerce Flow
  Step 6: Cart.tsx           — ✅ Basic sheet-based cart implemented.
  Step 7: ProductDetail.tsx  — ✅ Unified data-driven detail modal.
  Step 8: Checkout.tsx       — ✅ Full 4-step multi-client checkout flow.

Phase 5 — Auth & Account
  Step 9:  AuthModal.tsx          — ⏳
  Step 10: AddressManager.tsx     — ✅ Completed as part of Checkout.
  Step 11: AppliedFiltersBar.tsx  — ⏳

Phase 6 — Extras
  Step 12: RestaurantPage.tsx     — fashion/liquor/restaurant
  Step 13: AgeVerification.tsx    — liquor only

### 💎 Architectural Update: Multi-Client Configurability
The application now uses a **SRP Mock API Service** (`@/mock/api.ts`) that serves 8 distinct client manifests. 
- **Header, NavBar, Hero, Cart, ProductDetail, and Checkout** are no longer static; they accept a `config` prop of type `ClientConfig`.
- **Themes** are switched via the Global Toolbar, which triggers the Mock API to serve the corresponding client's data.

### Current Status
✅ Phase 1: 47 UI primitives available.
✅ Phase 2: Real Ecom Header & Navbar integrated.
✅ Phase 3: Home Page (Hero + Products) fully data-driven.
✅ Phase 4: Commerce Flow (Cart, Product Detail, Checkout) fully implemented and data-driven.
⏳ Next: Implementing Auth modals and specific client extras.
