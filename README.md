# NOCTURNE ATELIER
> *"Architecture for the Modern Silhouette."*

An editorial luxury e-commerce storefront and integrated admin CMS engineering platform built with React, Vite, Tailwind CSS, and reactive `localStorage` persistence.

---

## 🏛️ Brand Identity & Design System
* **Brand Name:** **NOCTURNE ATELIER**
* **Tagline:** *"Architecture for the Modern Silhouette."*
* **Bespoke Scalable Vector SVG Logo:** An interlocking minimalist geometric monogram of **"N"** and **"A"** enclosed within a sharp architectural diamond frame with cardinal geometry points and stroke hover animations. Displayed in:
  * Main sticky navigation bar
  * Luxury editorial footer
  * 256-bit encrypted checkout header
  * Admin CMS sidebar
* **Palette:**
  * **Light Mode:** Warm Alabaster (`#FAF9F6`), Deep Obsidian (`#0B0B0C`), Muted Stone borders (`#E4E4E0`), and Electric Champagne (`#D4AF37`)
  * **Dark Mode:** Deep Obsidian (`#0B0B0C`), Warm Alabaster (`#FAF9F6`), Dark Stone (`#202025`), Gold Accents (`#E5C378`)
  * **Smoothness:** Custom cubic-bezier transition curves (`all 0.35s cubic-bezier(0.16, 1, 0.3, 1)`)

---

## 🛍️ Customer E-Commerce Storefront
1. **Dynamic Top Announcement Bar:**
   * Text controlled live from Admin Settings (e.g. *"COMPLIMENTARY EXPRESS SHIPPING ON ORDERS OVER $250 — CODE: NOCTURNE15"*).
   * One-click coupon code copy & application (`NOCTURNE15` for 15% off).
   * Live enable/disable toggle from Admin Settings.
2. **Sticky Glassmorphic Navbar:**
   * Bespoke SVG logo + luxury wordmark.
   * Category links: `All`, `Outerwear`, `Knitwear`, `Tailoring`, `Streetwear`, `Accessories`.
   * Expanding interactive search bar with ESC key clear.
   * Dark/Light mode toggle.
   * Saved Pieces (Wishlist) drawer trigger with live count badge.
   * Shopping Bag drawer trigger with item count and subtle pulse animation.
   * Admin Portal trigger button with lock indicator.
3. **Editorial Hero Section:**
   * Full-bleed split layout featuring high-fashion photography.
   * Bold kinetic typography with seasonal badge (*"AUTUMN / WINTER ARCHIVE • VOL. 04"*).
   * Dual CTAs: *"Explore Collection"* (smooth scroll) and *"View Lookbook"* (opens interactive editorial showcase).
4. **Interactive Product Catalog & Filtering:**
   * Pre-populated with **12 realistic high-fashion garments** across Outerwear, Knitwear, Tailoring, Streetwear, and Accessories.
   * Filter by Category pills, Size checkboxes (`XS`, `S`, `M`, `L`, `XL`), Price Range slider, and "In Stock Only" toggle.
   * Sort by `Featured Archive`, `Newest First`, `Price: Low to High`, and `Price: High to Low`.
5. **Product Cards & Micro-Interactions:**
   * Secondary image / zoom hover effects.
   * Quick-add size selector overlay.
   * Stock status badges (*"Low Stock"* if < 5, *"Sold Out"* if 0, *"Archival Sale"* if discounted).
   * Wishlist heart toggle button.
   * Quick View modal trigger.
6. **Quick-View & Detail Modal:**
   * High-resolution gallery preview with thumbnail toggling.
   * Interactive size and color swatch selectors.
   * Quantity stepper and stock allocation indicators.
   * Fabric provenance and garment care instructions.
7. **Slide-Over Shopping Cart & Slide-Over Wishlist:**
   * Live calculated free shipping progress bar.
   * Quantity steppers and item deletion.
   * Promo code engine (`NOCTURNE15` for 15% discount).
   * Dynamic calculations for Subtotal, Discount, Shipping, and Tax.
8. **Checkout Flow & Confetti Celebration:**
   * Recipient contact details, shipping address, and payment method selection (Credit Card, Apple Pay, White Glove Concierge).
   * Generates unique order ID (`#NOC-XXXX`), reduces catalog stock in real time, triggers confetti celebration, displays confirmation screen, and syncs immediately to the Admin Orders list.

---

## 🔐 Admin Authentication Gate
* **Route / Modal:** Click the **"Admin Portal"** button in navigation or footer.
* **Credentials:**
  * **Username:** `admin`
  * **Password:** `admin2008`
* Interactive error shake animation on invalid inputs.
* Seamless transition to the Admin Workspace with a **"View Live Storefront"** button to toggle between customer and admin views.

---

## 📊 Admin Dashboard & CMS Modules
1. **Dashboard Overview:**
   * Dynamic KPI Cards: Total Revenue (+18.4% badge), Total Orders (pending count), Average Order Value (AOV), and Active Inventory / Low Stock Count.
   * Sales & Revenue Analytics: SVG / CSS area chart toggleable between 7-day and 30-day horizons.
   * Category Distribution progress widget.
   * Recent Orders table with one-click detail inspection.
   * Actionable Panels: Low Stock Alerts with one-click **"+10 Restock"**, Top Archival Sellers leaderboard, and Live Store Activity Feed.
2. **Orders Management:**
   * Pre-populated with 8 realistic historical orders + newly placed customer orders.
   * Filter tabs with live count badges (`All`, `Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).
   * Search by Order ID, Client Name, or Email; sort by date or order value.
   * In-row live status dropdown allowing instant lifecycle updates with immediate KPI recalculation.
   * Full Order Details modal with itemized garment breakdown and delete option.
3. **Products Management (Full CRUD):**
   * Inventory table with thumbnails, SKU, category, price, color-coded stock levels, sizes, and featured star toggle.
   * **Add New Product Modal:** Name, SKU, Category, Price, Compare Price, Stock, Sizes, Color Swatches, Image URL with quick preset buttons, and live storefront card preview.
   * **Edit Product Modal:** Pre-populated with existing details, immediately updating both Admin and Storefront.
   * **Delete Product:** Permanent deletion with prompt confirmation.
4. **Store Settings:**
   * Brand & Storefront settings (Name, Tagline, Support Email, Promo Banner Text + toggle).
   * Commerce, Tax & Shipping rules (Currency Symbol, Tax %, Flat Shipping Fee, Free Shipping Threshold).
   * **Reset Demo Store Data:** Restores original 12 garments, 8 orders, and settings in one click.
   * **Export Store Data (JSON):** Downloads clean JSON backup of all store entities.

---

## 🚀 Running the Project
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
