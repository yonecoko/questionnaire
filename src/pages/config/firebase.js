// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9bDDK7Xp5cQMj-2xuYUpuGtoAay6osvY",
  authDomain: "questionnaire-c40ce.firebaseapp.com",
  projectId: "questionnaire-c40ce",
  storageBucket: "questionnaire-c40ce.appspot.com",
  messagingSenderId: "709870462650",
  appId: "1:709870462650:web:bafed65f68487e62514483",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
