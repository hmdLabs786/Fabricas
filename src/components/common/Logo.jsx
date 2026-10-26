import React from 'react';

export default function Logo({
  size = 'md',
  showWordmark = true,
  showTagline = false,
  className = '',
  onClick
}) {
  // Size mapping for SVG emblem
  const sizeMap = {
    sm: { svg: 32, text: 'text-sm', subText: 'text-[9px]' },
    md: { svg: 42, text: 'text-base', subText: 'text-[10px]' },
    lg: { svg: 54, text: 'text-xl', subText: 'text-xs' },
    xl: { svg: 72, text: 'text-2xl', subText: 'text-sm' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-3 select-none transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Bespoke Scalable Architectural Diamond Emblem */}
      <div className="relative flex-shrink-0 transition-transform duration-500 ease-out group-hover:scale-105">
        <svg
          width={currentSize.svg}
          height={currentSize.svg}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Outer Diamond Frame with hover dash stroke animation */}
          <polygon
            points="50,5 95,50 50,95 5,50"
            className="stroke-[#0B0B0C] dark:stroke-[#FAF9F6] transition-all duration-500 group-hover:stroke-[#D4AF37] dark:group-hover:stroke-[#E5C378]"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Inner Architectural Diamond Halo */}
          <polygon
            points="50,13 87,50 50,87 13,50"
            className="stroke-[#0B0B0C]/20 dark:stroke-[#FAF9F6]/20 transition-all duration-500 group-hover:stroke-[#D4AF37]/50"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />

          {/* Interlocking Monogram: 'N' Monogram */}
          {/* Left upright of N */}
          <line
            x1="32"
            y1="68"
            x2="32"
            y2="32"
            className="stroke-[#0B0B0C] dark:stroke-[#FAF9F6] transition-all duration-500 group-hover:stroke-[#D4AF37]"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Diagonal stroke of N */}
          <line
            x1="32"
            y1="32"
            x2="56"
            y2="68"
            className="stroke-[#0B0B0C] dark:stroke-[#FAF9F6] transition-all duration-500 group-hover:stroke-[#0B0B0C] dark:group-hover:stroke-[#FAF9F6]"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Right upright of N */}
          <line
            x1="56"
            y1="68"
            x2="56"
            y2="32"
            className="stroke-[#0B0B0C] dark:stroke-[#FAF9F6] transition-all duration-500 group-hover:stroke-[#D4AF37]"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Interlocking Monogram: 'A' Monogram (Sharp Gold Accent Geometry) */}
          {/* Left Leg of A */}
          <line
            x1="46"
            y1="68"
            x2="63"
            y2="28"
            className="stroke-[#D4AF37] dark:stroke-[#E5C378] transition-all duration-500 group-hover:stroke-[#0B0B0C] dark:group-hover:stroke-[#FAF9F6]"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Right Leg of A */}
          <line
            x1="63"
            y1="28"
            x2="78"
            y2="68"
            className="stroke-[#D4AF37] dark:stroke-[#E5C378] transition-all duration-500 group-hover:stroke-[#D4AF37]"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Crossbar of A passing through */}
          <line
            x1="51"
            y1="54"
            x2="73"
            y2="54"
            className="stroke-[#D4AF37] dark:stroke-[#E5C378] transition-all duration-500"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Cardinal Architectural Points */}
          <circle cx="50" cy="5" r="2" className="fill-[#D4AF37]" />
          <circle cx="95" cy="50" r="2" className="fill-[#D4AF37]" />
          <circle cx="50" cy="95" r="2" className="fill-[#D4AF37]" />
          <circle cx="5" cy="50" r="2" className="fill-[#D4AF37]" />
        </svg>
      </div>

      {/* Wordmark & Tagline */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className={`font-editorial font-bold tracking-[0.25em] text-[#0B0B0C] dark:text-[#FAF9F6] transition-colors duration-300 ${currentSize.text}`}>
              NOCTURNE
            </span>
            <span className={`font-sans font-light tracking-[0.35em] text-[#71717A] dark:text-[#A1A1AA] transition-colors duration-300 ${currentSize.subText}`}>
              ATELIER
            </span>
          </div>
          {showTagline && (
            <span className="text-[10px] tracking-[0.18em] uppercase text-[#8E8E93] dark:text-[#7A7A82] mt-1 italic font-sans font-medium">
              Architecture for the Modern Silhouette
            </span>
          )}
        </div>
      )}
    </div>
  );
}
