import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, MapPin, Mail, Phone, Calendar, ExternalLink } from 'lucide-react';
import WhatsAppIcon from '../common/WhatsAppIcon';

export default function OrderDetailsModal({ order, onClose }) {
  const { updateOrderStatus, deleteOrder, formatPrice, settings } = useStore();

  if (!order) return null;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove Order #${order.id}?`)) {
      deleteOrder(order.id);
      onClose();
    }
  };

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

  const customerCleanPhone = order.customer.phone.replace(/\D/g, '');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E7E5E0] p-6 sm:p-8 my-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E7E5E0] pb-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-display font-bold text-[#1E2329]">
                Order #{order.id}
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono uppercase border ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1 flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#0F766E]" />
              Placed on {new Date(order.date).toLocaleDateString('en-PK', { dateStyle: 'long' })}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#64748B] hover:text-[#1E2329]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Dropdown Quick Change */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-semibold text-[#1E2329]">
            Fulfillment Status:
          </span>
          <div className="flex items-center gap-2">
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              className="px-3 py-1.5 text-xs font-mono font-semibold rounded-xl bg-white border border-[#E7E5E0] cursor-pointer focus:outline-none focus:border-[#0F766E]"
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
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] space-y-2">
            <h4 className="font-mono uppercase font-bold text-[#64748B] text-[10px] tracking-wider">
              Customer Info
            </h4>
            <p className="font-bold text-sm text-[#1E2329]">{order.customer.name}</p>
            <p className="text-[#475569] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#25D366]" /> {order.customer.phone}
            </p>
            {customerCleanPhone && (
              <a
                href={`https://wa.me/${customerCleanPhone}?text=${encodeURIComponent(`Assalam o Alaikum ${order.customer.name}, contacting you regarding your Fabricas Order #${order.id}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#25D366] hover:underline pt-1"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" /> Message on WhatsApp
              </a>
            )}
          </div>

          {/* Delivery Address */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] space-y-2">
            <h4 className="font-mono uppercase font-bold text-[#64748B] text-[10px] tracking-wider">
              Delivery Destination
            </h4>
            <p className="text-[#475569] flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#0F766E]" />
              <span>
                {order.customer.address}, {order.customer.city || 'Karachi'}
              </span>
            </p>
            {order.notes && (
              <p className="text-[11px] text-[#0F766E] font-medium pt-1 italic">
                Note: "{order.notes}"
              </p>
            )}
          </div>
        </div>

        {/* Itemized Garments */}
        <div className="space-y-3">
          <h4 className="font-mono uppercase font-bold text-[#64748B] text-[11px] tracking-wider">
            Ordered Items ({order.items.length})
          </h4>
          <div className="divide-y divide-[#E7E5E0] border border-[#E7E5E0] rounded-2xl overflow-hidden bg-white">
            {order.items.map((item, i) => (
              <div key={i} className="p-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#1E2329]">{item.name}</p>
                  <p className="text-[11px] text-[#64748B] font-mono">
                    Qty: {item.quantity} {item.size ? `• Size: ${item.size}` : ''} {item.color ? `• Color: ${item.color}` : ''}
                  </p>
                </div>
                <span className="font-mono font-bold text-[#0F766E]">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Recap */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-[#64748B]">Subtotal</span>
            <span className="font-mono font-semibold">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#64748B]">Delivery Fee</span>
            <span className="font-mono font-semibold">{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#E7E5E0] font-bold text-sm">
            <span>Total Payable (COD)</span>
            <span className="font-mono text-base text-[#0F766E]">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Order</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D5C58] text-white text-xs font-semibold shadow-xs transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
