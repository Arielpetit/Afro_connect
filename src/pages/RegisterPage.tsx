import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { getFirestore, collection, addDoc, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import { FiUploadCloud } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { auth } from '../firebase';

const expertiseOptions = [
  "Courtier hypothécaire",
  "Agent immobilier",
  "Notaire",
  "Inspecteur en bâtiment",
  "Opérateur agréé",
  "Entreprise de déménagement",
  "Entrepreneur général",
  "Autre (préciser)"
];

const coverageZones = [
  "Alberta",
  "Colombie-Britannique",
  "Île-du-Prince-Édouard",
  "Manitoba",
  "Nouveau-Brunswick",
  "Nouvelle-Écosse",
  "Nunavut",
  "Ontario",
  "Québec",
  "Saskatchewan",
  "Terre-Neuve-et-Labrador",
  "Territoires du Nord-Ouest",
  "Yukon"
];

const languages = ["Français", "Anglais", "Espagnol", "Allemand", "Italien", "Portugais", "Arabe", "Chinois", "Russe", "Japonais", "Néerlandais"];

const RegisterPage = () => {
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);
  const [docId, setDocId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    coverageZone: "",
    languages: "",
    availability: "",
    experience: "",
    projectsCompleted: "",
    company: "",
    rate: 0,
    expertise: "",
    bio: "",
    status: "pending",
    profilePicture: null as File | string | null,
    businessCard: null as File | string | null,
    licenseCertification: null as File | string | null,
    professionalPermitNumber: "",
    identityCard: null as File | string | null,
    userId: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const db = getFirestore();

// Update the useEffect to preserve existing files
useEffect(() => {
  const checkExistingRegistration = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "users"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      setDocId(querySnapshot.docs[0].id);
      setEditMode(true);
      setFormData(prev => ({
        ...prev,
        ...docData,
        userId: user.uid,
        status: "pending", // Always reset to pending when editing
        // Convert string URLs back to file objects if needed
        profilePicture: docData.profilePicture || null,
        businessCard: docData.businessCard || null,
        licenseCertification: docData.licenseCertification || null,
        identityCard: docData.identityCard || null
      }));
    }
  };

  checkExistingRegistration();
}, [db]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let profilePictureUrl = typeof formData.profilePicture === 'string' ? formData.profilePicture : "";
      let businessCardUrl = typeof formData.businessCard === 'string' ? formData.businessCard : "";
      let licenseCertificationUrl = typeof formData.licenseCertification === 'string' ? formData.licenseCertification : "";
      let identityCardUrl = typeof formData.identityCard === 'string' ? formData.identityCard : "";

      if (formData.profilePicture instanceof File) {
        profilePictureUrl = await convertToBase64(formData.profilePicture);
      }
      if (formData.businessCard instanceof File) {
        businessCardUrl = await convertToBase64(formData.businessCard);
      }
      if (formData.licenseCertification instanceof File) {
        licenseCertificationUrl = await convertToBase64(formData.licenseCertification);
      }
      if (formData.identityCard instanceof File) {
        identityCardUrl = await convertToBase64(formData.identityCard);
      }

      const professionalData = {
        ...formData,
        profilePicture: profilePictureUrl,
        businessCard: businessCardUrl,
        licenseCertification: licenseCertificationUrl,
        identityCard: identityCardUrl,
        userType: "professional",
        experience: Number(formData.experience),
        projectsCompleted: Number(formData.projectsCompleted),
        userId: auth.currentUser?.uid,
        status: "pending", // Force status to pending on every submission
        updatedAt: new Date(),
      };
  

      if (editMode && docId) {
        await updateDoc(doc(db, "users", docId), professionalData);
      } else {
        await addDoc(collection(db, "users"), professionalData);
      }
  
      toast.success(editMode 
        ? "Profile updated! Waiting for admin approval." 
        : "Registration successful! Waiting for approval");
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
      
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
      <motion.div
        className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {editMode ? "Modifier l'inscription" : "Inscription Professionnelle"}
        </h2>

        {/* Rest of the form remains the same */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Personal Information Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l’entreprise / Nom du professionnel *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse e-mail *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de téléphone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo de Profil
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                {formData.profilePicture ? (
                  <span className="text-indigo-600">Image sélectionnée: {formData.profilePicture.name}</span>
                ) : (
                  <div className="flex flex-col items-center">
                    <FiUploadCloud className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-gray-500">Cliquez pour télécharger</span>
                  </div>
                )}
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          {/* Professional Information Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse physique *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site web (si disponible)
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://votresite.com"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zone de couverture *
              </label>
              <select
                name="coverageZone"
                value={formData.coverageZone}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Sélectionnez votre zone</option>
                {coverageZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Langues parlées
              </label>
              <select
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Sélectionnez votre Langue</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disponibilité (jours et heures de service)
              </label>
              <textarea
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                placeholder="Ex: Lundi: 9h-17h, Mardi: 9h-17h, etc."
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expertise *
              </label>
              <select
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select your expertise</option>
                {expertiseOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Années d'expérience
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Projets réalisés
                </label>
                <input
                  type="number"
                  name="projectsCompleted"
                  value={formData.projectsCompleted}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  min="0"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description des services offerts (max. 250 mots) *
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32"
                required
              />
            </div>
          </div>

          {/* Documents Section */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Documents et références</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carte d’affaires (PDF/JPG/PNG)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                  {formData.businessCard ? (
                    <span className="text-indigo-600">Fichier sélectionné: {formData.businessCard.name}</span>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FiUploadCloud className="w-6 h-6 text-gray-400 mb-2" />
                      <span className="text-gray-500">Cliquez pour télécharger</span>
                    </div>
                  )}
                  <input
                    type="file"
                    name="businessCard"
                    onChange={handleChange}
                    className="hidden"
                    accept=".pdf,.jpg,.png"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Licence / Certification 
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                  {formData.licenseCertification ? (
                    <span className="text-indigo-600">Fichier sélectionné: {formData.licenseCertification.name}</span>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FiUploadCloud className="w-6 h-6 text-gray-400 mb-2" />
                      <span className="text-gray-500">Cliquez pour télécharger</span>
                    </div>
                  )}
                  <input
                    type="file"
                    name="licenseCertification"
                    onChange={handleChange}
                    className="hidden"
                    accept=".pdf,.jpg,.png"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de permis professionnel (si applicable)
                </label>
                <input
                  type="text"
                  name="professionalPermitNumber"
                  value={formData.professionalPermitNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carte d'identité (PDF/JPG/PNG)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                  {formData.identityCard ? (
                    <span className="text-indigo-600">Fichier sélectionné: {formData.identityCard.name}</span>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FiUploadCloud className="w-6 h-6 text-gray-400 mb-2" />
                      <span className="text-gray-500">Cliquez pour télécharger</span>
                    </div>
                  )}
                  <input
                    type="file"
                    name="identityCard"
                    onChange={handleChange}
                    className="hidden"
                    accept=".pdf,.jpg,.png"
                  />
                </label>
              </div>
            </div>
          </div>

 {/* Submit Button */}
 <button
            type="submit"
            className="md:col-span-2 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mt-4"
            disabled={loading}
          >
            {loading ? "Enregistrement..." : editMode ? "Mettre à jour" : "Finaliser l'inscription"}
          </button>
        </form>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;