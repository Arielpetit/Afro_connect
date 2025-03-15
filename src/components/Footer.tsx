import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <Newsletter />
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              À propos d'Afro Immobilier Connect
            </h3>
            <p className="text-sm leading-relaxed">
              Afro Immobilier Connect est votre solution pour trouver des
              conseils d'experts et des services professionnels pour vous aider
              dans vos démarches d'acquisition immobilière. Nous vous mettons en
              relation avec des spécialistes qualifiés à travers le Canada.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Liens Utiles
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  À propos de nous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Nos Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Devenir Partenaire
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Conditions d'utilisation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contactez-Nous
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-500" />
                support@afroimmobilierconnect.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-500" />
                +1(438) 870-2000
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                123 Rue de l'Immobilier, Ville Principale
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Suivez-Nous
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <img
                src="https://images.unsplash.com/photo-1586281380330-52761aafce25?auto=format&fit=crop&q=80"
                alt="Immobilier illustration"
                className="rounded-lg opacity-75 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>© 2024 Afro Immobilier Connect. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
