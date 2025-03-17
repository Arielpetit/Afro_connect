import { useState } from "react";
import { CategoriesGrid } from "../components/Proffesionalprofile/CategoriesGrid";
import { ContactWizard } from "./ContactWizard";

const categories = [
  {
    name: "Courtier hypothécaire",
    image: "/courtier-hypothecaire.jpg",
  },
  {
    name: "Courtiers immobiliers",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {showWizard ? (
          <div>
            <ContactWizard
              specialty={selectedSpecialty}
              onBack={handleBackFromWizard}
            />
          </div>
        ) : (
          <CategoriesGrid
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
        )}
      </div>
    </div>
  );
};