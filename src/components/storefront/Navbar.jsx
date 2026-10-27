import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import Logo from '../common/Logo';
import {
  ShoppingBag,
  Heart,
  Truck,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const {
    currentView,
    setCurrentView,
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsTrackOrderOpen
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for sticky navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-30 w-full transition-all duration-400 ${
      isScrolled
        ? 'glass-header shadow-sm shadow-black/5 border-b border-[#E7E5E0]/90 py-0'
        : 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E5E0] py-1'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        } gap-4`}>
          
          {/* Left: Mobile Menu Trigger + Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#1E2329] hover:bg-black/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Logo
              size="md"
              showWordmark={true}
              showSubtext={true}
              onClick={() => handleNavClick('home')}
            />
          </div>

          {/* Center: Desktop Navigation (Home, Shop, Contact) */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`text-sm tracking-wide font-medium transition-colors py-2 relative ${
                currentView === 'home'
                  ? 'text-[#0F766E] font-semibold'
                  : 'text-[#475569] hover:text-[#0F766E]'
              }`}
            >
              Home
              {currentView === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0F766E] rounded-full animate-in fade-in" />
              )}
            </button>

            {/* Shop (Direct link, no categories) */}
            <button
              onClick={() => handleNavClick('shop')}
              className={`text-sm tracking-wide font-medium transition-colors py-2 relative ${
                currentView === 'shop'
                  ? 'text-[#0F766E] font-semibold'
                  : 'text-[#475569] hover:text-[#0F766E]'
              }`}
            >
              Shop
              {currentView === 'shop' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0F766E] rounded-full animate-in fade-in" />
              )}
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-sm tracking-wide font-medium transition-colors py-2 relative ${
                currentView === 'contact'
                  ? 'text-[#0F766E] font-semibold'
                  : 'text-[#475569] hover:text-[#0F766E]'
              }`}
            >
              Contact
              {currentView === 'contact' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0F766E] rounded-full animate-in fade-in" />
              )}
            </button>
          </nav>

          {/* Right: Icons (Track Order, Favorites/Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Track Order Icon Button */}
            <button
              onClick={() => setIsTrackOrderOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#E7E5E0] bg-white/80 hover:border-[#0F766E] hover:text-[#0F766E] text-[#1E2329] transition-all text-xs font-medium shadow-2xs hover:scale-102"
              title="Track Your Order"
              aria-label="Track Your Order"
            >
              <Truck className="w-4 h-4 text-[#0F766E]" />
              <span className="hidden sm:inline">Track Order</span>
            </button>

            {/* Favorites (Wishlist) Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full border border-[#E7E5E0] bg-white/80 hover:border-[#C87D55] text-[#1E2329] hover:text-[#C87D55] transition-all shadow-2xs hover:scale-105"
              aria-label="Favorites"
              title="Favorite Pieces"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C87D55] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#0F766E] text-white hover:bg-[#0D5C58] transition-all shadow-md hover:scale-105 active:scale-95 flex items-center justify-center"
              aria-label="Shopping Cart"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C87D55] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7E5E0] bg-[#FAF8F5] px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 text-sm font-semibold transition-colors ${
                currentView === 'home' ? 'text-[#0F766E]' : 'text-[#334155]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className={`text-left py-2 text-sm font-semibold transition-colors ${
                currentView === 'shop' ? 'text-[#0F766E]' : 'text-[#334155]'
              }`}
            >
              Shop Collection
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-2 text-sm font-semibold transition-colors ${
                currentView === 'contact' ? 'text-[#0F766E]' : 'text-[#334155]'
              }`}
            >
              Contact Concierge
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
