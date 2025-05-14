import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA748KD5ft8KrebVsC8Oq3bPfHAuU6WzjU",
  authDomain: "ticket-booking-a7d9b.firebaseapp.com",
  projectId: "ticket-booking-a7d9b",
  storageBucket: "ticket-booking-a7d9b.firebasestorage.app",
  messagingSenderId: "1074860911675",
  appId: "1:1074860911675:web:d8c4fa1fcce08bd16bc01e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export default app;

export { auth, db, createUserWithEmailAndPassword, updateProfile };