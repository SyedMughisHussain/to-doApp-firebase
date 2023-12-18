import { auth, db } from "./config.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const input_Value = document.querySelector(".inputValue");
const submit_btn = document.querySelector(".add-button");
const todo_container = document.querySelector(".todos");
const signout_btn = document.querySelector(".signout");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    renderTodos(uid);
  } else {
    window.location = "./login.html";
  }
});

let arr = [];

function render() {
  todo_container.innerHTML = "";
  arr.forEach((item) => {
    todo_container.innerHTML += `
      <div class="todoContainer">
      <p>${item.title}</p>
      <div>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
      </div>
      </div>
      `;
  });
}

async function renderTodos(userId) {
  const q = query(collection(db, "todos"), where("uid", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arr.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });
  render();
}

async function addTodo() {
  if (input_Value.value !== "") {
    const todo = {
      title: input_Value.value,
      uid: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, "todos"), todo);
    arr.push(todo);
    render();
    input_Value.value = "";
    console.log("Document written with ID: ", docRef.id);
  } else {
    alert("Enter the right todo.");
  }
}

submit_btn.addEventListener("click", addTodo);

signout_btn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "./login.html";
    })
    .catch((error) => {
      console.log(error.message);
    });
});
