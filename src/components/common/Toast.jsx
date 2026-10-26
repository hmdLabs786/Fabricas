import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useStore();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />;
        let borderColor = 'border-emerald-500/20';
        let bgGlow = 'dark:shadow-emerald-950/30';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />;
          borderColor = 'border-rose-500/20';
          bgGlow = 'dark:shadow-rose-950/30';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />;
          borderColor = 'border-[#D4AF37]/30';
          bgGlow = 'dark:shadow-amber-950/20';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3.5 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl border ${borderColor} rounded-xl shadow-xl ${bgGlow} text-[#0B0B0C] dark:text-[#FAF9F6] transition-all duration-300 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-2`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              {icon}
              <p className="text-xs tracking-wide font-medium leading-relaxed truncate">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8E8E93] hover:text-[#0B0B0C] dark:hover:text-[#FAF9F6] p-1 transition-colors rounded-md"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
