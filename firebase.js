import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIIuTA0hYxzEh_nSWE8rQ2Dj3QNBMiH40",
  authDomain: "kuronami-4b393.firebaseapp.com",
  projectId: "kuronami-4b393",
  storageBucket: "kuronami-4b393.firebasestorage.app",
  messagingSenderId: "958532247825",
  appId: "1:958532247825:web:97b07939761bf62ddeacb0"
};

const app = initializeApp(firebaseConfig);

// 🔥 이게 핵심 (DB 연결)
export const db = getFirestore(app);