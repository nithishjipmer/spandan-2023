function register(val) {
  const prevPath = `auth.html?path=${val}`;
  console.log(prevPath);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      window.location.assign("esports.html");
    } else {
      window.location.assign(prevPath);
    }
  });
}
