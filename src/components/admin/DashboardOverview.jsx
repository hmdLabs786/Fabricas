import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Package,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Sparkles,
  RefreshCw,
  Plus,
  Eye,
  CheckCircle2,
  Calendar
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

  const [analyticsRange, setAnalyticsRange] = useState('7d'); // '7d' | '30d'

  // Dynamic KPI Calculations
  const validOrders = orders.filter((o) => o.status !== 'Cancelled');
  const totalRevenue = validOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const aov = validOrders.length > 0 ? totalRevenue / validOrders.length : 0;
  const totalInventoryUnits = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockProducts = products.filter((p) => p.stock < 5);

  // Category breakdown calculation
  const categorySales = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + (p.stock || 0);
    return acc;
  }, {});
  const totalCatStock = Math.max(1, Object.values(categorySales).reduce((a, b) => a + b, 0));

  // Chart data simulation (7 days vs 30 days)
  const chartData7d = [
    { label: 'Mon', revenue: 1450, orders: 2 },
    { label: 'Tue', revenue: 2100, orders: 3 },
    { label: 'Wed', revenue: 1850, orders: 2 },
    { label: 'Thu', revenue: 3200, orders: 4 },
    { label: 'Fri', revenue: 4100, orders: 5 },
    { label: 'Sat', revenue: 3800, orders: 4 },
    { label: 'Sun', revenue: 4950, orders: 6 }
  ];

  const chartData30d = [
    { label: 'Week 1', revenue: 12400, orders: 16 },
    { label: 'Week 2', revenue: 16800, orders: 22 },
    { label: 'Week 3', revenue: 14500, orders: 19 },
    { label: 'Week 4', revenue: 21900, orders: 28 }
  ];

  const currentChartData = analyticsRange === '7d' ? chartData7d : chartData30d;
  const maxRevenuePoint = Math.max(...currentChartData.map((d) => d.revenue));

  // Top Selling Products simulation based on orders + reviews
  const topSellers = [...products]
    .sort((a, b) => b.reviewsCount - a.reviewsCount)
    .slice(0, 4);

  // Latest 5 orders
  const latestOrders = orders.slice(0, 6);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300';
      case 'Processing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier Intelligence • Live Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight text-[#0B0B0C] dark:text-[#FAF9F6] mt-1">
            Executive Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAdminSection('products')}
            className="px-4 py-2 rounded-xl bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-[#0B0B0C] transition-all flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Garment</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Revenue */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
              Total Revenue
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-[#0B0B0C] dark:text-[#FAF9F6]">
              {formatPrice(totalRevenue)}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last cycle</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
              Total Orders
            </span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-[#0B0B0C] dark:text-[#FAF9F6]">
              {totalOrdersCount}
            </h3>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-2">
              <strong className="text-amber-600 dark:text-amber-400">{pendingOrdersCount}</strong> pending fulfillment
            </p>
          </div>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
              Average Order Value
            </span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-[#0B0B0C] dark:text-[#FAF9F6]">
              {formatPrice(aov)}
            </h3>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-2">
              High-luxury basket ratio
            </p>
          </div>
        </div>

        {/* Active Inventory & Low Stock */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
              Active Inventory
            </span>
            <div className={`p-2.5 rounded-xl ${lowStockProducts.length > 0 ? 'bg-amber-500/10 text-amber-500' : 'bg-[#D4AF37]/10 text-[#D4AF37]'}`}>
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-[#0B0B0C] dark:text-[#FAF9F6]">
              {totalInventoryUnits} units
            </h3>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-2">
              Across {products.length} garments ({lowStockProducts.length} low stock)
            </p>
          </div>
        </div>

      </div>

      {/* Visual Analytics & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Revenue Bar/Area Chart (8 Cols) */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-editorial font-bold uppercase tracking-wider">
                Sales & Revenue Trajectory
              </h3>
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
                Monitored transaction volume across recent client orders
              </p>
            </div>

            {/* Time Toggle */}
            <div className="flex items-center bg-[#F4F3EE] dark:bg-[#1A1A1D] p-1 rounded-xl border border-[#E4E4E0] dark:border-[#27272A]">
              <button
                onClick={() => setAnalyticsRange('7d')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                  analyticsRange === '7d'
                    ? 'bg-[#0B0B0C] text-white dark:bg-[#FAF9F6] dark:text-black shadow-sm'
                    : 'text-[#71717A] hover:text-black dark:hover:text-white'
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setAnalyticsRange('30d')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                  analyticsRange === '30d'
                    ? 'bg-[#0B0B0C] text-white dark:bg-[#FAF9F6] dark:text-black shadow-sm'
                    : 'text-[#71717A] hover:text-black dark:hover:text-white'
                }`}
              >
                Last 30 Days
              </button>
            </div>
          </div>

          {/* Interactive SVG / CSS Chart */}
          <div className="pt-4">
            <div className="h-60 flex items-end gap-3 sm:gap-6 border-b border-[#E4E4E0] dark:border-[#202025] pb-2">
              {currentChartData.map((d, index) => {
                const heightPercent = Math.max(12, Math.round((d.revenue / maxRevenuePoint) * 100));
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group relative">
                    
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-[#0B0B0C] text-white text-[10px] font-mono px-2 py-1 rounded shadow-lg pointer-events-none z-10 whitespace-nowrap">
                      {formatPrice(d.revenue)} • {d.orders} orders
                    </div>

                    {/* Bar */}
                    <div className="w-full bg-[#FAF9F6] dark:bg-[#1A1A1D] rounded-t-lg h-full flex items-end overflow-hidden p-1">
                      <div
                        className="w-full bg-gradient-to-t from-[#0B0B0C] to-[#404048] dark:from-[#D4AF37] dark:to-[#FDF6E2] rounded-md transition-all duration-700 ease-out group-hover:brightness-125"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    <span className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                      {d.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-[#71717A] dark:text-[#A1A1AA] border-t border-[#E4E4E0]/60 dark:border-[#202025]/60 mt-4">
            <span>Peak Day: <strong className="text-[#0B0B0C] dark:text-white font-mono">{formatPrice(maxRevenuePoint)}</strong></span>
            <span>Live Conversion Rate: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">3.82%</strong></span>
          </div>
        </div>

        {/* Category Breakdown Progress Widget (4 Cols) */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-editorial font-bold uppercase tracking-wider">
              Category Distribution
            </h3>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mb-6">
              Inventory share across architectural classifications
            </p>

            <div className="space-y-4">
              {Object.entries(categorySales).map(([cat, count]) => {
                const percent = Math.round((count / totalCatStock) * 100);
                return (
                  <div key={cat} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#0B0B0C] dark:text-[#FAF9F6]">{cat}</span>
                      <span className="font-mono text-[#71717A] dark:text-[#A1A1AA]">
                        {count} units ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#E4E4E0] dark:bg-[#202025] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#D4AF37] h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-[#E4E4E0] dark:border-[#202025] mt-6">
            <button
              onClick={() => setAdminSection('products')}
              className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl border border-[#E4E4E0] dark:border-[#27272A] hover:border-[#0B0B0C] dark:hover:border-white transition-colors"
            >
              Manage Catalog Categories →
            </button>
          </div>
        </div>

      </div>

      {/* Latest Orders Table */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-editorial font-bold uppercase tracking-wider">
              Recent Client Orders
            </h3>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
              Real-time feed of latest checkouts from storefront
            </p>
          </div>
          <button
            onClick={() => setAdminSection('orders')}
            className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] hover:underline"
          >
            View All ({orders.length}) →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E4E4E0] dark:border-[#202025] text-[#71717A] dark:text-[#A1A1AA] uppercase font-mono">
              <tr>
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Items Summary</th>
                <th className="py-3 px-3">Total Amount</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E0]/60 dark:divide-[#202025]/60">
              {latestOrders.map((order) => (
                <tr key={order.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-[#D4AF37]">
                    #{order.id}
                  </td>
                  <td className="py-3.5 px-3">
                    <p className="font-medium text-[#0B0B0C] dark:text-[#FAF9F6]">{order.customer.name}</p>
                    <p className="text-[11px] text-[#71717A]">{order.customer.city}</p>
                  </td>
                  <td className="py-3.5 px-3 text-[#52525B] dark:text-[#A1A1AA]">
                    {order.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-[#0B0B0C] dark:text-[#FAF9F6]">
                    {formatPrice(order.total)}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => onViewOrderDetails(order)}
                      className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#71717A] hover:text-black dark:hover:text-white transition-colors"
                      title="View Order Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Useful Actionable Insights Panels (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Low Stock Alerts Widget */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs uppercase font-mono font-bold tracking-widest">
                  Low Stock Alerts ({lowStockProducts.length})
                </h4>
              </div>
            </div>

            <div className="space-y-3">
              {lowStockProducts.length === 0 ? (
                <p className="text-xs text-[#71717A] py-6 text-center">
                  All garments are adequately stocked.
                </p>
              ) : (
                lowStockProducts.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20 text-xs"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-9 h-11 object-cover rounded bg-gray-200" />
                      <div className="truncate">
                        <p className="font-semibold truncate">{p.name}</p>
                        <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono font-bold">
                          {p.stock} units remaining
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => restockProduct(p.id, 10)}
                      className="px-2.5 py-1 rounded bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] hover:bg-[#D4AF37] text-[10px] font-mono font-bold uppercase transition-colors flex-shrink-0"
                      title="Add 10 units immediately"
                    >
                      +10 Restock
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Top-Selling Products Leaderboard */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs uppercase font-mono font-bold tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                Top Archival Sellers
              </h4>
            </div>

            <div className="space-y-3">
              {topSellers.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <span className="font-mono text-[#D4AF37] font-bold text-xs w-4">
                      0{index + 1}
                    </span>
                    <img src={item.image} alt={item.name} className="w-8 h-10 object-cover rounded bg-gray-200" />
                    <div className="truncate">
                      <p className="font-medium truncate">{item.name}</p>
                      <span className="text-[10px] text-[#71717A] font-mono">
                        {item.reviewsCount * 3} allocated units
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-bold">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Store Activity Feed */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs uppercase font-mono font-bold tracking-widest flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#71717A]" />
                Live Store Activity
              </h4>
            </div>

            <div className="space-y-3">
              {activityLog.slice(0, 5).map((act) => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#0B0B0C] dark:text-[#FAF9F6] leading-snug">{act.text}</p>
                    <span className="text-[10px] text-[#71717A] font-mono">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
