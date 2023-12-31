document.addEventListener("DOMContentLoaded", function () {
    const createaccountForm = document.getElementById("createaccount-form");

    createaccountForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const createdUsername = document.getElementById("username").value;
      const createdPassword = document.getElementById("password").value;
      const password2 = document.getElementById("password2").value;
      let account = false; // using let to make variable mutable

      // Match both passwords and set account to true if they match and username and password are not empty
      if (createdPassword === password2 && createdUsername != "" && createdPassword != "") {
        // toastr.success("Account created succesfully, redirecting to login page!");
        toastr.success("Account created succesfully, redirecting to login page!");

        account = true;

        // Store username and password in local storage
        localStorage.setItem("createdUsername", createdUsername);
        localStorage.setItem("createdPassword", createdPassword);
        
        setTimeout(function () {
          window.location.href = "login.html";
        }, 1000);
      } else {
        // toastr.warning("Passwords do not match. Please try again.");
        toastr.warning("Passwords do not match. Please try again.");

      }
    });

      // go to login page if cancel button is pressed
      const cancelButton = document.getElementById("cancel");
      cancelButton.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "login.html";
      });
});