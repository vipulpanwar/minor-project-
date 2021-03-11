import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";


process.env.MODE = "";
let firebaseConfig;
if(1)

  firebaseConfig = {
      apiKey: "AIzaSyBCKOMTrDv-Bci19nLP612gcTCIdlCdYXQ",
      authDomain: "ensveetest.firebaseapp.com",
      projectId: "ensveetest",
      storageBucket: "ensveetest.appspot.com",
      messagingSenderId: "79896177397",
      appId: "1:79896177397:web:a1a5afbfc32942b5e7f3bc",
      measurementId: "G-ZY4YQ578X7"
    };
else
firebaseConfig = {
  apiKey: "AIzaSyCg4PCdSZu6UrzUjbdj8_9xhg3r_DtEbqQ",
  authDomain: "ensveeweb.firebaseapp.com",
  databaseURL: "https://ensveeweb.firebaseio.com",
  projectId: "ensveeweb",
  storageBucket: "ensveeweb.appspot.com",
  messagingSenderId: "18552753088",
  appId: "1:18552753088:web:562c1dbb1e24f732b85625",
  measurementId: "G-73Z9B0ESBZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
firebase.analytics();
console.log("Firebase inited");

export default firebase;