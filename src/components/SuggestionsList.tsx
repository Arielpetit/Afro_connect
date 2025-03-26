import { Suggestion } from '../pages/AdminSuggestionsPage';

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

const SuggestionsList = ({ suggestions }: SuggestionsListProps) => {
  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <p className="text-gray-700 mb-2">{suggestion.text}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              {new Date(suggestion.createdAt?.toDate()).toLocaleDateString()}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              suggestion.status === 'pending' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {suggestion.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestionsList;