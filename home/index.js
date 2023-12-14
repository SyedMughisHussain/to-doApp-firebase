import { auth, db } from "../config.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const input_Value = document.querySelector(".inputValue");
const submit_btn = document.querySelector(".add-button");
const todo_container = document.querySelector(".todos");
const clearAllTodo_btn = document.querySelector(".remove-btn");
const signout_btn = document.querySelector(".signout");
const paragra = document.querySelector(".paragra");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    renderTodos();
  } else {
    window.location = "../login/login.html";
  }
});

signout_btn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "../home/index.html";
    })
    .catch((error) => {
      console.log(error.message);
    });
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

  const edit_btn = document.querySelectorAll(".edit-btn");
  const delete_btn = document.querySelectorAll(".delete-btn");

  delete_btn.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      console.log("delete called", arr[index]);
      await deleteDoc(doc(db, "todos", arr[index].docId)).then(() => {
        arr.splice(index, 1);
        render();
        lenghtOfPendingTask(arr);
      });
    });
  });

  edit_btn.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      console.log("update called", arr[index]);
      const newValue = prompt("Enter new todo Value");
      await updateDoc(doc(db, "todos", arr[index].docId), {
        title: newValue,
      });
      arr[index].title = newValue;
      render();
      lenghtOfPendingTask(arr);
    });
  });
}

async function renderTodos() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), docId: doc.id });
  });
  render();
  lenghtOfPendingTask(arr);
}

async function addTodo() {
  if (input_Value.value !== "") {
    const todo = {
      title: input_Value.value,
      uid: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, "todos"), todo);
    input_Value.value = "";
    console.log("Document written with ID: ", docRef.id);
    lenghtOfPendingTask(arr);
  } else {
    alert("Enter the right todo.");
  }
}

clearAllTodo_btn.addEventListener("click", async () => {
  const collectionRef = collection(db, "todos");
  const querySnapshot = await getDocs(collectionRef);
  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
  console.log("All documents deleted successfully.");
});

submit_btn.addEventListener("click", addTodo);

function lenghtOfPendingTask(arr) {
  paragra.innerHTML = `You have ${arr.length} pending tasks.`;
}
