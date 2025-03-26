import React from 'react';
import { MapPin,  Clock, User, Building } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Recherche Basée sur la Localisation',
    description: 'Trouvez des professionnels offrant des conseils selon vos préférences de localisation et de quartier au Canada.',
    color: 'bg-green-50 text-green-600'
  },
  {
    icon: Clock,
    title: 'Consultations Rapides',
    description: 'Planifiez vos consultations avec des professionnels à votre convenance, même pendant les week-ends.',
    color: 'bg-yellow-50 text-yellow-600'
  },
  {
    icon: Building,
    title: 'Professionnels Immobiliers Experts',
    description: 'Connectez-vous avec des experts immobiliers qualifiés pour vous guider dans vos démarches d\'acquisition de propriétés.',
    color: 'bg-indigo-50 text-indigo-600'
  },
  {
    icon: User,
    title: 'Expérience Personnalisée',
    description: 'Des recommandations personnalisées selon vos besoins, préférences et historique de recherche.',
    color: 'bg-red-50 text-red-600'
  }
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Pourquoi Choisir Afro Immobilier Connect</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Profitez des meilleurs services pour vous connecter avec des professionnels et obtenir des conseils d\'experts pour faciliter votre acquisition de propriété au Canada.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`p-6 rounded-xl ${feature.color} hover:scale-105 transition-all duration-300 cursor-pointer`}
            >
              <feature.icon className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
