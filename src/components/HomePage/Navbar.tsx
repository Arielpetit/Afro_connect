import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, Phone, Handshake, Home as HomeIcon, HelpCircle, BookOpen, UserPlus, Download, UserCheck } from 'lucide-react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
 // Handle PWA installation prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    return () => {
      unsubscribe();
      window.removeEventListener('beforeinstallprompt', () => {});
    };
    }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate("/"); // Redirect to the home page
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
    const handleInstallClick = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted install');
          } else {
            console.log('User dismissed install');
          }
          setDeferredPrompt(null);
        });
      }
    };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <NavLink
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-blue-600"
          >
            <img
              src="/afro-removebg-preview.png"
              alt="Afro Immobilier Connect Logo"
              className="h-32 w-auto"
            />
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
              Accueil
            </NavLink>
            {!user && (
              
            <NavLink 
              to="/signup" 
              className={({ isActive }) => 
                `px-4 py-2 font-medium transition-all duration-300 text-gray-700 hover:bg-blue-500 hover:text-white rounded-full ${
                  isActive ? 'bg-blue-500 text-white' : ''
                }`
              }
            >
              Inscription
            </NavLink>
            )}

            {user && (
              <>
                <NavLink 
                  to="/resources" 
                  className={({ isActive }) => 
                    `px-4 py-2 font-medium transition-all duration-300 text-gray-700 hover:bg-blue-500 hover:text-white rounded-full ${
                      isActive ? 'bg-blue-500 text-white' : ''
                    }`
                  }
                >
                  Ressources
                </NavLink>
              </>
            )}
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
              to="/faqs" 
              className={({ isActive }) => 
                `px-4 py-2 font-medium transition-all duration-300 text-gray-700 hover:bg-blue-500 hover:text-white rounded-full ${
                  isActive ? 'bg-blue-500 text-white' : ''
                }`
              }
            >
              FAQ
            </NavLink>
            {user && (
          <NavLink 
            to="/profile-liste" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors ${
                isActive ? 'bg-blue-500 text-white' : ''
              }`
            }
          >
            <User className="inline-block w-5 h-5 mr-2" /> 
          </NavLink>
            )}


            {user && (

            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `p-2 font-medium transition-all duration-300 text-gray-700 hover:bg-blue-500 hover:text-white rounded-full ${
                  isActive ? 'bg-blue-500 text-white' : ''
                }`
              }
            >
              <Handshake className="inline-block w-5 h-5 mr-2" /> Contacter des experts
            </NavLink>
            )}

            {user && (
              <NavLink to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-blue-700 transition-colors">
                Enregistrez-vous
              </NavLink>
            )}
            {user && user?.email === "tchikayaline@gmail.com" && (
            <NavLink to="/admin-login" className="bg-green-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-green-700 transition-colors">
              Admin
            </NavLink>
            )}

            {user && (
            <NavLink 
              to="/personal-profile" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors ${
                  isActive ? 'bg-blue-500 text-white' : ''
                }`
              }
            >
              <img 
                src="bussiness-man.png" 
                alt="Profile" 
                className="inline-block w-8 h-8 rounded-full mr-2"
              />
            </NavLink>

          )}
          </div>

 
          {/* Mobile Icons + Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Home Icon */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `p-2 rounded-full hover:bg-blue-100 transition-colors ${
                  isActive ? "text-blue-600" : "text-gray-700"
                }`
              }
            >
              <HomeIcon className="w-6 h-6" />
            </NavLink>

            {/* Profile Icon */}
            {user && (
              <NavLink
                to="/personal-profile"
                className={({ isActive }) =>
                  `rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors ${
                    isActive ? "bg-blue-500 text-white" : ""
                  }`
                }
              >
                <img
                  src="bussiness-man.png"
                  alt="Profile"
                  className="inline-block w-8 h-8 rounded-full"
                />
              </NavLink>
            )}

            {/* Hamburger Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
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
          {user && (
            <>
              <NavLink 
                to="/resources" 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors ${
                    isActive ? 'bg-blue-500 text-white' : ''
                  }`
                }
                onClick={toggleMenu}
              >
                <BookOpen className="inline-block w-5 h-5 mr-2" /> Ressources
              </NavLink>
              
            </>
          )}
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
          {!user && (
          <NavLink 
            to="/signup" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors flex items-center ${
                isActive ? 'bg-blue-500 text-white' : ''
              }`
            }
            onClick={toggleMenu}
          >
            <UserPlus className="inline-block w-5 h-5 mr-2" /> Inscription
          </NavLink>
          )}
          {user && (
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors ${
                isActive ? 'bg-blue-500 text-white' : ''
              }`
            }
            onClick={toggleMenu}
          >
            <Handshake className="inline-block w-5 h-5 mr-2" /> Trouver des experts
          </NavLink>
          )}
          {user && (
          <NavLink 
            to="/profile-liste" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors ${
                isActive ? 'bg-blue-500 text-white' : ''
              }`
            }
            onClick={toggleMenu}
          >
            <User className="inline-block w-5 h-5 mr-2" /> Liste des experts
          </NavLink>
          )}
          {user && (
            <NavLink to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-blue-700 transition-colors text-center" onClick={toggleMenu}>
              Enregistrez-vous
            </NavLink>
          )}
          {user && user?.email === "tchikayaline@gmail.com" && (

          <NavLink to="/admin-login" className="bg-green-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-green-700 transition-colors text-center" onClick={toggleMenu}>
            Admin
          </NavLink>
            )}

          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-purple-700 transition-colors flex items-center gap-2 justify-center"
            >
              <Download className="w-5 h-5" />
              Installer l'application
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}