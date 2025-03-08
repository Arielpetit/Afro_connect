import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validUsername = "william";
  const validPassword = "123456789";

  const handleLogin = () => {
    if (username === validUsername && password === validPassword) {
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login as admin successful");
      setTimeout(() => {
      navigate("/admin");
      }, 2000);
    } else {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col items-center mb-8 space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-500">Please sign in to continue</p>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <input
            
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none peer transition-colors duration-200 pl-11"
              placeholder=" "
            />
            <label 
              htmlFor="username"
              className="absolute left-11 top-3.5 text-gray-400 peer-focus:text-blue-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 -translate-y-[1.15rem] scale-75 origin-left"
            >
              Username
            </label>
            <svg 
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 peer-focus:text-blue-500 transition-colors duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <div className="relative group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none peer transition-colors duration-200 pl-11"
              placeholder=" "
            />
            <label 
              htmlFor="password"
              className="absolute left-11 top-3.5 text-gray-400 peer-focus:text-blue-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 -translate-y-[1.15rem] scale-75 origin-left"
            >
              Password
            </label>
            <svg 
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 peer-focus:text-blue-500 transition-colors duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold 
                     transform transition-all duration-200 hover:scale-[1.01] hover:shadow-lg hover:from-blue-600 hover:to-indigo-700
                     active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default AdminLoginPage;