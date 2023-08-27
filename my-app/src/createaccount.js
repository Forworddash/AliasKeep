document.addEventListener("DOMContentLoaded", function () {
    const createaccountForm = document.getElementById("createaccount-form");

    createaccountForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const password2 = document.getElementById("password2").value;
  
      // Set your default username and password
      const defaultUsername = "admin";
      const defaultPassword = "password";

      // Match both passwords
      if (password === password2) {
        alert("Passwords match!");
      } else {
        alert("Passwords do not match. Please try again.");
      }
  
      if (username === defaultUsername && password === defaultPassword) {
        alert("Account created successfully!");
        window.location.href = "login.html"; // Redirect to the login page after successful account creation.
      } else {
        alert("Invalid username or password. Please try again.");
      }
    });