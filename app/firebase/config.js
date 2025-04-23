// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1nkE1Tli_SVicPR_P6A5CX27xv1c_9kY",
  authDomain: "moxtil-cyber.firebaseapp.com",
  projectId: "moxtil-cyber",
  storageBucket: "moxtil-cyber.firebasestorage.app",
  messagingSenderId: "36837864693",
  appId: "1:36837864693:web:1fd4f8052dae5882d7c1bc",
  measurementId: "G-S27QWMVWBD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
