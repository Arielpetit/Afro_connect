import { getFirestore, query, collection, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { FiUser, FiLoader, FiTrendingUp, FiSearch } from "react-icons/fi";
import { Professional } from "./ContactWizard";

export const ProfessionalsLeadsPage: React.FC = () => {
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Professional, direction: 'asc' | 'desc' }>({
        key: 'leadCount',
        direction: 'desc'
    });

    useEffect(() => {
        const fetchProfessionals = async () => {
            const db = getFirestore();
            const q = query(collection(db, "users"), 
                where("userType", "==", "professional"));
            
            const snapshot = await getDocs(q);
            const pros = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                leadCount: doc.data().leadCount || 0
            })) as Professional[];
            
            setProfessionals(pros);
            setFilteredProfessionals(pros);
            setLoading(false);
        };
  
        fetchProfessionals();
    }, []);

    // Fixed Search Functionality
    useEffect(() => {
        if (!searchTerm) {
            setFilteredProfessionals(professionals);
            return;
        }

        const lowercasedSearch = searchTerm.toLowerCase();
        const filtered = professionals.filter(pro => 
            (pro.displayName && typeof pro.displayName === 'string' && pro.displayName.toLowerCase().includes(lowercasedSearch)) ||
            (pro.email && typeof pro.email === 'string' && pro.email.toLowerCase().includes(lowercasedSearch)) ||
            (pro.expertise && typeof pro.expertise === 'string' && pro.expertise.toLowerCase().includes(lowercasedSearch))
        );

        setFilteredProfessionals(filtered);
    }, [searchTerm, professionals]);

    const sortedProfessionals = [...filteredProfessionals].sort((a, b) => {
        const key = sortConfig.key;
        if (a[key] < b[key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (key: keyof Professional) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center">
                <FiLoader className="animate-spin text-5xl text-blue-600 mb-4" />
                <p className="text-gray-600 text-lg">Chargement des professionnels...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="px-6 py-8 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <FiTrendingUp className="text-blue-600" />
                            Tableau de Bord des Professionnels
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Vue d'ensemble des professionnels et de leurs leads générés
                        </p>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative flex items-center">
                        <FiSearch className="absolute left-3 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Rechercher des professionnels..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-64"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th 
                                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition"
                                    onClick={() => handleSort('displayName')}
                                >
                                    Professionnel
                                </th>
                                <th 
                                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition"
                                    onClick={() => handleSort('email')}
                                >
                                    Email
                                </th>
                                <th 
                                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition"
                                    onClick={() => handleSort('leadCount')}
                                >
                                    Leads Reçus
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedProfessionals.map(pro => (
                                <tr 
                                    key={pro.id} 
                                    className="hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {pro.photoURL ? (
                                                <img 
                                                    className="h-12 w-12 rounded-full object-cover shadow-md"
                                                    src={pro.photoURL} 
                                                    alt={pro.displayName || 'Professionnel'} 
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <FiUser className="h-6 w-6 text-blue-600" />
                                                </div>
                                            )}
                                            <div className="ml-4">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {pro.displayName || 'Nom inconnu'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {pro.expertise || 'Expertise non spécifiée'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {pro.email || 'Email non disponible'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`
                                            px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${pro.leadCount > 10 ? 'bg-green-100 text-green-800' : 
                                              pro.leadCount > 5 ? 'bg-yellow-100 text-yellow-800' : 
                                              'bg-gray-100 text-gray-800'}
                                        `}>
                                            {pro.leadCount || 0} Leads
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProfessionals.length === 0 && (
                    <div className="text-center py-12 bg-gray-50">
                        <p className="text-gray-500">Aucun professionnel trouvé</p>
                    </div>
                )}
            </div>
        </div>
    );
};