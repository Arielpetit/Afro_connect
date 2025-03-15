import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, doc, runTransaction, collection } from "../firebase";
import { FiArrowLeft, FiUser, FiMessageSquare } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

const ReviewFormPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [clientName, setClientName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const professionalRef = doc(db, "users", userId!);
      const ratingsRef = collection(db, `users/${userId}/ratings`);

      await runTransaction(db, async (transaction) => {
        const professionalDoc = await transaction.get(professionalRef);
        if (!professionalDoc.exists())
          throw new Error("Professional not found");

        transaction.set(doc(ratingsRef), {
          comment,
          clientName: clientName || "Anonymous",
          timestamp: new Date(),
          userAgent: navigator.userAgent,
        });
      });

      toast.success("Review submitted successfully!");
      setTimeout(() => navigate(`/profile/${userId}`), 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Leave a Review
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name (optional)
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe your experience..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FiMessageSquare className="w-5 h-5" />
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReviewFormPage;
