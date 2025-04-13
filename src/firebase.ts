// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,Timestamp, doc, setDoc, getDocs,getDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// New Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGb9vN247gUz0M6Qwb1_jZwsd9jypG1ro",
  authDomain: "afro-test-a78c7.firebaseapp.com",
  projectId: "afro-test-a78c7",
  storageBucket: "afro-test-a78c7.firebasestorage.app",
  messagingSenderId: "298359883716",
  appId: "1:298359883716:web:022ef0667676fcbb488691",
  measurementId: "G-T2TTXXKGZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, ref, uploadBytes, getDownloadURL, doc, setDoc, getDocs, getDoc, Timestamp, collection, analytics };
