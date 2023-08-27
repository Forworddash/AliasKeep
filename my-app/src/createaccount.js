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
  
      if (username === defaultUsername && password === defaultPassword) {
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect to the main app page after successful login.
      } else {
        alert("Invalid username or password. Please try again.");
      }
    });