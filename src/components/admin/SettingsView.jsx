import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Settings,
  Store,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  Download,
  Save,
  CheckCircle2,
  AlertTriangle,
  Sliders
} from 'lucide-react';

export default function SettingsView() {
  const {
    settings,
    updateSettings,
    resetDemoData,
    exportDataJSON,
    showToast
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
      taxRate: Number(form.taxRate),
      flatShippingFee: Number(form.flatShippingFee),
      freeShippingThreshold: Number(form.freeShippingThreshold)
    });
    setHasChanges(false);
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure you want to restore the default architectural catalog, demo orders, and settings? Any newly created products or placed orders will be cleared.'
      )
    ) {
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
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
            Configuration & Commerce Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-editorial font-bold uppercase tracking-tight text-[#0B0B0C] dark:text-[#FAF9F6] mt-1">
            Store Settings
          </h1>
        </div>

        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className={`px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md ${
            hasChanges
              ? 'bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-[#0B0B0C] active:scale-98'
              : 'bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
          }`}
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Module 1: Brand & Storefront Identity */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E4E4E0] dark:border-[#202025] pb-4">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-editorial font-bold uppercase tracking-wider">
                Brand & Storefront Identity
              </h3>
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
                Live brand representation across metadata, navigation, and footer.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                Storefront Name
              </label>
              <input
                type="text"
                name="storeName"
                value={form.storeName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF9F6] dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                Atelier Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF9F6] dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
              Concierge Support Email
            </label>
            <input
              type="email"
              name="supportEmail"
              value={form.supportEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF9F6] dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
            />
          </div>

          {/* Promo Announcement Banner */}
          <div className="pt-2 border-t border-[#E4E4E0]/60 dark:border-[#202025]/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold block">Top Announcement Promo Banner</span>
                <span className="text-[11px] text-[#71717A]">
                  Broadcast promotional discount codes or free delivery alerts.
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]" />
              </label>
            </div>

            <div>
              <input
                type="text"
                name="promoBannerText"
                value={form.promoBannerText}
                onChange={handleChange}
                placeholder="Announcement banner text..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF9F6] dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Module 2: Commerce, Tax & Shipping Rules */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E4E4E0] dark:border-[#202025] pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-editorial font-bold uppercase tracking-wider">
                Commerce, Tax & Shipping Rules
              </h3>
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
                Configures real-time calculations in customer shopping cart and checkout.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                Currency Symbol
              </label>
              <input
                type="text"
                name="currencySymbol"
                value={form.currencySymbol}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl bg-[#FAF9F6] dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                Tax Rate (%)
              </label>
              <input
                type="number"
                name="taxRate"
                step="0.1"
                min="0"
                value={form.taxRate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-[#FAF9F6] dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                Flat Shipping Fee ($)
              </label>
              <input
                type="number"
                name="flatShippingFee"
                min="0"
                value={form.flatShippingFee}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-[#FAF9F6] dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                Free Shipping Threshold ($)
              </label>
              <input
                type="number"
                name="freeShippingThreshold"
                min="0"
                value={form.freeShippingThreshold}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-[#FAF9F6] dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Module 3: Security & Data Backup Utilities */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121214] border border-[#E4E4E0] dark:border-[#202025] shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E4E4E0] dark:border-[#202025] pb-4">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-editorial font-bold uppercase tracking-wider">
                Security & Data Utilities
              </h3>
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
                Maintain system integrity, export backups, or reset demo catalogue data.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-[#E4E4E0] dark:border-[#27272A] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#71717A] block">
                  Current Admin Handle
                </span>
                <span className="font-mono font-bold text-sm text-[#0B0B0C] dark:text-white">
                  {settings.adminUsername}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold">
                Active Session
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-[#E4E4E0] dark:border-[#27272A] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#71717A] block">
                  Export Archival Backup
                </span>
                <span className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
                  Full JSON export of products & orders
                </span>
              </div>
              <button
                type="button"
                onClick={exportDataJSON}
                className="px-3.5 py-1.5 rounded-lg border border-[#E4E4E0] dark:border-[#27272A] hover:border-black dark:hover:border-white text-xs font-semibold uppercase font-mono flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          {/* Reset Demo Data Danger Zone */}
          <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Restore Default Demo Architecture
              </h4>
              <p className="text-[11px] text-rose-600/90 dark:text-rose-400/90 mt-0.5">
                Restores the initial 12 luxury garments, 8 historical orders, and default settings.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetData}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-colors flex-shrink-0 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo Store Data</span>
            </button>
          </div>

        </div>

      </form>

    </div>
  );
}
