import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const {
    formatPrice,
    openQuickView,
    addToCart,
    wishlist,
    toggleWishlist
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState(null);

  const isSaved = wishlist.includes(product.id);
  const isSoldOut = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock < 5;
  const hasSale = product.comparePrice && product.comparePrice > product.price;

  const handleQuickAdd = (e, size) => {
    e.stopPropagation();
    if (isSoldOut) return;
    const defaultColor = product.colors && product.colors[0]?.name;
    addToCart(product, size, defaultColor, 1);
  };

  return (
    <div
      className="group relative flex flex-col bg-transparent transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSelectedQuickSize(null);
      }}
    >
      {/* Visual Image Container with 3:4 Aspect Ratio */}
      <div
        onClick={() => openQuickView(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECECE8] dark:bg-[#18181B] rounded-xl cursor-pointer"
      >
        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover object-center transition-all duration-700 ease-out ${
            product.hoverImage && isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Hover Image (if available) */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Top Badges (Stock / Sale / New) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {isSoldOut ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest font-bold bg-[#0B0B0C]/90 text-[#FAF9F6] backdrop-blur-md">
              Sold Out
            </span>
          ) : isLowStock ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest font-bold bg-amber-500/90 text-white backdrop-blur-md animate-pulse">
              Only {product.stock} Left
            </span>
          ) : hasSale ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest font-bold bg-[#D4AF37]/90 text-[#0B0B0C] backdrop-blur-md">
              Archival Sale
            </span>
          ) : product.isNew ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest font-bold bg-black/70 dark:bg-white/80 text-white dark:text-black backdrop-blur-md">
              New Arrival
            </span>
          ) : null}
        </div>

        {/* Top Right: Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            isSaved
              ? 'bg-[#0B0B0C] text-[#D4AF37] shadow-md scale-105'
              : 'bg-white/80 dark:bg-black/60 text-[#0B0B0C] dark:text-[#FAF9F6] hover:bg-white hover:scale-105'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-300 ${
              isSaved ? 'fill-[#D4AF37] stroke-[#D4AF37]' : ''
            }`}
          />
        </button>

        {/* Center Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-16 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-[#141416]/95 text-[#0B0B0C] dark:text-[#FAF9F6] text-xs font-semibold tracking-wider uppercase shadow-xl hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-all transform -translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Quick Add Size Overlay on Hover (Bottom of image) */}
        {!isSoldOut && (
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <p className="text-[10px] text-white/90 uppercase font-mono tracking-wider text-center mb-1.5">
              Quick Add Size
            </p>
            <div className="flex items-center justify-center gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleQuickAdd(e, size)}
                  className="px-2.5 py-1 text-[11px] font-mono font-medium rounded bg-white/90 hover:bg-[#D4AF37] text-[#0B0B0C] hover:text-[#0B0B0C] transition-all active:scale-90"
                  title={`Add size ${size} to bag`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Details Section Below Image */}
      <div className="pt-3.5 pb-1 flex flex-col space-y-1">
        {/* Category & Color Swatches */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#71717A] dark:text-[#A1A1AA]">
            {product.category}
          </span>
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.map((c, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/20"
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
          className="text-sm font-medium tracking-tight text-[#0B0B0C] dark:text-[#FAF9F6] group-hover:text-[#D4AF37] dark:group-hover:text-[#E5C378] transition-colors cursor-pointer line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-semibold text-[#0B0B0C] dark:text-[#FAF9F6]">
            {formatPrice(product.price)}
          </span>
          {hasSale && (
            <span className="text-xs text-[#71717A] dark:text-[#A1A1AA] line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
