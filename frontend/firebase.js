// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zestora-food.firebaseapp.com",
  projectId: "zestora-food",
  storageBucket: "zestora-food.firebasestorage.app",
  messagingSenderId: "42303056496",
  appId: "1:42303056496:web:bef2fb45d49212eab4a2b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export {app,auth}