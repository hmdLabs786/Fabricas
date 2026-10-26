import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowDownRight, Sparkles, BookOpen, ChevronRight } from 'lucide-react';

export default function Hero() {
  const { setIsLookbookOpen, setSelectedCategory } = useStore();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-[#E4E4E0] dark:border-[#202025] bg-[#FAF9F6] dark:bg-[#0B0B0C] transition-smooth">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-4 md:grid-cols-6 border-x border-[#E4E4E0] dark:border-[#202025]">
          <div className="border-r border-[#E4E4E0] dark:border-[#202025] hidden md:block" />
          <div className="border-r border-[#E4E4E0] dark:border-[#202025]" />
          <div className="border-r border-[#E4E4E0] dark:border-[#202025]" />
          <div className="border-r border-[#E4E4E0] dark:border-[#202025] hidden md:block" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Kinetic Editorial Typography & CTAs (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8">
            {/* Seasonal Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#0B0B0C] dark:text-[#FAF9F6] font-semibold">
                AUTUMN / WINTER ARCHIVE • VOL. 04
              </span>
            </div>

            {/* Kinetic Luxury Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-extrabold tracking-tight text-[#0B0B0C] dark:text-[#FAF9F6] leading-[0.95] uppercase">
                Architecture <br />
                <span className="font-serif-luxury italic font-normal lowercase tracking-normal text-[#D4AF37] dark:text-[#E5C378]">
                  for the
                </span>{' '}
                Modern <br />
                Silhouette.
              </h1>
            </div>

            {/* Editorial Statement */}
            <p className="text-base sm:text-lg text-[#52525B] dark:text-[#A1A1AA] max-w-xl font-light leading-relaxed">
              Precision-tailored proportions engineered from pure Mongolian cashmere, virgin wool gabardine, and structured raw silk. Monolithic minimalism designed for kinetic form.
            </p>

            {/* Dual CTAs & Micro Information */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToCatalog}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-none bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] font-semibold text-xs uppercase tracking-[0.25em] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-[#0B0B0C] transition-all duration-300 shadow-lg active:scale-95"
              >
                <span>Explore Collection</span>
                <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={() => setIsLookbookOpen(true)}
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-none border border-[#0B0B0C] dark:border-[#FAF9F6] text-[#0B0B0C] dark:text-[#FAF9F6] font-medium text-xs uppercase tracking-[0.25em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 active:scale-95 bg-transparent"
              >
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>View Lookbook</span>
              </button>
            </div>

            {/* Architectural Details Ticker */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E4E4E0] dark:border-[#202025]">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0B0B0C] dark:text-[#FAF9F6]">
                  Florence
                </p>
                <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
                  Bespoke Atelier Craft
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0B0B0C] dark:text-[#FAF9F6]">
                  100% Virgin
                </p>
                <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
                  Mongolian Raw Cashmere
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#0B0B0C] dark:text-[#FAF9F6]">
                  Complimentary
                </p>
                <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
                  Global Express $250+
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Hero Imagery (5 Cols) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary High-Fashion Card */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#E4E4E0] dark:bg-[#1C1C1F] shadow-2xl border border-[#E4E4E0] dark:border-[#27272A] group">
                <img
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85"
                  alt="Nocturne Atelier Autumn Winter Archive"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/80 via-transparent to-transparent opacity-60" />

                {/* Floating Architectural Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-card border border-white/20 dark:border-white/10 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                      Look 01 • Cashmere Trench
                    </span>
                    <h2 className="text-sm font-editorial font-bold tracking-wider text-white">
                      The Sartorial Overcoat
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory('Outerwear');
                      scrollToCatalog();
                    }}
                    className="p-2 rounded-full bg-white text-[#0B0B0C] hover:bg-[#D4AF37] transition-colors"
                    aria-label="Shop Outerwear Look"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Offset Secondary Float Card (Editorial Detail) */}
              <div className="absolute -bottom-8 -left-8 hidden sm:block w-48 aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border-2 border-white dark:border-[#18181B] z-20 group">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
                  alt="Pleated Wide Leg Drape Trousers detail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-2 left-2 bg-[#0B0B0C]/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-[#FAF9F6]">
                  NOC-TL-001
                </div>
              </div>

              {/* Monogram Seal Overlay */}
              <div className="absolute -top-6 -right-6 hidden sm:flex w-20 h-20 rounded-full border border-[#D4AF37]/60 bg-[#FAF9F6]/90 dark:bg-[#0B0B0C]/90 backdrop-blur-md items-center justify-center p-3 shadow-xl z-20 animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    fill="none"
                  />
                  <text className="text-[9px] font-mono uppercase tracking-[0.25em] fill-[#0B0B0C] dark:fill-[#FAF9F6]">
                    <textPath xlinkHref="#circlePath">
                      NOCTURNE ATELIER • MILAN • FLORENCE •
                    </textPath>
                  </text>
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
