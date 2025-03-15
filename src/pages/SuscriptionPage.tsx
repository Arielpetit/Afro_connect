const SubscriptionPage = () => {
  const plans = [
    {
      name: "Débutant",
      price: 29,
      duration: "mois",
      description:
        "Meilleure option pour un usage personnel et votre prochain projet.",
      features: [
        "Configuration individuelle",
        "Aucun frais d'installation ou caché",
        "Taille de l'équipe : 1 développeur",
        "Support premium : 6 mois",
        "Mises à jour gratuites : 6 mois",
      ],
      cta: "Commencer",
      link: "https://buy.stripe.com/test_9AQ4kecAo1WcgzS9AA",
    },
    {
      name: "Entreprise",
      price: 99,
      duration: "mois",
      description:
        "Idéal pour plusieurs utilisateurs, avec support étendu et premium.",
      features: [
        "Configuration individuelle",
        "Aucun frais d'installation ou caché",
        "Taille de l'équipe : 10 développeurs",
        "Support premium : 24 mois",
        "Mises à jour gratuites : 24 mois",
      ],
      cta: "Commencer",
      link: "https://buy.stripe.com/test_4gw9Ey8k87gwdnGbIJ",
    },
    {
      name: "Grande entreprise",
      price: 499,
      duration: "mois",
      description:
        "Idéal pour une utilisation à grande échelle et des droits de redistribution étendus.",
      features: [
        "Configuration individuelle",
        "Aucun frais d'installation ou caché",
        "Taille de l'équipe : 100+ développeurs",
        "Support premium : 36 mois",
        "Mises à jour gratuites : 36 mois",
      ],
      cta: "Commencer",
      link: "https://buy.stripe.com/test_9AQ5oi7g41WcdnG6oq",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
      <div className="max-w-screen-xl px-4 py-16 mx-auto lg:py-24 lg:px-6">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-5xl">
            Plans d'abonnement
          </h2>
          <p className="mb-8 text-lg font-light text-gray-600 dark:text-gray-300">
            Solutions sur mesure pour chaque étape de votre croissance
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 transition-all duration-300 bg-white border rounded-xl dark:bg-gray-800 dark:border-gray-700
                  ${index === 1 ? "border-purple-500 shadow-xl dark:border-purple-500" : "border-gray-200 hover:border-purple-200 dark:hover:border-purple-500"}
                  hover:shadow-lg`}
            >
              {index === 1 && (
                <div className="absolute top-0 right-0 -mt-4 mr-6">
                  <span className="px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-full shadow-lg">
                    Populaire
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-300">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-end mb-8">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  €{plan.price}
                </span>
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  /{plan.duration}
                </span>
              </div>

              <ul className="mb-12 space-y-4 text-gray-600 dark:text-gray-300">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center space-x-3"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-purple-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full px-6 py-4 text-center font-medium transition-all duration-300 rounded-lg
                    ${
                      index === 1
                        ? "bg-purple-500 text-white hover:bg-purple-600 shadow-lg"
                        : "text-purple-500 bg-white border-2 border-purple-500 hover:bg-purple-50 dark:bg-gray-700 dark:hover:bg-gray-600"
                    }
                    `}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Besoin d'une solution personnalisée ?{" "}
            <a href="#" className="text-purple-500 hover:underline">
              Contactez notre équipe
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPage;
