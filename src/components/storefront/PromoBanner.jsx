import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function PromoBanner() {
  const { settings, applyPromoCode, showToast } = useStore();
  const [copied, setCopied] = React.useState(false);

  if (!settings.promoBannerEnabled || !settings.promoBannerText) {
    return null;
  }

  const handleCopyCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText('NOCTURNE15');
    setCopied(true);
    applyPromoCode('NOCTURNE15');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <aside
      aria-label="Announcement"
      className="relative z-40 bg-[#0B0B0C] text-[#FAF9F6] border-b border-[#202025] py-2 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs tracking-wider font-light">
        {/* Left decoration */}
        <div className="hidden md:flex items-center gap-1.5 text-[#D4AF37] font-medium text-[11px] tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier Archive</span>
        </div>

        {/* Center message */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-[11px] md:text-xs">
          <span>{settings.promoBannerText}</span>
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1 px-2 py-0.5 ml-1.5 rounded bg-[#FAF9F6]/10 hover:bg-[#FAF9F6]/20 text-[#FAF9F6] border border-[#FAF9F6]/20 transition-colors text-[10px] font-mono uppercase tracking-wider"
            title="Click to apply discount code"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Applied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-[#D4AF37]" />
                <span>Apply Code</span>
              </>
            )}
          </button>
        </div>

        {/* Right tag */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-[#A1A1AA]">
          <span>Worldwide Express</span>
        </div>
      </div>
    </aside>
  );
}
