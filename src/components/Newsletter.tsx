import React, { useState } from 'react';
import { Send } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="bg-blue-600 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Restez informé des nouvelles propriétés et offres exclusives
          </h3>
          <p className="text-white/90 mb-6">
            Abonnez-vous à notre newsletter pour recevoir les dernières annonces immobilières, 
            les tendances du marché et des offres exclusives adaptées à votre future maison de rêve.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre e-mail"
              className="flex-1 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              S'abonner <Send className="w-4 h-4" />
            </button>
          </form>
          {status === 'success' && (
            <p className="text-white mt-4 animate-fade-in">
              Merci pour votre abonnement ! 🎉 Restez à l'affût des dernières mises à jour sur votre future propriété.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
