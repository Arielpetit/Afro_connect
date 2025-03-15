import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const location = useLocation();
  const { userId, professionalEmail } = location.state || {};
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !professionalEmail) {
      setSubmitError("Professional information missing");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await addDoc(collection(db, "contactRequests"), {
        ...formData,
        professionalId: userId,
        professionalEmail,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting contact request:", error);
      setSubmitError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-2 font-[Inter]">
            Contacter le professionnel
          </h2>
          <p className="text-slate-500">Nous vous répondrons sous 24h</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Nom complet
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Jean Dupont"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Adresse email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="jean.dupont@exemple.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Votre message
            </label>
            <textarea
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Décrivez votre demande..."
            />
          </div>

          {submitError && (
            <p className="text-red-500 text-sm text-center">{submitError}</p>
          )}

          {submitSuccess && (
            <p className="text-green-500 text-sm text-center">
              Message envoyé avec succès!
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-900 transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          </button>
        </form>

        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">
                Ou contactez via
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-5 mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-600 transition-colors p-2 hover:bg-slate-50 rounded-full"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://wa.me/123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-green-600 transition-colors p-2 hover:bg-slate-50 rounded-full"
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-500 transition-colors p-2 hover:bg-slate-50 rounded-full"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
