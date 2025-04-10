import { ArrowRight, Search, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Hero() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="relative min-h-[600px] md:min-h-[800px] flex items-center overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/50 z-10" />
        <img
          src="/family.jpeg"
          alt="Illustration de conseil immobilier"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-600/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-green-500/10 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center md:text-left"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-blue-300 mb-6"
          >
            Experts immobiliers à votre service
          </motion.span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight md:leading-snug">
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Experts Immobiliers
            </span>{' '}
            <br className="hidden md:block" />
            pour votre prochain projet
          </h1>
          
          <p className="text-base md:text-lg text-gray-200 mb-10 md:mb-12 max-w-prose mx-auto md:mx-0 opacity-90 leading-relaxed">
            Conseil professionnel en acquisitions immobilières, accompagnement juridique 
            et stratégies d'investissement sur-mesure pour réaliser vos projets avec confiance.
          </p>

          {/* Buttons with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/register')}
              className="px-7 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-blue-600/30"
            >
              Enregistrez-vous en tant que professionnel
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/profile')}
              className="px-7 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-white/30 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-black/10"
            >
              <Search className="w-5 h-5 text-blue-300" />
              Contacter un expert
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/experts')}
              className="px-7 py-4 bg-gradient-to-r from-green-600/80 to-emerald-500/80 hover:from-green-600/90 hover:to-emerald-500/90 backdrop-blur-md text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-green-600/20"
            >
              <Users className="w-5 h-5" />
              Contacter la liste de nos experts
            </motion.button>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>20+ Experts certifiés</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Conseils personnalisés</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Satisfaction garantie</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}