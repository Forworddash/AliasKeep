document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("save");
  const deleteButton = document.getElementById("delete-button");
  const databaseTab = document.getElementById('tab-2');
  const selectAllCheckbox = document.getElementById('select-all');
  const selectedIndexes = [];
  // const tabs = document.querySelectorAll(".tabs li");
  // const tabContents = document.querySelectorAll(".tab-content");
  const savedUserDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];



  // TABS

  // tab switching
  // tabs.forEach((tab, index) => {
  //   tab.addEventListener("click", () => {
  //     // Hide all tab contents
  //     tabContents.forEach((content) => {
  //       content.style.display = "none";
  //     });

  //     // Show the selected tab content
  //     tabContents[index].style.display = "block";

  //     // Set the active tab
  //     tabs.forEach((t) => {
  //       t.classList.remove("is-active");
  //     });
  //     tab.classList.add("is-active");
  //   });
  // });





  // Get all the tab links
  const tabLinks = document.querySelectorAll('.tabs ul li a');

  // Get all the tab content elements
  const tabContents = document.querySelectorAll('.tab-content');

  // Add click event listeners to the tab links
  tabLinks.forEach(tabLink => {
    tabLink.addEventListener('click', (e) => {
      // Prevent the default link behavior
      e.preventDefault();

      // Remove the 'is-active' class from all tab links
      tabLinks.forEach(link => link.classList.remove('is-active'));

      // Add the 'is-active' class to the clicked tab link
      tabLink.classList.add('is-active');

      // Get the data-tab attribute value of the clicked tab link
      const targetTab = tabLink.getAttribute('data-tab');

      // Hide all tab contents
      tabContents.forEach(content => content.style.display = 'none');

      // Show the tab content associated with the clicked tab link
      document.getElementById(targetTab).style.display = 'block';
    });
  });

// Initialize by showing the content of the active tab
  document.querySelector('.tabs ul li.is-active a').click();

  





  // SAVE BUTTON 

  // save user data to local storage
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

    setTimeout(() => {
      location.reload(); // reload page to clear input fields
    }, 100);
  });








  // DISPLAY SAVED USER DATA
  
  // load user data from local storage if available
  savedUserDataArray.forEach((userData, index) => {

    // display user data entry in the 'database' tab
    const userDataEntry = document.createElement('div');
    userDataEntry.classList.add('user-data-entry');
    userDataEntry.classList.add('box');

    // create check box and label for each entry
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

    databaseTab.appendChild(userDataEntry);
  });






  // SELECT ALL CHECKBOX
  selectAllCheckbox.addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.user-data-entry input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = selectAllCheckbox.checked;
    });

  });


  // DELETE BUTTON 
  deleteButton.addEventListener('click', function(event) {

    event.preventDefault();

    
    
    const selectedIndexes = Array.from(document.querySelectorAll('.user-data-entry input[type="checkbox"]:checked')).map(checkbox => parseInt(checkbox.dataset.index));
    
    // check if all entries selected, before you delete add a message to warn
    // if their is no entries selected, do nothing
    if (selectedIndexes.length === savedUserDataArray.length) {

      if (selectedIndexes.length === 0) {
        alert('Please select at least one entry to delete');
        return false;
      } else {
        const confirmDelete = confirm('Are you sure you want to delete the selected entries?');
        if (!confirmDelete) return false;
      }
    }
    // filter out selected entries from the array and update local storage
    const updatedUserDataArray = savedUserDataArray.filter((userData, index) => !selectedIndexes.includes(index));
    localStorage.setItem('userDataArray', JSON.stringify(updatedUserDataArray));
    location.reload(); // reload page to reflect changes
    
    return false;
  });










  // const databaseTab = document.querySelector('.tabs li:nth-child(2)');

  // databaseTab.addEventListener('click', function() {
    
  //   // show the existing user data entries in the 'database' tab
  //   const userDataEntries = databaseTab.querySelectorAll('.user-data-entry');
    
  //   userDataEntries.forEach(entry => {
  //     entry.style.display = 'block';
  //   });

  // });

});
