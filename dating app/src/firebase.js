
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // For image upload

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyUaijaPodK4zjjUFT9IL4qNVFffqcXdQ",
  authDomain: "dating-website-13181.firebaseapp.com",
  projectId: "dating-website-13181",
  storageBucket: "dating-website-13181.appspot.com",
  messagingSenderId: "350121367640",
  appId: "1:350121367640:web:dcde494a344ab6f7db522d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // For authentication (if needed)
const db = getFirestore(app); // Firestore database instance
const storage = getStorage(app); // Storage instance for image uploads

// Export Firebase services to use them throughout the app
export { app, auth, db, storage, collection, addDoc, query, orderBy, onSnapshot };
