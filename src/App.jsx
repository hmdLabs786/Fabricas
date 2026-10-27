import React, { useState, useMemo } from 'react';
import { useStore } from './context/StoreContext';

// Common Components
import Toast from './components/common/Toast';
import FloatingWidgets from './components/common/FloatingWidgets';

// Storefront Components
import PromoBanner from './components/storefront/PromoBanner';
import Navbar from './components/storefront/Navbar';
import Hero from './components/storefront/Hero';
import ProductFilter from './components/storefront/ProductFilter';
import ProductGrid from './components/storefront/ProductGrid';
import QuickViewModal from './components/storefront/QuickViewModal';
import CartDrawer from './components/storefront/CartDrawer';
import WishlistDrawer from './components/storefront/WishlistDrawer';
import WhatsAppOrderModal from './components/storefront/WhatsAppOrderModal';
import TrackOrderModal from './components/storefront/TrackOrderModal';
import OrderSuccessModal from './components/storefront/OrderSuccessModal';
import ContactView from './components/storefront/ContactView';
import Footer from './components/storefront/Footer';

// Admin Components
import AdminLoginModal from './components/admin/AdminLoginModal';
import AdminLayout from './components/admin/AdminLayout';
import DashboardOverview from './components/admin/DashboardOverview';
import OrdersManagement from './components/admin/OrdersManagement';
import OrderDetailsModal from './components/admin/OrderDetailsModal';
import ProductsManagement from './components/admin/ProductsManagement';
import SettingsView from './components/admin/SettingsView';

import { ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  const {
    currentView,
    setCurrentView,
    adminSection,
    products
  } = useStore();

  const [sortBy, setSortBy] = useState('featured');

  // Admin order inspection state
  const [inspectedOrder, setInspectedOrder] = useState(null);

  // Filtered / Sorted Products for Shop Page
  const filteredProducts = useMemo(() => {
    return [...products].sort((a, b) => {
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
  }, [products, sortBy]);

  // Home Page Products: STRICTLY MAXIMUM 4 PRODUCTS
  const homeProducts = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  const handleShowMoreClick = () => {
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E2329] font-sans transition-colors selection:bg-[#0F766E] selection:text-white">
      
      {/* Toast Notification Stack */}
      <Toast />

      {/* Floating WhatsApp and Scroll to Top Widgets */}
      {currentView !== 'admin' && <FloatingWidgets />}

      {/* VIEW ROUTING */}
      {currentView === 'home' && (
        <div className="flex flex-col min-h-screen">
          <PromoBanner />
          <Navbar />

          <main className="flex-1">
            {/* Text-Only Centered Hero */}
            <Hero />

            {/* Home Products Section: Exactly 4 products + "Show More" Button */}
            <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <span className="h-[1px] w-8 bg-[#C87D55]/40" />
                  <span className="text-xs font-mono uppercase tracking-[0.25em] font-semibold text-[#0F766E]">
                    Curated Collection
                  </span>
                  <span className="h-[1px] w-8 bg-[#C87D55]/40" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1E2329]">
                  Featured Pieces
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
                  Handpicked designs tailored for comfort, breathable silhouettes, and everyday contemporary luxury.
                </p>
              </div>

              {/* Grid with 4 products */}
              <ProductGrid products={homeProducts} />

              {/* "Show More" Button Redirecting to Shop Page */}
              {products.length > 0 && (
                <div className="text-center mt-14">
                  <button
                    onClick={handleShowMoreClick}
                    className="shimmer-hover inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#0F766E] text-white hover:bg-[#0D5C58] text-xs font-semibold uppercase tracking-widest shadow-lg shadow-[#0F766E]/20 transition-all hover:scale-103 active:scale-97 group"
                  >
                    <span>Show More Products</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              )}
            </section>
          </main>

          <Footer />
        </div>
      )}

      {currentView === 'shop' && (
        <div className="flex flex-col min-h-screen">
          <PromoBanner />
          <Navbar />

          <main className="flex-1">
            {/* Shop Page Header */}
            <div className="py-12 bg-white border-b border-[#E7E5E0] text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#0F766E]">
                Karachi Atelier
              </span>
              <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#1E2329]">
                Complete Collection
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
                Explore everyday elegance, handcrafted kurtas, unstitched fabrics, and bespoke silhouettes.
              </p>
            </div>

            {/* Product Filter: Clean Sort and Results Count */}
            <ProductFilter
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalResults={filteredProducts.length}
            />

            {/* Full Product Grid */}
            <ProductGrid products={filteredProducts} />
          </main>

          <Footer />
        </div>
      )}

      {currentView === 'contact' && (
        <div className="flex flex-col min-h-screen">
          <PromoBanner />
          <Navbar />
          <main className="flex-1">
            <ContactView />
          </main>
          <Footer />
        </div>
      )}

      {currentView === 'admin' && (
        <AdminLayout>
          {adminSection === 'dashboard' && (
            <DashboardOverview onViewOrderDetails={(ord) => setInspectedOrder(ord)} />
          )}

          {adminSection === 'orders' && <OrdersManagement />}

          {adminSection === 'inventory' && <ProductsManagement />}

          {adminSection === 'settings' && <SettingsView />}

          {/* Order Details modal in Admin */}
          {inspectedOrder && (
            <OrderDetailsModal
              order={inspectedOrder}
              onClose={() => setInspectedOrder(null)}
            />
          )}

          <QuickViewModal />
        </AdminLayout>
      )}

      {/* Global Modals & Drawers */}
      <QuickViewModal />
      <CartDrawer />
      <WishlistDrawer />
      <WhatsAppOrderModal />
      <TrackOrderModal />
      <OrderSuccessModal />
      <AdminLoginModal />

    </div>
  );
}
