import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import { auth } from "../firebase";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");

      setTimeout(() => {
        navigate("/profile");
      }, 4000);
    } catch (error) {
      toast.error("Invalid email or password");
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success("Google login successful");
      console.log(result);
      setTimeout(() => {
        navigate("/profile");
      }, 4000);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
      throw new Error("Google login failed. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt("Please enter your email address:");
    if (!email) return;

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Check your inbox.");
    } catch (error) {
      toast.error(
        "Failed to send reset email. Please check the email address.",
      );
      console.error("Password reset error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
          <AuthForm
            type="login"
            onSubmit={handleLogin}
            onGoogleSignIn={handleGoogleLogin}
            onForgotPassword={handleForgotPassword}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
