import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import OrderDetailsModal from './OrderDetailsModal';
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  DollarSign,
  ArrowUpDown,
  Download,
  Package
} from 'lucide-react';

export default function OrdersManagement() {
  const {
    orders,
    updateOrderStatus,
    deleteOrder,
    formatPrice
  } = useStore();

  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc, total-desc, total-asc
  const [selectedOrder, setSelectedOrder] = useState(null);

  const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

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

  // Filter & Sort pipeline
  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === 'All' || order.status === activeTab;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(term) ||
      order.customer.name.toLowerCase().includes(term) ||
      order.customer.email.toLowerCase().includes(term);
    return matchesTab && matchesSearch;
  });

  filteredOrders.sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'total-desc') return b.total - a.total;
    if (sortBy === 'total-asc') return a.total - b.total;
    return 0;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
            Logistics & Client Allocation
          </span>
          <h1 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight text-[#0B0B0C] dark:text-[#FAF9F6] mt-1">
            Orders Management
          </h1>
        </div>

        <div className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
          TOTAL ARCHIVAL ORDERS: <strong className="text-[#0B0B0C] dark:text-white">{orders.length}</strong>
        </div>
      </div>

      {/* Filter Tabs with Live Count Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#E4E4E0] dark:border-[#202025]">
        {tabs.map((tab) => {
          const count = tab === 'All' ? orders.length : orders.filter((o) => o.status === tab).length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase font-mono font-medium tracking-wider transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] font-bold shadow-sm'
                  : 'text-[#71717A] dark:text-[#A1A1AA] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/25 dark:bg-black/25 text-current' : 'bg-black/10 dark:bg-white/10'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search */}
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID (#NOC-...), client name, or email..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] focus:outline-none focus:border-[#0B0B0C] dark:focus:border-[#D4AF37]"
          />
        </div>

        {/* Sort dropdown */}
        <div className="sm:col-span-4 flex items-center gap-2 border border-[#E4E4E0] dark:border-[#202025] rounded-xl px-3 py-2 bg-white dark:bg-[#121214]">
          <ArrowUpDown className="w-4 h-4 text-[#71717A]" />
          <label htmlFor="orders-sort" className="sr-only">Sort orders</label>
          <select
            id="orders-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-transparent text-xs font-mono text-[#0B0B0C] dark:text-[#FAF9F6] focus:outline-none cursor-pointer"
          >
            <option value="date-desc" className="bg-[#FAF9F6] dark:bg-[#141416]">Date: Newest First</option>
            <option value="date-asc" className="bg-[#FAF9F6] dark:bg-[#141416]">Date: Oldest First</option>
            <option value="total-desc" className="bg-[#FAF9F6] dark:bg-[#141416]">Total: High to Low</option>
            <option value="total-asc" className="bg-[#FAF9F6] dark:bg-[#141416]">Total: Low to High</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-[#E4E4E0] dark:border-[#202025] bg-white dark:bg-[#121214] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] dark:bg-[#18181B] border-b border-[#E4E4E0] dark:border-[#202025] text-[#71717A] dark:text-[#A1A1AA] uppercase font-mono">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Garments</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E0]/60 dark:divide-[#202025]/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-[#71717A]">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4 px-4 font-mono font-bold text-[#D4AF37]">
                      #{order.id}
                    </td>
                    <td className="py-4 px-4 font-mono text-[#71717A] text-[11px]">
                      {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-[#0B0B0C] dark:text-[#FAF9F6]">{order.customer.name}</p>
                      <p className="text-[11px] text-[#71717A] truncate max-w-[160px]">{order.customer.email}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2 overflow-hidden">
                          {order.items.slice(0, 3).map((it, i) => (
                            <img
                              key={i}
                              src={it.image}
                              alt={it.name}
                              className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-[#121214] object-cover"
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-[#71717A] font-mono">
                          {order.items.reduce((sum, it) => sum + it.quantity, 0)} units
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-[#0B0B0C] dark:text-[#FAF9F6]">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-4 px-4">
                      {/* Live Status Dropdown inside row */}
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded-lg border cursor-pointer focus:outline-none ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#71717A] hover:text-[#0B0B0C] dark:hover:text-white transition-colors"
                          title="View Order Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Permanently delete order #${order.id}?`)) {
                              deleteOrder(order.id);
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-[#71717A] hover:text-rose-600 transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

    </div>
  );
}
