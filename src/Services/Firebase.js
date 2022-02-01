// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, OAuthProvider } from "@firebase/auth";
import { getStorage } from "@firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClm7gcS3xrsACcvIRCgqLWQZ5pM8wSoBg",
  authDomain: "todos-app-8e715.firebaseapp.com",
  projectId: "todos-app-8e715",
  storageBucket: "todos-app-8e715.appspot.com",
  messagingSenderId: "227414895323",
  appId: "1:227414895323:web:89e721eae70751609dfafe",
  measurementId: "G-ZJBMDSCM6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);

// Authentication
const authDb = getAuth(app);

// Storage
const storageDb = getStorage(app);

// Provider
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');


// export
export { authDb, firestoreDb, storageDb, googleProvider, facebookProvider, twitterProvider, githubProvider, microsoftProvider };