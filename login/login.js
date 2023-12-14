import { auth } from "../config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user.email);
    console.log(user.uid);
    window.location = "../home/index.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });

});