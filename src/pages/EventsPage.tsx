// EventsPage.tsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Timestamp;
  duration: string;
  speaker: string;
  speakerBio: string;
  registrationLink: string;
  category: string;
  image: string;
}

const EventsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  const categories = [
    { id: "all", name: "Tous" },
    { id: "webinar", name: "Webinaires" },
    { id: "workshop", name: "Ateliers" },
    { id: "conference", name: "Conférences" },
    { id: "networking", name: "Réseautage" },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, "events"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const eventsList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "",
            description: data.description || "",
            date: data.date,
            duration: data.duration || "60",
            speaker: data.speaker || "",
            speakerBio: data.speakerBio || "",
            registrationLink: data.registrationLink || "",
            category: data.category || "webinar",
            image: data.image || "",
          } as Event;
        });
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      try {
        await deleteDoc(doc(db, "events", eventId));
        setEvents(prev => prev.filter(event => event.id !== eventId));
        toast.success("Événement supprimé avec succès");
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error("Échec de la suppression");
      }
    }
  };

  const toggleDescription = (eventId: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('fr-FR', options);
  };

  const formatDuration = (duration: string) => {
    const minutes = parseInt(duration, 10);
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h${remainingMinutes.toString().padStart(2, '0')}`;
    }
    return `${minutes} minutes`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Événements à venir</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Webinaires, ateliers et conférences pour développer votre expertise immobilière
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Rechercher des événements..."
              className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute right-3 top-3 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {loading ? (
            <div className="text-center py-12">Chargement...</div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredEvents.map(event => {
                const eventDate = event.date.toDate();
                const timeString = eventDate.toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  hour12: false 
                });

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image || '/default-event.jpg'}
                      alt={event.title}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/default-event.jpg';
                      }}
                    />

                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
                        <div className="text-sm font-medium text-white">
                          {formatDate(eventDate)}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                          {categories.find(c => c.id === event.category)?.name}
                        </span>
                        {isAdmin && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => navigate(`/admin/events/${event.id}`)}
                              className="p-1.5 hover:bg-blue-50 rounded-md text-blue-600 hover:text-blue-700 transition-colors"
                              title="Modifier"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="p-1.5 hover:bg-red-50 rounded-md text-red-600 hover:text-red-700 transition-colors"
                              title="Supprimer"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      
                      <div className="mb-4">
                        <div className="flex items-center text-gray-600 mb-2">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-14 0 9 9 0 0114 0z" />
                          </svg>
                          {timeString} • {formatDuration(event.duration)}
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <div>
                            <div className="font-medium">{event.speaker}</div>
                            {event.speakerBio && (
                              <div className="text-sm text-gray-500 mt-1">{event.speakerBio}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className={`text-gray-600 ${expandedDescriptions[event.id] ? '' : 'line-clamp-3'}`}>
                          {event.description}
                        </p>
                        {event.description.length > 100 && (
                          <button
                            onClick={() => toggleDescription(event.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                          >
                            {expandedDescriptions[event.id] ? 'Voir moins' : 'Voir plus'}
                          </button>
                        )}
                      </div>

                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        S'inscrire maintenant
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4 text-6xl">📅</div>
            <h3 className="text-gray-900 font-medium mb-2">Aucun événement trouvé</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Essayez de modifier vos filtres ou consultez nos événements passés
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;