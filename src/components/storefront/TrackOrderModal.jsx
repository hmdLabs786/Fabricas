import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Truck, Search, CheckCircle2, Clock, AlertCircle, Package } from 'lucide-react';

export default function TrackOrderModal() {
  const {
    isTrackOrderOpen,
    setIsTrackOrderOpen,
    orders,
    formatPrice,
    settings
  } = useStore();

  const [query, setQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isTrackOrderOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = query.trim().replace('#', '').toLowerCase();
    if (!clean) return;

    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === clean ||
        o.customer.phone.replace(/\D/g, '').includes(clean) ||
        o.customer.name.toLowerCase().includes(clean)
    );

    setSearchedOrder(found || null);
    setHasSearched(true);
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E7E5E0] p-6 sm:p-8 my-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E7E5E0] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-[#1E2329]">
                Track Your Order
              </h2>
              <p className="text-xs text-[#64748B]">
                Enter your Order ID (e.g. FAB-8492) or Phone Number.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsTrackOrderOpen(false);
              setQuery('');
              setSearchedOrder(null);
              setHasSearched(false);
            }}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#64748B] hover:text-[#1E2329]"
            aria-label="Close track order"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. FAB-1234 or 03221234567"
              required
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D5C58] text-white text-xs font-semibold shadow-sm transition-all"
          >
            Track
          </button>
        </form>

        {/* Results display */}
        {hasSearched && (
          <div>
            {searchedOrder ? (
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] space-y-4 text-xs animate-in fade-in">
                <div className="flex items-center justify-between border-b border-[#E7E5E0] pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#64748B] block">Order Ref</span>
                    <strong className="font-mono text-sm text-[#0F766E]">#{searchedOrder.id}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#64748B] block text-right">Status</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(searchedOrder.status)}`}>
                      {searchedOrder.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[#64748B]">
                    Placed on: <strong>{new Date(searchedOrder.date).toLocaleDateString('en-PK', { dateStyle: 'medium' })}</strong>
                  </p>
                  <p className="text-[#64748B]">
                    Recipient: <strong>{searchedOrder.customer.name}</strong> ({searchedOrder.customer.city || 'Karachi'})
                  </p>
                  <p className="text-[#64748B]">
                    Address: <strong>{searchedOrder.customer.address}</strong>
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E7E5E0] space-y-1.5">
                  <span className="font-semibold block text-[11px] text-[#475569]">Items:</span>
                  {searchedOrder.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-[11px]">
                      <span>{it.quantity}x {it.name} {it.size ? `(${it.size})` : ''}</span>
                      <span className="font-mono">{formatPrice(it.price * it.quantity)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold pt-1 border-t border-[#E7E5E0]/60 text-xs">
                    <span>Total Amount</span>
                    <span className="font-mono text-[#0F766E]">{formatPrice(searchedOrder.total)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/${settings.whatsappRaw || '923222567147'}?text=${encodeURIComponent(`Assalam o Alaikum, inquiring about status of Order #${searchedOrder.id}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center py-2 px-3 rounded-xl bg-white border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold"
                  >
                    Inquire via WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-xs font-semibold text-[#1E2329]">
                  No order found matching "{query}"
                </p>
                <p className="text-[11px] text-[#64748B] max-w-xs mx-auto">
                  Please verify your Order ID or contact our team directly on WhatsApp (+92 3222567147).
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
