import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';  // Assuming you have a ProfilePage component
import ProfileDetailsPage from './pages/ProfileDetailsPage';
import ScrollToTop from './components/ScrollToTop';

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
                element={
                  <>
                    <Hero />
                    <Features />
                    <HowItWorks />
                    <Testimonials />
                  </>
                }
              />
              <Route path="/register" element={<SignupPage />} />
              <Route path="/profile" element={<ProfilePage  />} />
              <Route path="*" element={<div>404 Page Not Found</div>} />
              <Route path="/profile/:userId" element={<ProfileDetailsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
