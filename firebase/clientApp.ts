// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpziWruRgMxSJtJqAGgB9X6KdfbeVaLCw",
    authDomain: "deepflow-2ac86.firebaseapp.com",
    databaseURL: "https://deepflow-2ac86-default-rtdb.firebaseio.com",
    projectId: "deepflow-2ac86",
    storageBucket: "deepflow-2ac86.appspot.com",
    messagingSenderId: "395843510223",
    appId: "1:395843510223:web:781735d9714d15a64c3cba",
    measurementId: "G-DRZE3FHE69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getDatabase();
