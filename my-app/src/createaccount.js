document.addEventListener("DOMContentLoaded", function () {
    const createAccount = document.getElementById("create-acccount");
    
    createAccount.addEventListener("click", function (event) {
      event.preventDefault();
  
      const createdUsername = document.getElementById("username").value;
      const createdPassword = document.getElementById("password").value;
      const password2 = document.getElementById("password2").value;
      let account = false; // using let to make variable mutable

      // Match both passwords and set account to true if they match and username and password are not empty
      if (createdPassword === password2 && createdUsername != "" && createdPassword != "") {
        alert("Account created succesfully, redirecting to login page!");
        account = true;

        // Store username and password in local storage
        localStorage.setItem("createdUsername", createdUsername);
        localStorage.setItem("createdPassword", createdPassword);
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