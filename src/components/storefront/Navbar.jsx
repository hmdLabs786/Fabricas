import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import {
  Search,
  ShoppingBag,
  Heart,
  Lock,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAdminLoginOpen,
    setCurrentView,
    isAdminLoggedIn
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  const categories = ['All', 'Outerwear', 'Knitwear', 'Tailoring', 'Streetwear', 'Accessories'];

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setIsMobileMenuOpen(false);
    // Smooth scroll down to catalog if on hero
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setCurrentView('admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full glass-header border-b border-[#E4E4E0]/80 dark:border-[#202025] transition-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Left: Mobile Menu Trigger + Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#0B0B0C] dark:text-[#FAF9F6] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Logo
              size="md"
              showWordmark={true}
              showTagline={false}
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Center: Desktop Editorial Category Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`relative py-2 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-[#0B0B0C] dark:text-[#FAF9F6] font-semibold'
                      : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#0B0B0C] dark:hover:text-[#FAF9F6]'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0B0B0C] dark:bg-[#D4AF37] transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Wishlist, Bag, Theme, Admin Portal) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Interactive Expanding Search */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center bg-white dark:bg-[#18181B] border border-[#0B0B0C] dark:border-[#D4AF37] rounded-full px-3 py-1.5 shadow-md transition-all duration-300 w-48 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-[#71717A] dark:text-[#A1A1AA] flex-shrink-0 mr-2" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search garments, fabrics..."
                    className="w-full bg-transparent text-xs text-[#0B0B0C] dark:text-[#FAF9F6] placeholder-[#A1A1AA] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-[#71717A] hover:text-[#0B0B0C] dark:hover:text-white p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-1 text-[11px] text-[#8E8E93] hover:text-[#0B0B0C] dark:hover:text-white"
                  >
                    Esc
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 rounded-full text-[#0B0B0C] dark:text-[#FAF9F6] hover:bg-black/5 dark:hover:bg-white/5 transition-all hover:scale-105"
                  aria-label="Open search bar"
                  title="Search catalog"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <ThemeToggle />

            {/* Wishlist Drawer Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full text-[#0B0B0C] dark:text-[#FAF9F6] hover:bg-black/5 dark:hover:bg-white/5 transition-all hover:scale-105"
              aria-label="Wishlist"
              title="Saved Pieces"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger with Live Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-[#0B0B0C] dark:text-[#FAF9F6] hover:bg-black/5 dark:hover:bg-white/5 transition-all hover:scale-105"
              aria-label="Shopping Bag"
              title="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#0B0B0C] dark:bg-[#FAF9F6] text-[#FAF9F6] dark:text-[#0B0B0C] text-[9px] font-bold flex items-center justify-center shadow-sm animate-subtle-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Admin Portal Button with Lock */}
            <button
              onClick={handleAdminClick}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 ${
                isAdminLoggedIn
                  ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/25'
                  : 'border border-[#E4E4E0] dark:border-[#27272A] bg-white/70 dark:bg-[#18181B]/70 text-[#0B0B0C] dark:text-[#FAF9F6] hover:border-[#0B0B0C] dark:hover:border-white shadow-sm'
              }`}
              title={isAdminLoggedIn ? 'Enter Admin Dashboard' : 'Open Admin Login'}
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">
                {isAdminLoggedIn ? 'Admin CMS' : 'Admin Portal'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E4E4E0] dark:border-[#202025] bg-[#FAF9F6] dark:bg-[#0B0B0C] px-6 py-6 transition-all duration-300">
          <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8E8E93] dark:text-[#71717A] mb-3">
            Collections & Categories
          </div>
          <div className="flex flex-col gap-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`flex items-center justify-between text-left py-2 text-sm uppercase tracking-[0.15em] transition-colors ${
                    isActive
                      ? 'text-[#0B0B0C] dark:text-[#D4AF37] font-bold'
                      : 'text-[#71717A] dark:text-[#A1A1AA]'
                  }`}
                >
                  <span>{cat}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              );
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-[#E4E4E0] dark:border-[#202025] flex justify-between items-center">
            <span className="text-xs text-[#71717A] dark:text-[#A1A1AA]">Admin Workspace</span>
            <button
              onClick={handleAdminClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[#D4AF37] text-[#D4AF37]"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminLoggedIn ? 'Enter Dashboard' : 'Login'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
