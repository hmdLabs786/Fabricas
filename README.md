# FABRICAS — Karachi
> *"Contemporary Pakistani Fashion, Tailored for Everyday Elegance."*

A modern, minimalist, responsive E-Commerce Clothing Storefront & Integrated Admin CMS engineered for **FABRICAS** — a Karachi-based fashion label. Built with React 19, Vite, Tailwind CSS v4, Lucide icons, and reactive `localStorage` persistence.

---

## 🏛️ Brand Identity & Design System
* **Brand Name:** **FABRICAS**
* **Heritage & Origin:** Karachi, Pakistan
* **Bespoke Scalable Vector SVG Logo:** An interlocking geometric woven "F" emblem rendered in Persian teal (`#0F766E`) and warm terracotta (`#C87D55`) stitch accents.
* **Typography:** Elegant modern sans-serif stack combining `Plus Jakarta Sans` for clean body readability and `Outfit` for refined display headings.
* **Color Palette:**
  * Background: Warm Linen / Off-White (`#FAF8F5`)
  * Surface: Crisp White (`#FFFFFF`) with subtle warm stone borders (`#E7E5E0`)
  * Accents: Deep Persian Teal (`#0F766E`) and Warm Terracotta (`#C87D55`)
  * Currency: All pricing rendered natively in **Pakistani Rupee (`Rs. ` / PKR)**

---

## 🛍️ Customer E-Commerce Storefront

1. **Top Announcement Bar:**
   * Dynamic banner with customizable text from Admin Settings (e.g., *"Free shipping across Karachi on orders over Rs. 3,500 — WhatsApp: +92 3222567147"*).
   * One-click coupon code copy (`FABRICAS10` for 10% off).
   * Live toggle in Admin Settings.

2. **Clean Editorial Navigation:**
   * Bespoke woven "F" SVG logo and **FABRICAS • KARACHI** wordmark.
   * Navigation items:
     * **Home**: Landing page featuring curated 4-product collection and "Show More Products" button.
     * **Shop**: Dynamic dropdown sub-menu derived automatically from active inventory categories (Eastern Wear, Unstitched, Kurtas, Shawls, Western, etc.).
     * **Contact**: Direct Karachi showroom details and immediate WhatsApp/Email contact actions.
   * Quick action icons:
     * **Track Order**: Instant modal lookup by Order ID (`#FAB-XXXX`) or customer phone number.
     * **Favorites**: Wishlist drawer with live badge counter.
     * **Cart**: Slide-over bag with real-time subtotal and WhatsApp checkout.

3. **Text-Only Centered Hero Section (No Imagery):**
   * Minimalist, typography-centric hero honoring Karachi's textile heritage.
   * Prominent badge: *"Karachi Based Clothing Store"*.
   * Heading: *"Explore Clothing — Handcrafted Silhouettes & Contemporary Fabrics"*.
   * Direct CTA buttons to browse the shop or explore categories.

4. **Product Catalog & Filtering (Home vs. Shop):**
   * **Home Page:** Displays strictly **4 featured products** maximum with a large "Show More Products" button routing to the full Shop.
   * **Shop Page:** Streamlined filter bar containing **strictly**:
     * **"In Stock Only"** checkbox.
     * **"Sort By"** dropdown (`Featured`, `Newest`, `Price: Low to High`, `Price: High to Low`).
     * Clean empty state with quick admin shortcut when no products exist yet.

5. **Adaptive Product Display:**
   * Garments with **no sizes or colors** (e.g. unstitched fabric, dupattas, shawls) display a clean 1-click **"Add to Bag"** button.
   * Garments with **configured sizes/colors** display quick-select overlays and swatch previews.
   * Stock status badges (*"Low Stock"* when `< 5`, *"Sold Out"* when `0`).

6. **Quick View & Details Modal:**
   * Full product overview with dynamic attributes (sizes, colors, fabric composition, care guide, and custom notes).

7. **Direct WhatsApp Checkout Flow:**
   * Replaced traditional multi-step checkout with a seamless **"Continue to WhatsApp"** pipeline.
   * Customers enter Name, Phone Number, Karachi/Pakistan Delivery Address, and optional notes.
   * System generates a unique tracking order reference (e.g. `#FAB-7821`) and formats an instant WhatsApp message:
     ```text
     Assalam o Alaikum Fabricas Team! 🌸

     I would like to place an order:
     Order ID: #FAB-7821

     Customer Details:
     • Name: [Customer Name]
     • Phone: [03XXXXXXXXX]
     • Delivery Address: [Street, Area, City]

     Items Ordered:
     1. [Product Name] (Size: M, Color: Olive) x 1 = Rs. 4,500
     --------------------------
     Subtotal: Rs. 4,500
     Estimated Delivery: FREE (Orders over Rs. 3,500)
     Total Payable: Rs. 4,500 (Cash on Delivery)
     ```
   * Automatically opens `https://wa.me/923222567147` with the pre-filled message.
   * Pushes order into `localStorage` so the customer can track it instantly and the store manager sees it in the Admin Dashboard.

8. **Contact View (Clean Info, No Form):**
   * Strictly displays Karachi studio address, WhatsApp (`+92 3222567147`), Email (`fabricas@gmail.com`), and business hours.
   * Direct "Chat on WhatsApp" and "Email Fabricas" buttons.

9. **Floating Widgets:**
   * Floating WhatsApp quick chat button linking directly to `+92 3222567147`.
   * Smooth Scroll-to-Top button that appears after scrolling down.

---

## 🔒 Secret Admin Portal

* **Hidden Access:** No visible admin link or button in the header or main navigation.
* **Access Method:** Click the **FABRICAS logo in the website footer** to trigger the authentication modal.
* **Authentication:**
  * **Username:** `admin`
  * **Password:** `admin2008`
  * Credentials are **NOT** shown on screen.
  * Features interactive shake animation on invalid input.

---

## ⚙️ Admin CMS & Operations

The Admin Workspace features a focused 4-module navigation:

1. **Dashboard Overview:**
   * Real-time KPI cards: Total Revenue (PKR), Total WhatsApp Orders, Average Order Value (AOV), and Active Inventory Count.
   * Latest Orders table with status badges and quick modal lookup.
   * Low stock alerts widget with 1-click **"Restock +10"** button.
   * Recent activity audit log.

2. **Orders Management:**
   * Filter tabs by order status: `All`, `Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`.
   * Search by Order ID, Customer Name, or Phone.
   * In-table live status selector with instant state synchronization.
   * Order Details modal with itemized garment list and 1-click WhatsApp customer contact button.

3. **Inventory Management (Flexible Product Attributes):**
   * **Full CRUD:** Create, Read, Update, and Delete products.
   * **Dynamic Attribute Configuration:** Not all garments have sizes or colors (e.g. unstitched fabric, stoles). The modal provides toggles:
     * Toggle **Sizes** (`XS`, `S`, `M`, `L`, `XL`, `Custom`) ON or OFF.
     * Toggle **Colors** ON or OFF with customizable color hex & label inputs.
     * Toggle **Fabric & Material** details ON or OFF.
     * Toggle **Custom Notes / Fit Advice** ON or OFF.
   * Category assigner with instant addition of new categories.
   * SKU generator and featured item toggle.

4. **Settings:**
   * Store Name, Tagline, Email (`fabricas@gmail.com`), and WhatsApp Number (`+92 3222567147`).
   * Top Promo Announcement toggle and message editor.
   * Category Management (add/remove categories that power the Shop dropdown sub-menu).
   * Delivery settings (Currency `Rs. `, Flat Delivery Fee, Free Delivery Threshold).
   * JSON Export/Backup for all store data.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation & Run
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Key Files Structure

```
├── index.html                   # HTML entry with Plus Jakarta Sans & Outfit fonts
├── src/
│   ├── App.jsx                  # Main application orchestrator (Home, Shop, Contact, Admin)
│   ├── index.css                # Tailwind CSS v4 setup and custom animations
│   ├── context/
│   │   └── StoreContext.jsx     # Reactive store state, localStorage persistence & WhatsApp order engine
│   ├── data/
│   │   └── defaultData.js       # Store configuration, Karachi defaults, blank product/order catalog
│   ├── components/
│   │   ├── common/
│   │   │   ├── Logo.jsx         # Custom SVG geometric woven 'F' logo
│   │   │   └── FloatingWidgets.jsx # WhatsApp float button & scroll to top
│   │   ├── storefront/
│   │   │   ├── Navbar.jsx       # Header with dynamic Shop sub-menu, track order, wishlist & cart
│   │   │   ├── Hero.jsx         # Text-only centered Karachi hero section
│   │   │   ├── ProductGrid.jsx  # Responsive 4-col product grid with empty state
│   │   │   ├── ProductCard.jsx  # Garment card with adaptive size/color handling
│   │   │   ├── ProductFilter.jsx # Strictly Sort & In Stock Only
│   │   │   ├── QuickViewModal.jsx # Product detail view
│   │   │   ├── CartDrawer.jsx   # Slide-over cart with WhatsApp CTA
│   │   │   ├── WhatsAppOrderModal.jsx # Order form that generates WhatsApp message
│   │   │   ├── TrackOrderModal.jsx # Order status tracker by ID or phone
│   │   │   ├── ContactView.jsx  # Karachi contact info (no form)
│   │   │   └── Footer.jsx       # Footer with secret logo click trigger for Admin Login
│   │   └── admin/
│   │       ├── AdminLoginModal.jsx # Clean login modal (credentials hidden)
│   │       ├── AdminLayout.jsx  # Admin layout with Dashboard, Orders, Inventory, Settings
│   │       ├── DashboardOverview.jsx # Analytics, KPIs, latest orders & low stock alert
│   │       ├── OrdersManagement.jsx # Order management with status updates
│   │       ├── ProductsManagement.jsx # Inventory CRUD with dynamic attributes
│   │       ├── ProductFormModal.jsx # Flexible garment attribute configurator
│   │       └── SettingsView.jsx # Live store & category configuration
```

---

*Designed and engineered for **FABRICAS** — Architecture for Contemporary Pakistani Fashion.*
