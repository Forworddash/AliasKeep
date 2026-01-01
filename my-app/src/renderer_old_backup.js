document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("save");
    const generateButton = document.getElementById("generator");
    const settingsSaveButton = document.getElementById("save-settings");
    const deleteButton = document.getElementById("delete-button");
    const databaseTab = document.getElementById("tab-2");
    const selectAllCheckbox = document.getElementById("select-all");
    const tabs = document.querySelectorAll(".tabs li");
  
    const savedUserDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];
  
    // TABS
    const tabContents = document.querySelectorAll(".tab-content");
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabContents.forEach((content) => {
          content.style.display = "none";
        });
        tabContents[index].style.display = "block";
        tabs.forEach((t) => {
          t.classList.remove("is-active");
        });
        tab.classList.add("is-active");
      });
    });
  
    const tabLinks = document.querySelectorAll(".tabs ul li a");
    tabLinks.forEach((tabLink) => {
      tabLink.addEventListener("click", (e) => {
        e.preventDefault();
        tabLinks.forEach((link) => link.classList.remove("is-active"));
        tabLink.classList.add("is-active");
        const targetTab = tabLink.getAttribute("data-tab");
        tabContents.forEach((content) => (content.style.display = "none"));
        document.getElementById(targetTab).style.display = "block";
      });
    });
    document.querySelector(".tabs ul li.is-active a").click();
  
    function generateRandomDOB(minAge, maxAge) {
      const currentYear = new Date().getFullYear();
      const minYear = currentYear - maxAge;
      const maxYear = currentYear - minAge;
      const birthYear = faker.random.number({ min: minYear, max: maxYear });
      const birthMonth = faker.random.number({ min: 1, max: 12 });
      const birthDay = faker.random.number({ min: 1, max: 28 });
      return `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;
    }
  
    generateButton.addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("full-name-input").value = faker.name.findName();
      document.getElementById("email-input").value = faker.internet.email();
      document.getElementById("phone-number-input").value = faker.phone.phoneNumber();
      document.getElementById("dob-input").value = generateRandomDOB(18, 64);
      document.getElementById("gender-input").value = faker.random.arrayElement(["Male", "Female", "Other"]);
    });
  
    saveButton.addEventListener("click", function (event) {
      event.preventDefault();
      const fullName = document.getElementById("full-name-input").value;
      const email = document.getElementById("email-input").value;
      const phoneNumber = document.getElementById("phone-number-input").value;
      const dob = document.getElementById("dob-input").value;
      const sex = document.getElementById("gender-input").value;
  
      const userData = { fullName, email, phoneNumber, dob, sex };
      const existingUserDataArray = JSON.parse(localStorage.getItem("userDataArray")) || [];
      existingUserDataArray.push(userData);
      localStorage.setItem("userDataArray", JSON.stringify(existingUserDataArray));
  
      toastr.success('The process has been saved.', 'Success');
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  
    const reversedUserDataArray = savedUserDataArray.reverse();
    reversedUserDataArray.forEach((userData, index) => {
      const userDataEntry = document.createElement("div");
      userDataEntry.classList.add("user-data-entry", "box");
  
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
        <p>Gender: ${userData.sex}</p>
      `;
      databaseTab.appendChild(userDataEntry);
    });
  
    selectAllCheckbox.addEventListener("click", function () {
      const checkboxes = document.querySelectorAll('.user-data-entry input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked;
      });
    });
  
    deleteButton.addEventListener("click", function (event) {
      event.preventDefault();
  
      const selectedIndexes = Array.from(
        document.querySelectorAll('.user-data-entry input[type="checkbox"]:checked')
      ).map((checkbox) => parseInt(checkbox.dataset.index));
  
      if (selectedIndexes.length === 0) {
        toastr.error("Please select at least one entry to delete");
        return false;
      }
  
      if (selectedIndexes.length === savedUserDataArray.length) {
        const confirmDelete = confirm("Are you sure you want to delete all your entries?");
        if (!confirmDelete) return false;
      }
  
      const updatedUserDataArray = savedUserDataArray.filter(
        (userData, index) => !selectedIndexes.includes(index)
      );
      localStorage.setItem("userDataArray", JSON.stringify(updatedUserDataArray));
      location.reload();
    });
  
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const userPreference = localStorage.getItem("darkModePreference");
  
    const toggleDarkMode = (dark) => {
      if (dark) {
        document.body.classList.add("dark-mode");
        document.documentElement.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    };
  
    if (userPreference === "dark") {
      darkModeToggle.checked = true;
      toggleDarkMode(true);
    }
  
    darkModeToggle.addEventListener("click", () => {
      const isDarkMode = darkModeToggle.checked;
      toggleDarkMode(isDarkMode);
      localStorage.setItem("darkModePreference", isDarkMode ? "dark" : "light");
    });
  
    settingsSaveButton.addEventListener("click", (event) => {
      event.preventDefault();
      const settings = {
        darkMode: darkModeToggle.checked,
      };
      localStorage.setItem("settings", JSON.stringify(settings));
      toastr.success("Settings saved successfully!");
    });
  });
  