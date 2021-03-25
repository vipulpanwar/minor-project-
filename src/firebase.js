import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';


process.env.MODE = "TEST";
let firebaseConfig;
firebaseConfig = {
  apiKey: "AIzaSyCs0UYaGPtNYF8zBovv_2Cf9CCKG1bBSXQ",
  authDomain: "oneios.firebaseapp.com",
  projectId: "oneios",
  storageBucket: "oneios.appspot.com",
  messagingSenderId: "45895614087",
  appId: "1:45895614087:web:1cff5752c619a3752bc222",
  measurementId: "G-LXPKZQ7PQ4"
};
// if(process.env.MODE =="TEST")

//   firebaseConfig = {
//       apiKey: "AIzaSyBCKOMTrDv-Bci19nLP612gcTCIdlCdYXQ",
//       authDomain: "ensveetest.firebaseapp.com",
//       projectId: "ensveetest",
//       storageBucket: "ensveetest.appspot.com",
//       messagingSenderId: "79896177397",
//       appId: "1:79896177397:web:a1a5afbfc32942b5e7f3bc",
//       measurementId: "G-ZY4YQ578X7"
//     };
// else
// firebaseConfig = {
//   apiKey: "AIzaSyCg4PCdSZu6UrzUjbdj8_9xhg3r_DtEbqQ",
//   authDomain: "ensveeweb.firebaseapp.com",
//   databaseURL: "https://ensveeweb.firebaseio.com",
//   projectId: "ensveeweb",
//   storageBucket: "ensveeweb.appspot.com",
//   messagingSenderId: "18552753088",
//   appId: "1:18552753088:web:562c1dbb1e24f732b85625",
//   measurementId: "G-73Z9B0ESBZ"
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
firebase.analytics();
export const storage = firebase.storage();
export const db = firebase.firestore();
console.log("Firebase inited");

export default firebase;