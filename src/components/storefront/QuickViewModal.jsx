import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Heart, ShoppingBag, Truck, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import CircularZoomImage from '../common/CircularZoomImage';

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

  const currentIndex = Math.max(0, productImages.indexOf(activeImage));

  const handlePrevImage = useCallback((e) => {
    e?.stopPropagation();
    if (productImages.length <= 1) return;
    const prevIdx = (currentIndex - 1 + productImages.length) % productImages.length;
    setActiveImage(productImages[prevIdx]);
  }, [currentIndex, productImages]);

  const handleNextImage = useCallback((e) => {
    e?.stopPropagation();
    if (productImages.length <= 1) return;
    const nextIdx = (currentIndex + 1) % productImages.length;
    setActiveImage(productImages[nextIdx]);
  }, [currentIndex, productImages]);

  // Keyboard navigation: Left/Right arrows cycle images, Escape closes modal
  useEffect(() => {
    if (!isQuickViewOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'Escape') {
        setIsQuickViewOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQuickViewOpen, handlePrevImage, handleNextImage, setIsQuickViewOpen]);

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

  // Touch swipe support for mobile image switching
  const touchStartX = React.useRef(null);
  const touchEndX = React.useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 35) {
      handleNextImage(e);
    } else if (distance < -35) {
      handlePrevImage(e);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleAddToBag = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsQuickViewOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-0 sm:p-4 md:p-6 flex items-end sm:items-center justify-center animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E7E5E0] overflow-hidden max-h-[92vh] sm:max-h-[90vh] flex flex-col">
        
        {/* Close button */}
        <button
          onClick={() => setIsQuickViewOpen(false)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full bg-white/95 hover:bg-white text-[#64748B] hover:text-[#1E2329] shadow-md transition-all active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Imagery Gallery with Circular Hover Zoom & Navigation Arrows */}
          <div className="bg-[#FAF8F5] p-4 sm:p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E7E5E0]">
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="aspect-square sm:aspect-[3/4] max-h-[42vh] sm:max-h-none w-full rounded-2xl overflow-hidden relative shadow-sm bg-white touch-pan-y"
            >
              {activeImage ? (
                <CircularZoomImage
                  src={activeImage}
                  alt={product.name}
                  zoomScale={2.5}
                  lensSize={175}
                  className="w-full h-full"
                >
                  {/* Left & Right Image Navigation Arrows */}
                  {productImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#1E2329] shadow-lg border border-[#E7E5E0] hover:scale-110 active:scale-95 transition-all"
                        aria-label="Previous image"
                        title="Previous photo (Left Arrow key)"
                      >
                        <ChevronLeft className="w-4 h-4 text-[#1E2329]" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#1E2329] shadow-lg border border-[#E7E5E0] hover:scale-110 active:scale-95 transition-all"
                        aria-label="Next image"
                        title="Next photo (Right Arrow key)"
                      >
                        <ChevronRight className="w-4 h-4 text-[#1E2329]" />
                      </button>
                    </>
                  )}

                  {/* Photo Counter Badge */}
                  {productImages.length > 1 && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold bg-black/60 text-white backdrop-blur-md shadow-xs">
                        {currentIndex + 1} / {productImages.length}
                      </span>
                    </div>
                  )}

                  {/* Special Badges */}
                  <div className="absolute top-3 left-3 z-10">
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
                </CircularZoomImage>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
                  <ShoppingBag className="w-12 h-12 opacity-30" />
                </div>
              )}
            </div>

            {/* Thumbnail switcher gallery (supports multiple images) */}
            {productImages.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 pt-1 scrollbar-thin">
                {productImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-14 h-18 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === imgUrl
                        ? 'border-[#0F766E] shadow-sm scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100 hover:scale-102'
                    }`}
                    title={`View photo ${index + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Angle ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Add to Cart */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between space-y-4 sm:space-y-6">
            <div className="space-y-4 sm:space-y-5">
              
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
                  <p className="text-[#334155] whitespace-pre-line leading-relaxed">{product.customNote}</p>
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

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-[10px] sm:text-[11px] text-[#64748B] pt-1 text-center">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#0F766E] flex-shrink-0" />
                  <span>Express Delivery across Pakistan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E] flex-shrink-0" />
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
