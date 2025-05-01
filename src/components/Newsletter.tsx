import React, { useState } from 'react';
import { Send, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-green-900 py-16 overflow-hidden">
      {/* Futuristic background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(14,19,33,0.3)_0%,_transparent_70%)]"></div>
        <div className="absolute animate-pulse opacity-50 top-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute animate-pulse opacity-50 bottom-1/4 left-1/4 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
            {t('newsletter.title')}
          </h3>
          <p className="text-white/80 mb-8 text-lg leading-relaxed">
            {t('newsletter.description')}
          </p>
          
          <form 
            onSubmit={handleSubmit} 
            className="relative flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.emailPlaceholder')}
                className="w-full px-5 py-4 bg-[#1e293b] text-white border border-[#334155] rounded-full 
                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300
                  placeholder-gray-500 tracking-wider"
                required
              />
              <Zap className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 opacity-50" />
            </div>
            
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white 
                px-7 py-4 rounded-full font-semibold 
                hover:from-cyan-600 hover:to-blue-700 
                transition-all duration-300 
                flex items-center justify-center gap-3
                transform hover:scale-105 active:scale-95"
            >
              {t('newsletter.subscribeButton')} <Send className="w-5 h-5" />
            </button>
          </form>

          {status === 'success' && (
            <div className="mt-6 relative">
              <p className="text-white animate-fade-in text-lg flex items-center justify-center gap-3">
                <Zap className="text-cyan-400 animate-pulse" />
                {t('newsletter.successMessage')}
                <Zap className="text-cyan-400 animate-pulse" />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}