import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { FiCheckCircle, FiArrowLeft, FiUser, FiMail, FiXCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
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
  availability: string[];
}

const locations = [
  "🏔️ Alberta", "🌲 Colombie-Britannique", "🏝️ Île-du-Prince-Édouard",
  "🌾 Manitoba", "🦞 Nouveau-Brunswick", "🌊 Nouvelle-Écosse", "❄️ Nunavut",
  "🏙️ Ontario", "🍁 Québec", "🌻 Saskatchewan", "🎣 Terre-Neuve-et-Labrador",
  "🌌 Territoires du Nord-Ouest", "⛰️ Yukon", 
  "🏕️ Whitehorse", "🏔️ Banff", "🌆 Toronto", "🎭 Montréal", "🎡 Vancouver",
  "🏘️ Winnipeg", "🏯 Ottawa", "🌁 Halifax", "🛶 Charlottetown"
];

const languages = [
  "🇫🇷 Français", "🇬🇧 Anglais", "🇪🇸 Espagnol", "🇩🇪 Allemand", "🇮🇹 Italien",
  "🇵🇹 Portugais", "🇸🇦 Arabe", "🇨🇳 Chinois", "🇷🇺 Russe", "🇯🇵 Japonais", "🇳🇱 Néerlandais",
  "🇰🇷 Coréen", "🇮🇳 Hindi", "🇹🇷 Turc", "🇵🇭 Tagalog", "🇵🇱 Polonais", "🇬🇷 Grec",
  "🇺🇦 Ukrainien", "🇨🇿 Tchèque", "🇸🇪 Suédois", "🇳🇴 Norvégien", "🇫🇮 Finnois",
  "🇩🇰 Danois", "🇮🇷 Persan (Farsi)", "🇻🇳 Vietnamien", "🇮🇱 Hébreu"
];

interface AvailabilityEntry {
  day: string;
  start: string;
  end: string;
}

const daysOfWeek = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const AvailabilityPicker: React.FC<{
  availability: string[];
  setAvailability: (value: string[]) => void;
}> = ({ availability, setAvailability }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const addEntry = () => {
    if (!selectedDay || !fromTime || !toTime) return;
    const newEntry = `${selectedDay}: ${fromTime} - ${toTime}`;
    setAvailability([...availability, newEntry]);
    setSelectedDay("");
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
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="flex-1 border rounded-lg p-2"
        >
          <option value="">Choisir un jour</option>
          {daysOfWeek.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        
        <div className="flex gap-2">
          <input
            type="time"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            className="flex-1 border rounded-lg p-2"
          />
          <input
            type="time"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            className="flex-1 border rounded-lg p-2"
          />
        </div>
        
        <button
          onClick={addEntry}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
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

export const ContactWizard: React.FC<WizardProps> = ({ specialty, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty,
    location: "",
    language: "",
    problem: "",
    email: "",
    availability: [] as string[],
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
    setCurrentStep(prev => Math.min(prev + 1, 5));
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const parseAvailability = (entries: string[]): AvailabilityEntry[] => {
    return entries.map(entry => {
      const [dayPart, timePart] = entry.split(': ');
      const [start, end] = timePart.split(' - ');
      return { day: dayPart, start, end };
    });
  };

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const hasAvailabilityOverlap = (userAvail: AvailabilityEntry[], proAvail: AvailabilityEntry[]) => {
    return userAvail.some(userEntry => 
      proAvail.some(proEntry => {
        if (userEntry.day !== proEntry.day) return false;
        const userStart = timeToMinutes(userEntry.start);
        const userEnd = timeToMinutes(userEntry.end);
        const proStart = timeToMinutes(proEntry.start);
        const proEnd = timeToMinutes(proEntry.end);
        return userStart < proEnd && userEnd > proStart;
      })
    );
  };

  const findMatchingProfessionals = async () => {
    const db = getFirestore();
    const cleanLocation = formData.location.replace(/[\p{Emoji}]/gu, "").trim();
    const cleanLanguage = formData.language.replace(/[\p{Emoji}]/gu, "").trim();

    const q = query(
      collection(db, "users"),
      where("expertise", "==", formData.specialty),
      where("coverageZone", "==", cleanLocation),
      where("languages", "==", cleanLanguage)
    );

    const snapshot = await getDocs(q);
    const professionals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      availability: doc.data().availability || []
    })) as Professional[];

    const userAvailability = parseAvailability(formData.availability);
    return professionals.filter(pro => 
      hasAvailabilityOverlap(userAvailability, parseAvailability(pro.availability)),
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const db = getFirestore();
      await addDoc(collection(db, "contactRequests"), {
        ...formData,
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

  const sendEmails = async (professionals: Professional[]) => {
    const templateParams = {
      user_availability: formData.availability.join(', '),
      client_email: formData.email,
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
          professional_name: pro.displayName,
        })
      );

      await Promise.all([
        ...proEmails,
        emailjs.send(SERVICE_ID, CLIENT_TEMPLATE, {
          ...templateParams,
          to_email: formData.email,
          professionals: professionals.map(p => p.displayName).join(', ')
        })
      ]);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  };

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
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {matchedProfessionals.map((pro, index) => (
              <motion.div
                key={pro.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 rounded-lg p-4"
              >
                <div className="flex items-center gap-4">
                  {pro.photoURL ? (
                    <img src={pro.photoURL} alt={pro.displayName} className="w-12 h-12 rounded-full" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <FiUser className="text-emerald-500" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{pro.displayName}</h3>
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
          className="text-center py-8"
        >
          <FiXCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Aucun professionnel trouvé</h2>
          <button
            onClick={() => {
              setNoMatch(false);
              setCurrentStep(1);
            }}
            className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600"
          >
            Réessayer
          </button>
        </motion.div>
      ) : (
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
                <>
                  <h3 className="text-xl font-semibold">Spécialité sélectionnée</h3>
                  <div className="p-4 bg-emerald-50 rounded-xl">
                    <p className="text-emerald-700">{formData.specialty}</p>
                  </div>
                  <button onClick={handleNext} className="w-full bg-emerald-500 text-white p-3 rounded-xl">
                    Continuer
                  </button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <h3 className="text-xl font-semibold">Sélectionnez votre région</h3>
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
                            src="/location.jpg" 
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
                    <h3 className="text-xl font-semibold">Contact et description</h3>
                    <div className="flex justify-center">
                        <img 
                            src="/location.jpg" 
                            alt="Language Selection" 
                            className="w-50 h-48 animate-fade-in" // Adjust size as needed
                        />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleSelect('email', e.target.value)}
                      className="w-full p-4 border rounded-xl mb-4"
                      placeholder="Entrez votre adresse email..."
                      required
                    />
                    <textarea
                      value={formData.problem}
                      onChange={(e) => handleSelect('problem', e.target.value)}
                      className="w-full p-4 border rounded-xl h-40"
                      placeholder="Décrivez votre situation..."
                    />
                    <button
                      onClick={handleNext}
                      disabled={!formData.problem || !formData.email}
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
                            src="/location.jpg" 
                            alt="Language Selection" 
                            className="w-50 h-48 animate-fade-in" // Adjust size as needed
                        />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Sélectionnez les créaux horaires où vous souhaitez être contacté par le professionnel
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