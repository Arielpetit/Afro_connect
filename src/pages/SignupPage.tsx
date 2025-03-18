import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { toast, ToastContainer } from "react-toastify";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const SignupPage = () => {
  const navigate = useNavigate();
  const db = getFirestore();

  const createUserDocument = async (user: any) => {
    const referralCode = uuidv4().substring(0, 8).toUpperCase();
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      userId: user.uid,
      referralCode,
      referralPoints: 0,
      referrals: [],
      createdAt: new Date().toISOString(),
      emailVerified: user.emailVerified,
    });
    return referralCode;
  };

  const handleReferral = async (newUserId: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const referralParam = urlParams.get("ref");

    if (referralParam) {
      try {
        const q = query(
          collection(db, "users"),
          where("referralCode", "==", referralParam),
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const referrerDoc = querySnapshot.docs[0];
          if (referrerDoc.id !== newUserId) {
            await updateDoc(doc(db, "users", referrerDoc.id), {
              referralPoints: increment(1),
              referrals: arrayUnion(newUserId),
            });
          }
        }
      } catch (error) {
        console.error("Error handling referral:", error);
      }
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Create user document with referral data
      await createUserDocument(user);
      
      // Process any existing referral
      await handleReferral(user.uid);

      await sendEmailVerification(user);
      toast.info("Verification email sent! Please check your inbox.");

      await signOut(auth);
      toast.warn("Please verify your email before logging in.");

      const interval = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(interval);
          toast.success("Email verified! Redirecting...");
          setTimeout(() => navigate("/profile"), 3000);
        }
      }, 5000);
    } catch (error) {
      let message = "Registration failed";

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.dismiss();
            toast.error("Email already in use");
            setTimeout(() => navigate("/login"), 3000);
            return;
          case "auth/invalid-email":
            message = "Invalid email format";
            break;
          case "auth/weak-password":
            message = "Password should be at least 6 characters";
            break;
          default:
            message = error.message;
        }
      }

      toast.dismiss();
      toast.error(message);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create user document with referral data
      await createUserDocument(user);
      
      // Process any existing referral
      await handleReferral(user.uid);

      // Update email verification status
      await updateDoc(doc(db, "users", user.uid), {
        emailVerified: user.emailVerified,
      });

      navigate("/profile");
    } catch (error) {
      console.error("Google signup error:", error);
      toast.dismiss();
      toast.error("Google signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
          <AuthForm
            type="signup"
            onSubmit={handleSignup}
            onGoogleSignIn={handleGoogleSignup}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;