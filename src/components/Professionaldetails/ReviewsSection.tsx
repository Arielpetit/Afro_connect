import { FiMessageSquare, FiStar } from "react-icons/fi";

export const ReviewsSection = ({
  reviews,
  userId,
  navigate,
}: {
  reviews: any[];
  userId: string;
  navigate: any;
}) => (
  <>
    <div className="flex items-center gap-2 mb-3">
      <FiMessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
        Client Reviews
      </h3>
    </div>
    {reviews.length === 0 ? (
      <p className="text-gray-600">No reviews yet.</p>
    ) : (
      <>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="mb-4 last:mb-0 p-4 bg-white rounded-lg border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">
                {review.clientName || "Anonymous"}
              </span>
              <FiStar className="text-yellow-400" />
              <span>{review.rating}</span>
              <span className="text-sm text-gray-500">
                {review.timestamp?.toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </>
    )}
    <div className="mt-4 flex gap-4">
      <button
        onClick={() => navigate(`/profiles/${userId}/reviews`)}
        className="text-indigo-600 hover:underline font-medium"
      >
        View All Reviews
      </button>
      <button
        onClick={() => navigate(`/profiles/${userId}/review`)}
        className="text-indigo-600 hover:underline font-medium"
      >
        Write a Review
      </button>
    </div>
  </>
);
