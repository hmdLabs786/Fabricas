import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles, MapPin, ShieldCheck, Truck, Clock } from 'lucide-react';
import WhatsAppIcon from '../common/WhatsAppIcon';

export default function Hero() {
  const { setCurrentView, setSelectedCategory, settings } = useStore();

  const handleExplore = () => {
    setCurrentView('shop');
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const rawPhone = settings.whatsappRaw || '923222567147';
  const heroWhatsAppUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent('Assalam o Alaikum Fabricas Team! I would like to inquire about your latest clothing collection.')}`;

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] border-b border-[#E7E5E0] pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24">
      
      {/* Luxurious Ambient Background Glowing Orbs */}
      <div className="absolute -top-24 left-1/4 w-[500px] h-[400px] bg-gradient-to-tr from-[#0F766E]/12 via-[#C87D55]/8 to-transparent blur-[90px] rounded-full pointer-events-none animate-ambient-1" />
      <div className="absolute -bottom-24 right-1/4 w-[550px] h-[420px] bg-gradient-to-bl from-[#C5A059]/10 via-[#0F766E]/10 to-transparent blur-[100px] rounded-full pointer-events-none animate-ambient-2" />

      {/* Architectural Geometric Hairline Details */}
      <div className="absolute top-10 left-10 hidden lg:block pointer-events-none opacity-40">
        <div className="w-16 h-[1px] bg-[#C87D55]" />
        <div className="w-[1px] h-16 bg-[#C87D55]" />
        <span className="text-[10px] tracking-widest text-[#0F766E] uppercase font-mono block mt-2 ml-1">KHI • 24.8607° N</span>
      </div>
      <div className="absolute top-10 right-10 hidden lg:block pointer-events-none opacity-40 text-right">
        <div className="w-16 h-[1px] bg-[#0F766E] ml-auto" />
        <div className="w-[1px] h-16 bg-[#0F766E] ml-auto" />
        <span className="text-[10px] tracking-widest text-[#C87D55] uppercase font-mono block mt-2 mr-1">EST. ATELIER</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Karachi Luxury Heritage Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E7E5E0] shadow-sm animate-fade-in-up hover:border-[#0F766E]/40 transition-all duration-300">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F766E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F766E]"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#1E2329] uppercase font-sans">
            Karachi Atelier • Handcrafted Clothing
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#C87D55]" />
        </div>

        {/* Center Headline with Kinetic Elegance */}
        <div className="mt-8 space-y-4 animate-fade-in-up [animation-delay:150ms]">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-[#1E2329] leading-[1.1]">
            Explore <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-[#115E59] to-[#C87D55]">
              Clothing
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#C87D55]/30 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 15 Q 50 0 100 15" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#576375] max-w-2xl mx-auto font-normal leading-relaxed pt-2">
            Architecture for modern everyday silhouettes. Discover unstitched fabrics, ready-to-wear kurtas, and timeless everyday essentials tailored for the modern Pakistani aesthetic.
          </p>
        </div>

        {/* Dual Luxury Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:300ms]">
          {/* Primary Shop Button */}
          <button
            onClick={handleExplore}
            className="w-full sm:w-auto shimmer-hover inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0F766E] text-white hover:bg-[#0D5C58] font-semibold text-sm tracking-wider shadow-lg shadow-[#0F766E]/20 transition-all duration-300 hover:scale-103 active:scale-97 group"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Secondary Direct WhatsApp Order Button */}
          <a
            href={heroWhatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-white text-[#1E2329] border border-[#E7E5E0] hover:border-[#25D366] hover:text-[#0F766E] shadow-sm hover:shadow-md font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-103 active:scale-97 group"
          >
            <WhatsAppIcon className="w-5 h-5 text-[#25D366] transition-transform duration-300 group-hover:scale-115" />
            <span>Chat & Order on WhatsApp</span>
          </a>
        </div>

        {/* Reassurance Guarantee Badges */}
        <div className="mt-12 pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#576375] font-medium border-t border-[#E7E5E0]/70 max-w-2xl mx-auto animate-fade-in-up [animation-delay:450ms]">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#0F766E]" />
            <span>Express Courier Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>Direct WhatsApp Booking</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C87D55]" />
            <span>Cash on Delivery across Pakistan</span>
          </div>
        </div>

      </div>

      {/* Infinite Smooth Luxury Marquee Ticker */}
      <div className="mt-16 sm:mt-20 border-y border-[#E7E5E0] bg-white/70 backdrop-blur-sm py-3.5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#475569]">
          <span className="flex items-center gap-3">
            <span className="text-[#C87D55]">✦</span> KARACHI ATELIER
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#0F766E]">✦</span> PURE HANDCRAFTED FABRICS
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#C87D55]">✦</span> CASH ON DELIVERY
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#0F766E]">✦</span> COMPLIMENTARY SHIPPING OVER RS. 3,500
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#25D366]">✦</span> WHATSAPP ORDERING: +92 3222567147
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#C87D55]">✦</span> BESPOKE CUTS & SILHOUETTES
          </span>
          {/* Duplicate set for seamless continuous marquee */}
          <span className="flex items-center gap-3">
            <span className="text-[#C87D55]">✦</span> KARACHI ATELIER
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#0F766E]">✦</span> PURE HANDCRAFTED FABRICS
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#C87D55]">✦</span> CASH ON DELIVERY
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#0F766E]">✦</span> COMPLIMENTARY SHIPPING OVER RS. 3,500
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#25D366]">✦</span> WHATSAPP ORDERING: +92 3222567147
          </span>
          <span className="flex items-center gap-3">
            <span className="text-[#C87D55]">✦</span> BESPOKE CUTS & SILHOUETTES
          </span>
        </div>
      </div>

    </section>
  );
}
