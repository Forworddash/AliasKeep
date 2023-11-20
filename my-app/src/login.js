document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
  
    
    // Retrieve stored username and password from local storage
    const storedUsername = localStorage.getItem("createdUsername");
    const storedPassword = localStorage.getItem("createdPassword");
    // Set your default username and password
    const defaultUsername = "admin";
    const defaultPassword = "password";
    let passwordAttempts = 3;
    let canLogin = true;
    const loginButton = document.getElementById("login");
    
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      if (canLogin) {
        if (username === defaultUsername && password === defaultPassword || username === storedUsername && password === storedPassword) {
          toastr.success("Login successful!");
          setTimeout(function () {
            window.location.href = "index.html"; // Redirect to the main app page after successful login.
          }, 1000);
        } else {
          toastr.warning("Invalid username or password. Please try again. You have " + passwordAttempts + " attempts remaining.");
          // increments password attempts
          passwordAttempts--;
        }
        if (passwordAttempts === 0) {
          alert("Too many failed login attempts. Please try again later.");
          canLogin = false;
        }
      }

      // disable login button if too many failed login attempts
      if (!canLogin) {
        loginButton.disable = true;
      }

    });

    // toast test script
    const toastButton = document.getElementById("test-toast");
    toastButton.addEventListener("click", function (event) {
      event.preventDefault();
      toastr.info("This is a toast test!");
    });

    // Display an info toast with no title
    // event listener for create account button with id of 'create'
    const createButton = document.getElementById("create");
    createButton.addEventListener("click", function (event) {
      // if the create 'button' is pressed, take them to account creation page
      event.preventDefault();
      window.location.href = "createaccount.html";
  });
}); 