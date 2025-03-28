import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiBriefcase, FiClock, FiArrowLeft, FiUsers } from "react-icons/fi";

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

interface User {
  id: string;
  name?: string;
  email?: string;
  expertise?: string;
  experience?: number;
  projectsCompleted?: number;
  profilePicture?: string;
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
  const navigate = useNavigate();
  const db = getFirestore();

  const mainCategories = categories.slice(0, -2).map(c => c.name);

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
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Trouvez votre expert
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(({ name, image }) => (
                <div
                  key={name}
                  onClick={() => handleCategoryClick(name)}
                  className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100"
                >
                  <div className="aspect-video w-full overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mt-6 text-center group-hover:text-blue-600 transition-colors">
                    {name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCategory && (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
              >
                <FiArrowLeft className="mr-2" /> Retour aux catégories
              </button>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
                Professionnels en {selectedCategory}
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center text-gray-600 text-lg">
                <FiUsers className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                <p className="mb-2">Aucun profil trouvé </p>
                <p className="text-sm">Soyez le premier à vous inscrire dans cette catégorie!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => navigate(`/profile/${user.id}`)}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <div className="relative h-48 bg-indigo-50">
                      <img
                        src={user.profilePicture || "https://avatar.vercel.sh/placeholder"}
                        alt={user.name || "Professional"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                        <p className="text-sm text-indigo-200">{user.expertise}</p>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FiUser className="text-indigo-600" /> {user.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiMail className="flex-shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="space-y-2">
                        <ProfessionalBadge
                          icon={<FiBriefcase />}
                          label="Expérience"
                          value={`${user.experience ?? "N/A"} années`}
                        />
                        <ProfessionalBadge
                          icon={<FiClock />}
                          label="Projets réalisés"
                          value={user.projectsCompleted ? String(user.projectsCompleted) : "N/A"}
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
    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">{icon}</div>
    <div>
      <p className="font-medium text-gray-500">{label}</p>
      <p className="text-gray-900 font-semibold">{value}</p>
    </div>
  </div>
);

export default ProfessionalProfilePage;