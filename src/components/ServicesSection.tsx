import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function ServicesSection() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="w-full bg-white py-12 z-20 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-12 tracking-tight leading-tight">
        Accédez à nos <span className="text-blue-600">ressources exclusives</span>
      </h2>

        
        {/* Alternating Layout - maintains pattern on mobile */}
        <div className="flex flex-col gap-10 max-w-6xl mx-auto">
          {/* Card 1: Image Left, Text Right - even on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-row items-center gap-4 md:gap-8"
            onClick={() => navigate('/experts')}
          >
            <div className="w-1/2 cursor-pointer">
              <div className="p-2 md:p-6 flex justify-center items-center h-32 md:h-64">
                <img 
                  src="/liste.jpg" 
                  alt="Liste des professionnels" 
                  className="h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="w-1/2 py-2 md:py-4">
              <h3 className="text-sm md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">Liste des professionnels</h3>
              <p className="text-xs md:text-base text-gray-600 mb-2 md:mb-4">Consultez notre annuaire d'experts immobiliers certifiés.</p>
              <button 
                onClick={() => navigate('/experts')} 
                className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-base bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              >
                Voir l'annuaire
              </button>
            </div>
          </motion.div>

          {/* Card 2: Image Right, Text Left - even on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-row items-center gap-4 md:gap-8"
            onClick={() => navigate('/guide')}
          >
            <div className="w-1/2 py-2 md:py-4 order-first">
              <h3 className="text-sm md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">Tutoriels</h3>
              <p className="text-xs md:text-base text-gray-600 mb-2 md:mb-4">Découvrez nos guides pratiques pour apprendre à rechercher un professionnel de la communauté.</p>
              <button 
                onClick={() => navigate('/guide')} 
                className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-base bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
              >
                Consulter
              </button>
            </div>
            <div className="w-1/2 cursor-pointer order-last">
              <div className="p-2 md:p-6 flex justify-center items-center h-32 md:h-64">
                <img 
                  src="/tutoriel.jpg" 
                  alt="Tutorial" 
                  className="h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Image Left, Text Right - even on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-row items-center gap-4 md:gap-8"
            onClick={() => navigate('/events')}
          >
            <div className="w-1/2 cursor-pointer">
              <div className="p-2 md:p-6 flex justify-center items-center h-32 md:h-64">
                <img 
                  src="/webiner.jpg" 
                  alt="Webinar" 
                  className="h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="w-1/2 py-2 md:py-4">
              <h3 className="text-sm md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">Nos Webinars</h3>
              <p className="text-xs md:text-base text-gray-600 mb-2 md:mb-4">Participez à nos formations en ligne et développez vos connaissances dans le domaine immobilier.</p>
              <button 
                onClick={() => navigate('/events')} 
                className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-base bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Voir le programme
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}