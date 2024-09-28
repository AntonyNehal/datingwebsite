// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyUaijaPodK4zjjUFT9IL4qNVFffqcXdQ",
  authDomain: "dating-website-13181.firebaseapp.com",
  projectId: "dating-website-13181",
  storageBucket: "dating-website-13181.appspot.com",
  messagingSenderId: "350121367640",
  appId: "1:350121367640:web:dcde494a344ab6f7db522d"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };