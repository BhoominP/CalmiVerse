// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDEevkxQuDvCoRA2DsyaSCcCBpTBTE5-pg",
  authDomain: "calmiverse-17f78.firebaseapp.com",
  projectId: "calmiverse-17f78",
  storageBucket: "calmiverse-17f78.appspot.com", // ⚡ fixed
  messagingSenderId: "1013426853157",
  appId: "1:1013426853157:web:ad40da1ff0b106205036cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth
export const auth = getAuth(app);

// ✅ Google provider
export const provider = new GoogleAuthProvider();

// 🔄 Helper: reset gamification storage
function resetGamification() {
  localStorage.setItem("gamificationPoints", "0");
  localStorage.setItem("tasks", JSON.stringify([]));
  window.dispatchEvent(new Event("storage")); // notify listeners
}

// ✅ Google sign-in (reset if new user)
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);

  if (result._tokenResponse?.isNewUser) {
    resetGamification();
  }

  return result;
};

// ✅ Email/password signup (reset if new user)
export const signUpWithEmail = async (email, password) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  if (userCred._tokenResponse?.isNewUser) {
    resetGamification();
  }

  return userCred;
};
