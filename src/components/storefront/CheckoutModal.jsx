import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import Logo from '../common/Logo';
import confetti from 'canvas-confetti';
import {
  X,
  Lock,
  CreditCard,
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  Apple
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartDiscountedSubtotal,
    isFreeShipping,
    cartShipping,
    cartTax,
    cartTotal,
    discountPercent,
    promoCode,
    createOrder,
    formatPrice
  } = useStore();

  const [formData, setFormData] = useState({
    name: 'Eleanor Sterling',
    email: 'eleanor.sterling@vance.com',
    phone: '+1 (555) 234-8900',
    address: '450 West 14th Street, Apt 8A',
    city: 'New York',
    country: 'United States',
    paymentMethod: 'Credit Card (Visa •••• 4242)'
  });

  const [paymentChoice, setPaymentChoice] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address || !formData.city) {
      setErrorMsg('Please complete all mandatory delivery fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      let finalPayment = 'Credit Card (Visa •••• 4242)';
      if (paymentChoice === 'apple') finalPayment = 'Apple Pay (Quick Authenticated)';
      if (paymentChoice === 'cod') finalPayment = 'Cash on Delivery (White Glove Concierge)';

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#0B0B0C', '#E5C378', '#FFFFFF']
        });
      } catch (err) {
        console.error('Confetti trigger error:', err);
      }

      createOrder(formData, finalPayment);
      setIsSubmitting(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Container */}
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] dark:bg-[#121214] text-[#0B0B0C] dark:text-[#FAF9F6] rounded-2xl shadow-2xl border border-[#E4E4E0] dark:border-[#27272A] overflow-hidden my-8">
        
        {/* Checkout Header with Bespoke SVG Logo */}
        <div className="px-6 py-4 border-b border-[#E4E4E0] dark:border-[#202025] flex items-center justify-between bg-white/50 dark:bg-[#18181B]/50">
          <div className="flex items-center gap-3">
            <Logo size="sm" showWordmark={true} />
            <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-[#71717A] dark:text-[#A1A1AA] border-l border-[#E4E4E0] dark:border-[#27272A] pl-3">
              Express Checkout
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">256-Bit Encrypted</span>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#8E8E93] hover:text-[#0B0B0C] dark:hover:text-white transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content: Form + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Form (7 Cols) */}
          <form onSubmit={handleSubmitOrder} className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            
            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Contact Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#71717A] dark:text-[#A1A1AA]">
                1. Recipient & Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] dark:text-[#A1A1AA] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none focus:border-[#0B0B0C] dark:focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] dark:text-[#A1A1AA] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none focus:border-[#0B0B0C] dark:focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#52525B] dark:text-[#A1A1AA] mb-1">
                  Phone (for Courier Tracking SMS)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#71717A] dark:text-[#A1A1AA]">
                2. Shipping Destination
              </h3>
              <div>
                <label className="block text-[11px] font-medium text-[#52525B] dark:text-[#A1A1AA] mb-1">
                  Street Address & Apartment / Suite *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none focus:border-[#0B0B0C] dark:focus:border-[#D4AF37]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] dark:text-[#A1A1AA] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] dark:text-[#A1A1AA] mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#71717A] dark:text-[#A1A1AA]">
                3. Payment Instrument
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentChoice('card')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-1 transition-all ${
                    paymentChoice === 'card'
                      ? 'border-[#0B0B0C] dark:border-[#D4AF37] bg-white dark:bg-[#1C1C1F] shadow-sm'
                      : 'border-[#E4E4E0] dark:border-[#27272A] opacity-70 hover:opacity-100'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-[11px] font-medium">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentChoice('apple')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-1 transition-all ${
                    paymentChoice === 'apple'
                      ? 'border-[#0B0B0C] dark:border-[#D4AF37] bg-white dark:bg-[#1C1C1F] shadow-sm'
                      : 'border-[#E4E4E0] dark:border-[#27272A] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Apple className="w-4 h-4 text-[#0B0B0C] dark:text-white" />
                  <span className="text-[11px] font-medium">Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentChoice('cod')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-1 transition-all ${
                    paymentChoice === 'cod'
                      ? 'border-[#0B0B0C] dark:border-[#D4AF37] bg-white dark:bg-[#1C1C1F] shadow-sm'
                      : 'border-[#E4E4E0] dark:border-[#27272A] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Truck className="w-4 h-4 text-[#71717A]" />
                  <span className="text-[11px] font-medium">White Glove Concierge</span>
                </button>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 px-6 rounded-xl bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-[#0B0B0C] transition-all shadow-xl active:scale-98 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                  <span>Securing Allocation...</span>
                </span>
              ) : (
                <span>Authorize & Place Order • {formatPrice(cartTotal)}</span>
              )}
            </button>

          </form>

          {/* Right Summary (5 Cols) */}
          <div className="lg:col-span-5 bg-[#F4F3EE] dark:bg-[#18181B] p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-[#E4E4E0] dark:border-[#27272A] flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#71717A] dark:text-[#A1A1AA]">
                Selected Garments ({cart.length})
              </h3>

              {/* Items scroll */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex gap-3 text-xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-16 object-cover rounded-md bg-[#ECECE8]"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-xs line-clamp-1">{item.name}</h4>
                      <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
                        Qty: {item.quantity} • {item.size} • {item.color}
                      </p>
                      <p className="font-mono font-bold mt-0.5">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Math breakdown */}
              <div className="border-t border-[#E4E4E0] dark:border-[#27272A] pt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatPrice(cartSubtotal)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Archival Promo ({discountPercent}%)</span>
                    <span className="font-mono">-{formatPrice(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Courier</span>
                  <span className="font-mono">
                    {isFreeShipping ? 'FREE' : formatPrice(cartShipping)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-mono">{formatPrice(cartTax)}</span>
                </div>

                <div className="flex justify-between pt-3 border-t border-[#E4E4E0] dark:border-[#27272A] text-sm font-bold">
                  <span>Total Amount</span>
                  <span className="font-mono text-base text-[#D4AF37] dark:text-[#E5C378]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 text-[10px] text-[#71717A] dark:text-[#A1A1AA] flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Complimentary insured shipping with signature required.</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
