/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiArrowLeft } from "react-icons/fi";
import { CategoriesGrid } from "../components/Proffesionalprofile/CategoriesGrid";
import { FiltersSection } from "../components/Proffesionalprofile/FiltersSection";
import { ProfessionalCard } from "../components/Proffesionalprofile/ProfessionalCard";

const financialSpecialties = [
  "Consultant en stratégie immobilière",
  "Architecte spécialisé en immobilier",
  "Expert en valorisation immobilière",
  "Avocat spécialisé en droit immobilier",
  "Gestionnaire d'actifs immobiliers",
  "Conseil en sécurité financière",
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

const mainCategories = categories.slice(0, -2).map((c) => c.name);

export const ProfilePage = () => {
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
          where("userType", "==", "professional"),
        );
        const querySnapshot = await getDocs(q);
        const usersList: any[] = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
        setFilteredUsers(usersList);
      } catch (err) {
        setError(
          "Échec du chargement des profils. Veuillez réessayer plus tard.",
        );
        console.error("Erreur lors de la récupération des utilisateurs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, [db]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
        if (
          filters.expertise ===
          "Métiers spécialisés de la construction et de l'immobilier"
        ) {
          expertiseMatch =
            !mainCategories.includes(user.expertise) &&
            !financialSpecialties.includes(user.expertise);
        } else if (
          filters.expertise ===
          "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé"
        ) {
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
        ? user.languages
            ?.toLowerCase()
            .includes(filters.languages.toLowerCase())
        : true;
      const averageRating =
        user.numberOfRatings > 0 ? user.totalRatings / user.numberOfRatings : 0;
      const ratingMatch = filters.rating
        ? averageRating >= filters.rating
        : true;

      return (
        expertiseMatch &&
        coverageZoneMatch &&
        experienceMatch &&
        languagesMatch &&
        ratingMatch
      );
    });
    setFilteredUsers(filtered);
  };

  const handleCategoryClick = (categoryName: string) => {
    setFilters((prev) => ({
      ...prev,
      expertise: categoryName,
    }));
    setShowCategories(false);
    applyFilters({ ...filters, expertise: categoryName });
    // Scroll to top when a category is clicked
    window.scrollTo(0, 0);
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
          <CategoriesGrid
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
        ) : (
          <>
            <div className="text-center mb-12">
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 mb-8">
                <button
                  onClick={() => setShowCategories(true)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
                >
                  <FiArrowLeft className="mr-2" /> Retour aux catégories
                </button>
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 text-center sm:text-left">
                  Professionnels en {filters.expertise}
                </h1>
                <div className="w-24 hidden sm:block"></div>
              </div>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Connectez-vous avec des professionnels qualifiés dans votre
                région
              </p>
            </div>

            <FiltersSection
              filters={filters}
              onFilterChange={handleFilterChange}
            />

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
                  <ProfessionalCard
                    key={user.id}
                    user={user}
                    onProfileClick={handleProfileClick}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
