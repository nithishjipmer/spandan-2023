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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const urlParams = new URLSearchParams(window.location.search);
const prevPath = urlParams.get("path");

const formPath = `form.html?path=${prevPath}`;
var uiConfig = {
  signInSuccessUrl: formPath,
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  //   tosUrl: '<your-tos-url>',
  // Privacy policy url/callback.
  //   privacyPolicyUrl: function() {
  //     window.location.assign('<your-privacy-policy-url>');
  //   }
};
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#firebaseui-auth-container", uiConfig);
