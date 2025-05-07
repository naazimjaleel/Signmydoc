import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.AIzaSyCODQEO2mYGfHZ7Jox_uV1N2r76Ci7werc,
  authDomain: process.env.signmydoc-71226.firebaseapp.com,
  projectId: process.env.signmydoc-71226,
  storageBucket: process.env.signmydoc-71226.firebasestorage.app,
  messagingSenderId: process.env.807578020349,
  appId: process.env.1:807578020349:web:90b5e8761faadd69475194,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 