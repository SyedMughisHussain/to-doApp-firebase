import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA89IdZZsjJZrEeaQ5Qur2dsCtjQJO0btI",
  authDomain: "todo-app-8dfc1.firebaseapp.com",
  projectId: "todo-app-8dfc1",
  storageBucket: "todo-app-8dfc1.appspot.com",
  messagingSenderId: "879688659259",
  appId: "1:879688659259:web:2ab3b216d5a573dd44871e",
  measurementId: "G-FQNPD6M4MH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

