import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import SignupPage from "./pages/SignupPage";
import  {ProfessionalRoadmap}  from "./pages/ProfilePage";
import ProfileDetailsPage from "./pages/ProfileDetailsPage";
import ScrollToTop from "./components/ScrollToTop";
import SuggestionsPage from "./pages/SuggestionsPage";
import AdminSuggestionsPage from "./pages/AdminSuggestionsPage";
import { ProfessionalsLeadsPage } from "./pages/ProfessionalsLeadsPage";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import { AboutPage } from "./pages/ServicePage";
import SendEmailForm from "./components/AdminDashboard/SendEmailForm";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ProfessionalProfilePage from "./pages/ProffesionalProfilePage";
import { ProfessionalLeadsDetail } from "./pages/ProfessionalLeadsDetail";
import VideoGuidePage from "./pages/VIdeoPage";
import { EventForm } from "./components/EventForm";
import { EventsPage } from "./pages/EventsPage";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("isAdmin") === "true";

  return isAuthenticated ? element : <Navigate to="/admin-login" />;
};


const AppContent = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/profile" element={<ProfessionalRoadmap />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/services" element={<AboutPage />} />
          <Route path="*" element={<div>404 Page Not Found</div>} />
          <Route path="/profile/:userId" element={<ProfileDetailsPage />} />
          <Route path="/suggestions" element={<SuggestionsPage />} />
          <Route path="/experts" element={<ProfessionalProfilePage />} />
          <Route path="/events" element={< EventsPage/>} />

          <Route path="/guide" element={< VideoGuidePage/>} />


          {/* Admin Routes (Protected) */}
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminDashboardPage />} />} />
          <Route path="/event-form" element={<ProtectedRoute element={<EventForm />} />} />
          <Route path="/send-email" element={<ProtectedRoute element={<SendEmailForm />} />} />
          <Route path="/admin/suggestions" element={<ProtectedRoute element={<AdminSuggestionsPage />} />} />
          <Route path="/admin/leads" element={<ProtectedRoute element={<ProfessionalsLeadsPage />} />} />
          <Route path="/professionals/:professionalId" element={<ProtectedRoute element={<ProfessionalLeadsDetail />} />} />
          <Route path="/admin/profiles" element={<ProtectedRoute element={<ProfessionalProfilePage />} />} />
        </Routes>
      </main>
      {/* Hide Footer for admin pages */}
      {!location.pathname.startsWith("/admin") && <Footer />}
    </div>
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId="1051051791264-oer3o718uhjnj7gtcvbnl5o12shv1vvh.apps.googleusercontent.com">
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
