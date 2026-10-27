# 🍛 CraveBite - Modern Food Delivery & Live Tracking Platform

<p align="center">
  <strong>Full-Featured Luxury Food Ordering Experience & 8-Module Enterprise Operations Suite</strong><br>
  <em>Built with React 19, Vite 8, Tailwind CSS, React Router 7, and Framer Motion.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8.3.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React_Router-7.18.4-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Framer_Motion-14.5.0-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge" alt="License: MIT" />
</p>

---

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Customer Storefront Flow](#-customer-storefront-flow)
- [📸 Enterprise Admin Visual Previews (8 Modules)](#-enterprise-admin-visual-previews-8-modules)
- [👑 Enterprise Admin Suite (Deep Dive)](#-enterprise-admin-suite-deep-dive)
  - [1. Dashboard & Analytics](#1-dashboard--analytics)
  - [2. Order Management](#2-order-management)
  - [3. Restaurant & Menu Management](#3-restaurant--menu-management)
  - [4. Delivery Partner Fleet Management](#4-delivery-partner-fleet-management)
  - [5. Customer Management & CRM](#5-customer-management--crm)
  - [6. Payments & Finance](#6-payments--finance)
  - [7. Offers & Promotions](#7-offers--promotions)
  - [8. Support Desk & System Settings](#8-support-desk--system-settings)
- [Multi-Device Responsive Experience](#-multi-device-responsive-experience)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Page Routes](#-page-routes)
- [Getting Started](#-getting-started)
- [Keyboard Shortcuts & Tips](#-keyboard-shortcuts--tips)
- [License](#-license)

---

## 🌟 Project Overview

**CraveBite** is a complete, production-grade food delivery web application engineered with modern frontend practices. Combining an obsidian luxury dark/light mode aesthetic inspired by top global culinary apps (Swiggy, Zomato, DoorDash) with an **8-Module Enterprise Admin Operations Hub**, CraveBite delivers a seamless end-to-end journey for customers, delivery partners, and platform administrators.

### Core Highlights:
- **Dual-Experience System**: Seamlessly switch between the **Customer Storefront** (`/`) and the **Enterprise Admin Suite** (`/admin`) with synchronized state and an instant-access floating portal switcher.
- **Curated Culinary Discovery**: Handcrafted menu database spanning authentic Biryanis, Tandoori & Kebabs, South Indian classics, North Indian Curries, Mithai, Street Food, and Gourmet Beverages.
- **Deep Meal Customization**: Configure portion sizing (Half / Full / Family), crust/bread styles, spice levels (Mild, Medium, Desi Fiery 🌶️), multi-select add-ons, and kitchen instructions with dynamic price recalculation.
- **Interactive Live GPS Tracking**: 5-stage milestone stepper, simulated night-mode map with moving courier scooter, test step simulator controls, and delivery driver card.
- **8 Enterprise Admin Modules**: Full-scale operational control over real-time orders, restaurant onboarding with FSSAI verification, menu pricing & availability, fleet KYC & EV tracking, customer CRM, financial ledger & GST reports, coupon campaign builder, and weather surge multiplier settings.
- **Zero-Flicker Dark/Light Theme**: Immediate theme initialization with persistent local storage and fluid transitions.

---

## 🚀 Key Features

| Category | Highlights |
| :--- | :--- |
| **🌓 Theme System** | Zero-flicker Dark / Light mode toggle with tailored slate and obsidian gradients. |
| **🔍 Instant Omnisearch** | Global `⌘K` / `Ctrl+K` modal searching across dishes, cuisines, and restaurants with live results. |
| **🎥 Live Sizzle Reels** | Full kitchen preparation video reels with sound toggle, likes, chef notes, and direct "Add to Cart" triggers. |
| **🍔 Dynamic Customizer** | Real-time portion sizing, bread/style selections, spice levels, add-on pricing, and special cooking notes. |
| **🛒 Smart Cart & Coupons** | Slide-over cart drawer, free-delivery threshold progress bar, coupon engine (`FEAST50`, `WELCOME100`, `FREESHIP`), and platform hygiene breakdown. |
| **💳 Localized Checkout** | Contact auto-sync, address book, priority express delivery option, UPI handle suggestions, Cards (RuPay/Visa/Mastercard), and COD. |
| **🛵 Real-Time Tracker** | Interactive route map, 5-stage milestone progression, courier profile card, and on-screen step simulator toolbar. |
| **🔐 User Authentication** | Clean Sign-In / Sign-Up with tab animations, 6-digit OTP password recovery flow, and preloaded demo accounts. |
| **👑 8 Admin Modules** | Comprehensive operations hub with reactive state updates, audit logging, CSV export, and error boundaries. |

---

## 🍽️ Customer Storefront Flow

1. **Discovery Feed (`HomePage`)**:
   - Hero banner with interactive toggle between live culinary sizzle video and high-resolution photo feast.
   - Category filter pills (*Biryanis*, *Tandoori*, *Curries*, *South Indian*, *Street Food*, *Mithai*).
   - Multi-parameter filter bar (sort by rating, speed, price; filter for pure-veg and free delivery).
   - Video reels section showcasing authentic kitchen preparation.
2. **Restaurant Detail (`RestaurantDetailPage`)**:
   - Detailed header with cuisine badges, delivery time, hygiene score, and bookmarks.
   - Category jump tabs and dish cards with dietary indicators.
   - Item Customizer Modal with dynamic real-time bill recalculation.
3. **Cart & Slide-Over Drawer (`CartDrawer` & `CartPage`)**:
   - Slide-over drawer accessible from any page with backdrop blur.
   - Dynamic threshold meter for free delivery (₹299 target).
   - Interactive promo coupon validation with instant discount calculation.
4. **Checkout (`CheckoutPage`)**:
   - Contact and address forms with automatic profile prefill for authenticated users.
   - Standard delivery vs. Priority Express (+₹30 direct rush delivery).
   - Localized Indian payment gateways (UPI, Credit/Debit Cards, Cash on Delivery).
5. **Confirmation & Confetti (`OrderConfirmationPage`)**:
   - Smooth celebratory particle animations powered by `canvas-confetti`.
   - Itemized order receipt with estimated delivery time and direct tracking button.
6. **Live GPS Order Tracking (`OrderTrackingPage`)**:
   - Scalable vector delivery route map with origin kitchen, destination home, and live moving courier with radar ping.
   - 5-stage milestone status timeline:
     1. *Order Confirmed & Payment Verified*
     2. *Kitchen Preparing Your Feast*
     3. *Delivery Partner Assigned*
     4. *Out for Delivery with Thermal Box*
     5. *Delivered to Your Doorstep*
   - Interactive **Step Simulator Toolbar** to manually advance or reset the tracking state for evaluation.
7. **Order History (`OrderHistoryPage`)**:
   - Chronological past order logs with active vs. completed status filters.
   - **1-Click Instant Reorder**: Populates the cart with exact custom configurations and opens the cart drawer.

---

## 📸 Enterprise Admin Visual Previews (8 Modules)

The **CraveBite Admin Portal** (`/admin`) includes 8 dedicated enterprise modules. Visual captures of all active screens are shown below:

| Module | Route / Tab | Screenshot Preview |
| :--- | :--- | :--- |
| **01. Dashboard & Analytics** | `/admin?tab=dashboard` | <a href="#1-dashboard--analytics"><img src="screenshot/01%20Dashboard.PNG" alt="01. Dashboard & Analytics" width="400" /></a> |
| **02. Order Management** | `/admin?tab=orders` | <a href="#2-order-management"><img src="screenshot/02%20Order.PNG" alt="02. Order Management" width="400" /></a> |
| **03. Restaurant & Menu** | `/admin?tab=restaurants` | <a href="#3-restaurant--menu-management"><img src="screenshot/03%20Menu.PNG" alt="03. Restaurant & Menu" width="400" /></a> |
| **04. Delivery Partner Fleet** | `/admin?tab=delivery` | <a href="#4-delivery-partner-fleet-management"><img src="screenshot/04%20Delivery.PNG" alt="04. Delivery Partner Fleet" width="400" /></a> |
| **05. Customer CRM** | `/admin?tab=customers` | <a href="#5-customer-management--crm"><img src="screenshot/05%20customer.PNG" alt="05. Customer CRM" width="400" /></a> |
| **06. Payments & Finance** | `/admin?tab=finance` | <a href="#6-payments--finance"><img src="screenshot/06%20payment.PNG" alt="06. Payments & Finance" width="400" /></a> |
| **07. Offers & Promotions** | `/admin?tab=offers` | <a href="#7-offers--promotions"><img src="screenshot/07%20offers.PNG" alt="07. Offers & Promotions" width="400" /></a> |
| **08. Support Desk & Settings** | `/admin?tab=support` | <a href="#8-support-desk--system-settings"><img src="screenshot/08%20support%20settings.PNG" alt="08. Support Desk & Settings" width="400" /></a> |

---

## 👑 Enterprise Admin Suite (Deep Dive)

The **CraveBite Admin Portal** (`/admin`) provides platform operators with 8 fully integrated, reactive management modules connected to a shared reactive state provider (`AdminContext`) with local persistence and audit logs.

```
                              ┌───────────────────────────────────┐
                              │     CraveBite Admin Portal        │
                              │           (/admin)                │
                              └─────────────────┬─────────────────┘
                                                │
         ┌──────────────┬──────────────┬────────┴──────┬──────────────┬──────────────┐
         ▼              ▼              ▼               ▼              ▼              ▼
   01. Dashboard   02. Orders    03. Restaurant   04. Delivery   05. Customers   06. Finance
   & Analytics     Management    & Menu Catalog   Partner Fleet   CRM & VIP      & Ledger
         │              │              │               │              │              │
         └──────────────┴──────────────┼───────────────┴──────────────┴──────────────┘
                                       │
                        ┌──────────────┴──────────────┐
                        ▼                             ▼
                 07. Offers &                  08. Support Desk
                  Promotions                   & Surge Settings
```

---

### 1. Dashboard & Analytics

![01. Dashboard & Analytics Screenshot](screenshot/01%20Dashboard.PNG)

- **Live KPI Metric Cards**: Real-time Gross Merchandise Value (GMV), total active orders, active couriers on duty, and platform customer count.
- **Sales Analytics Chart**: Interactive 7-day revenue trend bar chart comparing daily earnings against targets.
- **Hourly Peak-Hours Analysis**: Visual heat map and bar breakdown identifying 12:00-14:00 Lunch and 19:30-22:00 Dinner delivery surges.
- **Recent Platform Activities**: Live chronological stream of orders, refunds, fleet updates, and admin actions.
- **Quick Operations Toolbar**: Instant shortcuts for emergency broadcast alerts, adding promo codes, and verifying pending restaurants.

---

### 2. Order Management

![02. Order Management Screenshot](screenshot/02%20Order.PNG)

- **Status Filter Board**: Seamless tab switching across *All*, *Pending*, *Confirmed*, *In Kitchen*, *Out for Delivery*, *Delivered*, and *Cancelled*.
- **Live Fleet Dispatcher**: Assign available delivery executives directly from an interactive dropdown to confirmed kitchen orders.
- **Deep Order Inspection Modal**: View itemized dish customizations, add-ons, cooking instructions, customer address, payment method, and timestamps.
- **Dispute & Refund Authorization**: Instant 1-click refund authorization with automatic audit logging and financial ledger updates.

---

### 3. Restaurant & Menu Management

![03. Restaurant & Menu Management Screenshot](screenshot/03%20Menu.PNG)

- **Partner Verification Desk**: Review onboarding restaurant applications, inspect FSSAI hygiene registration certificate numbers, GSTIN, and location proofs.
- **Commission Management**: Configurable commission rate slider (15% - 25%) per restaurant partner.
- **Menu Catalog & Inventory Editor**:
  - Live search across 600+ items and category filtering.
  - In-stock / Out-of-stock toggle switches with immediate effect.
  - Price editing and spice-level adjustments.
  - Add new dish modal with category, cuisine, prep time, and dietary tags.

---

### 4. Delivery Partner Fleet Management

![04. Delivery Partner Fleet Screenshot](screenshot/04%20Delivery.PNG)

- **Interactive Fleet Route Map**: Visual distribution of couriers across regional zones with status pins.
- **Courier State Toggles**: Monitor and switch partner statuses (`Online & Ready`, `Delivering`, `Offline`).
- **KYC & Document Verification**: Audit rider government credentials including Driver's License, Vehicle Registration (RC), and Aadhaar.
- **Fleet Analytics**: Battery status for Electric Vehicle (EV) fleets, completed orders count, customer satisfaction ratings, and weekly payout calculations.

---

### 5. Customer Management & CRM

![05. Customer Management & CRM Screenshot](screenshot/05%20customer.PNG)

- **User Directory**: Searchable list of registered consumers with contact details, default addresses, and signup dates.
- **Loyalty & VIP Club**: View customer tier (*Royal Foodie Member* / *Gold VIP*) and adjust CraveCoins rewards balance.
- **Fraud Protection & Account Guard**: Set user account status to `Active`, `Suspended`, or `Flagged for Fraud`.
- **Order & Complaint History**: Direct inspection of past transactions and filed support tickets.

---

### 6. Payments & Finance

![06. Payments & Finance Screenshot](screenshot/06%20payment.PNG)

- **Financial Health Overview**: Total gross revenue, net platform commission take, delivery executive payouts, and restaurant earnings.
- **Settlement Ledger & Batch Processing**: 1-click restaurant payout batch execution (NEFT/RTGS) with auto-generated settlement transaction references.
- **Payment Gateway Distribution**: Analytics on UPI vs. Card vs. Net Banking vs. COD payment volume.
- **Statutory Tax Ledger (GST & TCS)**: Automated 5% restaurant GST and platform TCS tax calculation with **One-Click CSV Financial Report Export**.

---

### 7. Offers & Promotions

![07. Offers & Promotions Screenshot](screenshot/07%20offers.PNG)

- **Coupon Promotion Engine**: Active promo codes (`FEAST50`, `WELCOME100`, `FREESHIP`, `ROYALFEAST`) with discount types (percentage or flat).
- **Campaign Creation Wizard**: Create new promotional coupons with code name, discount percentage, maximum discount cap, minimum order value (MOV), and expiration date.
- **Redemption Analytics**: Track total redemptions, campaign burn rates, and revenue generated per promotion.

---

### 8. Support Desk & System Settings

![08. Support Desk & System Settings Screenshot](screenshot/08%20support%20settings.PNG)

- **Customer Support Desk**: In-app ticket triage with urgency badges (`Urgent`, `High`, `Normal`), status filters, and one-click ticket resolution.
- **Dynamic Weather & Surge Multipliers**: Configure zone-based surge multipliers (1.2x – 2.0x) for monsoon rain, peak lunch, or late-night delivery.
- **Platform Fee Controls**: Adjust base delivery fee, platform hygiene fee, and free delivery thresholds.
- **Broadcast Alert Center**: Dispatch system-wide announcements to all active users and delivery partners.
- **RBAC Matrix & Immutable Audit Log**: View administrative roles (*SuperAdmin*, *OpsManager*, *FinanceLead*) and review chronological audit trails with IP addresses and action timestamps.

---

## 📱 Multi-Device Responsive Experience

CraveBite features a responsive layout optimized for all form factors:

- **🖥️ Desktop & Ultra-Wide (`1025px - 1440px+`)**:
  - Full-width expansive layout eliminating artificial container clamping.
  - 4-to-5 column restaurant grid with hover effects.
  - Side-by-side checkout breakdown and split-view order management boards.
- **📱 Tablet (`641px - 1024px`)**:
  - Balanced 2-to-3 column card grids.
  - Touch-friendly filter bar and responsive search modal.
  - Adaptive admin dashboard with collapsable analytics widgets.
- **📲 Mobile (`< 640px`)**:
  - Touch-optimized bottom-sheet modals and slide-up customizer drawer.
  - Sticky bottom checkout action pill with live total and item count.
  - Single-column dish cards with easy thumb touch targets.
  - Viewport bottom clearance padding preventing content overlap.

---

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Core Framework** | [React](https://react.dev/) | `^19.3.1` | Modern declarative UI component architecture |
| **Build Tooling** | [Vite](https://vitejs.dev/) | `^8.3.4` | Ultra-fast development server with instant HMR |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^3.4.19` | Utility-first responsive design system with custom theme tokens |
| **Routing** | [React Router](https://reactrouter.com/) | `^7.18.4` | Declarative client-side routing and URL parameter synchronization |
| **UI Animations** | [Framer Motion](https://www.framer.com/motion/) | `^14.5.0` | Production-grade gesture and slide drawer animations |
| **Iconography** | [Lucide React](https://lucide.dev/) | `^1.61.0` | Lightweight, crisp SVG icon library |
| **Celebrations** | [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) | `^1.9.4` | Interactive particle confetti on order placement |
| **Linter** | [Oxlint](https://oxc.rs/) | `^1.88.0` | High-speed JavaScript & JSX code linter |
| **Persistence** | Browser `localStorage` | Built-in | Client-side persistence for cart, theme, orders, and admin state |

---

## 📁 Project Architecture

```plaintext
Food Delivery/
├── public/                                # Public static assets
│   ├── favicon.svg                        # CraveBite brand favicon
│   ├── icons.svg                          # Vector icons sprite
│   └── images/                            # High-resolution dish photography
├── screenshot/                            # 📸 Real platform screenshots
│   ├── 01 Dashboard.PNG                   # 01. Dashboard & Analytics
│   ├── 02 Order.PNG                       # 02. Order Lifecycle & Dispatch
│   ├── 03 Menu.PNG                        # 03. Restaurant & Menu Catalog
│   ├── 04 Delivery.PNG                    # 04. Fleet Dispatch & KYC
│   ├── 05 customer.PNG                    # 05. Customer CRM & Loyalty
│   ├── 06 payment.PNG                     # 06. Payments, Settlements & GST
│   ├── 07 offers.PNG                      # 07. Offers, Coupons & Growth
│   └── 08 support settings.PNG            # 08. Support Desk & Surge Settings
├── src/
│   ├── assets/                            # Brand assets, hero banners, vector logos
│   ├── components/
│   │   ├── admin/                         # 👑 Enterprise Admin Suite
│   │   │   ├── AdminErrorBoundary.jsx     # Self-healing admin error fallback with reset
│   │   │   ├── AdminLayout.jsx            # Admin header, sidebar navigation & quick controls
│   │   │   └── modules/                   # 8 Dedicated Enterprise Submodules
│   │   │       ├── DashboardModule.jsx           # 01. KPIs, GMV trend chart, peak hours
│   │   │       ├── OrderManagementModule.jsx     # 02. Live order board, dispatcher, refund modal
│   │   │       ├── RestaurantMenuModule.jsx      # 03. FSSAI verification, catalog & stock switches
│   │   │       ├── DeliveryPartnerModule.jsx     # 04. Fleet map, KYC audits, shift tracking
│   │   │       ├── CustomerManagementModule.jsx  # 05. CRM profiles, Gold VIP, fraud guard
│   │   │       ├── PaymentsFinanceModule.jsx     # 06. Payouts, gateway analytics, CSV export
│   │   │       ├── OffersPromotionsModule.jsx    # 07. Coupon engine, campaign wizard, analytics
│   │   │       └── SupportSettingsModule.jsx     # 08. Support tickets, surge pricing, RBAC & logs
│   │   ├── auth/                          # Sign In, Sign Up, and OTP password recovery modal
│   │   │   └── AuthModal.jsx
│   │   ├── cart/                          # Slide-over cart drawer and coupon input
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── CartItem.jsx
│   │   │   └── CouponInput.jsx
│   │   ├── common/                        # Global Navbar, Footer, Badges, Toast, SearchModal
│   │   │   ├── Badge.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchModal.jsx
│   │   │   └── Toast.jsx
│   │   ├── home/                          # HeroBanner, Categories, KitchenReels, FilterBar, Cards
│   │   │   ├── CategoryList.jsx
│   │   │   ├── FeaturedDishes.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── KitchenVideoReels.jsx
│   │   │   ├── OfferCarousel.jsx
│   │   │   ├── RestaurantCard.jsx
│   │   │   └── VideoReelModal.jsx
│   │   ├── restaurant/                    # RestaurantHeader, CategoryTabs, CustomizationModal
│   │   │   ├── CategoryTabs.jsx
│   │   │   ├── CustomizationModal.jsx
│   │   │   ├── MenuItemCard.jsx
│   │   │   └── RestaurantHeader.jsx
│   │   └── tracking/                      # DeliveryMapMock, DriverCard, Timeline, StepControls
│   │       ├── DeliveryMapMock.jsx
│   │       ├── DriverCard.jsx
│   │       ├── OrderStatusTimeline.jsx
│   │       └── StepSimulatorControls.jsx
│   ├── context/                           # Unified React Context State Providers
│   │   ├── AdminContext.jsx               # Enterprise admin state, operations & audit logs
│   │   ├── AuthContext.jsx                # User authentication, demo logins, OTP reset
│   │   ├── CartContext.jsx                # Dynamic cart, add-ons calculation, coupon discounts
│   │   ├── OrderContext.jsx               # Order lifecycle, active orders & simulation
│   │   ├── ThemeContext.jsx               # Dark/Light theme toggle with zero-flicker init
│   │   ├── ToastContext.jsx               # Global notification system
│   │   └── ViewModeContext.jsx            # Responsive view switcher
│   ├── data/                              # Static & dynamic mock databases
│   │   ├── adminMockData.js               # Initial state data for all 8 Admin modules
│   │   ├── categories.js                  # Food & regional categories
│   │   ├── kitchenVideos.js               # Sizzle reel kitchen streams
│   │   ├── menuItems.js                   # Handcrafted 600+ dish catalog
│   │   ├── offers.js                      # Promotional discounts & coupons
│   │   └── restaurants.js                 # Curated restaurant directory
│   ├── pages/                             # Declarative Route Pages
│   │   ├── AdminPortalPage.jsx            # Admin command center (`/admin`)
│   │   ├── AuthPage.jsx                   # Dedicated authentication view
│   │   ├── CartPage.jsx                   # Dedicated full-view shopping cart
│   │   ├── CheckoutPage.jsx               # Multi-step express checkout
│   │   ├── HomePage.jsx                   # Main culinary discovery feed
│   │   ├── OrderConfirmationPage.jsx      # Confetti celebration & order receipt
│   │   ├── OrderHistoryPage.jsx           # Past order archives & 1-click reorder
│   │   ├── OrderTrackingPage.jsx          # Live GPS map & milestone timeline
│   │   └── RestaurantDetailPage.jsx       # Detailed restaurant profile & customizable menu
│   ├── utils/                             # Currency formatters, bill calculators, helpers
│   │   └── helpers.js
│   ├── App.jsx                            # Router configuration & floating portal switcher
│   ├── index.css                          # Custom scrollbars, animations, obsidian themes
│   └── main.jsx                           # Application bootstrap mounting
├── index.html                             # HTML5 root with early theme bootstrap
├── package.json                           # Dependencies and scripts
├── tailwind.config.js                     # Design tokens & color definitions
└── vite.config.js                         # Vite build configuration
```

---

## 🧭 Page Routes

| Route | Page Component | Access | Description |
| :--- | :--- | :--- | :--- |
| `/` | `HomePage` | Public | Main culinary discovery feed with Hero, Categories, Video Reels, and Restaurants |
| `/restaurant/:id` | `RestaurantDetailPage` | Public | Restaurant profile with sticky category tabs, dish cards, and customizer modal |
| `/cart` | `CartPage` | Public | Dedicated shopping cart with threshold meter, promo code input, and item breakdown |
| `/checkout` | `CheckoutPage` | Public | Multi-step express checkout with address autofill, priority speed, and payment gateways |
| `/confirmation/:orderId` | `OrderConfirmationPage` | Public | Celebratory order confirmation view with confetti and estimated delivery time |
| `/orders/:orderId` | `OrderTrackingPage` | Public | Interactive live GPS tracking map, 5-stage timeline, and test step simulator |
| `/orders` | `OrderHistoryPage` | Authenticated | Chronological past receipts with filter tabs and instant 1-click reordering |
| `/login` | `AuthPage` | Public | Dedicated sign-in view with demo credentials and password recovery link |
| `/signup` | `AuthPage` | Public | Member registration view |
| `/forgot-password` | `AuthPage` | Public | 3-step simulated OTP password reset workflow |
| `/admin` | `AdminPortalPage` | Admin / Demo | **Unified Enterprise Operations Suite** covering all 8 operational modules |

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Installation
Navigate to your project directory and install all dependencies:
```bash
npm install
```

### 2. Development Server
Start the local Vite development server:
```bash
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:5173
```

> **Navigation Tip**:
> - Visit `http://localhost:5173/` for the **Customer Storefront**.
> - Visit `http://localhost:5173/admin` or click the **"👑 Admin Portal"** button in the top navigation bar or floating corner pill to access the **Enterprise Operations Suite**.

### 3. Code Quality & Linting
Run the fast Oxlint linter to verify code cleanliness:
```bash
npm run lint
```

### 4. Production Build
Compile the optimized, minified production assets:
```bash
npm run build
```

To preview the production bundle locally:
```bash
npm run preview
```

---

## 💡 Keyboard Shortcuts & Tips

- **`⌘K` / `Ctrl+K`**: Opens the universal Omnisearch modal from anywhere in the application.
- **`Esc`**: Dismisses any open modal, search drawer, or slide-over cart drawer.
- **Demo Admin Access**: The Admin Hub is immediately accessible without complex configuration. Click **"👑 Admin Portal"** in the navbar or navigate directly to `/admin`.
- **Live Simulator**: On the Order Tracking page (`/orders/:orderId`), use the on-screen **"Step Simulator Toolbar"** to instantly test each delivery milestone from kitchen preparation to doorstep arrival.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and build upon it.
