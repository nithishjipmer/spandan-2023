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
let prevPath = urlParams.get("path");

if (prevPath==="null") {
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
  console.log(name, number, collegeName, year);
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


fetch('/js/colleges.csv')
  .then(response => response.text())
  .then(csvData => {
    // Parse CSV data
    const rows = csvData.split('\n');
    const collegeNames = rows.map(row => row.split(',')[1]); // Assuming college names are in the first column
   
    // Filter college names based on user input
    function filterColleges() {
      const input = document.getElementById('collegeName');
      const inputValue = input.value.toLowerCase();

      const filteredColleges = collegeNames.filter(college => college.toLowerCase().startsWith(inputValue));
      const collegeList = document.getElementById('collegeList');
      // if(filteredColleges.length <2) return ;
      collegeList.innerHTML = '';

      // Add filtered colleges to the list
      filteredColleges.forEach(college => {
        const li = document.createElement('option');
        li.textContent = college;
        // li.value = college;
        collegeList.appendChild(li);
      });
    }

    // Bind filterColleges function to input event
    document.getElementById('collegeName').addEventListener('input', filterColleges);
  });