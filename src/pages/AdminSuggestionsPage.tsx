// AdminSuggestionsPage.tsx
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import SuggestionsList from '../components/SuggestionsList';

export interface Suggestion {
  id: string;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any;
  status: string;
}

const AdminSuggestionsPage = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'suggestions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const suggestionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Suggestion[];
      setSuggestions(suggestionsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto animate-fade-in-up">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Suggestions Dashboard</h1>
          <p className="text-lg text-gray-600">
            Manage and review user submissions
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
          <SuggestionsList suggestions={suggestions} />
        </div>
      </div>
    </div>
  );
};

export default AdminSuggestionsPage;