import React from 'react';
import ProductCard from './ProductCard';
import { Sparkles, RefreshCcw } from 'lucide-react';

export default function ProductGrid({ products, onResetFilters }) {
  if (products.length === 0) {
    return (
      <div className="py-24 px-4 text-center max-w-md mx-auto flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#FAF9F6] dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] flex items-center justify-center mb-4 text-[#D4AF37]">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-editorial font-bold uppercase tracking-wider text-[#0B0B0C] dark:text-[#FAF9F6] mb-2">
          No Architectural Pieces Found
        </h3>
        <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed mb-6">
          We couldn’t find any garments matching your exact combination of category, size, and price filters.
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs font-semibold uppercase tracking-widest hover:bg-[#D4AF37] transition-all"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>Clear All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
