import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, User, Lightbulb, Home as HomeIcon, Briefcase, Search } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Consistent rental links for both desktop and mobile
  const rentalLinks = [
    {
      name: t('navbar.searchRental'),
      to: "/rental/search",
      icon: <Search className="w-5 h-5" />
    },
    {
      name: t('navbar.postRental'),
      to: "/rental/add",
      icon: <HomeIcon className="w-5 h-5" />
    }
  ];

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <NavLink to="/">
            <img src="/afro-Connect-removebg-preview.png" alt="Afro Immobilier" className="h-32 w-auto" />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink 
              to="/" 
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <HomeIcon className="w-6 h-6" />
              {t('navbar.home')}
            </NavLink>
            <NavLink 
              to="/services" 
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <Briefcase className="w-6 h-6" />
              {t('navbar.services')}
            </NavLink>
            <NavLink 
              to="/profile" 
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <User className="w-6 h-6" />
              {t('navbar.experts')}
            </NavLink>
            
            {/* Rental Links - Desktop */}
            <div className="flex items-center space-x-4">
              {rentalLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                </NavLink>
              ))}
            </div>
            
            <div className="flex gap-4 ml-4">
              <NavLink 
                to="/register" 
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2.5 rounded-full font-medium hover:scale-105 transition-all"
              >
                {t('navbar.register')}
              </NavLink>
              <NavLink 
                to="/suggestions" 
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:scale-105 transition-all"
              >
                {t('navbar.suggestions')}
              </NavLink>
            </div>
            <LanguageSwitcher />
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher />
            <button 
              onClick={toggleMenu} 
              className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMenu}
            />
            
            <div
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 md:hidden"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-lg text-gray-800">Menu</span>
                  <X 
                    className="w-7 h-7 cursor-pointer text-gray-600 hover:text-red-500 transition-colors" 
                    onClick={closeMenu} 
                  />
                </div>

                <nav className="space-y-4 flex-1">
                  <NavLink
                    to="/"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-800"
                    onClick={closeMenu}
                  >
                    <HomeIcon className="w-6 h-6 text-blue-600" />
                    <span className="font-medium">{t('navbar.home')}</span>
                  </NavLink>
                  
                  <NavLink
                    to="/services"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-800"
                    onClick={closeMenu}
                  >
                    <Briefcase className="w-6 h-6 text-purple-500" />
                    <span className="font-medium">{t('navbar.services')}</span>
                  </NavLink>
                  
                  <NavLink
                    to="/profile"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-800"
                    onClick={closeMenu}
                  >
                    <User className="w-6 h-6 text-green-500" />
                    <span className="font-medium">{t('navbar.experts')}</span>
                  </NavLink>
                  
                  {/* Rental Links - Mobile */}
                  {rentalLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.to}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-800"
                      onClick={closeMenu}
                    >
                      <span className="text-blue-500">{link.icon}</span>
                      <span className="font-medium">{link.name}</span>
                    </NavLink>
                  ))}
                  
                  <NavLink
                    to="/suggestions"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-800"
                    onClick={closeMenu}
                  >
                    <Lightbulb className="w-6 h-6 text-orange-500" />
                    <span className="font-medium">{t('navbar.suggestions')}</span>
                  </NavLink>
                  
                  <NavLink
                    to="/register"
                    className="block w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-xl font-medium text-center hover:scale-105 transition-transform mt-4"
                    onClick={closeMenu}
                  >
                    {t('navbar.register')}
                  </NavLink>
                </nav>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}