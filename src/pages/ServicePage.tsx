import { FiTarget, FiHeart, FiUsers, FiMapPin, FiBriefcase, FiDollarSign, FiCheckCircle, FiGlobe, FiStar } from 'react-icons/fi';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-green-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Afro-Immobilier Connect Canada
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Votre pont vers l'expertise immobilière au sein de la communauté afro-canadienne
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="flex-1">
              <FiTarget className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Notre Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Faciliter la mise en relation des professionnels et des clients de la communauté afro-canadienne 
                dans le domaine immobilier, en leur permettant d'accéder rapidement à un réseau de partenaires 
                qualifiés qui comprennent leurs réalités culturelles et géographiques.
              </p>
            </div>
            <div className="flex-1">
              <img 
                src="https://www.elisfa.fr/wp-content/uploads/2023/02/mission.jpg" 
                alt="Mission" 
                className="rounded-xl shadow-lg w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Valeurs Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <FiHeart className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nos Valeurs</h3>
              <p className="text-gray-600">
                Confiance, accessibilité et entraide - la pierre angulaire de chaque interaction
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <FiUsers className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600">
                Création d'un écosystème immobilier basé sur le réseautage communautaire
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <FiMapPin className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expertise Locale</h3>
              <p className="text-gray-600">
                Connaissance approfondie des réalités culturelles et géographiques
              </p>
            </div>
          </div>

          {/* Valeur Ajoutée */}
          <div className="bg-blue-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Notre Valeur Ajoutée
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FiBriefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Visibilité Professionnelle</h3>
                    <p className="text-gray-600">
                      Mise en relation ciblée selon la région géographique et expertise
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FiUsers className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Partage des Connaissances</h3>
                    <p className="text-gray-600">
                      Démocratisation de l'accès aux opportunités immobilières
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FiDollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Accès aux Projets</h3>
                    <p className="text-gray-600">
                      Ouverture vers des collaborations et opportunités exclusives
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FiMapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Impact Communautaire</h3>
                    <p className="text-gray-600">
                      Renforcement de la présence des professionnels afro-canadiens
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Updated Services Section */}
          <section className="py-12">
            <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-4">Mise en Relation Expert</h3>
                <p className="text-gray-600 mb-4">
                  Afro-Immobilier Connect Canada est une plateforme de mise en relation qui vous permet de trouver les professionnels adaptés à vos besoins immobiliers. Notre rôle est de vous référer des experts qualifiés—courtiers immobiliers, courtiers hypothécaires, inspecteurs, notaires, etc.—avec qui vous pouvez faire affaire directement.
                </p>
                <p className="text-gray-600 mb-4">
                  Que vous soyez un acheteur cherchant une maison, un vendeur souhaitant mettre votre propriété sur le marché, ou un investisseur à la recherche de conseils spécialisés, notre plateforme vous connecte avec des professionnels qui non seulement possèdent l’expertise nécessaire, mais qui comprennent également les réalités culturelles et géographiques propres à la communauté afro-canadienne. Cela signifie que vous bénéficiez d’un service personnalisé qui prend en compte vos besoins spécifiques et vos attentes.
                </p>
                <p className="text-gray-600 mb-4">
                  Nous mettons un point d’honneur à ce que chaque professionnel référé soit qualifié et expérimenté, afin que vous puissiez avancer dans vos projets immobiliers en toute confiance. En utilisant notre réseau, vous gagnez du temps et évitez les recherches fastidieuses, car nous faisons le travail de présélection pour vous.
                </p>
                <ul className="space-y-2 text-blue-600">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    Références ciblées selon vos besoins spécifiques et votre localisation
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    Experts vérifiés et certifiés pour garantir un service de qualité
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    Mise en relation rapide et efficace pour accélérer vos projets
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-4">Neutralité Absolue</h3>
                <p className="text-gray-600 mb-4">
                  Nous n’avons aucun intérêt financier dans les transactions et restons entièrement neutres dans le processus. Notre objectif est de favoriser les échanges et la collaboration entre les professionnels de la communauté, afin qu’ils puissent développer leurs activités ensemble et mieux servir leurs clients.
                </p>
                <p className="text-gray-600 mb-4">
                  En tant que plateforme indépendante, Afro-Immobilier Connect Canada ne tire aucun profit des accords ou des transactions conclues entre vous et les professionnels que nous vous référons. Cette neutralité nous permet de rester concentrés sur notre mission principale : créer un réseau solide et fiable où les professionnels et les clients peuvent collaborer en toute transparence.
                </p>
                <p className="text-gray-600 mb-4">
                  Notre engagement envers la neutralité signifie également que nous ne favorisons aucun professionnel en particulier. Chaque recommandation est basée sur vos besoins et les compétences des experts disponibles, assurant ainsi que vous recevez des options objectives et adaptées. Ce modèle renforce la confiance au sein de la communauté et garantit que vos intérêts passent toujours en premier.
                </p>
                <ul className="space-y-2 text-blue-600">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    Conseils objectifs et impartiaux pour vous guider sans parti pris
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    Transparence à chaque étape de la mise en relation
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    Aucune commission ou intérêt financier sur les transactions
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* New Section: Notre Engagement */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Notre Engagement</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <FiGlobe className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Inclusion</h3>
                  <p className="text-gray-600">
                    Promouvoir la diversité et l'inclusion dans le secteur immobilier canadien
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <FiStar className="w-8 h-8 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                  <p className="text-gray-600">
                    Offrir des services de haute qualité pour garantir la satisfaction de nos utilisateurs
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <FiUsers className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Communauté</h3>
                  <p className="text-gray-600">
                    Renforcer les liens au sein de la communauté afro-canadienne à travers l'immobilier
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* New Section: Notre Histoire */}
          <section className="py-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Notre Histoire</h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Notre+Histoire" 
                    alt="Notre Histoire" 
                    className="rounded-xl shadow-lg w-full h-64 object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    Fondée en 2025, Afro-Immobilier Connect Canada est née de la vision de créer un espace où la communauté afro-canadienne pourrait trouver des professionnels immobiliers qui comprennent leurs besoins uniques.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Notre plateforme a rapidement grandi, connectant des milliers de clients avec des experts locaux, et devenant un pilier de confiance dans le secteur immobilier canadien.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* New Section: Témoignages */}
          <section className="py-16 bg-blue-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Ce Que Disent Nos Utilisateurs</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-600 mb-4">
                    "Grâce à Afro-Immobilier Connect, j'ai trouvé un courtier qui a compris mes besoins culturels et m'a aidé à trouver la maison parfaite."
                  </p>
                  <div className="flex items-center gap-4">
                    <img 
                      src="https://via.placeholder.com/48?text=Marie" 
                      alt="Marie L." 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">Marie L.</h4>
                      <p className="text-sm text-gray-500">Client, Toronto</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-600 mb-4">
                    "En tant que professionnel, cette plateforme m'a permis de me connecter avec des clients qui apprécient mon expertise locale."
                  </p>
                  <div className="flex items-center gap-4">
                    <img 
                      src="https://via.placeholder.com/48?text=Jean-Pierre" 
                      alt="Jean-Pierre D." 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">Jean-Pierre D.</h4>
                      <p className="text-sm text-gray-500">Courtier, Montréal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};