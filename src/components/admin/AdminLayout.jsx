import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import Logo from '../common/Logo';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const {
    adminSection,
    setAdminSection,
    setCurrentView,
    logoutAdmin,
    orders,
    products,
    settings
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const lowStockCount = products.filter((p) => p.stock < 5).length;

  // STRICTLY ONLY DASHBOARD, ORDERS, INVENTORY, AND SETTINGS IN MENU
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : orders.length > 0 ? orders.length : null
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: <Package className="w-4 h-4" />,
      badge: lowStockCount > 0 ? `${lowStockCount} low` : products.length > 0 ? products.length : null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />
    }
  ];

  const handleNavSelect = (id) => {
    setAdminSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E2329] flex flex-col lg:flex-row font-sans">
      
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#E7E5E0]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl hover:bg-black/5"
            aria-label="Toggle admin menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Logo size="sm" showWordmark={true} showSubtext={true} />
        </div>
        <button
          onClick={() => setCurrentView('home')}
          className="text-xs font-semibold text-[#0F766E] flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#0F766E]/20 bg-[#0F766E]/5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Storefront</span>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#E7E5E0] flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:h-screen lg:sticky lg:top-0`}
      >
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Logo */}
          <div className="pb-4 border-b border-[#E7E5E0]">
            <Logo
              size="md"
              showWordmark={true}
              showSubtext={true}
              onClick={() => setCurrentView('home')}
            />
            <span className="inline-block mt-2 text-[10px] font-mono uppercase tracking-wider text-[#0F766E] font-bold bg-[#0F766E]/10 px-2 py-0.5 rounded-md">
              Atelier Management
            </span>
          </div>

          {/* Navigation Links: Strictly Dashboard, Orders, Inventory, Settings */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = adminSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#0F766E] text-white shadow-sm font-semibold'
                      : 'text-[#475569] hover:bg-[#F8F7F4] hover:text-[#1E2329]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#FAF8F5] text-[#64748B] border border-[#E7E5E0]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-6 border-t border-[#E7E5E0] space-y-3 bg-white">
          <button
            onClick={() => setCurrentView('home')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[#E7E5E0] hover:border-[#0F766E] text-[#1E2329] text-xs font-medium transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>View Live Storefront</span>
          </button>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-semibold text-[#1E2329]">{settings.adminUsername || 'admin'}</span>
            <button
              onClick={logoutAdmin}
              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* Main Admin Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        {children}
      </main>

    </div>
  );
}
