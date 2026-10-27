import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Send, MapPin, User, Phone, FileText } from 'lucide-react';
import WhatsAppIcon from '../common/WhatsAppIcon';

export default function WhatsAppOrderModal() {
  const {
    isWhatsAppOrderModalOpen,
    setIsWhatsAppOrderModalOpen,
    createWhatsAppOrder,
    cart,
    cartTotal,
    formatPrice
  } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Karachi',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isWhatsAppOrderModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMsg('Please provide your name, phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      createWhatsAppOrder(formData);
    } catch (err) {
      console.error(err);
      setErrorMsg('Error generating WhatsApp order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E7E5E0] p-6 sm:p-8 my-8">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E7E5E0]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#25D366]/25">
              <WhatsAppIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-[#1E2329]">
                Order via WhatsApp
              </h2>
              <p className="text-xs text-[#64748B]">
                Enter your delivery details to generate an instant WhatsApp message.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWhatsAppOrderModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#64748B] hover:text-[#1E2329]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Summary pill */}
        <div className="my-4 p-3.5 rounded-2xl bg-[#F8F7F4] border border-[#E7E5E0] flex items-center justify-between text-xs">
          <span className="text-[#475569] font-medium">
            Bag Total ({cart.reduce((a, b) => a + b.quantity, 0)} items):
          </span>
          <span className="font-mono font-bold text-sm text-[#0F766E]">
            {formatPrice(cartTotal)}
          </span>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Delivery Details Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1E2329] mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ayesha Khan"
                required
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E2329] mb-1">
              Phone / WhatsApp Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0322 1234567 or +92 3..."
                required
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E2329] mb-1">
              Complete Delivery Address *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House / Flat No., Street, Area (e.g. DHA Phase 6, Clifton, Gulshan)"
                required
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E2329] mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Karachi"
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E2329] mb-1">
              Special Instructions / Notes (Optional)
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special size request, color preference, or timing"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full shimmer-hover py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20BA5C] text-white font-semibold text-xs tracking-wider shadow-lg shadow-[#25D366]/25 transition-all flex items-center justify-center gap-2.5 active:scale-98 group"
            >
              <WhatsAppIcon className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
              <span>Confirm & Open in WhatsApp</span>
            </button>
            <p className="text-[11px] text-[#64748B] text-center mt-2">
              Our team will review your order details on WhatsApp and confirm delivery!
            </p>
          </div>
        </form>

      </div>
    </div>
  );
}
