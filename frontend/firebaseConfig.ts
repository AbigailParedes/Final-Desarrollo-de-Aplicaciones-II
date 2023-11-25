// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL6uoAE8tocAHvBA3EB2sHY8ggwXBOIcA",
  authDomain: "mia-clientes.firebaseapp.com",
  databaseURL: "https://mia-clientes-default-rtdb.firebaseio.com",
  projectId: "mia-clientes",
  storageBucket: "mia-clientes.appspot.com",
  messagingSenderId: "596370082312",
  appId: "1:596370082312:web:800c370fa35f37d6555fbd",
  measurementId: "G-4H2ZJ5MY60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth};