document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
  
    
    // Retrieve stored username and password from local storage
    const storedUsername = localStorage.getItem("createdUsername");
    const storedPassword = localStorage.getItem("createdPassword");
    // Set your default username and password
    const defaultUsername = "admin";
    const defaultPassword = "password";
    
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      if (username === defaultUsername && password === defaultPassword || username === storedUsername && password === storedPassword) {
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect to the main app page after successful login.
      } else {
        alert("Invalid username or password. Please try again.");
      }
    });

    // event listener for create account button with id of 'create'
    const createButton = document.getElementById("create");
    createButton.addEventListener("click", function (event) {
      // if the create 'button' is pressed, take them to account creation page
      event.preventDefault();
      window.location.href = "createaccount.html";
  });
}); 