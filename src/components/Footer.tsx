import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { Newsletter } from './Newsletter';

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', color: 'text-blue-600' },
    { icon: Twitter, href: '#', color: 'text-sky-500' },
    { icon: Instagram, href: '#', color: 'text-pink-600' },
    { icon: Linkedin, href: '#', color: 'text-blue-700' }
  ];

  const quickLinks = [
    { label: 'À propos de nous', href: '/about' },
    { label: 'Nos Services', href: '/services' },
    { label: 'Devenir Partenaire', href: '/partners' },
    { label: 'Politique de confidentialité', href: '/privacy' },
    { label: 'Conditions d\'utilisation', href: '/terms' }
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 to-green-900 text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      {/* Newsletter Component */}
      <Newsletter />

      {/* Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white">
              Afro Immobilier Connect
            </h3>
            <p className="text-white/80 mb-6">
              Votre solution complète pour trouver des conseils d'experts et des services professionnels dans l'immobilier à travers le Canada.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`
                    w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm 
                    flex items-center justify-center hover:bg-white/20 
                    transition-all duration-300 ${social.color}
                  `}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white">
              Liens Rapides
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="flex items-center text-white/80 hover:text-white 
                    transition-colors group"
                  >
                    <ChevronRight 
                      className="w-4 h-4 mr-2 text-blue-500 
                      group-hover:translate-x-1 transition-transform"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white">
              Contactez-Nous
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                support@afroimmobilierconnect.com
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-green-400" />
                +1(438) 870-2000
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-red-400" />
                Partout au Canada
              </li>
            </ul>
          </motion.div>

          {/* Location Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="hidden lg:block"
          >
            <div className="relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-blue-900/50"></div>
              <img
                src="https://images.unsplash.com/photo-1586281380330-52761aafce25?auto=format&fit=crop&q=80"
                alt="Location Illustration"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/70">
            © {new Date().getFullYear()} Afro Immobilier Connect. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}