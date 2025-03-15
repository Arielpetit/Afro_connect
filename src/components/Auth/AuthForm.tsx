import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (email: string, password: string) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  onForgotPassword?: (email: string) => Promise<void>;
}

const AuthForm = ({
  type,
  onSubmit,
  onGoogleSignIn,
  onForgotPassword,
}: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.dismiss();
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(email, password);
    } catch (error) {
      toast.dismiss();
      toast.error(
        error instanceof Error ? error.message : "Authentication failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await onGoogleSignIn();
    } catch (error) {
      console.error("Google login error:", error);
      toast.dismiss();
      toast.error("Google login failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <Link
            to={type === "login" ? "/signup" : "/login"}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            {type === "login" ? "Sign up here" : "Login here"}
          </Link>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          {loading ? "Processing..." : type === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-sm font-medium">
            {googleLoading ? "Signing In..." : "Continue with Google"}
          </span>
        </button>
      </div>

      {/* Show "Forgot Password?" only on the login page */}
      {type === "login" && onForgotPassword && (
        <button
          type="button"
          className="text-indigo-600 hover:underline mt-2"
          onClick={() => {
            if (!email) {
              toast.dismiss();
              toast.error("Please enter your email to reset password");
              return;
            }
            onForgotPassword(email);
          }}
        >
          Forgot Password?
        </button>
      )}

      <ToastContainer />
    </div>
  );
};

export default AuthForm;
