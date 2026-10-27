import React from 'react';
import { useStore } from '../../context/StoreContext';
import Logo from '../common/Logo';
import { Mail, Phone, MapPin, Truck, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const {
    settings,
    setCurrentView,
    setIsTrackOrderOpen,
    setIsAdminLoginOpen,
    isAdminLoggedIn
  } = useStore();

  const email = settings.supportEmail || 'fabricas@gmail.com';
  const phone = settings.whatsappNumber || '+92 3222567147';
  const rawPhone = settings.whatsappRaw || '923222567147';

  const handleFooterLogoClick = () => {
    // Admin login triggers when footer logo is clicked
    if (isAdminLoggedIn) {
      setCurrentView('admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E7E5E0] text-[#1E2329] pt-14 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#E7E5E0]">
          
          {/* Brand Info & Clickable Admin Gateway via Logo (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div title="Click logo for Atelier Admin Access">
              <Logo
                size="lg"
                showWordmark={true}
                showSubtext={true}
                onClick={handleFooterLogoClick}
                className="cursor-pointer"
              />
            </div>
            <p className="text-xs text-[#64748B] max-w-sm leading-relaxed">
              Fabricas is a modern Karachi-based online clothing store dedicated to elegant silhouettes, everyday luxury fabrics, and seamless WhatsApp shopping.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <MapPin className="w-4 h-4 text-[#0F766E]" />
              <span>Karachi, Sindh, Pakistan</span>
            </div>
          </div>

          {/* Quick Navigation (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2329]">
              Store Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#64748B]">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#0F766E] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#0F766E] transition-colors"
                >
                  Shop Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#0F766E] transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsTrackOrderOpen(true)}
                  className="hover:text-[#0F766E] transition-colors"
                >
                  Track Your Order
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2329]">
              Concierge Contact
            </h4>
            <div className="space-y-2 text-xs text-[#64748B]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#25D366]" />
                <a
                  href={`https://wa.me/${rawPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[#1E2329] hover:text-[#25D366] transition-colors font-semibold"
                >
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0F766E]" />
                <a
                  href={`mailto:${email}`}
                  className="text-[#1E2329] hover:text-[#0F766E] transition-colors"
                >
                  {email}
                </a>
              </div>
              <p className="text-[11px] text-[#94A3B8] pt-1">
                Mon – Sat: 10:00 AM – 8:00 PM PKT
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <p>© {new Date().getFullYear()} FABRICAS. Karachi, Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Online Orders • Fast Courier • Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
