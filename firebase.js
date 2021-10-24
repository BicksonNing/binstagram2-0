// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPu0W0oytmjQkcwT3r9H5T6czzFpSxjwk",
  authDomain: "binstagram-2-0.firebaseapp.com",
  projectId: "binstagram-2-0",
  storageBucket: "binstagram-2-0.appspot.com",
  messagingSenderId: "954829950641",
  appId: "1:954829950641:web:ac4968fcfc4a42782e9c90",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export { app, db, storage };
