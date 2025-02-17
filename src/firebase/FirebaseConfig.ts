import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGCENTERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Here the app is initialize to the firebase
firebase.initializeApp(firebaseConfig);

// We are using this for the auth of firebase services
const auth = firebase.auth();

// For firebase store 
const firestoreApp = firebase.firestore();

// We integrated the firebase emulator for this application
if (window.location.hostname === "localhost") {
  auth.useEmulator("http://localhost:9099/");
  firestoreApp.useEmulator("localhost", 8080);
}

export { auth, firestoreApp };
