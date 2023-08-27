document.addEventListener("DOMContentLoaded", function () {
    const createaccountForm = document.getElementById("createaccount-form");

    createaccountForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const password2 = document.getElementById("password2").value;
      let account = false; // using let to make variable mutable

      // Match both passwords and set account to true if they match and username and password are not empty
      if (password === password2 && username != "" && password != "") {
        alert("Account created succesfully, redirecting to login page!");
        account = true;
        window.location.href = "login.html"; // Redirect to the login page after successful account creation.
      } else {
        alert("Passwords do not match. Please try again.");
      }
    });
    
      // go to login page if cancel button is pressed
      const cancelButton = document.getElementById("cancel");
      cancelButton.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "login.html";
      });
  });