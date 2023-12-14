import { auth, db } from "../config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then( async (userCredential) => {
      const user = userCredential.user;
         try {
                const docRef = await addDoc(collection(db, "users"), {
                    name: name.value,
                    email: email.value,
                    uid: user.uid,
                });
                console.log("Document written with ID: ", docRef.id);
                window.location = '../login/login.html'
            
      } catch (error) {
        console.log(error);
      }
      window.location = "login.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});
