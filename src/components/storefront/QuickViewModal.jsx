import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Heart, ShoppingBag, Truck, ShieldCheck, Check } from 'lucide-react';

export default function QuickViewModal() {
  const {
    isQuickViewOpen,
    setIsQuickViewOpen,
    quickViewProduct: product,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist
  } = useStore();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.hasSizes && product.sizes?.length ? product.sizes[0] : '');
      setSelectedColor(product.hasColors && product.colors?.length ? product.colors[0]?.name : '');
      setQuantity(1);
      setActiveImage(product.image || '');
    }
  }, [product]);

  if (!isQuickViewOpen || !product) return null;

  const isSaved = wishlist.includes(product.id);
  const isSoldOut = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock < 5;
  const hasSale = product.comparePrice && product.comparePrice > product.price;

  const handleAddToBag = () => {
    if (isSoldOut) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsQuickViewOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E7E5E0] overflow-hidden my-8">
        
        {/* Close button */}
        <button
          onClick={() => setIsQuickViewOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#64748B] hover:text-[#1E2329] shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Image */}
          <div className="bg-[#F8F7F4] p-6 flex flex-col justify-between">
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden relative shadow-inner bg-white">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
                  <ShoppingBag className="w-12 h-12 opacity-30" />
                </div>
              )}

              {/* Status Badges */}
              <div className="absolute top-3 left-3">
                {isSoldOut ? (
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold bg-[#1E2329] text-white">
                    Sold Out
                  </span>
                ) : isLowStock ? (
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold bg-amber-600 text-white">
                    Only {product.stock} Left
                  </span>
                ) : null}
              </div>
            </div>

            {/* Thumbnail switcher if hoverImage exists */}
            {product.hoverImage && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`w-14 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === product.image ? 'border-[#0F766E]' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setActiveImage(product.hoverImage)}
                  className={`w-14 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === product.hoverImage ? 'border-[#0F766E]' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={product.hoverImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
                </button>
              </div>
            )}
          </div>

          {/* Right: Details & Add to Cart */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase tracking-widest font-semibold text-[#0F766E]">
                  {product.category || 'Clothing'}
                </span>
                {product.sku && (
                  <span className="font-mono text-[#94A3B8]">{product.sku}</span>
                )}
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#1E2329]">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-3 mt-1.5">
                  <span className="text-xl font-bold font-mono text-[#1E2329]">
                    {formatPrice(product.price)}
                  </span>
                  {hasSale && (
                    <span className="text-sm font-mono text-[#94A3B8] line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Colors (ONLY IF ENABLED FOR THIS PRODUCT) */}
              {product.hasColors && product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-medium text-[#475569] block">
                    Color: <strong className="text-[#1E2329]">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`p-0.5 rounded-full border-2 transition-all ${
                          selectedColor === c.name ? 'border-[#0F766E] scale-110' : 'border-transparent'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="block w-6 h-6 rounded-full shadow-inner"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes (ONLY IF ENABLED FOR THIS PRODUCT) */}
              {product.hasSizes && product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-medium text-[#475569] block">
                    Size: <strong className="text-[#1E2329]">{selectedSize}</strong>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-[#0F766E] text-white font-bold shadow-xs'
                            : 'border border-[#E7E5E0] bg-white text-[#1E2329] hover:border-[#0F766E]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fabric Details (ONLY IF ENABLED FOR THIS PRODUCT) */}
              {product.hasFabric && product.fabric && (
                <div className="p-3 bg-[#F8F7F4] rounded-xl text-xs space-y-0.5">
                  <span className="font-semibold text-[#475569] block text-[11px] uppercase tracking-wider">
                    Fabric / Material:
                  </span>
                  <p className="text-[#334155]">{product.fabric}</p>
                </div>
              )}

              {/* Custom Note / Specification (if any) */}
              {product.hasCustomNote && product.customNote && (
                <div className="p-3 bg-[#F8F7F4] rounded-xl text-xs space-y-0.5">
                  <span className="font-semibold text-[#475569] block text-[11px] uppercase tracking-wider">
                    Additional Details:
                  </span>
                  <p className="text-[#334155]">{product.customNote}</p>
                </div>
              )}

              {/* Quantity Stepper */}
              {!isSoldOut && (
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs font-medium text-[#475569]">Quantity:</span>
                  <div className="flex items-center border border-[#E7E5E0] bg-white rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-sm text-[#64748B] hover:text-black"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-mono font-bold min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1 text-sm text-[#64748B] hover:text-black"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#E7E5E0]">
              <div className="flex items-center gap-3">
                <button
                  disabled={isSoldOut}
                  onClick={handleAddToBag}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-semibold text-xs tracking-wide transition-all shadow-md ${
                    isSoldOut
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-[#0F766E] text-white hover:bg-[#0D5C58] active:scale-98'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {isSoldOut ? 'Sold Out' : `Add to Bag • ${formatPrice(product.price * quantity)}`}
                  </span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isSaved ? 'text-[#C87D55] border-[#C87D55] bg-[#C87D55]/5' : 'text-[#64748B] border-[#E7E5E0] hover:border-[#1E2329]'
                  }`}
                  aria-label="Add to favorites"
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#C87D55]' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 text-[11px] text-[#64748B] pt-1">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>Delivery across Pakistan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>100% Quality Guaranteed</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
