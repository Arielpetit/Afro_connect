import { getFirestore, query, collection, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { Professional } from "./ContactWizard";

export const ProfessionalsLeadsPage: React.FC = () => {
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [loading, setLoading] = useState(true);
  
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
        setLoading(false);
      };
  
      fetchProfessionals();
    }, []);
  
    if (loading) return <div>Loading...</div>;
  
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Professional Leads</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Professional
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leads Received
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {professionals.map(pro => (
                <tr key={pro.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {pro.photoURL ? (
                        <img 
                          className="h-10 w-10 rounded-full"
                          src={pro.photoURL} 
                          alt={pro.displayName} 
                        />
                      ) : (
                        <FiUser className="h-10 w-10 text-gray-400" />
                      )}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {pro.displayName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {pro.expertise}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {pro.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pro.leadCount || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };