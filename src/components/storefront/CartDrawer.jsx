import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartDiscountedSubtotal,
    isFreeShipping,
    cartShipping,
    cartTax,
    cartTotal,
    promoCode,
    discountPercent,
    applyPromoCode,
    removePromoCode,
    settings,
    formatPrice,
    setIsCheckoutOpen
  } = useStore();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const threshold = settings.freeShippingThreshold || 250;
  const amountNeeded = Math.max(0, threshold - cartDiscountedSubtotal);
  const progressPercent = Math.min(100, (cartDiscountedSubtotal / threshold) * 100);

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = applyPromoCode(inputCode);
    if (success) setInputCode('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-[#FAF9F6] dark:bg-[#101012] text-[#0B0B0C] dark:text-[#FAF9F6] shadow-2xl flex flex-col justify-between border-l border-[#E4E4E0] dark:border-[#202025]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E4E4E0] dark:border-[#202025] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-base font-editorial font-bold uppercase tracking-widest">
                Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-black/[0.03] dark:bg-white/[0.03] border-b border-[#E4E4E0] dark:border-[#202025]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {isFreeShipping ? (
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Complimentary Express Shipping Unlocked!
                </span>
              ) : (
                <span className="text-[#52525B] dark:text-[#A1A1AA]">
                  Add <strong className="text-[#0B0B0C] dark:text-white">{formatPrice(amountNeeded)}</strong> for Free Express Delivery
                </span>
              )}
              <span className="font-mono text-[11px] font-bold">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#E4E4E0] dark:bg-[#27272A] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#D4AF37] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Body: Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#ECECE8] dark:bg-[#1E1E22] flex items-center justify-center text-[#71717A]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-editorial font-bold uppercase tracking-wider">
                  Your Bag is Currently Empty
                </h3>
                <p className="text-xs text-[#71717A] max-w-xs leading-relaxed">
                  Explore our Autumn/Winter Archive to select tailored garments and structured silhouettes.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs font-semibold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 p-3 rounded-xl bg-white/70 dark:bg-[#18181B]/70 border border-[#E4E4E0] dark:border-[#27272A] transition-all hover:shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover object-center rounded-lg bg-[#ECECE8] flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold leading-tight line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[#8E8E93] hover:text-rose-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] mt-0.5">
                        Size: {item.size} • Color: {item.color}
                      </p>
                      <p className="text-xs font-bold text-[#0B0B0C] dark:text-[#FAF9F6] mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E4E4E0] dark:border-[#27272A] rounded-md overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-[11px] font-mono font-bold min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-mono font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer: Promos, Dynamic Calculations, and Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E4E4E0] dark:border-[#202025] bg-[#FAF9F6] dark:bg-[#101012] space-y-4">
              
              {/* Promo Code Input */}
              {discountPercent > 0 ? (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                    <Tag className="w-3.5 h-3.5" />
                    <span className="font-mono font-bold">{promoCode}</span>
                    <span>({discountPercent}% OFF)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-emerald-700 dark:text-emerald-300 hover:text-rose-600 text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCode} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (e.g. NOCTURNE15)"
                    className="flex-1 px-3 py-2 rounded-lg text-xs bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none uppercase font-mono tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Order Math Breakdown */}
              <div className="space-y-1.5 text-xs text-[#52525B] dark:text-[#A1A1AA] pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#0B0B0C] dark:text-[#FAF9F6]">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Archival Discount ({discountPercent}%)</span>
                    <span className="font-mono">-{formatPrice(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping ({isFreeShipping ? 'Complimentary Express' : 'Flat Rate'})</span>
                  <span className="font-mono text-[#0B0B0C] dark:text-[#FAF9F6]">
                    {isFreeShipping ? 'FREE' : formatPrice(cartShipping)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax ({settings.taxRate}%)</span>
                  <span className="font-mono text-[#0B0B0C] dark:text-[#FAF9F6]">
                    {formatPrice(cartTax)}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#E4E4E0] dark:border-[#202025] text-sm font-bold text-[#0B0B0C] dark:text-[#FAF9F6]">
                  <span>Total Due</span>
                  <span className="font-mono text-base text-[#D4AF37] dark:text-[#E5C378]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-[#0B0B0C] transition-all shadow-xl active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#71717A] dark:text-[#A1A1AA]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Encrypted 256-Bit SSL Atelier Checkout</span>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
