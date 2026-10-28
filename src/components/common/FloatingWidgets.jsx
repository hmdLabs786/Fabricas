import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import WhatsAppIcon from './WhatsAppIcon';
import { ArrowUp } from 'lucide-react';

export default function FloatingWidgets() {
  const { settings } = useStore();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const nextShow = scrollY > 300;
          setShowScrollTop(prev => (prev !== nextShow ? nextShow : prev));
          const nextHasScrolled = scrollY > 50;
          setHasScrolled(prev => (prev !== nextHasScrolled ? nextHasScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const rawPhone = settings.whatsappRaw || '923222567147';
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent('Assalam o Alaikum Fabricas Team! I am browsing your online store and would like some assistance.')}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3.5 pointer-events-none">
      
      {/* Scroll To Top Button with Luxury Hover */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3.5 rounded-full bg-white/95 backdrop-blur-md text-[#1E2329] border border-[#E7E5E0] shadow-lg shadow-black/5 hover:border-[#0F766E] hover:text-[#0F766E] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
          title="Scroll to Top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      )}

      {/* Floating Official WhatsApp Button with Radar Pulse */}
      <div className="relative pointer-events-auto group">
        
        {/* Radar ripple rings */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-radar pointer-events-none opacity-60" />
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-radar [animation-delay:1.2s] pointer-events-none opacity-40" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/35 hover:bg-[#20BA5C] transition-all duration-300 hover:scale-108 active:scale-95"
          title="Chat with Fabricas on WhatsApp (+92 3222567147)"
          aria-label="Chat on WhatsApp"
        >
          {/* Authentic WhatsApp Vector Icon */}
          <WhatsAppIcon className="w-7 h-7 text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />

          {/* Active online indicator dot */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
          </span>
        </a>

        {/* Luxury Tooltip with Details */}
        <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
          <div className="bg-[#1E2329]/95 backdrop-blur-md text-white text-xs px-3.5 py-2 rounded-xl shadow-2xl border border-white/10 whitespace-nowrap flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 font-semibold text-[#25D366]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
              WhatsApp Inquiries
            </div>
            <div className="text-[11px] text-[#A8A29E]">
              Assistance & Instant Order Confirmation
            </div>
          </div>
          {/* Tooltip triangle */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-[#1E2329]/95" />
        </div>

      </div>

    </div>
  );
}
