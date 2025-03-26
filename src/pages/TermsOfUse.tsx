// TermsOfUse.tsx
export default function TermsOfUse() {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Conditions d'Utilisation - Afro Immobilier Connect
            </h1>
            <p className="text-gray-600">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-CA')}
            </p>
          </header>
  
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
            {/* Section 1.1 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1.1. Présentation du Service
              </h2>
              <p className="text-gray-700 mb-4">
                Afro Immobilier Connect est un service de mise en relation entre :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-gray-700">
                  <strong>Les clients</strong> (particuliers ou entreprises) cherchant des services immobiliers
                </li>
                <li className="text-gray-700">
                  <strong>Les professionnels de l'immobilier</strong> (agents immobiliers, promoteurs, gestionnaires de biens, etc.)
                </li>
              </ul>
              <p className="mt-4 text-gray-700 bg-blue-50 p-4 rounded-lg">
                Notre rôle est exclusivement de faciliter la connexion entre ces parties. Nous ne sommes ni intermédiaires, ni garants des transactions.
              </p>
            </section>
  
            {/* Section 1.2 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1.2. Acceptation des Conditions
              </h2>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  L'accès et l'utilisation de notre plateforme impliquent l'acceptation sans réserve des présentes conditions.
                  <br />
                  <strong>Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser nos services.</strong>
                </p>
              </div>
            </section>
  
            {/* Section 1.3 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1.3. Obligations des Utilisateurs
              </h2>
              
              {/* Clients */}
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">
                  Pour les Clients :
                </h3>
                <ul className="space-y-2">
                  {[
                    '✅ Fournir des informations exactes et complètes',
                    '✅ Utilisation légale et respectueuse',
                    '❌ Publication de fausses demandes interdite',
                    '❌ Contact hors cadre professionnel interdit'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span>{item.startsWith('✅') ? '✓' : '✗'}</span>
                      {item.substring(2)}
                    </li>
                  ))}
                </ul>
              </div>
  
              {/* Professionnels */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  Pour les Professionnels :
                </h3>
                <ul className="space-y-2">
                  {[
                    '✅ Information exacte sur le profil',
                    '✅ Respect des lois en vigueur',
                    '✅ Honorer les engagements clients',
                    '❌ Sollicitation directe interdite'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span>{item.startsWith('✅') ? '✓' : '✗'}</span>
                      {item.substring(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
  
            {/* Section 1.4 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1.4. Limitation de Responsabilité
              </h2>
              <div className="bg-yellow-50 p-4 rounded-lg space-y-2">
                {[
                  '📌 Non garantie de qualité des professionnels listés',
                  '📌 Relations commerciales indépendantes de notre service',
                  '📌 Non responsabilité des litiges entre utilisateurs'
                ].map((item, index) => (
                  <p key={index} className="text-gray-700">{item}</p>
                ))}
              </div>
            </section>
  
            {/* Section 1.5 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1.5. Suspension et Résiliation de Compte
              </h2>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Nous nous réservons le droit de suspendre ou supprimer tout compte en cas de :
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  {[
                    'Informations fausses ou trompeuses',
                    'Utilisation abusive ou frauduleuse',
                    'Contenus ou comportements inappropriés'
                  ].map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
            </section>
  
            {/* Section 1.6 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1.6. Modification des Conditions
              </h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Nous pouvons mettre à jour ces conditions à tout moment. Les modifications seront notifiées via :
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li className="text-gray-700">Notification sur le site web</li>
                  <li className="text-gray-700">Email aux utilisateurs</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }