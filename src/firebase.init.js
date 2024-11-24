// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcgUd2hiQ3ADvBJYPo6qkT_ve19teicW4",
  authDomain: "email-password-auth-9e572.firebaseapp.com",
  projectId: "email-password-auth-9e572",
  storageBucket: "email-password-auth-9e572.firebasestorage.app",
  messagingSenderId: "1084061781661",
  appId: "1:1084061781661:web:a4240cafa7c1545ac34e74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);