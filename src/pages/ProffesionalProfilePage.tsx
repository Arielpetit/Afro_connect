import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FiUser, FiBriefcase, FiArrowLeft, FiUsers, FiMap } from "react-icons/fi";
import { 
  FaHome, FaBalanceScale, FaFileSignature, FaTools, 
   FaSearchPlus, FaHardHat, FaHammer, 
  FaCalculator, FaBriefcase 
} from "react-icons/fa";

// Specialist configuration
const financialSpecialties = [
  "Consultant en stratégie immobilière",
  "Architecte spécialisé en immobilier",
  "Expert en valorisation immobilière",
  "Avocat spécialisé en droit immobilier",
  "Gestionnaire d'actifs immobiliers",
  "Conseil en sécurité financière"
];

const categories = [
  "Courtier hypothécaire",
  "Courtier immobilier",
  "Notaire",
  "spécialiste en rénovation",
  "Évaluateurs agréés",
  "Inspecteur en bâtiment",
  "Entrepreneur général",
  "Métiers spécialisés de la construction et de l'immobilier",
  "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé",
];

// Map categories to icons
const categoryIcons: Record<string, React.ReactNode> = {
  "Courtier hypothécaire": <FaHome className="text-2xl" />,
  "Courtier immobilier": <FaHome className="text-2xl" />,
  "Notaire": <FaBalanceScale className="text-2xl" />,
  "spécialiste en rénovation": <FaHardHat className="text-2xl" />,
  "Évaluateurs agréés": <FaFileSignature className="text-2xl" />,
  "Inspecteur en bâtiment": <FaSearchPlus className="text-2xl" />,
  "Entrepreneur général": <FaTools className="text-2xl" />,
  "Métiers spécialisés de la construction et de l'immobilier": <FaHammer className="text-2xl" />,
  "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé": <FaCalculator className="text-2xl" />,
};

interface User {
  id: string;
  name?: string;
  email?: string;
  expertise?: string;
  experience?: number;
  projectsCompleted?: number;
  profilePicture?: string;
  coverageZone?: string;
}

interface ProfessionalBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ProfessionalProfilePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const db = getFirestore();

  const mainCategories = categories.slice(0, -2);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList: User[] = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
      } catch (err) {
        setError("Échec du chargement des profils. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsersData();
  }, [db]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredUsers = selectedCategory
    ? users.filter(user => {
        if (selectedCategory === "Métiers spécialisés de la construction et de l'immobilier") {
          return user.expertise && 
            !mainCategories.includes(user.expertise) &&
            !financialSpecialties.includes(user.expertise);
        }
        if (selectedCategory === "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé") {
          return user.expertise && financialSpecialties.includes(user.expertise);
        }
        return user.expertise?.toLowerCase() === selectedCategory.toLowerCase();
      })
    : users;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {!selectedCategory && (
          <div className="mb-12 md:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              Trouvez votre expert
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="bg-gradient-to-br from-teal-500 to-blue-600 text-white rounded-2xl shadow-md
                    hover:shadow-lg hover:shadow-teal-200/40 transition-all duration-300 p-5 text-center flex flex-col 
                    items-center justify-center gap-3 hover:scale-105 active:scale-95 overflow-hidden group
                    border border-teal-300/20"
                >
                  <div className="bg-white/20 p-3 rounded-full mb-2 group-hover:bg-white/30 transition-colors">
                    {categoryIcons[category] || <FaBriefcase className="text-2xl" />}
                  </div>
                  <span className="text-sm font-medium text-white group-hover:text-white/90 line-clamp-2 h-10">
                    {category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedCategory && (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center text-teal-600 hover:text-teal-800 transition-colors
                  bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-full text-sm font-medium"
              >
                <FiArrowLeft className="mr-2" /> Retour aux catégories
              </button>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
                Professionnels en {selectedCategory}
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center text-gray-600 text-lg p-8 bg-white rounded-2xl shadow-sm">
                <FiUsers className="w-16 h-16 text-teal-500 mx-auto mb-4" />
                <p className="mb-2">Aucun profil trouvé </p>
                <p className="text-sm">Soyez le premier à vous inscrire dans cette catégorie!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-lg hover:shadow-teal-100 
                      transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
                  >
                    <div className="relative h-48 bg-teal-50">
                      <img
                        src={user.profilePicture || "https://avatar.vercel.sh/placeholder"}
                        alt={user.name || "Professional"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                        <p className="text-sm text-teal-100">{user.expertise}</p>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FiUser className="text-teal-600" /> {user.name}
                      </h3>
                      <div className="space-y-2">
                        <ProfessionalBadge
                          icon={<FiBriefcase />}
                          label="Expérience"
                          value={`${user.experience ?? "N/A"} années`}
                        />
                        <ProfessionalBadge
                          icon={<FiMap />}
                          label="Zone de couverture"
                          value={user.coverageZone || "N/A"}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const ProfessionalBadge: React.FC<ProfessionalBadgeProps> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 text-sm">
    <div className="p-2 bg-teal-50 rounded-lg text-teal-600">{icon}</div>
    <div>
      <p className="font-medium text-gray-500">{label}</p>
      <p className="text-gray-900 font-semibold">{value}</p>
    </div>
  </div>
);

export default ProfessionalProfilePage;