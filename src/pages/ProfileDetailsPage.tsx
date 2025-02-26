/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { db, doc, getDoc } from "../firebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiClock, FiInfo,
  FiGlobe, FiMap, FiFlag, FiCalendar, FiCheckCircle, FiStar,
  FiSend, FiTrash2, FiFile, FiFileText, FiDownload
} from "react-icons/fi";
import { runTransaction, collection, deleteDoc, updateDoc } from "firebase/firestore";
import {Rating} from "../components/rating";
import { toast } from "react-toastify";

const ProfileDetailsPage = () => {
  const { userId } = useParams();
  const location = useLocation();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [submittingRating, setSubmittingRating] = useState(false);
  const [isAdminView] = useState(location.state?.fromAdmin || false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", userId!);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data();
          // Redirect non-admin users trying to view pending profiles
          if (!isAdminView && userData.status !== 'approved') {
            navigate('/');
            return;
          }
          setUser({ id: docSnap.id, ...userData });
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
  }, [userId, navigate, isAdminView]);

   // Add approval and deletion handlers
   const handleApprove = async () => {
    try {
      const userRef = doc(db, "users", userId!);
      await updateDoc(userRef, { status: 'approved' });
      toast.success("Professional approved successfully");
      navigate('/admin'); // Redirect back to admin dashboard
    } catch (error) {
      console.error("Error approving professional: ", error);
      toast.error("Failed to approve professional");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", userId!));
      toast.success("Professional deleted successfully");
      navigate('/admin'); // Redirect back to admin dashboard
    } catch (error) {
      console.error("Error deleting professional: ", error);
      toast.error("Failed to delete professional");
    }
  };
  
  const handleRate = async (rating: number) => {
    setSubmittingRating(true);
    
    try {
      const professionalRef = doc(db, "users", userId!);
      const ratingsRef = collection(db, `users/${userId}/ratings`);

      await runTransaction(db, async (transaction) => {
        const professionalDoc = await transaction.get(professionalRef);
        
        if (!professionalDoc.exists()) throw new Error("Professional not found");

        const data = professionalDoc.data();
        const currentTotal = data.totalRatings || 0;
        const currentCount = data.numberOfRatings || 0;
        
        transaction.update(professionalRef, {
          totalRatings: currentTotal + rating,
          numberOfRatings: currentCount + 1
        });

        transaction.set(doc(ratingsRef), {
          rating,
          timestamp: new Date(),
          userAgent: navigator.userAgent
        });
      });

      // Refresh user data
      const userRef = doc(db, "users", userId!);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUser({ id: docSnap.id, ...docSnap.data() });
      }
    } catch (error) {
      console.error("Rating error:", error);
      alert("Erreur lors de la notation");
    } finally {
      setSubmittingRating(false);
    }
  };

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
        {/* Profile Header */}
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
            <div className="mt-4">
              <p className="text-indigo-100">{user.expertise}</p>
              <div className="mt-2 flex justify-center items-center gap-2">
                <FiStar className="text-yellow-400" />
                <span className="text-white font-medium">
                  {user.numberOfRatings > 0 
                    ? (user.totalRatings / user.numberOfRatings).toFixed(1)
                    : "Nouveau"}
                </span>
                <span className="text-indigo-200 text-sm">
                  ({user.numberOfRatings} avis)
                </span>
              </div>
            </div>
          )}
        </div>
          {/* Add admin controls */}
          {isAdminView && (
        <div className="bg-gray-50 p-6 border-t border-b border-gray-200">
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleApprove}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FiCheckCircle className="w-5 h-5" />
              Approve Professional
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FiTrash2 className="w-5 h-5" />
              Delete Professional
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-indigo-500">
        <div className="flex items-center gap-2 mb-4">
          <FiFile className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-semibold text-gray-800">Verification Documents</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard 
            icon={<FiFile className="w-5 h-5" />}
            title="Business Card"
            value={user.businessCard ? (
              <div className="flex items-center gap-3">
                <a 
                  href={user.businessCard} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  View Business Card
                </a>
                <a 
                  href={user.businessCard} 
                  download 
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm font-medium"
                >
                  <FiDownload className="w-4 h-4" /> Download
                </a>
              </div>
            ) : "Not uploaded"}
          />
          <InfoCard 
            icon={<FiFile className="w-5 h-5" />}
            title="License/Certification"
            value={user.licenseCertification ? (
              <div className="flex items-center gap-3">
                <a 
                  href={user.licenseCertification} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  View License
                </a>
                <a 
                  href={user.licenseCertification} 
                  download 
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm font-medium"
                >
                  <FiDownload className="w-4 h-4" /> Download
                </a>
              </div>
            ) : "Not uploaded"}
          />
          <InfoCard 
            icon={<FiFileText className="w-5 h-5" />}
            title="Professional Permit Number"
            value={user.professionalPermitNumber || "Not provided"}
          />
          <InfoCard 
            icon={<FiFile className="w-5 h-5" />}
            title="Identity Card"
            value={user.identityCard ? (
              <div className="flex items-center gap-3">
                <a 
                  href={user.identityCard} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  View ID Card
                </a>
                <a 
                  href={user.identityCard} 
                  download 
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm font-medium"
                >
                  <FiDownload className="w-4 h-4" /> Download
                </a>
              </div>
            ) : "Not uploaded"}
          />
        </div>
      </div>
  </div>
  
)}

        {/* Profile Content */}
        <div className="p-8 space-y-6">
          {/* Rating Section */}
          {user.userType === "professional" && (
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-indigo-500">
              <div className="flex items-center gap-2 mb-4">
                <FiStar className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-800">Évaluation</h3>
              </div>
              <Rating
                initialRating={user.numberOfRatings > 0 
                  ? user.totalRatings / user.numberOfRatings 
                  : 0}
                numberOfRatings={user.numberOfRatings || 0}
                onRate={handleRate}
                isSubmitting={submittingRating}
              />
            </div>
          )}

          {/* Core Information */}
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

          {/* Professional Details */}
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

              {/* Bio Section */}
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-indigo-500">
                <div className="flex items-center gap-2 mb-4">
                  <FiInfo className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-gray-800">À propos de moi</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{user.bio || "Aucune bio fournie"}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-indigo-500 ">
                <button
                  onClick={() => navigate("/contacts/:{userId}", { state: { userId: user.id } })}
                  className="bg-white text-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <FiSend className="w-5 h-5" />
                  Contact
                </button>
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