import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function ServicesSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="w-full bg-white py-12 z-20 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-12 tracking-tight leading-tight">
          {t('home.services.title.part1')} <span className="text-blue-600">{t('home.services.title.part2')}</span>
        </h2>

        <div className="flex flex-col gap-10 max-w-6xl mx-auto">
          {/* Card 1: Professionals */}
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
                  alt={t('home.services.professionals.title')} 
                  className="h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="w-1/2 py-2 md:py-4">
              <h3 className="text-sm md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">
                {t('home.services.professionals.title')}
              </h3>
              <p className="text-xs md:text-base text-gray-600 mb-2 md:mb-4">
                {t('home.services.professionals.description')}
              </p>
              <button 
                onClick={() => navigate('/experts')} 
                className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-base bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              >
                {t('home.services.professionals.button')}
              </button>
            </div>
          </motion.div>

          {/* Card 2: Tutorials */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-row items-center gap-4 md:gap-8"
            onClick={() => navigate('/guide')}
          >
            <div className="w-1/2 py-2 md:py-4 order-first">
              <h3 className="text-sm md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">
                {t('home.services.tutorials.title')}
              </h3>
              <p className="text-xs md:text-base text-gray-600 mb-2 md:mb-4">
                {t('home.services.tutorials.description')}
              </p>
              <button 
                onClick={() => navigate('/guide')} 
                className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-base bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
              >
                {t('home.services.tutorials.button')}
              </button>
            </div>
            <div className="w-1/2 cursor-pointer order-last">
              <div className="p-2 md:p-6 flex justify-center items-center h-32 md:h-64">
                <img 
                  src="/tutoriel.jpg" 
                  alt={t('home.services.tutorials.title')} 
                  className="h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Webinars */}
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
                  alt={t('home.services.webinars.title')} 
                  className="h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="w-1/2 py-2 md:py-4">
              <h3 className="text-sm md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">
                {t('home.services.webinars.title')}
              </h3>
              <p className="text-xs md:text-base text-gray-600 mb-2 md:mb-4">
                {t('home.services.webinars.description')}
              </p>
              <button 
                onClick={() => navigate('/events')} 
                className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-base bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                {t('home.services.webinars.button')}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}