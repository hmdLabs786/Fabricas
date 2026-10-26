import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Bell,
  Sparkles,
  ShieldCheck,
  ChevronRight
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

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const lowStockCount = products.filter((p) => p.stock < 5).length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Overview & Stats',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'orders',
      label: 'Orders Management',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : orders.length
    },
    {
      id: 'products',
      label: 'Products & Inventory',
      icon: <Package className="w-4 h-4" />,
      badge: lowStockCount > 0 ? `${lowStockCount} low` : products.length
    },
    {
      id: 'settings',
      label: 'Store Configuration',
      icon: <Settings className="w-4 h-4" />
    }
  ];

  const handleNavSelect = (id) => {
    setAdminSection(id);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] dark:bg-[#09090B] text-[#0B0B0C] dark:text-[#FAF9F6] flex flex-col lg:flex-row transition-smooth">
      
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#FAF9F6] dark:bg-[#121214] border-b border-[#E4E4E0] dark:border-[#202025]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Toggle admin sidebar"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Logo size="sm" showWordmark={true} />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setCurrentView('storefront')}
            className="p-2 rounded-lg text-xs font-semibold flex items-center gap-1 text-[#D4AF37]"
            title="View Live Storefront"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Storefront</span>
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#FAF9F6] dark:bg-[#121214] border-r border-[#E4E4E0] dark:border-[#202025] flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:h-screen lg:sticky lg:top-0`}
      >
        <div className="p-6 space-y-8 flex-1 overflow-y-auto">
          {/* Logo & Workspace Title */}
          <div className="flex items-center justify-between">
            <Logo
              size="md"
              showWordmark={true}
              showTagline={false}
              onClick={() => setCurrentView('storefront')}
            />
          </div>

          <div className="px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-[#E4E4E0]/60 dark:border-[#202025] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
                CMS Environment
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] px-1.5 py-0.5 rounded bg-[#D4AF37]/10">
              LIVE v2.4
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <p className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#8E8E93] dark:text-[#71717A] px-3 mb-2 font-semibold">
              Management Modules
            </p>
            {navItems.map((item) => {
              const isActive = adminSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] shadow-md font-semibold'
                      : 'text-[#71717A] dark:text-[#A1A1AA] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#0B0B0C] dark:hover:text-[#FAF9F6]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-[#D4AF37]' : ''}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 dark:bg-black/20 text-current'
                          : 'bg-[#E4E4E0] dark:bg-[#27272A] text-[#71717A] dark:text-[#A1A1AA]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick System Metric Alert */}
          {lowStockCount > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs space-y-1">
              <span className="font-semibold block text-[11px] uppercase tracking-wider font-mono">
                Inventory Warning
              </span>
              <p className="text-[11px] leading-relaxed">
                {lowStockCount} piece{lowStockCount > 1 ? 's' : ''} currently have stock below 5 units.
              </p>
              <button
                onClick={() => setAdminSection('products')}
                className="text-[11px] font-semibold underline mt-1 block"
              >
                Review Low Stock Items →
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-6 border-t border-[#E4E4E0] dark:border-[#202025] space-y-3 bg-[#FAF9F6] dark:bg-[#121214]">
          {/* View Live Storefront Button */}
          <button
            onClick={() => setCurrentView('storefront')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#0B0B0C] dark:border-[#FAF9F6] text-[#0B0B0C] dark:text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#0B0B0C] hover:text-[#FAF9F6] dark:hover:bg-[#FAF9F6] dark:hover:text-[#0B0B0C] transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Storefront</span>
          </button>

          {/* Admin User Badge + Theme + Logout */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0B0B0C] text-[#D4AF37] dark:bg-[#1E1E22] flex items-center justify-center text-xs font-bold font-mono border border-[#D4AF37]/40">
                AD
              </div>
              <div>
                <p className="text-xs font-semibold leading-tight">{settings.adminUsername}</p>
                <p className="text-[10px] text-[#71717A] dark:text-[#A1A1AA]">Atelier Principal</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                onClick={logoutAdmin}
                className="p-2 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-colors"
                title="Logout of Admin CMS"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay backdrop for mobile sidebar */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Main Admin Workspace Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        {children}
      </main>

    </div>
  );
}
