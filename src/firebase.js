import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCKOMTrDv-Bci19nLP612gcTCIdlCdYXQ",
    authDomain: "ensveetest.firebaseapp.com",
    projectId: "ensveetest",
    storageBucket: "ensveetest.appspot.com",
    messagingSenderId: "79896177397",
    appId: "1:79896177397:web:a1a5afbfc32942b5e7f3bc",
    measurementId: "G-ZY4YQ578X7"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

console.log("Firebase inited");

export default firebase;