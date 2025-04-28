// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,Timestamp, doc, setDoc, getDocs,getDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// New Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfqtjI6zyAUKtsxPZ57gfctqCag3S8_8g",
  authDomain: "afro-20c3c.firebaseapp.com",
  projectId: "afro-20c3c",
  storageBucket: "afro-20c3c.firebasestorage.app",
  messagingSenderId: "681384972654",
  appId: "1:681384972654:web:926ce2e0f7cf557cb0717f",
  measurementId: "G-N5M0ZTT24T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, ref, uploadBytes, getDownloadURL, doc, setDoc, getDocs, getDoc, Timestamp, collection, analytics };
