import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/contact");
  };

  const questions: FAQItem[] = [
    {
      question: "Comment trouver un professionnel ?",
      answer:
        "Cliquez sur 'Trouver un professionnel'. Sélectionnez la spécialité, la région et la langue de communication. Ensuite, fournissez une brève description de votre situation. Le système vous mettra en relation avec un professionnel correspondant et vous recevrez une notification lorsqu'il vous contactera.",
    },
    {
      question: "Comment voir la liste des professionnels ?",
      answer:
        "Sur la page d'accueil, cliquez sur 'Liste des professionnels' pour afficher tous les experts disponibles sur la plateforme.",
    },
    {
      question: "Comment contacter le support ?",
      answer:
        "Naviguez vers la page de contact et laissez un message à notre adresse e-mail. Nous vous répondrons dans les plus brefs délais.",
    },
    {
      question: "Quels services offrez-vous ?",
      answer:
        "Afro Immobilier Connect est votre solution pour trouver des conseils d'experts et des services professionnels pour vous accompagner dans vos démarches d'acquisition immobilière à travers le Canada.",
    },
    {
      question: "Quels sont les frais pour utiliser la plateforme ?",
      answer:
        "L'utilisation de la plateforme pour rechercher un professionnel est gratuite. Certains services proposés par les experts peuvent être payants en fonction de leurs tarifs.",
    },
    {
      question: "Comment savoir si un professionnel est fiable ?",
      answer:
        "Tous les professionnels inscrits sur notre plateforme sont vérifiés et doivent fournir des références pour garantir leur fiabilité et leur expertise.",
    },
    {
      question: "Puis-je laisser un avis sur un professionnel ?",
      answer:
        "Oui, après avoir travaillé avec un professionnel, vous pouvez laisser un avis pour aider d'autres utilisateurs à faire leur choix.",
    },
    {
      question: "Quels types de professionnels sont disponibles ?",
      answer:
        "Nous mettons à votre disposition des experts en immobilier, tels que des agents immobiliers, des courtiers, des avocats spécialisés, des experts en financement, et bien d'autres.",
    },
    {
      question: "Puis-je contacter plusieurs professionnels en même temps ?",
      answer:
        "Oui, vous pouvez envoyer plusieurs demandes et choisir le professionnel qui correspond le mieux à vos besoins.",
    },
    {
      question: "La plateforme est-elle disponible dans d'autres pays ?",
      answer:
        "Actuellement, Afro Immobilier Connect est disponible au Canada, mais nous prévoyons d'étendre notre service à d'autres régions prochainement.",
    },
  ];

  const filteredQuestions = questions.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Foire aux questions
          </h1>
          <p className="text-lg text-gray-600">
            Trouvez des réponses aux questions les plus courantes sur notre plateforme
          </p>
        </div>
        <div className="mb-10">
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              placeholder="Rechercher une question..."
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg divide-y divide-gray-200/50">
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Aucun résultat trouvé pour "{searchQuery}"
            </div>
          ) : (
            filteredQuestions.map((item, index) => (
              <div
                key={index}
                className="p-6 hover:bg-gray-50 transition-colors duration-150"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <h3 className="text-lg font-medium text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {openIndex === index && (
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
        <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Vous avez encore des questions ?
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Vous ne trouvez pas la réponse que vous cherchez ? Notre équipe support est là pour vous aider.
          </p>
          <button
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm"
            onClick={handleClick}
          >
            Contacter le support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;