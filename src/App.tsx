import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import SignupPage from './pages/SignupPage';
import {ProfessionalRoadmap} from './pages/ProfilePage';  // Assuming you have a ProfilePage component
import ProfileDetailsPage from './pages/ProfileDetailsPage';
import ScrollToTop from './components/ScrollToTop';
import SuggestionsPage from './pages/SuggestionsPage';
import AdminSuggestionsPage from './pages/AdminSuggestionsPage';
import { ProfessionalsLeadsPage } from './pages/ProfessionalsLeadsPage';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';

function App() {
  return (
    <GoogleOAuthProvider clientId="1051051791264-oer3o718uhjnj7gtcvbnl5o12shv1vvh.apps.googleusercontent.com">
      <Router>
      <ScrollToTop /> 
        <div className="min-h-screen">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route
                path="/"
                element={<Home/>
                }
              />
              <Route path="/register" element={<SignupPage />} />
              <Route path="/profile" element={<ProfessionalRoadmap  />} />
              <Route path="/privacy" element={< PrivacyPolicy />} />
              <Route path="/terms" element={< TermsOfUse />} />
              <Route path="*" element={<div>404 Page Not Found</div>} />
              <Route path="/profile/:userId" element={<ProfileDetailsPage />} />
              <Route path="/suggestions" element={<SuggestionsPage />} />
              <Route path="/admin/suggestions" element={<AdminSuggestionsPage />} />
              <Route path="/admin/leads" element={<ProfessionalsLeadsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
