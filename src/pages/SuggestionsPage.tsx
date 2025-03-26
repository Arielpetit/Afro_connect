// SuggestionsPage.tsx
import SuggestionForm from '../components/SuggestionForm';

const SuggestionsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Share Your Ideas</h1>
          <p className="text-lg text-gray-600">
            We value your feedback and suggestions
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
          <SuggestionForm />
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPage;