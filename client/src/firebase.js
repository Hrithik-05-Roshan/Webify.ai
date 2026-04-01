// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "webifyai-93ed4.firebaseapp.com",
  projectId: "webifyai-93ed4",
  storageBucket: "webifyai-93ed4.firebasestorage.app",
  messagingSenderId: "1025082123034",
  appId: "1:1025082123034:web:3636865819a2b1045642a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}