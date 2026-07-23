import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB42lUbXP0fv0j7zQVAnZPTeGghQ4dWr74",
  authDomain: "safeexplorec.firebaseapp.com",
  projectId: "safeexplorec",
  storageBucket: "safeexplorec.firebasestorage.app",
  messagingSenderId: "188945124693",
  appId: "1:188945124693:web:6204e6036a79477b5273dc"
};

const app = initializeApp(firebaseConfig);

export const authFirebase = getAuth();
export const dbFirebase = getFirestore(app);

// Enable offline persistence for Firestore (reload persistence)
enableIndexedDbPersistence(dbFirebase).catch(function (err) {
  if (err.code === "failed-precondition") {
    console.warn("Firestore persistence: Multiple tabs open, persistence disabled");
  } else if (err.code === "unimplemented") {
    console.warn("Firestore persistence: Browser not supported");
  }
});

export default app;
