import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { FiArrowLeft, FiLoader, FiMail, FiClock, FiCalendar, FiUser, FiMapPin, FiGlobe, FiPhone, FiBook } from 'react-icons/fi';

interface Lead {
    id: string;
    email: string;
    message: string;
    createdAt: string;
    availability: string[];
    specialty: string;
    professionalEmails: string[];
    language: string;
    location: string;
    phoneNumber: string;
    problem: string;
}

interface ProfessionalData {
    expertise: string;
    email: string;
    displayName: string;
    photoURL?: string;
}

export const ProfessionalLeadsDetail: React.FC = () => {
    const { professionalId } = useParams<{ professionalId: string }>();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [professional, setProfessional] = useState<ProfessionalData | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            
            const proDoc = await getDocs(query(
                collection(db, 'users'), 
                where("__name__", "==", professionalId)
            ));

            if (!proDoc.empty) {
                const proData = proDoc.docs[0].data() as ProfessionalData;
                setProfessional(proData);

                const q = query(
                    collection(db, 'contactRequests'),
                    where('professionalEmails', 'array-contains', proData.email)
                );

                const snapshot = await getDocs(q);
                const leadsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().timestamp?.toDate().toLocaleString()
                })) as Lead[];

                setLeads(leadsData);
                setLoading(false);
            }
        };

        fetchData();
    }, [professionalId]);

    if (loading || !professional) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center">
                <FiLoader className="animate-spin text-5xl text-blue-600 mb-4" />
                <p className="text-gray-600 text-lg">Chargement des leads...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                        <FiArrowLeft className="mr-2" />
                        Retour aux professionnels
                    </button>
                    <div className="flex items-center gap-4">
                        {professional.photoURL ? (
                            <img 
                                src={professional.photoURL} 
                                alt={professional.displayName}
                                className="w-12 h-12 rounded-full"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <FiUser className="text-blue-600" />
                            </div>
                        )}
                        <div>
                            <h2 className="font-semibold">{professional.displayName}</h2>
                            <p className="text-sm text-gray-600">{professional.email}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">{leads.length} Leads reçus</h2>
                    
                    <div className="space-y-4">
                        {leads.map(lead => (
                            <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4 mb-3">
                                    <FiMail className="text-gray-500" />
                                    <div>
                                        <span className="font-semibold">{lead.email}</span>
                                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                            <FiPhone className="inline-block" />
                                            {lead.phoneNumber}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-auto text-sm text-gray-500">
                                        <FiCalendar />
                                        <span>{lead.createdAt}</span>
                                    </div>
                                </div>
                                
                                <div className="ml-8 space-y-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <p className="text-gray-700 flex items-center gap-2">
                                                <FiMapPin className="text-gray-500" />
                                                <strong>Localisation:</strong> {lead.location}
                                            </p>
                                            <p className="text-gray-700 flex items-center gap-2">
                                                <FiGlobe className="text-gray-500" />
                                                <strong>Langue:</strong> {lead.language}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-gray-700 flex items-center gap-2">
                                                <FiBook className="text-gray-500" />
                                                <strong>Spécialité:</strong> {lead.specialty}
                                            </p>
                                            <p className="text-gray-700">
                                                <strong>Statut:</strong> Nouveau lead
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                                            <FiBook className="text-gray-500" />
                                            Description de la demande:
                                        </h4>
                                        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                                            {lead.problem}
                                        </p>
                                    </div>

                                    {lead.availability && (
                                        <div className="mt-4">
                                            <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                                                <FiClock className="text-gray-500" />
                                                Disponibilités demandées:
                                            </h4>
                                            <ul className="list-disc pl-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {lead.availability.map((slot, index) => (
                                                    <li 
                                                        key={index} 
                                                        className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-md"
                                                    >
                                                        {slot}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {leads.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Aucun lead trouvé pour ce professionnel</p>
                            <p className="text-sm text-gray-400 mt-2">
                                Les nouveaux leads apparaîtront ici automatiquement
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};