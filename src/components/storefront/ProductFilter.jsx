import React from 'react';
import { ArrowUpDown, Check } from 'lucide-react';

export default function ProductFilter({
  inStockOnly,
  onInStockChange,
  sortBy,
  onSortChange,
  totalResults = 0
}) {
  return (
    <div className="w-full bg-[#FAF8F5] border-b border-[#E7E5E0] py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Results Count */}
        <span className="text-xs font-medium text-[#64748B] tracking-wide">
          Showing <strong className="text-[#1E2329] font-bold">{totalResults}</strong> items
        </span>

        {/* Right side: Sort and In Stock Only (Strictly only these two controls) */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* In Stock Only Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockChange(e.target.checked)}
              className="w-4 h-4 rounded border-[#D1D5DB] text-[#0F766E] focus:ring-0 accent-[#0F766E] cursor-pointer"
            />
            <span className="text-xs font-medium text-[#475569]">
              In Stock Only
            </span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 border border-[#E7E5E0] bg-white rounded-full px-3.5 py-1.5 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#0F766E]" />
            <label htmlFor="shop-sort" className="sr-only">Sort products</label>
            <select
              id="shop-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-xs font-medium text-[#1E2329] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}
