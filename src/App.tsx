import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";

import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileDetailsPage from "./pages/ProfileDetailsPage";
import ScrollToTop from "./components/ScrollToTop";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import LoginPage from "./pages/LoginPage"; // Import LoginPage
import SubscriptionPage from "./pages/SuscriptionPage";
import ContactPage from "./pages/ContactPage";
import FAQ from "./pages/FaqsPage";
import ResourcesPage from "./pages/ResourcePage";
import ResourceFormPage from "./pages/ResourceForm";
import ContactForm from "./pages/ContactForm";

// PrivateRoute Component to protect Admin route
const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated === "true") {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
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
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/:userId" element={<ProfileDetailsPage />} />
              <Route path="/pricing" element={<SubscriptionPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faqs" element={<FAQ />} />
              <Route path="/resources" element={<ResourcesPage />} />
              // In your router configuration
              <Route path="/resource/new" element={<ResourceFormPage />} />ContactForm
              <Route path="/resource/:resourceId" element={<ResourceFormPage />} />
              <Route path="/contacts/:userId" element={<ContactForm />} />





              {/* Login route */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Admin route */}
              <Route path="/admin" element={<PrivateRoute element={<AdminDashboardPage />} />} />
              
              <Route path="*" element={<div>404 Page Not Found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
