/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { FiUploadCloud } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import ReactSelect, { MultiValue } from "react-select";
import { useTranslation } from 'react-i18next';

// Updated expertiseOptions to match ReactSelect format
const expertiseOptions = [
  { value: "Avocats spécialisés en immobilier", label: "Avocats spécialisés en immobilier" },
  { value: "Comptables", label: "Comptables" },
  { value: "Comptables CPA", label: "Comptables CPA" },
  { value: "Conseiller en sécurité financière", label: "Conseiller en sécurité financière" },
  { value: "Courtier hypothécaire", label: "Courtier hypothécaire" },
  { value: "Courtier immobilier", label: "Courtier immobilier" },
  { value: "Entrepreneur général", label: "Entrepreneur généraux" },
  { value: "Électriciens", label: "Électriciens" },
  { value: "Évaluateurs agréés", label: "Évaluateurs agréés" },
  { value: "Fiscalistes", label: "Fiscalistes" },
  { value: "Hommes à tout faire (Handymen)", label: "Hommes à tout faire (Handymen)" },
  { value: "Inspecteur en bâtiment", label: "Inspecteurs en bâtiment" },
  { value: "Notaire", label: "Notaire" },
  { value: "Plombiers", label: "Plombiers" },
  { value: "Spécialiste en rénovation", label: "Spécialistes en rénovation" },
];



const coverageZones = [
  { value: "Canada", label: "Canada" },
  { value: "Alberta", label: "Alberta" },
  { value: "Colombie-Britannique", label: "Colombie-Britannique" },
  { value: "Île-du-Prince-Édouard", label: "Île-du-Prince-Édouard" },
  { value: "Manitoba", label: "Manitoba" },
  { value: "Nouveau-Brunswick", label: "Nouveau-Brunswick" },
  { value: "Nouvelle-Écosse", label: "Nouvelle-Écosse" },
  { value: "Ontario", label: "Ontario" },
  { value: "Québec", label: "Québec" },
  { value: "Saskatchewan", label: "Saskatchewan" },
  { value: "Terre-Neuve-et-Labrador", label: "Terre-Neuve-et-Labrador" },
  { value: "Nunavut", label: "Nunavut" },
  { value: "Territoires du Nord-Ouest", label: "Territoires du Nord-Ouest" },
  { value: "Yukon", label: "Yukon" },
];

const languages = [
  { value: "Français", label: "Français" },
  { value: "Anglais", label: "Anglais" },
  { value: "Créole", label: "Créole" },
  { value: "Wolof", label: "Wolof" },
  { value: "Lingala", label: "Lingala" },
  { value: "Dumois", label: "Dumois" },
  { value: "Swahili", label: "Swahili" },
  { value: "Bambara", label: "Bambara" },
  { value: "Yoruba", label: "Yoruba" },
  { value: "Hausa", label: "Hausa" },
  { value: "Twi", label: "Twi" },
  { value: "Igbo", label: "Igbo" },
  { value: "Ewé", label: "Ewé" },
  { value: "Fon", label: "Fon" },
  { value: "Kikongo", label: "Kikongo" },
  { value: "Mandinka", label: "Mandinka" },
  { value: "Zulu", label: "Zulu" },
  { value: "Xhosa", label: "Xhosa" },
  { value: "Sesotho", label: "Sesotho" },
  { value: "Fula", label: "Fula" },
  { value: "Shona", label: "Shona" },
  { value: "Krio", label: "Krio" },
  { value: "Garifuna", label: "Garifuna" },
  { value: "Papiamento", label: "Papiamento" },
  { value: "Saramaccan", label: "Saramaccan" },
  { value: "Maroon Creole", label: "Maroon Creole" },
];

const SignupPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    coverageZone: "",
    languages: [] as Array<{ value: string; label: string }>,
    availability: "",
    experience: "",
    projectsCompleted: "",
    company: "",
    services: "",
    expertise: [] as Array<{ value: string; label: string }>, // Changed to array
    bio: "",
    status: "pending",
    numeroPermis: "",
    profilePicture: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const db = getFirestore();

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: "3rem",
      border: "1px solid #e5e7eb",
      borderRadius: "0.5rem",
      "&:hover": { borderColor: "#6366f1" },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#e0e7ff",
      borderRadius: "0.375rem",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#3730a3",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#9ca3af",
    }),
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;

    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCoverageZoneChange = (selectedOption: { value: string; label: string } | null) => {
    setFormData((prev) => ({
      ...prev,
      coverageZone: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleLanguagesChange = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
    setFormData((prev) => ({
      ...prev,
      languages: [...selectedOptions],
    }));
  };

  // New handler for expertise
  const handleExpertiseChange = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
    setFormData((prev) => ({
      ...prev,
      expertise: [...selectedOptions],
    }));
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
      let profilePictureUrl = "";
      if (formData.profilePicture) {
        profilePictureUrl = await convertToBase64(formData.profilePicture);
      }

      const professionalData = {
        ...formData,
        coverageZone: formData.coverageZone,
        languages: formData.languages.map((lang) => lang.value),
        expertise: formData.expertise.map((exp) => exp.value), // Map expertise to values
        profilePicture: profilePictureUrl,
        userType: "professional",
        experience: Number(formData.experience),
        projectsCompleted: Number(formData.projectsCompleted),
        status: "pending",
        createdAt: new Date(),
      };

      await addDoc(collection(db, "users"), professionalData);

      toast.success("Inscription réussie !");
      navigate("/profile");
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      toast.error(
        `Échec de l'inscription : ${error instanceof Error ? error.message : "Erreur inconnue"}`
      );
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
          {t('signup.title')}
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('signup.form.companyName')} *
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
                {t('signup.form.email')} *
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
                {t('signup.form.phone')} *
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
                {t('signup.form.licenseNumber')} *
              </label>
              <input
                type="text"
                name="numeroPermis"
                value={formData.numeroPermis}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('signup.form.profilePicture')} *
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                {formData.profilePicture ? (
                  <span className="text-indigo-600">{t('signup.form.imageSelected')}</span>
                ) : (
                  <div className="flex flex-col items-center">
                    <FiUploadCloud className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-gray-500">{t('signup.form.clickToUpload')}</span>
                  </div>
                )}
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                  required
                />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('signup.form.address')} *
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
                {t('signup.form.website')}
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('signup.form.coverageZone')} *
              </label>
              <ReactSelect
                options={coverageZones}
                value={coverageZones.find((option) => option.value === formData.coverageZone)}
                onChange={handleCoverageZoneChange}
                placeholder={t('signup.form.selectRegion')}
                styles={customSelectStyles}
                classNamePrefix="react-select"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('signup.form.languages')}
              </label>
              <ReactSelect
                options={languages}
                isMulti
                value={formData.languages}
                onChange={handleLanguagesChange}
                placeholder={t('signup.form.selectLanguages')}
                styles={customSelectStyles}
                classNamePrefix="react-select"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('signup.form.expertise')} *
              </label>
              <ReactSelect
                options={expertiseOptions}
                isMulti
                value={formData.expertise}
                onChange={handleExpertiseChange}
                placeholder={t('signup.form.selectExpertise')}
                styles={customSelectStyles}
                classNamePrefix="react-select"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('signup.form.availability')}
              </label>
              <textarea
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                placeholder={t('signup.form.availabilityPlaceholder')}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('signup.form.experience')}
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
                  {t('signup.form.completedProjects')}
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
                {t('signup.form.services')} *
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mt-4"
              disabled={loading}
            >
              {loading ? t('signup.form.submitting') : t('signup.form.submit')}
            </button>
          </div>
        </form>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;