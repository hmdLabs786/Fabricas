import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import WhatsAppIcon from '../common/WhatsAppIcon';

export default function OrderSuccessModal() {
  const {
    lastPlacedOrder: order,
    setLastPlacedOrder,
    formatPrice,
    setIsTrackOrderOpen
  } = useStore();

  if (!order) return null;

  const handleOpenWhatsApp = () => {
    if (order.whatsappUrl) {
      window.open(order.whatsappUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E7E5E0] p-5 sm:p-8 my-auto max-h-[92vh] overflow-y-auto text-center space-y-5 sm:space-y-6">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#0F766E] font-semibold">
            Order Reference Generated
          </span>
          <h2 className="text-2xl font-display font-bold text-[#1E2329] mt-1">
            Order #{order.id}
          </h2>
          <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
            Thank you, {order.customer.name}! Your order has been initiated and prepared for WhatsApp transmission.
          </p>
        </div>

        {/* Receipt Box */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] text-left text-xs space-y-3">
          <div className="flex justify-between border-b border-[#E7E5E0] pb-2">
            <span className="text-[#64748B]">Customer:</span>
            <strong className="text-[#1E2329]">{order.customer.name} ({order.customer.phone})</strong>
          </div>
          <div className="flex justify-between border-b border-[#E7E5E0] pb-2">
            <span className="text-[#64748B]">Address:</span>
            <span className="text-[#1E2329] text-right truncate max-w-[220px]">
              {order.customer.address}, {order.customer.city}
            </span>
          </div>
          <div className="flex justify-between font-bold text-sm pt-1">
            <span>Total Payable (COD):</span>
            <span className="text-[#0F766E] font-mono">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* WhatsApp Button */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleOpenWhatsApp}
            className="w-full shimmer-hover py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20BA5C] text-white font-semibold text-xs tracking-wider shadow-lg shadow-[#25D366]/25 transition-all flex items-center justify-center gap-2.5 active:scale-98 group"
          >
            <WhatsAppIcon className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
            <span>Open WhatsApp Chat Now</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={() => {
              setLastPlacedOrder(null);
            }}
            className="w-full py-2.5 px-4 rounded-2xl text-xs font-semibold text-[#64748B] hover:text-[#1E2329] transition-colors"
          >
            Done / Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}
