import { Users, Handshake, Target, ChevronRight } from 'lucide-react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const About1 = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center -mx-4">
          {/* Images Column */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="flex items-center -mx-3 sm:-mx-4">
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <div className="py-3 sm:py-4">
                  <img
                    src="https://keurcity.com/wp-content/uploads/2021/02/Agence-immobiliere_Senegal.jpg"
                    alt="Team collaboration"
                    className="w-full  rounded-2xl shadow-xl border border-cyan-400/20"
                  />
                </div>
                <div className="py-3 sm:py-4">
                  <img
                    src="https://perfectagent.com.au/wp-content/uploads/2020/02/realtor.jpg"
                    alt="Community network"
                    className="w-full rounded-2xl shadow-xl border border-cyan-400/20"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <div className="relative z-10 my-4">
                  <img
                    src="https://www.open.edu/openlearn/pluginfile.php/1448864/mod_oucontent/oucontent/78267/2a0f1b0d/6f8223a5/com_1_ol_week2_fig5.tif.jpg"
                    alt="Professional meeting"
                    className="w-full h-[230px] object-cover rounded-2xl shadow-xl border border-cyan-400/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="lg:pl-12">
              <div className="mb-8">
                <motion.h2 
                  className="text-3xl font-bold mb-6 text-transparent bg-clip-text 
                    bg-black dark:bg-white font-mono"
                >
                  Qui Sommes-Nous?
                </motion.h2>

                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <Target className="w-8 h-8 text-cyan-500 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">Notre Mission</h3>
                      <p className="text-gray-600">
                        Connecter les professionnels et clients afro-canadiens de l’immobilier via un réseau qualifié et adapté à leurs réalités.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Handshake className="w-8 h-8 text-purple-500 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">Nos Valeurs</h3>
                      <p className="text-gray-600">
                        Confiance, accessibilité et entraide, favorisant les collaborations authentiques et le partage de connaissances.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Users className="w-8 h-8 text-purple-500 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">Nos Services</h3>
                      <p className="text-gray-600">
                        Mise en relation directe avec des experts qualifiés (courtiers, notaires, inspecteurs) 
                        selon vos besoins spécifiques. Une plateforme collaborative pour développer des activités 
                        communes et mieux servir notre communauté.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/services" className="group inline-block">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-sm md:text-base font-medium group-hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>En savoir plus</span>
                  <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </div>      

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 opacity-10">
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#06b6d4"></circle>
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#dots)"></rect>
        </svg>
      </div>
    </section>
  );
};

export default About1;
