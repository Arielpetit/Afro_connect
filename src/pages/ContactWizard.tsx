/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { FiCheckCircle, FiArrowLeft, FiUser, FiMail, FiXCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const PROFESSIONAL_TEMPLATE = import.meta.env.VITE_EMAILJS_PROFESSIONAL_TEMPLATE;
const CLIENT_TEMPLATE = import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface WizardProps {
  specialty: string;
  onBack: () => void;
}

interface Professional {
  id: string;
  displayName: string;
  email: string;
  bio?: string;
  photoURL?: string;
}

const user = auth.currentUser;

const locations = [
    "🇨🇦 Canada","🏔️ Alberta", "🌲 Colombie-Britannique", "🏝️ Île-du-Prince-Édouard",
    "🌾 Manitoba", "🦞 Nouveau-Brunswick", "🌊 Nouvelle-Écosse", "❄️ Nunavut",
    "🏙️ Ontario", "🍁 Québec", "🌻 Saskatchewan", "🎣 Terre-Neuve-et-Labrador",
    "🌌 Territoires du Nord-Ouest", "⛰️ Yukon", 
    "🏕️ Whitehorse", "🏔️ Banff", "🌆 Toronto", "🎭 Montréal", "🎡 Vancouver",
    "🏘️ Winnipeg", "🏯 Ottawa", "🌁 Halifax", "🛶 Charlottetown"
  ];
  
  const languages = [
    "🇫🇷 Français", "🇬🇧 Anglais", "🇭🇹 Créole", "🇸🇳 Wolof", "🇨🇩 Lingala",
    "🌍 Dumois", "🇨🇩 Swahili", "🇲🇱 Bambara", "🇳🇬 Yoruba", "🇳🇬 Hausa",
    "🇬🇭 Twi", "🇳🇬 Igbo", "🇹🇬 Ewé", "🇧🇯 Fon", "🇨🇬 Kikongo",
    "🇬🇲 Mandinka", "🇿🇦 Zulu", "🇿🇦 Xhosa", "🇱🇸 Sesotho", "🌍 Fula",
    "🇿🇼 Shona", "🇸🇱 Krio", "🇭🇳 Garifuna", "🇦🇼 Papiamento",
    "🌍 Saramaccan", "🌍 Maroon Creole"
  ];
  
  

export const ContactWizard: React.FC<WizardProps> = ({ specialty, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty,
    location: "",
    language: "",
    problem: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [matchedProfessionals, setMatchedProfessionals] = useState<Professional[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  const handleSelect = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    if (!user.email) {
      navigate("/signup");
      return;
    }

    setLoading(true);
    try {
      const db = getFirestore();
      await addDoc(collection(db, "contactRequests"), {
        ...formData,
        email: user.email,
        timestamp: new Date(),
      });

      const professionals = await findMatchingProfessionals();
      if (professionals.length === 0) {
        setNoMatch(true);
        return;
      }

      setMatchedProfessionals(professionals);
      await sendEmails(professionals);
      setSubmitted(true);
      setTimeout(onBack, 10000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

    const removeEmojis = (text) => text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "").trim();

    const findMatchingProfessionals = async () => {
    const db = getFirestore();

    const cleanLocation = removeEmojis(formData.location);
    const cleanLanguage = removeEmojis(formData.language);

    const q = query(
        collection(db, "users"),
        where("expertise", "==", formData.specialty),
        where("coverageZone", "==", cleanLocation),
        where("languages", "==", cleanLanguage)

    );

    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      displayName: doc.data().displayName,
      email: doc.data().email,
      bio: doc.data().bio,
      photoURL: doc.data().photoURL
    }));
  };

  // Update sendEmails function
  const sendEmails = async (professionals: Professional[]) => {
    if (!user?.email) return;
  
    const cleanLocation = removeEmojis(formData.location);
    const cleanLanguage = removeEmojis(formData.language);
  
    try {
      const professionalEmails = professionals.map(pro => 
        emailjs.send(SERVICE_ID, PROFESSIONAL_TEMPLATE, {
          to_email: pro.email,
          client_email: user.email,
          specialty: formData.specialty,
          location: cleanLocation,
          language: cleanLanguage,
          problem: formData.problem,
          professional_name: pro.displayName,
        })
      );
  
      const clientEmail = emailjs.send(SERVICE_ID, CLIENT_TEMPLATE, {
        to_email: user.email,
        specialty: formData.specialty,
        professionals: professionals.map(pro => pro.displayName).join(", "),
        problem: formData.problem
      });
  
      await Promise.all([...professionalEmails, clientEmail]);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  };

  const ProgressBar = () => (
    <div className="w-full mb-6 md:mb-8">
      <div className="relative pt-4 md:pt-6">
        <div className="absolute top-6 md:top-8 left-0 right-0 h-1.5 bg-emerald-100 rounded-full"></div>
        <div 
          className="absolute top-6 md:top-8 left-0 h-1.5 bg-emerald-500 rounded-full transition-all duration-500" 
          style={{ width: `${(currentStep - 1) * 33.33}%` }}
        ></div>
        <div className="flex justify-between">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className="relative z-10">
              <motion.div 
                className={`w-6 h-6 md:w-8 md:h-8 text-sm md:text-base rounded-full flex items-center justify-center ${
                  step <= currentStep ? 'bg-emerald-500 text-white shadow-lg' : 'bg-emerald-100 text-emerald-500'
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {step}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-8 mt-4 md:mt-8 mx-2 md:mx-auto">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-6 md:py-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
          >
            <FiCheckCircle className="w-12 h-12 md:w-16 md:h-16 text-emerald-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Demande envoyée avec succès! Nous allons vous contacter dans les plus brefs delais</h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            {matchedProfessionals.length} professionnel(s) ont été informés :
          </p>
          
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {matchedProfessionals.map((pro, index) => (
              <motion.div
                key={pro.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-emerald-50 rounded-lg p-4 text-left"
              >
                <div className="flex items-center gap-4">
                  {pro.photoURL ? (
                    <img 
                      src={pro.photoURL} 
                      alt={pro.displayName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <FiUser className="text-emerald-500 w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-800">{pro.displayName}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <FiMail className="inline-block" />
                      {pro.email}
                    </p>
                    {pro.bio && (
                      <p className="text-sm text-gray-600 mt-2">{pro.bio}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : noMatch ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <FiXCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Aucun professionnel trouvé</h2>
          <p className="text-gray-600 mb-6">
            Aucun professionnel ne correspond actuellement à vos critères.
          </p>
          <button
            onClick={() => {
              setNoMatch(false);
              setCurrentStep(1);
            }}
            className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors font-medium"
          >
            Réessayer
          </button>
        </motion.div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <motion.button
              onClick={currentStep === 1 ? onBack : handlePrevious}
              className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2 group text-sm md:text-base"
              whileHover={{ x: -2 }}
            >
              <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
              Retour
            </motion.button>
            <div className="text-gray-500 text-sm">Étape {currentStep}/4</div>
          </div>

          <ProgressBar />

          <AnimatePresence mode='wait'>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">Spécialité sélectionnée</h3>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-emerald-50 rounded-xl border border-emerald-200"
                  >
                    <p className="text-emerald-700 font-medium">{formData.specialty}</p>
                  </motion.div>
                  <motion.button
                    onClick={handleNext}
                    className="w-full bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continuer
                  </motion.button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">Sélectionnez la région où vous souhaitez que le professionnel soit disponible.</h3>
                    {/* Animated Image */}
                    <div className="flex justify-center">
                        <img 
                            src="/location.jpg" 
                            alt="Language Selection" 
                            className="w-50 h-48 animate-fade-in" // Adjust size as needed
                        />
                    </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {locations.map(location => (
                      <motion.button
                        key={location}
                        onClick={() => handleSelect('location', location)}
                        className={`p-2 md:p-3 text-xs md:text-sm rounded-lg border transition-all ${
                          formData.location === location 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 hover:border-emerald-300 bg-white'
                        }`}
                        whileHover={{ y: -2 }}
                      >
                        {location}
                      </motion.button>
                    ))}
                  </div>
                  <motion.button
                    onClick={handleNext}
                    disabled={!formData.location}
                    className="w-full bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continuer
                  </motion.button>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">Langue de communication que vous aimerez que le professionel parle</h3>
                      {/* Animated Image */}
                    <div className="flex justify-center">
                    <img 
                        src="/language.jpg" 
                        alt="Language Selection" 
                        className="w-50 h-48 animate-fade-in" // Adjust size as needed
                    />
                    </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {languages.map(language => (
                      <motion.button
                        key={language}
                        onClick={() => handleSelect('language', language)}
                        className={`p-2 md:p-3 text-xs md:text-sm rounded-lg border transition-all ${
                          formData.language === language 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 hover:border-emerald-300 bg-white'
                        }`}
                        whileHover={{ y: -2 }}
                      >
                        {language}
                      </motion.button>
                    ))}
                  </div>
                  <motion.button
                    onClick={handleNext}
                    disabled={!formData.language}
                    className="w-full bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continuer
                  </motion.button>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">Fournissez une brève description de votre situation.</h3>
                    {/* Animated Image */}
                    <div className="flex justify-center">
                        <img 
                            src="/description.jpg" 
                            alt="Language Selection" 
                            className="w-50 h-48 animate-fade-in" // Adjust size as needed
                        />
                    </div>
                  <motion.textarea
                    name="problem"
                    value={formData.problem}
                    onChange={(e) => handleSelect('problem', e.target.value)}
                    placeholder="Décrivez votre situation en détail..."
                    className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none h-40 text-sm md:text-base"
                    required
                    whileFocus={{ scale: 1.005 }}
                  />
                  <motion.button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? "Envoi en cours..." : "Envoyer la demande"}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};