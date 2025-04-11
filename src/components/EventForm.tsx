// EventFormPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  speaker: string;
  speakerBio: string;
  registrationLink: string;
  category: string;
  image: string;
}

const EventFormPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event>({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "60",
    speaker: "",
    speakerBio: "",
    registrationLink: "",
    category: "webinar",
    image: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const eventCategories = [
    { id: "webinar", name: "Webinaire" },
    { id: "workshop", name: "Atelier pratique" },
    { id: "conference", name: "Conférence" },
    { id: "networking", name: "Événement réseautage" },
  ];

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const docRef = doc(db, "events", eventId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setEvent(docSnap.data() as Event);
          } else {
            toast.error("Événement non trouvé");
            navigate("/admin");
          }
        } catch (error) {
          console.error("Error fetching event:", error);
          toast.error("Échec du chargement de l'événement");
        }
      };

      fetchEvent();
    }
  }, [eventId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (eventId) {
        await updateDoc(doc(db, "events", eventId), event);
        toast.success("Événement mis à jour avec succès");
      } else {
        await addDoc(collection(db, "events"), {
          ...event,
          createdAt: new Date(),
        });
        toast.success("Événement créé avec succès");
      }
      navigate(-1);
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Échec de ${eventId ? "mise à jour" : "création"} de l'événement`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
            {eventId ? "Modifier l'événement" : "Nouvel événement"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                <input
                  type="text"
                  value={event.title}
                  onChange={(e) => setEvent({ ...event, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <select
                  value={event.category}
                  onChange={(e) => setEvent({ ...event, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {eventCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={event.date}
                  onChange={(e) => setEvent({ ...event, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                <input
                  type="time"
                  value={event.time}
                  onChange={(e) => setEvent({ ...event, time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Durée (minutes)</label>
                <input
                  type="number"
                  value={event.duration}
                  onChange={(e) => setEvent({ ...event, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="30"
                  step="15"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Conférencier</label>
                <input
                  type="text"
                  value={event.speaker}
                  onChange={(e) => setEvent({ ...event, speaker: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lien d'inscription</label>
                <input
                  type="url"
                  value={event.registrationLink}
                  onChange={(e) => setEvent({ ...event, registrationLink: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lien de l'image</label>
                <input
                    type="url"
                    value={event.image}
                    onChange={(e) => setEvent({ ...event, image: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                />
               </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={event.description}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                required
              />
            </div>

            <div className="border-t pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 rounded-lg transition-all"
              >
                {submitting ? "Envoi en cours..." : (eventId ? "Mettre à jour" : "Publier l'événement")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default EventFormPage;