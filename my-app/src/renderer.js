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

    // load existing user data array from local storage
    const existingUserDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];

    // add new user data to array
    existingUserDataArray.push(userData);

    // save the updated array back to local storage
    localStorage.setItem("userDataArray", JSON.stringify(existingUserDataArray));
    alert("User data saved successfully!");

    // Scroll to the newly added entry
    const newUserEntry = document.querySelector('.user-data-entry:last-child');
    newUserEntry.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      location.reload(); // reload page to clear input fields
    }, 100);
  });

  // load user data from local storage if available
  const savedUserDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];
  
  // load user data from local storage if available
  savedUserDataArray.forEach(userData => {
    const databaseTab = document.getElementById('tab-2');

    // display user data entry in the 'database' tab
    const userDataEntry = document.createElement('div');
    userDataEntry.classList.add('user-data-entry');

    userDataEntry.innerHTML = `
      <h3 class="title is-4">${userData.fullName}</h3>
      <p>Email: ${userData.email}</p>
      <p>Phone: ${userData.phoneNumber}</p>
      <p>Date of Birth: ${userData.dob}</p>
    `;

    databaseTab.appendChild(userDataEntry);
  });

  const databaseTab = document.querySelector('.tabs li:nth-child(2)');

  databaseTab.addEventListener('click', function() {
    // show the existing user data entries in the 'database' tab
    const databaseTab = document.getElementById('tab-2');
    const userDataEntries = databaseTab.querySelectorAll('.user-data-entry');
    userDataEntries.forEach(entry => {
      entry.style.display = 'block';
    });
  });
});
