// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAG0jZEufqA4GhPhVDQtl1hT1an1xJ_FU",
  authDomain: "fitness-tracker-d03b6.firebaseapp.com",
  projectId: "fitness-tracker-d03b6",
  storageBucket: "fitness-tracker-d03b6.firebasestorage.app",
  messagingSenderId: "388083733183",
  appId: "1:388083733183:web:8f1392dee335ce2e452c0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);