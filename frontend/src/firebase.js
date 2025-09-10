// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDEevkxQuDvCoRA2DsyaSCcCBpTBTE5-pg",
  authDomain: "calmiverse-17f78.firebaseapp.com",
  projectId: "calmiverse-17f78",
  storageBucket: "calmiverse-17f78.appspot.com", // ⚡ fix: should end with .appspot.com
  messagingSenderId: "1013426853157",
  appId: "1:1013426853157:web:ad40da1ff0b106205036cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth (Firebase Authentication)
export const auth = getAuth(app);

export default app;
