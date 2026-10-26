import React, { useState, useMemo } from 'react';
import { useStore } from './context/StoreContext';

// Common Components
import Toast from './components/common/Toast';

// Storefront Components
import PromoBanner from './components/storefront/PromoBanner';
import Navbar from './components/storefront/Navbar';
import Hero from './components/storefront/Hero';
import ProductFilter from './components/storefront/ProductFilter';
import ProductGrid from './components/storefront/ProductGrid';
import QuickViewModal from './components/storefront/QuickViewModal';
import CartDrawer from './components/storefront/CartDrawer';
import WishlistDrawer from './components/storefront/WishlistDrawer';
import CheckoutModal from './components/storefront/CheckoutModal';
import OrderSuccessModal from './components/storefront/OrderSuccessModal';
import LookbookModal from './components/storefront/LookbookModal';
import Footer from './components/storefront/Footer';

// Admin Components
import AdminLoginModal from './components/admin/AdminLoginModal';
import AdminLayout from './components/admin/AdminLayout';
import DashboardOverview from './components/admin/DashboardOverview';
import OrdersManagement from './components/admin/OrdersManagement';
import OrderDetailsModal from './components/admin/OrderDetailsModal';
import ProductsManagement from './components/admin/ProductsManagement';
import SettingsView from './components/admin/SettingsView';

export default function App() {
  const {
    currentView,
    adminSection,
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useStore();

  // Storefront Filter States
  const [selectedSize, setSelectedSize] = useState('All');
  const [priceRange, setPriceRange] = useState(1500);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Admin Dashboard view detail helper
  const [inspectedOrder, setInspectedOrder] = useState(null);

  // Filtered Products Pipeline for Storefront
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory;

        // Size filter
        const matchesSize =
          selectedSize === 'All' || (product.sizes && product.sizes.includes(selectedSize));

        // Price filter
        const matchesPrice = product.price <= priceRange;

        // In Stock filter
        const matchesStock = inStockOnly ? product.stock > 0 : true;

        // Search query filter
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          query === '' ||
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product.description && product.description.toLowerCase().includes(query)) ||
          (product.sku && product.sku.toLowerCase().includes(query));

        return (
          matchesCategory &&
          matchesSize &&
          matchesPrice &&
          matchesStock &&
          matchesSearch
        );
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
        if (sortBy === 'newest') {
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        }
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        return 0;
      });
  }, [products, selectedCategory, selectedSize, priceRange, inStockOnly, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('All');
    setPriceRange(1500);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0B0B0C] dark:bg-[#0B0B0C] dark:text-[#FAF9F6] transition-smooth font-sans selection:bg-[#0B0B0C] selection:text-[#FAF9F6] dark:selection:bg-[#D4AF37] dark:selection:text-[#0B0B0C]">
      
      {/* Toast Notification Stack */}
      <Toast />

      {/* VIEW SWITCHER: Storefront vs Admin CMS */}
      {currentView === 'storefront' ? (
        <div className="flex flex-col min-h-screen">
          {/* Top Dynamic Announcement Bar */}
          <PromoBanner />

          {/* Sticky Glassmorphic Navbar */}
          <Navbar />

          <main className="flex-1">
            {/* Editorial Hero Section */}
            <Hero />

            {/* Catalog Section */}
            <section id="catalog-section" className="scroll-mt-20">
              {/* Interactive Filter & Sort Bar */}
              <ProductFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                maxPriceLimit={1500}
                inStockOnly={inStockOnly}
                onInStockChange={setInStockOnly}
                sortBy={sortBy}
                onSortChange={setSortBy}
                totalResults={filteredProducts.length}
                onResetFilters={handleResetFilters}
              />

              {/* Product Catalog Grid */}
              <ProductGrid
                products={filteredProducts}
                onResetFilters={handleResetFilters}
              />
            </section>
          </main>

          {/* Luxury Atelier Footer */}
          <Footer />

          {/* Drawers & Modals */}
          <QuickViewModal />
          <CartDrawer />
          <WishlistDrawer />
          <CheckoutModal />
          <OrderSuccessModal />
          <LookbookModal />
          <AdminLoginModal />
        </div>
      ) : (
        /* Admin CMS Workspace */
        <AdminLayout>
          {adminSection === 'dashboard' && (
            <DashboardOverview onViewOrderDetails={(ord) => setInspectedOrder(ord)} />
          )}

          {adminSection === 'orders' && <OrdersManagement />}

          {adminSection === 'products' && <ProductsManagement />}

          {adminSection === 'settings' && <SettingsView />}

          {/* Admin Order Details Modal (when opened from Dashboard overview) */}
          {inspectedOrder && (
            <OrderDetailsModal
              order={inspectedOrder}
              onClose={() => setInspectedOrder(null)}
            />
          )}

          {/* Quick View modal also accessible in admin if clicking garment previews */}
          <QuickViewModal />
        </AdminLayout>
      )}

    </div>
  );
}
