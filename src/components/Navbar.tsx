import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, User, Home as HomeIcon } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <NavLink 
            to="/" 
            className="text-2xl font-bold text-blue-600"
            onClick={closeMenu}
          >
            Afro Immobilier Connect Canada 
          </NavLink>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink 
              to="/" 
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              <HomeIcon className="w-6 h-6" />
            </NavLink>
            <NavLink 
              to="/profile" 
              className="relative text-gray-700 hover:text-blue-500 transition-colors"
            >
              <User className="w-6 h-6" />
            </NavLink>
            <NavLink 
              to="/register" 
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              Enregistrez-vous
            </NavLink>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-4 space-y-4 flex flex-col items-center">
            <NavLink 
              to="/" 
              className="text-gray-700 hover:text-blue-500 transition-colors flex items-center gap-2"
              onClick={closeMenu}
            >
              <HomeIcon className="w-6 h-6" /> <span>Accueil</span>
            </NavLink>
            <NavLink 
              to="/profile" 
              className="relative text-gray-700 hover:text-blue-500 transition-colors flex items-center gap-2"
              onClick={closeMenu}
            >
              <User className="w-6 h-6" /> <span>Trouver des experts</span>
            </NavLink>
            <NavLink 
              to="/register" 
              className="w-full bg-blue-600 text-white py-2.5 rounded-full font-medium text-sm hover:bg-blue-700 transition-colors text-center"
              onClick={closeMenu}
            >
              Enregistrez-vous
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}