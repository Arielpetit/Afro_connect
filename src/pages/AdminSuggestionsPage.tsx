import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import SuggestionsList from '../components/SuggestionsList';

export interface Suggestion {
  id: string;
  text: string;
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Suggestions Dashboard</h1>
        <SuggestionsList suggestions={suggestions} />
      </div>
    </div>
  );
};

export default AdminSuggestionsPage;