import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import Logo from '../common/Logo';
import { Lock, User, KeyRound, AlertCircle, ArrowRight, X, ShieldAlert } from 'lucide-react';

export default function AdminLoginModal() {
  const {
    isAdminLoginOpen,
    setIsAdminLoginOpen,
    loginAdmin,
    setCurrentView,
    showToast
  } = useStore();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin2008');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAdminLoginOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const success = loginAdmin(username, password);
      setIsLoading(false);

      if (success) {
        setIsAdminLoginOpen(false);
        setCurrentView('admin');
        showToast('Welcome back, Chief Atelier Administrator', 'success');
      } else {
        setErrorMsg('Invalid Credentials. Access restricted to authorized personnel.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-md bg-[#FAF9F6] dark:bg-[#121214] text-[#0B0B0C] dark:text-[#FAF9F6] rounded-2xl shadow-2xl border border-[#E4E4E0] dark:border-[#27272A] overflow-hidden p-6 sm:p-8 transition-transform ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAdminLoginOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#8E8E93] hover:text-[#0B0B0C] dark:hover:text-white transition-colors"
          aria-label="Close login modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Security Header */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="p-3 rounded-2xl bg-[#0B0B0C] text-[#D4AF37] dark:bg-[#1C1C1F] border border-[#D4AF37]/30 shadow-md">
            <Lock className="w-7 h-7" />
          </div>

          <Logo size="sm" showWordmark={true} />

          <div>
            <h2 className="text-xl font-editorial font-bold uppercase tracking-tight">
              Admin CMS Gateway
            </h2>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1">
              Authenticate with administrative credentials to access store analytics and inventory controls.
            </p>
          </div>
        </div>

        {/* Demo Credentials Reminder Tag */}
        <div className="mt-5 p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-[#0B0B0C] dark:text-[#FAF9F6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            <span className="text-[11px] font-mono">
              Demo Access: <strong>admin</strong> / <strong>admin2008</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setUsername('admin');
              setPassword('admin2008');
            }}
            className="text-[10px] font-mono uppercase underline text-[#D4AF37] hover:text-amber-500 font-semibold"
          >
            Auto Fill
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] mb-1">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8E8E93] absolute left-3 top-3" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] text-xs font-mono focus:outline-none focus:border-[#0B0B0C] dark:focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] mb-1">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#8E8E93] absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-[#18181B] border border-[#E4E4E0] dark:border-[#27272A] text-xs font-mono focus:outline-none focus:border-[#0B0B0C] dark:focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#0B0B0C] text-[#FAF9F6] dark:bg-[#FAF9F6] dark:text-[#0B0B0C] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-[#0B0B0C] transition-all shadow-xl active:scale-98 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Unlock Atelier CMS</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
