import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className={`relative p-2.5 rounded-full border border-[#E4E4E0] dark:border-[#27272A] bg-[#FAF9F6]/80 dark:bg-[#18181B]/80 text-[#0B0B0C] dark:text-[#FAF9F6] hover:border-[#0B0B0C] dark:hover:border-[#E5C378] transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm ${className}`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-4 h-4">
        <Sun
          className={`w-4 h-4 text-[#D4AF37] absolute inset-0 transition-transform duration-500 ${
            theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          className={`w-4 h-4 text-[#FAF9F6] absolute inset-0 transition-transform duration-500 ${
            theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </button>
  );
}
