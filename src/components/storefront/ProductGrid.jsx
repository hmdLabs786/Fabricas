import React from 'react';
import ProductCard from './ProductCard';
import { ShoppingBag, Plus, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function ProductGrid({ products }) {
  const { setCurrentView, setAdminSection, isAdminLoggedIn, setIsAdminLoginOpen } = useStore();

  if (!products || products.length === 0) {
    return (
      <div className="py-24 px-4 text-center max-w-lg mx-auto animate-fade-in-up">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E7E5E0] shadow-sm space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center mx-auto border border-[#0F766E]/20">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E7E5E0] text-[10px] uppercase font-mono tracking-widest text-[#0F766E] mb-2 font-semibold">
              <Sparkles className="w-3 h-3 text-[#C87D55]" />
              <span>Curated Atelier</span>
            </div>
            <h3 className="text-xl font-display font-bold text-[#1E2329]">
              Store Catalog Ready
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed mt-2 max-w-sm mx-auto">
              Your store is initialized with a clean catalog. Log into the secret admin panel (click the footer logo) or use the button below to add your first handcrafted garments.
            </p>
          </div>
          <button
            onClick={() => {
              if (isAdminLoggedIn) {
                setCurrentView('admin');
                setAdminSection('inventory');
              } else {
                setIsAdminLoginOpen(true);
              }
            }}
            className="shimmer-hover inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#0D5C58] transition-all shadow-md shadow-[#0F766E]/20 hover:scale-103 active:scale-97"
          >
            <Plus className="w-4 h-4" />
            <span>Add Products via Admin</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
