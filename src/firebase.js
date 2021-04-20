import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';


let mode = "PROD";
let firebaseConfig;

if(mode =="TEST")
  firebaseConfig = {
    apiKey: "AIzaSyCs0UYaGPtNYF8zBovv_2Cf9CCKG1bBSXQ",
    authDomain: "oneios.firebaseapp.com",
    projectId: "oneios",
    storageBucket: "oneios.appspot.com",
    messagingSenderId: "45895614087",
    appId: "1:45895614087:web:1cff5752c619a3752bc222",
    measurementId: "G-LXPKZQ7PQ4"
  };
//   firebaseConfig = {
//       apiKey: "AIzaSyBCKOMTrDv-Bci19nLP612gcTCIdlCdYXQ",
//       authDomain: "ensveetest.firebaseapp.com",
//       projectId: "ensveetest",
//       storageBucket: "ensveetest.appspot.com",
//       messagingSenderId: "79896177397",
//       appId: "1:79896177397:web:a1a5afbfc32942b5e7f3bc",
//       measurementId: "G-ZY4YQ578X7"
//     };
else
  firebaseConfig = {
    apiKey: "AIzaSyCR0VMmyYOghmzn7q8WXDXw78Ynq0aUFjo",
    authDomain: "ensveeproduction.firebaseapp.com",
    projectId: "ensveeproduction",
    storageBucket: "ensveeproduction.appspot.com",
    messagingSenderId: "974330689207",
    appId: "1:974330689207:web:df46e2feba1f9ae87b3f32",
    measurementId: "G-MM1DFY5X2V"
  };
// Initialize Firebase
console.log("mode ", mode)
firebase.initializeApp(firebaseConfig);
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
firebase.analytics();
export const auth= firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();
console.log("Firebase inited");
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default firebase;