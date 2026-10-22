# 🍛 CraveBite - Desi Gourmet & Modern Food Delivery Platform

[![React](https://img.shields.io/badge/React-19.3-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.5-ff0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

**CraveBite** is a full-featured, state-of-the-art food delivery web application built with modern front-end technologies. Featuring an edge-to-edge fluid responsive design, instant dark/light mode toggle, live culinary video sizzle reels, deep meal customization, localized Indian payment options (UPI, RuPay, COD), interactive GPS order tracking, and a full authentication system with OTP password recovery.

---

## 🌟 Key Highlights & Features

### 🖥️ 1. Edge-to-Edge Fluid Responsive Layout
- **True Full-Width Architecture**: Eliminates artificial box clamping (`max-w-7xl` constraints removed) for an expansive, modern edge-to-edge presentation on monitors from 1080p to 4K ultra-wides.
- **Pure Native Multi-Device Support**:
  - **Mobile (< 640px)**: Bottom-sheet modals, touch-friendly swipe drawers, compact header, sticky bottom checkout action bar, and single-column cards.
  - **Tablet (641px - 1024px)**: 2-to-3 column dynamic grid layouts, flexible search bar, and comfortable spacing.
  - **Desktop (1025px - 1440px)**: 4-column restaurant grid, sticky summary panels, side-by-side interactive split views.
  - **Ultra-Wide (1440px+)**: Up to 5-column restaurant grid (`2xl:grid-cols-5`), extended search bar (`max-w-2xl`), and balanced visual margins.

---

### 🌓 2. System-Wide Dark & Light Mode
- **Zero-Flicker Initialization**: Early theme script loaded directly in `<head>` inspecting `localStorage` and `prefers-color-scheme` to prevent white flashes upon page refresh.
- **Deep Slate Palette**: Handcrafted dark aesthetic featuring deep obsidian tones (`#0b1120`, `slate-900`, `slate-800`), luminous brand accents (`#ff5c00`), and accessible high-contrast text (`slate-100`, `slate-300`).
- **Synchronized State**: Seamless theme toggling via `ThemeContext` updating both `document.documentElement` and `document.body` classes and color schemes.
- **Themed Assets**: Dark mode map styling, glassmorphic panels, and custom-tailored scrollbars.

---

### 🔐 3. Authentication & User Management
- **Modal & Route Access**: Accessible via universal popup modal (`AuthModal`) or direct routes (`/login`, `/signup`, `/forgot-password`).
- **Sign In & Registration**:
  - Quick tab switching with animated pill indicator.
  - Form validation with inline error feedback.
  - Password visibility toggle (Eye / EyeOff).
  - Preloaded demo accounts for instant 1-click evaluation.
- **6-Digit OTP Password Recovery**:
  - 3-step simulated security flow: Email submission ➔ 6-digit OTP verification ➔ New password establishment.
- **User Profile Navigation**:
  - Avatar badge and "Royal Foodie Member 👑" tier tag in Navbar.
  - Profile dropdown with quick access to *My Orders*, *Theme Switcher*, and *Sign Out*.
  - Automatic checkout autofill for authenticated members.

---

### 🎥 4. Live Kitchen Sizzle Reels & Rich Visual Media
- **Interactive Hero Presentation**:
  - Mode switch between **🎥 Live Sizzle Video** (with audio mute/unmute and pause/play controls) and **📸 Photo Feast**.
  - Animated CSS steam rise micro-animations above dishes.
  - Floating badges for *Live Delivery* and *Tamper-Proof Packaging*.
- **Chef Sizzle Reels Grid (`KitchenVideoReels`)**:
  - Live kitchen streams featuring authentic preparation of dum biryanis, sizzling kebabs, bubbling curries, and crispy dosas.
  - Hover-to-preview video playback.
  - Quick-add button to immediately add featured reel dishes to the cart.
  - Immersive full-screen **Sizzle Reel Modal** with customer review stats, chef notes, views, and likes counter.

---

### 🍛 5. Authentic Desi Gourmet Discovery
- **Comprehensive Dish Catalog**: Top-tier authentic dishes including *Royal Hyderabadi Dum Biryani*, *Lucknowi Galouti Kebabs*, *Old Delhi Butter Chicken*, *Mysore Masala Dosa*, *Kolkata Kathi Rolls*, *Kesar Rasmalai*, and *Banarasi Chaat*.
- **Cuisine & Category Filter Pills**:
  - Quick filtering by *Biryanis & Rice*, *Tandoori & Kebabs*, *Curries & Gravies*, *South Indian*, *Street Food*, *Mithai & Sweets*, and *Beverages*.
- **Multi-Param Filter Bar**:
  - Sort by: *Popularity*, *Highest Rated*, *Fastest Delivery*, *Min Order Amount*.
  - Filter toggles: *Free Delivery Only*, *Top Rated Only (4.8+)*.
  - 1-click filter reset.
- **Restaurant Profile Cards**:
  - Cover photography, verified ratings, delivery time estimates, price ranges, minimum order thresholds, and favorite bookmarking.

---

### ⚙️ 6. Deep Food Customization Engine
- **Customization Modal (`CustomizationModal`)**:
  - **Portion Sizing**: Half / Full / Family Pack with live price deltas.
  - **Preparation Style / Crust / Base**: Rumali Roti, Butter Naan, Laccha Paratha, Fragrant Jeera Rice.
  - **Spice Level Selector**: Mild, Medium, Hot, Desi Fiery 🌶️.
  - **Multi-Select Add-Ons**: Extra Dum Gravy, Mint Chutney, Roasted Boondi Raita, Gulab Jamun (1 pc).
  - **Cooking Instructions**: Free-form text box for allergy or drop-off requests.
  - **Live Dynamic Pricing**: Real-time formula `(base + size + style + addOns) * quantity`.

---

### 🛒 7. Intelligent Cart & Slide-Over Drawer
- **Slide-Over Drawer (`CartDrawer`)**: Framer Motion drawer accessible from any view with backdrop blur.
- **Free Delivery Progress Meter**: Dynamic visual progress bar indicating how much more to spend to unlock free delivery (₹299 threshold).
- **Coupon Discount Engine**:
  - Built-in promo codes: `FEAST50` (50% off up to ₹150), `TASTY20` (20% off), `FREESHIP` (Free delivery), `SWEET15` (15% off).
  - Real-time validation, minimum order requirements, and discount calculations.
- **Comprehensive Price Breakdown**: Subtotal, Promo Savings, Delivery Fee, Platform Hygiene Fee, and 5% GST & Taxes.
- **Dedicated Cart Page (`/cart`)**: Expansive page for managing cart items and reviewing item customizations.

---

### 💳 8. Localized Express Checkout
- **Contact Details**: Name, phone number (+91), email address with authentication sync.
- **Delivery Address**: Street address, apartment/suite number, and landmark notes.
- **Delivery Speed Options**: Standard (25-35 mins, Free) vs. Priority Express (15-20 mins direct, +₹30).
- **Flexible Indian Payment Gateways**:
  - **UPI / QR**: Instant handle suggestions (`@oksbi`, `@okhdfcbank`, `@paytm`, `@ybl`) with zero extra charges.
  - **Credit / Debit Cards**: RuPay, Visa, Mastercard with CVV and expiry masking.
  - **Cash on Delivery (COD)**: Pay at doorstep via cash or driver UPI QR scanner.
- **Confetti Celebration**: Smooth animated transition to order confirmation powered by `canvas-confetti`.

---

### 📍 9. Real-Time Order Tracking & Simulation
- **Animated Route Map (`DeliveryMapMock`)**:
  - Scalable vector map with origin kitchen pin, destination home pin, and animated delivery rider with radar ping effect.
  - Night-mode map color inversion in dark mode.
- **5-Stage Milestone Stepper (`OrderStatusTimeline`)**:
  1. *Order Confirmed & Payment Verified*
  2. *Kitchen Preparing Your Feast*
  3. *Delivery Executive Assigned*
  4. *Out for Delivery with Thermal Box*
  5. *Delivered to Your Doorstep*
- **Driver Profile Card**: Rider name, vehicle license number, rating, and simulated call/message triggers.
- **Interactive Step Simulator Toolbar**: On-screen control bar to instantly simulate status changes and milestones for testing.

---

### 📜 10. Persistent Order History & 1-Click Reorder
- Orders saved permanently in `localStorage` under `cravebite_orders`.
- Tabs for *All Orders*, *In Progress / Active*, and *Delivered*.
- **1-Click Instant Reorder**: Populates the shopping cart with the exact dish, quantity, and customized add-ons, and opens the cart drawer automatically.

---

### 🔍 11. Global Instant Search (`⌘K` / `Ctrl+K`)
- Universal modal shortcut to search across menu items, cuisines, and restaurants simultaneously.
- Direct item selection opens the customization modal or navigates to the restaurant immediately.

---

## 🛠️ Technology Stack & Dependencies

| Category | Technology | Version | Purpose |
|---|---|---|---|
| **Core Framework** | [React](https://react.dev/) | `^19.3.1` | Declarative component UI library |
| **Build Tool** | [Vite](https://vitejs.dev/) | `^8.3.4` | Ultra-fast HMR and bundle optimization |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^3.4.19` | Utility-first responsive design system |
| **Routing** | [React Router](https://reactrouter.com/) | `^7.18.4` | Client-side page navigation & URL params |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | `^14.5.0` | Production-ready gesture & UI animations |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.61.0` | Consistent, lightweight vector icon set |
| **FX & Confetti** | [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) | `^1.9.4` | Checkout celebration particle animations |
| **Linter** | [Oxlint](https://oxc.rs/) | `^1.88.0` | High-speed JavaScript/JSX code linter |

---

## 📂 Project Structure

```text
Food Delivery/
├── public/                     # Static public assets
├── src/
│   ├── components/
│   │   ├── auth/               # Login, Signup, OTP modal components
│   │   │   └── AuthModal.jsx
│   │   ├── cart/               # Cart slide-over, items, coupon input
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── CartItem.jsx
│   │   │   └── CouponInput.jsx
│   │   ├── common/             # Navbar, Footer, Search, Badges, Toast
│   │   │   ├── Badge.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchModal.jsx
│   │   │   └── Toast.jsx
│   │   ├── home/               # Hero, Categories, Video Reels, Dishes, Offers
│   │   │   ├── CategoryList.jsx
│   │   │   ├── FeaturedDishes.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── KitchenVideoReels.jsx
│   │   │   ├── OfferCarousel.jsx
│   │   │   ├── RestaurantCard.jsx
│   │   │   └── VideoReelModal.jsx
│   │   ├── restaurant/         # Restaurant profile, menus, customization modal
│   │   │   ├── CategoryTabs.jsx
│   │   │   ├── CustomizationModal.jsx
│   │   │   ├── MenuItemCard.jsx
│   │   │   └── RestaurantHeader.jsx
│   │   └── tracking/           # Live GPS map, status stepper, driver card
│   │       ├── DeliveryMapMock.jsx
│   │       ├── DriverCard.jsx
│   │       ├── OrderStatusTimeline.jsx
│   │       └── StepSimulatorControls.jsx
│   ├── context/                # React Context state management
│   │   ├── AuthContext.jsx     # User authentication, demo profiles, OTP logic
│   │   ├── CartContext.jsx     # Cart items, pricing, coupon discounts
│   │   ├── OrderContext.jsx    # Orders log, real-time status simulation
│   │   ├── ThemeContext.jsx    # System dark/light theme switcher
│   │   └── ToastContext.jsx    # Global floating notification toasts
│   ├── data/                   # Mock restaurant, menu, categories, and reel data
│   │   ├── categories.js
│   │   ├── kitchenVideos.js
│   │   ├── menuItems.js
│   │   ├── offers.js
│   │   └── restaurants.js
│   ├── pages/                  # Top-level view routes
│   │   ├── AuthPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── OrderConfirmationPage.jsx
│   │   ├── OrderHistoryPage.jsx
│   │   ├── OrderTrackingPage.jsx
│   │   └── RestaurantDetailPage.jsx
│   ├── utils/                  # Currency (₹ INR) & date formatters
│   │   └── helpers.js
│   ├── App.jsx                 # Top router and global layout wrapper
│   ├── index.css               # Base Tailwind, keyframes, scrollbars, fonts
│   └── main.jsx                # Application root mounting
├── index.html                  # HTML5 template with early theme bootstrap
├── package.json                # Project dependencies and npm scripts
├── postcss.config.js           # PostCSS Tailwind plugins
├── tailwind.config.js          # Tailwind theme tokens & color definitions
└── vite.config.js              # Vite configuration
```

---

## 🧭 Page Routes & Architecture

| Route | Page Component | Description |
|---|---|---|
| `/` | `HomePage` | Full-width discovery feed with Hero, Categories, Video Reels, Offers, and Restaurant Grid |
| `/restaurant/:id` | `RestaurantDetailPage` | Detailed restaurant header, category jump tabs, and customizable dish menu |
| `/cart` | `CartPage` | Dedicated full cart view with delivery threshold meter and price breakdown |
| `/checkout` | `CheckoutPage` | Address input, priority delivery, UPI / Card / COD payment, and order submission |
| `/confirmation/:orderId` | `OrderConfirmationPage` | Order success view with celebratory confetti, summary receipt, and tracking button |
| `/orders/:orderId` | `OrderTrackingPage` | Live GPS route map, milestone timeline, driver card, and status simulator |
| `/orders` | `OrderHistoryPage` | Past order receipts with active/completed filters and 1-click reorder |
| `/login` | `AuthPage` | Dedicated sign-in view with demo credentials and password recovery link |
| `/signup` | `AuthPage` | Dedicated member registration view |
| `/forgot-password` | `AuthPage` | 3-step OTP password reset workflow |

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version `18.0.0` or higher recommended)
- `npm` (version `9.0.0` or higher)

### 1. Clone or Open the Repository
```bash
cd "d:/Food Delivery"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

The application will start with Hot Module Replacement (HMR) at:
```text
http://localhost:5173/
```

### 4. Build for Production
To create a minified, production-ready build:
```bash
npm run build
```
Built production assets will be output to the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

### 6. Lint the Codebase
```bash
npm run lint
```

---

## 💡 Keyboard Shortcuts
- **`⌘K` / `Ctrl+K`**: Open global search from any page.
- **`Esc`**: Close any active modal, search overlay, or cart slide-over.

---

## 🔒 LocalStorage Keys Reference

| Storage Key | Data Stored |
|---|---|
| `cravebite_theme` | Active theme (`'dark'` or `'light'`) |
| `cravebite_cart` | Array of cart items with custom configuration objects |
| `cravebite_coupon` | Active applied coupon code and discount percentage |
| `cravebite_orders` | Chronological list of user orders with statuses |
| `cravebite_auth_user` | Authenticated session profile object |

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
