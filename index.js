const errorDisplay = document.getElementById("errorDisplay");
const registrationForm = document.getElementById("registration");
const loginForm = document.getElementById("login");
function displayError(message) {
  errorDisplay.textContent = message;
  errorDisplay.style.display = "flex";
}
function hideError() {
  errorDisplay.textContent = "";
  errorDisplay.style.display = "none";
}
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let errorMessage = "";
  const formData = new FormData(registrationForm);
  if (formData.get("username") === "") {
    errorMessage += "Username cannot be empty. ";
  } else if (formData.get("username").length < 4) {
    errorMessage += "Username must be at least 4 characters long. ";
    // value cannot contain spaces or whitespace
  } else if (formData.get("username").match(/\s/g)) {
    errorMessage += "Username cannot contain whitespace. ";
    // value needs at least 2 unique characters
  } else if (new Set(formData.get("username")).size < 2) {
    errorMessage += "Username needs at least 2 unique characters. ";
  } else if (
    localStorage.get("username") &&
    formData.get("username").toLowerCase() === localStorage.get("username")
  ) {
    errorMessage += "Username already exists. ";
  }
  if (formData.get("email") === "") {
    errorMessage += "Email cannot be empty. ";
  } else if (!formData.get("email").match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errorMessage += "Invalid email format. ";
  } else if (formData.get("email").match(/example\.com$/i)) {
    errorMessage += "Email cannot be from example.com. ";
  }
  if (formData.get("password") === "") {
    errorMessage += "Password cannot be empty. ";
  } else if (formData.get("password").length < 12) {
    errorMessage += "Password must be at least 12 characters long. ";
  } else if (!formData.get("password").match(/[a-z]/)) {
    errorMessage += "Password must contain at least one lowercase letter. ";
  } else if (!formData.get("password").match(/[A-Z]/)) {
    errorMessage += "Password must contain at least one uppercase letter. ";
  } else if (!formData.get("password").match(/\d/)) {
    errorMessage += "Password must contain at least one number. ";
  } else if (!formData.get("password").match(/[^a-zA-Z\d]/)) {
    errorMessage += "Password must contain at least one special character. ";
  } else if (formData.get("password").match(/password/gi)) {
    errorMessage += "Password cannot contain the word 'password'. ";
  } else if (formData.get("password") !== formData.get("passwordCheck")) {
    errorMessage += "Passwords do not match. ";
  }
  if (!formData.get("terms")) {
    errorMessage += "You must agree to the terms and conditions. ";
  }
  if (errorMessage) {
    displayError(errorMessage);
  } else {
    hideError();
    localStorage.setItem("username", formData.get("username").toLowerCase());
    localStorage.setItem("password", formData.get("password"));
    localStorage.setItem("email", formData.get("email").toLowerCase());
    event.target.submit();
  }
});
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let errorMessage = "";
  const formData = new FormData(loginForm);
  const localUsername = localStorage.getItem("username");
  const localPassword = localStorage.getItem("password");
  if (formData.get("username") === "") {
    errorMessage += "Username cannot be empty. ";
  } else if (formData.get("username").toLowerCase() !== localUsername) {
    errorMessage += "Username does not exist. ";
  }
  if (formData.get("password") === "") {
    errorMessage += "Password cannot be empty. ";
  } else if (formData.get("password") !== localPassword) {
    errorMessage += "Incorrect password. ";
  }
  if (errorMessage) {
    displayError(errorMessage);
  } else {
    hideError();
    event.target.submit();
  }
});
