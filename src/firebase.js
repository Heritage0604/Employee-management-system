// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWWLDbv461pDeVFAvIF5cl3VKswEAN0NY",
  authDomain: "employee-management-2f106.firebaseapp.com",
  projectId: "employee-management-2f106",
  storageBucket: "employee-management-2f106.appspot.com",
  messagingSenderId: "613712195672",
  appId: "1:613712195672:web:280bce6e88b9cb1eae1a2d",
  measurementId: "G-JL6PNL110X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const db =getFirestore(app)
export const storage = getStorage(app);