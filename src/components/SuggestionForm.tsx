// SuggestionForm.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const SuggestionForm = () => {
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'suggestions'), {
        text: suggestion,
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      setSuggestion('');
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl  transition-shadow duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <img
          src="/suggestiions.jpg"
          alt="Illustration des suggestions"
          className="mx-auto w-48 h-52 animate-float"
        />
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="space-y-2 max-w-2xl">
            <label className="block text-lg font-medium text-gray-700">
              Votre Suggestion
            </label>
            <motion.textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-all duration-200 ease-in-out resize-none shadow-sm"
              rows={4}
              placeholder="Comment pouvons-nous améliorer notre service ?"
              disabled={isSubmitting}
              whileFocus={{ scale: 1.005 }}
            />
          </div>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out shadow-lg hover:shadow-md"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Envoi en cours...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 3a1 1 0 100 2h2a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Soumettre </span>
                </span>
              )}
            </button>
          </motion.div>
        </motion.div>
      </form>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 bg-white border border-emerald-100 text-emerald-700 px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-emerald-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
            <span className="font-medium">Merci pour votre suggestion !</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuggestionForm;