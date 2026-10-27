import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import WhatsAppIcon from '../common/WhatsAppIcon';

export default function ContactView() {
  const { settings } = useStore();

  const email = settings.supportEmail || 'fabricas@gmail.com';
  const phone = settings.whatsappNumber || '+92 3222567147';
  const rawPhone = settings.whatsappRaw || '923222567147';

  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E5E0] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C87D55]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-[#0F766E]">
            Karachi Atelier Concierge
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#1E2329]">
          Contact Fabricas
        </h1>
        <p className="text-sm text-[#64748B] leading-relaxed">
          For order inquiries, custom sizing questions, or courier tracking assistance, our Karachi-based concierge is available directly on WhatsApp and email.
        </p>
      </div>

      {/* Contact Cards Grid (Strictly Contact Information — No Form) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* WhatsApp Card */}
        <div className="p-8 rounded-3xl bg-white border border-[#E7E5E0] shadow-sm luxury-card-hover flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/25">
              <WhatsAppIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-display font-bold text-[#1E2329]">
                  WhatsApp Concierge
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Direct chat with our team for immediate order placement, fabric photos, and dispatch updates.
              </p>
            </div>
            <p className="font-mono text-base font-bold text-[#1E2329] pt-2">
              {phone}
            </p>
          </div>

          <a
            href={`https://wa.me/${rawPhone}?text=${encodeURIComponent('Assalam o Alaikum Fabricas Team! I have an inquiry regarding your clothing collections.')}`}
            target="_blank"
            rel="noreferrer"
            className="w-full shimmer-hover inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20BA5C] text-white text-xs font-semibold tracking-wider shadow-lg shadow-[#25D366]/25 transition-all hover:scale-102 active:scale-98 group"
          >
            <WhatsAppIcon className="w-5 h-5 text-white transition-transform group-hover:scale-115" />
            <span>Chat on WhatsApp</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Email Card */}
        <div className="p-8 rounded-3xl bg-white border border-[#E7E5E0] shadow-sm luxury-card-hover flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0F766E] text-white flex items-center justify-center shadow-lg shadow-[#0F766E]/25">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-[#1E2329]">
                Email Inquiries
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Official email correspondence for order receipts, bespoke inquiries, and general support.
              </p>
            </div>
            <p className="font-mono text-base font-bold text-[#1E2329] pt-2">
              {email}
            </p>
          </div>

          <a
            href={`mailto:${email}`}
            className="w-full shimmer-hover inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-[#0F766E] hover:bg-[#0D5C58] text-white text-xs font-semibold tracking-wider shadow-lg shadow-[#0F766E]/25 transition-all hover:scale-102 active:scale-98 group"
          >
            <Mail className="w-4 h-4 text-white" />
            <span>Send Email</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Location & Timings Card */}
        <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] luxury-card-hover flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#0F766E] border border-[#E7E5E0] flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2329]">
              Origin & Dispatch
            </h4>
            <p className="text-xs text-[#64748B] mt-0.5">
              Karachi, Sindh, Pakistan (Delivering nationwide)
            </p>
          </div>
        </div>

        {/* Support Timings */}
        <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] luxury-card-hover flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#C87D55] border border-[#E7E5E0] flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2329]">
              Operating Hours
            </h4>
            <p className="text-xs text-[#64748B] mt-0.5">
              Monday – Saturday: 10:00 AM – 8:00 PM PKT
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
