const auth = firebase.auth();

const urlParams = new URLSearchParams(window.location.search);
const prevPath = urlParams.get("path");

var uiConfig = {
  signInSuccessUrl: prevPath,
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
