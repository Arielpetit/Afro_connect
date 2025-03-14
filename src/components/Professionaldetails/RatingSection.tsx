import { FiStar } from "react-icons/fi";
import { Rating } from "./rating";

export const RatingSection = ({ 
  user,
  handleRate,
  submittingRating
}: { 
  user: any;
  handleRate: (rating: number) => void;
  submittingRating: boolean;
}) => (
  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border-l-4 border-indigo-500">
    <div className="flex items-center gap-2 mb-3">
      <FiStar className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Évaluation</h3>
    </div>
    <Rating
      initialRating={user.numberOfRatings > 0 
        ? user.totalRatings / user.numberOfRatings 
        : 0}
      numberOfRatings={user.numberOfRatings || 0}
      onRate={handleRate}
      isSubmitting={submittingRating}
    />
  </div>
);