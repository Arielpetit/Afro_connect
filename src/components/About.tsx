import { Users, Handshake, Target, ChevronRight } from 'lucide-react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const About1 = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center -mx-4">
          {/* Images Column */}
          <motion.div 
            className="w-full px-4 lg:w-6/12"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-30% 0px" }}
            transition={{ 
              duration: 1.2,
              type: "spring",
              stiffness: 60,
              damping: 20
            }}
          >
            <div className="flex items-center -mx-3 sm:-mx-4">
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <motion.div 
                  className="py-3 sm:py-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src="https://keurcity.com/wp-content/uploads/2021/02/Agence-immobiliere_Senegal.jpg"
                    alt="Team collaboration"
                    className="w-full rounded-2xl shadow-xl border border-cyan-400/20"
                  />
                </motion.div>
                <motion.div 
                  className="py-3 sm:py-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src="https://th.bing.com/th/id/OIP.6u8Q9sJfIry08VR5kSVp5wHaFj?rs=1&pid=ImgDetMain"
                    alt="Community network"
                    className="w-full rounded-2xl shadow-xl border border-cyan-400/20"
                  />
                </motion.div>
              </div>
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <motion.div 
                  className="relative z-10 my-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.4,
                    type: "spring"
                  }}
                >
                  <img
                    src="https://www.open.edu/openlearn/pluginfile.php/1448864/mod_oucontent/oucontent/78267/2a0f1b0d/6f8223a5/com_1_ol_week2_fig5.tif.jpg"
                    alt="Professional meeting"
                    className="w-full h-[230px] object-cover rounded-2xl shadow-xl border border-cyan-400/20"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            className="w-full px-4 lg:w-6/12"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-30% 0px" }}
            transition={{ 
              duration: 1.2,
              type: "spring",
              stiffness: 60,
              damping: 20
            }}
          >
            <div className="lg:pl-12">
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.h2 
                  className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-black dark:bg-white font-mono"
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.8,
                    type: "spring"
                  }}
                >
                  {t('home.about.whoWeAre')}
                </motion.h2>

                <motion.div 
                  className="space-y-8"
                  initial="hidden"
                  whileInView="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.3 } }
                  }}
                >
                  <motion.div 
                    className="flex items-start space-x-4"
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          type: "spring",
                          stiffness: 80,
                          damping: 15
                        }
                      }
                    }}
                    whileHover={{ x: 15 }}
                  >
                    <Target className="w-8 h-8 text-cyan-500 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        {t('home.about.mission.title')}
                      </h3>
                      <p className="text-gray-600">
                        {t('home.about.mission.description')}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start space-x-4"
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          type: "spring",
                          stiffness: 80,
                          damping: 15,
                          delay: 0.2
                        }
                      }
                    }}
                    whileHover={{ x: 15 }}
                  >
                    <Handshake className="w-8 h-8 text-purple-500 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        {t('home.about.values.title')}
                      </h3>
                      <p className="text-gray-600">
                        {t('home.about.values.description')}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start space-x-4"
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          type: "spring",
                          stiffness: 80,
                          damping: 15,
                          delay: 0.4
                        }
                      }
                    }}
                    whileHover={{ x: 15 }}
                  >
                    <Users className="w-8 h-8 text-purple-500 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        {t('home.about.services.title')}
                      </h3>
                      <p className="text-gray-600">
                        {t('home.about.services.description')}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              <Link to="/services" className="group inline-block">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center text-sm md:text-base font-medium group-hover:text-blue-600 transition-colors cursor-pointer"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <span>{t('home.about.learnMore')}</span>
                  <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated decorative elements */}
      <motion.div 
        className="absolute bottom-0 right-0 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#06b6d4"></circle>
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#dots)"></rect>
        </svg>
      </motion.div>
    </section>
  );
};

export default About1;