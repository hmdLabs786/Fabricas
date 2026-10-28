import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const {
    formatPrice,
    openQuickView,
    addToCart,
    wishlist,
    toggleWishlist
  } = useStore();

  const isSaved = (wishlist || []).includes(product.id);
  const hasSale = product.comparePrice && product.comparePrice > product.price;

  // Collect all images for the product card
  const images = (Array.isArray(product.images) && product.images.length > 0)
    ? product.images
    : [product.image, product.hoverImage].filter(Boolean);

  const [activeIdx, setActiveIdx] = useState(0);
  const currentImage = images[activeIdx] || product.image || '';
  const hoverPreviewImage = activeIdx === 0 && images.length > 1 ? images[1] : null;

  const handlePrev = (e) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const handleQuickAdd = (e, size) => {
    e.stopPropagation();
    const defaultColor = product.hasColors && product.colors ? product.colors[0]?.name : '';
    addToCart(product, size, defaultColor, 1);
  };

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
      // Swiped left -> next photo
      e.stopPropagation();
      handleNext(e);
    } else if (distance < -35) {
      // Swiped right -> prev photo
      e.stopPropagation();
      handlePrev(e);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-xl sm:rounded-2xl border border-[#E7E5E0] overflow-hidden luxury-card-hover shadow-xs sm:shadow-sm transition-all duration-300">
      {/* Product Image Container */}
      <div
        onClick={() => openQuickView(product)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#F1EFEA] cursor-pointer touch-pan-y"
      >
        {currentImage ? (
          <>
            <img
              src={currentImage}
              alt={product.name}
              className={`h-full w-full object-cover object-center transition-all duration-500 ease-out ${
                hoverPreviewImage ? 'sm:group-hover:opacity-0 sm:group-hover:scale-105' : 'sm:group-hover:scale-105'
              }`}
              loading="lazy"
              decoding="async"
            />
            {hoverPreviewImage && (
              <img
                src={hoverPreviewImage}
                alt={`${product.name} alternate view`}
                className="hidden sm:block absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#94A3B8] p-4 text-center">
            <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 opacity-40 mb-1" />
            <span className="text-xs">No image provided</span>
          </div>
        )}

        {/* Image Navigation Arrows (Always accessible on mobile, on hover on desktop) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-1.5 sm:left-2.5 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-white/95 text-[#1E2329] shadow-md border border-[#E7E5E0] hover:bg-[#0F766E] hover:text-white hover:border-[#0F766E] transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 focus:opacity-100"
              aria-label="Previous photo"
              title="Previous photo"
            >
              <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-1.5 sm:right-2.5 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-white/95 text-[#1E2329] shadow-md border border-[#E7E5E0] hover:bg-[#0F766E] hover:text-white hover:border-[#0F766E] transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 focus:opacity-100"
              aria-label="Next photo"
              title="Next photo"
            >
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            {/* Pagination Dot Indicator */}
            <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full pointer-events-none opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              {images.slice(0, 5).map((_, i) => (
                <span
                  key={i}
                  className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIdx ? 'bg-white w-2.5 sm:w-3' : 'bg-white/50 w-1 sm:w-1.5'
                  }`}
                />
              ))}
              {images.length > 5 && (
                <span className="text-[7px] sm:text-[8px] text-white/90 font-mono pl-0.5">+{images.length - 5}</span>
              )}
            </div>
          </>
        )}

        {/* Top Badges (High-fashion editorial badges: Sale, New) */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {hasSale ? (
            <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold bg-[#C87D55] text-white shadow-xs">
              Sale
            </span>
          ) : product.isNew ? (
            <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold bg-[#0F766E] text-white shadow-xs">
              New
            </span>
          ) : null}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isSaved
              ? 'bg-white text-[#C87D55] shadow-md scale-105'
              : 'bg-white/85 text-[#64748B] hover:text-[#C87D55] hover:bg-white shadow-xs'
          }`}
          aria-label={isSaved ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${isSaved ? 'fill-[#C87D55] stroke-[#C87D55]' : ''}`}
          />
        </button>

        {/* Center Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#1E2329] text-xs font-semibold shadow-md hover:bg-[#0F766E] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Quick Add Size Overlay (ONLY IF PRODUCT HAS SIZES) */}
        {product.hasSizes && product.sizes && product.sizes.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 p-2.5 bg-white/95 backdrop-blur-md border-t border-[#E7E5E0] translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <p className="text-[10px] text-[#64748B] uppercase font-mono tracking-wider text-center mb-1">
              Select Size
            </p>
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleQuickAdd(e, size)}
                  className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg border border-[#E7E5E0] bg-white hover:bg-[#0F766E] hover:border-[#0F766E] hover:text-white text-[#1E2329] transition-all"
                  title={`Add size ${size} to bag`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-2.5 sm:p-4 flex flex-col justify-between flex-1 space-y-1.5 sm:space-y-2">
        <div>
          {/* Fabric / Color Info Header (No category) */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#64748B] mb-1">
            {product.hasFabric && product.fabric ? (
              <span className="text-[10px] sm:text-[11px] font-medium text-[#0F766E] truncate max-w-[130px] sm:max-w-[170px]">
                {product.fabric}
              </span>
            ) : (
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-[#64748B]">
                Karachi Atelier
              </span>
            )}

            {/* Color preview dots (if enabled) */}
            {product.hasColors && product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1">
                {product.colors.map((c, i) => (
                  <span
                    key={i}
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-black/10"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openQuickView(product)}
            className="text-xs sm:text-sm font-semibold text-[#1E2329] group-hover:text-[#0F766E] transition-colors cursor-pointer line-clamp-2 leading-snug sm:leading-normal"
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing & Add to Bag (if no sizes needed) */}
        <div className="pt-2 border-t border-[#F1EFE9] flex items-center justify-between gap-1">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm font-bold text-[#1E2329] font-mono">
              {formatPrice(product.price)}
            </span>
            {hasSale && (
              <span className="text-[10px] sm:text-xs text-[#94A3B8] line-through font-mono">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {/* If product does NOT require sizes, a 1-click Add to Bag button */}
          {!product.hasSizes && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, null, null, 1);
              }}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all bg-[#0F766E]/10 text-[#0F766E] hover:bg-[#0F766E] hover:text-white"
              title="Add to Bag"
              aria-label="Add to Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
