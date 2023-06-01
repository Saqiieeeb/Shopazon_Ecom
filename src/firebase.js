// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsSD_7Jqs-z1Rk2wlLbftsLYEnZK2goN8",
  authDomain: "shopazon-ecom.firebaseapp.com",
  projectId: "shopazon-ecom",
  storageBucket: "shopazon-ecom.appspot.com",
  messagingSenderId: "364687165800",
  appId: "1:364687165800:web:e53ee04e6dfb235df8aedd",
  measurementId: "G-4L7HE4R1XJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app,auth};