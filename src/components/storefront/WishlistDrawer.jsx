import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    formatPrice,
    openQuickView
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-[#1E2329] shadow-2xl flex flex-col justify-between border-l border-[#E7E5E0]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E7E5E0] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#C87D55]/15 text-[#C87D55] flex items-center justify-center">
                <Heart className="w-5 h-5 fill-[#C87D55]" />
              </div>
              <h2 className="text-base font-display font-bold text-[#1E2329]">
                Saved Favorites ({wishlistedProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 text-[#64748B] hover:text-[#1E2329]"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#F8F7F4] flex items-center justify-center text-[#94A3B8]">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-display font-bold text-[#1E2329]">
                  No Favorites Saved
                </h3>
                <p className="text-xs text-[#64748B] max-w-xs leading-relaxed">
                  Click the heart icon on any product to save it to your personal favorites wishlist.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#0D5C58] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => {
                const displayImg = (product.images && product.images[0]) || product.image;
                return (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E0] transition-all hover:shadow-xs"
                  >
                    {displayImg ? (
                      <img
                        src={displayImg}
                        alt={product.name}
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openQuickView(product);
                        }}
                        className="w-20 h-24 object-cover object-center rounded-xl bg-white cursor-pointer flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-24 rounded-xl bg-white flex items-center justify-center text-[#94A3B8] flex-shrink-0">
                        <ShoppingBag className="w-6 h-6 opacity-40" />
                      </div>
                    )}

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              setIsWishlistOpen(false);
                              openQuickView(product);
                            }}
                            className="text-xs font-bold leading-tight line-clamp-1 cursor-pointer hover:text-[#0F766E] transition-colors"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="text-[#94A3B8] hover:text-rose-600 transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] font-mono text-[#0F766E] mt-0.5 uppercase">
                          {product.fabric || 'Karachi Atelier'}
                        </p>
                        <p className="text-xs font-bold font-mono text-[#1E2329] mt-1">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            addToCart(product, product.sizes?.[0] || null, product.colors?.[0]?.name || null, 1);
                          }}
                          className="w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors bg-[#0F766E] text-white hover:bg-[#0D5C58]"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
