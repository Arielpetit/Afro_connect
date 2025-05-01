import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContactWizard } from "./ContactWizard";
import { 
  FaHome, FaBalanceScale, FaFileSignature, FaTools, 
  FaSearchPlus, FaHardHat, FaHammer, 
  FaCalculator, FaBriefcase, FaPlus 
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

const categoryColors = {
  "Courtier hypothécaire": {
    gradient: "from-blue-600 to-indigo-700",
    shadow: "shadow-blue-300/25",
    border: "border-blue-400/20"
  },
  "Courtier immobilier": {
    gradient: "from-teal-600 to-emerald-700",
    shadow: "shadow-teal-300/25",
    border: "border-teal-400/20"
  },
  "Notaire": {
    gradient: "from-purple-600 to-fuchsia-700",
    shadow: "shadow-purple-300/25",
    border: "border-purple-400/20"
  },
  "spécialiste en rénovation": {
    gradient: "from-orange-600 to-amber-700",
    shadow: "shadow-orange-300/25", 
    border: "border-orange-400/20"
  },
  "Évaluateurs agréés": {
    gradient: "from-green-600 to-lime-700",
    shadow: "shadow-green-300/25",
    border: "border-green-400/20"
  },
  "Inspecteur en bâtiment": {
    gradient: "from-red-600 to-rose-700",
    shadow: "shadow-red-300/25",
    border: "border-red-400/20"
  },
  "Entrepreneur général": {
    gradient: "from-pink-600 to-rose-700",
    shadow: "shadow-pink-300/25",
    border: "border-pink-400/20"
  },
  "Comptable": {
    gradient: "from-amber-500 to-yellow-600",
    shadow: "shadow-amber-300/25",
    border: "border-amber-400/20"
  },
  "Métiers spécialisés de la construction et de l'immobilier": {
    gradient: "from-indigo-600 to-violet-700",
    shadow: "shadow-indigo-300/25",
    border: "border-indigo-400/20"
  },
  "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé": {
    gradient: "from-slate-600 to-gray-700",
    shadow: "shadow-slate-300/25",
    border: "border-slate-400/20"
  },
};

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
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 py-6 px-2 sm:px-4 lg:px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-100/30 backdrop-blur-md rounded-full shadow-xl"
            style={{
              width: Math.random() * 60 + 40 + 'px',
              height: Math.random() * 60 + 40 + 'px',
              top: Math.random() * 90 + '%',
              left: Math.random() * 90 + '%',
              filter: "blur(2px)",
              zIndex: 0,
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.12, 0.22, 0.12],
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
                className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-700 via-green-500 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg"
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
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`bg-gradient-to-br ${categoryColors[category.name].gradient} text-white rounded-2xl shadow-lg
                      hover:shadow-2xl ${categoryColors[category.name].shadow} transition-all duration-300 p-4 text-center 
                      flex flex-col items-center justify-center gap-2 hover:scale-105 active:scale-97 overflow-hidden group
                      border-2 ${categoryColors[category.name].border}
                      backdrop-blur-md bg-opacity-80 hover:bg-opacity-90
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
                      relative before:absolute before:inset-0 before:rounded-2xl before:bg-white/10 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.1 * index + 0.5 }
                    }}
                  >
                    <div className="bg-white/30 p-4 rounded-full mb-2 group-hover:bg-white/40 transition-colors shadow-inner">
                      {category.icon}
                    </div>
                    <span className="text-base font-semibold text-white group-hover:text-white/90 line-clamp-2 h-12 drop-shadow-sm">
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