import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Hero() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative min-h-[500px] md:min-h-[700px] flex items-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
        <img
          src="/family.jpeg"
          alt="Illustration de conseil immobilier"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight md:leading-snug">
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Experts Immobiliers
            </span>{' '}
            <br className="hidden md:block" />
            pour votre prochain projet
          </h1>
          <p className="text-base md:text-lg text-gray-100 mb-8 md:mb-10 max-w-prose mx-auto md:mx-0 opacity-90">
            Conseil professionnel en acquisitions immobilières, accompagnement juridique 
            et stratégies d'investissement sur-mesure.
          </p>

          {/* Buttons with animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-3.5 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-600/30"
            >
              Enregistrez-vous en tant que professionnel
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="px-6 py-3.5 sm:px-8 sm:py-4 bg-transparent border-2 border-white/20 hover:border-white/40 text-white rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:backdrop-blur"
            >
              Trouver des experts
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
