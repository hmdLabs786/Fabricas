import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles } from 'lucide-react';
import WhatsAppIcon from '../common/WhatsAppIcon';

export default function PromoBanner() {
  const { settings } = useStore();

  if (!settings.promoBannerEnabled || !settings.promoBannerText) {
    return null;
  }

  const rawPhone = settings.whatsappRaw || '923222567147';

  return (
    <aside
      aria-label="Announcement"
      className="relative z-40 bg-gradient-to-r from-[#0D5C58] via-[#0F766E] to-[#0D5C58] text-white py-2 px-4 text-xs font-medium tracking-wide border-b border-emerald-900/20 shadow-xs"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left tag */}
        <div className="hidden md:flex items-center gap-2 text-xs text-[#E6F0EE]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C87D55] animate-pulse" />
          <span className="font-semibold tracking-wider uppercase text-[11px]">Karachi Atelier</span>
        </div>

        {/* Center message */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-[11px] sm:text-xs tracking-wide">
          <Sparkles className="w-3 h-3 text-[#C87D55] hidden sm:inline" />
          <span>{settings.promoBannerText}</span>
          <Sparkles className="w-3 h-3 text-[#C87D55] hidden sm:inline" />
        </div>

        {/* Right WhatsApp quick link */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-white">
          <a
            href={`https://wa.me/${rawPhone}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 transition-all font-mono text-[11px]"
            title="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
            <span>{settings.whatsappNumber || '+92 3222567147'}</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
