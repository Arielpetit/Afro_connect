import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaEuroSign, FaSearch, FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface RentalProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    country: string;
  };
  specifications: {
    bedrooms: number;
    bathrooms: number;
    surface: number;
    furnished: boolean;
    petsAllowed: boolean;
  };
  images: string[];
  amenities: string[];
}

export const RentalListings = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<RentalProperty[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<RentalProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    furnished: false,
    petsAllowed: false
  });
  const [isFiltering, setIsFiltering] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchProperties();
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  const fetchProperties = async () => {
    try {
      const q = query(collection(db, "rentals"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedProperties = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as RentalProperty[];
      setProperties(fetchedProperties);
      setFilteredProperties(fetchedProperties); // Initialize filtered properties with all properties
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setIsFiltering(true);
    const filtered = properties.filter(property => {
      const matchesLocation = !filters.location || 
        property.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.location.address.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesMinPrice = !filters.minPrice || property.price >= Number(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || property.price <= Number(filters.maxPrice);
      const matchesBedrooms = !filters.bedrooms || property.specifications.bedrooms >= Number(filters.bedrooms);
      const matchesFurnished = !filters.furnished || property.specifications.furnished === filters.furnished;
      const matchesPetsAllowed = !filters.petsAllowed || property.specifications.petsAllowed === filters.petsAllowed;

      return matchesLocation && matchesMinPrice && matchesMaxPrice && 
             matchesBedrooms && matchesFurnished && matchesPetsAllowed;
    });

    setFilteredProperties(filtered);
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      furnished: false,
      petsAllowed: false
    });
    setFilteredProperties(properties);
    setIsFiltering(false);
  };

  const handleDeleteListing = async (propertyId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      try {
        await deleteDoc(doc(db, "rentals", propertyId));
        setFilteredProperties(prev => prev.filter(property => property.id !== propertyId));
        toast.success("Annonce supprimée avec succès");
      } catch (error) {
        console.error("Error deleting property:", error);
        toast.error("Échec de la suppression");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Trouvez votre logement idéal</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Découvrez notre sélection de propriétés à louer dans toute la France</p>
      </div>
      
      {/* Search Filters */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Filtrer les annonces</h2>
            {isFiltering && (
              <button
                onClick={resetFilters}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="pl-12 w-full h-12 rounded-xl border-2 border-blue-200 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="Ville ou adresse"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prix min (€)</label>
              <input
                type="number"
                className="w-full h-12 rounded-xl border-2 border-blue-200 focus:ring-blue-500 focus:border-blue-500 shadow-sm px-4"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prix max (€)</label>
              <input
                type="number"
                className="w-full h-12 rounded-xl border-2 border-blue-200 focus:ring-blue-500 focus:border-blue-500 shadow-sm px-4"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chambres min</label>
              <input
                type="number"
                className="w-full h-12 rounded-xl border-2 border-blue-200 focus:ring-blue-500 focus:border-blue-500 shadow-sm px-4"
                value={filters.bedrooms}
                onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
              />
            </div>
            <div className="flex items-center space-x-3 pt-8">
              <input
                type="checkbox"
                id="furnished"
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={filters.furnished}
                onChange={(e) => setFilters({...filters, furnished: e.target.checked})}
              />
              <label htmlFor="furnished" className="text-gray-700 font-medium">Meublé</label>
            </div>
            <div className="flex items-center space-x-3 pt-8">
              <input
                type="checkbox"
                id="petsAllowed"
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={filters.petsAllowed}
                onChange={(e) => setFilters({...filters, petsAllowed: e.target.checked})}
              />
              <label htmlFor="petsAllowed" className="text-gray-700 font-medium">Animaux acceptés</label>
            </div>
          </div>
          
          {/* Filter Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={applyFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors duration-200"
            >
              <FaFilter className="text-lg" />
              <span>Appliquer les filtres</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Property Listings */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-500">Essayez d'ajuster vos filtres pour voir plus de propriétés</p>
          </div>
        ) : (
          <>
            <p className="text-gray-700 mb-6 font-medium">{filteredProperties.length} propriété(s) trouvée(s)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group border border-gray-100"
                  onClick={() => navigate(`/rental/${property.id}`)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigation when clicking delete
                          handleDeleteListing(property.id);
                        }}
                        className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                        title="Supprimer l'annonce"
                      >
                        <svg 
                          className="w-5 h-5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                          />
                        </svg>
                      </button>
                    )}
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
                      <div className="flex items-center font-semibold">
                        <FaEuroSign className="mr-1" />
                        <span>{property.price}</span>
                        <span className="text-sm font-normal ml-1">/mois</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{property.title}</h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <FaMapMarkerAlt className="mr-2 text-blue-600" />
                      <span>{property.location.city}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600 border-t border-gray-100 pt-4">
                      <div className="flex items-center">
                        <FaBed className="mr-2 text-blue-600" />
                        <span className="font-medium">{property.specifications.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <FaBath className="mr-2 text-blue-600" />
                        <span className="font-medium">{property.specifications.bathrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <FaRuler className="mr-2 text-blue-600" />
                        <span className="font-medium">{property.specifications.surface} m²</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};