document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("save");
  const settingsSaveButton = document.getElementById("save-settings");
  const deleteButton = document.getElementById("delete-button");
  const databaseTab = document.getElementById("tab-2");
  const selectAllCheckbox = document.getElementById("select-all");
  const tabs = document.querySelectorAll(".tabs li");
  // const tabContents = document.querySelectorAll(".tab-content");
  const savedUserDataArray =
    JSON.parse(localStorage.getItem("userDataArray")) || [];

  // TABS
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // Hide all tab contents
      tabContents.forEach((content) => {
        content.style.display = "none";
      });

      // Show the selected tab content
      tabContents[index].style.display = "block";

      // Set the active tab
      tabs.forEach((t) => {
        t.classList.remove("is-active");
      });
      tab.classList.add("is-active");
    });
  });

  // Get all the tab links
  const tabLinks = document.querySelectorAll(".tabs ul li a");

  // Get all the tab content elements
  const tabContents = document.querySelectorAll(".tab-content");

  // Initialize by showing the content of the active tab
  const activeTabLink = document.querySelector(".tabs ul li.is-active a");
  activeTabLink.classList.add("is-active"); // Add the class to the active tab link
  activeTabLink.click(); // Trigger the click event

  // Add click event listeners to the tab links
  tabLinks.forEach((tabLink) => {
    tabLink.addEventListener("click", (e) => {
      // Prevent the default link behavior
      e.preventDefault();

      // Remove the 'is-active' class from all tab links
      tabLinks.forEach((link) => link.classList.remove("is-active"));

      // Add the 'is-active' class to the clicked tab link
      tabLink.classList.add("is-active");

      // Get the data-tab attribute value of the clicked tab link
      const targetTab = tabLink.getAttribute("data-tab");

      // Hide all tab contents
      tabContents.forEach((content) => (content.style.display = "none"));

      // Show the tab content associated with the clicked tab link
      document.getElementById(targetTab).style.display = "block";
    });
  });

  // Initialize by showing the content of the active tab
  document.querySelector(".tabs ul li.is-active a").click();

  // SAVE BUTTON
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
    const existingUserDataArray =
      JSON.parse(localStorage.getItem("userDataArray")) || [];

    // add new user data to array
    existingUserDataArray.push(userData);

    // save the updated array back to local storage
    localStorage.setItem(
      "userDataArray",
      JSON.stringify(existingUserDataArray)
    );
    alert("User data saved successfully!");

    // reload page to clear input fields
    // setTimeout(() => {
    location.reload();
    // }, 10);
  });

  // DISPLAY SAVED USER DATA ENTRIES
  savedUserDataArray.forEach((userData, index) => {
    // display user data entry in the 'database' tab
    const userDataEntry = document.createElement("div");
    userDataEntry.classList.add("user-data-entry");
    userDataEntry.classList.add("box");

    // create check box and label for each entry
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.dataset.index = index;
    const label = document.createElement("label");

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
  selectAllCheckbox.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(
      '.user-data-entry input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  });

  // DELETE BUTTON
  deleteButton.addEventListener("click", function (event) {
    event.preventDefault();

    const selectedIndexes = Array.from(
      document.querySelectorAll(
        '.user-data-entry input[type="checkbox"]:checked'
      )
    ).map((checkbox) => parseInt(checkbox.dataset.index));

    if (selectedIndexes.length === savedUserDataArray.length) {
      if (selectedIndexes.length === 0) {
        alert("Please select at least one entry to delete");
        return false;
      } else {
        const confirmDelete = confirm(
          "Are you sure you want to delete the selected entries?"
        );
        if (!confirmDelete) return false;
      }
    }

    // filter out selected entries from the array and update local storage
    const updatedUserDataArray = savedUserDataArray.filter(
      (userData, index) => !selectedIndexes.includes(index)
    );
    localStorage.setItem("userDataArray", JSON.stringify(updatedUserDataArray));

    location.reload(); // reload page to reflect changes

    return false;
  });

  // Settings

  // Dark Mode
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  // Check for dark mode preference
  const userPreference = localStorage.getItem("darkModePreference");

  // function to toggle dark mode
  const toggleDarkMode = (dark) => {
    if (dark) {
      document.body.classList.add("dark-mode");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  };

  // set the intitial dark mode state based on user preference
  if (userPreference === "dark") {
    darkModeToggle.checked = true;
    toggleDarkMode(true);
  }

  // add an event listener to the dark mode toggle
  darkModeToggle.addEventListener("click", () => {
    const isDarkMode = darkModeToggle.checked;
    toggleDarkMode(isDarkMode);

    //update user preference
    if (isDarkMode) {
      localStorage.setItem("darkModePreference", "dark");
    } else {
      localStorage.setItem("darkModePreference", "light");
    }
  });

  // write the backend for the settings save button
  // const settingsForm = document.getElementById("settings-form");

  settingsSaveButton.addEventListener("click", (event) => {
    event.preventDefault();

    const settings = {
      darkMode: darkModeToggle.checked,
    };

    localStorage.setItem("settings", JSON.stringify(settings));

    alert("Settings saved successfully!");
  });


  // darkModeToggle.addEventListener("click", () => {
  //   document.body.classList.toggle("dark-mode");
  // });

  // // store user preferences
  // const userPreference = localStorage.getItem("darkModePreference");

  // // check if user preference is dark
  // if (userPreference === "dark") {
  //   document.body.classList.add("dark-mode");
  // }

  // // toggle the class and update the preferencewhen the button is clicked
  // darkModeToggle.addEventListener("click", () => {
  //   document.body.classList.toggle("dark-mode");

  //   if (document.body.classList.contains("dark-mode")) {
  //     localStorage.setItem("darkModePreference", "dark");
  //   } else {
  //     localStorage.setItem("darkModePreference", "light");
  //   }
  // });




});
