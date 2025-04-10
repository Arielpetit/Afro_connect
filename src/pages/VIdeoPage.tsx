// components/VideoGuidePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoGuidePage: React.FC = () => {
    const navigate = useNavigate();
  const steps = [
    {
      id: 1,
      number: '1',
      title: 'Ouvrir l\'application',
      description: 'Lancez l\'application sur votre appareil et accédez à la page d\'accueil.',
      icon: '📱'
    },
    {
      id: 2,
      number: '2',
      title: 'Trouver un professionnel',
      description: 'Cliquez sur le bouton "Trouver un professionnel" dans le menu principal.',
      icon: '🔍'
    },
    {
      id: 3,
      number: '3',
      title: 'Sélectionner une catégorie',
      description: 'Choisissez la catégorie d\'expertise qui correspond à votre besoin.',
      icon: '📚'
    },
    {
      id: 4,
      number: '4',
      title: 'Définir la zone géographique',
      description: 'Indiquez votre localisation ou la zone de recherche.',
      icon: '📍'
    },
    {
      id: 5,
      number: '5',
      title: 'Choisir la langue',
      description: 'Sélectionnez la langue préférée pour la communication.',
      icon: '🌐'
    },
    {
      id: 6,
      number: '6',
      title: 'Décrire votre projet',
      description: 'Expliquez votre projet en détail pour une compréhension optimale.',
      icon: '📝'
    },
    {
      id: 7,
      number: '7',
      title: 'Saisir vos coordonnées',
      description: 'Entrez votre adresse e-mail pour être contacté.',
      icon: '📧'
    },
    {
      id: 8,
      number: '8',
      title: 'Indiquer vos disponibilités',
      description: 'Précisez vos créneaux disponibles pour le rendez-vous.',
      icon: '⏰'
    },
    {
      id: 9,
      number: '9',
      title: 'Envoyer la demande',
      description: 'Finalisez et envoyez votre demande de mise en relation.',
      icon: '🚀'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Votre Parcours vers le<span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Professionnel Idéal</span>
        </h1>

        {/* Video Section */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-16 border-8 border-white">
          <video 
            controls 
            autoPlay 
            loop 
            muted 
            className="w-full h-auto"
          >
            <source src="/comment.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>

        {/* Progress Roadmap */}
        <div className="relative py-16">
          {/* Progress Line */}
          <div className="absolute left-1/2 top-0 h-full w-2 bg-gradient-to-b from-blue-200 via-blue-400 to-purple-600 transform -translate-x-1/2 shadow-lg rounded-full hidden md:block"></div>

          {/* Steps Container */}
          <div className="relative grid grid-cols-1 md:grid-cols-9 gap-y-12">
            {steps.map((step, index) => {
              const isLeftSide = index % 2 === 0;
              const stepPosition = index + 1;
              
              return (
                <div 
                  key={step.id}
                  className={`relative md:col-span-3 ${isLeftSide ? 'md:col-start-1' : 'md:col-start-7'} flex ${isLeftSide ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6`}
                >
                  {/* Progress Dot */}
                  <div className="absolute md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-4 border-purple-500 rounded-full shadow-xl hidden md:flex items-center justify-center">
                    <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* Step Card */}
                  <div className={`flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                    stepPosition === 9 ? 'border-2 border-purple-500' : ''
                  }`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white text-2xl">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-blue-600">Étape {step.number}</div>
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}

            {/* Final Reward */}
            <div className="md:col-span-9 text-center mt-20">
              <div className="inline-block bg-gradient-to-br from-purple-600 to-blue-600 p-1 rounded-2xl animate-gradient-x">
                <div className="bg-white rounded-xl p-8 shadow-2xl">
                  <div className="mb-6 animate-bounce">
                    <span className="text-6xl">🏆</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Félicitations ! Vous y êtes presque
                  </h2>
                  <p className="text-gray-600 text-lg mb-6">
                    Complétez ces étapes et soyez mis en relation avec les meilleurs professionnels<br className="hidden md:block"/> 
                    pour concrétiser votre projet en toute confiance
                  </p>
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105"   onClick={() => navigate('/profile')}>
                    Commencer mon parcours
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGuidePage;