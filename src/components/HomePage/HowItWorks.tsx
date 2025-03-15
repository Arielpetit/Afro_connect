import React from "react";
import { Search, Handshake, MessageSquare } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Trouvez des Experts Immobiliers",
    description:
      "Cherchez des consultants immobiliers expérimentés spécialisés dans votre domaine d'intérêt.",
  },
  {
    icon: Handshake,
    title: "Obtenez des Conseils Professionnels",
    description:
      "Planifiez des consultations avec des experts pour recevoir des conseils et orientations personnalisés.",
  },
  {
    icon: MessageSquare,
    title: "Contactez un Expert",
    description:
      "Contactez votre expert sélectionné pour discuter de vos besoins et explorer les options disponibles.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Comment ça fonctionne
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="relative">
                <div className="w-20 h-20 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-blue-200" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
