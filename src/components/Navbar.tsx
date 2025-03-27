import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, User, Lightbulb, Home as HomeIcon, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const backdropVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <NavLink to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Afro Immobilier
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink 
              to="/" 
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <HomeIcon className="w-6 h-6" />
              Accueil
            </NavLink>
            <NavLink 
              to="/services" 
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <Briefcase className="w-6 h-6" />
              Nos Services
            </NavLink>
            <NavLink 
              to="/profile" 
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <User className="w-6 h-6" />
              Experts
            </NavLink>
            <div className="flex gap-4">
              <NavLink 
                to="/register" 
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2.5 rounded-full font-medium hover:scale-105 transition-all"
              >
                Enregistrez-vous
              </NavLink>
              <NavLink 
                to="/suggestions" 
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:scale-105 transition-all"
              >
                Suggestions
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                variants={backdropVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={closeMenu}
              />
              
              <motion.div
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
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
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-500 transition-colors text-gray-800"
                      onClick={closeMenu}
                    >
                      <HomeIcon className="w-6 h-6 text-blue-600" />
                      <span className="font-medium">Accueil</span>
                    </NavLink>
                    
                    <NavLink
                      to="/services"
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-500 transition-colors text-gray-800"
                      onClick={closeMenu}
                    >
                      <Briefcase className="w-6 h-6 text-purple-500" />
                      <span className="font-medium">Nos Services</span>
                    </NavLink>
                    
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-500 transition-colors text-gray-800"
                      onClick={closeMenu}
                    >
                      <User className="w-6 h-6 text-green-500" />
                      <span className="font-medium">Experts</span>
                    </NavLink>
                    
                    <NavLink
                      to="/suggestions"
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-500 transition-colors text-gray-800"
                      onClick={closeMenu}
                    >
                      <Lightbulb className="w-6 h-6 text-orange-500" />
                      <span className="font-medium">Suggestions</span>
                    </NavLink>
                    
                    <NavLink
                      to="/register"
                      className="block w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-xl font-medium text-center hover:scale-[1.02] transition-transform"
                      onClick={closeMenu}
                    >
                      Enregistrez-vous
                    </NavLink>
                  </nav>

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}