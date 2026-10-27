import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Package,
  Sparkles,
  Clock,
  Plus,
  Eye,
  Star
} from 'lucide-react';
import WhatsAppIcon from '../common/WhatsAppIcon';

export default function DashboardOverview({ onViewOrderDetails }) {
  const {
    orders,
    products,
    activityLog,
    formatPrice,
    setAdminSection,
    toggleFeatured
  } = useStore();

  const validOrders = orders.filter((o) => o.status !== 'Cancelled');
  const totalRevenue = validOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const featuredProducts = products.filter((p) => p.isFeatured);

  const latestOrders = orders.slice(0, 5);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Processing':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#0F766E]">
            Karachi Atelier Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1E2329] mt-0.5">
            Storefront Overview
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time management for catalog pieces and customer WhatsApp orders.
          </p>
        </div>

        <button
          onClick={() => setAdminSection('inventory')}
          className="shimmer-hover px-6 py-3 rounded-full bg-[#0F766E] text-white hover:bg-[#0D5C58] text-xs font-semibold tracking-wider transition-all flex items-center gap-2 shadow-md shadow-[#0F766E]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Garment</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Total Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-mono text-[#1E2329]">
            {formatPrice(totalRevenue)}
          </h3>
          <p className="text-[11px] text-[#64748B]">Recorded via WhatsApp bookings</p>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">WhatsApp Orders</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-[#25D366]">
              <WhatsAppIcon className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-mono text-[#1E2329]">
            {totalOrdersCount}
          </h3>
          <p className="text-[11px] text-amber-600 font-semibold">
            {pendingOrdersCount} pending dispatch
          </p>
        </div>

        {/* Active Catalog Designs */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Collection Pieces</span>
            <div className="p-2 rounded-xl bg-[#0F766E]/10 text-[#0F766E]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-mono text-[#1E2329]">
            {products.length} Garments
          </h3>
          <p className="text-[11px] text-[#64748B]">Active in online store</p>
        </div>

        {/* Featured Showcase Pieces */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Homepage Featured</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-500">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-mono text-[#1E2329]">
            {featuredProducts.length}
          </h3>
          <p className="text-[11px] text-[#64748B]">Displayed on storefront hero</p>
        </div>

      </div>

      {/* Main Grid: Latest Orders & Featured Curation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Latest Orders Table (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-display font-bold text-[#1E2329]">
                Recent Customer Orders
              </h3>
              <p className="text-xs text-[#64748B]">
                Latest inquiries and bookings received through WhatsApp
              </p>
            </div>
            <button
              onClick={() => setAdminSection('orders')}
              className="text-xs font-semibold text-[#0F766E] hover:underline"
            >
              View All Orders →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#64748B] uppercase font-mono border-b border-[#E7E5E0]">
                <tr>
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Total Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E5E0]">
                {latestOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-[#64748B]">
                      No orders placed yet. Customer orders placed on the storefront will appear here instantly.
                    </td>
                  </tr>
                ) : (
                  latestOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#0F766E]">
                        #{o.id}
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-semibold text-[#1E2329]">{o.customer?.name || 'Customer'}</p>
                        <p className="text-[11px] text-[#64748B]">{o.customer?.phone || ''}</p>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-[#1E2329]">
                        {formatPrice(o.total)}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(o.status)}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => onViewOrderDetails(o)}
                          className="p-1.5 rounded-lg hover:bg-black/5 text-[#64748B] hover:text-[#0F766E]"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Featured Homepage Curation (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#C87D55]" />
              <h3 className="text-base font-display font-bold text-[#1E2329]">
                Featured Curation
              </h3>
            </div>
            <p className="text-xs text-[#64748B] mb-4">
              Garments highlighted on your homepage storefront.
            </p>

            <div className="space-y-2.5">
              {featuredProducts.length === 0 ? (
                <div className="p-4 rounded-2xl bg-[#FAF8F5] text-center text-xs text-[#64748B]">
                  No garments marked as featured yet. In the Inventory tab, click the star icon on any garment to highlight it on your homepage.
                </div>
              ) : (
                featuredProducts.slice(0, 4).map((p) => {
                  const displayImg = (p.images && p.images[0]) || p.image;
                  return (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate mr-2">
                        {displayImg && (
                          <img
                            src={displayImg}
                            alt={p.name}
                            className="w-8 h-10 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="truncate">
                          <p className="font-semibold truncate text-[#1E2329]">{p.name}</p>
                          <span className="text-[10px] text-[#0F766E] font-mono font-bold">
                            {formatPrice(p.price)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFeatured(p.id)}
                        className="p-1 text-amber-500 hover:scale-110 transition-transform"
                        title="Remove from featured"
                      >
                        <Star className="w-4 h-4 fill-amber-400" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E7E5E0]">
            <button
              onClick={() => setAdminSection('inventory')}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#0F766E] hover:bg-[#0F766E]/5 border border-[#0F766E]/20 transition-colors"
            >
              Manage All Inventory →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
