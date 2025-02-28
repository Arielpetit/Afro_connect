import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { auth } from '../firebase';
import { FirebaseError } from 'firebase/app';
import { toast, ToastContainer } from 'react-toastify';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
      toast.success('Login successful');
  
      setTimeout(() => {
        navigate('/profile');
      }, 4000);
    } catch (error) {
      let message = 'Registration failed';
      
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            message = 'Email already in use';
            break;
          case 'auth/invalid-email':
            message = 'Invalid email format';
            break;
          case 'auth/weak-password':
            message = 'Password should be at least 6 characters';
            break;
          default:
            message = error.message;
        }
      }
      
      toast.error(message);
      throw new Error(message);
    }
  };
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      navigate('/profile');
    } catch (error) {
      console.error('Google signup error:', error);
      throw new Error('Google signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
          <AuthForm type="signup" onSubmit={handleSignup}
                      onGoogleSignIn={handleGoogleSignup} />
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default SignupPage;