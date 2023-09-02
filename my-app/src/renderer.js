document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const saveButton = document.getElementById("save");
  const deleteButton = document.getElementById("delete-button");
  const databaseTab = document.querySelector('.tabs li:nth-child(2)');
  // const selectAllIndexes = document.querySelectorAll('.select-all input[type="checkbox"]');

  // Load saved user data from local storage if available
  let savedUserDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];









  
  // Event listener for saving user data
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
    // const newUserEntry = document.querySelector('.user-data-entry:last-child');
    // newUserEntry.scrollIntoView({ behavior: 'smooth' });

    // // reload page to clear input fields
    // setTimeout(() => {
    location.reload();
    // }, 100);
  });






  // // Event listener for deleting user data
  // deleteButton.addEventListener('click', function() {
  //   const selectedIndexes = Array.from(document.querySelectorAll('.user-data-entry input[type="checkbox"]:checked')).map(checkbox => parseInt(checkbox.dataset.index));
    
  //   // filter out selected entries from the array and update local storage
  //   savedUserDataArray = savedUserDataArray.filter((userData, index) => !selectedIndexes.includes(index));
  //   localStorage.setItem('userDataArray', JSON.stringify(savedUserDataArray));

  //   // reload page to reflect changes
  //   // location.reload(); 
  // });

 // hand delete button click at the top
  deleteButton.addEventListener('click', function() {
    const selectedIndexes = Array.from(document.querySelectorAll('.user-data-entry input[type="checkbox"]:checked')).map(checkbox => parseInt(checkbox.dataset.index));

    // filter out selected entries from the array and update local storage
    const updatedUserDataArray = savedUserDataArray.filter((userData, index) => !selectedIndexes.includes(index));
    localStorage.setItem('userDataArray', JSON.stringify(updatedUserDataArray));

    location.reload(); // reload page to reflect changes
  });





  // Event listener for tab-2 (database tab)
  databaseTab.addEventListener('click', function() {
    const databaseContent = document.getElementById('tab-2');
    const userDataEntries = databaseContent.querySelectorAll('.user-data-entry');
    databaseContent.innerHTML = '';

    savedUserDataArray.forEach((userData, index) => {
      const userDataEntry = document.createElement('div');
      userDataEntry.classList.add('user-data-entry');
      userDataEntry.classList.add('box');

      const checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.dataset.index = index;

      const label = document.createElement('label');
      label.appendChild(checkBox);
      label.appendChild(document.createTextNode(` Entry ${index + 1}`));

      userDataEntry.appendChild(label);

      userDataEntry.innerHTML += `
        <h3 class="title">${userData.fullName}</h3>
        <p>Email: ${userData.email}</p>
        <p>Phone: ${userData.phoneNumber}</p>
        <p>Date of Birth: ${userData.dob}</p>
      `;

      databaseContent.appendChild(userDataEntry);
    });

    userDataEntries.forEach(entry => {
      entry.style.display = 'block';
    });

    
  });
  
});
