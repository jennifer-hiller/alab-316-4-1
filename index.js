const errorDisplay = document.getElementById("errorDisplay");
const successDisplay = document.getElementById("successDisplay");
const registrationForm = document.getElementById("registration");
const loginForm = document.getElementById("login");
function displayError(message) {
  errorDisplay.textContent = message;
  errorDisplay.style.display = "flex";
}
function displaySuccess(message) {
  successDisplay.textContent = message;
  successDisplay.style.display = "flex";
}
function hideError() {
  errorDisplay.textContent = "";
  errorDisplay.style.display = "none";
}
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let errorMessage = "";
  const formData = new FormData(registrationForm);
  const username = formData.get("username");
  if (username === "") {
    errorMessage += "Username cannot be empty. ";
  } else if (username.length < 4) {
    errorMessage += "Username must be at least 4 characters long. ";
    // value cannot contain spaces or whitespace
  } else if (username.match(/\s/g)) {
    errorMessage += "Username cannot contain whitespace. ";
    // value needs at least 2 unique characters
  } else if (new Set(username).size < 2) {
    errorMessage += "Username needs at least 2 unique characters. ";
  } else if (
    localStorage.getItem("username") &&
    username.toLowerCase() === localStorage.getItem("username")
  ) {
    errorMessage += "Username already exists. ";
  }
  const email = formData.get("email");
  if (email === "") {
    errorMessage += "Email cannot be empty. ";
  } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errorMessage += "Invalid email format. ";
  } else if (email.match(/example\.com$/i)) {
    errorMessage += "Email cannot be from example.com. ";
  }
  const password = formData.get("password");
  if (password === "") {
    errorMessage += "Password cannot be empty. ";
  } else if (password.length < 12) {
    errorMessage += "Password must be at least 12 characters long. ";
  } else if (!password.match(/[a-z]/)) {
    errorMessage += "Password must contain at least one lowercase letter. ";
  } else if (!password.match(/[A-Z]/)) {
    errorMessage += "Password must contain at least one uppercase letter. ";
  } else if (!password.match(/\d/)) {
    errorMessage += "Password must contain at least one number. ";
  } else if (!password.match(/[^a-zA-Z\d]/)) {
    errorMessage += "Password must contain at least one special character. ";
  } else if (password.match(/password/gi)) {
    errorMessage += "Password cannot contain the word 'password'. ";
  } else if (password !== formData.get("passwordCheck")) {
    errorMessage += "Passwords do not match. ";
  }
  if (!formData.get("terms")) {
    errorMessage += "You must agree to the terms and conditions. ";
  }
  if (errorMessage) {
    displayError(errorMessage);
  } else {
    hideError();
    localStorage.setItem("username", username.toLowerCase());
    localStorage.setItem("password", password);
    localStorage.setItem("email", email.toLowerCase());
    displaySuccess("Registration successful!");
  }
});
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let errorMessage = "";
  const formData = new FormData(loginForm);
  const localUsername = localStorage.getItem("username");
  const localPassword = localStorage.getItem("password");
  const username = formData.get("username");
  if (username === "") {
    errorMessage += "Username cannot be empty. ";
  } else if (username.toLowerCase() !== localUsername) {
    errorMessage += "Username does not exist. ";
  }
  const password = formData.get("password");
  if (password === "") {
    errorMessage += "Password cannot be empty. ";
  } else if (password !== localPassword) {
    errorMessage += "Incorrect password. ";
  }
  if (errorMessage) {
    displayError(errorMessage);
  } else {
    hideError();
    let persist = formData.get("persist")
      ? " And you will stay logged in."
      : "";
    displaySuccess("Login successful!" + persist);
  }
});
