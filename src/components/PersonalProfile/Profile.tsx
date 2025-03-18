import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import {
  User,
  ShieldCheck,
  Clock,
  CalendarDays,
  MailCheck,
  LogOut,
  Link2,
  Copy,
  Gift,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

export function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [professionalData, setProfessionalData] = useState<any>(null);
  const [loadingProfessional, setLoadingProfessional] = useState(true);
  const [referralLink, setReferralLink] = useState("");
  const [referralPoints, setReferralPoints] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/signup");
      } else {
        // Generate referral link
        const baseUrl = window.location.origin;
        setReferralLink(`${baseUrl}/signup?ref=${user.uid}`);

        // Fetch professional data
        const db = getFirestore();
        const q = query(
          collection(db, "users"),
          where("userId", "==", user.uid),
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setProfessionalData(userData);
          setReferralPoints(userData.referralPoints || 0);
        }
        setLoadingProfessional(false);
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied to clipboard!", {
        position: "bottom-center",
        autoClose: 2000,
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const shareOnWhatsApp = () => {
    const text = `Rejoignez notre plateforme avec mon lien de parrainage! ${referralLink}`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-blue-700 flex items-center justify-center">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {user.displayName || "Bienvenue Utilisateur"}
                  </h1>
                  <p className="text-blue-100">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-5 py-2.5 rounded-lg transition-all duration-200"
              >
                <LogOut className="h-5 w-5 text-white" />
                <span className="text-white font-medium">Déconnexion</span>
              </button>
            </div>
          </div>

          {/* Account Details */}
          <div className="px-6 py-8 space-y-8">
            {/* Account Status Section */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h2 className="flex items-center text-lg font-semibold text-blue-900 mb-4">
                <ShieldCheck className="h-6 w-6 mr-2 text-blue-600" />
                Statut du Compte
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 bg-white p-4 rounded-lg">
                  <MailCheck className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">
                      Vérification d'E-mail
                    </p>
                    <p
                      className={`font-medium ${user.emailVerified ? "text-green-600" : "text-orange-600"}`}
                    >
                      {user.emailVerified
                        ? "Vérifié"
                        : "En Attente de Vérification"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white p-4 rounded-lg">
                  <CalendarDays className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Membre Depuis</p>
                    <p className="font-medium text-gray-900">
                      {new Date(user.metadata.creationTime).toLocaleDateString(
                        "fr-FR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white p-4 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">
                      Statut Professionnel
                    </p>
                    {loadingProfessional ? (
                      <p className="font-medium text-gray-500">Chargement...</p>
                    ) : (
                      <>
                        <p
                          className={`font-medium ${
                            professionalData?.status === "pending"
                              ? "text-orange-600"
                              : professionalData?.status === "approved"
                                ? "text-green-600"
                                : "text-gray-600"
                          }`}
                        >
                          {professionalData
                            ? professionalData.status === "pending"
                              ? "En Attente d'Approbation"
                              : professionalData.status === "approved"
                                ? "Approuvé"
                                : "Non Enregistré"
                            : "Non Enregistré"}
                        </p>
                        {professionalData?.status === "pending" ||
                          (professionalData?.status === "approved" && (
                            <button
                              onClick={() =>
                                navigate("/register", {
                                  state: {
                                    editMode: true,
                                    existingData: professionalData,
                                  },
                                })
                              }
                              className="text-blue-600 text-sm mt-1 hover:underline"
                            >
                              Modifier l'Inscription
                            </button>
                          ))}
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white p-4 rounded-lg">
                  <Gift className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Points de Parrainage</p>
                    <p className="font-medium text-purple-600">
                      {referralPoints} points
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Referral Section */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h2 className="flex items-center text-lg font-semibold text-purple-900 mb-4">
                <Link2 className="h-6 w-6 mr-2 text-purple-600" />
                Programme de Parrainage
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">Votre lien de parrainage</p>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-mono text-gray-700 truncate">
                      {referralLink}
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="ml-2 p-2 hover:bg-gray-200 rounded-lg"
                    >
                      <Copy className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="mt-4 flex space-x-3">
                  <button
                      onClick={shareOnWhatsApp}
                      className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      <FaWhatsapp className="h-5 w-5" />
                      <span>Partager sur WhatsApp</span>
                    </button>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Comment ça marche?</p>
                  <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700">
                    <li>Partagez votre lien de parrainage avec vos amis</li>
                    <li>Lorsqu'ils s'inscrivent avec votre lien, vous gagnez 10 points</li>
                    <li>Les points peuvent être échangés contre des récompenses</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                <Clock className="h-6 w-6 mr-2 text-gray-600" />
                Activité Récente
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Dernière Connexion</p>
                  <p className="font-medium text-gray-900">
                    {new Date(user.metadata.lastSignInTime).toLocaleString(
                      "fr-FR",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      },
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-red-50 rounded-xl p-6">
              <h2 className="flex items-center text-lg font-semibold text-red-900 mb-4">
                <ShieldCheck className="h-6 w-6 mr-2 text-red-600" />
                Sécurité
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Mot de Passe</p>
                  <p className="font-medium text-gray-900">••••••••</p>
                </div>
                <button className="w-full text-left bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                  <p className="text-sm text-gray-500">
                    Authentification à Deux Facteurs
                  </p>
                  <p className="font-medium text-blue-600">
                    Ajouter une sécurité supplémentaire →
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}