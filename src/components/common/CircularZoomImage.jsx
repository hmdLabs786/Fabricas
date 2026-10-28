import React, { useState, useRef, useCallback } from 'react';
import { ZoomIn } from 'lucide-react';

/**
 * CircularZoomImage
 * Modern luxury e-commerce circular magnifying lens zoom on hover.
 * Displays a sleek circular magnifying lens that follows the cursor and shows
 * high-resolution fabric, stitching, and embellishment details at 2.5x zoom.
 */
export default function CircularZoomImage({
  src,
  alt = 'Product Image',
  zoomScale = 2.5,
  lensSize = 170,
  className = '',
  imgClassName = '',
  children
}) {
  const containerRef = useRef(null);
  const [isZooming, setIsZooming] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setCursorPos({ x, y });
    setBgPos({ x: xPercent, y: yPercent });
  }, []);

  const handleMouseEnter = () => setIsZooming(true);
  const handleMouseLeave = () => setIsZooming(false);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden cursor-crosshair select-none bg-[#F5F3EF] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-300 ${imgClassName}`}
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      {/* Floating Circular Magnifying Glass Lens */}
      {isZooming && (
        <div
          className="pointer-events-none absolute z-30 rounded-full border-2 border-white/90 shadow-2xl overflow-hidden ring-4 ring-black/15 transition-opacity duration-150"
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-50%, -50%)',
            backgroundImage: `url("${src}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
            backgroundSize: `${zoomScale * 100}%`
          }}
        >
          {/* Subtle reflection & crosshair indicator on the circular lens */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-black/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40 border border-black/20 pointer-events-none" />
        </div>
      )}

      {/* Hint badge: "Hover to Zoom" */}
      <div className={`absolute bottom-3 left-3 z-10 pointer-events-none transition-opacity duration-300 ${
        isZooming ? 'opacity-0' : 'opacity-80'
      }`}>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold bg-black/60 text-white backdrop-blur-md shadow-xs">
          <ZoomIn className="w-3 h-3 text-[#C87D55]" />
          <span>Hover to Zoom</span>
        </span>
      </div>

      {/* Embedded children (arrows, tags, sale badges, etc.) */}
      {children}
    </div>
  );
}
