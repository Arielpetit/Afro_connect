import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CategoriesGrid } from "../components/CategoriesGrid";
import { ContactWizard } from "./ContactWizard";

const categories = [
  {
    name: "Courtier hypothécaire",
    image: "/courtier-hypothecaire.jpg",
  },
  {
    name: "Courtier immobilier",
    image: "/Agent_immobilier.jpg",
  },
  {
    name: "Notaire",
    image: "/notaire.jpg",
  },
  {
    name: "Constructeur",
    image: "/constructeur.jpg",
  },
  {
    name: "Évaluateurs agréés",
    image: "/Evaluateur_agree.jpg",
  },
  {
    name: "Inspecteur en bâtiment",
    image: "/Inspecteur_en_batiment.jpg",
  },
  {
    name: "Entrepreneur général",
    image: "/intrepreneur_general.jpg",
  },
  {
    name: "Métiers spécialisés de la construction et de l'immobilier",
    image: "/Other.jpg",
  },
  {
    name: "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé",
    image: "/cpa.jpg",
  },
];

export const ProfessionalRoadmap = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const handleCategoryClick = (categoryName: string) => {
    setSelectedSpecialty(categoryName);
    setShowWizard(true);
  };

  const handleBackFromWizard = () => {
    setShowWizard(false);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
              </motion.h2>
              
              <CategoriesGrid
                categories={categories}
                onCategoryClick={handleCategoryClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};