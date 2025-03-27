import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const MAX_MESSAGE_LENGTH = 1000;

const SendEmailForm = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipientType, setRecipientType] = useState("all");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  // EmailJS environment variables
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Memoized user counts
  const userCounts = useMemo(
    () => ({
      all: users.length,
      pending: users.filter((u) => u.status === "pending").length,
      approved: users.filter((u) => u.status === "approved").length,
    }),
    [users],
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        toast.error("Failed to load users");
        console.error("User fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const filteredUsers = users.filter(
      (user) => recipientType === "all" || user.status === recipientType,
    );

    if (filteredUsers.length === 0) {
      toast.error("No recipients found for selected criteria");
      setIsSending(false);
      return;
    }

    try {
      await Promise.all(
        filteredUsers.map((user) =>
          emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
              to_email: user.email,
              subject,
              message,
            },
            PUBLIC_KEY,
          ),
        ),
      );

      toast.success(
        `Successfully sent emails to ${filteredUsers.length} recipients`,
      );

      // Reset form after success
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(
        "Failed to send some emails. Please check the console for details.",
      );
      console.error("Email sending error:", error);
    } finally {
      // Enable button after 10 seconds
      setTimeout(() => setIsSending(false), 10000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Email Campaign
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Recipient Group
          </label>
          <select
            value={recipientType}
            onChange={(e) => setRecipientType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            disabled={isLoading || isSending}
          >
            <option value="all">All Users ({userCounts.all})</option>
            <option value="pending">
              Pending Users ({userCounts.pending})
            </option>
            <option value="approved">
              Approved Users ({userCounts.approved})
            </option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Subject Line
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Email subject"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Message Content
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-48 resize-none"
            placeholder="Write your message here..."
            maxLength={MAX_MESSAGE_LENGTH}
            required
          />
          <div className="text-sm text-gray-500 text-right">
            {message.length}/{MAX_MESSAGE_LENGTH}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || isSending}
          className="w-full flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {isSending ? (
            <TailSpin color="#FFF" height={24} width={24} />
          ) : isLoading ? (
            "Loading Users..."
          ) : (
            `Send to ${userCounts[recipientType as keyof typeof userCounts]} Users`
          )}
        </button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default SendEmailForm;
