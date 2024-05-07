// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQms6_WudaxNVG1fBOAv7bMCYZib1tg_A",
  authDomain: "web-cloud-ynov-685c2.firebaseapp.com",
  projectId: "web-cloud-ynov-685c2",
  storageBucket: "web-cloud-ynov-685c2.appspot.com",
  messagingSenderId: "974426619121",
  appId: "1:974426619121:web:9e90980853e967e884fd50",
  measurementId: "G-1RQ2GEMF3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;