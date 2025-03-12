/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiBriefcase, FiClock, FiUsers, FiSearch, FiMapPin, FiGlobe, FiAward, FiStar, FiArrowLeft } from "react-icons/fi";

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
    name: "Agent immobilier",
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
    image: "/entrepreneur_general.jpg",
  },
  {
    name: "Métiers spécialisés de la construction et de l'immobilier",
    image: "/Other.jpg",
  },
  {
    name: "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé",
    image: "/notaire.jpg",
  },
];

const mainCategories = categories.slice(0, -2).map(c => c.name);

const ProfilePage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    expertise: "",
    coverageZone: "",
    experience: 0,
    languages: "",
    rating: 0,
  });
  const [showCategories, setShowCategories] = useState(true);
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("status", "==", "approved"),
          where("userType", "==", "professional")
        );
        const querySnapshot = await getDocs(q);
        const usersList: any[] = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
        setFilteredUsers(usersList);
      } catch (err) {
        setError("Échec du chargement des profils. Veuillez réessayer plus tard.");
        console.error("Erreur lors de la récupération des utilisateurs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, [db]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: value };
      applyFilters(newFilters);
      return newFilters;
    });
  };

  const applyFilters = (filters: any) => {
    const filtered = users.filter((user) => {
      let expertiseMatch = true;
      if (filters.expertise) {
        if (filters.expertise === "Métiers spécialisés de la construction et de l'immobilier") {
          expertiseMatch = !mainCategories.includes(user.expertise) && !financialSpecialties.includes(user.expertise);
        } else if (filters.expertise === "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé") {
          expertiseMatch = financialSpecialties.includes(user.expertise);
        } else {
          expertiseMatch = user.expertise === filters.expertise;
        }
      }

      const coverageZoneMatch = filters.coverageZone
        ? user.coverageZone === filters.coverageZone
        : true;
      const experienceMatch = filters.experience
        ? user.experience >= filters.experience
        : true;
      const languagesMatch = filters.languages
        ? user.languages?.toLowerCase().includes(filters.languages.toLowerCase())
        : true;
      const averageRating = user.numberOfRatings > 0 
        ? user.totalRatings / user.numberOfRatings 
        : 0;
      const ratingMatch = filters.rating 
        ? averageRating >= filters.rating 
        : true;

      return expertiseMatch && coverageZoneMatch && experienceMatch && languagesMatch && ratingMatch;
    });
    setFilteredUsers(filtered);
  };

  const handleCategoryClick = (categoryName: string) => {
    setFilters(prev => ({
      ...prev,
      expertise: categoryName
    }));
    setShowCategories(false);
    applyFilters({ ...filters, expertise: categoryName });
  };

  const handleProfileClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Oups ! Quelque chose s'est mal passé
          </h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {showCategories ? (
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
        ) : (
          <>
            <div className="text-center mb-12">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setShowCategories(true)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
                >
                  <FiArrowLeft className="mr-2" /> Retour aux catégories
                </button>
                <h1 className="text-4xl font-bold text-gray-900">
                  Professionnels en {filters.expertise}
                </h1>
                <div className="w-24"></div>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Connectez-vous avec des professionnels qualifiés dans votre région
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-12 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Évaluation minimum
                  </label>
                  <div className="relative">
                    <FiStar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="rating"
                      value={filters.rating}
                      onChange={handleFilterChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                      <option value={0}>Toutes les évaluations</option>
                      <option value={4}>4 étoiles et plus</option>
                      <option value={3}>3 étoiles et plus</option>
                      <option value={2}>2 étoiles et plus</option>
                      <option value={1}>1 étoile et plus</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="coverageZone"
                      value={filters.coverageZone}
                      onChange={handleFilterChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                      <option value="">Zone de couverture</option>
                      <option value="Alberta">Alberta</option>
                      <option value="Colombie-Britannique">Colombie-Britannique</option>
                      <option value="Île-du-Prince-Édouard">Île-du-Prince-Édouard</option>
                      <option value="Manitoba">Manitoba</option>
                      <option value="Nouveau-Brunswick">Nouveau-Brunswick</option>
                      <option value="Nouvelle-Écosse">Nouvelle-Écosse</option>
                      <option value="Nunavut">Nunavut</option>
                      <option value="Ontario">Ontario</option>
                      <option value="Québec">Québec</option>
                      <option value="Saskatchewan">Saskatchewan</option>
                      <option value="Terre-Neuve-et-Labrador">Terre-Neuve-et-Labrador</option>
                      <option value="Territoires du Nord-Ouest">Territoires du Nord-Ouest</option>
                      <option value="Yukon">Yukon</option>
                    </select>
                    <FiGlobe className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expérience
                  </label>
                  <div className="relative">
                    <FiAward className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="experience"
                      value={filters.experience}
                      onChange={handleFilterChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                      <option value={0}>Toutes expériences</option>
                      <option value={1}>1+ année</option>
                      <option value={2}>2+ années</option>
                      <option value={3}>3+ années</option>
                      <option value={5}>5+ années</option>
                      <option value={7}>7+ années</option>
                      <option value={10}>10+ années</option>
                      <option value={15}>15+ années</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Langues
                  </label>
                  <div className="relative">
                    <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="languages"
                      value={filters.languages}
                      onChange={handleFilterChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                      <option value="">Langues</option>
                      <option value="français">Français</option>
                      <option value="anglais">Anglais</option>
                      <option value="espagnol">Espagnol</option>
                      <option value="allemand">Allemand</option>
                      <option value="italien">Italien</option>
                      <option value="portugais">Portugais</option>
                      <option value="arabe">Arabe</option>
                      <option value="chinois">Chinois</option>
                      <option value="russe">Russe</option>
                      <option value="japonais">Japonais</option>
                      <option value="néerlandais">Néerlandais</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="text-center p-8 max-w-md mx-auto">
                <FiUsers className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  Aucun professionnel trouvé 😞
                </h1>
                <p className="text-gray-600">
                  Soyez le premier à vous inscrire dans cette catégorie!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleProfileClick(user.id)}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <div className="relative h-48 bg-indigo-50">
                      <img
                        src={user.profilePicture || "https://avatar.vercel.sh/placeholder"}
                        alt={user.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {user.userType === "professional" && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                          <p className="text-sm text-indigo-200">{user.expertise}</p>
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      {user.userType !== "professional" && (
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <FiUser className="text-indigo-600" /> {user.name}
                        </h3>
                      )}
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiMail className="flex-shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      {user.userType === "professional" && (
                        <div className="space-y-2">
                          <ProfessionalBadge
                            icon={<FiBriefcase />}
                            label="Expérience"
                            value={`${user.experience} années`}
                          />
                          <ProfessionalBadge
                            icon={<FiClock />}
                            label="Projets réalisés"
                            value={
                              user.projectsCompleted
                                ? String(user.projectsCompleted)
                                : "N/A"
                            }
                          />
                          <ProfessionalBadge
                            icon={<FiStar />}
                            label="Évaluation"
                            value={
                              user.numberOfRatings > 0
                                ? `${(user.totalRatings / user.numberOfRatings).toFixed(1)}/5`
                                : "Nouveau"
                            }
                          />
                        </div>
                      )}
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

const ProfessionalBadge = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3 text-sm">
    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">{icon}</div>
    <div>
      <span className="block text-gray-600">{label}</span>
      <span className="text-indigo-600">{value}</span>
    </div>
  </div>
);

export default ProfilePage;