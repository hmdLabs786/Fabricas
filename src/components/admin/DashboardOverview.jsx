import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Package,
  AlertTriangle,
  Clock,
  Plus,
  Eye
} from 'lucide-react';

export default function DashboardOverview({ onViewOrderDetails }) {
  const {
    orders,
    products,
    activityLog,
    formatPrice,
    restockProduct,
    setAdminSection
  } = useStore();

  const validOrders = orders.filter((o) => o.status !== 'Cancelled');
  const totalRevenue = validOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const totalInventoryUnits = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockProducts = products.filter((p) => p.stock < 5);

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
            Karachi Online Store
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1E2329] mt-0.5">
            Admin Dashboard
          </h1>
        </div>

        <button
          onClick={() => setAdminSection('inventory')}
          className="px-5 py-2.5 rounded-full bg-[#0F766E] text-white hover:bg-[#0D5C58] text-xs font-semibold tracking-wide transition-all flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Total Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-mono text-[#1E2329]">
            {formatPrice(totalRevenue)}
          </h3>
          <p className="text-[11px] text-[#64748B]">From confirmed WhatsApp orders</p>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Total Orders</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-mono text-[#1E2329]">
            {totalOrdersCount}
          </h3>
          <p className="text-[11px] text-amber-600 font-semibold">
            {pendingOrdersCount} pending dispatch
          </p>
        </div>

        {/* Active Inventory */}
        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Active Inventory</span>
            <div className="p-2 rounded-xl bg-[#0F766E]/10 text-[#0F766E]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-mono text-[#1E2329]">
            {totalInventoryUnits} units
          </h3>
          <p className="text-[11px] text-[#64748B]">Across {products.length} catalog items</p>
        </div>

        {/* Low Stock Warning */}
        <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Low Stock Items</span>
            <div className={`p-2 rounded-xl ${lowStockProducts.length > 0 ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-400'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-mono text-[#1E2329]">
            {lowStockProducts.length}
          </h3>
          <p className="text-[11px] text-[#64748B]">Items with less than 5 units</p>
        </div>

      </div>

      {/* Latest Orders & Low Stock Quick Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Latest Orders (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-display font-bold text-[#1E2329]">
                Recent Customer Orders
              </h3>
              <p className="text-xs text-[#64748B]">
                Orders placed via WhatsApp with customer details
              </p>
            </div>
            <button
              onClick={() => setAdminSection('orders')}
              className="text-xs font-semibold text-[#0F766E] hover:underline"
            >
              View All ({orders.length}) →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#E7E5E0] text-[#64748B] uppercase font-mono">
                <tr>
                  <th className="py-2.5 px-3">Order Ref</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E5E0]">
                {latestOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-[#64748B]">
                      No orders placed yet. Orders submitted via WhatsApp will appear here.
                    </td>
                  </tr>
                ) : (
                  latestOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#FAF8F5]">
                      <td className="py-3 px-3 font-mono font-bold text-[#0F766E]">
                        #{o.id}
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-semibold text-[#1E2329]">{o.customer.name}</p>
                        <p className="text-[11px] text-[#64748B]">{o.customer.phone}</p>
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
                          className="p-1 rounded-lg hover:bg-black/5 text-[#64748B] hover:text-[#0F766E]"
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

        {/* Low Stock Alerts + Quick Restock (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-base font-display font-bold text-[#1E2329]">
                Low Stock Alerts
              </h3>
            </div>
            <p className="text-xs text-[#64748B] mb-4">
              Restock popular garments with one click.
            </p>

            <div className="space-y-3">
              {lowStockProducts.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#FAF8F5] text-center text-xs text-[#64748B]">
                  All catalog items have sufficient stock.
                </div>
              ) : (
                lowStockProducts.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs"
                  >
                    <div className="truncate mr-2">
                      <p className="font-semibold truncate text-[#1E2329]">{p.name}</p>
                      <span className="text-[10px] text-amber-700 font-mono font-bold">
                        {p.stock} units remaining
                      </span>
                    </div>
                    <button
                      onClick={() => restockProduct(p.id, 10)}
                      className="px-2.5 py-1 rounded-lg bg-[#0F766E] text-white hover:bg-[#0D5C58] text-[10px] font-mono font-bold transition-colors flex-shrink-0"
                    >
                      +10 Units
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E7E5E0]">
            <button
              onClick={() => setAdminSection('inventory')}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#0F766E] hover:bg-[#0F766E]/5 border border-[#0F766E]/20 transition-colors"
            >
              Go to Inventory Management →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
