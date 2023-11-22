// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbZPeyRl8Y45jzfBAEcm8fYP7f7UBsnNI",
  authDomain: "pruebologin.firebaseapp.com",
  projectId: "pruebologin",
  storageBucket: "pruebologin.appspot.com",
  messagingSenderId: "120015530768",
  appId: "1:120015530768:web:aedd2f303976a94405d395"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth};