import SuggestionForm from '../components/SuggestionForm';

const SuggestionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit a Suggestion</h1>
        <SuggestionForm />
      </div>
    </div>
  );
};

export default SuggestionsPage;