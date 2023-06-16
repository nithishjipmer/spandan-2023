function register(val) {
  const authPath = `auth.html?path=${val}`;
  console.log(authPath);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // user already signed in so send to payment page
      window.location.assign("payments.html");
    } else {
      // user not signed in
      window.location.assign(authPath);
    }
  });
}
