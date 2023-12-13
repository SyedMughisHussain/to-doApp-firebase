import { auth, db } from "./config.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const input_Value = document.querySelector(".inputValue");
const submit_btn = document.querySelector(".add-button");
const todo_container = document.querySelector(".todos");
const clearAllTodo_btn = document.querySelector(".remove-btn");
const para = document.querySelector(".paragra");
const signout_btn = document.querySelector(".signout");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
    window.location = "login.html";
  }
});

signout_btn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "login.html";
    })
    .catch((error) => {
      console.log(error.message);
    });
});

async function addTodo() {
  if (input_Value.value !== "") {
    const docRef = await addDoc(collection(db, "todos"), {
      title: input_Value.value,
      uid: auth.currentUser.uid,
    });
    input_Value.value = "";
    console.log("Document written with ID: ", docRef.id);
  } else {
    alert("Enter the right todo.");
  }
}

submit_btn.addEventListener("click", addTodo);
