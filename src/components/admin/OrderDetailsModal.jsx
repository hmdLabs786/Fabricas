import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, MapPin, Mail, Phone, Calendar, CreditCard, Package } from 'lucide-react';

export default function OrderDetailsModal({ order, onClose }) {
  const { updateOrderStatus, deleteOrder, formatPrice } = useStore();

  if (!order) return null;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you wish to permanently delete Order #${order.id}?`)) {
      deleteOrder(order.id);
      onClose();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300';
      case 'Processing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] dark:bg-[#121214] text-[#0B0B0C] dark:text-[#FAF9F6] rounded-2xl shadow-2xl border border-[#E4E4E0] dark:border-[#27272A] p-6 sm:p-8 my-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E4E4E0] dark:border-[#202025] pb-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-editorial font-bold uppercase tracking-tight">
                Order #{order.id}
              </h2>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono uppercase ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1 flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              Placed on {new Date(order.date).toLocaleDateString('en-US', { dateStyle: 'long' })}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#71717A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Dropdown Quick Change */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-medium uppercase font-mono tracking-wider">
            Order Fulfillment Lifecycle:
          </span>
          <div className="flex items-center gap-2">
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              className="px-3 py-1.5 text-xs font-mono font-semibold rounded-lg bg-[#FAF9F6] dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#27272A] cursor-pointer focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Customer & Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Customer */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] space-y-2">
            <h4 className="font-mono uppercase font-bold text-[#71717A] text-[10px] tracking-wider">
              Client Dossier
            </h4>
            <p className="font-semibold text-sm">{order.customer.name}</p>
            <p className="text-[#52525B] dark:text-[#A1A1AA] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> {order.customer.email}
            </p>
            {order.customer.phone && (
              <p className="text-[#52525B] dark:text-[#A1A1AA] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> {order.customer.phone}
              </p>
            )}
          </div>

          {/* Destination */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] space-y-2">
            <h4 className="font-mono uppercase font-bold text-[#71717A] text-[10px] tracking-wider">
              Delivery Logistics
            </h4>
            <p className="text-[#52525B] dark:text-[#A1A1AA] flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>
                {order.customer.address}, {order.customer.city}, {order.customer.country}
              </span>
            </p>
            <p className="text-[#52525B] dark:text-[#A1A1AA] flex items-center gap-1.5 pt-1">
              <CreditCard className="w-3.5 h-3.5" /> {order.paymentMethod}
            </p>
          </div>
        </div>

        {/* Itemized Garment Breakdown */}
        <div className="space-y-3">
          <h4 className="font-mono uppercase font-bold text-[#71717A] text-[11px] tracking-wider">
            Allocated Garments ({order.items.length})
          </h4>
          <div className="divide-y divide-[#E4E4E0] dark:divide-[#27272A] border border-[#E4E4E0] dark:border-[#27272A] rounded-xl overflow-hidden bg-white dark:bg-[#18181B]">
            {order.items.map((item, i) => (
              <div key={i} className="p-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-14 object-cover rounded bg-[#ECECE8]"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-[11px] font-mono text-[#71717A]">
                      Qty: {item.quantity} • Size: {item.size} • Color: {item.color}
                    </p>
                  </div>
                </div>
                <span className="font-mono font-bold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Recap */}
        <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-[#E4E4E0] dark:border-[#27272A] space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-[#71717A]">Subtotal</span>
            <span className="font-mono">{formatPrice(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
              <span>Archival Discount</span>
              <span className="font-mono">-{formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[#71717A]">Tax</span>
            <span className="font-mono">{formatPrice(order.tax)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#71717A]">Shipping</span>
            <span className="font-mono">{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#E4E4E0] dark:border-[#27272A] font-bold text-sm">
            <span>Total Amount</span>
            <span className="font-mono text-base text-[#D4AF37]">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Delete & Close Footer */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Order</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] transition-all"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
}
