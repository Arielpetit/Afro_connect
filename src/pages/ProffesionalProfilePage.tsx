import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  FiUser,
  FiBriefcase,
  FiArrowLeft,
  FiUsers,
  FiMap,
} from "react-icons/fi";
import {
  FaHome,
  FaBalanceScale,
  FaFileSignature,
  FaTools,
  FaSearchPlus,
  FaHardHat,
  FaHammer,
  FaCalculator,
  FaBriefcase,
} from "react-icons/fa";

// Specialist configuration
const financialSpecialties = [
  "Consultant en stratégie immobilière",
  "Architecte spécialisé en immobilier",
  "Expert en valorisation immobilière",
  "Avocat spécialisé en droit immobilier",
  "Gestionnaire d'actifs immobiliers",
  "Conseiller en sécurité financière",
  "Comptables CPA",
];

const categories = [
  "Courtier hypothécaire",
  "Courtier immobilier",
  "Notaire",
  "spécialiste en rénovation",
  "Évaluateurs agréés",
  "Inspecteur en bâtiment",
  "Entrepreneur général",
  "Comptables",
  "Métiers spécialisés de la construction et de l'immobilier",
  "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé",
];

const categoryColors = {
  "Courtier hypothécaire": {
    gradient: "from-blue-600 to-indigo-700",
    shadow: "shadow-blue-300/25",
    border: "border-blue-400/20",
  },
  "Courtier immobilier": {
    gradient: "from-teal-600 to-emerald-700",
    shadow: "shadow-teal-300/25",
    border: "border-teal-400/20",
  },
  "Notaire": {
    gradient: "from-purple-600 to-fuchsia-700",
    shadow: "shadow-purple-300/25",
    border: "border-purple-400/20",
  },
  "spécialiste en rénovation": {
    gradient: "from-orange-600 to-amber-700",
    shadow: "shadow-orange-300/25",
    border: "border-orange-400/20",
  },
  "Évaluateurs agréés": {
    gradient: "from-green-600 to-lime-700",
    shadow: "shadow-green-300/25",
    border: "border-green-400/20",
  },
  "Inspecteur en bâtiment": {
    gradient: "from-red-600 to-rose-700",
    shadow: "shadow-red-300/25",
    border: "border-red-400/20",
  },
  "Entrepreneur général": {
    gradient: "from-pink-600 to-rose-700",
    shadow: "shadow-pink-300/25",
    border: "border-pink-400/20",
  },
  "Comptables": {
    gradient: "from-amber-500 to-yellow-600",
    shadow: "shadow-amber-300/25",
    border: "border-amber-400/20",
  },
  "Métiers spécialisés de la construction et de l'immobilier": {
    gradient: "from-indigo-600 to-violet-700",
    shadow: "shadow-indigo-300/25",
    border: "border-indigo-400/20",
  },
  "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé": {
    gradient: "from-slate-600 to-gray-700",
    shadow: "shadow-slate-300/25",
    border: "border-slate-400/20",
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  "Courtier hypothécaire": <FaHome className="text-2xl" />,
  "Courtier immobilier": <FaHome className="text-2xl" />,
  Notaire: <FaBalanceScale className="text-2xl" />,
  "spécialiste en rénovation": <FaHardHat className="text-2xl" />,
  "Évaluateurs agréés": <FaFileSignature className="text-2xl" />,
  "Inspecteur en bâtiment": <FaSearchPlus className="text-2xl" />,
  "Entrepreneur général": <FaTools className="text-2xl" />,
  Comptables: <FaCalculator className="text-2xl" />,
  "Métiers spécialisés de la construction et de l'immobilier": (
    <FaHammer className="text-2xl" />
  ),
  "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé": (
    <FaCalculator className="text-2xl" />
  ),
};

interface User {
  id: string;
  name?: string;
  email?: string;
  expertise?: string[]; // Array of strings
  experience?: number;
  projectsCompleted?: number;
  profilePicture?: string;
  coverageZone?: string;
  status?: string;
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

  const mainCategories = categories.filter(
    (cat) =>
      cat !== "Métiers spécialisés de la construction et de l'immobilier" &&
      cat !==
        "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé"
  );

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList: User[] = [];
        querySnapshot.forEach((doc) => {
          const userData = { id: doc.id, ...doc.data() };
          console.log("Fetched user:", userData); // Debug: Log each user
          usersList.push(userData);
        });
        setUsers(usersList.filter(user => user.status !== "pending"));
        console.log("All users:", usersList);
        console.log("All users:", usersList); // Debug: Log full user list
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Échec du chargement des profils. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsersData();
  }, [db]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    console.log("Selected category:", category); // Debug: Log selected category
  };

  // Normalize expertise and category for comparison
  const normalizeString = (str: string) =>
    str.toLowerCase().replace(/s$/, "").trim();

  const filteredUsers = selectedCategory
    ? users.filter((user) => {
        if (!user.expertise || !Array.isArray(user.expertise)) {
          console.log("User skipped (no/invalid expertise):", user); // Debug
          return false;
        }

        const normalizedExpertise = user.expertise.map(normalizeString);
        const normalizedCategory = normalizeString(selectedCategory);

        if (
          selectedCategory ===
          "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé"
        ) {
          const matches = normalizedExpertise.some((exp) =>
            financialSpecialties.map(normalizeString).includes(exp)
          );
          console.log(`User ${user.name} financial match:`, matches); // Debug
          return matches;
        }

        if (
          selectedCategory ===
          "Métiers spécialisés de la construction et de l'immobilier"
        ) {
          const matches = normalizedExpertise.some(
            (exp) =>
              !categories.map(normalizeString).includes(exp) &&
              !financialSpecialties.map(normalizeString).includes(exp)
          );
          console.log(`User ${user.name} trades match:`, matches); // Debug
          return matches;
        }

        const matches = normalizedExpertise.includes(normalizedCategory);
        console.log(`User ${user.name} category match:`, matches); // Debug
        return matches;
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
                  className={`bg-gradient-to-br ${
                    categoryColors[category].gradient
                  } text-white rounded-2xl shadow-md
                    hover:shadow-lg ${
                      categoryColors[category].shadow
                    } transition-all duration-300 p-5 text-center flex flex-col 
                    items-center justify-center gap-3 hover:scale-105 active:scale-95 overflow-hidden group
                    border ${categoryColors[category].border}`}
                >
                  <div className="bg-white/20 p-3 rounded-full mb-2 group-hover:bg-white/30 transition-colors">
                    {categoryIcons[category] || (
                      <FaBriefcase className="text-2xl" />
                    )}
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
                <p className="text-sm">
                  Soyez le premier à vous inscrire dans cette catégorie!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-lg hover:shadow-teal-100 
                      transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
                  >
                    <div className="relative h-48 bg-teal-50 flex items-center justify-center">
                      <img
                        src={
                          user.profilePicture ||
                          "https://avatar.vercel.sh/placeholder"
                        }
                        alt={user.name || "Professional"}
                        className="w-full h-full object-contain object-center"
                        style={{ transform: "scale(0.9)" }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="text-lg font-semibold text-white">
                          {user.name || "N/A"}
                        </h3>
                        <p className="text-sm text-teal-100">
                          {user.expertise && user.expertise.length > 0
                            ? user.expertise.join(", ")
                            : "Aucune expertise"}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FiUser className="text-teal-600" /> {user.name || "N/A"}
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

const ProfessionalBadge: React.FC<ProfessionalBadgeProps> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-start gap-3 text-sm">
    <div className="p-2 bg-teal-50 rounded-lg text-teal-600">{icon}</div>
    <div>
      <p className="font-medium text-gray-500">{label}</p>
      <p className="text-gray-900 font-semibold">{value}</p>
    </div>
  </div>
);

export default ProfessionalProfilePage;