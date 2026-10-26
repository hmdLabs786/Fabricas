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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] dark:bg-[#101012] text-[#0B0B0C] dark:text-[#FAF9F6] shadow-2xl flex flex-col justify-between border-l border-[#E4E4E0] dark:border-[#202025]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E4E4E0] dark:border-[#202025] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
              <h2 className="text-base font-editorial font-bold uppercase tracking-widest">
                Saved Pieces ({wishlistedProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#ECECE8] dark:bg-[#1E1E22] flex items-center justify-center text-[#71717A]">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-editorial font-bold uppercase tracking-wider">
                  No Saved Pieces Yet
                </h3>
                <p className="text-xs text-[#71717A] max-w-xs leading-relaxed">
                  Click the heart icon on any garment in our archive to curate your personal wardrobe edit.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs font-semibold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => {
                const isSoldOut = product.stock <= 0;
                return (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3 rounded-xl bg-white/70 dark:bg-[#18181B]/70 border border-[#E4E4E0] dark:border-[#27272A] transition-all hover:shadow-sm"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openQuickView(product);
                      }}
                      className="w-20 h-24 object-cover object-center rounded-lg bg-[#ECECE8] cursor-pointer flex-shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              setIsWishlistOpen(false);
                              openQuickView(product);
                            }}
                            className="text-xs font-semibold leading-tight line-clamp-1 cursor-pointer hover:text-[#D4AF37] transition-colors"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="text-[#8E8E93] hover:text-rose-500 transition-colors p-1"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] mt-0.5 uppercase">
                          {product.category}
                        </p>
                        <p className="text-xs font-bold text-[#0B0B0C] dark:text-[#FAF9F6] mt-1">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      {/* Action */}
                      <div className="pt-2">
                        <button
                          disabled={isSoldOut}
                          onClick={() => {
                            addToCart(product, product.sizes[0], product.colors[0]?.name, 1);
                          }}
                          className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                            isSoldOut
                              ? 'bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
                              : 'bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] hover:bg-[#D4AF37]'
                          }`}
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>{isSoldOut ? 'Sold Out' : 'Move to Bag'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 border-t border-[#E4E4E0] dark:border-[#202025]">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => {
                    if (p.stock > 0) {
                      addToCart(p, p.sizes[0], p.colors[0]?.name, 1);
                    }
                  });
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2"
              >
                <span>Add All Available to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
