import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyD0dXhHVHKBnNOv24vFIe1OPom5wDfGSoA",
    authDomain: "signup-and-login-form-42650.firebaseapp.com",
    projectId: "signup-and-login-form-42650",
    storageBucket: "signup-and-login-form-42650.appspot.com",
    messagingSenderId: "70698156937",
    appId: "1:70698156937:web:777f0415087a9b0dc4d758"
  };

  const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {
    db,
    auth,
};