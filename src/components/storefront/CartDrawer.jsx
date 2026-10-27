import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import WhatsAppIcon from '../common/WhatsAppIcon';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartShipping,
    isFreeShipping,
    cartTotal,
    settings,
    formatPrice,
    setIsWhatsAppOrderModalOpen
  } = useStore();

  if (!isCartOpen) return null;

  const threshold = settings.freeShippingThreshold || 3500;
  const amountNeeded = Math.max(0, threshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / threshold) * 100);

  const handleContinueWhatsApp = () => {
    setIsCartOpen(false);
    setIsWhatsAppOrderModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-white text-[#1E2329] shadow-2xl flex flex-col justify-between border-l border-[#E7E5E0]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E7E5E0] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="text-base font-display font-bold text-[#1E2329]">
                Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 text-[#64748B] hover:text-[#1E2329] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#FAF8F5] border-b border-[#E7E5E0]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {isFreeShipping ? (
                <span className="font-semibold text-[#0F766E] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Free Express Delivery Unlocked!
                </span>
              ) : (
                <span className="text-[#64748B]">
                  Add <strong className="text-[#1E2329]">{formatPrice(amountNeeded)}</strong> more for Free Delivery
                </span>
              )}
              <span className="font-mono text-[11px] font-bold text-[#475569]">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#E7E5E0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#0F766E] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Body: Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#F8F7F4] flex items-center justify-center text-[#94A3B8]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-display font-bold text-[#1E2329]">
                  Your Bag is Empty
                </h3>
                <p className="text-xs text-[#64748B] max-w-xs leading-relaxed">
                  Explore our collections to add graceful silhouettes and fabrics to your cart.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#0D5C58] transition-colors shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] transition-all hover:shadow-xs"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover object-center rounded-xl bg-white flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-24 rounded-xl bg-white flex items-center justify-center text-[#94A3B8] flex-shrink-0">
                      <ShoppingBag className="w-6 h-6 opacity-40" />
                    </div>
                  )}

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-[#1E2329] leading-tight line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[#94A3B8] hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Display size & color if present */}
                      {(item.size || item.color) && (
                        <p className="text-[11px] font-mono text-[#64748B] mt-0.5">
                          {item.size ? `Size: ${item.size}` : ''}
                          {item.size && item.color ? ' • ' : ''}
                          {item.color ? `Color: ${item.color}` : ''}
                        </p>
                      )}

                      <p className="text-xs font-bold font-mono text-[#0F766E] mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E7E5E0] bg-white rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-xs text-[#64748B] hover:text-black hover:bg-black/5"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-xs text-[#64748B] hover:text-black hover:bg-black/5"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-mono font-bold text-[#1E2329]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer: Totals and "Continue to WhatsApp" CTA */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E7E5E0] bg-[#FAF8F5] space-y-4">
              
              {/* Order Math Breakdown */}
              <div className="space-y-1.5 text-xs text-[#475569]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-[#1E2329]">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery ({isFreeShipping ? 'Complimentary' : 'Standard Delivery'})</span>
                  <span className="font-mono font-semibold text-[#1E2329]">
                    {isFreeShipping ? 'FREE' : formatPrice(cartShipping)}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#E7E5E0] text-sm font-bold text-[#1E2329]">
                  <span>Total Amount</span>
                  <span className="font-mono text-base text-[#0F766E]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Continue to WhatsApp Button */}
              <button
                onClick={handleContinueWhatsApp}
                className="w-full shimmer-hover flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20BA5C] text-white text-xs font-semibold tracking-wider shadow-lg shadow-[#25D366]/25 transition-all hover:scale-102 active:scale-98 group"
              >
                <WhatsAppIcon className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
                <span>Continue to WhatsApp</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#64748B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>No advance payment needed • Cash on Delivery</span>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
