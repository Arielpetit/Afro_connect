/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { db, doc, getDoc, getDocs } from "../firebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiClock, FiGlobe, FiMap, FiFlag, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { runTransaction, collection, deleteDoc, updateDoc, orderBy, limit, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { InfoCard } from "../components/Professionaldetails/InfoCard";
import { AdminControls } from "../components/Professionaldetails/AdminControls";
import { RatingSection } from "../components/Professionaldetails/RatingSection";
import { ReviewsSection } from "../components/Professionaldetails/ReviewsSection";
import { ContactButton } from "../components/Professionaldetails/ContactButton";
import { BioSection } from "../components/Professionaldetails/BioSection";
import { ProfileHeader } from "../components/Professionaldetails/ProfileHeader";

const ProfileDetailsPage = () => {
  const { userId } = useParams();
  const location = useLocation();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [submittingRating, setSubmittingRating] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isAdminView] = useState(location.state?.fromAdmin || false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", userId!);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data();
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

    const fetchReviews = async () => {
      try {
        const ratingsRef = collection(db, `users/${userId}/ratings`);
        const q = query(ratingsRef, orderBy('timestamp', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        const reviewsData = querySnapshot.docs
          .filter(doc => {
            const data = doc.data();
            return data.comment && data.comment.trim() !== '';
          })
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate()
          }));
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (userId) {
      fetchUserData();
      fetchReviews();
    }
  }, [userId, navigate, isAdminView]);

  const handleApprove = async () => {
    try {
      const userRef = doc(db, "users", userId!);
      await updateDoc(userRef, { status: 'approved' });
      toast.success("Professional approved successfully");
      navigate('/admin');
    } catch (error) {
      console.error("Error approving professional: ", error);
      toast.error("Failed to approve professional");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", userId!));
      toast.success("Professional deleted successfully");
      navigate('/admin');
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
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <ProfileHeader user={user} />

        {isAdminView && (
          <AdminControls
            user={user}
            handleApprove={handleApprove}
            handleDelete={handleDelete}
          />
        )}

        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          {user.userType === "professional" && (
            <RatingSection
              user={user}
              handleRate={handleRate}
              submittingRating={submittingRating}
            />
          )}

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <InfoCard icon={<FiUser className="w-5 h-5" />} title="Nom" value={user.name} />
            <InfoCard 
              icon={<FiMail className="w-5 h-5" />} 
              title="Email" 
              value={<span className="break-all">{user.email}</span>} 
            />
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <InfoCard 
                  icon={<FiGlobe className="w-5 h-5" />} 
                  title="Site Web" 
                  value={
                    user.website ? (
                      <a 
                        href={user.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline break-all"
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
                      <div className="whitespace-pre-wrap">{user.availability.join("\n")}</div>
                    ) : "-"
                  }
                />
              </div>

              <BioSection bio={user.bio} />
              <ContactButton onClick={() => navigate(`/contacts/${user.id}`)} />

              <ReviewsSection 
                reviews={reviews}
                userId={userId!}
                navigate={navigate}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsPage;