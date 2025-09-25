// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "kfood-30c0e.firebaseapp.com",
  projectId: "kfood-30c0e",
  storageBucket: "kfood-30c0e.firebasestorage.app",
  messagingSenderId: "489880083051",
  appId: "1:489880083051:web:68ab58c8544cbf790a2f2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {app, auth}