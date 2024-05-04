import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCnSky5E777Rcmw0wm_xVL_eDcAJULL9Qc",
    authDomain: "blogmate-62a2c.firebaseapp.com",
    projectId: "blogmate-62a2c",
    storageBucket: "blogmate-62a2c.appspot.com",
    messagingSenderId: "837893970958",
    appId: "1:837893970958:web:01539846c5d4090ec7305f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()