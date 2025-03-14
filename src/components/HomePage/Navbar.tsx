/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, Phone, DollarSign, Home as HomeIcon, HelpCircle, BookOpen, UserPlus, Download, Globe } from 'lucide-react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

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

  const handleLanguageChange = (langCode: string) => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.goog-te-menu-frame');
    const select = document.querySelector<HTMLSelectElement>('select.goog-te-combo');
    
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
    
    if (iframe) {
      iframe.style.display = 'none';
    }
    
    setIsLanguageMenuOpen(false);
  };

  // useEffect(() => {
  //   const addGoogleTranslateScript = () => {
  //     if (!document.querySelector("#google-translate-script")) {
  //       const script = document.createElement("script");
  //       script.id = "google-translate-script";
  //       script.src =
  //         "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //       document.body.appendChild(script);
  //     }
  //   };

  //   window.googleTranslateElementInit = () => {
  //     new window.google.translate.TranslateElement(
  //       { pageLanguage: "en", layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
  //       "google_translate_element"
  //     );
  //   };

  //   addGoogleTranslateScript();
  // }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
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
          <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <img 
              src="/afro-removebg-preview.png" 
              alt="Afro Immobilier Connect Logo" 
              className="h-32 w-auto"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">Language</span>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-gray-100"
                  >
                    <img src="https://flagcdn.com/16x12/gb.png" alt="English" className="w-6 h-4" />
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('fr')}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-gray-100"
                  >
                    <img src="https://flagcdn.com/16x12/fr.png" alt="French" className="w-6 h-4" />
                    Français
                  </button>
                </div>
              )}
            </div>

            <div id="google_translate_element" className="hidden"></div>

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
            {!user && (
              <NavLink 
                to="/signup" 
                className={({ isActive }) => 
                  `px-4 py-2 font-medium transition-all duration-300 text-gray-700 hover:bg-blue-500 hover:text-white rounded-full ${
                    isActive ? 'bg-blue-500 text-white' : ''
                  }`
                }
              >
                Signup
              </NavLink>
            )}

            {user && (
              <>
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
                  to="/resources" 
                  className={({ isActive }) => 
                    `px-4 py-2 font-medium transition-all duration-300 text-gray-700 hover:bg-blue-500 hover:text-white rounded-full ${
                      isActive ? 'bg-blue-500 text-white' : ''
                    }`
                  }
                >
                  Resources
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
              FAQs
            </NavLink>

            {/* {user && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 font-medium transition-all duration-300 text-gray-700 hover:bg-red-600 hover:text-white rounded-full"
              >
                Déconnexion
              </button>
            )} */}
            {user && (
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
            )}

            {user && (
              <NavLink to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-blue-700 transition-colors">
                Enregistrez-vous
              </NavLink>
            )}
            <NavLink to="/admin-login" className="bg-green-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-green-700 transition-colors">
              Admin
            </NavLink>
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
          <div className="mb-4">
            <button
              onClick={() => handleLanguageChange('en')}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-gray-100 rounded-lg"
            >
              <img src="https://flagcdn.com/16x12/gb.png" alt="English" className="w-6 h-4" />
              English
            </button>
            <button
              onClick={() => handleLanguageChange('fr')}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-gray-100 rounded-lg"
            >
              <img src="https://flagcdn.com/16x12/fr.png" alt="French" className="w-6 h-4" />
              Français
            </button>
          </div>

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
          {user && (
            <>
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
              <UserPlus className="inline-block w-5 h-5 mr-2" /> Signup
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
              <User className="inline-block w-5 h-5 mr-2" /> Trouver des experts
            </NavLink>
          )}
          {user && (
            <NavLink to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-blue-700 transition-colors text-center" onClick={toggleMenu}>
              Enregistrez-vous
            </NavLink>
          )}
          <NavLink to="/admin-login" className="bg-green-600 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-green-700 transition-colors text-center" onClick={toggleMenu}>
            Admin
          </NavLink>
          {/* {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-medium transition-all duration-300 text-gray-700 hover:bg-red-600 hover:text-white rounded-full"
            >
              Déconnexion
            </button>
          )} */}
          {user && (
            <NavLink 
              to="/personal-profile" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-colors ${
                  isActive ? 'bg-blue-500 text-white' : ''
                }`
              }
              onClick={toggleMenu}
            >
              <User className="inline-block w-5 h-5 mr-2" /> profile personelle
            </NavLink>
          )}
          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="bg-purple-600 text-white text-center px-6 py-2.5 rounded-full font-medium text-sm hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto"
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