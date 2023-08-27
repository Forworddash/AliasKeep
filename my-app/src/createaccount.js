document.addEventListener("DOMContentLoaded", function () {
    const createaccountForm = document.getElementById("createaccount-form");

    createaccountForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const password2 = document.getElementById("password2").value;
      const account = false; 

      // Match both passwords and set account to true if they match and username and password are not empty
      if (password === password2 && username != "" && password != "") {
        alert("Passwords match!");
        account = true;
      } else {
        alert("Passwords do not match. Please try again.");
      }
      
      // Go to login page if account is created successfully
      if (account === true) {
        alert("Account created successfully!");
        window.location.href = "login.html"; // Redirect to the login page after successful account creation.
      } else {
        alert("Invalid username or password. Please try again.");
      }
    });
  });