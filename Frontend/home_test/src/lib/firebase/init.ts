// firebase/init.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCl3TWP96VLqWGliywQcm-Jl_saBDwWwU0",
  authDomain: "test-d0533.firebaseapp.com",
  projectId: "test-d0533",
  storageBucket: "test-d0533.firebasestorage.app",
  messagingSenderId: "852934764848",
  appId: "1:852934764848:web:43f41654863a67905880f5",
  measurementId: "G-SQ2P9RYH1P",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };
