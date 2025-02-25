import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, User, Phone, DollarSign, Home as HomeIcon, HelpCircle, BookOpen } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            Afro Immobilier Connect
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-4 py-2 font-medium transition-all duration-300 text-gray-700 hover:bg-blue-500 hover:text-white rounded-full ${
                  isActive ? 'bg-blue-500 text-white' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/pricing" 
              className={({ isActive }) => 
                `px-4 py-2 font-medium transition-all duration-300 text-gray-700 hover:bg-blue-500 hover:text-white rounded-full ${
                  isActive ? 'bg-blue-500 text-white' : ''
                }`
              }
            >
              Tarification
            </NavLink>
            <NavLink 
              to="/faqs" 
              className={({ isActive }) => 
                `px-4 py-2 font-medium transition-all duration-300 text-gray-700 hover:bg-blue-500 hover:text-white rounded-full ${
                  isActive ? 'bg-blue-500 text-white' : ''
                }`
              }
            >
              FAQs
            </NavLink>
            <NavLink 
              to="/resources" 
              className={({ isActive }) => 
                `px-4 py-2 font-medium transition-all duration-300 text-gray-700 hover:bg-blue-500 hover:text-white rounded-full ${
                  isActive ? 'bg-blue-500 text-white' : ''
                }`
              }
            >
              Resources
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `px-4 py-2 font-medium transition-all duration-300 text-gray-700 hover:bg-blue-500 hover:text-white rounded-full ${
                  isActive ? 'bg-blue-500 text-white' : ''
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `p-2 font-medium transition-all duration-300 text-gray-700 hover:bg-blue-500 hover:text-white rounded-full ${
                  isActive ? 'bg-blue-500 text-white' : ''
                }`
              }
            >
              <User className="w-6 h-6" />
            </NavLink>
            <NavLink to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-blue-700 transition-colors">
              Enregistrez-vous
            </NavLink>
            <NavLink to="/login" className="bg-green-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-green-700 transition-colors">
              Admin
            </NavLink>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-700 focus:outline-none">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={toggleMenu} className="text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors ${
                isActive ? 'bg-blue-500 text-white' : ''
              }`
            }
            onClick={toggleMenu}
          >
            <HomeIcon className="inline-block w-5 h-5 mr-2" /> Home
          </NavLink>
          <NavLink 
            to="/pricing" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors ${
                isActive ? 'bg-blue-500 text-white' : ''
              }`
            }
            onClick={toggleMenu}
          >
            <DollarSign className="inline-block w-5 h-5 mr-2" /> Tarification
          </NavLink>
          <NavLink 
            to="/faqs" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors ${
                isActive ? 'bg-blue-500 text-white' : ''
              }`
            }
            onClick={toggleMenu}
          >
            <HelpCircle className="inline-block w-5 h-5 mr-2" /> FAQs
          </NavLink>
          <NavLink 
            to="/resources" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors ${
                isActive ? 'bg-blue-500 text-white' : ''
              }`
            }
            onClick={toggleMenu}
          >
            <BookOpen className="inline-block w-5 h-5 mr-2" /> Resources
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors ${
                isActive ? 'bg-blue-500 text-white' : ''
              }`
            }
            onClick={toggleMenu}
          >
            <Phone className="inline-block w-5 h-5 mr-2" /> Contact
          </NavLink>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors ${
                isActive ? 'bg-blue-500 text-white' : ''
              }`
            }
            onClick={toggleMenu}
          >
            <User className="inline-block w-5 h-5 mr-2" /> Trouver des experts
          </NavLink>
          <NavLink to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-blue-700 transition-colors text-center" onClick={toggleMenu}>
            Enregistrez-vous
          </NavLink>
          <NavLink to="/login" className="bg-green-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-green-700 transition-colors text-center" onClick={toggleMenu}>
            Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
}