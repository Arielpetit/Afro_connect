import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaEuroSign, FaDog, FaCouch, FaCheck, FaArrowLeft, FaChevronLeft, FaChevronRight, FaWhatsapp } from 'react-icons/fa';

export const RentalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const docRef = doc(db, "rentals", id!);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        } else {
          navigate('/rental/listings');
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate]);

  const nextImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/rental/listings')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group transition-colors duration-200"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Retour aux annonces</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Image Gallery */}
          <div className="relative h-[28rem] md:h-[32rem] bg-gray-100">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            
            {property.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-md transition-all duration-200 text-gray-800 hover:text-blue-600"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-md transition-all duration-200 text-gray-800 hover:text-blue-600"
                >
                  <FaChevronRight />
                </button>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-black bg-opacity-30 rounded-full px-4 py-2">
                  {property.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                        currentImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                      }`}
                      aria-label={`Image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-10">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{property.title}</h1>
                <div className="flex items-center text-gray-600 text-lg">
                  <FaMapMarkerAlt className="mr-2 text-blue-600" />
                  <span>{property.location.address}, {property.location.city}</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl shadow-lg self-start">
                <div className="flex items-center text-2xl font-bold">
                  <FaEuroSign className="mr-2" />
                  <span>{property.price}</span>
                </div>
                <div className="text-blue-100">par mois</div>
              </div>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <FaBed className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{property.specifications.bedrooms}</div>
                  <div className="text-sm text-gray-600">Chambres</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <FaBath className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{property.specifications.bathrooms}</div>
                  <div className="text-sm text-gray-600">Salles de bain</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <FaRuler className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{property.specifications.surface}</div>
                  <div className="text-sm text-gray-600">m²</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  {property.specifications.furnished ? 
                    <FaCouch className="text-blue-600 text-2xl" /> : 
                    <FaDog className="text-blue-600 text-2xl" />
                  }
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">
                    {property.specifications.furnished ? "Meublé" : "Non meublé"}
                  </div>
                </div>
              </div>
            </div>

            {/* Status indicators */}
            <div className="flex flex-wrap gap-4 mb-10">
              {property.specifications.furnished && (
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                  <FaCouch className="mr-2" />
                  Meublé
                </span>
              )}
              {property.specifications.petsAllowed && (
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                  <FaDog className="mr-2" />
                  Animaux acceptés
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">
                  1
                </span>
                Description
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{property.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">
                  2
                </span>
                Équipements
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity: string) => (
                    <div key={amenity} className="flex items-center space-x-3 bg-white px-4 py-3 rounded-lg shadow-sm">
                      <div className="text-blue-600">
                        <FaCheck />
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact button */}
            <div className="mt-12 text-center">
              <a 
                href={`https://wa.me/${property.whatsappNumber}?text=Bonjour, je suis intéressé(e) par votre annonce: ${property.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
              >
                <FaWhatsapp className="mr-3 text-xl" />
                Contacter sur WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};