import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check, Star } from 'lucide-react';

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
      setSelectedSize(product.sizes ? product.sizes[0] : 'One Size');
      setSelectedColor(product.colors && product.colors[0] ? product.colors[0].name : 'Default');
      setQuantity(1);
      setActiveImage(product.image);
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
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] dark:bg-[#121214] text-[#0B0B0C] dark:text-[#FAF9F6] rounded-2xl shadow-2xl border border-[#E4E4E0] dark:border-[#27272A] overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsQuickViewOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-[#0B0B0C] dark:text-[#FAF9F6] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Imagery Gallery */}
          <div className="relative bg-[#ECECE8] dark:bg-[#18181B] p-6 flex flex-col justify-between">
            <div className="aspect-[3/4] w-full rounded-xl overflow-hidden relative shadow-inner">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              
              {/* Floating badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {isSoldOut ? (
                  <span className="px-3 py-1 rounded bg-black/90 text-white font-mono text-[10px] uppercase tracking-widest">
                    Sold Out
                  </span>
                ) : isLowStock ? (
                  <span className="px-3 py-1 rounded bg-amber-500 text-white font-mono text-[10px] uppercase tracking-widest">
                    Only {product.stock} Remaining
                  </span>
                ) : null}
              </div>
            </div>

            {/* Thumbnail switcher */}
            {product.hoverImage && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === product.image ? 'border-[#0B0B0C] dark:border-[#D4AF37]' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setActiveImage(product.hoverImage)}
                  className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === product.hoverImage ? 'border-[#0B0B0C] dark:border-[#D4AF37]' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={product.hoverImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
                </button>
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Category, SKU, and Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#D4AF37]">
                  {product.category} • {product.sku}
                </span>
                <div className="flex items-center gap-1 text-xs text-[#71717A] dark:text-[#A1A1AA]">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37] stroke-[#D4AF37]" />
                  <span>{product.rating}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="text-2xl font-editorial font-bold uppercase tracking-tight text-[#0B0B0C] dark:text-[#FAF9F6]">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-2xl font-bold text-[#0B0B0C] dark:text-[#FAF9F6]">
                    {formatPrice(product.price)}
                  </span>
                  {hasSale && (
                    <span className="text-base text-[#71717A] dark:text-[#A1A1AA] line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                  {hasSale && (
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      SAVE {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                {product.description}
              </p>

              {/* Color Swatch Picker */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
                      Color: <strong className="text-[#0B0B0C] dark:text-[#FAF9F6]">{selectedColor}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`group relative p-0.5 rounded-full border-2 transition-all ${
                          selectedColor === c.name
                            ? 'border-[#0B0B0C] dark:border-[#D4AF37] scale-110'
                            : 'border-transparent hover:border-black/30 dark:hover:border-white/30'
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

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
                      Select Size: <strong className="text-[#0B0B0C] dark:text-[#FAF9F6]">{selectedSize}</strong>
                    </span>
                    <button className="text-[11px] underline text-[#71717A] hover:text-[#0B0B0C] dark:hover:text-white">
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                            isSelected
                              ? 'bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] font-bold shadow-md'
                              : 'border border-[#E4E4E0] dark:border-[#27272A] hover:border-[#0B0B0C] dark:hover:border-white'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              {!isSoldOut && (
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#E4E4E0] dark:border-[#27272A] rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-mono font-bold min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1.5 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Fabric & Care */}
              {product.fabricCare && (
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl text-xs space-y-1">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-[#71717A] dark:text-[#A1A1AA] block">
                    Material & Provenance:
                  </span>
                  <p className="text-[#52525B] dark:text-[#D4D4D8] text-[11px] leading-relaxed">
                    {product.fabricCare}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#E4E4E0] dark:border-[#27272A]">
              <div className="flex items-center gap-3">
                <button
                  disabled={isSoldOut}
                  onClick={handleAddToBag}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-xs uppercase tracking-[0.2em] shadow-lg transition-all duration-300 ${
                    isSoldOut
                      ? 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-[#0B0B0C] active:scale-95'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isSoldOut ? 'Sold Out' : `Add To Bag • ${formatPrice(product.price * quantity)}`}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border border-[#E4E4E0] dark:border-[#27272A] hover:border-[#0B0B0C] dark:hover:border-white transition-all ${
                    isSaved ? 'text-[#D4AF37] border-[#D4AF37]' : 'text-[#71717A]'
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#D4AF37]' : ''}`} />
                </button>
              </div>

              {/* Luxury Guarantees */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-[#71717A] dark:text-[#A1A1AA] pt-1">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Complimentary Shipping $250+</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Certified Florentine Tailoring</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
