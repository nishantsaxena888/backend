# Inventure — Multi-Client E-commerce Platform

A high-performance, unified e-commerce platform built with React, TypeScript, and Tailwind CSS. The system features a unique **Multi-Client Architecture** that allows served 8 distinct brands/clients from a single codebase via a dynamic Mock API and CSS variable-based theming.

## 🚀 Recent Feature Updates

### ✅ Phase 4: Commerce Engine (Completed)
- **Advanced Cart System**: Sheet-based cart with real-time total calculations and free delivery threshold progress tracking.
- **Unified Product Detail**: Data-driven modal (`ProductDetail.tsx`) supporting both high-res Unsplash imagery and character/emoji branding.
- **Multi-Step Checkout**: A streamlined 4-step flow (**Shipping → Payment → Review → Success**) reactive to client-specific business rules (tax rates, shipping costs).
- **Address Manager**: Localized shipping address management with default logic and form validation.

### 🚀 Phase 5: Auth & Account (In Progress)
- **Branded AuthModal**: Implemented a unified login/register flow that matches the active client's visual identity (logo, color palette, tagline).
- **Session Persistence**: Automated session management using `localStorage` to maintain user state across refreshes.
- **Protected Checkout**: Intelligent gates that prompt guest users for authentication before allowing them to place orders.
- **Header Integration**: Dynamic header updates showing user status, profile menus, and sign-out functionality.

### 🏗️ Architectural Core
- **Data-Driven UI**: Components (Header, NavBar, Hero, Cart, Checkout) are not static; they consume a `ClientConfig` prop served by an internal SRP Mock API.
- **CSS Theme Injection**: The application uses a global toolbar to switch between 8 pre-configured themes (Emerald Grocery, Fashion Black, Liquor Orange, Restaurant Black, etc.), instantly re-styling the entire site via CSS variables.
- **Storybook Integration**: Full component library isolation and development environment for rapid UI iteration.

## 🛠️ Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v3 (Custom multi-theme engine)
- **UI Components**: shadcn/ui (47 primitives migrated and customized)
- **Icons**: Lucide React
- **Mock Service**: Custom SRP API delivering 8 client manifests

## ⏳ What's Next?
- **Account Dashboard**: Profile management and order history tracking.
- **Specialized Extra Components**:
  - `RestaurantPage.tsx` for food delivery clients.
  - `AgeVerification.tsx` barrier for liquor store clients.
- **Refining Filters**: Advanced product filtering bar for attributes like size, color, and dietary requirements.

---
*Created by the Inventure Development Team*
