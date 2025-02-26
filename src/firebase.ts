// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs,getDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// New Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcTAiYpNwD4pIgZfyYWOEafro-fc306kljw1eF0WYzI",
  authDomain: "test-e1430.firebaseapp.com",
  projectId: "test-e1430",
  storageBucket: "test-e1430.firebasestorage.app",
  messagingSenderId: "62828098931",
  appId: "1:62828098931:web:43f3ec8f5dd6423bb08106",
  measurementId: "G-N33RZ9RPH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, ref, uploadBytes, getDownloadURL, doc, setDoc, getDocs, getDoc, collection, analytics };
