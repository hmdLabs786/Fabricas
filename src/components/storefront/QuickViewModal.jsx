import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Heart, ShoppingBag, Truck, ShieldCheck, Sparkles } from 'lucide-react';

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

  // Collect all images for the gallery
  const productImages = product
    ? (Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : [product.image, product.hoverImage].filter(Boolean))
    : [];

  useEffect(() => {
    if (product) {
      setSelectedSize(product.hasSizes && product.sizes?.length ? product.sizes[0] : '');
      setSelectedColor(product.hasColors && product.colors?.length ? product.colors[0]?.name : '');
      setQuantity(1);
      const defaultImg = (product.images && product.images[0]) || product.image || '';
      setActiveImage(defaultImg);
    }
  }, [product]);

  if (!isQuickViewOpen || !product) return null;

  const isSaved = (wishlist || []).includes(product.id);
  const hasSale = product.comparePrice && product.comparePrice > product.price;

  const handleAddToBag = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsQuickViewOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-3 sm:p-6 md:p-8 flex items-start justify-center animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E7E5E0] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Close button */}
        <button
          onClick={() => setIsQuickViewOpen(false)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#64748B] hover:text-[#1E2329] shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Imagery Gallery */}
          <div className="bg-[#FAF8F5] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E7E5E0]">
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden relative shadow-sm bg-white">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
                  <ShoppingBag className="w-12 h-12 opacity-30" />
                </div>
              )}

              {/* Special Badges */}
              <div className="absolute top-3 left-3">
                {hasSale ? (
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold bg-[#C87D55] text-white shadow-xs">
                    Special Price
                  </span>
                ) : product.isNew ? (
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold bg-[#0F766E] text-white shadow-xs">
                    New Arrival
                  </span>
                ) : null}
              </div>
            </div>

            {/* Thumbnail switcher gallery (supports multiple images) */}
            {productImages.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 pt-1">
                {productImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-14 h-18 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === imgUrl
                        ? 'border-[#0F766E] shadow-sm scale-102'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Angle ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Add to Cart */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* Header without Category */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-[#0F766E]">
                    Karachi Atelier
                  </span>
                  {product.sku && (
                    <span className="font-mono text-xs text-[#94A3B8]">• {product.sku}</span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#1E2329]">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl font-extrabold font-mono text-[#1E2329]">
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
                <p className="text-xs sm:text-sm text-[#576375] leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Colors (if enabled) */}
              {product.hasColors && product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-semibold text-[#1E2329] block">
                    Selected Color: <strong className="text-[#0F766E]">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`p-0.5 rounded-full border-2 transition-all ${
                          selectedColor === c.name ? 'border-[#0F766E] scale-110 shadow-xs' : 'border-transparent'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="block w-6 h-6 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes (if enabled) */}
              {product.hasSizes && product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-semibold text-[#1E2329] block">
                    Select Size: <strong className="text-[#0F766E]">{selectedSize}</strong>
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

              {/* Fabric Details (if enabled) */}
              {product.hasFabric && product.fabric && (
                <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E7E5E0] text-xs space-y-0.5">
                  <span className="font-bold text-[#0F766E] block text-[10px] uppercase tracking-wider">
                    Fabric & Composition:
                  </span>
                  <p className="text-[#334155]">{product.fabric}</p>
                </div>
              )}

              {/* Custom Note (if enabled) */}
              {product.hasCustomNote && product.customNote && (
                <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E7E5E0] text-xs space-y-0.5">
                  <span className="font-bold text-[#C87D55] block text-[10px] uppercase tracking-wider">
                    Package / Styling Note:
                  </span>
                  <p className="text-[#334155]">{product.customNote}</p>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-semibold text-[#1E2329]">Quantity:</span>
                <div className="flex items-center border border-[#E7E5E0] bg-white rounded-xl shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 text-sm text-[#64748B] hover:text-black font-semibold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-mono font-bold min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-1.5 text-sm text-[#64748B] hover:text-black font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#E7E5E0]">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToBag}
                  className="flex-1 shimmer-hover flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-[#0F766E] hover:bg-[#0D5C58] text-white font-semibold text-xs tracking-wider shadow-lg shadow-[#0F766E]/20 transition-all hover:scale-102 active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add to Bag • {formatPrice(product.price * quantity)}
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
                  <span>Express Delivery across Pakistan</span>
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
