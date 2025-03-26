// PrivacyPolicy.tsx
export default function PrivacyPolicy() {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Politique de Confidentialité - Afro Immobilier Connect
            </h1>
            <p className="text-gray-600">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-CA')}
            </p>
          </header>
  
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
            {/* Section 2.1 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2.1. Données Collectées
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Clients */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">
                    Données des Clients
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {[
                      'Nom et prénom',
                      'Email',
                      'Numéro de téléphone',
                      'Adresse'
                    ].map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
  
                {/* Professionnels */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">
                    Données des Professionnels
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {[
                      'Nom de l\'entreprise',
                      'Nom du contact',
                      'Email professionnel',
                      'Numéro de téléphone',
                      'Adresse du bureau',
                      'Site web',
                      'Zone de couverture',
                      'Langues parlées',
                      'Disponibilité',
                      'Années d\'expérience',
                      'Nombre de projets réalisés',
                      'Services proposés',
                      'Expertise',
                      'Biographie',
                      'Numéro de permis immobilier'
                    ].map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
  
            {/* Section 2.2 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2.2. Finalité de la Collecte
              </h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  {[
                    'Mise en relation client-professionnel',
                    'Amélioration de l\'expérience utilisateur',
                    'Analyse et optimisation des services',
                    'Prévention des fraudes'
                  ].map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-gray-700 font-semibold">
                  Nous ne revendons ni ne partageons vos données sans consentement explicite.
                </p>
              </div>
            </section>
  
            {/* Section 2.3 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2.3. Sécurité des Données
              </h2>
              <div className="bg-yellow-50 p-4 rounded-lg space-y-2">
                {[
                  '🛡️ Protection contre accès non autorisé',
                  '🛡️ Prévention contre l\'altération des données',
                  '🛡️ Sécurité renforcée contre le piratage'
                ].map((item, index) => (
                  <p key={index} className="text-gray-700">{item}</p>
                ))}
              </div>
            </section>
  
            {/* Section 2.4 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2.4. Conservation des Données
              </h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  Vos données sont conservées aussi longtemps que nécessaire pour fournir nos services.
                  <br />
                  <span className="font-semibold">Vous pouvez demander la suppression à tout moment.</span>
                </p>
              </div>
            </section>
  
            {/* Section 2.5 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2.5. Cookies
              </h2>
              <div className="bg-orange-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  {[
                    '🍪 Amélioration de la navigation',
                    '📊 Analyse d\'audience',
                    '🛠️ Personnalisation des services'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-gray-700 text-sm">
                  Vous pouvez gérer les cookies via les paramètres de votre navigateur.
                </p>
              </div>
            </section>
  
            {/* Section 2.6 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2.6. Droits des Utilisateurs
              </h2>
              <div className="bg-teal-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  {[
                    'Accès à vos données personnelles',
                    'Modification des informations erronées',
                    'Suppression des données sous conditions',
                    'Limitation de l\'utilisation des données'
                  ].map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
            </section>
  
            {/* Section 2.7 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2.7. Contact et Réclamations
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg space-y-3">
                <p className="text-gray-700">
                  📩 Email :{' '}
                  <a
                    href="mailto:support@afroimmobilierconnect.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@afroimmobilierconnect.com
                  </a>
                </p>
                <p className="text-gray-700">
                  📞 Téléphone :{' '}
                  <a
                    href="tel:+14388702000"
                    className="text-blue-600 hover:underline"
                  >
                    +1 (438) 870-2000
                  </a>
                </p>
                <p className="text-gray-700 text-sm mt-4">
                  Réponse garantie sous 72 heures ouvrées
                </p>
              </div>
            </section>
  
            {/* Footer */}
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-gray-700 font-semibold">
                Pays Ciblé : Canada 🇨🇦
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Conforme au RGPD et à la Loi sur la protection des renseignements personnels du Canada
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }