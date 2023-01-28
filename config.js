// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRp_mHLZw6lt3M-E6tllBgOWTSF8d2qxA",
  authDomain: "nodejs-c98a6.firebaseapp.com",
  projectId: "nodejs-c98a6",
  storageBucket: "nodejs-c98a6.appspot.com",
  messagingSenderId: "691481023995",
  appId: "1:691481023995:web:1dd74c429114211829675e",
  measurementId: "G-BNWBGEW5NG"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.auth()
// const db = firebase.firestore();
// const User = db.collection("Users");
export default firebase
// const analytics = getAnalytics(app);