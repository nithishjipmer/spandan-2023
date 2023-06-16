import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

// Add Firebase products that you want to use
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

var currentUser;

const firebaseConfig = {
  apiKey: "AIzaSyDWfHPnmzO1izx_jFIepHCoVQuGevws_04",
  authDomain: "spandan-c4c19.firebaseapp.com",
  projectId: "spandan-c4c19",
  storageBucket: "spandan-c4c19.appspot.com",
  messagingSenderId: "477956289858",
  appId: "1:477956289858:web:f54676b7722ad7924d04db",
  measurementId: "G-Z72CP1FDJJ",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const urlParams = new URLSearchParams(window.location.search);
const prevPath = urlParams.get("path");
if (prevPath === null) {
  prevPath = "index.html";
}

const db = getFirestore(app);
const auth = getAuth();
auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log(user.email);
    currentUser = user;
  } else {
    // No user is signed in.
  }
});

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var number = getElementVal("number");
  var collegeName = getElementVal("collegeName");
  var year = getElementVal("year");

  saveMessages(name, number, collegeName, year);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
  window.location.assign(prevPath);
}

const saveMessages = async (name, number, collegeName, year) => {
  try {
    const docRef = await setDoc(doc(db, "Users", currentUser.uid), {
      name: name,
      email: currentUser.email,
      number: number,
      collegeName: collegeName,
      year: year,
    });
    console.log("Document written with ID: ", currentUser.uid);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
