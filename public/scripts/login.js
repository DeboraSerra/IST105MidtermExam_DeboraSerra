const DASHBOARD = "culturalconnections.html";

const validatePhone = () => {
  const phoneNumber = this.document.getElementById("phone").value;
  const appVerifier = window.recaptchaVerifier;
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      window.location.href = DASHBOARD;
    })
    .catch((error) => {
      console.log({ error });
      grecaptcha.reset(window.recaptchaWidgetId);
      window.recaptchaVerifier.render().then(function (widgetId) {
        grecaptcha.reset(widgetId);
      });
    });
};

const signInGoogle = async () => {
  let provider = new firebase.auth.GoogleAuthProvider();

  provider.addScope("email");

  try {
    const userCredential = await firebase.auth().signInWithPopup(provider);
    console.log("Logging successfully", userCredential.user);
    location.href = DASHBOARD;
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log("Logging fail", errorMessage, errorCode);
  }
};

const signIn = async (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    let user = userCredential.user;
    console.log("Logging successfully", user);
    location.href = DASHBOARD;
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log("Logging fail", errorMessage, errorCode);
  }
};

window.onload = () => {
  firebase.auth().useDeviceLanguage();

  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      location.href = DASHBOARD;
    }
  });
  document.querySelector("form").addEventListener("submit", signIn);
  document.getElementById("sign-in").addEventListener("click", signIn);
  document.getElementById("google").addEventListener("click", signInGoogle);
  document.getElementById("phone-btn").addEventListener("click", validatePhone);
};
