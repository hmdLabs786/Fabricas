import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Store,
  DollarSign,
  ShieldCheck,
  Download,
  Save,
  Trash2,
  Phone,
  Mail,
  RefreshCw
} from 'lucide-react';

export default function SettingsView() {
  const {
    settings,
    updateSettings,
    resetDemoData,
    exportDataJSON
  } = useStore();

  const [form, setForm] = useState({ ...settings });
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalVal = type === 'checkbox' ? checked : value;
    setForm((prev) => ({ ...prev, [name]: finalVal }));
    setHasChanges(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      ...form,
      shippingFee: Number(form.shippingFee || 0),
      freeShippingThreshold: Number(form.freeShippingThreshold || 0)
    });
    setHasChanges(false);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all catalog products, orders, and settings to a clean initial state?')) {
      resetDemoData();
      setForm({ ...settings });
      setHasChanges(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#0F766E]">
            Store Configuration
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1E2329] mt-0.5">
            Settings & Categories
          </h1>
        </div>

        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-2 shadow-sm ${
            hasChanges
              ? 'bg-[#0F766E] text-white hover:bg-[#0D5C58] active:scale-98'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Module 1: Brand & Contact Info */}
        <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E7E5E0] pb-4">
            <div className="p-2 rounded-xl bg-[#0F766E]/10 text-[#0F766E]">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-[#1E2329]">
                Brand & Official Contact
              </h3>
              <p className="text-xs text-[#64748B]">
                Displayed in the header, footer, contact page, and WhatsApp order messages.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={form.storeName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                Official Email (Contact Page & Receipts)
              </label>
              <input
                type="email"
                name="supportEmail"
                value={form.supportEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                WhatsApp Phone Number
              </label>
              <input
                type="text"
                name="whatsappNumber"
                value={form.whatsappNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          {/* Top Promo Announcement Banner */}
          <div className="pt-4 border-t border-[#E7E5E0] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#1E2329] block">
                  Top Announcement Promo Banner
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Displays at the very top of the storefront.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="promoBannerEnabled"
                  checked={form.promoBannerEnabled}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F766E]" />
              </label>
            </div>

            <input
              type="text"
              name="promoBannerText"
              value={form.promoBannerText}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E7E5E0] focus:outline-none focus:border-[#0F766E]"
            />
          </div>
        </div>

        {/* Module 2: Delivery Rules & Currency */}
        <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E7E5E0] pb-4">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-[#1E2329]">
                Currency & Delivery Rates
              </h3>
              <p className="text-xs text-[#64748B]">
                Configured in Pakistani Rupees (PKR).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                Currency Symbol
              </label>
              <input
                type="text"
                name="currencySymbol"
                value={form.currencySymbol}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl bg-white border border-[#E7E5E0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                Delivery Fee (Rs. PKR)
              </label>
              <input
                type="number"
                name="shippingFee"
                value={form.shippingFee}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-white border border-[#E7E5E0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E2329] mb-1">
                Free Delivery Threshold (Rs. PKR)
              </label>
              <input
                type="number"
                name="freeShippingThreshold"
                value={form.freeShippingThreshold}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-white border border-[#E7E5E0]"
              />
            </div>
          </div>
        </div>

        {/* Module 4: Data Utilities */}
        <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-[#1E2329] uppercase tracking-wider">
                Store Data Backup
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                Download a clean JSON backup of all products, categories, and WhatsApp orders.
              </p>
            </div>
            <button
              type="button"
              onClick={exportDataJSON}
              className="px-4 py-2 rounded-xl border border-[#E7E5E0] hover:border-[#0F766E] text-xs font-semibold text-[#1E2329] flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>Export JSON</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#E7E5E0] flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                Reset Store Data
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                Clears all custom products, orders, and restores clean defaults.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetData}
              className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Catalog</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
