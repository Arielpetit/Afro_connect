// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs,getDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// New Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC30CPo1ctct0wVZJ59EeFI6GBp3mSRjnE",
  authDomain: "afro-fc306.firebaseapp.com",
  projectId: "afro-fc306",
  storageBucket: "afro-fc306.firebasestorage.app",
  messagingSenderId: "815243166575",
  appId: "1:815243166575:web:e3eb9174288d19a9cf9e9a",
  measurementId: "G-7MRD9N466L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, ref, uploadBytes, getDownloadURL, doc, setDoc, getDocs, getDoc, collection, analytics };
