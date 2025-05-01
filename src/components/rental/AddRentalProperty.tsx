import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaBed, FaBath, FaRuler, FaCheck, FaDog, FaCouch, FaWhatsapp } from 'react-icons/fa';
import { db, collection, addDoc, Timestamp, serverTimestamp } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export const AddRentalProperty = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    whatsappNumber: '',
    location: {
      address: '',
      city: '',
      postalCode: '',
      country: 'France'
    },
    specifications: {
      bedrooms: '',
      bathrooms: '',
      surface: '',
      furnished: false,
      petsAllowed: false
    },
    amenities: [] as string[],
    images: [] as string[]
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    try {
      const base64Promises = files.map(file => convertToBase64(file));
      const base64Images = await Promise.all(base64Promises);
      
      setFormData({
        ...formData,
        images: [...formData.images, ...base64Images]
      });
    } catch (error) {
      console.error("Error converting images to base64:", error);
      setError("Failed to process images. Please try again.");
    }
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.title.trim()) errors.push('Le titre est obligatoire');
    if (!formData.description.trim()) errors.push('La description est obligatoire');
    if (!formData.price) errors.push('Le prix est obligatoire');
    if (!formData.location.address.trim()) errors.push('L\'adresse est obligatoire');
    if (!formData.location.city.trim()) errors.push('La ville est obligatoire');
    if (!formData.specifications.bedrooms) errors.push('Le nombre de chambres est obligatoire');
    if (!formData.specifications.bathrooms) errors.push('Le nombre de salles de bain est obligatoire');
    if (!formData.specifications.surface) errors.push('La surface est obligatoire');
    if (formData.images.length === 0) errors.push('Au moins une photo est obligatoire');

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      console.log("Starting submission...");
      
      if (!formData.images || formData.images.length === 0) {
        throw new Error("Please add at least one image URL");
      }

      console.log("Creating rental document...");
      const rentalData = {
        ...formData,
        price: Number(formData.price) || 0,
        specifications: {
          ...formData.specifications,
          bedrooms: Number(formData.specifications.bedrooms) || 0,
          bathrooms: Number(formData.specifications.bathrooms) || 0,
          surface: Number(formData.specifications.surface) || 0,
        },
        createdAt: serverTimestamp(),
        updatedAt: Timestamp.now(),
        status: 'available'
      };

      const docRef = await addDoc(collection(db, "rentals"), rentalData);
      console.log("Document written with ID: ", docRef.id);
      
      setIsSubmitting(false);
      navigate("/rental/listings");
    } catch (error) {
      console.error("Error submitting rental:", error);
      setError(error instanceof Error ? error.message : "An error occurred while submitting the rental");
      setIsSubmitting(false);
    }
  };

  const amenityOptions = [
    "Parking", "Balcon", "Ascenseur", "Cave", 
    "Climatisation", "Chauffage", "Internet"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6 text-white">
            <h1 className="text-3xl font-bold">
              Publier une annonce de location
            </h1>
            <p className="mt-2 text-blue-100">Remplissez le formulaire ci-dessous pour créer votre annonce</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Main Information Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Informations principales
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre de l'annonce
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full h-12 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-colors px-4 text-base"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Ex: Bel appartement lumineux au centre-ville"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-colors p-4 text-base min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Décrivez votre bien en détail..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix mensuel (€)
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      required
                      className="w-full h-12 rounded-lg border-2 border-blue-200 pl-12 focus:border-blue-500 focus:ring-blue-500 transition-colors px-4 text-base"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="Ex: 1200"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-lg">€</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro WhatsApp
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type="tel"
                      required
                      className="w-full h-12 rounded-lg border-2 border-blue-200 pl-12 focus:border-blue-500 focus:ring-blue-500 transition-colors px-4 text-base"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                      placeholder="Ex: +33612345678"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaWhatsapp className="text-gray-400 text-lg" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Caractéristiques
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chambres
                    </label>
                    <div className="flex items-center relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaBed className="text-gray-400 text-lg" />
                      </div>
                      <input
                        type="number"
                        required
                        className="w-full h-12 rounded-lg border-2 border-blue-200 pl-12 focus:border-blue-500 focus:ring-blue-500 transition-colors px-4 text-base"
                        value={formData.specifications.bedrooms}
                        onChange={(e) => setFormData({
                          ...formData,
                          specifications: {...formData.specifications, bedrooms: e.target.value}
                        })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salles de bain
                    </label>
                    <div className="flex items-center relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaBath className="text-gray-400 text-lg" />
                      </div>
                      <input
                        type="number"
                        required
                        className="w-full h-12 rounded-lg border-2 border-blue-200 pl-12 focus:border-blue-500 focus:ring-blue-500 transition-colors px-4 text-base"
                        value={formData.specifications.bathrooms}
                        onChange={(e) => setFormData({
                          ...formData,
                          specifications: {...formData.specifications, bathrooms: e.target.value}
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surface (m²)
                  </label>
                  <div className="flex items-center relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaRuler className="text-gray-400 text-lg" />
                    </div>
                    <input
                      type="number"
                      required
                      className="w-full h-12 rounded-lg border-2 border-blue-200 pl-12 focus:border-blue-500 focus:ring-blue-500 transition-colors px-4 text-base"
                      value={formData.specifications.surface}
                      onChange={(e) => setFormData({
                        ...formData,
                        specifications: {...formData.specifications, surface: e.target.value}
                      })}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                      checked={formData.specifications.furnished}
                      onChange={(e) => setFormData({
                        ...formData,
                        specifications: {...formData.specifications, furnished: e.target.checked}
                      })}
                    />
                    <FaCouch className="text-blue-500 mr-2" />
                    <span className="text-gray-700 font-medium">Meublé</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                      checked={formData.specifications.petsAllowed}
                      onChange={(e) => setFormData({
                        ...formData,
                        specifications: {...formData.specifications, petsAllowed: e.target.checked}
                      })}
                    />
                    <FaDog className="text-blue-500 mr-2" />
                    <span className="text-gray-700 font-medium">Animaux acceptés</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="mt-10 bg-blue-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Localisation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full h-12 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-colors px-4 text-base"
                    value={formData.location.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: {...formData.location, address: e.target.value}
                    })}
                    placeholder="Numéro et nom de rue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full h-12 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-colors px-4 text-base"
                    value={formData.location.city}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: {...formData.location, city: e.target.value}
                    })}
                    placeholder="Nom de la ville"
                  />
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="mt-10 bg-blue-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Équipements
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {amenityOptions.map((amenity) => (
                  <label key={amenity} className="flex items-center p-3 border border-gray-200 rounded-lg bg-white hover:bg-blue-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                      checked={formData.amenities.includes(amenity)}
                      onChange={(e) => {
                        const newAmenities = e.target.checked
                          ? [...formData.amenities, amenity]
                          : formData.amenities.filter(a => a !== amenity);
                        setFormData({...formData, amenities: newAmenities});
                      }}
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Images Section */}
            <div className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                Photos du logement
              </h2>
              <p className="text-sm text-gray-500">Ajoutez au moins une photo de votre bien immobilier</p>
              <div className="flex flex-wrap gap-4 mt-4">
                {formData.images.map((base64, index) => (
                  <div key={index} className="relative w-32 h-32 group">
                    <img
                      src={base64}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = formData.images.filter((_, i) => i !== index);
                        setFormData({...formData, images: newImages});
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md"
                      aria-label="Remove image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 bg-blue-50 hover:bg-blue-100 transition-colors">
                  <FaUpload className="h-8 w-8 text-blue-500" />
                  <span className="mt-2 text-sm text-blue-600 font-medium">Ajouter</span>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              {error && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                  <p className="text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg 
                  hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center space-x-3
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Publication en cours...</span>
                  </>
                ) : (
                  <>
                    <FaCheck className="w-5 h-5" />
                    <span>Publier l'annonce</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};