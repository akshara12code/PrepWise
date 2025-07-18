// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyAShBABomBX2fKklpzOfDqOFdj3Qujdpsw",

  authDomain: "prepiai.firebaseapp.com",

  projectId: "prepiai",

  storageBucket: "prepiai.firebasestorage.app",

  messagingSenderId: "626655403213",

  appId: "1:626655403213:web:c95f41d2bcc2dec48f9d84",

  measurementId: "G-F36EZVP1YF"

};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);