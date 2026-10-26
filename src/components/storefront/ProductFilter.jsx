import React from 'react';
import { useStore } from '../../context/StoreContext';
import { SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';

export default function ProductFilter({
  selectedCategory,
  onCategoryChange,
  selectedSize,
  onSizeChange,
  priceRange,
  onPriceRangeChange,
  maxPriceLimit = 1500,
  inStockOnly,
  onInStockChange,
  sortBy,
  onSortChange,
  totalResults = 0,
  onResetFilters
}) {
  const { formatPrice } = useStore();

  const categories = ['All', 'Outerwear', 'Knitwear', 'Tailoring', 'Streetwear', 'Accessories'];
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL'];

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedSize !== 'All' ||
    priceRange < maxPriceLimit ||
    inStockOnly;

  return (
    <div className="w-full bg-[#FAF9F6] dark:bg-[#0B0B0C] border-b border-[#E4E4E0] dark:border-[#202025] py-6 px-4 sm:px-6 lg:px-8 transition-smooth">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Top Row: Category Pills & Sort dropdown */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 flex-shrink-0 ${
                    isActive
                      ? 'bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] shadow-sm font-semibold'
                      : 'border border-[#E4E4E0] dark:border-[#27272A] text-[#71717A] dark:text-[#A1A1AA] hover:border-[#0B0B0C] dark:hover:border-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right: Results Count & Sort Dropdown */}
          <div className="flex items-center justify-between lg:justify-end gap-4">
            <span className="text-xs tracking-wider text-[#71717A] dark:text-[#A1A1AA] font-mono">
              SHOWING <strong className="text-[#0B0B0C] dark:text-[#FAF9F6]">{totalResults}</strong> PIECES
            </span>

            {/* Sort Control */}
            <div className="flex items-center gap-2 border border-[#E4E4E0] dark:border-[#27272A] rounded-full px-3 py-1.5 bg-white/70 dark:bg-[#18181B]/70">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#71717A] dark:text-[#A1A1AA]" />
              <label htmlFor="catalog-sort" className="sr-only">Sort products</label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-transparent text-xs tracking-wider text-[#0B0B0C] dark:text-[#FAF9F6] focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#FAF9F6] dark:bg-[#141416]">Sort: Featured Archive</option>
                <option value="newest" className="bg-[#FAF9F6] dark:bg-[#141416]">Sort: Newest First</option>
                <option value="price-asc" className="bg-[#FAF9F6] dark:bg-[#141416]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#FAF9F6] dark:bg-[#141416]">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Second Row: Detailed Filters Bar (Size, Max Price, In Stock Only, Reset) */}
        <div className="pt-4 border-t border-[#E4E4E0]/60 dark:border-[#202025]/60 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-6">
            {/* Size Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#71717A] dark:text-[#A1A1AA]">
                Size:
              </span>
              <div className="flex items-center gap-1">
                {sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => onSizeChange(sz)}
                      className={`w-7 h-7 rounded-md text-[11px] font-mono font-medium transition-all ${
                        isSelected
                          ? 'bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#D4AF37] dark:text-[#0B0B0C] font-bold'
                          : 'border border-[#E4E4E0] dark:border-[#27272A] text-[#71717A] dark:text-[#A1A1AA] hover:border-[#0B0B0C]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#71717A] dark:text-[#A1A1AA]">
                Max Price:
              </span>
              <input
                type="range"
                min="200"
                max={maxPriceLimit}
                step="50"
                value={priceRange}
                onChange={(e) => onPriceRangeChange(Number(e.target.value))}
                className="w-24 sm:w-32 accent-[#0B0B0C] dark:accent-[#D4AF37] cursor-pointer"
              />
              <span className="text-xs font-mono font-semibold text-[#0B0B0C] dark:text-[#FAF9F6]">
                {formatPrice(priceRange)}
              </span>
            </div>

            {/* In Stock Only Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => onInStockChange(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#0B0B0C] focus:ring-0 accent-[#0B0B0C] dark:accent-[#D4AF37]"
              />
              <span className="text-xs text-[#52525B] dark:text-[#A1A1AA] tracking-wider uppercase">
                In Stock Only
              </span>
            </label>
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
