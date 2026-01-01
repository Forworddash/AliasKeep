document.addEventListener("DOMContentLoaded", function () {
    // Check if vault is initialized
    const passwordModal = document.getElementById("password-modal");
    const mainContent = document.getElementById("main-content");
    const setupForm = document.getElementById("setup-form");
    const unlockForm = document.getElementById("unlock-form");
    const modalTitle = document.getElementById("modal-title");

    // Show appropriate form
    if (secureStorage.isVaultInitialized()) {
      setupForm.style.display = "none";
      unlockForm.style.display = "block";
      modalTitle.textContent = "Unlock Your Vault";
    } else {
      setupForm.style.display = "block";
      unlockForm.style.display = "none";
      modalTitle.textContent = "Secure Your Vault";
    }
    
    passwordModal.classList.add("is-active");

    // Setup vault
    document.getElementById("setup-vault-btn").addEventListener("click", async function() {
      const password = document.getElementById("setup-password").value;
      const confirmPassword = document.getElementById("setup-password-confirm").value;

      if (password.length < 8) {
        toastr.error("Password must be at least 8 characters long");
        return;
      }

      if (password !== confirmPassword) {
        toastr.error("Passwords do not match");
        return;
      }

      const success = await secureStorage.initializeVault(password);
      if (success) {
        passwordModal.classList.remove("is-active");
        mainContent.style.display = "block";
        toastr.success("Vault created successfully! Your data is now encrypted.");
        initializeApp();
      } else {
        toastr.error("Failed to create vault");
      }
    });

    // Unlock vault
    document.getElementById("unlock-vault-btn").addEventListener("click", async function() {
      const password = document.getElementById("unlock-password").value;
      const unlockError = document.getElementById("unlock-error");

      const success = await secureStorage.unlockVault(password);
      if (success) {
        passwordModal.classList.remove("is-active");
        mainContent.style.display = "block";
        unlockError.style.display = "none";
        toastr.success("Vault unlocked successfully!");
        initializeApp();
      } else {
        unlockError.style.display = "block";
        document.getElementById("unlock-password").value = "";
      }
    });

    // Handle Enter key for password forms
    document.getElementById("unlock-password").addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        document.getElementById("unlock-vault-btn").click();
      }
    });

    document.getElementById("setup-password-confirm").addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        document.getElementById("setup-vault-btn").click();
      }
    });

    function initializeApp() {
      const saveButton = document.getElementById("save");
      const generateButton = document.getElementById("generator");
      const settingsSaveButton = document.getElementById("save-settings");
      const deleteButton = document.getElementById("delete-button");
      const databaseTab = document.getElementById("tab-2");
      const selectAllCheckbox = document.getElementById("select-all");
      const tabs = document.querySelectorAll(".tabs li");
    
      // Load encrypted data
      let savedUserDataArray = [];
      
      async function loadUserData() {
        savedUserDataArray = await secureStorage.loadAndDecrypt("userDataArray") || [];
        renderUserData();
      }

      loadUserData();
    
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
    
      saveButton.addEventListener("click", async function (event) {
        event.preventDefault();
        const fullName = document.getElementById("full-name-input").value;
        const email = document.getElementById("email-input").value;
        const phoneNumber = document.getElementById("phone-number-input").value;
        const dob = document.getElementById("dob-input").value;
        const sex = document.getElementById("gender-input").value;
    
        const userData = { fullName, email, phoneNumber, dob, sex };
        savedUserDataArray.push(userData);
        
        await secureStorage.encryptAndSave("userDataArray", savedUserDataArray);
    
        toastr.success('Data encrypted and saved securely!', 'Success');
        setTimeout(() => {
          loadUserData();
        }, 1000);
      });
    
      function renderUserData() {
        // Clear existing entries
        const entries = databaseTab.querySelectorAll('.user-data-entry');
        entries.forEach(entry => {
          if (!entry.querySelector('button')) {
            entry.remove();
          }
        });

        const reversedUserDataArray = [...savedUserDataArray].reverse();
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
      }
    
      selectAllCheckbox.addEventListener("click", function () {
        const checkboxes = document.querySelectorAll('.user-data-entry input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = selectAllCheckbox.checked;
        });
      });
    
      deleteButton.addEventListener("click", async function (event) {
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
    
        const reversedArray = [...savedUserDataArray].reverse();
        const updatedUserDataArray = reversedArray.filter(
          (userData, index) => !selectedIndexes.includes(index)
        ).reverse();
        
        savedUserDataArray = updatedUserDataArray;
        await secureStorage.encryptAndSave("userDataArray", savedUserDataArray);
        
        toastr.success("Selected entries deleted");
        loadUserData();
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

      // Change Password
      const changePasswordBtn = document.getElementById("change-password-btn");
      const changePasswordModal = document.getElementById("change-password-modal");
      const closeChangePassword = document.getElementById("close-change-password");
      const cancelChangePassword = document.getElementById("cancel-change-password");
      const confirmChangePassword = document.getElementById("confirm-change-password");

      changePasswordBtn.addEventListener("click", () => {
        changePasswordModal.classList.add("is-active");
        document.getElementById("change-password-error").style.display = "none";
      });

      closeChangePassword.addEventListener("click", () => {
        changePasswordModal.classList.remove("is-active");
      });

      cancelChangePassword.addEventListener("click", () => {
        changePasswordModal.classList.remove("is-active");
      });

      confirmChangePassword.addEventListener("click", async () => {
        const currentPassword = document.getElementById("current-password").value;
        const newPassword = document.getElementById("new-password").value;
        const newPasswordConfirm = document.getElementById("new-password-confirm").value;
        const errorEl = document.getElementById("change-password-error");

        if (newPassword.length < 8) {
          errorEl.textContent = "New password must be at least 8 characters long";
          errorEl.style.display = "block";
          return;
        }

        if (newPassword !== newPasswordConfirm) {
          errorEl.textContent = "New passwords do not match";
          errorEl.style.display = "block";
          return;
        }

        const success = await secureStorage.changePassword(currentPassword, newPassword);
        if (success) {
          toastr.success("Password changed successfully!");
          changePasswordModal.classList.remove("is-active");
          document.getElementById("current-password").value = "";
          document.getElementById("new-password").value = "";
          document.getElementById("new-password-confirm").value = "";
        } else {
          errorEl.textContent = "Current password is incorrect";
          errorEl.style.display = "block";
        }
      });

      // Delete all data
      const deleteAllDataBtn = document.getElementById("delete-all-data-btn");
      deleteAllDataBtn.addEventListener("click", () => {
        const confirmed = confirm(
          "⚠️ WARNING: This will permanently delete ALL encrypted data and reset your vault. " +
          "You will need to create a new master password. This action CANNOT be undone. " +
          "\n\nAre you absolutely sure?"
        );
        
        if (confirmed) {
          const doubleConfirm = confirm("Final confirmation: Delete everything and start fresh?");
          if (doubleConfirm) {
            secureStorage.deleteVault();
            localStorage.clear();
            toastr.success("All data deleted. Page will reload...");
            setTimeout(() => {
              location.reload();
            }, 2000);
          }
        }
      });
    }
  });
  
