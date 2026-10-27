import React from 'react';

export default function Logo({
  size = 'md',
  showWordmark = true,
  showSubtext = true,
  className = '',
  onClick
}) {
  const sizeMap = {
    sm: { svg: 28, text: 'text-base', subText: 'text-[9px]' },
    md: { svg: 36, text: 'text-xl', subText: 'text-[10px]' },
    lg: { svg: 46, text: 'text-2xl', subText: 'text-[11px]' },
    xl: { svg: 60, text: 'text-3xl', subText: 'text-xs' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-2.5 select-none transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Bespoke Geometric Fabric & Thread "F" Motif */}
      <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <svg
          width={currentSize.svg}
          height={currentSize.svg}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Rounded Architectural Frame with subtle border */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="24"
            className="fill-[#0F766E]/10 stroke-[#0F766E] transition-colors duration-300 group-hover:fill-[#0F766E]/15"
            strokeWidth="3.5"
          />

          {/* Intertwining Woven "F" Structure */}
          {/* Main vertical upright column */}
          <line
            x1="32"
            y1="24"
            x2="32"
            y2="76"
            className="stroke-[#0F766E]"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Top horizontal beam with fabric fold point */}
          <line
            x1="32"
            y1="28"
            x2="72"
            y2="28"
            className="stroke-[#0F766E]"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Middle horizontal beam with terracotta accent stitch */}
          <line
            x1="32"
            y1="50"
            x2="62"
            y2="50"
            className="stroke-[#C87D55]"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Accent woven stitch node */}
          <circle cx="72" cy="28" r="4.5" className="fill-[#C87D55]" />
          <circle cx="62" cy="50" r="4.5" className="fill-[#0F766E]" />
          <circle cx="32" cy="76" r="4.5" className="fill-[#C87D55]" />
        </svg>
      </div>

      {/* Brand Wordmark & Location */}
      {showWordmark && (
        <div className="flex flex-col">
          <span className={`font-display font-extrabold tracking-[0.16em] text-[#1E2329] leading-tight transition-colors duration-300 group-hover:text-[#0F766E] ${currentSize.text}`}>
            FABRICAS
          </span>
          {showSubtext && (
            <span className={`font-sans font-medium tracking-[0.25em] uppercase text-[#64748B] -mt-0.5 ${currentSize.subText}`}>
              Karachi
            </span>
          )}
        </div>
      )}
    </div>
  );
}
