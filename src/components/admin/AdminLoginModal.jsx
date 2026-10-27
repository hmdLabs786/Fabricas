import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import Logo from '../common/Logo';
import { Lock, User, KeyRound, AlertCircle, ArrowRight, X } from 'lucide-react';

export default function AdminLoginModal() {
  const {
    isAdminLoginOpen,
    setIsAdminLoginOpen,
    loginAdmin,
    setCurrentView,
    setAdminSection,
    showToast
  } = useStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        setAdminSection('dashboard');
        setUsername('');
        setPassword('');
        showToast('Welcome to Fabricas Admin Portal', 'success');
      } else {
        setErrorMsg('Invalid Credentials. Access restricted to authorized personnel.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E7E5E0] p-6 sm:p-8 transition-transform ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setIsAdminLoginOpen(false);
            setErrorMsg('');
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-[#64748B] hover:text-[#1E2329]"
          aria-label="Close login modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Security Header */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="p-3 rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
            <Lock className="w-6 h-6" />
          </div>

          <Logo size="sm" showWordmark={true} showSubtext={true} />

          <div>
            <h2 className="text-xl font-display font-bold text-[#1E2329]">
              Administrator Portal
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Please enter your administrative credentials to manage store inventory and orders.
            </p>
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1E2329] mb-1">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#E7E5E0] text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E2329] mb-1">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#E7E5E0] text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-6 rounded-2xl bg-[#0F766E] hover:bg-[#0D5C58] text-white text-xs font-semibold tracking-wide transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Admin</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
