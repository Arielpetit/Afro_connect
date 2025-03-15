import React from "react";
import { Hero } from "../components/HomePage/Hero";
import { Features } from "../components/HomePage/Features";
import { HowItWorks } from "../components/HomePage/HowItWorks";
import { Testimonials } from "../components/HomePage/Testimonials";
import { FaWhatsapp } from "react-icons/fa";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />

      {/* WhatsApp Button */}
      <a
        href="https://chat.whatsapp.com/KlT5V3ShJK78aqBdGHBIxX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 flex items-center rounded-full shadow-lg hover:bg-green-600 transition duration-300"
      >
        <FaWhatsapp className="text-2xl mr-2" />
        <span className="font-semibold">Groupe WhatsApp </span>
      </a>
    </>
  );
};

export default Home;
