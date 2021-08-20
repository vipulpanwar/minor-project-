import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';


export const mode = "PROD";
let firebaseConfig, apiURL, cloudFnURL, storageURL;

if( mode =="TEST" )
{
  firebaseConfig = {
    apiKey: "AIzaSyCs0UYaGPtNYF8zBovv_2Cf9CCKG1bBSXQ",
    authDomain: "oneios.firebaseapp.com",
    projectId: "oneios",
    storageBucket: "oneios.appspot.com",
    messagingSenderId: "45895614087",
    appId: "1:45895614087:web:1cff5752c619a3752bc222",
    measurementId: "G-LXPKZQ7PQ4"
  };
  apiURL = "https://test.api.ensvee.com"
  // apiURL = "http://localhost:8000"

  cloudFnURL = "https://us-central1-oneios.cloudfunctions.net/app";
  storageURL = "https://firebasestorage.googleapis.com/v0/b/oneios.appspot.com/o/";
}
//   firebaseConfig = {
//       apiKey: "AIzaSyBCKOMTrDv-Bci19nLP612gcTCIdlCdYXQ",
//       authDomain: "ensveetest.firebaseapp.com",
//       projectId: "ensveetest",
//       storageBucket: "ensveetest.appspot.com",
//       messagingSenderId: "79896177397",
//       appId: "1:79896177397:web:a1a5afbfc32942b5e7f3bc",
//       measurementId: "G-ZY4YQ578X7"
//     };
else {
  firebaseConfig = {
    apiKey: "AIzaSyCR0VMmyYOghmzn7q8WXDXw78Ynq0aUFjo",
    authDomain: "ensveeproduction.firebaseapp.com",
    projectId: "ensveeproduction",
    storageBucket: "ensveeproduction.appspot.com",
    messagingSenderId: "974330689207",
    appId: "1:974330689207:web:df46e2feba1f9ae87b3f32",
    measurementId: "G-MM1DFY5X2V"
  };
  apiURL = "https://api.ensvee.com"
  // apiURL = "http://localhost:8000"

  cloudFnURL = "https://asia-south1-ensveeproduction.cloudfunctions.net/app";
  storageURL = "https://firebasestorage.googleapis.com/v0/b/ensveeproduction.appspot.com/o/";
}

// Initialize Firebase
console.log("mode ", mode)
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth= firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();
export {apiURL, cloudFnURL, storageURL} ;
console.log("Firebase inited");


export default firebase;