import React from "react";
// import { useLocation } from "react-router-dom";
import { FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const ContactForm = () => {
    // const location = useLocation();
    // const { userId } = location.state || {};

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Message envoyé !");
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
                            required
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
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="jean.dupont@exemple.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                            Votre message
                        </label>
                        <textarea
                            rows={4}
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Décrivez votre demande..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-900 transition-all transform hover:scale-[1.01]"
                    >
                        Envoyer le message
                    </button>
                </form>

                <div className="mt-10">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-500">Ou contactez via</span>
                        </div>
                    </div>

                    <div className="flex justify-center gap-5 mt-6">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            className="text-slate-600 hover:text-blue-600 transition-colors p-2 hover:bg-slate-50 rounded-full"
                        >
                            <FaFacebook size={24} />
                        </a>
                        <a
                            href="https://wa.me/123456789"
                            target="_blank"
                            className="text-slate-600 hover:text-green-600 transition-colors p-2 hover:bg-slate-50 rounded-full"
                        >
                            <FaWhatsapp size={24} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
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