import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, collection, getDocs, query, orderBy } from "../firebase";
import { FiStar, FiArrowLeft } from "react-icons/fi";

const ReviewListPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const ratingsRef = collection(db, `users/${userId}/ratings`);
        const q = query(ratingsRef, orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        // Filter reviews with non-empty comments
        const reviewsData = querySnapshot.docs
          .filter(doc => {
            const data = doc.data();
            return data.comment && data.comment.trim() !== '';
          })
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate()
          }));
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <button
            onClick={() => navigate(`/profile/${userId}`)}
            className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">All Reviews</h1>
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.clientName || 'Anonymous'}</span>
                    <FiStar className="text-yellow-400" />
                    <span>{review.rating}</span>
                    <span className="text-sm text-gray-500">
                      {review.timestamp?.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewListPage;