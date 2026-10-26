import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, PackageCheck, ArrowRight, ExternalLink, Printer } from 'lucide-react';

export default function OrderSuccessModal() {
  const {
    isOrderSuccessOpen,
    setIsOrderSuccessOpen,
    lastPlacedOrder: order,
    formatPrice,
    setCurrentView,
    setAdminSection,
    isAdminLoggedIn,
    setIsAdminLoginOpen
  } = useStore();

  if (!isOrderSuccessOpen || !order) return null;

  const handleGoToAdmin = () => {
    setIsOrderSuccessOpen(false);
    if (isAdminLoggedIn) {
      setCurrentView('admin');
      setAdminSection('orders');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] dark:bg-[#121214] text-[#0B0B0C] dark:text-[#FAF9F6] rounded-2xl shadow-2xl border border-[#E4E4E0] dark:border-[#27272A] p-6 sm:p-10 my-8">
        
        {/* Top Success Badge */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/30">
            <PackageCheck className="w-8 h-8" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Order Confirmation
          </span>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight">
            Order #{order.id} Confirmed
          </h2>
          <p className="text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] max-w-md">
            Thank you, {order.customer.name}. Your architectural pieces have been allocated and our Florence atelier has commenced bespoke preparation.
          </p>
        </div>

        {/* Order Details Receipt Box */}
        <div className="mt-8 p-5 rounded-xl bg-white/70 dark:bg-[#18181B]/70 border border-[#E4E4E0] dark:border-[#27272A] space-y-4 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-[#E4E4E0] dark:border-[#27272A] pb-3">
            <div>
              <span className="text-[10px] uppercase font-mono text-[#71717A] block">Order ID</span>
              <strong className="font-mono text-[#D4AF37]">#{order.id}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#71717A] block">Status</span>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                {order.status}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#71717A] block">Payment</span>
              <span className="truncate block font-medium">{order.paymentMethod}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#71717A] block">Total Amount</span>
              <strong className="font-mono text-sm">{formatPrice(order.total)}</strong>
            </div>
          </div>

          {/* Delivery Destination */}
          <div className="text-[11px] text-[#52525B] dark:text-[#A1A1AA]">
            <span className="font-semibold text-[#0B0B0C] dark:text-white block mb-0.5">
              Shipping Destination:
            </span>
            <p>
              {order.customer.address}, {order.customer.city}, {order.customer.country}
            </p>
            <p className="text-[10px] text-[#71717A]">
              Confirmation dispatch sent to: {order.customer.email}
            </p>
          </div>

          {/* Items Summary */}
          <div className="border-t border-[#E4E4E0] dark:border-[#27272A] pt-3 space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#71717A] block">
              Itemized Allocation:
            </span>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold">{item.quantity}x</span>
                  <span>{item.name}</span>
                  <span className="text-[11px] text-[#71717A]">({item.size} / {item.color})</span>
                </div>
                <span className="font-mono font-semibold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2"
          >
            <span>Continue Exploring</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleGoToAdmin}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Order in Admin CMS</span>
          </button>
        </div>

      </div>
    </div>
  );
}
