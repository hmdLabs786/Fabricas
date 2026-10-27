import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

export default function ProductCard({ product }) {
  const {
    formatPrice,
    openQuickView,
    addToCart,
    wishlist,
    toggleWishlist
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const isSaved = wishlist.includes(product.id);
  const isSoldOut = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock < 5;
  const hasSale = product.comparePrice && product.comparePrice > product.price;

  const handleQuickAdd = (e, size) => {
    e.stopPropagation();
    if (isSoldOut) return;
    const defaultColor = product.hasColors && product.colors ? product.colors[0]?.name : '';
    addToCart(product, size, defaultColor, 1);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl border border-[#E7E5E0] overflow-hidden luxury-card-hover shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div
        onClick={() => openQuickView(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#F1EFEA] cursor-pointer"
      >
        {product.image ? (
          <>
            <img
              src={product.image}
              alt={product.name}
              className={`h-full w-full object-cover object-center transition-all duration-500 ease-out ${
                product.hoverImage && isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
              }`}
              loading="lazy"
            />
            {product.hoverImage && (
              <img
                src={product.hoverImage}
                alt={`${product.name} alternate view`}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ease-out ${
                  isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
                loading="lazy"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#94A3B8] p-4 text-center">
            <ShoppingBag className="w-8 h-8 opacity-40 mb-1" />
            <span className="text-xs">No image provided</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {isSoldOut ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold bg-[#1E2329]/90 text-white backdrop-blur-md">
              Sold Out
            </span>
          ) : isLowStock ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold bg-amber-600 text-white shadow-xs">
              Only {product.stock} Left
            </span>
          ) : hasSale ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold bg-[#C87D55] text-white">
              Sale
            </span>
          ) : null}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isSaved
              ? 'bg-white text-[#C87D55] shadow-md scale-105'
              : 'bg-white/80 text-[#64748B] hover:text-[#C87D55] hover:bg-white'
          }`}
          aria-label={isSaved ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${isSaved ? 'fill-[#C87D55] stroke-[#C87D55]' : ''}`}
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
        {!isSoldOut && product.hasSizes && product.sizes && product.sizes.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 p-2.5 bg-white/95 backdrop-blur-md border-t border-[#E7E5E0] translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <p className="text-[10px] text-[#64748B] uppercase font-mono tracking-wider text-center mb-1">
              Select Size
            </p>
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleQuickAdd(e, size)}
                  className="px-2 py-0.5 text-[11px] font-mono font-medium rounded border border-[#E7E5E0] bg-white hover:bg-[#0F766E] hover:border-[#0F766E] hover:text-white text-[#1E2329] transition-all"
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
      <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
        <div>
          {/* Category & Color / Fabric Info */}
          <div className="flex items-center justify-between text-[11px] text-[#64748B] mb-1">
            <span className="uppercase font-mono tracking-wider font-medium text-[#0F766E]">
              {product.category || 'Clothing'}
            </span>

            {/* Color preview dots (if enabled) */}
            {product.hasColors && product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1">
                {product.colors.map((c, i) => (
                  <span
                    key={i}
                    className="w-2.5 h-2.5 rounded-full border border-black/10"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            )}

            {/* Fabric note (if enabled and no colors) */}
            {(!product.hasColors || !product.colors?.length) && product.hasFabric && product.fabric && (
              <span className="text-[10px] text-[#64748B] truncate max-w-[100px]">
                {product.fabric}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openQuickView(product)}
            className="text-sm font-semibold text-[#1E2329] group-hover:text-[#0F766E] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing & Add to Bag (if no sizes needed) */}
        <div className="pt-1 border-t border-[#F1EFE9] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-[#1E2329] font-mono">
              {formatPrice(product.price)}
            </span>
            {hasSale && (
              <span className="text-xs text-[#94A3B8] line-through font-mono">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {/* If product does NOT require sizes, a 1-click Add to Bag button */}
          {!product.hasSizes && (
            <button
              disabled={isSoldOut}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, null, null, 1);
              }}
              className={`p-2 rounded-xl transition-all ${
                isSoldOut
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#0F766E]/10 text-[#0F766E] hover:bg-[#0F766E] hover:text-white'
              }`}
              title="Add to Bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
