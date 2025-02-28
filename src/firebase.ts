// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs,getDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth,   GoogleAuthProvider,
  signInWithPopup,} from "firebase/auth";

// New Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJMLOmNloI5q0Rj9qsigc5a9x6hE1fHgY",
  authDomain: "connect-223c0.firebaseapp.com",
  projectId: "connect-223c0",
  storageBucket: "connect-223c0.firebasestorage.app",
  messagingSenderId: "464388333785",
  appId: "1:464388333785:web:28c8fb0e5a056eaefedec8",
  measurementId: "G-9ZPS7C5ENS"
};

// Initialize Firebase62828098931
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {   GoogleAuthProvider, signInWithPopup, auth, db, storage, ref, uploadBytes, getDownloadURL, doc, setDoc, getDocs, getDoc, collection, analytics };
