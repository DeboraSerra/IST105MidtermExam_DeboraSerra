const showUserName = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    const name = user.displayName ?? user.email;
    const span = document.querySelector("span#user");
    span.innerHTML = name;
  }
};

const logOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("logged out");
      location.href = "index.html";
    })
    .catch((error) => {
      console.log(error);
    });
};

window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      location.href = "index.html";
    }
  });

  document.querySelector("#log-out").addEventListener("click", logOut);
  showUserName();
};
