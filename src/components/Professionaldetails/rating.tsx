import { useState, useEffect } from "react";

export const Rating = ({ 
  initialRating,
  numberOfRatings,
  onRate,
  isSubmitting
}: { 
  initialRating: number;
  numberOfRatings: number;
  onRate: (rating: number) => void;
  isSubmitting: boolean;
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  // Check local storage for previous rating
  useEffect(() => {
    const hasRated = localStorage.getItem(`rated_${window.location.pathname}`);
    setHasRated(!!hasRated);
  }, []);

  const handleRate = (rating: number) => {
    localStorage.setItem(`rated_${window.location.pathname}`, "true");
    setHasRated(true);
    onRate(rating);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-indigo-600">
          {initialRating.toFixed(1)}
        </div>
        <div className="text-gray-500 text-sm">
          ({numberOfRatings} avis)
        </div>
      </div>
      
      {!hasRated && (
        <>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setSelectedRating(star)}
                disabled={isSubmitting}
                className={`text-2xl transition-colors duration-150 ${
                  (hoverRating || selectedRating) >= star 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <button
            onClick={() => handleRate(selectedRating)}
            disabled={!selectedRating || isSubmitting}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Envoi...' : 'Noter'}
          </button>
        </>
      )}
      
      {hasRated && (
        <div className="text-green-600">Merci pour votre notation !</div>
      )}
    </div>
  );
};