import React from 'react';
import { RefreshCw, AlertTriangle, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Fabricas Storefront Caught Error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetAndReload = () => {
    try {
      localStorage.removeItem('fabricas_products');
      localStorage.removeItem('fabricas_cart');
    } catch (e) {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-[#1E2329]">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E7E5E0] shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-[#0F766E]">
                Fabricas Atelier
              </span>
              <h2 className="text-xl font-display font-bold text-[#1E2329] mt-1">
                Notice: Display Interrupted
              </h2>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                An unexpected state change occurred. Your data has been preserved. Please reload to restore the storefront interface.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-left overflow-x-auto text-[10px] font-mono text-gray-700 max-h-24">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full py-3 px-6 rounded-2xl bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#0D5C58] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#0F766E]/20"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Storefront</span>
              </button>

              <button
                onClick={this.handleResetAndReload}
                className="w-full py-2.5 px-4 rounded-xl text-xs text-[#64748B] hover:text-[#1E2329] transition-colors"
              >
                Reset Storage & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
