// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB42lUbXP0fv0j7zQVAnZPTeGghQ4dWr74",
  authDomain: "safeexplorec.firebaseapp.com",
  projectId: "safeexplorec",
  storageBucket: "safeexplorec.firebasestorage.app",
  messagingSenderId: "188945124693",
  appId: "1:188945124693:web:6204e6036a79477b5273dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authFirebase = getAuth();
export const dbFirebase = getFirestore(app);

export default app;