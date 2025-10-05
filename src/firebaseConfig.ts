import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
 apiKey: "AIzaSyDf1AE5kW7lB-4nDwM8H4pdi1VxjjL4Llw",
  authDomain: "petrecord-84cb4.firebaseapp.com",
  databaseURL: "https://petrecord-84cb4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "petrecord-84cb4",
  storageBucket: "petrecord-84cb4.firebasestorage.app",
  messagingSenderId: "59598373859",
  appId: "1:59598373859:web:a77d5469de457ffaedd6d6",
  measurementId: "G-5SX9Z27G44"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
