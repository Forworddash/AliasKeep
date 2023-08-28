document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("save");
  
    saveButton.addEventListener("click", function (event) {
      event.preventDefault();
  
      // Get input values
      const fullName = document.getElementById("full-name-input").value;
      const email = document.getElementById("email-input").value;
      const phoneNumber = document.getElementById("phone-number-input").value;
      const dob = document.getElementById("dob-input").value;
  
      // create object to store user data
      const userData = {
        fullName,
        email,
        phoneNumber,
        dob,
      };
  
      // save user data to local storage
      localStorage.setItem("userdata", JSON.stringify(userData));
      alert("User data saved successfully!");
  
      setTimeout(() => {
        location.reload(); // reload page to clear input fields
      }, 100);
    });
  
    // load user data from local storage if available
    const savedUserData = localStorage.getItem("userdata");
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      console.log(userData);
  
      // populate input fields with saved user data if desired
      document.getElementById("full-name-input").value = userData.fullName;
      document.getElementById("email-input").value = userData.email;
      document.getElementById("phone-number-input").value = userData.phoneNumber;
      document.getElementById("dob-input").value = userData.dob;
  
      // display user data entry in the 'database tab'
      const databaseTable = document.getElementById("tab-2");
  
      // create user data entry HTML
      const userDataEntry = document.createElement("div");
      userDataEntry.classList.add("user-data-entry");
  
      // create HTML structures for the entry
      userDataEntry.innerHTML = `
          <h3 class="title is-4">${userData.fullName}</h3>
          <p>Email: ${userData.email}</p>
          <p>Phone: ${userData.phoneNumber}</p>
          <p>Date of Birth: ${userData.dob}</p>
      `;
  
      // append entry to the container
      databaseTable.appendChild(userDataEntry);
    }
  });
  