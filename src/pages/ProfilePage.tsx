import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContactWizard } from "./ContactWizard";
import { 
  FaHome, FaBalanceScale, FaFileSignature, FaTools, 
  FaSearchPlus, FaHardHat, FaHammer, 
  FaCalculator, FaBriefcase 
} from "react-icons/fa";

const categories = [
  {
    name: "Courtier hypothécaire",
    icon: <FaHome className="text-2xl" />
  },
  {
    name: "Courtier immobilier",
    icon: <FaHome className="text-2xl" />
  },
  {
    name: "Notaire",
    icon: <FaBalanceScale className="text-2xl" />
  },
  {
    name: "spécialiste en rénovation",
    icon: <FaHardHat className="text-2xl" />
  },
  {
    name: "Évaluateurs agréés",
    icon: <FaFileSignature className="text-2xl" />
  },
  {
    name: "Inspecteur en bâtiment",
    icon: <FaSearchPlus className="text-2xl" />
  },
  {
    name: "Entrepreneur général",
    icon: <FaTools className="text-2xl" />
  },
  {
    name: "Comptable",
    icon: <FaCalculator className="text-2xl" />
  },
  {
    name: "Métiers spécialisés de la construction et de l'immobilier",
    icon: <FaHammer className="text-2xl" />
  },
  {
    name: "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé",
    icon: <FaBriefcase className="text-2xl" />
  },  
];

export const ProfessionalRoadmap = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const handleCategoryClick = (categoryName: string) => {
    setSelectedSpecialty(categoryName);
    setShowWizard(true);
    window.scrollTo(0, 0);
  };

  const handleBackFromWizard = () => {
    setShowWizard(false);
    window.scrollTo(0, 0);

  };

  return (
    <div className="min-h-screen bg-white py-6 px-2 sm:px-4 lg:px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-100/20 rounded-full"
            style={{
              width: Math.random() * 50 + 20 + 'px',
              height: Math.random() * 50 + 20 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode='wait'>
          {showWizard ? (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4 }}
            >
              <ContactWizard
                specialty={selectedSpecialty}
                onBack={handleBackFromWizard}
              />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Trouvez votre expert
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className="bg-gradient-to-br from-teal-500 to-blue-600 text-white rounded-xl shadow-md
                    hover:shadow-lg hover:shadow-teal-200/40 transition-all duration-300 p-3 text-center flex flex-col 
                    items-center justify-center gap-2 hover:scale-105 active:scale-95 overflow-hidden group
                    border border-teal-300/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.1 * index + 0.5 }
                    }}
                  >
                    <div className="bg-white/20 p-3 rounded-full mb-2 group-hover:bg-white/30 transition-colors">
                      {category.icon}
                    </div>
                    <span className="text-sm font-medium text-white group-hover:text-white/90 line-clamp-2 h-10">
                      {category.name}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Note: The CategoriesGrid component is no longer needed as we're rendering buttons directly