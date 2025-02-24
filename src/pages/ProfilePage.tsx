import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiBriefcase, FiClock, FiUsers } from "react-icons/fi";

const ProfilePage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList: any[] = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
      } catch (err) {
        setError("Échec du chargement des profils. Veuillez réessayer plus tard.");
        console.error("Erreur lors de la récupération des utilisateurs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, [db]);

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

  if (users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <FiUsers className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Aucun professionnel trouvé
          </h1>
          <p className="text-gray-600">
            Nous n'avons trouvé aucun professionnel enregistré pour le moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
            <span className="relative z-10 px-4 bg-gradient-to-br from-indigo-50 to-white">
              Rencontrez nos professionnels
            </span>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-100 transform -translate-y-1/2"></div>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez des professionnels qualifiés prêts à vous aider pour votre prochain projet
          </p>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleProfileClick(user.id)}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Profile Image */}
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

              {/* Profile Details */}
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
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
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
      <p className="font-medium text-gray-600">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  </div>
);

export default ProfilePage;
