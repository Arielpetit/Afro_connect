import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { getFirestore, collection, addDoc, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { auth } from '../firebase';
import PersonalInfoForm from "../components/Registration/PersonalInfoForm";
import ProfessionalInfoForm from "../components/Registration/ProfessionalInfoForm";
import DocumentsSection from "../components/Registration/DocumentsSection";
import ExpertiseSelection from "../components/Registration/ExpertiseSelection";
import ExperienceProjects from "../components/Registration/ExperienceProjects";

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
          status: "pending",
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
        status: "pending",
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

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <PersonalInfoForm formData={formData} handleChange={handleChange} />
          
          <div className="space-y-4">
            <ProfessionalInfoForm 
              formData={formData} 
              handleChange={handleChange} 
              setFormData={setFormData} 
            />
            <ExpertiseSelection formData={formData} handleChange={handleChange} />
            <ExperienceProjects formData={formData} handleChange={handleChange} />
            
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

          <DocumentsSection formData={formData} handleChange={handleChange} />

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