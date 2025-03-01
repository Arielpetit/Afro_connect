import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { auth } from '../firebase';
import { toast, ToastContainer } from "react-toastify";


const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful');
  
      setTimeout(() => {
        navigate('/profile');
      }, 4000);
      
    } catch (error) {
      toast.error('Invalid email or password');
      console.error('Login error:', error);
    }
  };
  
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success('Google login successful');
      console.log(result);
      // Delay the navigation by 4 seconds (4000 ms)
      setTimeout(() => {
        navigate('/profile');
      }, 4000);
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google login failed');
      throw new Error('Google login failed. Please try again.');
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
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;