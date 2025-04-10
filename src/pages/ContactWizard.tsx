import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, addDoc, writeBatch, doc, increment } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { FiCheckCircle, FiArrowLeft, FiUser, FiRotateCw, FiRefreshCw, FiSearch, FiCopy } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// Environment variables for EmailJS configuration
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const PROFESSIONAL_TEMPLATE = import.meta.env.VITE_EMAILJS_PROFESSIONAL_TEMPLATE;
const CLIENT_TEMPLATE = import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const combinedSpecialties = [
  "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé",
  "Métiers spécialisés de la construction et de l'immobilier"
];
// Category-specific image mapping
const categoryImages = {
  "Courtier hypothécaire": "/courtier-hypothecaire.jpg",
  "Courtier immobilier": "/Agent_immobilier.jpg",
  "Notaire": "/notaire.jpg",
  "Constructeur": "/constructeur.jpg",
  "Évaluateurs agréés": "/Evaluateur_agree.jpg",
  "Inspecteur en bâtiment": "/Inspecteur_en_batiment.jpg",
  "Entrepreneur général": "/intrepreneur_general.jpg",
  "Comptable": "/Comptable.jpg",
  "Métiers spécialisés de la construction et de l'immobilier": "/Other.jpg",
  "Comptable CPA, Avocat fiscaliste spécialisé en immobilier, conseiller en sécurité financière spécialisé": "/cpa.jpg",
};



// Create a map of sub-specialties for each combined specialty
const subSpecialtiesMap = {
  [combinedSpecialties[0]]: [
    "Comptable CPA",
    "Avocat fiscaliste spécialisé en immobilier", 
    "Conseillers en sécurité financière"
  ],
  [combinedSpecialties[1]]: [
    "Électriciens",
    "Plombiers",
    "Hommes à tout faire (Handymen)"
  ]
};

// Props for the ContactWizard component
interface WizardProps {
  specialty: string;
  onBack: () => void;
}

// Interface for Professional data
export interface Professional {
  id: string;
  name: string;
  email: string;
  bio?: string;
  photoURL?: string;
  availability: string[];
  leadCount?: number;
  expertise?: string;
}

// Predefined options for location and language
const locations = [
  "🇨🇦 Canada",
  "🏔️ Alberta",
  "🌲 Colombie-Britannique",
  "🏝️ Île-du-Prince-Édouard",
  "🌾 Manitoba",
  "🦞 Nouveau-Brunswick",
  "🌊 Nouvelle-Écosse",
  "❄️ Nunavut",
  "🏙️ Ontario",
  "🍁 Québec",
  "🌻 Saskatchewan",
  "🎣 Terre-Neuve-et-Labrador",
  "🌌 Territoires du Nord-Ouest",
  "⛰️ Yukon"
];


const languages = [
  "🇫🇷 Français", "🇬🇧 Anglais", "🇭🇹 Créole", "🇸🇳 Wolof", "🇨🇩 Lingala",
  "🌍 Dumois", "🇨🇩 Swahili", "🇲🇱 Bambara", "🇳🇬 Yoruba", "🇳🇬 Hausa",
  "🇬🇭 Twi", "🇳🇬 Igbo", "🇹🇬 Ewé", "🇧🇯 Fon", "🇨🇬 Kikongo",
  "🇬🇲 Mandinka", "🇿🇦 Zulu", "🇿🇦 Xhosa", "🇱🇸 Sesotho", "🌍 Fula",
  "🇿🇼 Shona", "🇸🇱 Krio", "🇭🇳 Garifuna", "🇦🇼 Papiamento",
  "🌍 Saramaccan", "🌍 Maroon Creole"
];


// AvailabilityPicker component for selecting client availability
const AvailabilityPicker: React.FC<{
  availability: string[];
  setAvailability: (value: string[]) => void;
}> = ({ availability, setAvailability }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const addEntry = () => {
    if (!selectedDate || !fromTime || !toTime) return;
    const newEntry = `${selectedDate}: ${fromTime} - ${toTime}`;
    setAvailability([...availability, newEntry]);
    setSelectedDate("");
    setFromTime("");
    setToTime("");
  };

  const removeEntry = (index: number) => {
    const updated = availability.filter((_, i) => i !== index);
    setAvailability(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="flex-1 border rounded-lg p-2"
          min={new Date().toISOString().split('T')[0]}
        />
        <div className="flex gap-2 items-center">
          <span className="text-gray-500 whitespace-nowrap">De</span>
          <input
            type="time"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            className="flex-1 border rounded-lg p-2"
          />
          <span className="text-gray-500 whitespace-nowrap">à</span>
          <input
            type="time"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            className="flex-1 border rounded-lg p-2"
          />
        </div>
        <button
          onClick={addEntry}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 whitespace-nowrap"
        >
          Ajouter
        </button>
      </div>
      <ul className="space-y-2">
        {availability.map((entry, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
          >
            <span>{entry}</span>
            <button
              onClick={() => removeEntry(index)}
              className="text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main ContactWizard component
export const ContactWizard: React.FC<WizardProps> = ({ specialty, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty,
    location: "",
    language: "",
    problem: "",
    email: "",
    phoneNumber: "",
    availability: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [matchedProfessionals, setMatchedProfessionals] = useState<Professional[]>([]);
  const isCombinedSpecialty = combinedSpecialties.includes(specialty);
  const currentSubSpecialties = subSpecialtiesMap[specialty] || [];

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

    // Get the appropriate image for the current specialty
    const getCategoryImage = (categoryName: string) => {
      return categoryImages[categoryName] || "/default-profession.jpg";
    };
  const handleSelect = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  // Fetch professionals matching specialty, location, and language
  const findMatchingProfessionals = async () => {
    const db = getFirestore();
    
    // Clean inputs
    const cleanLocation = formData.location.replace(/[\p{Emoji}]/gu, "").trim();
    const cleanLanguage = formData.language.replace(/[\p{Emoji}]/gu, "").trim();
  
    // Build the query with array filters
    const q = query(
      collection(db, "users"),
      where("expertise", "==", formData.specialty),
      where("coverageZone", "==", cleanLocation),
      where("languages", "array-contains", cleanLanguage)
    );
  
    const snapshot = await getDocs(q);
    const professionals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      availability: doc.data().availability || []
    })) as Professional[];
  
    return professionals;
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const db = getFirestore();
      let professionals = await findMatchingProfessionals();
      
      if (professionals.length === 0) {
        setNoMatch(true);
        return;
      }
  
      // Limit to maximum 2 professionals
      if (professionals.length > 2) {
        // You can add sorting logic here (e.g., by leadCount) before slicing
        professionals = professionals.slice(0, 2);
      }
  
      // Update contact request with limited professionals
      await addDoc(collection(db, "contactRequests"), {
        ...formData,
        professionalEmails: professionals.map(pro => pro.email),
        timestamp: new Date(),
      });
  
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
  console.log( formData.location.replace(/[\p{Emoji}]/gu, "").trim(),
   formData.language.replace(/[\p{Emoji}]/gu, "").trim(),);

  // Send emails to professionals and client
  const sendEmails = async (professionals: Professional[]) => {
    const db = getFirestore();
    const batch = writeBatch(db);
  
    // Only process the first 2 professionals
    professionals.forEach(pro => {
      const proRef = doc(db, 'users', pro.id);
      batch.update(proRef, { 
        leadCount: increment(1),
        lastLeadReceived: new Date()
      });
    });

    await batch.commit();

    const templateParams = {
      user_availability: formData.availability.join(', '),
      client_email: formData.email,
      client_phone: formData.phoneNumber, // Added phone number
      specialty: formData.specialty,
      location: formData.location.replace(/[\p{Emoji}]/gu, "").trim(),
      language: formData.language.replace(/[\p{Emoji}]/gu, "").trim(),
      problem: formData.problem,
    };

    try {
      const proEmails = professionals.map(pro =>
        emailjs.send(SERVICE_ID, PROFESSIONAL_TEMPLATE, {
          ...templateParams,
          to_email: pro.email,
          professional_name: pro.name,
        })
      );

      await Promise.all([
        ...proEmails,
        emailjs.send(SERVICE_ID, CLIENT_TEMPLATE, {
          ...templateParams,
          to_email: formData.email,
          professionals: professionals.map(p => p.name).join(', ')
        })
      ]);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  };

  // Progress bar component
  const ProgressBar = () => (
    <div className="w-full mb-8">
      <div className="relative pt-6">
        <div className="absolute top-8 left-0 right-0 h-1.5 bg-emerald-100 rounded-full"></div>
        <div
          className="absolute top-8 left-0 h-1.5 bg-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep - 1) * 20}%` }}
        ></div>
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map(step => (
            <div key={step} className="relative z-10">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep ? 'bg-emerald-500 text-white' : 'bg-emerald-100'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {step}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
        <FiCheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Demande envoyée avec succès!</h2>
        <p className="text-center text-gray-700 mb-4">
          Votre demande a bien été prise en charge. Un professionnel vous contactera dans **24 à 48 heures**.  
          Merci de faire confiance à <span className="font-semibold text-emerald-600">Afro Immobilier Connect</span> !
        </p>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {matchedProfessionals.map((pro) => (
            <motion.div
              key={pro.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-50 rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                {pro.photoURL ? (
                  <img src={pro.photoURL} alt={pro.name} className="w-12 h-12 rounded-full" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FiUser className="text-emerald-500" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{pro.name}</h3>
                  <p className="text-sm text-gray-600">{pro.email}</p>
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
          className="text-center py-8 px-4"
        >
          <motion.img 
            src="/searching.jpg" 
            alt="Searching" 
            className="mx-auto mb-6 w-64 h-64"
            animate={{ y: [0, -15, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Désolé, nous n'avons pas trouvé de professionnels correspondant à vos critères
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Pas de panique ! Voici quelques suggestions pour élargir votre recherche :
          </p>
          <div className="mt-8 text-center">
            <p className="text-gray-700 font-medium">
              C'est grâce au partage entre professionnels que nous devenons plus forts !  
              Aidez-nous à agrandir la communauté en partageant cette plateforme avec votre réseau.
            </p>

            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  navigator.clipboard.writeText("https://afro-connect.netlify.app/");
                  alert("Lien copié avec succès !");
                }}
                className="bg-emerald-500 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-emerald-600 transition"
              >
                <FiCopy className="w-5 h-5" />
                <span>Copier le lien</span>
              </button>
            </div>

            <p className="mt-4 text-gray-600 text-sm italic">
              Ensemble, nous sommes plus forts ! 💪
            </p>
          </div>
          <div className="space-y-4 mt-8 max-w-md mx-auto">
            <div className="bg-blue-50 p-4 rounded-xl flex items-center space-x-4">
              <FiRefreshCw className="w-6 h-6 text-blue-500" />
              <p className="text-left">
                Essayez différentes zones de couverture ou langues
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl flex items-center space-x-4">
              <FiSearch className="w-6 h-6 text-emerald-500" />
              <p className="text-left">
                Ajustez vos critères de recherche
              </p>
            </div>
          </div>



          <button
            onClick={() => {
              setNoMatch(false);
              setCurrentStep(1);
            }}
            className="mt-8 bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 transition-colors flex items-center mx-auto space-x-2"
          >
            <FiRotateCw className="w-5 h-5" />
            <span>Réessayer la recherche</span>
          </button>
        </motion.div>
      )  : (
        <>
          <div className="flex justify-between mb-4">
            <button onClick={currentStep === 1 ? onBack : handlePrevious} className="text-emerald-600">
              <FiArrowLeft className="inline-block" /> Retour
            </button>
            <div className="text-gray-500">Étape {currentStep}/5</div>
          </div>

          <ProgressBar />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              {currentStep === 1 && (
                isCombinedSpecialty ? (
                  <>
                    <h3 className="text-xl font-semibold">Choisissez votre spécialité</h3>
                    
                    {/* Category image for combined specialty */}
                    <div className="flex justify-center">
                      <img 
                        src={getCategoryImage(specialty)}
                        alt={specialty} 
                        className="h-48 w-auto object-contain rounded-lg shadow-md animate-fade-in"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {currentSubSpecialties.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => handleSelect('specialty', sub)}
                          className={`p-4 rounded-lg border flex items-center text-left gap-3 transition-all duration-300 ${
                            formData.specialty === sub ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                          }`}
                        >
                          <span>{sub}</span>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={!formData.specialty}
                      className="w-full bg-emerald-500 text-white p-3 rounded-xl disabled:opacity-50 hover:bg-emerald-600 transition-colors"
                    >
                      Continuer
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold">Spécialité sélectionnée</h3>
                    
                    {/* Show image for the selected specialty */}
                    <div className="flex justify-center mb-4">
                      <img 
                        src={getCategoryImage(formData.specialty)}
                        alt={formData.specialty} 
                        className="w-50 h-48 animate-fade-in" // Adjust size as needed
                      />
                    </div>
                    
                    <div className="p-4 bg-emerald-50 rounded-xl flex items-center gap-4">
                      <p className="text-emerald-700 font-medium">{formData.specialty}</p>
                    </div>
                    <button 
                      onClick={handleNext} 
                      className="w-full bg-emerald-500 text-white p-3 rounded-xl hover:bg-emerald-600 transition-colors"
                    >
                      Continuer
                    </button>
                  </>
                )
              )}

              {currentStep === 2 && (
                <>
                  <h3 className="text-xl font-semibold">Sélectionnez votre région</h3>
                  <div className="flex justify-center">
                    <img 
                        src="/location.jpg" 
                        alt="Language Selection" 
                        className="w-50 h-48 animate-fade-in" // Adjust size as needed
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {locations.map(location => (
                      <button
                        key={location}
                        onClick={() => handleSelect('location', location)}
                        className={`p-2 rounded-lg border ${
                          formData.location === location ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={!formData.location}
                    className="w-full bg-emerald-500 text-white p-3 rounded-xl disabled:opacity-50"
                  >
                    Continuer
                  </button>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <h3 className="text-xl font-semibold">Langue de communication</h3>
                  <div className="flex justify-center">
                    <img 
                        src="/language.jpg" 
                        alt="Language Selection" 
                        className="w-50 h-48 animate-fade-in" // Adjust size as needed
                    />
                    </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {languages.map(language => (
                      <button
                        key={language}
                        onClick={() => handleSelect('language', language)}
                        className={`p-2 rounded-lg border ${
                          formData.language === language ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                        }`}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={!formData.language}
                    className="w-full bg-emerald-500 text-white p-3 rounded-xl disabled:opacity-50"
                  >
                    Continuer
                  </button>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <h3 className="text-xl font-semibold">Coordonnées et description</h3>
                  <div className="flex justify-center">
                    <img 
                        src="/description.jpg" 
                        alt="Language Selection" 
                        className="w-50 h-48 animate-fade-in" // Adjust size as needed
                    />
                    </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      const sanitizedEmail = e.target.value.trim();
                      handleSelect('email', sanitizedEmail);
                    }}
                    className="w-full p-4 border rounded-xl mb-4"
                    placeholder="Adresse email *"
                    required
                  />
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleSelect('phoneNumber', e.target.value)}
                    className="w-full p-4 border rounded-xl mb-4"
                    placeholder="Numéro de téléphone *"
                    required
                  />
                  <textarea
                    value={formData.problem}
                    onChange={(e) => handleSelect('problem', e.target.value)}
                    className="w-full p-4 border rounded-xl h-40"
                    placeholder="Décrivez votre situation en détail..."
                  />
                  <button
                    onClick={handleNext}
                    disabled={!formData.problem || !formData.email || !formData.phoneNumber}
                    className="w-full bg-emerald-500 text-white p-3 rounded-xl disabled:opacity-50"
                  >
                    Continuer
                  </button>
                </>
              )}

              {currentStep === 5 && (
                <>
                  <h3 className="text-xl font-semibold">Coordonnées</h3>
                  <div className="flex justify-center">
                    <img 
                        src="/Time.jpg" 
                        alt="Language Selection" 
                        className="w-50 h-48 animate-fade-in" // Adjust size as needed
                    />
                    </div>
                  <p className="text-gray-600 mb-4">
                    Sélectionnez les créneaux horaires où vous souhaitez être contacté par le professionnel
                  </p>
                  <AvailabilityPicker
                    availability={formData.availability}
                    setAvailability={(avail) =>
                      setFormData(prev => ({ ...prev, availability: avail }))
                    }
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={handlePrevious}
                      className="w-1/2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.availability.length || loading}
                      className="w-1/2 bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                          </svg>
                          Envoi...
                        </span>
                      ) : (
                        "Confirmer la demande"
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};