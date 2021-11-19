import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import * as firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdZuOO1qtHlAkfp4g4IBxXPJcltAcYHtw",
  authDomain: "motion-detection-40f42.firebaseapp.com",
  databaseURL: "https://motion-detection-40f42-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "motion-detection-40f42",
  storageBucket: "motion-detection-40f42.appspot.com",
  messagingSenderId: "163846818222",
  appId: "1:163846818222:web:2c967ba407c5086554e03f"
};

// Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app()
// }
//firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export default app
