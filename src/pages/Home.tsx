import React from "react";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { HowItWorks } from "../components/HowItWorks";
import { Testimonials } from "../components/Testimonials";
import { Statistic } from "../components/CounterItem";
import About1 from "../components/About";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { ServicesSection } from "../components/ServicesSection";
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* Main Content */}
      <Hero />
      <ServicesSection />
      <Features />
      <About1 /> 
      <Statistic />
      <HowItWorks />
      <Testimonials />

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://chat.whatsapp.com/KlT5V3ShJK78aqBdGHBIxX"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join WhatsApp group"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-green-500 text-white 
          px-4 py-3 md:px-6 md:py-4 flex items-center rounded-full shadow-xl 
          hover:shadow-2xl transition-all duration-300 group z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <FaWhatsapp className="text-2xl md:text-3xl mr-2 animate-ping-slow" />
        <span className="font-semibold text-sm md:text-lg">
          {t('home.whatsapp.buttonText')}
        </span>
        <div className="ml-2 w-2 h-2 bg-white rounded-full opacity-0 
          group-hover:opacity-100 transition-opacity duration-200" />
      </motion.a>
      
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-5 pointer-events-none 
        bg-[radial-gradient(#2563eb_1px,transparent_1px)] 
        [background-size:32px_32px]" />
    </div>
  );
};

export default Home;