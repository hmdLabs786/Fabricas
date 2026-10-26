import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ArrowRight, Sparkles } from 'lucide-react';

export default function LookbookModal() {
  const {
    isLookbookOpen,
    setIsLookbookOpen,
    setSelectedCategory,
    products,
    openQuickView
  } = useStore();

  if (!isLookbookOpen) return null;

  const editorialLooks = [
    {
      lookNumber: 'LOOK 01',
      title: 'Monolithic Proportions',
      quote: '“Silhouette exists not to flatter convention, but to construct a dialogue between garment and space.”',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85',
      productId: 'prod-1',
      productName: 'Sartorial Cashmere Trench Coat',
      category: 'Outerwear'
    },
    {
      lookNumber: 'LOOK 02',
      title: 'The Razor Peak',
      quote: '“Sharp geometric shoulders engineered with horsehair canvas interfacing for a kinetic stance.”',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
      productId: 'prod-2',
      productName: 'Sculpted Structured Wool Blazer',
      category: 'Outerwear'
    },
    {
      lookNumber: 'LOOK 03',
      title: 'Draped Motion',
      quote: '“Twin deep reverse pleats that billow in wind, grounding tailoring with fluid elegance.”',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
      productId: 'prod-7',
      productName: 'Pleated Wide-Leg Drape Trousers',
      category: 'Tailoring'
    }
  ];

  const handleShopLook = (look) => {
    setIsLookbookOpen(false);
    const targetProduct = products.find((p) => p.id === look.productId);
    if (targetProduct) {
      openQuickView(targetProduct);
    } else {
      setSelectedCategory(look.category);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl bg-[#FAF9F6] dark:bg-[#121214] text-[#0B0B0C] dark:text-[#FAF9F6] rounded-2xl shadow-2xl border border-[#E4E4E0] dark:border-[#27272A] overflow-hidden my-8 p-6 sm:p-10">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E4E4E0] dark:border-[#27272A]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editorial Lookbook • Autumn / Winter Archive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight mt-1">
              Architecture & Form
            </h2>
          </div>
          <button
            onClick={() => setIsLookbookOpen(false)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Close lookbook"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Looks Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {editorialLooks.map((look, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl overflow-hidden bg-white/60 dark:bg-[#18181B]/60 border border-[#E4E4E0] dark:border-[#27272A] group transition-all hover:shadow-xl"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#ECECE8]">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-[#0B0B0C]/80 backdrop-blur-md text-[#FAF9F6] px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider">
                  {look.lookNumber}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-editorial font-bold uppercase tracking-wide">
                    {look.title}
                  </h3>
                  <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] italic font-serif-luxury mt-1.5 leading-relaxed">
                    {look.quote}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E4E4E0] dark:border-[#27272A] flex items-center justify-between">
                  <span className="text-[11px] font-medium truncate max-w-[150px]">
                    {look.productName}
                  </span>
                  <button
                    onClick={() => handleShopLook(look)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:underline"
                  >
                    <span>Shop Look</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
