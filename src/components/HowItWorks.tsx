import React from 'react';
import { motion } from 'framer-motion';
import { Search, Handshake, MessageSquare, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function HowItWorks() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const steps = [
    {
      icon: Search,
      title: t('home.howItWorks.step1.title'),
      description: t('home.howItWorks.step1.description'),
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Handshake,
      title: t('home.howItWorks.step2.title'),
      description: t('home.howItWorks.step2.description'),
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: MessageSquare,
      title: t('home.howItWorks.step3.title'),
      description: t('home.howItWorks.step3.description'),
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            {t('home.howItWorks.title')}
          </h2>
          <p className="text-gray-600 md:text-lg max-w-xl mx-auto">
            {t('home.howItWorks.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: 'easeOut' 
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group"
            >
              <div className="h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`mb-6 w-16 h-16 mx-auto rounded-xl flex items-center justify-center 
                    bg-gradient-to-br ${step.gradient} text-white shadow-lg`}
                >
                  <step.icon className="w-8 h-8" />
                </motion.div>

                {/* Step Number */}
                <div className="absolute top-4 right-4 text-2xl font-bold text-gray-200">
                  0{index + 1}
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">
                    {step.description}
                  </p>

                  {/* Learn More Button */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    onClick={() => navigate('/guide')}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 
                      text-sm font-medium cursor-pointer"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}