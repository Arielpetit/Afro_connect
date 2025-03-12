// ProfileDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { db, doc, getDoc } from "../firebase";
import { useParams } from "react-router-dom";
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiClock, FiInfo,
  FiGlobe, FiMap, FiFlag, FiCalendar, FiCheckCircle
} from "react-icons/fi";

const ProfileDetailsPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", userId!);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
          setUser({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Aucun utilisateur trouvé!");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Utilisateur introuvable</h1>
          <p className="text-gray-600">Le profil utilisateur demandé n'existe pas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 p-8 text-center">
          <div className="relative inline-block group">
            <img
              src={user.profilePicture || "https://avatar.vercel.sh/placeholder"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg transform group-hover:scale-105 transition-transform duration-200 object-cover"
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white">{user.name}</h1>
          {user.userType === "professional" && (
            <p className="text-indigo-100 mt-2">{user.expertise}</p>
          )}
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard icon={<FiUser className="w-5 h-5" />} title="Nom" value={user.name} />
            <InfoCard icon={<FiMail className="w-5 h-5" />} title="Email" value={user.email} />
            <InfoCard icon={<FiPhone className="w-5 h-5" />} title="Téléphone" value={user.phone} />
            {user.userType === "professional" && (
              <InfoCard 
                icon={<FiMapPin className="w-5 h-5" />} 
                title="Adresse" 
                value={user.address} 
              />
            )}
          </div>

          {user.userType === "professional" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard 
                  icon={<FiBriefcase className="w-5 h-5" />} 
                  title="Expertise" 
                  value={user.expertise} 
                />
                <InfoCard 
                  icon={<FiClock className="w-5 h-5" />} 
                  title="Expérience" 
                  value={`${user.experience} ans`} 
                />
                <InfoCard 
                  icon={<FiCheckCircle className="w-5 h-5" />} 
                  title="Projets terminés" 
                  value={user.projectsCompleted} 
                />
                <InfoCard 
                  icon={<FiCheckCircle className="w-5 h-5" />} 
                  title="Numéro de permis" 
                  value={user.numeroPermis || "-"} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard 
                  icon={<FiGlobe className="w-5 h-5" />} 
                  title="Site Web" 
                  value={
                    user.website ? (
                      <a 
                        href={user.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        {user.website}
                      </a>
                    ) : "-"
                  }
                />
                <InfoCard 
                  icon={<FiMap className="w-5 h-5" />} 
                  title="Zone de couverture" 
                  value={user.coverageZone} 
                />
                <InfoCard 
                  icon={<FiFlag className="w-5 h-5" />} 
                  title="Langues" 
                  value={user.languages} 
                />
                <InfoCard 
                  icon={<FiCalendar className="w-5 h-5" />} 
                  title="Disponibilité" 
                  value={
                    user.availability ? (
                      <div className="whitespace-pre-wrap">{user.availability}</div>
                    ) : "-"
                  }
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-indigo-500">
                <div className="flex items-center gap-2 mb-4">
                  <FiInfo className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-gray-800">À propos de moi</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{user.bio || "Aucune bio fournie"}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ 
  icon, 
  title, 
  value 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: React.ReactNode 
}) => (
  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-indigo-100 transition-colors duration-200">
    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">{icon}</div>
    <div className="flex-1">
      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h4>
      <div className="mt-1 text-lg text-gray-800 font-medium">
        {value || "-"}
      </div>
    </div>
  </div>
);

export default ProfileDetailsPage;