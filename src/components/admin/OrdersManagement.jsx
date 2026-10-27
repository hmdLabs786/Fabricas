import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import OrderDetailsModal from './OrderDetailsModal';
import {
  Search,
  Eye,
  Trash2,
  Calendar,
  ShoppingBag,
  ArrowUpDown
} from 'lucide-react';
import WhatsAppIcon from '../common/WhatsAppIcon';

export default function OrdersManagement() {
  const {
    orders,
    updateOrderStatus,
    deleteOrder,
    formatPrice
  } = useStore();

  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

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

  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === 'All' || order.status === activeTab;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(term) ||
      order.customer.name.toLowerCase().includes(term) ||
      order.customer.phone.includes(term);
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
          <span className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#0F766E]">
            Client Fulfillment
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1E2329] mt-0.5">
            Orders Management
          </h1>
        </div>

        <span className="text-xs font-mono text-[#64748B]">
          TOTAL ORDERS: <strong className="text-[#1E2329]">{orders.length}</strong>
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E7E5E0]">
        {tabs.map((tab) => {
          const count = tab === 'All' ? orders.length : orders.filter((o) => o.status === tab).length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-[#0F766E] text-white font-semibold shadow-xs'
                  : 'text-[#64748B] hover:bg-[#F8F7F4] hover:text-[#1E2329]'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-[#64748B]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Sort Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID (FAB-...), customer name, or phone number..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
          />
        </div>

        <div className="sm:col-span-4 flex items-center gap-2 border border-[#E7E5E0] rounded-xl px-3 py-2 bg-white">
          <ArrowUpDown className="w-4 h-4 text-[#0F766E]" />
          <label htmlFor="orders-sort-admin" className="sr-only">Sort orders</label>
          <select
            id="orders-sort-admin"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-transparent text-xs text-[#1E2329] focus:outline-none cursor-pointer"
          >
            <option value="date-desc">Date: Newest First</option>
            <option value="date-asc">Date: Oldest First</option>
            <option value="total-desc">Amount: High to Low</option>
            <option value="total-asc">Amount: Low to High</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-[#E7E5E0] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] border-b border-[#E7E5E0] text-[#64748B] uppercase font-mono">
              <tr>
                <th className="py-3.5 px-4">Order Ref</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Garments</th>
                <th className="py-3.5 px-4">Payable</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E0]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-[#64748B]">
                    <ShoppingBag className="w-10 h-10 text-[#94A3B8] mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-sm text-[#1E2329]">No orders found</p>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      When customers submit cart orders to WhatsApp, they will be tracked here.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-[#0F766E]">
                      #{order.id}
                    </td>
                    <td className="py-4 px-4 font-mono text-[#64748B] text-[11px]">
                      {new Date(order.date).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-[#1E2329]">{order.customer.name}</p>
                      <p className="text-[11px] text-[#64748B]">{order.customer.phone}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-[#1E2329]">
                        {order.items.reduce((sum, it) => sum + it.quantity, 0)} items
                      </span>
                      <p className="text-[11px] text-[#64748B] truncate max-w-[160px]">
                        {order.items.map(it => it.name).join(', ')}
                      </p>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-[#1E2329]">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-4 px-4">
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
                      <div className="flex items-center justify-end gap-1.5">
                        {order.customer.phone && (
                          <a
                            href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalam o Alaikum ${order.customer.name}, this is Fabricas contacting you regarding your Order #${order.id}.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg hover:bg-emerald-50 text-[#25D366] transition-colors"
                            title="Chat with Customer on WhatsApp"
                          >
                            <WhatsAppIcon className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg hover:bg-black/5 text-[#64748B] hover:text-[#0F766E] transition-colors"
                          title="View Order Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Permanently remove order #${order.id}?`)) {
                              deleteOrder(order.id);
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-[#64748B] hover:text-rose-600 transition-colors"
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

    </div>
  );
}
