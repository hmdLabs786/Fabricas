import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import Logo from '../common/Logo';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Mail } from 'lucide-react';

export default function Footer() {
  const {
    settings,
    setSelectedCategory,
    showToast,
    setIsAdminLoginOpen,
    isAdminLoggedIn,
    setCurrentView
  } = useStore();

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Subscribed to Nocturne Atelier Private Archive briefings', 'success');
    setNewsletterEmail('');
  };

  const handleCategoryNav = (cat) => {
    setSelectedCategory(cat);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-[#E4E4E0] dark:border-[#202025] bg-[#F4F3EE] dark:bg-[#080809] text-[#0B0B0C] dark:text-[#FAF9F6] transition-smooth">
      
      {/* Guarantees Bar */}
      <div className="border-b border-[#E4E4E0] dark:border-[#202025] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="p-3 rounded-xl bg-white dark:bg-[#141416] border border-[#E4E4E0] dark:border-[#27272A] text-[#D4AF37]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest font-bold">
                Complimentary Global Express
              </h4>
              <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] mt-0.5">
                On all archival orders over {settings.currencySymbol}{settings.freeShippingThreshold}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="p-3 rounded-xl bg-white dark:bg-[#141416] border border-[#E4E4E0] dark:border-[#27272A] text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest font-bold">
                Certified Provenance
              </h4>
              <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] mt-0.5">
                Handcrafted in Florence & Milan with traceable fibers
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="p-3 rounded-xl bg-white dark:bg-[#141416] border border-[#E4E4E0] dark:border-[#27272A] text-[#D4AF37]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest font-bold">
                Bespoke Atelier Exchanges
              </h4>
              <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] mt-0.5">
                14-day seamless door-to-door concierge returns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Story (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" showWordmark={true} showTagline={true} />
            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed max-w-sm pt-2">
              Nocturne Atelier is an architectural fashion laboratory investigating monolithic minimalism, kinetic drape, and structural tailoring for the modern silhouette.
            </p>
            <div className="pt-2 text-xs font-mono text-[#71717A]">
              <span>Inquiries: </span>
              <a href={`mailto:${settings.supportEmail}`} className="text-[#0B0B0C] dark:text-[#FAF9F6] underline hover:text-[#D4AF37]">
                {settings.supportEmail}
              </a>
            </div>
          </div>

          {/* Categories Navigation (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-[#0B0B0C] dark:text-[#FAF9F6]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#71717A] dark:text-[#A1A1AA]">
              {['Outerwear', 'Knitwear', 'Tailoring', 'Streetwear', 'Accessories'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryNav(cat)}
                    className="hover:text-[#0B0B0C] dark:hover:text-[#FAF9F6] transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Atelier & Client Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-[#0B0B0C] dark:text-[#FAF9F6]">
              Atelier Services
            </h4>
            <ul className="space-y-2 text-xs text-[#71717A] dark:text-[#A1A1AA]">
              <li><span className="hover:text-[#0B0B0C] dark:hover:text-white cursor-pointer">Bespoke Fitting Consultations</span></li>
              <li><span className="hover:text-[#0B0B0C] dark:hover:text-white cursor-pointer">Garment Care & Cashmere Preservation</span></li>
              <li><span className="hover:text-[#0B0B0C] dark:hover:text-white cursor-pointer">Archive Monogramming</span></li>
              <li><span className="hover:text-[#0B0B0C] dark:hover:text-white cursor-pointer">White Glove Delivery Protocols</span></li>
              <li>
                <button
                  onClick={() => {
                    if (isAdminLoggedIn) setCurrentView('admin');
                    else setIsAdminLoginOpen(true);
                  }}
                  className="text-[#D4AF37] hover:underline"
                >
                  Admin CMS Gateway
                </button>
              </li>
            </ul>
          </div>

          {/* Private Briefings Newsletter (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-[#0B0B0C] dark:text-[#FAF9F6]">
              Private Archive Briefings
            </h4>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
              Receive confidential lookbook invitations and preview limited seasonal drops 24 hours prior to public release.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none focus:border-[#0B0B0C] dark:focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 rounded-md bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] transition-colors flex items-center"
                  aria-label="Submit newsletter subscription"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="mt-12 pt-8 border-t border-[#E4E4E0] dark:border-[#202025] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E8E93] dark:text-[#71717A] gap-4">
          <p>© {new Date().getFullYear()} NOCTURNE ATELIER. All rights reserved. Architecture for the Modern Silhouette.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#0B0B0C] dark:hover:text-white cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-[#0B0B0C] dark:hover:text-white cursor-pointer">Terms of Allocation</span>
            <span className="hover:text-[#0B0B0C] dark:hover:text-white cursor-pointer">Florentine Guild License</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
