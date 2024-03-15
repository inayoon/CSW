// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "moru-shop.firebaseapp.com",
  databaseURL: "https://moru-shop-default-rtdb.firebaseio.com",
  projectId: "moru-shop",
  storageBucket: "moru-shop.appspot.com",
  messagingSenderId: "53642012481",
  appId: "1:53642012481:web:e9efeb53a0bbdfc30ee3c0",
  measurementId: "G-BJ83K482EJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
