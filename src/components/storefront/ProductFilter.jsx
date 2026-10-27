import React from 'react';
import { ArrowUpDown, Sparkles } from 'lucide-react';

export default function ProductFilter({
  sortBy,
  onSortChange,
  totalResults = 0
}) {
  return (
    <div className="w-full bg-[#FAF8F5] border-b border-[#E7E5E0] py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Results Count */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C87D55]" />
          <span className="text-xs font-medium text-[#64748B] tracking-wide">
            Showing <strong className="text-[#1E2329] font-bold">{totalResults}</strong> curated piece{totalResults !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Right side: Sort Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#64748B] hidden sm:inline">Sort:</span>
          <div className="flex items-center gap-2 border border-[#E7E5E0] bg-white rounded-full px-4 py-1.5 shadow-2xs hover:border-[#0F766E]/40 transition-colors">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#0F766E]" />
            <label htmlFor="shop-sort" className="sr-only">Sort products</label>
            <select
              id="shop-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[#1E2329] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Archive</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}
