import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";

import SignupPage from "./pages/SignupPage";
import {ProfilePage} from "./pages/ProfilePage";
import ProfileDetailsPage from "./pages/ProfileDetailsPage";
import ScrollToTop from "./components/ScrollToTop";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import LoginPage from "./pages/LoginPage"; 
import SubscriptionPage from "./pages/SuscriptionPage";
import ContactPage from "./pages/ContactPage";
import FAQ from "./pages/FaqsPage";
import ResourcesPage from "./pages/ResourcePage";
import ResourceFormPage from "./pages/ResourceForm";
import ContactForm from "./pages/ContactForm";
import AdminLoginPage from "./pages/AdminLoginPage";
import RegisterPage from "./pages/RegisterPage";
import SendEmailForm from "./components/SendEmailForm";
import { Profile } from "./components/Profile";
import ReviewListPage from "./pages/ReviewListPage";
import ReviewFormPage from "./pages/ReviewFormPage";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading while checking auth
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppContent = () => {
  const location = useLocation(); // Now works because it's inside <Router>

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={<><Hero /><Features /><HowItWorks /><Testimonials /></>}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/personal-profile" element={<Profile />} />
          <Route path="/profiles/:userId/reviews" element={<ReviewListPage />} />
          <Route path="/profiles/:userId/review" element={<ReviewFormPage />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route
            path="/register"
            element={<ProtectedRoute element={<RegisterPage />} />}
          />
          <Route
            path="/profile/:userId"
            element={<ProtectedRoute element={<ProfileDetailsPage />} />}
          />
          <Route
            path="/pricing"
            element={<ProtectedRoute element={<SubscriptionPage />} />}
          />
          <Route
            path="/resources"
            element={<ProtectedRoute element={<ResourcesPage />} />}
          />
          <Route
            path="/resource/new"
            element={<ProtectedRoute element={<ResourceFormPage />} />}
          />
          <Route
            path="/resource/:resourceId"
            element={<ProtectedRoute element={<ResourceFormPage />} />}
          />
          <Route
            path="/contacts/:userId"
            element={<ProtectedRoute element={<ContactForm />} />}
          />

          {/* Admin Route */}
          <Route path="/admin-login" 
            element={<ProtectedRoute element={<AdminLoginPage />} />} />
          <Route
            path="/admin"
            element={<ProtectedRoute element={<AdminDashboardPage />} />}
          />
          <Route
            path="/SendEmail"
            element={<ProtectedRoute element={< SendEmailForm/>} />}
          />

          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </main>
      {/* Step 3: Conditionally render Footer */}
      {!location.pathname.startsWith("/admin") && <Footer />}
    </div>
  );
};

// Updated App component
function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent /> {/* Use the wrapper component */}
    </Router>
  );
}

export default App;

