import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, User, Building, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Recherche Basée sur la Localisation',
    description: 'Trouvez des professionnels offrant des conseils selon vos préférences de localisation et de quartier au Canada.',
    color: 'from-green-400 to-green-600',
    accent: 'text-green-500'
  },
  {
    icon: Clock,
    title: 'Consultations Rapides',
    description: 'Planifiez vos consultations avec des professionnels à votre convenance, même pendant les week-ends.',
    color: 'from-yellow-400 to-yellow-600',
    accent: 'text-yellow-500'
  },
  {
    icon: Building,
    title: 'Professionnels Immobiliers Experts',
    description: 'Connectez-vous avec des experts immobiliers qualifiés pour vous guider dans vos démarches d\'acquisition de propriétés.',
    color: 'from-blue-400 to-blue-600',
    accent: 'text-blue-500'
  },
  {
    icon: User,
    title: 'Expérience Personnalisée',
    description: 'Des recommandations personnalisées selon vos besoins, préférences et historique de recherche.',
    color: 'from-purple-400 to-purple-600',
    accent: 'text-purple-500'
  }
];

export function Features() {
  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      {/* Original Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900">
            Pourquoi Choisir Afro Immobilier Connect
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto px-4">
            Profitez des meilleurs services pour vous connecter avec des professionnels et obtenir des conseils d'experts pour faciliter votre acquisition de propriété au Canada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: 'easeOut' 
              }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="group"
            >
              <div className={`
                bg-white/60  border border-white/20
                rounded-2xl p-6 shadow-xl hover:shadow-2xl
                transform transition-all duration-300
                hover:scale-105 cursor-pointer
                relative overflow-hidden h-full
              `}>
                {/* Original Gradient Background */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${feature.color} 
                  opacity-10 group-hover:opacity-20 transition-opacity duration-300
                `} />

                <div className="relative z-10">
                  {/* Original Icon Container */}
                  <div className={`
                    w-16 h-16 mb-4 rounded-full flex items-center justify-center 
                    bg-white/20 border border-white/30
                    ${feature.accent} group-hover:scale-110 transition-transform
                  `}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">
                    {feature.description}
                  </p>

                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-sm md:text-base font-medium group-hover:text-blue-600 transition-colors"
                  >
                    <span>En savoir plus</span>
                    <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}