# Alias Keep

**Secure local alias/identity generator with military-grade encryption** 🔒

Generate random identities (names, emails, phone numbers, etc.) for privacy protection. All data is encrypted locally with AES-256-GCM encryption - nothing is ever transmitted or collected.

## ✨ Features

- 🎭 **Generate Random Identities** - Create fake names, emails, phone numbers, DOB, etc.
- 🔐 **Military-Grade Encryption** - AES-256-GCM with PBKDF2 key derivation (600k iterations)
- 🏠 **100% Local** - No servers, no cloud, no data collection
- 🔒 **Master Password Protected** - Your data is only accessible with your password
- 💾 **Secure Storage** - Save and manage multiple aliases
- 🌓 **Dark Mode** - Easy on the eyes
- ⚡ **Offline First** - No internet connection required

## 🔒 Security & Privacy

- ✅ **Zero data collection** - Your data never leaves your device
- ✅ **Client-side encryption** - Everything encrypted before storage
- ✅ **No user accounts** - No email, no registration, no tracking
- ✅ **No telemetry** - No analytics, no phone home
- ✅ **Open source** - Audit the code yourself

### Encryption Details
- **Algorithm:** AES-256-GCM (Galois/Counter Mode)
- **Key Derivation:** PBKDF2-SHA256 with 600,000 iterations
- **Salt:** 256-bit random salt per vault
- **IV:** 96-bit random IV per encryption
- **Storage:** Encrypted data in localStorage only

## 📦 Download & Install

### Option 1: Download Pre-built Installer (Recommended)

**[Download Latest Release](https://github.com/Forworddash/AliasKeep/releases)**

- **Windows:** Download `.exe` installer
- **macOS:** Download `.zip`, extract, and drag to Applications
- **Linux (Debian/Ubuntu):** Download `.deb` file
- **Linux (Fedora/RedHat):** Download `.rpm` file

### Option 2: Build from Source

```bash
# Clone repository
git clone https://github.com/Forworddash/AliasKeep.git
cd AliasKeep/my-app

# Install dependencies
npm install

# Run in development
npm start

# Build installers
npm run make
```

See [my-app/BUILD.md](my-app/BUILD.md) for detailed build instructions.

## 🚀 Quick Start

1. **First Launch:** Create a master password (minimum 8 characters)
2. **Generate:** Click "Generate" to create a random identity
3. **Save:** Click "Save" to encrypt and store the identity
4. **View:** Check the "Database" tab to see saved identities
5. **Lock:** Close the app - your data is automatically locked

### Important Notes

⚠️ **Remember your master password!** There is no password recovery. If you forget it, your data is permanently inaccessible.

💡 **Use a strong password** - This is the key to your encrypted data. Consider using a passphrase like "correct-horse-battery-staple" style passwords.

## 🛠️ Built With

- **Electron** - Cross-platform desktop framework
- **Web Crypto API** - Browser-native cryptography
- **Bulma** - CSS framework
- **Faker.js** - Random data generation
- **Toastr** - Notifications

## 🔧 Settings

- **Dark Mode** - Toggle dark/light theme
- **Change Password** - Update your master password (re-encrypts all data)
- **Delete All Data** - Permanently wipe your vault

## 📋 Use Cases

- 🛡️ Privacy testing
- 🎮 Gaming aliases
- 📧 Disposable email testing
- 🧪 Development/testing with fake data
- 🔐 Identity protection online
- 📝 Form filling practice

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔐 Security

If you discover a security vulnerability, please email moosword@proton.me instead of using the issue tracker.

## ❓ FAQ

**Q: Can I recover my data if I forget my password?**  
A: No. The encryption is designed so that without your password, the data is permanently inaccessible.

**Q: Is my data sent anywhere?**  
A: No. Everything stays on your device. The app works completely offline.

**Q: Can the developer access my data?**  
A: No. Only you have the encryption key (derived from your password).

**Q: What happens if I uninstall?**  
A: Your encrypted data remains in browser localStorage. It will be available if you reinstall.

## 👨‍💻 Author

**Sam**
- Email: moosword@proton.me
- GitHub: [@Forworddash](https://github.com/Forworddash)

---

**⭐ If you find this useful, please star the repo!**

**🔒 Your data. Your device. Your privacy.**


<img width="563" alt="accountcreation" src="https://github.com/Forworddash/AliasKeep/assets/59719097/7404f367-11bc-438f-aeb8-a532595b36c8">


# Home Page
Home page contains input boxes that will store an array of info:
Full name | Email | Phone number | Date of birth | Gender

<img width="580" alt="generate2" src="https://github.com/Forworddash/AliasKeep/assets/59719097/e41f1b81-8d9a-4b44-9e6f-0a6f04a3a0b5">


# Database Entries
This tab will store any saved data from the generate tab.

<img width="578" alt="saves" src="https://github.com/Forworddash/AliasKeep/assets/59719097/e479086b-69ef-4907-ae53-088acc4c9faa">


# Settings Page
This page has dark mode, language selection, Delete all user data.

<img width="567" alt="settings" src="https://github.com/Forworddash/AliasKeep/assets/59719097/65f6dc97-3648-453c-a273-65fcd59b7522">


# Current issues
- Data is not stored on seperate accounts. If you create 2 accounts, you can see all the stored data between them
