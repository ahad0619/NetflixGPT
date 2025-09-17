import {getAuth} from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZrwIGgHOy9F3qlQvyBT8cGBxDXKI8KQs",
  authDomain: "moviegpt-c91e8.firebaseapp.com",
  projectId: "moviegpt-c91e8",
  storageBucket: "moviegpt-c91e8.firebasestorage.app",
  messagingSenderId: "464809143918",
  appId: "1:464809143918:web:da94649cbcc339ab9f807f",
  measurementId: "G-XCT4MP3W13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth setup

export const auth = getAuth(app);